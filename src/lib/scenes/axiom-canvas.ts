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

    context.strokeStyle = "rgba(199, 227, 107, 0.3)";
    context.beginPath();
    context.moveTo(centerX - radius * 1.6, centerY);
    context.lineTo(centerX + radius * 1.6, centerY);
    context.moveTo(centerX, centerY - radius * 1.6);
    context.lineTo(centerX, centerY + radius * 1.6);
    context.stroke();

    const nodeCount = Math.max(3, Math.round(3 + stageProgress * 5));
    for (let index = 0; index < nodeCount; index += 1) {
      const angle = (Math.PI * 2 * index) / nodeCount - Math.PI / 2;
      const distance = radius * (stage === "source" ? 1.25 : 1);
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      context.strokeStyle = index % 2 === 0 ? "#c7e36b" : "#c56f4e";
      context.strokeRect(x - 4, y - 4, 8, 8);
      context.beginPath();
      context.moveTo(centerX, centerY);
      context.lineTo(x, y);
      context.stroke();
    }

    context.strokeStyle = "#c56f4e";
    context.lineWidth = 1;
    context.strokeRect(centerX - 24, centerY - 24, 48, 48);
    context.fillStyle = "#c7e36b";
    context.font = "12px monospace";
    context.fillText(stage.toUpperCase(), centerX - context.measureText(stage.toUpperCase()).width / 2, centerY + 4);
  }

  destroy() {
    this.context = null;
  }
}