"use client";

import { useState } from "react";
import {
  fileKindLabel,
  formatFileSize,
  previewMode,
} from "../super-admin/publications/types";
import { Panel, StatusBadge } from "../super-admin/ui";
import { completeAssessment, updateAssessmentComment } from "./actions";
import type { AssessorPublication } from "./types";

const labelClassName =
  "flex flex-col items-stretch gap-2.5 font-sans text-[11px] font-bold tracking-[0.12em] text-unn-green/55 uppercase";

export function AssessorPublicationsPanel({
  initialPublications,
}: {
  initialPublications: AssessorPublication[];
}) {
  const [list, setList] = useState(initialPublications);
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [reviewTarget, setReviewTarget] = useState<AssessorPublication | null>(
    null,
  );
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  function openReview(item: AssessorPublication) {
    setReviewTarget(item);
    setComment(item.comment ?? "");
    setError(null);
  }

  function closeReview() {
    setReviewTarget(null);
    setComment("");
    setError(null);
  }

  async function handleSubmitReview(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!reviewTarget) return;

    setSubmittingId(reviewTarget.assignmentId);
    setError(null);

    const result =
      reviewTarget.status === "Completed"
        ? await updateAssessmentComment(reviewTarget.assignmentId, comment)
        : await completeAssessment(reviewTarget.assignmentId, comment);

    setSubmittingId(null);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    const completedAt =
      reviewTarget.completedAt ??
      new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

    setList((prev) =>
      prev.map((item) =>
        item.assignmentId === reviewTarget.assignmentId
          ? {
              ...item,
              status: "Completed",
              comment: comment.trim() || null,
              completedAt,
            }
          : item,
      ),
    );
    closeReview();
  }

  const reviewPreview = reviewTarget
    ? previewMode(reviewTarget.mimeType, reviewTarget.fileName)
    : null;

  return (
    <>
      <Panel title="Shared publications">
        {error && !reviewTarget ? (
          <p
            role="alert"
            className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm text-red-800"
          >
            {error}
          </p>
        ) : null}

        {list.length === 0 ? (
          <p className="font-sans text-sm text-unn-green/55">
            No publications have been shared with you yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left">
              <thead>
                <tr className="border-b border-unn-green/10 font-sans text-[10px] tracking-[0.16em] text-unn-green/40 uppercase">
                  <th className="pb-3 font-medium">Title</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Size</th>
                  <th className="pb-3 font-medium">Shared</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item) => (
                  <tr
                    key={item.assignmentId}
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
                      {item.sharedAt}
                    </td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-3">
                        {item.status === "Pending" ? (
                          <button
                            type="button"
                            disabled={submittingId === item.assignmentId}
                            onClick={() => openReview(item)}
                            className="inline-flex h-9 items-center rounded-full bg-unn-green px-4 font-sans text-[11px] font-bold tracking-[0.12em] text-unn-ivory uppercase transition-colors hover:bg-unn-green-mid disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            Assess Doc
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => openReview(item)}
                            className="inline-flex h-9 items-center rounded-full border border-unn-green/20 px-4 font-sans text-[11px] font-bold tracking-[0.12em] text-unn-green uppercase transition-colors hover:border-unn-green/35 hover:text-[#b8860b]"
                          >
                            Edit comment
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      {reviewTarget ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 bg-unn-green/40"
            onClick={closeReview}
          />
          <form
            onSubmit={handleSubmitReview}
            className="relative z-10 flex max-h-[min(92vh,900px)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-unn-green/10 bg-white shadow-xl"
          >
            <header className="shrink-0 border-b border-unn-green/10 px-6 py-5 sm:px-8">
              <p className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#b8860b] uppercase">
                Assessment
              </p>
              <h3 className="mt-1 font-serif text-2xl font-bold leading-tight text-unn-green">
                {reviewTarget.status === "Pending"
                  ? "Assess Doc"
                  : "Edit comment"}
              </h3>
              <p className="mt-1 font-sans text-sm text-unn-green/60">
                {fileKindLabel(reviewTarget.mimeType, reviewTarget.fileName)} ·{" "}
                {reviewTarget.title}
              </p>
            </header>

            <div className="grid min-h-0 flex-1 gap-0 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.9fr)]">
              <section className="min-h-0 border-b border-unn-green/10 lg:border-r lg:border-b-0">
                <div className="flex items-center justify-between border-b border-unn-green/10 px-6 py-3">
                  <p className="font-sans text-[11px] font-bold tracking-[0.12em] text-unn-green/55 uppercase">
                    Document
                  </p>
                  <a
                    href={reviewTarget.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-sans text-[11px] font-bold tracking-[0.1em] text-[#b8860b] uppercase hover:text-unn-green"
                  >
                    Open in new tab
                  </a>
                </div>
                <div className="h-[min(52vh,520px)] overflow-auto bg-[#f6f3ec] p-4">
                  {reviewPreview === "pdf" ? (
                    <iframe
                      title={reviewTarget.title}
                      src={reviewTarget.fileUrl}
                      className="h-full min-h-[420px] w-full rounded-lg border border-unn-green/10 bg-white"
                    />
                  ) : reviewPreview === "image" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={reviewTarget.fileUrl}
                      alt={reviewTarget.title}
                      className="mx-auto max-h-full max-w-full rounded-lg border border-unn-green/10 bg-white object-contain"
                    />
                  ) : (
                    <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-lg border border-dashed border-unn-green/20 bg-white px-6 text-center">
                      <p className="font-sans text-sm text-unn-green/70">
                        Preview is not available for this file type.
                      </p>
                      <a
                        href={reviewTarget.fileUrl}
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
                    Your comment
                  </p>
                </div>
                <div className="flex min-h-0 flex-1 flex-col px-6 py-4">
                  {error ? (
                    <p
                      role="alert"
                      className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm text-red-800"
                    >
                      {error}
                    </p>
                  ) : null}

                  <label className={`${labelClassName} min-h-0 flex-1`}>
                    Comment
                    <textarea
                      className="min-h-[min(40vh,360px)] w-full flex-1 rounded-lg border border-unn-green/15 bg-[#f6f3ec] px-4 py-3 font-sans text-sm font-medium tracking-normal text-unn-green normal-case outline-none placeholder:text-unn-green/35 focus:border-unn-gold disabled:cursor-not-allowed disabled:opacity-70"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your assessment comments for the planning team."
                    />
                  </label>
                </div>
              </section>
            </div>

            <footer className="flex shrink-0 items-center justify-end gap-3 border-t border-unn-green/10 px-6 py-4 sm:px-8">
              <button
                type="button"
                onClick={closeReview}
                className="inline-flex h-10 items-center rounded-full px-5 font-sans text-[11px] font-bold tracking-[0.12em] text-unn-green/60 uppercase hover:text-unn-green"
              >
                Close
              </button>
              {reviewTarget.status === "Pending" ? (
                <button
                  type="submit"
                  disabled={submittingId === reviewTarget.assignmentId}
                  className="inline-flex h-10 items-center rounded-full bg-unn-green px-6 font-sans text-[11px] font-bold tracking-[0.12em] text-unn-ivory uppercase transition-colors hover:bg-unn-green-mid disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submittingId === reviewTarget.assignmentId
                    ? "Submitting…"
                    : "Mark complete"}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submittingId === reviewTarget.assignmentId}
                  className="inline-flex h-10 items-center rounded-full bg-unn-green px-6 font-sans text-[11px] font-bold tracking-[0.12em] text-unn-ivory uppercase transition-colors hover:bg-unn-green-mid disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submittingId === reviewTarget.assignmentId
                    ? "Saving…"
                    : "Save comment"}
                </button>
              )}
            </footer>
          </form>
        </div>
      ) : null}
    </>
  );
}
