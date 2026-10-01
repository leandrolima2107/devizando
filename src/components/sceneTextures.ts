'use client';

/**
 * Texturas procedurais desenhadas em <canvas>.
 * Evita imagens externas, licenças de terceiros e requisições de rede.
 */

const ACCENT = '#ff5b24';
const PANEL = '#0e1218';
const LINE = '#2a323d';
const TEXT = '#8f9aa7';

function base(w: number, h: number) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = PANEL;
  ctx.fillRect(0, 0, w, h);
  // grade técnica sutil
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  return { canvas, ctx };
}

function windowChrome(ctx: CanvasRenderingContext2D, w: number) {
  ctx.fillStyle = '#161c24';
  ctx.fillRect(0, 0, w, 34);
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(20 + i * 18, 17, 5, 0, Math.PI * 2);
    ctx.fillStyle = i === 0 ? ACCENT : LINE;
    ctx.fill();
  }
}

export type ScreenKind = 'sites' | 'sistemas' | 'automacoes' | 'ia' | 'infra';

export function makeScreenTexture(kind: ScreenKind): HTMLCanvasElement {
  const w = 512;
  const h = 320;
  const { canvas, ctx } = base(w, h);
  windowChrome(ctx, w);

  if (kind === 'sites') {
    ctx.fillStyle = ACCENT;
    ctx.fillRect(40, 70, 210, 22);
    ctx.fillStyle = LINE;
    ctx.fillRect(40, 106, 150, 12);
    ctx.fillRect(40, 126, 110, 12);
    ctx.fillStyle = ACCENT;
    ctx.fillRect(40, 168, 96, 30);
    ctx.fillStyle = '#1b222b';
    ctx.fillRect(300, 70, 172, 190);
    ctx.fillStyle = LINE;
    ctx.fillRect(316, 86, 140, 80);
    ctx.fillRect(316, 180, 140, 10);
    ctx.fillRect(316, 198, 100, 10);
  } else if (kind === 'sistemas') {
    ctx.fillStyle = '#1b222b';
    ctx.fillRect(0, 34, 96, h - 34);
    ctx.fillStyle = ACCENT;
    ctx.fillRect(18, 60, 60, 10);
    ctx.fillStyle = LINE;
    for (let i = 0; i < 4; i++) ctx.fillRect(18, 92 + i * 26, 60, 8);
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = '#1b222b';
      ctx.fillRect(124 + i * 122, 62, 106, 62);
    }
    ctx.fillStyle = LINE;
    ctx.fillRect(124, 152, 350, 8);
    // gráfico de barras
    const bars = [42, 76, 58, 96, 68, 88];
    bars.forEach((b, i) => {
      ctx.fillStyle = i === 3 ? ACCENT : '#39434f';
      ctx.fillRect(130 + i * 58, 300 - b, 34, b);
    });
  } else if (kind === 'automacoes') {
    const nodes: [number, number][] = [
      [90, 110],
      [250, 80],
      [250, 220],
      [420, 150],
    ];
    ctx.strokeStyle = ACCENT;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(nodes[0][0], nodes[0][1]);
    ctx.bezierCurveTo(160, 90, 190, 80, nodes[1][0], nodes[1][1]);
    ctx.moveTo(nodes[0][0], nodes[0][1]);
    ctx.bezierCurveTo(160, 220, 190, 220, nodes[2][0], nodes[2][1]);
    ctx.moveTo(nodes[1][0], nodes[1][1]);
    ctx.bezierCurveTo(330, 100, 350, 130, nodes[3][0], nodes[3][1]);
    ctx.moveTo(nodes[2][0], nodes[2][1]);
    ctx.bezierCurveTo(330, 230, 350, 180, nodes[3][0], nodes[3][1]);
    ctx.stroke();
    nodes.forEach(([x, y], i) => {
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fillStyle = i === 3 ? ACCENT : '#1b222b';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = i === 3 ? ACCENT : LINE;
      ctx.stroke();
    });
  } else if (kind === 'ia') {
    // balões de conversa
    ctx.fillStyle = '#1b222b';
    ctx.fillRect(48, 72, 240, 54);
    ctx.fillStyle = ACCENT;
    ctx.fillRect(224, 156, 240, 54);
    ctx.fillStyle = '#1b222b';
    ctx.fillRect(48, 240, 180, 44);
    ctx.fillStyle = LINE;
    ctx.fillRect(66, 90, 180, 8);
    ctx.fillRect(66, 106, 130, 8);
    ctx.fillStyle = '#3a2418';
    ctx.fillRect(242, 174, 190, 8);
    ctx.fillRect(242, 190, 120, 8);
    // núcleo
    ctx.beginPath();
    ctx.arc(430, 78, 26, 0, Math.PI * 2);
    ctx.fillStyle = ACCENT;
    ctx.fill();
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(430 + Math.cos(a) * 32, 78 + Math.sin(a) * 32);
      ctx.lineTo(430 + Math.cos(a) * 42, 78 + Math.sin(a) * 42);
      ctx.strokeStyle = ACCENT;
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  } else {
    // infraestrutura: racks de servidor
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = '#1b222b';
      ctx.fillRect(60 + i * 140, 70, 112, 210);
      for (let j = 0; j < 5; j++) {
        ctx.fillStyle = LINE;
        ctx.fillRect(74 + i * 140, 86 + j * 40, 84, 26);
        ctx.beginPath();
        ctx.arc(146 + i * 140, 99 + j * 40, 5, 0, Math.PI * 2);
        ctx.fillStyle = j === 2 ? ACCENT : '#39434f';
        ctx.fill();
      }
    }
  }

  return canvas;
}

export function makePhoneTexture(): HTMLCanvasElement {
  const w = 256;
  const h = 512;
  const { canvas, ctx } = base(w, h);
  ctx.fillStyle = ACCENT;
  ctx.fillRect(24, 44, 130, 18);
  ctx.fillStyle = '#1b222b';
  ctx.fillRect(24, 110, 190, 66);
  ctx.fillRect(56, 196, 176, 66);
  ctx.fillRect(24, 282, 150, 50);
  ctx.fillStyle = LINE;
  ctx.fillRect(40, 132, 150, 8);
  ctx.fillRect(40, 150, 110, 8);
  ctx.fillRect(72, 218, 150, 8);
  ctx.fillRect(72, 236, 96, 8);
  ctx.fillRect(40, 304, 110, 8);
  // campo de mensagem
  ctx.fillStyle = '#1b222b';
  ctx.fillRect(24, 420, 208, 52);
  ctx.beginPath();
  ctx.arc(206, 446, 16, 0, Math.PI * 2);
  ctx.fillStyle = ACCENT;
  ctx.fill();
  return canvas;
}
