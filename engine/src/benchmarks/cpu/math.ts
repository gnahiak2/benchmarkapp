// engine/src/benchmarks/math.ts
export function runMathWork(iterations: number): number {
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
