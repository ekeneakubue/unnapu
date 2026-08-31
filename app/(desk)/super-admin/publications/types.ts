export type AssessorFeedback = {
  assessorName: string;
  status: "Pending" | "Completed";
  comment: string | null;
  sharedAt: string;
  completedAt: string | null;
};

export type PortalPublication = {
  id: string;
  title: string;
  description: string | null;
  fileName: string;
  mimeType: string;
  fileSize: number;
  fileUrl: string;
  createdAt: string;
  sharedWith: string[];
  feedback: AssessorFeedback[];
};

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function fileKindLabel(mimeType: string, fileName: string): string {
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";

  if (mimeType.startsWith("image/") || ["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
    return "Image";
  }
  if (mimeType === "application/pdf" || ext === "pdf") return "PDF";
  if (
    mimeType.includes("word") ||
    mimeType.includes("msword") ||
    ["doc", "docx"].includes(ext)
  ) {
    return "Word";
  }
  if (
    mimeType.includes("spreadsheet") ||
    mimeType.includes("excel") ||
    ["xls", "xlsx"].includes(ext)
  ) {
    return "Excel";
  }
  return "File";
}

export function previewMode(
  mimeType: string,
  fileName: string,
): "pdf" | "image" | "download" {
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";

  if (mimeType.startsWith("image/") || ["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
    return "image";
  }
  if (mimeType === "application/pdf" || ext === "pdf") return "pdf";
  return "download";
}
