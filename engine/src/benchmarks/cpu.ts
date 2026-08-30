// engine/src/benchmarks/cpu.ts
import type { BenchmarkResult } from "../types";

export function runCpuBenchmark(): BenchmarkResult {
  const samples: number[] = [];

  for (let run = 0; run < 5; run++) {
    const start = performance.now();

    let value = 0;

    for (let i = 0; i < 10_000_000; i++) {
      value += Math.sqrt(i);
    }

    const durationMs = performance.now() - start;
    samples.push(durationMs);

    // Prevent the loop from being trivially optimized away.
    if (!Number.isFinite(value)) {
      throw new Error("Benchmark failed");
    }
  }

  const average =
          samples.reduce((a, b) => a + b, 0) / samples.length;

  return {
    name: "cpu-basic",
    version: "0.1.0",
    score: 1_000_000 / average,
    durationMs: average,
    samples,
  };
}
