// engine/src/runner.ts
import { runCpuBenchmark } from "./benchmarks/cpu";
import type { BenchmarkResult } from "./types";

export function runBenchmark(): BenchmarkResult[] {
  return [
    runCpuBenchmark(),
  ];
}
