const page = await fetch("http://localhost:3000/projects/cinema-night-film-management").then((r) =>
  r.text(),
);
const svg = await fetch("http://localhost:3000/projects/cinema-night/uml-diagram.svg").then((r) =>
  r.text(),
);

console.log("page has uml-diagram:", page.includes("uml-diagram"));
console.log("page img tag:", page.match(/<img[^>]*uml-diagram[^>]*>/)?.[0] ?? "none");
console.log("svg length:", svg.length);
console.log("svg starts with:", svg.slice(0, 80));
console.log("svg has invalid char:", /[^\x09\x0A\x0D\x20-\x7E]/.test(svg));
