"use client";

import { useEffect, useRef } from "react";
import { useSectionProgress } from "@/components/providers";

export function AxiomPraxisTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progress = useSectionProgress(containerRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const resizeObs = new ResizeObserver(resize);
    resizeObs.observe(canvas);
    resize();

    // Render loop driven by normalized progress [0, 1]
    ctx.clearRect(0, 0, width, height);

    // Dark background with technical grid background
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
    const p = Math.max(0, Math.min(1, progress));
    const blockCount = 14;

    for (let i = 0; i < blockCount; i++) {
      const normI = i / (blockCount - 1);
      const y = (normI * 0.7 + 0.15 + Math.sin(i * 0.5 + p * Math.PI) * 0.05) * height;

      // Morph stage calculation: 0..0.33 (Bytecode), 0.33..0.66 (Data Block), 0.66..1.0 (Cache Slot)
      const morphStage = Math.min(2, Math.floor(normI * 3));

      // Color transition from Rust (Axiom Opcode) -> Muted -> Acid Green (Praxis Cache Line)
      let color = "#c56f4e";
      let label = "OPCODE";
      let boxW = 86;

      if (morphStage === 1) {
        color = "#e3e7dd";
        label = "MEM_BLOCK";
        boxW = 100;
      } else if (morphStage === 2) {
        color = "#c7e36b";
        label = "CACHE_LINE";
        boxW = 120;
      }

      const offset = (Math.sin(i * 1.5 + p * 4) * 60) * (1 - p * 0.5);
      const x = centerX + offset - boxW / 2;

      ctx.fillStyle = "#101410";
      ctx.fillRect(x, y, boxW, 22);
      ctx.strokeStyle = color;
      ctx.strokeRect(x, y, boxW, 22);

      ctx.font = "9px 'DM Mono', monospace";
      ctx.fillStyle = color;
      ctx.fillText(label, x + 8, y + 14);

      // Connecting flow vectors
      if (i < blockCount - 1) {
        const nextY = ((i + 1) / (blockCount - 1) * 0.7 + 0.15) * height;
        const nextOffset = (Math.sin((i + 1) * 1.5 + p * 4) * 60) * (1 - p * 0.5);
        const nextX = centerX + nextOffset;

        ctx.strokeStyle = "rgba(199, 227, 107, 0.15)";
        ctx.beginPath();
        ctx.moveTo(x + boxW / 2, y + 22);
        ctx.lineTo(nextX, nextY);
        ctx.stroke();
      }
    }

    // Overlay stage banners
    ctx.font = "10px 'DM Mono', monospace";
    ctx.fillStyle = "#899087";
    ctx.fillText("COMPUTATION (BYTECODE)", 24, 30);
    ctx.fillText("↓ TRANSFORMING", 24, height / 2);
    ctx.fillStyle = "#c7e36b";
    ctx.fillText("DATA LOCALITY & STORAGE ENGINE (PRAXIS)", 24, height - 20);

    return () => {
      resizeObs.disconnect();
    };
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
