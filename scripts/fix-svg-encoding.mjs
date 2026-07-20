import { readFileSync, writeFileSync } from "fs";

const path = "public/projects/cinema-night/uml-diagram.svg";
let svg = readFileSync(path, "utf8");

svg = svg.replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "|");
svg = svg.replace(/\| UML/g, " | UML");
svg = svg.replace(/browse \| watchlist/g, "browse | watchlist");
svg = svg.replace(/comments \| ratings/g, "comments | ratings");

if (!svg.startsWith("<?xml")) {
  svg = `<?xml version="1.0" encoding="UTF-8"?>\n${svg}`;
}

writeFileSync(path, svg, "utf8");
console.log("SVG sanitized");
