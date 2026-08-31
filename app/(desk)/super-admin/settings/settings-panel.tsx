"use client";

import { useState } from "react";
import { Panel } from "../ui";
import { changePassword } from "./actions";

const inputClassName =
  "h-11 w-full rounded-lg border border-unn-green/15 bg-[#f6f3ec] px-4 font-sans text-sm font-medium tracking-normal text-unn-green normal-case outline-none placeholder:text-unn-green/35 focus:border-unn-gold";

const labelClassName =
  "flex flex-col items-stretch gap-2.5 font-sans text-[11px] font-bold tracking-[0.12em] text-unn-green/55 uppercase";

export function SettingsPanel({
  accountEmail,
  lockEmail = false,
}: {
  accountEmail?: string;
  lockEmail?: boolean;
} = {}) {
  const [email, setEmail] = useState(accountEmail ?? "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    const result = await changePassword({
      email,
      currentPassword,
      newPassword,
      confirmPassword,
    });

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSuccess(true);
  }

  return (
    <Panel title="Change password">
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-6">
        {error ? (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm text-red-800"
          >
            {error}
          </p>
        ) : null}

        {success ? (
          <p
            role="status"
            className="rounded-lg border border-unn-green/20 bg-unn-green/5 px-4 py-3 font-sans text-sm text-unn-green"
          >
            Password updated successfully.
          </p>
        ) : null}

        <label className={labelClassName}>
          Account email
          <input
            className={`${inputClassName} disabled:cursor-not-allowed disabled:bg-unn-green/5 disabled:text-unn-green/60`}
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@unn.edu.ng"
            autoComplete="username"
            disabled={lockEmail}
            readOnly={lockEmail}
            required
          />
        </label>

        <label className={labelClassName}>
          Current password
          <span className="relative block">
            <input
              className="h-11 w-full rounded-lg border border-unn-green/15 bg-[#f6f3ec] py-0 pr-11 pl-4 font-sans text-sm font-medium tracking-normal text-unn-green normal-case outline-none placeholder:text-unn-green/35 focus:border-unn-gold"
              name="currentPassword"
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowCurrent((v) => !v)}
              className="absolute top-1/2 right-1.5 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-unn-green/50 transition-colors hover:bg-unn-green/5 hover:text-unn-green"
              aria-label={showCurrent ? "Hide password" : "Show password"}
            >
              <EyeIcon open={showCurrent} />
            </button>
          </span>
        </label>

        <label className={labelClassName}>
          New password
          <span className="relative block">
            <input
              className="h-11 w-full rounded-lg border border-unn-green/15 bg-[#f6f3ec] py-0 pr-11 pl-4 font-sans text-sm font-medium tracking-normal text-unn-green normal-case outline-none placeholder:text-unn-green/35 focus:border-unn-gold"
              name="newPassword"
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
            />
            <button
              type="button"
              onClick={() => setShowNew((v) => !v)}
              className="absolute top-1/2 right-1.5 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-unn-green/50 transition-colors hover:bg-unn-green/5 hover:text-unn-green"
              aria-label={showNew ? "Hide password" : "Show password"}
            >
              <EyeIcon open={showNew} />
            </button>
          </span>
        </label>

        <label className={labelClassName}>
          Confirm new password
          <input
            className={inputClassName}
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            minLength={8}
            required
          />
        </label>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex h-10 items-center rounded-full bg-unn-green px-6 font-sans text-[11px] font-bold tracking-[0.12em] text-unn-ivory uppercase transition-colors hover:bg-unn-green-mid disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Updating…" : "Update password"}
          </button>
        </div>
      </form>
    </Panel>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );
}
