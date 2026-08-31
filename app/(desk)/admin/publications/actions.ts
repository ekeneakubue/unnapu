"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { uploadToR2 } from "@/lib/r2";
import prisma from "@/lib/prisma";
import type { PortalPublication } from "./types";

export type UploadPublicationResult =
  | { ok: true; publication: PortalPublication }
  | { ok: false; error: string };

const MAX_BYTES = 20 * 1024 * 1024;

const ALLOWED_EXTENSIONS = new Set([
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
]);

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]);

function extensionOf(fileName: string): string {
  const parts = fileName.toLowerCase().split(".");
  return parts.length > 1 ? (parts.at(-1) ?? "") : "";
}

export async function uploadPublication(
  formData: FormData,
): Promise<UploadPublicationResult> {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const file = formData.get("file");

  if (!title) {
    return { ok: false, error: "Title is required." };
  }

  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Choose a file to upload." };
  }

  if (file.size > MAX_BYTES) {
    return { ok: false, error: "File must be 20 MB or smaller." };
  }

  const ext = extensionOf(file.name);
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return {
      ok: false,
      error: "Only images, PDF, Word, and Excel files are allowed.",
    };
  }

  const mimeType = file.type || "application/octet-stream";
  if (file.type && !ALLOWED_MIME_TYPES.has(file.type)) {
    return {
      ok: false,
      error: "Only images, PDF, Word, and Excel files are allowed.",
    };
  }

  try {
    const storedName = `${randomUUID()}.${ext}`;
    const key = `publications/${storedName}`;
    const bytes = Buffer.from(await file.arrayBuffer());

    const fileUrl = await uploadToR2({
      key,
      body: bytes,
      contentType: mimeType,
    });

    const row = await prisma.publication.create({
      data: {
        title,
        description: description || null,
        fileName: file.name,
        storedName,
        mimeType,
        fileSize: file.size,
        fileUrl,
      },
    });

    revalidatePath("/admin/publications");

    return {
      ok: true,
      publication: {
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
      },
    };
  } catch (error) {
    console.error("Failed to upload publication", error);

    const message =
      error instanceof Error && error.message.includes("Missing R2_")
        ? "Cloudflare R2 is not configured. Add R2 credentials to .env."
        : "Could not upload file. Please try again.";

    return { ok: false, error: message };
  }
}
