export type Flashcard = {
  keyword: string;
  hint?: string;
};

export const cards: Flashcard[] = [
  { keyword: "Idempotent", hint: "Same result no matter how many times you run it" },
  { keyword: "Eventual consistency", hint: "All replicas converge given enough time" },
  { keyword: "Backpressure", hint: "Slow down producers when consumers can't keep up" },
  { keyword: "Cache stampede", hint: "Many requests refill an expired cache at once" },
  { keyword: "Thundering herd", hint: "Many waiters wake up simultaneously for one event" },
  { keyword: "Circuit breaker", hint: "Stop calling a failing dependency to let it recover" },
  { keyword: "Bulkhead", hint: "Isolate failures so one bad pool can't sink the ship" },
  { keyword: "CAP theorem", hint: "Pick two: Consistency, Availability, Partition tolerance" },
  { keyword: "Sharding", hint: "Split data horizontally across machines" },
  { keyword: "Quorum", hint: "Minimum nodes that must agree for a write to count" },
  { keyword: "Vector clock", hint: "Track causality across distributed events" },
  { keyword: "Two-phase commit", hint: "Coordinator asks everyone to prepare, then commit" },
  { keyword: "Saga", hint: "Long-running transaction as a sequence of compensable steps" },
  { keyword: "CRDT", hint: "Data structures that merge concurrent edits without conflict" },
  { keyword: "Write-ahead log", hint: "Persist intent before applying it to state" },
];
