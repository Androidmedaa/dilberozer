import * as THREE from "three";

export type CoverTextureOptions = {
  title: string;
  subtitle?: string;
  coverColor: string;
  accentColor: string;
  spineColor: string;
};

function darken(hex: string, amount: number): string {
  const c = new THREE.Color(hex);
  c.multiplyScalar(1 - amount);
  return `#${c.getHexString()}`;
}

function drawCoverTitle(
  ctx: CanvasRenderingContext2D,
  title: string,
  accent: string,
  w: number,
  h: number,
) {
  const upper = title.toUpperCase();
  const cx = w / 2;
  const titleY = h / 2 - 42;

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  let fontSize = 56;
  ctx.font = `700 ${fontSize}px Georgia, "Times New Roman", serif`;
  while (ctx.measureText(upper).width > w - 100 && fontSize > 32) {
    fontSize -= 4;
    ctx.font = `700 ${fontSize}px Georgia, "Times New Roman", serif`;
  }

  // Dark emboss shadow
  ctx.fillStyle = "rgba(0,0,0,0.55)";
  ctx.fillText(upper, cx + 3, titleY + 3);

  // Gold stroke for legibility
  ctx.strokeStyle = darken(accent, 0.25);
  ctx.lineWidth = 3;
  ctx.strokeText(upper, cx, titleY);

  const titleGrad = ctx.createLinearGradient(cx - 140, titleY - 40, cx + 140, titleY + 20);
  titleGrad.addColorStop(0, accent);
  titleGrad.addColorStop(0.45, "#fff8e8");
  titleGrad.addColorStop(0.55, "#fffdf5");
  titleGrad.addColorStop(1, accent);
  ctx.fillStyle = titleGrad;
  ctx.fillText(upper, cx, titleY);

  // Bright highlight pass
  ctx.globalAlpha = 0.35;
  ctx.fillStyle = "#ffffff";
  ctx.fillText(upper, cx - 1, titleY - 1);
  ctx.globalAlpha = 1;
}

export function createLeatherCoverTexture(opts: CoverTextureOptions): THREE.CanvasTexture {
  const w = 1024;
  const h = 1400;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, darken(opts.coverColor, 0.05));
  grad.addColorStop(0.45, opts.coverColor);
  grad.addColorStop(1, darken(opts.coverColor, 0.2));
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Light grain (reduced over title zone)
  ctx.globalAlpha = 0.04;
  for (let i = 0; i < 5000; i++) {
    const py = Math.random() * h;
    if (py > h * 0.28 && py < h * 0.72) continue;
    ctx.fillStyle = i % 2 ? "#000" : "#fff";
    ctx.fillRect(Math.random() * w, py, 1, 1);
  }
  ctx.globalAlpha = 1;

  ctx.strokeStyle = opts.accentColor;
  ctx.lineWidth = 10;
  ctx.globalAlpha = 0.55;
  ctx.strokeRect(40, 40, w - 80, h - 80);
  ctx.globalAlpha = 1;

  ctx.strokeStyle = darken(opts.accentColor, 0.2);
  ctx.lineWidth = 5;
  ctx.strokeRect(56, 56, w - 112, h - 112);

  drawCoverTitle(ctx, opts.title, opts.accentColor, w, h);

  if (opts.subtitle) {
    ctx.font = "italic 32px Georgia, serif";
    ctx.fillStyle = "rgba(255, 248, 235, 0.75)";
    ctx.fillText(opts.subtitle, w / 2, h / 2 + 36);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

/** Faint gold filigree for open desk tome pages */
export function createParchmentSpreadTexture(): THREE.CanvasTexture {
  const w = 512;
  const h = 512;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  ctx.fillStyle = "#f3ead6";
  ctx.fillRect(0, 0, w, h);

  ctx.globalAlpha = 0.05;
  for (let i = 0; i < 6000; i++) {
    ctx.fillStyle = i % 2 ? "#8b7355" : "#fff";
    ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
  }
  ctx.globalAlpha = 1;

  ctx.strokeStyle = "rgba(201, 162, 39, 0.35)";
  ctx.lineWidth = 2;
  ctx.strokeRect(36, 36, w - 72, h - 72);

  ctx.font = "italic 28px Georgia, serif";
  ctx.fillStyle = "rgba(201, 162, 39, 0.25)";
  ctx.textAlign = "center";
  ctx.fillText("Home", w / 2, h / 2 - 20);
  ctx.font = "16px Georgia, serif";
  ctx.fillStyle = "rgba(90, 70, 40, 0.35)";
  ctx.fillText("The Living Chronicle", w / 2, h / 2 + 16);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
