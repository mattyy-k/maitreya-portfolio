export class ForgeCanvasScene {
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
    const ctx = this.context;
    if (!ctx || this.width === 0 || this.height === 0) return;

    const p = this.progress;
    ctx.clearRect(0, 0, this.width, this.height);

    // Canvas Background
    ctx.fillStyle = "#090a09";
    ctx.fillRect(0, 0, this.width, this.height);

    // Fine Technical Border
    ctx.strokeStyle = "rgba(199, 227, 107, 0.2)";
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, this.width - 1, this.height - 1);

    // Header Readout
    ctx.font = "500 10px 'DM Mono', monospace";
    ctx.fillStyle = "#899087";
    ctx.fillText("FORGE // POSIX PROCESS GRAPH", 20, 26);

    const centerX = this.width / 2;
    const centerY = this.height / 2 + 5;

    // Parent Shell Process Node (PID 1024)
    const parentX = centerX;
    const parentY = centerY - 75;
    const parentW = Math.min(140, this.width - 32);

    ctx.fillStyle = "#141a14";
    ctx.fillRect(parentX - parentW / 2, parentY - 18, parentW, 36);
    ctx.strokeStyle = "#c7e36b";
    ctx.strokeRect(parentX - parentW / 2, parentY - 18, parentW, 36);

    ctx.font = "9.5px 'DM Mono', monospace";
    ctx.fillStyle = "#c7e36b";
    ctx.fillText("FORGE SHELL (PID 1024)", parentX - parentW / 2 + 10, parentY + 4);

    // Dynamic child node dimensions based on available width
    const availableW = this.width - 32;
    const childW = Math.min(130, Math.floor((availableW - 16) / 2));
    const spread = Math.min(110, Math.floor((availableW - childW) / 2));
    const child1X = centerX - spread;
    const child2X = centerX + spread;
    const childrenY = centerY + 35;

    if (p > 0.2) {
      // Fork lines
      ctx.strokeStyle = "rgba(199, 227, 107, 0.5)";
      ctx.setLineDash([3, 3]);

      ctx.beginPath();
      ctx.moveTo(parentX - Math.min(20, parentW / 4), parentY + 18);
      ctx.lineTo(child1X, childrenY - 18);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(parentX + Math.min(20, parentW / 4), parentY + 18);
      ctx.lineTo(child2X, childrenY - 18);
      ctx.stroke();

      ctx.setLineDash([]);
    }

    if (p > 0.35) {
      // Child Process 1 (cat /var/log)
      ctx.fillStyle = "#121612";
      ctx.fillRect(child1X - childW / 2, childrenY - 18, childW, 36);
      ctx.strokeStyle = "#c56f4e";
      ctx.strokeRect(child1X - childW / 2, childrenY - 18, childW, 36);

      ctx.font = "8.5px 'DM Mono', monospace";
      ctx.fillStyle = "#c56f4e";
      ctx.fillText(childW < 100 ? "CHILD 1" : "CHILD 1 (PID 1025)", child1X - childW / 2 + 8, childrenY - 4);
      ctx.fillStyle = "#899087";
      ctx.fillText("execvp('cat')", child1X - childW / 2 + 8, childrenY + 10);
    }

    if (p > 0.5) {
      // Child Process 2 (grep 'ERROR')
      ctx.fillStyle = "#121612";
      ctx.fillRect(child2X - childW / 2, childrenY - 18, childW, 36);
      ctx.strokeStyle = "#c7e36b";
      ctx.strokeRect(child2X - childW / 2, childrenY - 18, childW, 36);

      ctx.font = "8.5px 'DM Mono', monospace";
      ctx.fillStyle = "#c7e36b";
      ctx.fillText(childW < 100 ? "CHILD 2" : "CHILD 2 (PID 1026)", child2X - childW / 2 + 8, childrenY - 4);
      ctx.fillStyle = "#899087";
      ctx.fillText("execvp('grep')", child2X - childW / 2 + 8, childrenY + 10);
    }

    if (p > 0.65) {
      // POSIX Pipe Connection between Child 1 and Child 2 (dup2 fd[1] -> fd[0])
      const pipeStartX = child1X + childW / 2;
      const pipeEndX = child2X - childW / 2;
      ctx.strokeStyle = "#c7e36b";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(pipeStartX, childrenY);
      ctx.lineTo(pipeEndX, childrenY);
      ctx.stroke();

      const badgeW = Math.min(80, Math.max(50, pipeEndX - pipeStartX - 8));
      ctx.fillStyle = "#101410";
      ctx.fillRect(centerX - badgeW / 2, childrenY - 10, badgeW, 20);
      ctx.strokeStyle = "rgba(199, 227, 107, 0.4)";
      ctx.strokeRect(centerX - badgeW / 2, childrenY - 10, badgeW, 20);

      ctx.font = "7.5px 'DM Mono', monospace";
      ctx.fillStyle = "#c7e36b";
      ctx.fillText(badgeW < 65 ? "PIPE" : "PIPE (3->4)", centerX - badgeW / 2 + 6, childrenY + 3);
    }

    // Bottom Status Line
    ctx.font = "9px 'DM Mono', monospace";
    ctx.fillStyle = "#5d645c";
    ctx.fillText(`PROGRESS: ${(p * 100).toFixed(1)}%`, 20, this.height - 16);
    if (this.width >= 440) {
      ctx.fillText(`FORK / EXECVP / PIPE / DUP2 / WAITPID`, this.width - 240, this.height - 16);
    }
  }

  destroy() {
    this.context = null;
  }
}
