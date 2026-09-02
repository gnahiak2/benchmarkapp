// engine/src/benchmarks/cpu.ts
import type {
  Benchmark,
  BenchmarkConfig,
  BenchmarkResult,
  BenchmarkSample,
} from "../types";

function cpuWork(iterations: number): number {
  let value = 0.123456789;

  for (let i = 0; i < iterations; i++) {
    const x = i * 0.000001 + value;

    value += Math.sqrt(Math.abs(x));
    value += Math.sin(x);
    value += Math.cos(x * 0.5);
    value += Math.tan(x * 0.01);
    value += Math.log1p(Math.abs(x));
    value += Math.exp(Math.sin(x) * 0.001);

    const a = i ^ 0x5a5a5a5a;
    const b = Math.imul(i, 2654435761);

    value += ((a ^ b) & 0xffff) * 0.000001;

    if (value > 1_000_000) {
      value %= 1000;
    }
  }

  return value;
}

export const cpuBenchmark: Benchmark = {
  name: "cpu-math",
  version: "0.1.0",

  async run(config: BenchmarkConfig): Promise<BenchmarkResult> {
    const samples: BenchmarkSample[] = [];

    cpuWork(config.warmupRuns * 1_000_000);

    for (let run = 0; run < config.sampleCount; run++) {
      const start = performance.now();

      const result = cpuWork(config.iterations);

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
