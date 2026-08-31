import prisma from "@/lib/prisma";
import type { PortalPublication } from "./types";

export async function getPublications(): Promise<PortalPublication[]> {
  try {
    const rows = await prisma.publication.findMany({
      orderBy: { createdAt: "desc" },
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
    }));
  } catch (error) {
    console.error("Failed to fetch publications", error);
    return [];
  }
}
