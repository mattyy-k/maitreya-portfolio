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

    context.clearRect(0, 0, this.width, this.height);

    // Canvas Background
    context.fillStyle = "#0a0c0a";
    context.fillRect(0, 0, this.width, this.height);

    // Fine Technical Outer Border & Corner Sparks
    context.strokeStyle = "rgba(199, 227, 107, 0.25)";
    context.lineWidth = 1;
    context.strokeRect(0.5, 0.5, this.width - 1, this.height - 1);

    // Header Readout
    context.font = "500 10px 'DM Mono', monospace";
    context.fillStyle = "#899087";
    context.fillText("AXIOM // EXECUTION ENGINE", 20, 26);
    
    // Stage Indicator Badge
    context.fillStyle = "rgba(199, 227, 107, 0.12)";
    context.fillRect(this.width - 140, 14, 120, 18);
    context.strokeStyle = "rgba(199, 227, 107, 0.4)";
    context.strokeRect(this.width - 140, 14, 120, 18);
    context.fillStyle = "#c7e36b";
    context.fillText(stage.toUpperCase(), this.width - 132, 26);

    const centerX = this.width / 2;
    const centerY = this.height / 2 + 10;

    switch (stage) {
      case "source":
        this.drawSourceStage(context, centerX, centerY, stageProgress);
        break;
      case "tokens":
        this.drawTokensStage(context, centerX, centerY, stageProgress);
        break;
      case "ast":
        this.drawAstStage(context, centerX, centerY, stageProgress);
        break;
      case "bytecode":
        this.drawBytecodeStage(context, centerX, centerY, stageProgress);
        break;
      case "execution":
        this.drawExecutionStage(context, centerX, centerY, stageProgress);
        break;
    }

    // Bottom Status Line
    context.font = "9px 'DM Mono', monospace";
    context.fillStyle = "#5d645c";
    context.fillText(`PROGRESS: ${(normalized * 100).toFixed(1)}%`, 20, this.height - 16);
    context.fillText(`C++20 STACK VM / DISPATCH OK`, this.width - 200, this.height - 16);
  }

  // 1. SOURCE STAGE
  private drawSourceStage(context: CanvasRenderingContext2D, centerX: number, centerY: number, progress: number) {
    const codeLines = [
      { num: "01", text: "fn compute_sum(a, b) {" },
      { num: "02", text: "  let factor = 42;" },
      { num: "03", text: "  let total = (a + b) * factor;" },
      { num: "04", text: "  if (total > 1000) gc_collect();" },
      { num: "05", text: "  return total;" },
      { num: "06", text: "}" },
    ];

    const startY = centerY - 65;
    const boxWidth = Math.min(this.width - 32, 420);
    const boxX = centerX - boxWidth / 2;

    // Code Editor Container Box
    context.fillStyle = "#101310";
    context.fillRect(boxX, startY - 20, boxWidth, 160);
    context.strokeStyle = "#2a302a";
    context.strokeRect(boxX, startY - 20, boxWidth, 160);

    const fontSize = this.width < 440 ? 10 : 12;
    context.font = `${fontSize}px 'DM Mono', monospace`;
    const lineCount = Math.floor(progress * codeLines.length) + 1;
    const charW = fontSize * 0.61;

    codeLines.forEach((line, idx) => {
      const y = startY + idx * 22;
      const isCurrent = idx === Math.min(lineCount - 1, codeLines.length - 1);

      // Line number
      context.fillStyle = isCurrent ? "#c7e36b" : "#444b44";
      context.fillText(line.num, boxX + 12, y);

      // Line content
      context.fillStyle = idx < lineCount ? "#e3e7dd" : "#343934";
      context.fillText(line.text, boxX + 38, y);

      // Scan highlight on active line
      if (isCurrent) {
        context.fillStyle = "rgba(199, 227, 107, 0.15)";
        context.fillRect(boxX + 34, y - 12, Math.min(boxWidth - 44, line.text.length * charW + 8), 16);
        // Cursor
        context.fillStyle = "#c7e36b";
        context.fillRect(Math.min(boxX + boxWidth - 14, boxX + 38 + line.text.length * charW), y - 10, 5, 14);
      }
    });

    // Scanner label
    context.fillStyle = "#c56f4e";
    context.font = "9px 'DM Mono', monospace";
    context.fillText("> SCANNING UTF-8 SOURCE BUFFER...", boxX, startY + 162);
  }

  // 2. TOKENS STAGE
  private drawTokensStage(context: CanvasRenderingContext2D, centerX: number, centerY: number, progress: number) {
    const tokens = [
      { type: "KEYWORD", val: "fn", color: "#c56f4e" },
      { type: "IDENT", val: "compute_sum", color: "#c7e36b" },
      { type: "SYMBOL", val: "(", color: "#899087" },
      { type: "PARAM", val: "a", color: "#e3e7dd" },
      { type: "COMMA", val: ",", color: "#899087" },
      { type: "PARAM", val: "b", color: "#e3e7dd" },
      { type: "SYMBOL", val: ")", color: "#899087" },
      { type: "LBRACE", val: "{", color: "#899087" },
      { type: "KEYWORD", val: "let", color: "#c56f4e" },
      { type: "IDENT", val: "factor", color: "#c7e36b" },
      { type: "ASSIGN", val: "=", color: "#899087" },
      { type: "INT_LIT", val: "42", color: "#c7e36b" },
      { type: "SEMI", val: ";", color: "#899087" },
    ];

    context.font = "10px 'DM Mono', monospace";
    context.fillStyle = "#899087";
    context.fillText("> TOKEN STREAM (LEXICAL ANALYSIS)", Math.max(16, centerX - 160), centerY - 80);

    const cardWidth = this.width < 480 ? 58 : 72;
    const gap = this.width < 480 ? 6 : 10;
    const maxVisibleFit = Math.max(2, Math.floor((this.width - 32) / (cardWidth + gap)));
    const targetIdx = Math.max(1, Math.floor(progress * tokens.length));
    const startIdx = Math.max(0, Math.min(tokens.length - maxVisibleFit, targetIdx - Math.floor(maxVisibleFit / 2)));
    const endIdx = Math.min(tokens.length, startIdx + maxVisibleFit);
    const visibleTokens = tokens.slice(startIdx, endIdx);

    const totalW = visibleTokens.length * (cardWidth + gap) - gap;
    const startX = centerX - totalW / 2;

    visibleTokens.forEach((tok, i) => {
      const globalIdx = startIdx + i;
      const x = startX + i * (cardWidth + gap);
      const y = centerY - 20 + Math.sin(globalIdx * 0.8 + progress * 6) * 4;
      const isTarget = globalIdx === targetIdx - 1;

      // Token Card
      context.fillStyle = "#121612";
      context.fillRect(x, y, cardWidth, 48);
      context.strokeStyle = isTarget ? "#c7e36b" : "#2e352e";
      context.lineWidth = 1;
      context.strokeRect(x, y, cardWidth, 48);

      // Token Type
      context.font = "7.5px 'DM Mono', monospace";
      context.fillStyle = tok.color;
      context.fillText(tok.type, x + 4, y + 14);

      // Token Value
      context.font = "500 10.5px 'DM Mono', monospace";
      context.fillStyle = "#ffffff";
      context.fillText(tok.val.length > 8 ? tok.val.slice(0, 7) + "…" : tok.val, x + 4, y + 34);
    });

    // Arrow stream indicator
    const trackW = Math.min(360, this.width - 40);
    context.strokeStyle = "rgba(199, 227, 107, 0.4)";
    context.beginPath();
    context.moveTo(centerX - trackW / 2, centerY + 55);
    context.lineTo(centerX + trackW / 2, centerY + 55);
    context.stroke();

    context.fillStyle = "#c7e36b";
    context.font = "9px 'DM Mono', monospace";
    context.fillText("TOKENS SCANNING -> LEXER MATCHING OK", Math.max(16, centerX - 110), centerY + 75);
  }

  // 3. AST STAGE
  private drawAstStage(context: CanvasRenderingContext2D, centerX: number, centerY: number, progress: number) {
    context.font = "10px 'DM Mono', monospace";
    context.fillStyle = "#899087";
    context.fillText("> ABSTRACT SYNTAX TREE (RECURSIVE DESCENT)", Math.max(16, centerX - 160), centerY - 95);

    const treeProgress = Math.min(1, progress * 1.2);
    const scale = Math.min(1, Math.max(0.65, (this.width - 40) / 460));
    const cardW = Math.round(116 * scale);
    const cardH = 22;

    // Nodes with dynamic horizontal spread
    const root = { x: centerX, y: centerY - 60, label: "FnDecl: compute_sum", type: "ROOT" };
    const leftChild = { x: centerX - 115 * scale, y: centerY - 5, label: "Assign: total", type: "STMT" };
    const rightChild = { x: centerX + 115 * scale, y: centerY - 5, label: "ReturnStmt", type: "STMT" };
    const binOp = { x: centerX - 115 * scale, y: centerY + 50, label: "BinaryOp: *", type: "EXPR" };
    const subAdd = { x: centerX - 160 * scale, y: centerY + 95, label: "Add (a, b)", type: "EXPR" };
    const subConst = { x: centerX - 65 * scale, y: centerY + 95, label: "Const: 42", type: "LITERAL" };

    const nodes = [root, leftChild, rightChild, binOp, subAdd, subConst];
    const connections = [
      [root, leftChild],
      [root, rightChild],
      [leftChild, binOp],
      [binOp, subAdd],
      [binOp, subConst],
    ];

    // Render tree branches
    context.strokeStyle = "#384238";
    context.lineWidth = 1.5;
    connections.forEach(([parent, child], idx) => {
      if (idx <= treeProgress * connections.length) {
        context.beginPath();
        context.moveTo(parent.x, parent.y + 11);
        context.lineTo(child.x, child.y - 11);
        context.stroke();
      }
    });

    // Render Tree Node Cards
    nodes.forEach((node, idx) => {
      if (idx <= treeProgress * nodes.length) {
        const x = node.x - cardW / 2;
        const y = node.y - cardH / 2;

        context.fillStyle = node.type === "ROOT" ? "#1b241b" : "#121512";
        context.fillRect(x, y, cardW, cardH);
        context.strokeStyle = node.type === "ROOT" ? "#c7e36b" : "#2a332a";
        context.strokeRect(x, y, cardW, cardH);

        context.font = `${Math.round(8.5 * scale)}px 'DM Mono', monospace`;
        context.fillStyle = node.type === "ROOT" ? "#c7e36b" : "#e3e7dd";
        context.fillText(node.label, x + 6, y + 14);
      }
    });
  }

  // 4. BYTECODE STAGE
  private drawBytecodeStage(context: CanvasRenderingContext2D, centerX: number, centerY: number, progress: number) {
    context.font = "10px 'DM Mono', monospace";
    context.fillStyle = "#899087";
    context.fillText("> BYTECODE COMPILER (COMPACT OPCODE DISPATCH)", Math.max(16, centerX - 160), centerY - 90);

    const bytecodeInstructions = [
      { offset: "0x00", opcode: "LOAD_CONST", arg: "#0 (42)", hex: "14 00 00" },
      { offset: "0x03", opcode: "STORE_FAST", arg: "#1 (factor)", hex: "2A 00 01" },
      { offset: "0x06", opcode: "LOAD_FAST", arg: "#2 (a)", hex: "28 00 02" },
      { offset: "0x09", opcode: "LOAD_FAST", arg: "#3 (b)", hex: "28 00 03" },
      { offset: "0x0C", opcode: "BINARY_ADD", arg: "", hex: "40 00 00" },
      { offset: "0x0D", opcode: "LOAD_FAST", arg: "#1 (factor)", hex: "28 00 01" },
      { offset: "0x10", opcode: "BINARY_MULTIPLY", arg: "", hex: "42 00 00" },
      { offset: "0x11", opcode: "RETURN_VALUE", arg: "", hex: "50 00 00" },
    ];

    const visibleRows = Math.max(3, Math.floor(progress * bytecodeInstructions.length));
    const startY = centerY - 65;
    const tableW = Math.min(this.width - 32, 440);
    const tableX = centerX - tableW / 2;
    const showHex = tableW >= 370;

    bytecodeInstructions.slice(0, visibleRows).forEach((inst, idx) => {
      const y = startY + idx * 22;
      const isLatest = idx === visibleRows - 1;

      context.fillStyle = isLatest ? "#172017" : "#101310";
      context.fillRect(tableX, y, tableW, 20);
      context.strokeStyle = isLatest ? "rgba(199, 227, 107, 0.4)" : "#222722";
      context.strokeRect(tableX, y, tableW, 20);

      // Offset
      context.font = "9.5px 'DM Mono', monospace";
      context.fillStyle = "#c56f4e";
      context.fillText(inst.offset, tableX + 8, y + 14);

      // Opcode
      context.fillStyle = isLatest ? "#c7e36b" : "#e3e7dd";
      context.fillText(inst.opcode, tableX + 56, y + 14);

      // Args
      context.fillStyle = "#899087";
      context.fillText(inst.arg, tableX + (showHex ? 180 : 160), y + 14);

      // Raw Bytes
      if (showHex) {
        context.fillStyle = "#4a524a";
        context.fillText(inst.hex, tableX + tableW - 74, y + 14);
      }
    });
  }

  // 5. STACK VM EXECUTION STAGE & GC
  private drawExecutionStage(context: CanvasRenderingContext2D, centerX: number, centerY: number, progress: number) {
    context.font = "10px 'DM Mono', monospace";
    context.fillStyle = "#899087";
    context.fillText("> STACK VM EXECUTION & MARK-SWEEP GC", Math.max(16, centerX - 160), centerY - 95);

    const availableW = this.width - 36;
    const boxW = Math.min(165, Math.floor((availableW - 12) / 2));
    const stackX = centerX - boxW - 6;
    const heapX = centerX + 6;
    const stackY = centerY - 65;
    const stackH = 170;

    // Left Container: Operand Stack
    context.fillStyle = "#0e110e";
    context.fillRect(stackX, stackY, boxW, stackH);
    context.strokeStyle = "#272e27";
    context.strokeRect(stackX, stackY, boxW, stackH);

    context.font = "8.5px 'DM Mono', monospace";
    context.fillStyle = "#c7e36b";
    context.fillText("OPERAND STACK", stackX + 8, stackY + 18);

    // Dynamic Stack Items based on progress
    const stackItems = [
      { val: "Val::Int(42)", color: "#c7e36b" },
      { val: "Val::Int(108)", color: "#c7e36b" },
      { val: "Handle->Array", color: "#c56f4e" },
      { val: "Val::Bool(true)", color: "#e3e7dd" },
    ];
    const activeCount = Math.max(1, Math.floor(1 + Math.sin(progress * Math.PI * 4) * 2 + 1.5));

    for (let i = 0; i < Math.min(activeCount, stackItems.length); i++) {
      const itemY = stackY + stackH - 30 - i * 28;
      context.fillStyle = "#182018";
      context.fillRect(stackX + 6, itemY, boxW - 12, 22);
      context.strokeStyle = "#323d32";
      context.strokeRect(stackX + 6, itemY, boxW - 12, 22);

      context.fillStyle = stackItems[i].color;
      context.fillText(stackItems[i].val, stackX + 10, itemY + 15);
    }

    // Right Container: Heap & GC Sweep Line
    const heapW = boxW;
    const heapH = stackH;
    const heapY = stackY;

    context.fillStyle = "#0e110e";
    context.fillRect(heapX, heapY, heapW, heapH);
    context.strokeStyle = "#272e27";
    context.strokeRect(heapX, heapY, heapW, heapH);

    context.font = "8.5px 'DM Mono', monospace";
    context.fillStyle = "#c56f4e";
    context.fillText("HEAP OBJECTS & GC", heapX + 8, heapY + 18);

    // Heap objects grid
    const cols = 3;
    const rows = 3;
    const dotW = Math.max(16, Math.floor((heapW - 32) / cols));
    const dotH = 18;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const itemIdx = r * cols + c;
        const objX = heapX + 12 + c * (dotW + 6);
        const objY = heapY + 36 + r * (dotH + 16);
        const state = (itemIdx + Math.floor(progress * 5)) % 3;
        const color = state === 0 ? "#c7e36b" : state === 1 ? "#e25d48" : "#343934";

        context.fillStyle = color;
        context.fillRect(objX, objY, dotW, dotH);
        context.strokeStyle = "#444b44";
        context.strokeRect(objX, objY, dotW, dotH);
      }
    }

    // GC Sweep Line moving down
    const sweepY = heapY + 30 + (progress * 130) % 130;
    context.strokeStyle = "rgba(226, 93, 72, 0.7)";
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(heapX + 4, sweepY);
    context.lineTo(heapX + heapW - 4, sweepY);
    context.stroke();

    context.fillStyle = "#e25d48";
    context.font = "8px 'DM Mono', monospace";
    context.fillText("GC SWEEP", heapX + Math.max(4, heapW / 2 - 20), sweepY - 4);
  }

  destroy() {
    this.context = null;
  }
}