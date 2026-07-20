/**
 * Paints a pink grid patch over the Gemini watermark (bottom-right of uml-diagram.png).
 * Run: node scripts/mask-uml-watermark.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const path = "public/projects/cinema-night/uml-diagram.png";

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.log("sharp not installed — skipping PNG edit (CSS mask covers the logo on the site).");
  process.exit(0);
}

const img = sharp(readFileSync(path));
const { width, height } = await img.metadata();

const patchW = 100;
const patchH = 100;
const pink = { r: 240, g: 180, b: 194, alpha: 255 };

const gridSvg = `
<svg width="${patchW}" height="${patchH}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="rgb(240,180,194)"/>
  <defs>
    <pattern id="g" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.38)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
</svg>`;

const patch = await sharp(Buffer.from(gridSvg)).png().toBuffer();

const out = await img
  .composite([{ input: patch, left: width - patchW, top: height - patchH }])
  .png()
  .toBuffer();

writeFileSync(path, out);
console.log(`Masked bottom-right ${patchW}x${patchH}px on ${width}x${height} image`);
