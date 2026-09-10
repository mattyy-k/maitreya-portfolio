"use client";

import { useEffect, useRef, useState } from "react";
import { getAxiomProgress, type AxiomProgress } from "@/lib/scenes/axiom";
import { useCapabilities, useScrollProgress } from "@/components/providers";

const initialProgress: AxiomProgress = getAxiomProgress(0);

export function AxiomStaticFallback() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [sceneProgress, setSceneProgress] = useState(initialProgress);
  const { y } = useScrollProgress();
  const { reducedMotion } = useCapabilities();

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "20% 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const element = sectionRef.current;
    if (!element) return;
    const bounds = element.getBoundingClientRect();
    const documentTop = bounds.top + y;
    const progress = (y + window.innerHeight - documentTop) / (window.innerHeight + bounds.height);
    setSceneProgress(getAxiomProgress(progress));
  }, [visible, y]);

  return (
    <div className={`axiom-fallback ${visible ? "is-visible" : ""} ${reducedMotion ? "is-static" : ""}`} ref={sectionRef}>
      <div className="axiom-fallback-head">
        <span>AXIOM / EXECUTION TRACE</span>
        <span>{String(Math.round(sceneProgress.normalized * 100)).padStart(3, "0")}%</span>
      </div>
      <div className="axiom-stage-track" aria-hidden="true">
        {(["source", "tokens", "ast", "bytecode", "execution"] as const).map((stage) => (
          <span className={sceneProgress.stage === stage ? "active" : ""} key={stage}>{stage}</span>
        ))}
      </div>
      <p className="axiom-stage-label">{sceneProgress.stage}</p>
      <p className="axiom-stage-detail">{reducedMotion ? "STATIC SEMANTIC STATE" : "SEMANTIC FALLBACK / RENDERER DEFERRED"}</p>
    </div>
  );
}