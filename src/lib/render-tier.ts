export type RenderTier = 0 | 1 | 2 | 3;

export type Capabilities = {
  tier: RenderTier;
  reducedMotion: boolean;
  canvas2d: boolean;
  webgl: boolean;
  coarsePointer: boolean;
};

export function detectRenderTier(reducedMotion: boolean, webgl: boolean, canvas2d: boolean): RenderTier {
  if (reducedMotion || !canvas2d) return 0;
  if (!webgl) return 2;
  if (typeof navigator !== "undefined" && navigator.hardwareConcurrency <= 4) return 2;
  return 3;
}