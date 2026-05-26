"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Flashcard } from "@/lib/cards";
import { CardIndex } from "@/components/card-index";
import { FullText } from "@/components/full-text";

const SWIPE_THRESHOLD = 60;
const SWIPE_TIME_MAX = 600;

export function Flashcards({ cards }: { cards: Flashcard[] }) {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [fullTextOpen, setFullTextOpen] = useState(false);
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
      if (menuOpen || fullTextOpen) return;
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
  }, [next, prev, menuOpen, fullTextOpen]);

  const onTouchStart = (e: React.TouchEvent) => {
    if (transitioning) return;
    const t = e.touches[0];
    touchStart.current = { y: t.clientY, t: performance.now() };
    setDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dy = e.touches[0].clientY - touchStart.current.y;
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
    setDragging(false);
    if (Math.abs(dy) > SWIPE_THRESHOLD && elapsed < SWIPE_TIME_MAX * 2) {
      if (dy < 0) next();
      else prev();
    } else {
      setDrag(0);
    }
  };

  const card = cards[index];

  return (
    <main
      ref={containerRef}
      className="relative flex flex-1 flex-col bg-black text-white"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <header className="flex items-center justify-between px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2">
        <span className="text-sm tabular-nums text-white/80">
          {String(index + 1).padStart(2, "0")}
          <span className="text-white/40"> / {String(total).padStart(2, "0")}</span>
        </span>
        <div className="flex items-center gap-1">
          <FullText
            cards={cards}
            open={fullTextOpen}
            onOpenChange={setFullTextOpen}
          />
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
        </div>
      </header>

      <div className="h-[2px] w-full bg-white/10">
        <div
          className="h-full w-full origin-left bg-white will-change-transform"
          style={{
            transform: `scaleX(${(index + 1) / total})`,
            transition: "transform 240ms var(--ease-out-quart)",
          }}
        />
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-6">
        <div
          className="flex w-full max-w-md flex-col items-center justify-center text-center will-change-transform"
          style={{
            transform: `translateY(${drag}px)`,
            opacity: 1 - Math.min(Math.abs(drag) / 400, 0.5),
            transition: dragging
              ? "none"
              : "transform 200ms var(--ease-out-quart), opacity 200ms var(--ease-out-quart)",
          }}
        >
          <h1 className="text-balance text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
            {card.keyword}
          </h1>
          {card.hint && (
            <p className="mt-8 text-balance text-lg leading-relaxed text-white/85 sm:text-xl">
              {card.hint}
            </p>
          )}
        </div>

        <SwipeHints atTop={index === 0} atBottom={index === total - 1} />
      </div>

      <footer className="pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 text-center text-xs text-white/60">
        swipe ↑ next · swipe ↓ previous
      </footer>
    </main>
  );
}

function SwipeHints({ atTop, atBottom }: { atTop: boolean; atBottom: boolean }) {
  return (
    <>
      {!atTop && (
        <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 text-white/25">
          <Chevron direction="up" />
        </div>
      )}
      {!atBottom && (
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-white/25">
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
