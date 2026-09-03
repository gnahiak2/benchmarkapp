// engine/src/benchmarks/index.ts
import { runCompilationWork } from "./compile";
import { runMathWork } from "./math";

import type {
  Benchmark,
  BenchmarkConfig,
  BenchmarkResult,
  BenchmarkSample,
} from "../../types";

export const cpuBenchmark: Benchmark = {
  name: "cpu",
  version: "0.2.0",

  async run(config: BenchmarkConfig): Promise<BenchmarkResult> {
    const samples: BenchmarkSample[] = [];

    for (let i = 0; i < config.warmupRuns; i++) {
      runMathWork(1_000_000);
      await runCompilationWork();
    }

    for (let run = 0; run < config.sampleCount; run++) {
      const start = performance.now();

      const result = runMathWork(config.iterations);
      await runCompilationWork();

      const durationMs = performance.now() - start;

      if (!Number.isFinite(result) || !Number.isFinite(durationMs)) {
        throw new Error("CPU benchmark produced an invalid result");
      }

      samples.push({ durationMs });
    }

    const averageMs =
      samples.reduce((sum, sample) => sum + sample.durationMs, 0) /
      samples.length;

    return {
      name: this.name,
      version: this.version,
      samples,
      averageMs,
    };
  },
};
