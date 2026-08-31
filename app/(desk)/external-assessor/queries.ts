import prisma from "@/lib/prisma";
import {
  fileKindLabel,
  formatFileSize,
} from "../super-admin/publications/types";
import type { AssessorOverviewStats, AssessorPublication } from "./types";

export type { AssessorOverviewStats, AssessorPublication } from "./types";

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function toAssessorPublication(row: {
  id: string;
  status: "PENDING" | "COMPLETED";
  comment: string | null;
  createdAt: Date;
  completedAt: Date | null;
  publication: {
    id: string;
    title: string;
    description: string | null;
    fileName: string;
    mimeType: string;
    fileSize: number;
    fileUrl: string;
    createdAt: Date;
  };
}): AssessorPublication {
  return {
    assignmentId: row.id,
    id: row.publication.id,
    title: row.publication.title,
    description: row.publication.description,
    fileName: row.publication.fileName,
    mimeType: row.publication.mimeType,
    fileSize: row.publication.fileSize,
    fileUrl: row.publication.fileUrl,
    createdAt: formatDate(row.publication.createdAt),
    sharedWith: [],
    feedback: [],
    status: row.status === "COMPLETED" ? "Completed" : "Pending",
    comment: row.comment,
    sharedAt: formatDate(row.createdAt),
    completedAt: row.completedAt ? formatDate(row.completedAt) : null,
  };
}

export async function getAssessorOverviewStats(
  assessorId: string,
): Promise<AssessorOverviewStats> {
  try {
    const [shared, pending, completed] = await Promise.all([
      prisma.publicationAssignment.count({ where: { assessorId } }),
      prisma.publicationAssignment.count({
        where: { assessorId, status: "PENDING" },
      }),
      prisma.publicationAssignment.count({
        where: { assessorId, status: "COMPLETED" },
      }),
    ]);

    return { shared, pending, completed };
  } catch (error) {
    console.error("Failed to fetch assessor overview stats", error);
    return { shared: 0, pending: 0, completed: 0 };
  }
}

export async function getAssessorPublications(
  assessorId: string,
): Promise<AssessorPublication[]> {
  try {
    const rows = await prisma.publicationAssignment.findMany({
      where: { assessorId },
      orderBy: [{ status: "asc" }, { createdAt: "desc" }],
      include: {
        publication: true,
      },
    });

    return rows.map(toAssessorPublication);
  } catch (error) {
    console.error("Failed to fetch assessor publications", error);
    return [];
  }
}

export { fileKindLabel, formatFileSize };
