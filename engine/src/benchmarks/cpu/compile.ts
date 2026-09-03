// engine/src/benchmarks/compile.ts
import { transform } from "esbuild";

function generateSource(functionCount: number): string {
  const functions: string[] = [];

  for (let i = 0; i < functionCount; i++) {
    functions.push(`
      export function benchmarkFunction${i}(x: number): number {
        let value = x;

        for (let j = 0; j < 100; j++) {
          value += Math.sin(value);
          value *= 1.000001;
          value -= Math.cos(value);
        }

        return value;
      }
    `);
  }

  return functions.join("\n");
}

export async function runCompilationWork(): Promise<void> {
  const source = generateSource(500);

  await transform(source, {
    loader: "ts",
    target: "es2022",
    format: "esm",
    minify: true,
    sourcemap: false,
  });
}
