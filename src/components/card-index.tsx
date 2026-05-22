"use client";

import { useEffect, useRef } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import type { Flashcard } from "@/lib/cards";

type Props = {
  cards: Flashcard[];
  current: number;
  onJump: (index: number) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CardIndex({ cards, current, onJump, open, onOpenChange }: Props) {
  const activeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        activeRef.current?.scrollIntoView({ block: "center" });
      });
    }
  }, [open]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          aria-label="Open index"
        >
          Index
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85svh]">
        <DrawerHeader className="pb-2">
          <DrawerTitle className="text-base font-medium">Jump to</DrawerTitle>
        </DrawerHeader>
        <div className="overflow-y-auto px-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <ul className="flex flex-col">
            {cards.map((card, i) => {
              const isActive = i === current;
              return (
                <li key={`${card.keyword}-${i}`}>
                  <button
                    ref={isActive ? activeRef : undefined}
                    onClick={() => onJump(i)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-base transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent"
                    }`}
                  >
                    <span
                      className={`w-7 shrink-0 text-sm tabular-nums ${
                        isActive ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate">{card.keyword}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
