'use client';

import React, { useRef, useEffect } from 'react';

interface DiagramCanvasProps {
  moduleId: string;
}

// ── Color palette ─────────────────────────────────────────────
const COLORS = {
  blue: '#4DA2FF',
  purple: '#3459D1',
  cyan: '#0F8CB8',
  yellow: '#E29A2A',
  green: '#1F8F6F',
  orange: '#F48A3D',
  bg: '#F8FBFF',
  line: '#B9D4EB',
  text: '#16314B',
  muted: '#6F8BA6',
};

// ── Helper drawing functions ──────────────────────────────────

function sketchLine(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string = COLORS.line,
  width: number = 1.5
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.setLineDash([]);
  ctx.beginPath();
  // Add slight wobble for hand-drawn feel
  const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * 2;
  const my = (y1 + y2) / 2 + (Math.random() - 0.5) * 2;
  ctx.moveTo(x1, y1);
  ctx.quadraticCurveTo(mx, my, x2, y2);
  ctx.stroke();
}

function sketchArrow(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string = COLORS.line,
  width: number = 1.5
) {
  sketchLine(ctx, x1, y1, x2, y2, color, width);
  // Arrowhead
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const headLen = 8;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(
    x2 - headLen * Math.cos(angle - Math.PI / 6),
    y2 - headLen * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(
    x2 - headLen * Math.cos(angle + Math.PI / 6),
    y2 - headLen * Math.sin(angle + Math.PI / 6)
  );
  ctx.closePath();
  ctx.fill();
}

function sketchRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string,
  radius: number = 6
) {
  ctx.fillStyle = color + '20';
  ctx.strokeStyle = color + '60';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, radius);
  ctx.fill();
  ctx.stroke();
}

function boxWithLabel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  label: string,
  color: string,
  fontSize: number = 11
) {
  sketchRect(ctx, x, y, w, h, color);
  ctx.fillStyle = color;
  ctx.font = `600 ${fontSize}px "TWK Everett", "Inter Tight", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, x + w / 2, y + h / 2);
}

function dashedLine(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string = COLORS.muted
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.setLineDash([]);
}

function labelText(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string,
  color: string = COLORS.text,
  fontSize: number = 10,
  align: CanvasTextAlign = 'center'
) {
  ctx.fillStyle = color;
  ctx.font = `500 ${fontSize}px "Google Sans", sans-serif`;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
}

function monoText(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string,
  color: string = COLORS.cyan,
  fontSize: number = 10
) {
  ctx.fillStyle = color;
  ctx.font = `500 ${fontSize}px "IBM Plex Mono", monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
}

// ── Diagram drawing functions for each module ─────────────────

function drawR1(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // R1: Code -> serialport -> USB Driver -> Bittle -> Servos
  const cy = h / 2;
  const startX = 40;
  const gap = (w - 80) / 4;

  const boxes = [
    { label: 'Your Code', color: COLORS.blue },
    { label: 'serialport', color: COLORS.purple },
    { label: 'USB Driver', color: COLORS.cyan },
    { label: 'Bittle', color: COLORS.yellow },
    { label: 'Servos', color: COLORS.green },
  ];

  boxes.forEach((box, i) => {
    const x = startX + i * gap;
    boxWithLabel(ctx, x - 40, cy - 18, 80, 36, box.label, box.color);
    if (i < boxes.length - 1) {
      sketchArrow(ctx, x + 42, cy, x + gap - 42, cy, box.color);
    }
  });

  // Byte visualization
  monoText(ctx, w / 2, cy + 50, 'k  s  i  t  \\n', COLORS.cyan, 12);
  labelText(ctx, w / 2, cy + 68, 'Serial byte stream', COLORS.muted, 9);

  // Title
  labelText(ctx, w / 2, 20, 'R1: Serial Communication Flow', COLORS.text, 13);
}

