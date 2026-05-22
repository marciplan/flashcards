"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cards } from "@/lib/cards";
import { CardIndex } from "@/components/card-index";

const SWIPE_THRESHOLD = 60;
const SWIPE_TIME_MAX = 600;

export default function Home() {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const touchStart = useRef<{ y: number; t: number } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const total = cards.length;

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(total - 1, next));
      if (clamped === index) {
        setDrag(0);
        return;
      }
      setTransitioning(true);
      setIndex(clamped);
      setDrag(0);
      window.setTimeout(() => setTransitioning(false), 260);
    },
    [index, total]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (menuOpen) return;
      if (e.key === "ArrowDown" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, menuOpen]);

  const onTouchStart = (e: React.TouchEvent) => {
    if (transitioning) return;
    const t = e.touches[0];
    touchStart.current = { y: t.clientY, t: performance.now() };
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dy = e.touches[0].clientY - touchStart.current.y;
    // Resist at edges
    if ((index === 0 && dy > 0) || (index === total - 1 && dy < 0)) {
      setDrag(dy * 0.25);
    } else {
      setDrag(dy);
    }
  };

  const onTouchEnd = () => {
    if (!touchStart.current) return;
    const elapsed = performance.now() - touchStart.current.t;
    const dy = drag;
    touchStart.current = null;
    if (Math.abs(dy) > SWIPE_THRESHOLD && elapsed < SWIPE_TIME_MAX * 2) {
      if (dy < 0) next();
      else prev();
    } else {
      setDrag(0);
    }
  };

  const card = cards[index];
  const progress = ((index + 1) / total) * 100;

  return (
    <main
      ref={containerRef}
      className="relative flex flex-1 flex-col bg-background text-foreground"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <header className="flex items-center justify-between px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2">
        <span className="text-sm tabular-nums text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
          <span className="text-muted-foreground/40"> / {String(total).padStart(2, "0")}</span>
        </span>
        <CardIndex
          cards={cards}
          current={index}
          onJump={(i) => {
            goTo(i);
            setMenuOpen(false);
          }}
          open={menuOpen}
          onOpenChange={setMenuOpen}
        />
      </header>

      <div className="h-[2px] w-full bg-muted">
        <div
          className="h-full bg-primary transition-[width] duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-6">
        <div
          className="flex w-full max-w-md flex-col items-center justify-center text-center"
          style={{
            transform: `translateY(${drag}px)`,
            opacity: 1 - Math.min(Math.abs(drag) / 400, 0.5),
            transition: touchStart.current ? "none" : "transform 220ms ease-out, opacity 220ms ease-out",
          }}
        >
          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {card.keyword}
          </h1>
          {card.hint && (
            <p className="mt-6 text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
              {card.hint}
            </p>
          )}
        </div>

        <SwipeHints atTop={index === 0} atBottom={index === total - 1} />
      </div>

      <footer className="pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 text-center text-xs text-muted-foreground/70">
        swipe ↑ next · swipe ↓ previous
      </footer>
    </main>
  );
}

function SwipeHints({ atTop, atBottom }: { atTop: boolean; atBottom: boolean }) {
  return (
    <>
      {!atTop && (
        <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 text-muted-foreground/40">
          <Chevron direction="up" />
        </div>
      )}
      {!atBottom && (
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-muted-foreground/40">
          <Chevron direction="down" />
        </div>
      )}
    </>
  );
}

function Chevron({ direction }: { direction: "up" | "down" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: direction === "up" ? "rotate(180deg)" : undefined }}
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
