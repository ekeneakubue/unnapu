import prisma from "@/lib/prisma";
import type { AssessorFeedback, PortalPublication } from "./types";

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function mapFeedback(
  assignments: {
    status: "PENDING" | "COMPLETED";
    comment: string | null;
    createdAt: Date;
    completedAt: Date | null;
    assessor: { name: string };
  }[],
): AssessorFeedback[] {
  return assignments.map((assignment) => ({
    assessorName: assignment.assessor.name,
    status: assignment.status === "COMPLETED" ? "Completed" : "Pending",
    comment: assignment.comment,
    sharedAt: formatDate(assignment.createdAt),
    completedAt: assignment.completedAt
      ? formatDate(assignment.completedAt)
      : null,
  }));
}

export async function getPublications(): Promise<PortalPublication[]> {
  try {
    const rows = await prisma.publication.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        assignments: {
          orderBy: { createdAt: "asc" },
          include: {
            assessor: {
              select: { name: true },
            },
          },
        },
      },
    });

    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      fileName: row.fileName,
      mimeType: row.mimeType,
      fileSize: row.fileSize,
      fileUrl: row.fileUrl,
      createdAt: row.createdAt.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      sharedWith: row.assignments.map((assignment) => assignment.assessor.name),
      feedback: mapFeedback(row.assignments),
    }));
  } catch (error) {
    console.error("Failed to fetch publications", error);
    return [];
  }
}
