import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-black px-6 text-white">
      <h1 className="text-balance text-center text-4xl font-bold tracking-tight sm:text-5xl">
        Flashcards
      </h1>
      <p className="mt-3 text-center text-base text-white/60">Kies een set.</p>
      <nav className="mt-10 flex w-full max-w-xs flex-col gap-3">
        <Link
          href="/marciano"
          className="flex items-center justify-between rounded-2xl border border-white/15 px-5 py-4 text-lg font-medium transition-[background-color,transform] duration-150 ease-out hover:bg-white/5 active:scale-[0.98]"
        >
          <span>Marciano</span>
          <span aria-hidden className="text-white/40">→</span>
        </Link>
        <Link
          href="/jelle"
          className="flex items-center justify-between rounded-2xl border border-white/15 px-5 py-4 text-lg font-medium transition-[background-color,transform] duration-150 ease-out hover:bg-white/5 active:scale-[0.98]"
        >
          <span>Jelle</span>
          <span aria-hidden className="text-white/40">→</span>
        </Link>
      </nav>
    </main>
  );
}
