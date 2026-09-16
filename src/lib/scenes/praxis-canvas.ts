export type PraxisStage = "request" | "lookup" | "hit_miss" | "lru_eviction" | "warm_epoch";

export class PraxisCanvasScene {
  private readonly canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null = null;
  private width = 0;
  private height = 0;
  private progress = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  init() {
    this.context = this.canvas.getContext("2d");
    this.canvas.setAttribute("aria-hidden", "true");
  }

  resize(width: number, height: number) {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    this.width = Math.max(1, width);
    this.height = Math.max(1, height);
    this.canvas.width = Math.round(this.width * ratio);
    this.canvas.height = Math.round(this.height * ratio);
    this.canvas.style.aspectRatio = `${this.width} / ${this.height}`;
    this.context?.setTransform(ratio, 0, 0, ratio, 0, 0);
    this.render();
  }

  setProgress(progress: number) {
    this.progress = Math.max(0, Math.min(1, progress));
  }

  render() {
    const context = this.context;
    if (!context || this.width === 0 || this.height === 0) return;

    const p = this.progress;
    context.clearRect(0, 0, this.width, this.height);

    // Canvas Background
    context.fillStyle = "#090a09";
    context.fillRect(0, 0, this.width, this.height);

    // Technical Border
    context.strokeStyle = "rgba(197, 111, 78, 0.3)";
    context.lineWidth = 1;
    context.strokeRect(0.5, 0.5, this.width - 1, this.height - 1);

    // Header Badge
    context.font = "500 10px 'DM Mono', monospace";
    context.fillStyle = "#899087";
    context.fillText("PRAXIS // BATCH STORAGE ENGINE", 20, 26);

    const centerX = this.width / 2;
    const centerY = this.height / 2 + 5;

    // Sub-stage breakdown based on progress
    if (p < 0.25) {
      this.drawRequestStream(context, centerX, centerY, p / 0.25);
    } else if (p < 0.5) {
      this.drawHashLookupAndCache(context, centerX, centerY);
    } else if (p < 0.75) {
      this.drawLRUEviction(context, centerX, centerY, (p - 0.5) / 0.25);
    } else {
      this.drawWarmEpochSpeedup(context, centerX, centerY);
    }

    // Bottom Status Line
    context.font = "9px 'DM Mono', monospace";
    context.fillStyle = "#5d645c";
    context.fillText(`PROGRESS: ${(p * 100).toFixed(1)}%`, 20, this.height - 16);
    context.fillText(`PYTORCH CACHEDDATASET / C++20 OK`, this.width - 220, this.height - 16);
  }

  // 1. REQUEST STREAM
  private drawRequestStream(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, progress: number) {
    ctx.font = "10px 'DM Mono', monospace";
    ctx.fillStyle = "#899087";
    ctx.fillText("> BATCH REQUEST STREAM (PYTORCH BATCHES)", centerX - 160, centerY - 80);

    const batchCount = 6;
    const startX = centerX - 160;

    for (let i = 0; i < batchCount; i++) {
      const offset = ((i / batchCount + progress * 0.8) % 1) * 320;
      const x = startX + offset;
      const y = centerY - 15;

      ctx.fillStyle = "#141a14";
      ctx.fillRect(x - 20, y - 20, 40, 40);
      ctx.strokeStyle = i % 2 === 0 ? "#c56f4e" : "#c7e36b";
      ctx.strokeRect(x - 20, y - 20, 40, 40);

      ctx.font = "8px 'DM Mono', monospace";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(`B_${i}`, x - 10, y + 4);
    }

    ctx.strokeStyle = "rgba(197, 111, 78, 0.4)";
    ctx.beginPath();
    ctx.moveTo(startX - 10, centerY + 35);
    ctx.lineTo(startX + 330, centerY + 35);
    ctx.stroke();

    ctx.fillStyle = "#c56f4e";
    ctx.font = "9px 'DM Mono', monospace";
    ctx.fillText("ML EPOCH REQUESTS INCOMING", centerX - 90, centerY + 55);
  }

