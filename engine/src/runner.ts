// engine/src/runner.ts
import type {
  Benchmark,
  BenchmarkConfig,
  BenchmarkResult
} from "./types";

export class BenchmarkRunner {
    constructor(
        private readonly config: BenchmarkConfig,
    ) {}

    async run(benchmark: Benchmark): Promise<BenchmarkResult> {
        return benchmark.run(this.config);
    }
}
