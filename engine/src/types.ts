// engine/src/types.ts
export interface BenchmarkResult {
  name: string;
  version: string;
  score: number;
  durationMs: number;
  samples: number[];
}