  // 2. HASH LOOKUP & CACHE HIT / MISS
  private drawHashLookupAndCache(ctx: CanvasRenderingContext2D, centerX: number, centerY: number) {
    ctx.font = "10px 'DM Mono', monospace";
    ctx.fillStyle = "#899087";
    ctx.fillText("> HASH INDEX & CACHE HIT / MISS EVALUATION", centerX - 160, centerY - 85);

    // Hash Index Box (Left)
    const hashX = centerX - 170;
    const hashY = centerY - 55;
    ctx.fillStyle = "#101410";
    ctx.fillRect(hashX, hashY, 140, 130);
    ctx.strokeStyle = "#2c362c";
    ctx.strokeRect(hashX, hashY, 140, 130);

    ctx.font = "9px 'DM Mono', monospace";
    ctx.fillStyle = "#c7e36b";
    ctx.fillText("HASH INDEX", hashX + 12, hashY + 18);

    const slots = ["key_0x8F (HIT)", "key_0x91 (MISS)", "key_0xA4 (HIT)", "key_0xB2 (MISS)"];
    slots.forEach((s, idx) => {
      const y = hashY + 32 + idx * 22;
      const isHit = s.includes("HIT");
      ctx.fillStyle = isHit ? "rgba(199, 227, 107, 0.15)" : "rgba(197, 111, 78, 0.15)";
      ctx.fillRect(hashX + 8, y, 124, 18);
      ctx.fillStyle = isHit ? "#c7e36b" : "#c56f4e";
      ctx.fillText(s, hashX + 12, y + 13);
    });

    // Arrow to Vector Storage
    ctx.strokeStyle = "#899087";
    ctx.beginPath();
    ctx.moveTo(hashX + 140, centerY + 10);
    ctx.lineTo(centerX + 30, centerY + 10);
    ctx.stroke();

    // Contiguous Vector Metadata (Right)
    const vecX = centerX + 30;
    const vecY = centerY - 55;
    ctx.fillStyle = "#101410";
    ctx.fillRect(vecX, vecY, 140, 130);
    ctx.strokeStyle = "#2c362c";
    ctx.strokeRect(vecX, vecY, 140, 130);

    ctx.fillStyle = "#c56f4e";
    ctx.fillText("VECTOR METADATA", vecX + 10, vecY + 18);

    for (let i = 0; i < 4; i++) {
      const y = vecY + 32 + i * 22;
      ctx.fillStyle = "#1a221a";
      ctx.fillRect(vecX + 8, y, 124, 18);
      ctx.strokeStyle = "#323e32";
      ctx.strokeRect(vecX + 8, y, 124, 18);

      ctx.fillStyle = "#e3e7dd";
      ctx.fillText(`Slot #${i} [64KB]`, vecX + 12, y + 13);
    }
  }

  // 3. LRU EVICTION
  private drawLRUEviction(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, progress: number) {
    ctx.font = "10px 'DM Mono', monospace";
    ctx.fillStyle = "#899087";
    ctx.fillText("> MEMORY-BOUNDED LRU EVICTION FLOW", centerX - 160, centerY - 85);

    const blocks = [
      { id: "B_01", age: "LRU (OLD)", evict: true },
      { id: "B_02", age: "RECENT", evict: false },
      { id: "B_03", age: "RECENT", evict: false },
      { id: "B_04", age: "MRU (NEW)", evict: false },
    ];

    const startX = centerX - 180;

    blocks.forEach((b, idx) => {
      const x = startX + idx * 92;
      const y = centerY - 25;

      const isEvicted = b.evict && progress > 0.4;

      ctx.fillStyle = isEvicted ? "rgba(226, 93, 72, 0.15)" : "#101410";
      ctx.fillRect(x, y, 78, 60);
      ctx.strokeStyle = isEvicted ? "#e25d48" : "#2c362c";
      ctx.strokeRect(x, y, 78, 60);

      ctx.font = "10px 'DM Mono', monospace";
      ctx.fillStyle = isEvicted ? "#e25d48" : "#e3e7dd";
      ctx.fillText(b.id, x + 10, y + 24);

      ctx.font = "8px 'DM Mono', monospace";
      ctx.fillStyle = isEvicted ? "#e25d48" : "#899087";
      ctx.fillText(b.age, x + 8, y + 46);
    });

    if (progress > 0.4) {
      ctx.fillStyle = "#e25d48";
      ctx.font = "10px 'DM Mono', monospace";
      ctx.fillText("! MEMORY LIMIT REACHED -> EVICTING LRU BLOCK B_01", centerX - 150, centerY + 65);
    }
  }

  // 4. WARM EPOCH SPEEDUP (13X COMPARISON)
  private drawWarmEpochSpeedup(ctx: CanvasRenderingContext2D, centerX: number, centerY: number) {
    ctx.font = "10px 'DM Mono', monospace";
    ctx.fillStyle = "#899087";
    ctx.fillText("> SYNTHETIC BENCHMARK: REPEATED EPOCH ACCELERATION", centerX - 180, centerY - 85);

    // Bar 1: Cold Epoch (1x)
    const bar1Y = centerY - 35;
    ctx.fillStyle = "#c56f4e";
    ctx.fillRect(centerX - 160, bar1Y, 320, 24);
    ctx.strokeStyle = "#38231a";
    ctx.strokeRect(centerX - 160, bar1Y, 320, 24);

    ctx.font = "10px 'DM Mono', monospace";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("COLD EPOCH 1: 142ms / batch (Preprocessing Overhead)", centerX - 152, bar1Y + 16);

    // Bar 2: Warm Epoch (13x Speedup)
    const bar2Y = centerY + 15;
    const warmWidth = Math.max(26, 320 * (1 / 13));
    ctx.fillStyle = "#c7e36b";
    ctx.fillRect(centerX - 160, bar2Y, warmWidth, 24);
    ctx.strokeStyle = "#2e3b18";
    ctx.strokeRect(centerX - 160, bar2Y, warmWidth, 24);

    ctx.fillStyle = "#c7e36b";
    ctx.fillText("WARM EPOCH 2: 11ms / batch (13x SYNTHETIC SPEEDUP)", centerX - 160 + warmWidth + 12, bar2Y + 16);

    ctx.font = "8px 'DM Mono', monospace";
    ctx.fillStyle = "#656e64";
    ctx.fillText("* Note: 13x measurement based on synthetic in-memory benchmark harness.", centerX - 160, centerY + 65);
  }

  destroy() {
    this.context = null;
  }
}
