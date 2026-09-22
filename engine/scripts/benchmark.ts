// engine/tests/test.ts
import { BenchmarkRunner } from "../src/runner";
import { cpuBenchmark } from "../src/benchmarks/cpu";

const runner = new BenchmarkRunner({
  iterations: 5_000_000,
  warmupRuns: 1,
  sampleCount: 5
});

const result = await runner.run(cpuBenchmark);

console.log(result);
