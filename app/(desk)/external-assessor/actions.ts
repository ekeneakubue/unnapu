"use server";

import { revalidateDeskPublications } from "@/app/(desk)/desk/revalidate";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";

export type ActionResult =
  | { ok: true }
  | { ok: false; error: string };

function prismaErrorCode(error: unknown): string {
  return error && typeof error === "object" && "code" in error
    ? String(error.code)
    : "";
}

function prismaErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error";
}

function assessmentUpdateError(error: unknown, action: string): ActionResult {
  console.error(`Failed to ${action}`, error);

  const code = prismaErrorCode(error);
  const message = prismaErrorMessage(error);

  if (
    code === "P2022" ||
    message.includes("comment") ||
    message.includes("Unknown argument")
  ) {
    return {
      ok: false,
      error:
        "The database is missing the latest assessment fields. Run `npx prisma db push` and restart the dev server.",
    };
  }

  return {
    ok: false,
    error:
      process.env.NODE_ENV === "development"
        ? `Could not ${action}: ${message}`
        : `Could not ${action}. Please try again.`,
  };
}

async function requireAssessorAssignment(assignmentId: string) {
  const session = await getSession();
  if (!session || session.role !== "External Assessor") {
    return { ok: false as const, error: "You do not have permission to do this." };
  }

  if (!session.id) {
    return {
      ok: false as const,
      error: "Your session has expired. Please sign out and sign in again.",
    };
  }

  if (!assignmentId) {
    return { ok: false as const, error: "Assignment not found." };
  }

  const assignment = await prisma.publicationAssignment.findFirst({
    where: { id: assignmentId, assessorId: session.id },
  });

  if (!assignment) {
    return { ok: false as const, error: "Assignment not found." };
  }

  return { ok: true as const, assignment };
}

export async function completeAssessment(
  assignmentId: string,
  comment?: string,
): Promise<ActionResult> {
  try {
    const auth = await requireAssessorAssignment(assignmentId);
    if (!auth.ok) return auth;

    if (auth.assignment.status === "COMPLETED") {
      return { ok: true };
    }

    await prisma.publicationAssignment.update({
      where: { id: assignmentId },
      data: {
        status: "COMPLETED",
        completedAt: new Date(),
        comment: comment?.trim() || null,
      },
    });
  } catch (error) {
    return assessmentUpdateError(error, "update assessment");
  }

  try {
    await revalidateDeskPublications();
  } catch (error) {
    console.error("Failed to revalidate after assessment", error);
  }

  return { ok: true };
}

export async function updateAssessmentComment(
  assignmentId: string,
  comment: string,
): Promise<ActionResult> {
  try {
    const auth = await requireAssessorAssignment(assignmentId);
    if (!auth.ok) return auth;

    if (auth.assignment.status !== "COMPLETED") {
      return {
        ok: false,
        error: "Complete the assessment before editing your comment.",
      };
    }

    await prisma.publicationAssignment.update({
      where: { id: assignmentId },
      data: {
        comment: comment.trim() || null,
      },
    });
  } catch (error) {
    return assessmentUpdateError(error, "update comment");
  }

  try {
    await revalidateDeskPublications();
  } catch (error) {
    console.error("Failed to revalidate after comment update", error);
  }

  return { ok: true };
}
