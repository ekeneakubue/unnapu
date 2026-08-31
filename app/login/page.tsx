import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "./login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const errorMessage =
    params.error === "missing"
      ? "Email and password are required."
      : params.error === "invalid"
        ? "Invalid email or password."
        : params.error === "suspended"
          ? "This account has been suspended. Contact an administrator."
          : params.error === "forbidden"
            ? "Your account does not have access to the planning desk."
            : params.error === "server"
              ? "Could not sign in right now. Check your connection and try again."
              : null;

  return (
    <div className="hero-stage relative flex h-screen max-h-screen flex-col overflow-hidden text-unn-ivory">
      <div className="hero-orb hero-orb-gold" />
      <div className="hero-orb hero-orb-green" />
      <div className="hero-sheen" />

      <header className="animate-reveal-down relative z-10 flex shrink-0 flex-col items-center px-5 pt-5 pb-2 sm:px-8 sm:pt-6 lg:px-12">
        <Link href="/" className="flex flex-col items-center">
          <Image
            src="/images/logo.png"
            alt="University of Nigeria crest"
            width={128}
            height={148}
            className="h-12 w-auto rounded-2xl sm:h-16"
            priority
          />
          <div className="mt-1.5 text-center leading-tight">
            <p className="font-sans text-[11px] font-semibold tracking-[0.22em] text-unn-gold uppercase sm:text-xs">
              University of Nigeria
            </p>
            <p className="mt-0.5 font-serif text-xl font-semibold sm:text-2xl">
              Academic Planning Unit
            </p>
          </div>
        </Link>
      </header>

      <main className="relative z-10 flex min-h-0 flex-1 items-center justify-center overflow-hidden px-5 sm:px-8">
        <LoginForm errorMessage={errorMessage} />
      </main>
    </div>
  );
}
