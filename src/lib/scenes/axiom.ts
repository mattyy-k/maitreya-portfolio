import type { RenderTier } from "@/lib/render-tier";

export const AXIOM_STAGES = [
  "source",
  "tokens",
  "ast",
  "bytecode",
  "execution",
] as const;

export type AxiomStage = (typeof AXIOM_STAGES)[number];

export type AxiomProgress = {
  normalized: number;
  stage: AxiomStage;
  stageProgress: number;
};

export type AxiomFallback = "static" | "lightweight" | "canvas";

export type AxiomScene = {
  init(): void;
  resize(width: number, height: number): void;
  setProgress(progress: number): void;
  render(): void;
  destroy(): void;
};

export type AxiomSceneOptions = {
  tier: RenderTier;
  reducedMotion: boolean;
  fallback: AxiomFallback;
};

const STAGE_RANGES: ReadonlyArray<readonly [AxiomStage, number, number]> = [
  ["source", 0, 0.16],
  ["tokens", 0.12, 0.36],
  ["ast", 0.3, 0.58],
  ["bytecode", 0.52, 0.8],
  ["execution", 0.74, 1],
];

export function clampAxiomProgress(progress: number): number {
  if (!Number.isFinite(progress)) return 0;
  return Math.min(1, Math.max(0, progress));
}

export function getAxiomProgress(progress: number): AxiomProgress {
  const normalized = clampAxiomProgress(progress);
  let selected = STAGE_RANGES[0];

  for (const range of STAGE_RANGES) {
    if (normalized >= range[1]) selected = range;
  }

  const [, start, end] = selected;
  return {
    normalized,
    stage: selected[0],
    stageProgress: end === start ? 1 : (normalized - start) / (end - start),
  };
}

export function getAxiomFallback({ tier, reducedMotion }: Pick<AxiomSceneOptions, "tier" | "reducedMotion">): AxiomFallback {
  if (reducedMotion || tier === 0) return "static";
  if (tier === 1) return "lightweight";
  return "canvas";
}