function drawR2(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // R2: User -> Sui Network -> ActionQueue (shared) with events
  const cy = h / 2 - 10;

  boxWithLabel(ctx, 40, cy - 18, 80, 36, 'User', COLORS.blue);
  sketchArrow(ctx, 122, cy, 178, cy, COLORS.blue);
  boxWithLabel(ctx, 180, cy - 18, 110, 36, 'Sui Network', COLORS.purple);
  sketchArrow(ctx, 292, cy, 348, cy, COLORS.purple);
  boxWithLabel(ctx, 350, cy - 18, 110, 36, 'ActionQueue', COLORS.yellow);

  // Shared object annotation
  monoText(ctx, 405, cy + 35, 'shared object', COLORS.yellow, 9);

  // Events coming out
  sketchArrow(ctx, 462, cy, 520, cy - 30, COLORS.green);
  sketchArrow(ctx, 462, cy, 520, cy, COLORS.green);
  sketchArrow(ctx, 462, cy, 520, cy + 30, COLORS.green);
  labelText(ctx, 555, cy - 30, 'event: Enqueued', COLORS.green, 9, 'left');
  labelText(ctx, 555, cy, 'event: Executed', COLORS.green, 9, 'left');
  labelText(ctx, 555, cy + 30, 'event: Completed', COLORS.green, 9, 'left');

  labelText(ctx, w / 2, 20, 'R2: Move Contract Architecture', COLORS.text, 13);
}

function drawR3(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // R3: 3 Clients <-> WS Server -> Robot State -> Broadcast
  const cy = h / 2;
  const clientX = 60;
  const serverX = w / 2 - 40;
  const stateX = w - 160;

  // 3 clients
  for (let i = -1; i <= 1; i++) {
    const y = cy + i * 45;
    boxWithLabel(ctx, clientX - 40, y - 14, 80, 28, `Client ${i + 2}`, COLORS.blue);
    // Bidirectional arrows
    sketchArrow(ctx, clientX + 42, y, serverX - 42, cy, COLORS.cyan);
  }

  boxWithLabel(ctx, serverX - 40, cy - 20, 80, 40, 'WS Server', COLORS.purple);

  sketchArrow(ctx, serverX + 42, cy, stateX - 2, cy, COLORS.purple);
  boxWithLabel(ctx, stateX, cy - 18, 100, 36, 'Robot State', COLORS.yellow);

  // Broadcast label
  labelText(ctx, serverX, cy + 40, 'broadcast', COLORS.muted, 9);

  labelText(ctx, w / 2, 20, 'R3: WebSocket Hub Architecture', COLORS.text, 13);
}

function drawR4(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // R4: Blockchain -> Processor (poll loop) -> Serial -> Robot
  const cy = h / 2;
  const gap = (w - 60) / 4;

  const boxes = [
    { label: 'Blockchain', color: COLORS.purple },
    { label: 'Processor', color: COLORS.blue },
    { label: 'Serial', color: COLORS.cyan },
    { label: 'Robot', color: COLORS.yellow },
  ];

  boxes.forEach((box, i) => {
    const x = 50 + i * gap;
    boxWithLabel(ctx, x - 45, cy - 18, 90, 36, box.label, box.color);
    if (i < boxes.length - 1) {
      sketchArrow(ctx, x + 47, cy, x + gap - 47, cy, box.color);
    }
  });

  // Poll loop annotation
  const procX = 50 + gap;
  sketchArrow(ctx, procX, cy - 20, procX - 30, cy - 45, COLORS.muted);
  sketchArrow(ctx, procX - 30, cy - 45, procX + 30, cy - 45, COLORS.muted);
  sketchArrow(ctx, procX + 30, cy - 45, procX, cy - 20, COLORS.muted);
  monoText(ctx, procX, cy - 55, 'poll loop', COLORS.muted, 9);

  labelText(ctx, w / 2, 20, 'R4: Blockchain-to-Robot Pipeline', COLORS.text, 13);
}

function drawR5(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // R5: Browser <-> WS Server -> Serial -> Robot (queue mode)
  const cy = h / 2;

  boxWithLabel(ctx, 30, cy - 18, 80, 36, 'Browser', COLORS.blue);
  sketchArrow(ctx, 112, cy - 5, 168, cy - 5, COLORS.blue);
  sketchArrow(ctx, 168, cy + 5, 112, cy + 5, COLORS.green);

  boxWithLabel(ctx, 170, cy - 22, 100, 44, 'WS Server', COLORS.purple);

  sketchArrow(ctx, 272, cy, 338, cy, COLORS.purple);
  boxWithLabel(ctx, 340, cy - 18, 80, 36, 'Serial', COLORS.cyan);

  sketchArrow(ctx, 422, cy, 478, cy, COLORS.cyan);
  boxWithLabel(ctx, 480, cy - 18, 80, 36, 'Robot', COLORS.yellow);

  // Queue annotation
  monoText(ctx, 220, cy + 40, 'command queue', COLORS.muted, 9);
  dashedLine(ctx, 170, cy + 24, 270, cy + 24, COLORS.muted);

  labelText(ctx, w / 2, 20, 'R5: Live Control Architecture', COLORS.text, 13);
}

