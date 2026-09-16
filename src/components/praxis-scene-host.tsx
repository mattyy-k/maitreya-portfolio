"use client";

import { useEffect, useRef, useState } from "react";
import { useCapabilities, useSectionProgress } from "@/components/providers";
import { PraxisCanvasScene } from "@/lib/scenes/praxis-canvas";
import { PraxisStaticFallback } from "@/components/praxis-static-fallback";

export function PraxisSceneHost() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<PraxisCanvasScene | null>(null);
  const [active, setActive] = useState(false);

  const { tier, reducedMotion } = useCapabilities();
  const progress = useSectionProgress(hostRef);

  useEffect(() => {
    const element = hostRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { rootMargin: "35% 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active || reducedMotion || tier === 0) return;
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    const scene = new PraxisCanvasScene(canvas);
    sceneRef.current = scene;
    scene.init();

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      scene.resize(bounds.width, bounds.height);
    };

    const resizeObs = new ResizeObserver(resize);
    resizeObs.observe(host);
    resize();

    return () => {
      resizeObs.disconnect();
      scene.destroy();
      sceneRef.current = null;
    };
  }, [active, reducedMotion, tier]);

  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.setProgress(progress);
      sceneRef.current.render();
    }
  }, [progress]);

  const showFallback = reducedMotion || tier === 0;

  return (
    <div className={`praxis-scene-host ${active ? "is-active" : ""}`} ref={hostRef}>
      {active ? (
        showFallback ? (
          <PraxisStaticFallback />
        ) : (
          <div className="praxis-canvas">
            <canvas ref={canvasRef} />
          </div>
        )
      ) : (
        <div className="praxis-scene-reserved" aria-hidden="true" />
      )}
    </div>
  );
}
