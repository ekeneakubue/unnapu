"use client";

import { useRef, useState } from "react";
import { Panel } from "../ui";
import { uploadPublication } from "./actions";
import {
  fileKindLabel,
  formatFileSize,
  type PortalPublication,
} from "./types";

const ACCEPT =
  ".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,image/jpeg,image/png,image/gif,image/webp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

const inputClassName =
  "h-11 w-full rounded-lg border border-unn-green/15 bg-[#f6f3ec] px-4 font-sans text-sm font-medium tracking-normal text-unn-green normal-case outline-none placeholder:text-unn-green/35 focus:border-unn-gold";

const labelClassName =
  "flex flex-col items-stretch gap-2.5 font-sans text-[11px] font-bold tracking-[0.12em] text-unn-green/55 uppercase";

export function PublicationsPanel({
  initialPublications,
}: {
  initialPublications: PortalPublication[];
}) {
  const [list, setList] = useState(initialPublications);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function resetForm() {
    setTitle("");
    setDescription("");
    setFileName(null);
    setError(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  function closeDialog() {
    resetForm();
    setOpen(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setSubmitting(true);
    setError(null);

    const result = await uploadPublication(formData);

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setList((prev) => [result.publication, ...prev]);
    closeDialog();
  }

  return (
    <>
      <Panel
        title="Publication library"
        action={
          <button
            type="button"
            onClick={() => {
              resetForm();
              setOpen(true);
            }}
            className="inline-flex h-9 items-center rounded-full bg-unn-green px-4 font-sans text-[11px] font-bold tracking-[0.12em] text-unn-ivory uppercase transition-colors hover:bg-unn-green-mid"
          >
            Upload publication
          </button>
        }
      >
        {list.length === 0 ? (
          <p className="font-sans text-sm text-unn-green/55">
            No publications yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead>
                <tr className="border-b border-unn-green/10 font-sans text-[10px] tracking-[0.16em] text-unn-green/40 uppercase">
                  <th className="pb-3 font-medium">Title</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Size</th>
                  <th className="pb-3 font-medium">Uploaded</th>
                  <th className="pb-3 text-right font-medium">File</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-unn-green/10 font-sans text-sm last:border-0"
                  >
                    <td className="py-3 pr-4">
                      <span className="block font-semibold text-unn-green">
                        {item.title}
                      </span>
                      {item.description ? (
                        <span className="mt-0.5 block text-[12px] text-unn-green/50">
                          {item.description}
                        </span>
                      ) : (
                        <span className="mt-0.5 block text-[11px] text-unn-green/40">
                          {item.fileName}
                        </span>
                      )}
                    </td>
                    <td className="py-3 pr-4 text-unn-green/70">
                      {fileKindLabel(item.mimeType, item.fileName)}
                    </td>
                    <td className="py-3 pr-4 text-unn-green/70">
                      {formatFileSize(item.fileSize)}
                    </td>
                    <td className="py-3 pr-4 text-unn-green/70">
                      {item.createdAt}
                    </td>
                    <td className="py-3 text-right">
                      <a
                        href={item.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-sans text-[11px] font-bold tracking-[0.1em] text-[#b8860b] uppercase hover:text-unn-green"
                      >
                        Open
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5 sm:p-8">
          <button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 bg-unn-green/40"
            onClick={closeDialog}
          />
          <form
            onSubmit={handleSubmit}
            className="relative z-10 flex max-h-[min(90vh,640px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-unn-green/10 bg-white shadow-xl"
          >
            <header className="shrink-0 border-b border-unn-green/10 px-8 pt-8 pb-6">
              <p className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#b8860b] uppercase">
                Library
              </p>
              <h3 className="mt-2 font-serif text-2xl font-bold leading-tight text-unn-green">
                Upload publication
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-unn-green/60">
                Accepts images, PDF, Word, and Excel files up to 20 MB.
              </p>
            </header>

            <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-8 py-7">
              {error ? (
                <p
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm text-red-800"
                >
                  {error}
                </p>
              ) : null}

              <label className={labelClassName}>
                Title
                <input
                  className={inputClassName}
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Academic Planning digest 2026"
                  required
                />
              </label>

              <label className={labelClassName}>
                Description
                <textarea
                  className="min-h-24 w-full rounded-lg border border-unn-green/15 bg-[#f6f3ec] px-4 py-3 font-sans text-sm font-medium tracking-normal text-unn-green normal-case outline-none placeholder:text-unn-green/35 focus:border-unn-gold"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Optional summary for the library"
                />
              </label>

              <label className={labelClassName}>
                File
                <span className="relative block">
                  <input
                    ref={fileRef}
                    className="absolute inset-0 cursor-pointer opacity-0"
                    name="file"
                    type="file"
                    accept={ACCEPT}
                    required
                    onChange={(e) => {
                      const next = e.target.files?.[0];
                      setFileName(next ? next.name : null);
                    }}
                  />
                  <span className="flex h-11 w-full items-center justify-between rounded-lg border border-dashed border-unn-green/25 bg-[#f6f3ec] px-4 font-sans text-sm font-medium tracking-normal text-unn-green normal-case">
                    <span className="truncate">
                      {fileName ?? "Choose image, PDF, Word, or Excel"}
                    </span>
                    <span className="shrink-0 font-sans text-[10px] font-bold tracking-[0.12em] text-[#b8860b] uppercase">
                      Browse
                    </span>
                  </span>
                </span>
              </label>
            </div>

            <footer className="flex shrink-0 items-center justify-end gap-3 border-t border-unn-green/10 px-8 py-5">
              <button
                type="button"
                onClick={closeDialog}
                className="inline-flex h-10 items-center rounded-full px-5 font-sans text-[11px] font-bold tracking-[0.12em] text-unn-green/60 uppercase hover:text-unn-green"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-10 items-center rounded-full bg-unn-green px-6 font-sans text-[11px] font-bold tracking-[0.12em] text-unn-ivory uppercase transition-colors hover:bg-unn-green-mid disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Uploading…" : "Upload"}
              </button>
            </footer>
          </form>
        </div>
      ) : null}
    </>
  );
}
