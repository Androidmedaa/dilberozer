import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { PDFParse } from "pdf-parse";

const pdfPath = process.argv[2] ?? "C:/Users/Dilber/Desktop/FilmYönetimSistemiRapor.pdf";
const outDir = "public/projects/cinema-night/screenshots";
const skipPages = new Set([43, 44, 45, 46, 47, 48, 42]); // UML pages + UML title

mkdirSync(outDir, { recursive: true });

const parser = new PDFParse({ data: readFileSync(pdfPath) });
const result = await parser.getImage();
await parser.destroy();

let saved = 0;
for (const page of result.pages) {
  if (skipPages.has(page.pageNumber)) continue;
  page.images?.forEach((img, i) => {
    const data = Buffer.from(Object.values(img.data));
    if (data.length < 10000) return;
    writeFileSync(
      `${outDir}/screen-${String(page.pageNumber).padStart(2, "0")}-${i}.png`,
      data,
    );
    saved += 1;
  });
}

console.log(`Extracted ${saved} embedded images to ${outDir}`);
