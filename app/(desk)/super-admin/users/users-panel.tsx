"use client";

import { useState } from "react";
import { Panel, StatusBadge } from "../ui";
import { createUser, deleteUser, updateUser } from "./actions";
import type { PortalUser, UserRole, UserStatus } from "./types";

const statuses: UserStatus[] = ["Active", "Invited", "Suspended"];

type DialogState =
  | { mode: "add" }
  | { mode: "edit"; user: PortalUser }
  | { mode: "delete"; user: PortalUser }
  | null;

const inputClassName =
  "h-11 w-full rounded-lg border border-unn-green/15 bg-[#f6f3ec] px-4 font-sans text-sm font-medium tracking-normal text-unn-green normal-case outline-none placeholder:text-unn-green/35 focus:border-unn-gold";

const labelClassName =
  "flex flex-col items-stretch gap-2.5 font-sans text-[11px] font-bold tracking-[0.12em] text-unn-green/55 uppercase";

export function UsersPanel({
  initialUsers,
  assignableRoles,
}: {
  initialUsers: PortalUser[];
  assignableRoles: UserRole[];
}) {
  const [list, setList] = useState<PortalUser[]>(initialUsers);
  const [dialog, setDialog] = useState<DialogState>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>(assignableRoles[0] ?? "Admin Staff");
  const [status, setStatus] = useState<UserStatus>("Invited");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function resetForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShowPassword(false);
    setRole(assignableRoles[0] ?? "Admin Staff");
    setStatus("Invited");
    setError(null);
  }

  function openAddDialog() {
    resetForm();
    setDialog({ mode: "add" });
  }

  function openEditDialog(user: PortalUser) {
    setName(user.name);
    setEmail(user.email);
    setPassword("");
    setShowPassword(false);
    setRole(user.role);
    setStatus(user.status);
    setError(null);
    setDialog({ mode: "edit", user });
  }

  function openDeleteDialog(user: PortalUser) {
    setError(null);
    setDialog({ mode: "delete", user });
  }

  function closeDialog() {
    resetForm();
    setDialog(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedName || !trimmedEmail) return;

    if (dialog?.mode === "add" && !password) return;

    setSubmitting(true);
    setError(null);

    const result =
      dialog?.mode === "edit"
        ? await updateUser({
            id: dialog.user.id,
            name: trimmedName,
            email: trimmedEmail,
            role,
            status,
            password: password || undefined,
          })
        : await createUser({
            name: trimmedName,
            email: trimmedEmail,
            password,
            role,
          });

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    if (dialog?.mode === "edit") {
      setList((prev) =>
        prev.map((user) => (user.id === result.data.id ? result.data : user)),
      );
    } else {
      setList((prev) => [result.data, ...prev]);
    }

    closeDialog();
  }

  async function handleDelete() {
    if (dialog?.mode !== "delete") return;

    setSubmitting(true);
    setError(null);

    const result = await deleteUser(dialog.user.id);

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setList((prev) => prev.filter((user) => user.id !== dialog.user.id));
    closeDialog();
  }

  return (
    <>
      <Panel
        title="Portal users"
        action={
          <button
            type="button"
            onClick={openAddDialog}
            className="inline-flex h-9 items-center rounded-full bg-unn-green px-4 font-sans text-[11px] font-bold tracking-[0.12em] text-unn-ivory uppercase transition-colors hover:bg-unn-green-mid"
          >
            Add user
          </button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left">
            <thead>
              <tr className="border-b border-unn-green/10 font-sans text-[10px] tracking-[0.16em] text-unn-green/40 uppercase">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Role</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Last active</th>
                <th className="pb-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center font-sans text-sm text-unn-green/50"
                  >
                    No users yet.
                  </td>
                </tr>
              ) : (
                list.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-unn-green/10 font-sans text-sm last:border-0"
                  >
                    <td className="py-3 pr-4">
                      <span className="block font-semibold text-unn-green">
                        {user.name}
                      </span>
                      <span className="text-[11px] text-unn-green/45">
                        {user.email}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-unn-green/80">{user.role}</td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="py-3 pr-4 text-unn-green/70">
                      {user.lastActive}
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => openEditDialog(user)}
                          className="font-sans text-[11px] font-bold tracking-[0.1em] text-unn-green/60 uppercase hover:text-unn-green"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => openDeleteDialog(user)}
                          className="font-sans text-[11px] font-bold tracking-[0.1em] text-red-700/70 uppercase hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Panel>

      {dialog?.mode === "add" || dialog?.mode === "edit" ? (
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
                {dialog.mode === "add" ? "Invite" : "Account"}
              </p>
              <h3 className="mt-2 font-serif text-2xl font-bold leading-tight text-unn-green">
                {dialog.mode === "add" ? "Add user" : "Edit user"}
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-unn-green/60">
                {dialog.mode === "add"
                  ? "Create a portal account and send an invite."
                  : "Update account details, role, or access status."}
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
                Full name
                <input
                  className={inputClassName}
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. Ada Okoro"
                  required
                />
              </label>

              <label className={labelClassName}>
                Email
                <input
                  className={inputClassName}
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@unn.edu.ng"
                  required
                />
              </label>

              <label className={labelClassName}>
                {dialog.mode === "add" ? "Password" : "New password"}
                <span className="relative block">
                  <input
                    className="h-11 w-full rounded-lg border border-unn-green/15 bg-[#f6f3ec] py-0 pr-11 pl-4 font-sans text-sm font-medium tracking-normal text-unn-green normal-case outline-none placeholder:text-unn-green/35 focus:border-unn-gold"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={
                      dialog.mode === "add"
                        ? "••••••••"
                        : "Leave blank to keep current"
                    }
                    autoComplete="new-password"
                    minLength={dialog.mode === "add" ? 8 : undefined}
                    required={dialog.mode === "add"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute top-1/2 right-1.5 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-unn-green/50 transition-colors hover:bg-unn-green/5 hover:text-unn-green"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
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
                    )}
                  </button>
                </span>
              </label>

              <label className={labelClassName}>
                Role
                <select
                  className={inputClassName}
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                >
                  {assignableRoles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>

              {dialog.mode === "edit" ? (
                <label className={labelClassName}>
                  Status
                  <select
                    className={inputClassName}
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as UserStatus)}
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}
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
                {submitting
                  ? dialog.mode === "add"
                    ? "Sending…"
                    : "Saving…"
                  : dialog.mode === "add"
                    ? "Send invite"
                    : "Save changes"}
              </button>
            </footer>
          </form>
        </div>
      ) : null}

      {dialog?.mode === "delete" ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5 sm:p-8">
          <button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 bg-unn-green/40"
            onClick={closeDialog}
          />
          <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-unn-green/10 bg-white shadow-xl">
            <header className="border-b border-unn-green/10 px-8 pt-8 pb-6">
              <p className="font-sans text-[10px] font-bold tracking-[0.2em] text-red-700 uppercase">
                Remove access
              </p>
              <h3 className="mt-2 font-serif text-2xl font-bold leading-tight text-unn-green">
                Delete user
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-unn-green/60">
                This will permanently remove{" "}
                <span className="font-semibold text-unn-green">
                  {dialog.user.name}
                </span>{" "}
                ({dialog.user.email}) from the portal.
              </p>
            </header>

            {error ? (
              <p
                role="alert"
                className="mx-8 mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm text-red-800"
              >
                {error}
              </p>
            ) : null}

            <footer className="flex items-center justify-end gap-3 border-t border-unn-green/10 px-8 py-5">
              <button
                type="button"
                onClick={closeDialog}
                className="inline-flex h-10 items-center rounded-full px-5 font-sans text-[11px] font-bold tracking-[0.12em] text-unn-green/60 uppercase hover:text-unn-green"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={submitting}
                className="inline-flex h-10 items-center rounded-full bg-red-800 px-6 font-sans text-[11px] font-bold tracking-[0.12em] text-white uppercase transition-colors hover:bg-red-900 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Deleting…" : "Delete user"}
              </button>
            </footer>
          </div>
        </div>
      ) : null}
    </>
  );
}
