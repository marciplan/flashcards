"use client";

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
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function FullText({ cards, open, onOpenChange }: Props) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          aria-label="Open full text"
        >
          Full text
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85svh]">
        <DrawerHeader className="pb-2">
          <DrawerTitle className="text-base font-medium">Full text</DrawerTitle>
        </DrawerHeader>
        <div className="overflow-y-auto px-4 pb-[max(1rem,env(safe-area-inset-bottom))] select-text">
          <article className="mx-auto flex max-w-2xl flex-col gap-6 py-2 leading-relaxed">
            {cards.map((card, i) => (
              <section key={`${card.keyword}-${i}`} className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-foreground">
                  {card.keyword}
                </h2>
                {card.hint && (
                  <p className="text-base text-muted-foreground">{card.hint}</p>
                )}
              </section>
            ))}
          </article>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
