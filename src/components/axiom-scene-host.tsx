"use client";

import { useEffect, useRef, useState } from "react";
import { AxiomStaticFallback } from "@/components/axiom-static-fallback";

export function AxiomSceneHost() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = hostRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { rootMargin: "35% 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`axiom-scene-host ${active ? "is-active" : ""}`} ref={hostRef}>
      {active ? <AxiomStaticFallback /> : <div className="axiom-scene-reserved" aria-hidden="true" />}
    </div>
  );
}