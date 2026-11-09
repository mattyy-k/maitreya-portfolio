"use client";

import { useEffect, useRef } from "react";
import { useSectionProgress } from "@/components/providers";

export function AxiomPraxisTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progress = useSectionProgress(containerRef);

  const sizeRef = useRef({ width: 0, height: 0 });
  const progressRef = useRef(progress);

  const renderFrame = (p: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width, height } = sizeRef.current;
    if (width === 0 || height === 0) return;

    ctx.clearRect(0, 0, width, height);

    // Dark background
    ctx.fillStyle = "#090a09";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(52, 57, 52, 0.4)";
    ctx.lineWidth = 1;

    // Draw central stream line
    const centerX = width / 2;
    ctx.beginPath();
    ctx.setLineDash([4, 6]);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Particles/blocks morphing from Opcodes -> Data Blocks -> Cache Line Slots
    const normP = Math.max(0, Math.min(1, p));
    const blockCount = width < 480 ? 8 : 12;

    for (let i = 0; i < blockCount; i++) {
      const normI = i / (blockCount - 1);
      const y = (normI * 0.7 + 0.15 + Math.sin(i * 0.5 + normP * Math.PI) * 0.05) * height;

      // Morph stage calculation: 0..0.33 (Bytecode), 0.33..0.66 (Data Block), 0.66..1.0 (Cache Slot)
      const morphStage = Math.min(2, Math.floor(normI * 3));

      let color = "#c56f4e";
      let label = "OPCODE";
      let boxW = width < 480 ? 64 : 86;

      if (morphStage === 1) {
        color = "#e3e7dd";
        label = "MEM_BLOCK";
        boxW = width < 480 ? 74 : 100;
      } else if (morphStage === 2) {
        color = "#c7e36b";
        label = "CACHE_LINE";
        boxW = width < 480 ? 84 : 116;
      }

      const lateralDrift = Math.min(45, (width - boxW) / 4);
      const offset = Math.sin(i * 1.5 + normP * 4) * lateralDrift * (1 - normP * 0.5);
      const x = centerX + offset - boxW / 2;

      ctx.fillStyle = "#101410";
      ctx.fillRect(x, y, boxW, 20);
      ctx.strokeStyle = color;
      ctx.strokeRect(x, y, boxW, 20);

      ctx.font = "9px 'DM Mono', monospace";
      ctx.fillStyle = color;
      ctx.fillText(label, x + 6, y + 14);

      // Connecting flow vectors
      if (i < blockCount - 1) {
        const nextY = ((i + 1) / (blockCount - 1) * 0.7 + 0.15) * height;
        const nextOffset = Math.sin((i + 1) * 1.5 + normP * 4) * lateralDrift * (1 - normP * 0.5);
        const nextX = centerX + nextOffset;

        ctx.strokeStyle = "rgba(199, 227, 107, 0.15)";
        ctx.beginPath();
        ctx.moveTo(x + boxW / 2, y + 20);
        ctx.lineTo(nextX, nextY);
        ctx.stroke();
      }
    }

    // Overlay stage banners
    ctx.font = "9px 'DM Mono', monospace";
    ctx.fillStyle = "#899087";
    ctx.fillText("COMPUTATION (BYTECODE)", 16, 24);
    if (width >= 480) {
      ctx.fillText("↓ TRANSFORMING", 16, height / 2);
    }
    ctx.fillStyle = "#c7e36b";
    ctx.fillText("DATA LOCALITY & STORAGE (PRAXIS)", 16, height - 16);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      sizeRef.current = { width: rect.width, height: rect.height };
      canvas.width = Math.round(rect.width * ratio);
      canvas.height = Math.round(rect.height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      renderFrame(progressRef.current);
    };

    const resizeObs = new ResizeObserver(resize);
    resizeObs.observe(canvas);
    resize();

    return () => {
      resizeObs.disconnect();
    };
  }, []);

  useEffect(() => {
    progressRef.current = progress;
    renderFrame(progress);
  }, [progress]);

  return (
    <div className="axiom-praxis-transition" ref={containerRef} aria-hidden="true">
      <div className="transition-label-bar">
        <span>COMPUTATION  &rarr;  DATA STREAM  &rarr;  STORAGE ENGINE</span>
        <span className="transition-tag">CONTINUOUS NARRATIVE BRIDGE</span>
      </div>
      <div className="transition-canvas-wrap">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
