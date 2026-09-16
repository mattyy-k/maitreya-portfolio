"use client";

import { useEffect, useRef, useState } from "react";
import { useCapabilities, useSectionProgress } from "@/components/providers";
import { ForgeCanvasScene } from "@/lib/scenes/forge-canvas";
import { ForgeInteractiveShell } from "@/components/forge-interactive-shell";

export function ForgeSceneHost() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<ForgeCanvasScene | null>(null);
  const [active, setActive] = useState(false);
  const [mode, setMode] = useState<"graph" | "interactive">("graph");

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
    if (!active || reducedMotion || tier === 0 || mode !== "graph") return;
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    const scene = new ForgeCanvasScene(canvas);
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
  }, [active, reducedMotion, tier, mode]);

  useEffect(() => {
    if (sceneRef.current && mode === "graph") {
      sceneRef.current.setProgress(progress);
      sceneRef.current.render();
    }
  }, [progress, mode]);

  return (
    <div className={`forge-scene-host ${active ? "is-active" : ""}`} ref={hostRef}>
      <div className="forge-mode-toggle">
        <button
          className={`forge-toggle-btn ${mode === "graph" ? "active" : ""}`}
          onClick={() => setMode("graph")}
          type="button"
        >
          POSIX PROCESS GRAPH
        </button>
        <button
          className={`forge-toggle-btn ${mode === "interactive" ? "active" : ""}`}
          onClick={() => setMode("interactive")}
          type="button"
        >
          SIMULATED SHELL PROMPT
        </button>
      </div>

      {mode === "interactive" ? (
        <ForgeInteractiveShell />
      ) : (
        <div className="forge-canvas">
          <canvas ref={canvasRef} />
        </div>
      )}
    </div>
  );
}
