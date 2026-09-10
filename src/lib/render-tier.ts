export type RenderTier = 0 | 1 | 2 | 3;

export type Capabilities = {
  tier: RenderTier;
  reducedMotion: boolean;
  webgl: boolean;
  coarsePointer: boolean;
};

export function detectRenderTier(reducedMotion: boolean, webgl: boolean): RenderTier {
  if (reducedMotion || !webgl) return webgl ? 1 : 0;
  if (typeof navigator !== "undefined" && navigator.hardwareConcurrency <= 4) return 2;
  return 3;
}