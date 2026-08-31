"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";
import type { SessionUser } from "@/lib/session";
import { initialsFor } from "@/lib/user-display";
import type { DeskBasePath } from "@/lib/desk-access";
import { getDeskNav } from "@/app/(desk)/desk/config";
import { signOut } from "./actions";
import { session as academicSession } from "./data";

export function AdminShell({
  children,
  session,
  basePath,
}: {
  children: React.ReactNode;
  session: SessionUser;
  basePath: DeskBasePath;
}) {
  const segment = useSelectedLayoutSegment();
  const [open, setOpen] = useState(false);
  const nav = getDeskNav(basePath);
  const initials = initialsFor(session.name);

  return (
    <div className="admin-stage flex h-full min-h-0 w-full overflow-hidden">
      {open ? (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
          type="button"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col border-r border-unn-ivory/10 bg-[#061912] text-unn-ivory transition-transform md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link
          href={basePath}
          className="flex items-center gap-3 px-5 py-5"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/logo.png"
            alt="University of Nigeria crest"
            width={40}
            height={46}
            className="h-10 w-auto rounded-lg"
            priority
          />
          <div className="min-w-0 leading-tight">
            <p className="font-sans text-[10px] font-bold tracking-[0.18em] text-unn-gold uppercase">
              University of Nigeria
            </p>
            <p className="truncate font-serif text-lg font-bold">
              Academic Planning
            </p>
          </div>
        </Link>

        <nav className="mt-2 flex-1 space-y-0.5 px-3">
          {nav.map((item) => {
            const active = item.segment === segment;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex h-10 items-center rounded-lg px-3 font-sans text-[13px] font-semibold tracking-[0.04em] transition-colors ${
                  active
                    ? "bg-unn-ivory/10 text-unn-gold"
                    : "text-unn-ivory/75 hover:bg-unn-ivory/10 hover:text-unn-ivory"
                }`}
              >
                <span
                  className={`mr-3 h-4 w-px ${
                    active ? "bg-unn-gold" : "bg-unn-ivory/20"
                  }`}
                  aria-hidden="true"
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-unn-ivory/10 px-5 py-4">
          <p className="font-sans text-[10px] tracking-[0.16em] text-unn-gold uppercase">
            Session {academicSession}
          </p>
          <p className="mt-1 font-serif text-lg font-bold">{session.name}</p>
          <p className="font-sans text-xs text-unn-ivory/55">{session.role}</p>
          <form action={signOut}>
            <button
              type="submit"
              className="mt-3 inline-flex font-sans text-[11px] tracking-[0.14em] text-unn-ivory/60 uppercase transition-colors hover:text-unn-gold"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-[#f6f3ec] text-unn-green">
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-unn-green/10 bg-[#f6f3ec] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-lg border border-unn-green/15 text-unn-green md:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
            >
              <svg viewBox="0 0 16 16" className="size-4" fill="none">
                <path
                  d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <p className="hidden font-sans text-[11px] font-semibold tracking-[0.16em] text-unn-green/55 uppercase sm:block">
              Vice-Chancellor’s Office
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden rounded-full border border-[#d4a84b]/55 bg-[#d4a84b]/15 px-3 py-1 font-sans text-[10px] font-bold tracking-[0.14em] text-[#9a7200] uppercase sm:inline-flex">
              NUC cycle 2026
            </span>
            <div className="flex items-center gap-2 rounded-full border border-unn-green/12 bg-white py-1 pr-3 pl-1">
              <span className="inline-flex size-7 items-center justify-center rounded-full bg-unn-green font-sans text-[10px] font-semibold text-unn-ivory">
                {initials}
              </span>
              <span className="hidden font-sans text-xs text-unn-green/70 sm:inline">
                {session.role}
              </span>
            </div>
          </div>
        </header>

        <div className="admin-scroll min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
          {children}
        </div>
      </div>
    </div>
  );
}
