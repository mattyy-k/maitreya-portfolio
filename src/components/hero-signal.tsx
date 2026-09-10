"use client";

import { useCapabilities, useScrollProgress } from "@/components/providers";

export function HeroSignal() {
  const { reducedMotion, tier } = useCapabilities();
  const { progress } = useScrollProgress();
  const animated = tier > 0 && !reducedMotion;
  const signalProgress = Math.min(1, Math.max(0, progress * 1.8));

  return (
    <div
      aria-hidden="true"
      className={`hero-signal ${animated ? "hero-signal-live" : "hero-signal-static"}`}
      style={{ "--signal-progress": signalProgress } as React.CSSProperties}
    >
      <div className="signal-frame">
        <span className="signal-label">SIGNAL / 001</span>
        <div className="signal-route signal-route-a"><i /><i /><i /><i /></div>
        <div className="signal-route signal-route-b"><i /><i /><i /></div>
        <div className="signal-core"><b /><b /><b /></div>
        <span className="signal-readout">{animated ? "LIVE TRACE" : "STATIC TRACE"}</span>
      </div>
    </div>
  );
}