function drawR6(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // R6: Remote User -> Internet (NAT) -> Cloudflare -> Tunnel -> Your PC -> Robot
  const cy = h / 2;
  const boxes = [
    { label: 'Remote User', color: COLORS.blue, w: 85 },
    { label: 'Internet', color: COLORS.muted, w: 70 },
    { label: 'Cloudflare', color: COLORS.orange, w: 85 },
    { label: 'Tunnel', color: COLORS.cyan, w: 65 },
    { label: 'Your PC', color: COLORS.green, w: 70 },
    { label: 'Robot', color: COLORS.yellow, w: 60 },
  ];

  const totalW = boxes.reduce((s, b) => s + b.w, 0);
  const spacing = (w - 60 - totalW) / (boxes.length - 1);
  let x = 30;

  boxes.forEach((box, i) => {
    boxWithLabel(ctx, x, cy - 16, box.w, 32, box.label, box.color, 10);
    if (i < boxes.length - 1) {
      const nextX = x + box.w + spacing;
      sketchArrow(ctx, x + box.w + 2, cy, nextX - 2, cy, box.color);
      x = nextX;
    }
  });

  // NAT annotation
  labelText(ctx, 155, cy - 28, 'NAT traversal', COLORS.muted, 9);

  labelText(ctx, w / 2, 20, 'R6: Tunnel Architecture', COLORS.text, 13);
}

function drawR7(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // R7: Client-Server timeline
  const colClient = 120;
  const colServer = w - 120;
  const topY = 55;
  const stepH = 35;

  // Vertical lines
  dashedLine(ctx, colClient, topY, colClient, h - 20, COLORS.blue);
  dashedLine(ctx, colServer, topY, colServer, h - 20, COLORS.purple);

  labelText(ctx, colClient, topY - 15, 'Client', COLORS.blue, 12);
  labelText(ctx, colServer, topY - 15, 'Server', COLORS.purple, 12);

  const steps = [
    { from: colClient, to: colServer, label: '1. Send pubkey', color: COLORS.blue },
    { from: colServer, to: colClient, label: '2. Challenge (nonce)', color: COLORS.purple },
    { from: colClient, to: colServer, label: '3. Sign challenge', color: COLORS.cyan },
    { from: colServer, to: colServer, label: '4. Verify signature', color: COLORS.yellow },
    { from: colServer, to: colClient, label: '5. AUTH SUCCESS', color: COLORS.green },
  ];

  steps.forEach((step, i) => {
    const y = topY + 20 + i * stepH;
    if (step.from === step.to) {
      // Self-loop (verify)
      sketchRect(ctx, step.from - 60, y - 10, 120, 20, step.color, 4);
      monoText(ctx, step.from, y, step.label, step.color, 9);
    } else {
      sketchArrow(ctx, step.from, y, step.to, y, step.color);
      const midX = (step.from + step.to) / 2;
      monoText(ctx, midX, y - 10, step.label, step.color, 9);
    }
  });

  labelText(ctx, w / 2, 20, 'R7: Authentication Sequence', COLORS.text, 13);
}

function drawR8(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // R8: Faucet -> COOKIE -> Pay -> Robot Pet queue -> Execute
  const cy = h / 2;
  const boxes = [
    { label: 'Faucet', color: COLORS.cyan, w: 65 },
    { label: 'COOKIE', color: COLORS.yellow, w: 70 },
    { label: 'Pay', color: COLORS.orange, w: 50 },
    { label: 'Pet Queue', color: COLORS.purple, w: 80 },
    { label: 'Execute', color: COLORS.green, w: 70 },
  ];

  const totalW = boxes.reduce((s, b) => s + b.w, 0);
  const spacing = (w - 60 - totalW) / (boxes.length - 1);
  let x = 30;

  boxes.forEach((box, i) => {
    boxWithLabel(ctx, x, cy - 16, box.w, 32, box.label, box.color, 10);
    if (i < boxes.length - 1) {
      const nextX = x + box.w + spacing;
      sketchArrow(ctx, x + box.w + 2, cy, nextX - 2, cy, box.color);
      x = nextX;
    }
  });

  // OTW annotation
  sketchRect(ctx, w / 2 - 40, cy + 30, 80, 22, COLORS.orange, 4);
  monoText(ctx, w / 2, cy + 41, 'OTW pattern', COLORS.orange, 9);
  dashedLine(ctx, w / 2, cy + 16, w / 2, cy + 30, COLORS.orange);

  labelText(ctx, w / 2, 20, 'R8: Pay-to-Play Token Flow', COLORS.text, 13);
}

