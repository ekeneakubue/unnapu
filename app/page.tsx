import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="hero-stage relative grid h-screen max-h-screen grid-rows-[1fr_auto] overflow-hidden text-unn-ivory">
      <div className="hero-aurora" aria-hidden="true" />
      <div className="hero-orb hero-orb-gold" aria-hidden="true" />
      <div className="hero-orb hero-orb-green" aria-hidden="true" />
      <div className="hero-orb hero-orb-ivory" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-sheen" aria-hidden="true" />
      <span className="hero-spark hero-spark-a" aria-hidden="true" />
      <span className="hero-spark hero-spark-b" aria-hidden="true" />
      <span className="hero-spark hero-spark-c" aria-hidden="true" />

      <div className="relative z-10 flex min-h-0 flex-col items-center justify-center overflow-hidden px-5 py-3 text-center sm:px-8 lg:px-12">
        <header className="animate-reveal-down flex shrink-0 flex-col items-center">
          <Image
            src="/images/logo.png"
            alt="University of Nigeria crest"
            width={128}
            height={148}
            className="h-12 w-auto rounded-2xl shadow-[0_0_40px_rgb(212_180_90/0.25)] sm:h-14"
            priority
          />
          <p className="mt-2 font-sans text-[10px] font-bold tracking-[0.28em] text-unn-gold uppercase sm:text-[11px]">
            University of Nigeria
          </p>
          <h1 className="mt-1.5 font-serif text-[clamp(1.85rem,5.5vh,3.75rem)] leading-[0.92] font-bold tracking-[-0.03em] text-unn-ivory">
            Academic Planning
          </h1>
          <p className="mt-1.5 font-sans text-sm font-semibold tracking-[0.06em] text-unn-ivory/90">
            Academic Planning Unit
          </p>
        </header>

        <main className="mt-4 flex min-h-0 w-full max-w-xl flex-col items-center sm:mt-5">
          <p
            className="animate-reveal-up font-sans text-[10px] font-bold tracking-[0.26em] text-unn-gold uppercase sm:text-[11px]"
            style={{ animationDelay: "120ms" }}
          >
            Vice-Chancellor’s Office
          </p>
          <span
            className="animate-rule mt-3 block h-0.5 w-14 rounded-full bg-unn-gold"
            aria-hidden="true"
          />
          <p
            className="animate-reveal-up mt-3 line-clamp-3 max-w-md font-sans text-[clamp(0.8125rem,1.6vh,1rem)] leading-relaxed font-medium text-unn-ivory/90"
            style={{ animationDelay: "280ms" }}
          >
            The quality-control office of the University of Nigeria. We assemble
            accurate data so management can plan programmes, resources, and the
            academic session with order and evidence.
          </p>
        </main>
      </div>

      <div className="relative z-20 flex shrink-0 flex-col items-center gap-3 px-5 pb-4 sm:gap-4 sm:px-8 sm:pb-5 lg:px-12">
        <div
          className="animate-reveal-up"
          style={{ animationDelay: "420ms" }}
        >
          <Link
            href="/login"
            className="inline-flex h-11 items-center rounded-full bg-unn-ivory px-8 font-sans text-xs font-bold tracking-[0.2em] text-unn-green uppercase shadow-[0_8px_30px_rgb(0_0_0/0.2)] transition-colors hover:bg-unn-gold hover:text-unn-green sm:h-12 sm:px-9"
          >
            Login
          </Link>
        </div>
        <footer
          className="animate-reveal-up"
          style={{ animationDelay: "560ms" }}
        >
          <a
            className="font-sans text-[11px] font-semibold tracking-[0.08em] text-unn-ivory/70 transition-colors hover:text-unn-gold"
            href="https://gigolabs.vercel.app/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Designed by GigoLabs
          </a>
        </footer>
      </div>
    </div>
  );
}
