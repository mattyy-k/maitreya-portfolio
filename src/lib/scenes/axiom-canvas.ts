import { getAxiomProgress, type AxiomScene } from "@/lib/scenes/axiom";

export class AxiomCanvasScene implements AxiomScene {
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
    this.progress = progress;
  }

  render() {
    const context = this.context;
    if (!context || this.width === 0 || this.height === 0) return;
    const { normalized, stage, stageProgress } = getAxiomProgress(this.progress);
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const radius = Math.min(this.width, this.height) * 0.24;

    context.clearRect(0, 0, this.width, this.height);
    context.fillStyle = "#090a09";
    context.fillRect(0, 0, this.width, this.height);
    context.strokeStyle = "rgba(199, 227, 107, 0.2)";
    context.strokeRect(0.5, 0.5, this.width - 1, this.height - 1);
    context.font = "9px monospace";
    context.fillStyle = "#899087";
    context.fillText("AXIOM / CANVAS TRACE", 18, 24);
    context.fillText(`${String(Math.round(normalized * 100)).padStart(3, "0")}%`, this.width - 38, 24);

    context.lineWidth = 1;
    if (stage === "source") this.drawSource(context, centerX, centerY, radius, stageProgress);
    if (stage === "tokens") this.drawTokens(context, centerX, centerY, radius, stageProgress);
    if (stage === "ast") this.drawAst(context, centerX, centerY, radius, stageProgress);
    if (stage === "bytecode") this.drawBytecode(context, centerX, centerY, radius, stageProgress);
    if (stage === "execution") this.drawExecution(context, centerX, centerY, radius, stageProgress);
  }

  private drawSource(context: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number, progress: number) {
    context.font = "11px monospace";
    for (let index = 0; index < 6; index += 1) {
      const y = centerY - radius + index * 19;
      const width = radius * (0.7 + ((index % 3) * 0.12));
      context.fillStyle = index <= progress * 6 ? "#c7e36b" : "#343934";
      context.fillRect(centerX - radius, y, width, 3);
      context.fillStyle = "#899087";
      context.fillText(`${String(index + 1).padStart(2, "0")}  ${index % 2 ? "return value" : "compile node"}`, centerX - radius, y + 13);
    }
  }

  private drawTokens(context: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number, progress: number) {
    const count = Math.max(3, Math.round(3 + progress * 7));
    context.strokeStyle = "rgba(199, 227, 107, 0.35)";
    context.beginPath();
    context.moveTo(centerX - radius * 1.35, centerY);
    context.lineTo(centerX + radius * 1.35, centerY);
    context.stroke();
    for (let index = 0; index < count; index += 1) {
      const x = centerX - radius * 1.2 + index * (radius * 2.4 / Math.max(1, count - 1));
      context.fillStyle = index % 2 ? "#c56f4e" : "#c7e36b";
      context.fillRect(x - 7, centerY - 12, 14, 24);
      context.fillStyle = "#090a09";
      context.font = "9px monospace";
      context.fillText(index % 2 ? "op" : "id", x - 6, centerY + 3);
    }
  }

  private drawAst(context: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number, progress: number) {
    const branches = Math.max(2, Math.round(2 + progress * 3));
    context.strokeStyle = "#c7e36b";
    context.beginPath();
    context.moveTo(centerX, centerY - radius);
    context.lineTo(centerX, centerY);
    context.stroke();
    context.fillStyle = "#c56f4e";
    context.fillRect(centerX - 18, centerY - radius - 8, 36, 16);
    for (let index = 0; index < branches; index += 1) {
      const x = centerX - radius + index * (radius * 2 / Math.max(1, branches - 1));
      const y = centerY + radius * 0.65;
      context.beginPath();
      context.moveTo(centerX, centerY);
      context.lineTo(x, y);
      context.stroke();
      context.strokeRect(x - 16, y - 8, 32, 16);
    }
  }

  private drawBytecode(context: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number, progress: number) {
    const slots = Math.max(4, Math.round(4 + progress * 5));
    for (let index = 0; index < slots; index += 1) {
      const x = centerX - radius * 1.3 + index * (radius * 2.6 / Math.max(1, slots - 1));
      context.strokeStyle = index <= progress * slots ? "#c7e36b" : "#343934";
      context.strokeRect(x - 15, centerY - 15, 30, 30);
      context.fillStyle = index % 2 ? "#c56f4e" : "#899087";
      context.font = "9px monospace";
      context.fillText(`0${index + 1}`, x - 8, centerY + 3);
    }
  }

  private drawExecution(context: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number, progress: number) {
    const frames = Math.max(2, Math.round(2 + progress * 2));
    for (let index = 0; index < frames; index += 1) {
      const width = radius * (1.35 - index * 0.2);
      const y = centerY - radius + index * 34;
      context.strokeStyle = index === frames - 1 ? "#c7e36b" : "#c56f4e";
      context.strokeRect(centerX - width / 2, y, width, 25);
      context.fillStyle = "#899087";
      context.font = "9px monospace";
      context.fillText(index === frames - 1 ? "operand stack" : "call frame", centerX - width / 2 + 8, y + 16);
    }
  }

  destroy() {
    this.context = null;
  }
}