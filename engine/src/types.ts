// engine/src/types.ts
export interface BenchmarkConfig {
  iterations: number;
  warmupRuns: number;
  sampleCount: number;
}

export interface BenchmarkSample {
  durationMs: number;
}

export interface BenchmarkResult {
  name: string;
  version: string;
  samples: BenchmarkSample[];
  averageMs: number;
}

export interface Benchmark {
  name: string;
  version: string;
  run(config: BenchmarkConfig): Promise<BenchmarkResult>;
}
