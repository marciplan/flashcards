import { Flashcards } from "@/components/flashcards";
import { marcianoCards } from "@/lib/cards-marciano";

export default function MarcianoPage() {
  return <Flashcards cards={marcianoCards} />;
}
