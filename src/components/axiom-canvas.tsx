"use client";

import { useEffect, useRef } from "react";
import { AxiomCanvasScene } from "@/lib/scenes/axiom-canvas";
import { useScrollProgress } from "@/components/providers";
import { getAxiomProgress } from "@/lib/scenes/axiom";

export function AxiomCanvas() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<AxiomCanvasScene | null>(null);
  const { y } = useScrollProgress();

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const scene = new AxiomCanvasScene(canvas);
    sceneRef.current = scene;
    scene.init();
    const resize = () => {
      const bounds = wrapper.getBoundingClientRect();
      scene.resize(bounds.width, bounds.height);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(wrapper);
    resize();
    return () => {
      observer.disconnect();
      scene.destroy();
      sceneRef.current = null;
    };
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const scene = sceneRef.current;
    if (!wrapper || !scene) return;
    const bounds = wrapper.getBoundingClientRect();
    const documentTop = bounds.top + y;
    const progress = (y + window.innerHeight - documentTop) / (window.innerHeight + bounds.height);
    scene.setProgress(getAxiomProgress(progress).normalized);
    scene.render();
  }, [y]);

  return <div className="axiom-canvas" ref={wrapperRef}><canvas ref={canvasRef} /></div>;
}