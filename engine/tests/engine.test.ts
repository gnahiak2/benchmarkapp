// engine/tests/engine.test.ts
import { describe, expect, it } from "vitest";
import { BenchmarkRunner } from "../src/runner";
import { cpuBenchmark } from "../src/benchmarks/cpu";

describe("BenchmarkRunner", () => {
  it("runs the CPU benchmark", async () => {
    const runner = new BenchmarkRunner({
      iterations: 1_000,
      warmupRuns: 0,
      sampleCount: 2,
    });

    const result = await runner.run(cpuBenchmark);

    expect(result.name).toBe("cpu");
    expect(result.version).toBe("0.2.0");
    expect(result.samples).toHaveLength(2);
    expect(result.averageMs).toBeGreaterThan(0);
    expect(Number.isFinite(result.averageMs)).toBe(true);

    for (const sample of result.samples) {
      expect(sample.durationMs).toBeGreaterThan(0);
      expect(Number.isFinite(sample.durationMs)).toBe(true);
    }
  });
});