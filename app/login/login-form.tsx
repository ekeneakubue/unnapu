"use client";

import { useState } from "react";
import { signIn } from "./actions";

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

export function LoginForm({ errorMessage }: { errorMessage: string | null }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      action={signIn}
      className="animate-reveal-up w-full max-w-sm rounded-2xl border border-unn-ivory/15 bg-unn-green/40 p-6 backdrop-blur-sm sm:p-8"
    >
      <p className="font-sans text-[10px] font-semibold tracking-[0.24em] text-unn-gold uppercase">
        Staff portal
      </p>
      <h1 className="mt-2 font-serif text-3xl font-semibold">Sign in</h1>
      <p className="mt-2 font-sans text-sm text-unn-ivory/70">
        Staff accounts for the Academic Planning portal.
      </p>

      {errorMessage ? (
        <p className="mt-4 rounded-lg border border-red-300/30 bg-red-950/40 px-3 py-2 font-sans text-sm text-red-100">
          {errorMessage}
        </p>
      ) : null}

      <label className="mt-6 block font-sans text-[11px] tracking-[0.12em] text-unn-ivory/70 uppercase">
        Email
        <input
          className="mt-2 h-11 w-full rounded-lg border border-unn-ivory/20 bg-unn-green/60 px-3 font-sans text-sm text-unn-ivory outline-none placeholder:text-unn-ivory/35 focus:border-unn-gold"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="name@unn.edu.ng"
          required
        />
      </label>

      <label className="mt-4 block font-sans text-[11px] tracking-[0.12em] text-unn-ivory/70 uppercase">
        Password
        <span className="relative mt-2 block">
          <input
            className="h-11 w-full rounded-lg border border-unn-ivory/20 bg-unn-green/60 py-0 pr-11 pl-3 font-sans text-sm text-unn-ivory outline-none placeholder:text-unn-ivory/35 focus:border-unn-gold"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="absolute top-1/2 right-1.5 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-unn-ivory/50 transition-colors hover:bg-unn-ivory/10 hover:text-unn-ivory"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <EyeIcon open={showPassword} />
          </button>
        </span>
      </label>

      <button
        className="mt-6 inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-full bg-unn-ivory font-sans text-[11px] font-semibold tracking-[0.18em] text-unn-green uppercase transition-colors hover:bg-unn-gold"
        type="submit"
      >
        Login
      </button>
    </form>
  );
}