function drawR9(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // R9: 3 Users -> Fairness Queue -> WS broadcast -> 3 dApps
  const cy = h / 2;
  const userX = 60;
  const queueX = w / 2 - 50;
  const dappX = w - 80;

  // 3 users on left
  for (let i = -1; i <= 1; i++) {
    const y = cy + i * 40;
    boxWithLabel(ctx, userX - 35, y - 12, 70, 24, `User ${i + 2}`, COLORS.blue, 10);
    sketchArrow(ctx, userX + 37, y, queueX - 2, cy, COLORS.blue);
  }

  boxWithLabel(ctx, queueX, cy - 20, 100, 40, 'Fairness\nQueue', COLORS.purple, 10);

  // WS broadcast
  labelText(ctx, queueX + 50, cy + 35, 'WS broadcast', COLORS.muted, 9);

  // 3 dApps on right
  for (let i = -1; i <= 1; i++) {
    const y = cy + i * 40;
    sketchArrow(ctx, queueX + 102, cy, dappX - 37, y, COLORS.green);
    boxWithLabel(ctx, dappX - 35, y - 12, 70, 24, `dApp ${i + 2}`, COLORS.green, 10);
  }

  labelText(ctx, w / 2, 20, 'R9: Multiplayer Fairness Architecture', COLORS.text, 13);
}

function drawR10(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // R10: Get TREAT -> Browse -> Start Session -> Sign Commands -> Robot -> End -> Settlement
  const cy = h / 2;
  const boxes = [
    { label: 'Get TREAT', color: COLORS.yellow, w: 75 },
    { label: 'Browse', color: COLORS.blue, w: 65 },
    { label: 'Session', color: COLORS.purple, w: 65 },
    { label: 'Sign Cmds', color: COLORS.cyan, w: 75 },
    { label: 'Robot', color: COLORS.green, w: 60 },
    { label: 'End', color: COLORS.orange, w: 45 },
    { label: 'Settle', color: COLORS.yellow, w: 60 },
  ];

  const totalW = boxes.reduce((s, b) => s + b.w, 0);
  const spacing = (w - 50 - totalW) / (boxes.length - 1);
  let x = 25;

  boxes.forEach((box, i) => {
    boxWithLabel(ctx, x, cy - 14, box.w, 28, box.label, box.color, 9);
    if (i < boxes.length - 1) {
      const nextX = x + box.w + spacing;
      sketchArrow(ctx, x + box.w + 1, cy, nextX - 1, cy, box.color, 1);
      x = nextX;
    }
  });

  // Step numbers
  x = 25;
  boxes.forEach((box, i) => {
    monoText(ctx, x + box.w / 2, cy - 26, `${i + 1}`, COLORS.muted, 9);
    if (i < boxes.length - 1) {
      x = x + box.w + spacing;
    }
  });

  labelText(ctx, w / 2, 20, 'R10: Robot Rental Platform Flow', COLORS.text, 13);
}

// ── Diagram dispatcher ────────────────────────────────────────

const DIAGRAM_MAP: Record<string, (ctx: CanvasRenderingContext2D, w: number, h: number) => void> = {
  R1: drawR1,
  R2: drawR2,
  R3: drawR3,
  R4: drawR4,
  R5: drawR5,
  R6: drawR6,
  R7: drawR7,
  R8: drawR8,
  R9: drawR9,
  R10: drawR10,
};

export default function DiagramCanvas({ moduleId }: DiagramCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with DPR
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw background
    ctx.fillStyle = COLORS.bg;
    ctx.beginPath();
    ctx.roundRect(0, 0, rect.width, rect.height, 12);
    ctx.fill();

    // Draw the appropriate diagram
    const drawFn = DIAGRAM_MAP[moduleId.toUpperCase()];
    if (drawFn) {
      drawFn(ctx, rect.width, rect.height);
    } else {
      labelText(ctx, rect.width / 2, rect.height / 2, `Diagram for ${moduleId}`, COLORS.muted, 14);
    }
  }, [moduleId]);

  return (
    <canvas
      ref={canvasRef}
      className="h-[200px] w-full rounded-[24px] border border-[#d7e6f4] bg-[#f8fbff]"
      style={{ imageRendering: 'auto' }}
    />
  );
}
