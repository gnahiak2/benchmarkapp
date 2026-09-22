# Full Summary: `benchmarkapp`

A **Hack Club project** — a desktop benchmarking app built with **Tauri 2** (Rust) + **Vite/TypeScript**, containing a standalone benchmark engine. Early-stage: git history is casual ("idk", "hehehehe", "nuke everything lol"), README is empty, and the app UI is still the default Tauri starter template.

## Project layout

| Path | Purpose |
|---|---|
| `src/`, `index.html`, `vite.config.ts` | Frontend — **still the stock Tauri "Welcome" template** (greet form calling Rust) |
| `src-tauri/` | Rust backend — stock template: a single `greet` command + `tauri-plugin-opener` |
| `engine/` | The actual benchmark engine — a separate pnpm package with its own lockfile |
| `dist/` | Built frontend output (committed, though `.gitignore` covers `dist/`) |
| `LICENSE` | GPL-3.0 |

## The engine (`engine/`)

**Types** (`src/types.ts`): `BenchmarkConfig {iterations, warmupRuns, sampleCount}`, `BenchmarkSample {durationMs}`, `BenchmarkResult {name, version, samples, averageMs}`, and a `Benchmark` interface.

**Runner** (`src/runner.ts`): a thin `BenchmarkRunner` class — constructor takes config, `run(benchmark)` just delegates to `benchmark.run(config)`.

**CPU benchmark** (`src/benchmarks/cpu/`, v0.2.0):
1. **Warmup phase** — `warmupRuns` times: 1M-iteration math loop + an esbuild compile (untimed).
2. **Sample phase** — `sampleCount` timed runs, each combining:
   - `math.ts` — a JS math stress loop (`iterations` reps of sqrt/sin/cos/tan/log1p/exp + bitwise/imul mixing, with value clamping) to defeat dead-code elimination.
   - `compile.ts` — generates ~500 TypeScript functions and runs them through **esbuild's `transform()`** (ESM, minified) to benchmark transpile speed.
3. Validates results are finite (throws otherwise), computes `averageMs`.

**Notable gaps:**
- `scoring.ts` exists but is **empty** (just a comment) — no scoring/points system yet.
- `engine/src/index.ts` doesn't export `scoring` or the benchmarks.
- Only one benchmark category (CPU) — no GPU/memory/etc. despite the structure suggesting more were planned.
- Test script is a manual `test.ts` that just `console.log`s a run (5M iterations, 1 warmup, 5 samples); `package.json`'s `test` script is still the npm placeholder error. Vitest + tsx are installed but unused.

## App ↔ Engine wiring: **none yet**

The Tauri app and the engine are **completely disconnected**:
- Root `package.json` has no reference to `engine` and isn't a pnpm workspace (engine has its own `pnpm-workspace.yaml` with only `allowBuilds: esbuild`).
- The frontend still shows the "Welcome to Tauri" page with the greet form — no benchmark UI.
- Rust side only exposes `greet`; no benchmark commands, no results persistence.

## Tooling

- **Root**: Vite 8, TypeScript ~6.0.3, `@tauri-apps/api`/`cli`/`plugin-opener` v2, pnpm (mid-migration per commit "Start migrating to pnpm").
- **Engine**: esbuild 0.28.2, tsx, Vitest 4, TypeScript 7.0.2.
- **Rust**: release profile fully optimized (`lto`, `codegen-units=1`, `opt-level=3`, `panic=abort`, stripped). Debug `target/` is present (built recently).
- `.gitignore` is thorough — notably ignores `benchmark-results/`, `*.bench.json`, and `src-tauri/gen/schemas/`.

## Git state (recent, ~15 commits)

`Init all em files` → basic API → HTML → "nuke everything lol" refactor → pnpm migration → **"change to tauri ig"** → "update ig" (latest `23bf518`). Working tree is clean.

## Bottom line

The **benchmark engine is the real work so far** — a clean, well-typed CPU benchmark (math + esbuild compile) with warmup/sample methodology. Everything around it (scoring, UI, Tauri integration, tests, README) is either untouched template or scaffolded-but-empty. The next obvious steps would be: scoring logic, wiring the engine into the Tauri frontend, and a results UI.
