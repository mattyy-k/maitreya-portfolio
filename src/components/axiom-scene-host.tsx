"use client";

import { useEffect, useRef, useState } from "react";
import { AxiomStaticFallback } from "@/components/axiom-static-fallback";
import { AxiomCanvas } from "@/components/axiom-canvas";
import { getAxiomFallback } from "@/lib/scenes/axiom";
import { useCapabilities } from "@/components/providers";

export function AxiomSceneHost() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const { tier, reducedMotion } = useCapabilities();
  const fallback = getAxiomFallback({ tier, reducedMotion });

  useEffect(() => {
    const element = hostRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { rootMargin: "35% 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`axiom-scene-host ${active ? "is-active" : ""}`} ref={hostRef}>
      {active ? fallback === "canvas" ? <AxiomCanvas /> : <AxiomStaticFallback /> : <div className="axiom-scene-reserved" aria-hidden="true" />}
    </div>
  );
}