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
    ctx.fillText("> BATCH REQUEST STREAM (PYTORCH BATCHES)", Math.max(16, centerX - 160), centerY - 80);

    const trackW = Math.min(this.width - 48, 320);
    const startX = centerX - trackW / 2;
    const batchCount = this.width < 440 ? 4 : 6;
    const cardSize = this.width < 440 ? 32 : 38;

    for (let i = 0; i < batchCount; i++) {
      const offset = ((i / batchCount + progress * 0.8) % 1) * trackW;
      const x = startX + offset;
      const y = centerY - 15;

      ctx.fillStyle = "#141a14";
      ctx.fillRect(x - cardSize / 2, y - cardSize / 2, cardSize, cardSize);
      ctx.strokeStyle = i % 2 === 0 ? "#c56f4e" : "#c7e36b";
      ctx.strokeRect(x - cardSize / 2, y - cardSize / 2, cardSize, cardSize);

      ctx.font = "8px 'DM Mono', monospace";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(`B_${i}`, x - 8, y + 3);
    }

    ctx.strokeStyle = "rgba(197, 111, 78, 0.4)";
    ctx.beginPath();
    ctx.moveTo(startX - 6, centerY + 35);
    ctx.lineTo(startX + trackW + 6, centerY + 35);
    ctx.stroke();

    ctx.fillStyle = "#c56f4e";
    ctx.font = "9px 'DM Mono', monospace";
    ctx.fillText("ML EPOCH REQUESTS INCOMING", Math.max(16, centerX - 90), centerY + 55);
  }

  // 2. HASH LOOKUP & CACHE HIT / MISS
  private drawHashLookupAndCache(ctx: CanvasRenderingContext2D, centerX: number, centerY: number) {
    ctx.font = "10px 'DM Mono', monospace";
    ctx.fillStyle = "#899087";
    ctx.fillText("> HASH INDEX & CACHE HIT / MISS EVALUATION", Math.max(16, centerX - 160), centerY - 85);

    const availableW = this.width - 36;
    const boxW = Math.min(145, Math.floor((availableW - 14) / 2));
    const hashX = centerX - boxW - 7;
    const vecX = centerX + 7;
    const boxY = centerY - 55;
    const boxH = 130;

    // Hash Index Box (Left)
    ctx.fillStyle = "#101410";
    ctx.fillRect(hashX, boxY, boxW, boxH);
    ctx.strokeStyle = "#2c362c";
    ctx.strokeRect(hashX, boxY, boxW, boxH);

    ctx.font = "8.5px 'DM Mono', monospace";
    ctx.fillStyle = "#c7e36b";
    ctx.fillText("HASH INDEX", hashX + 8, boxY + 18);

    const slots = ["key_0x8F (HIT)", "key_0x91 (MISS)", "key_0xA4 (HIT)", "key_0xB2 (MISS)"];
    slots.forEach((s, idx) => {
      const y = boxY + 30 + idx * 22;
      const isHit = s.includes("HIT");
      ctx.fillStyle = isHit ? "rgba(199, 227, 107, 0.15)" : "rgba(197, 111, 78, 0.15)";
      ctx.fillRect(hashX + 6, y, boxW - 12, 18);
      ctx.fillStyle = isHit ? "#c7e36b" : "#c56f4e";
      ctx.font = "8px 'DM Mono', monospace";
      ctx.fillText(boxW < 120 ? s.replace("key_", "") : s, hashX + 10, y + 13);
    });

    // Arrow to Vector Storage
    ctx.strokeStyle = "#899087";
    ctx.beginPath();
    ctx.moveTo(hashX + boxW, centerY + 10);
    ctx.lineTo(vecX, centerY + 10);
    ctx.stroke();

    // Contiguous Vector Metadata (Right)
    ctx.fillStyle = "#101410";
    ctx.fillRect(vecX, boxY, boxW, boxH);
    ctx.strokeStyle = "#2c362c";
    ctx.strokeRect(vecX, boxY, boxW, boxH);

    ctx.font = "8.5px 'DM Mono', monospace";
    ctx.fillStyle = "#c56f4e";
    ctx.fillText("VECTOR METADATA", vecX + 8, boxY + 18);

    for (let i = 0; i < 4; i++) {
      const y = boxY + 30 + i * 22;
      ctx.fillStyle = "#1a221a";
      ctx.fillRect(vecX + 6, y, boxW - 12, 18);
      ctx.strokeStyle = "#323e32";
      ctx.strokeRect(vecX + 6, y, boxW - 12, 18);

      ctx.fillStyle = "#e3e7dd";
      ctx.font = "8px 'DM Mono', monospace";
      ctx.fillText(`Slot #${i} [64KB]`, vecX + 10, y + 13);
    }
  }

  // 3. LRU EVICTION
  private drawLRUEviction(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, progress: number) {
    ctx.font = "10px 'DM Mono', monospace";
    ctx.fillStyle = "#899087";
    ctx.fillText("> MEMORY-BOUNDED LRU EVICTION FLOW", Math.max(16, centerX - 160), centerY - 85);

    const blocks = [
      { id: "B_01", age: "LRU (OLD)", evict: true },
      { id: "B_02", age: "RECENT", evict: false },
      { id: "B_03", age: "RECENT", evict: false },
      { id: "B_04", age: "MRU (NEW)", evict: false },
    ];

    const availableW = this.width - 36;
    const blockW = Math.min(78, Math.floor((availableW - 24) / 4));
    const gap = Math.min(10, Math.max(4, Math.floor((availableW - blockW * 4) / 3)));
    const totalW = blockW * 4 + gap * 3;
    const startX = centerX - totalW / 2;

    blocks.forEach((b, idx) => {
      const x = startX + idx * (blockW + gap);
      const y = centerY - 25;

      const isEvicted = b.evict && progress > 0.4;

      ctx.fillStyle = isEvicted ? "rgba(226, 93, 72, 0.15)" : "#101410";
      ctx.fillRect(x, y, blockW, 58);
      ctx.strokeStyle = isEvicted ? "#e25d48" : "#2c362c";
      ctx.strokeRect(x, y, blockW, 58);

      ctx.font = "9.5px 'DM Mono', monospace";
      ctx.fillStyle = isEvicted ? "#e25d48" : "#e3e7dd";
      ctx.fillText(b.id, x + 8, y + 22);

      ctx.font = "7.5px 'DM Mono', monospace";
      ctx.fillStyle = isEvicted ? "#e25d48" : "#899087";
      ctx.fillText(blockW < 65 ? b.age.split(" ")[0] : b.age, x + 6, y + 44);
    });

    if (progress > 0.4) {
      ctx.fillStyle = "#e25d48";
      ctx.font = "9px 'DM Mono', monospace";
      ctx.fillText("! MEMORY LIMIT REACHED -> EVICTING LRU BLOCK B_01", Math.max(16, centerX - 140), centerY + 65);
    }
  }

  // 4. WARM EPOCH SPEEDUP (13X COMPARISON)
  private drawWarmEpochSpeedup(ctx: CanvasRenderingContext2D, centerX: number, centerY: number) {
    ctx.font = "10px 'DM Mono', monospace";
    ctx.fillStyle = "#899087";
    ctx.fillText("> SYNTHETIC BENCHMARK: REPEATED EPOCH ACCELERATION", Math.max(16, centerX - 180), centerY - 85);

    const barW = Math.min(this.width - 40, 320);
    const startX = centerX - barW / 2;

    // Bar 1: Cold Epoch (1x)
    const bar1Y = centerY - 35;
    ctx.fillStyle = "#c56f4e";
    ctx.fillRect(startX, bar1Y, barW, 24);
    ctx.strokeStyle = "#38231a";
    ctx.strokeRect(startX, bar1Y, barW, 24);

    ctx.font = "9px 'DM Mono', monospace";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(barW < 280 ? "COLD: 142ms / batch" : "COLD EPOCH 1: 142ms / batch", startX + 8, bar1Y + 16);

    // Bar 2: Warm Epoch (13x Speedup)
    const bar2Y = centerY + 15;
    const warmWidth = Math.max(24, Math.round(barW * (1 / 13)));
    ctx.fillStyle = "#c7e36b";
    ctx.fillRect(startX, bar2Y, warmWidth, 24);
    ctx.strokeStyle = "#2e3b18";
    ctx.strokeRect(startX, bar2Y, warmWidth, 24);

    ctx.fillStyle = "#c7e36b";
    ctx.fillText(barW < 280 ? "WARM: 11ms (13x)" : "WARM EPOCH 2: 11ms / batch (13x SPEEDUP)", startX + warmWidth + 8, bar2Y + 16);

    ctx.font = "8px 'DM Mono', monospace";
    ctx.fillStyle = "#656e64";
    ctx.fillText("* Note: 13x measurement based on synthetic in-memory benchmark harness.", Math.max(16, startX), centerY + 65);
  }

  destroy() {
    this.context = null;
  }
}
