"use client";

import { StatusBadge } from "../ui";
import { fileKindLabel, previewMode, type PortalPublication } from "./types";

export function PublicationViewModal({
  publication,
  onClose,
}: {
  publication: PortalPublication;
  onClose: () => void;
}) {
  const preview = previewMode(publication.mimeType, publication.fileName);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-unn-green/40"
        onClick={onClose}
      />
      <div className="relative z-10 flex max-h-[min(92vh,900px)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-unn-green/10 bg-white shadow-xl">
        <header className="shrink-0 border-b border-unn-green/10 px-6 py-5 sm:px-8">
          <p className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#b8860b] uppercase">
            Publication
          </p>
          <h3 className="mt-1 font-serif text-2xl font-bold leading-tight text-unn-green">
            {publication.title}
          </h3>
          <p className="mt-1 font-sans text-sm text-unn-green/60">
            {fileKindLabel(publication.mimeType, publication.fileName)} ·{" "}
            {publication.fileName}
          </p>
        </header>

        <div className="grid min-h-0 flex-1 gap-0 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.9fr)]">
          <section className="min-h-0 border-b border-unn-green/10 lg:border-r lg:border-b-0">
            <div className="flex items-center justify-between border-b border-unn-green/10 px-6 py-3">
              <p className="font-sans text-[11px] font-bold tracking-[0.12em] text-unn-green/55 uppercase">
                Document
              </p>
              <a
                href={publication.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="font-sans text-[11px] font-bold tracking-[0.1em] text-[#b8860b] uppercase hover:text-unn-green"
              >
                Open in new tab
              </a>
            </div>
            <div className="h-[min(52vh,520px)] overflow-auto bg-[#f6f3ec] p-4">
              {preview === "pdf" ? (
                <iframe
                  title={publication.title}
                  src={publication.fileUrl}
                  className="h-full min-h-[420px] w-full rounded-lg border border-unn-green/10 bg-white"
                />
              ) : preview === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={publication.fileUrl}
                  alt={publication.title}
                  className="mx-auto max-h-full max-w-full rounded-lg border border-unn-green/10 bg-white object-contain"
                />
              ) : (
                <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-lg border border-dashed border-unn-green/20 bg-white px-6 text-center">
                  <p className="font-sans text-sm text-unn-green/70">
                    Preview is not available for this file type.
                  </p>
                  <a
                    href={publication.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex h-10 items-center rounded-full bg-unn-green px-5 font-sans text-[11px] font-bold tracking-[0.12em] text-unn-ivory uppercase hover:bg-unn-green-mid"
                  >
                    Download file
                  </a>
                </div>
              )}
            </div>
          </section>

          <section className="flex min-h-0 flex-col">
            <div className="border-b border-unn-green/10 px-6 py-3">
              <p className="font-sans text-[11px] font-bold tracking-[0.12em] text-unn-green/55 uppercase">
                External assessor comments
              </p>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
              {publication.feedback.length === 0 ? (
                <p className="font-sans text-sm text-unn-green/55">
                  This publication has not been shared with an external assessor
                  yet.
                </p>
              ) : (
                <ul className="space-y-4">
                  {publication.feedback.map((item) => (
                    <li
                      key={`${publication.id}-${item.assessorName}`}
                      className="rounded-xl border border-unn-green/10 bg-[#f6f3ec] px-4 py-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-sans text-sm font-semibold text-unn-green">
                            {item.assessorName}
                          </p>
                          <p className="mt-0.5 font-sans text-[11px] text-unn-green/45">
                            Shared {item.sharedAt}
                            {item.completedAt
                              ? ` · Completed ${item.completedAt}`
                              : null}
                          </p>
                        </div>
                        <StatusBadge status={item.status} />
                      </div>
                      <p className="mt-3 font-sans text-sm leading-relaxed text-unn-green/75">
                        {item.comment?.trim() ||
                          (item.status === "Completed"
                            ? "No comment was provided."
                            : "Awaiting assessment comment.")}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>

        <footer className="flex shrink-0 justify-end border-t border-unn-green/10 px-6 py-4 sm:px-8">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 items-center rounded-full px-5 font-sans text-[11px] font-bold tracking-[0.12em] text-unn-green/60 uppercase hover:text-unn-green"
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}
