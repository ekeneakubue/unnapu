export type PortalPublication = {
  id: string;
  title: string;
  description: string | null;
  fileName: string;
  mimeType: string;
  fileSize: number;
  fileUrl: string;
  createdAt: string;
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
