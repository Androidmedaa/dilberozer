import { writeFileSync } from "fs";

const BOX_W = 400;
const LINE_H = 15;
const HEADER_H = 44;
const SECTION_LABEL_H = 22;
const SECTION_END_PAD = 10;
const COL_GAP = 140;
const ROW_GAP = 90;
const MARGIN_X = 64;
const MARGIN_TOP = 140;
const MAX_CHARS = 48;

const classData = [
  {
    id: "login",
    name: "Login_UyeOl",
    col: 0,
    fields: [
      "- adminForm: Admin = new Admin()",
      '- connectionString: string = "PGSQL Baglanti"',
      "- form1: Form1",
      "- premiumForm: Premium = new Premium()",
      "- profilform: Profilim = new Profilim()",
      "- standartform: Standart = new Standart()",
    ],
    methods: [
      "- AdTextBox_KeyPress(): void",
      "- button1_Click(): void",
      "- KullaniciAdiTextBox_KeyPress(): void",
      "- KullaniciGirisKaydet(kullaniciID: int): void",
      "+ Login_UyeOl(form1: Form1)",
      "- Login_UyeOl_Load(): void",
      "- LoginKullaniciAdi_KeyPress(): void",
      "- LoginSifre_KeyPress(): void",
      "- SifreTextBox_KeyPress(): void",
      "- SoyadTextBox_KeyPress(): void",
      "- TCTextBox_KeyPress(): void",
      "- UyeOlBtn_Click(): void",
    ],
    properties: [],
  },
  {
    id: "form1",
    name: "Form1",
    col: 0,
    fields: [
      '- connectionString: string = "PGSQL Baglanti"',
      "- filmOffset: int = 0",
    ],
    methods: [
      "- button11_Click(): void",
      "- button12_Click(): void",
      "- button4_Click(): void",
      "- button5_Click(): void",
      "- button8_Click(): void",
      "- button9_Click(): void",
      "- FilmDetayGoster(filmSira: int): void",
      "- FilmListesiniGuncelle(): void",
      "+ Form1()",
      "- Form1_Load(): void",
      "- pictureBox2_Click(): void",
    ],
    properties: [],
  },
  {
    id: "standart",
    name: "Standart",
    col: 1,
    fields: [
      '- connectionString: string = "PGSQL Baglanti"',
      "- detayForm: FilmDetaylariStndrt = new FilmDetayla...",
      "- filmOffset: int = 0",
      "- profilForm: Profilim = new Profilim()",
    ],
    methods: [
      "- AramaBtn_Click(): void",
      "- button11_Click(): void",
      "- button12_Click(): void",
      "- button4_Click(): void",
      "- FilmDetayGoster(filmSira: int): void",
      "- FilmGetir_Click(): void",
      "- FilmGelir(filmId: int): void",
      "- FilmIstatistik_Cek(clck): void",
      "- FilmListesiniGuncelle(): void",
      "- FilmSirala(sorgu: string): void",
      "- KelimeGoreAra(sorgu: string, arananKelime: string): void",
      "- NotificationGoster(filmAd: string): void",
      "- PuanSecim_SelectedIndexChanged(): void",
      "+ Standart()",
      "- Standart_FormClosing(): void",
      "- Standart_Load(): void",
      "- tabControl1_SelectedIndexChanged(): void",
      "- Temizle(): void",
      "- TurSecim_SelectedIndexChanged(): void",
      "- YeniFilmleriGoster(kullaniciId: int): void",
      "- YilaGoreAra(sorgu: string, yil: long): void",
      "- YilSecim_SelectedIndexChanged(): void",
    ],
    properties: ["+ KullaniciID(): int"],
  },
  {
    id: "admin",
    name: "Admin",
    col: 1,
    fields: [
      '- connectionString: string = "PGSQL Baglanti"',
      "- detayForm: FilmDetaylari = new FilmDetaylari()",
      "- filmOffset: int = 0",
      "- profilForm: Profilim = new Profilim()",
    ],
    methods: [
      "+ Admin()",
      "- Admin_FormClosing(): void",
      "- Admin_Load(): void",
      "- AramaBtn_Click(): void",
      "- button11_Click(): void",
      "- button12_Click(): void",
      "- button4_Click(): void",
      "- button5_Click(): void",
      "- FilmDetayGoster(filmSira: int): void",
      "- FilmGetir_Click(): void",
      "- FilmGetir(filmId: int): void",
      "- FilmIstatistik_Cek(clck): void",
      "- FilmListesiniGuncelle(): void",
      "- FilmSirala(sorgu: string): void",
      "- KelimeGoreAra(sorgu: string, arananKelime: string): void",
      "- PuanSecim_SelectedIndexChanged(): void",
      "- tabControl1_SelectedIndexChanged(): void",
      "- Temizle(): void",
      "- TurSecim_SelectedIndexChanged(): void",
      "- YilaGoreAra(sorgu: string, yil: long): void",
      "- YilSecim_SelectedIndexChanged(): void",
    ],
    properties: ["+ KullaniciID(): int"],
  },
  {
    id: "premium",
    name: "Premium",
    col: 1,
    fields: [
      '- connectionString: string = "PGSQL Baglanti"',
      "- detayForm: FilmDetaylari = new FilmDetaylari()",
      "- filmOffset: int = 0",
      "- profilForm: Profilim = new Profilim()",
    ],
    methods: [
      "- AramaBtn_Click(): void",
      "- button11_Click(): void",
      "- button12_Click(): void",
      "- button4_Click(): void",
      "- FilmDetayGoster(filmSira: int): void",
      "- FilmGetir_Click(): void",
      "- FilmGelir(filmId: int): void",
      "- FilmIstatistik_Cek(clck): void",
      "- FilmListesiniGuncelle(): void",
      "- FilmSirala(sorgu: string): void",
      "- KelimeGoreAra(sorgu: string, arananKelime: string): void",
      "- NotificationGoster(filmAd: string): void",
      "+ Premium()",
      "- Premium_FormClosing(): void",
      "- Premium_Load(): void",
      "- PuanSecim_SelectedIndexChanged(): void",
      "- tabControl1_SelectedIndexChanged(): void",
      "- Temizle(): void",
      "- TurSecim_SelectedIndexChanged(): void",
      "- YeniFilmleriGoster(kullaniciId: int): void",
      "- YilaGoreAra(sorgu: string, yil: long): void",
      "- YilSecim_SelectedIndexChanged(): void",
    ],
    properties: ["+ KullaniciID(): int"],
  },
  {
    id: "detay-stndrt",
    name: "FilmDetaylariStndrt",
    col: 2,
    fields: [
      '- connectionString: string = "PGSQL Baglanti"',
      "- yorumOffset: int = 0",
    ],
    methods: [
      "- button2_Click(): void",
      "- FilmDetaylariniGoster(filmDetay: DataRow): void",
      "- FilmDetaylariStndrt()",
      "- FilmDetaylariStndrt_Load(): void",
      "- YorumListesiniGuncelle(): void",
    ],
    properties: ["+ FilmDetay(): DataRow", "+ KullaniciID(): int"],
  },
  {
    id: "detay",
    name: "FilmDetaylari",
    col: 2,
    fields: [
      '- connectionString: string = "PGSQL Baglanti"',
      "- yorumOffset: int = 0",
    ],
    methods: [
      "- button2_Click(): void",
      "+ FilmDetaylari()",
      "- FilmDetaylari_Load(): void",
      "- FilmDetaylariniGoster(filmDetay: DataRow): void",
      "- KaydetBtn_Click(): void",
      "- YorumEkleBtn_Click(): void",
      "- YorumListesiniGuncelle(): void",
    ],
    properties: ["+ FilmDetay(): DataRow", "+ KullaniciID(): int"],
  },
  {
    id: "profilim",
    name: "Profilim",
    col: 2,
    fields: ['- connectionString: string = "PGSQL Baglanti"'],
    methods: [
      "- Adi_KeyPress(): void",
      "- BuFilmListedeMi(kullaniciId: int, filmID: int): bool",
      "- button1_Click(): void",
      "- button2_Click(): void",
      "- button5_Click(): void",
      "- ComboBooxFilmEkle(comboBox: ComboBox): void",
      "- FilmBul(filmAd: string): int",
      "- FilmSil(filmAd: string): void",
      "- HesapSil_Click(): void",
      "- IzlenenFilmEkle(kullanici_ID: int, filmId: int): void",
      "- IzlenenFilmleri_CellContentClick(): void",
      "- IzlenenFilmleriYukle(): void",
      "- KullaniciBilgileriniGuncelle(): void",
      "- KullaniciBilgileriniYukle(): void",
      "- KullaniciG_KeyPress(): void",
      "+ Profilim()",
      "- Profilim_Load(): void",
      "- SilVeCikisYap(): void",
      "- SoyadiG_KeyPress(): void",
      "- TC_G_KeyPress(): void",
    ],
    properties: ["+ KullaniciID(): int"],
  },
];

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function wrapLines(items) {
  const out = [];
  for (const item of items) {
    if (item.length <= MAX_CHARS) {
      out.push(item);
      continue;
    }
    let rest = item;
    while (rest.length > MAX_CHARS) {
      let breakAt = rest.lastIndexOf(" ", MAX_CHARS);
      if (breakAt < 20) breakAt = MAX_CHARS;
      out.push(rest.slice(0, breakAt));
      rest = rest.slice(breakAt).trimStart();
    }
    if (rest) out.push(rest);
  }
  return out;
}

function sectionHeight(lines) {
  if (!lines.length) return 0;
  return SECTION_LABEL_H + lines.length * LINE_H + SECTION_END_PAD;
}

function layoutClasses() {
  const colX = [
    MARGIN_X,
    MARGIN_X + BOX_W + COL_GAP,
    MARGIN_X + (BOX_W + COL_GAP) * 2,
  ];
  const colY = [MARGIN_TOP, MARGIN_TOP, MARGIN_TOP];

  const boxes = [];

  for (const cls of classData) {
    const fields = wrapLines(cls.fields);
    const methods = wrapLines(cls.methods);
    const properties = wrapLines(cls.properties);

    const bodyH =
      sectionHeight(fields) + sectionHeight(methods) + sectionHeight(properties);
    const h = HEADER_H + bodyH + 12;

    const x = colX[cls.col];
    const y = colY[cls.col];
    colY[cls.col] = y + h + ROW_GAP;

    boxes.push({ ...cls, x, y, w: BOX_W, h, fields, methods, properties });
  }

  const W = MARGIN_X * 2 + (BOX_W + COL_GAP) * 2 + BOX_W;
  const H = Math.max(...colY) + 80;
  return { boxes, W, H };
}

function renderSection(label, lines, y0) {
  if (!lines.length) return { svg: "", height: 0 };
  let y = y0 + SECTION_LABEL_H;
  const parts = [
    `<text x="14" y="${y0 + 14}" class="section-label">${label}</text>`,
    `<line x1="12" y1="${y0 + 20}" x2="${BOX_W - 12}" y2="${y0 + 20}" stroke="#f0c4d0" stroke-width="1"/>`,
  ];
  for (const line of lines) {
    parts.push(`<text x="16" y="${y}" class="card-text">${esc(line)}</text>`);
    y += LINE_H;
  }
  return { svg: parts.join("\n    "), height: sectionHeight(lines) };
}

function renderBox(cls) {
  let innerY = HEADER_H + 8;
  const sections = [];

  const f = renderSection("Fields / Attributes", cls.fields, innerY);
  sections.push(f.svg);
  innerY += f.height;

  const m = renderSection("Methods", cls.methods, innerY);
  sections.push(m.svg);
  innerY += m.height;

  const p = renderSection("Property", cls.properties, innerY);
  sections.push(p.svg);

  return `  <g id="class-${cls.id}" transform="translate(${cls.x}, ${cls.y})">
    <defs>
      <clipPath id="clip-${cls.id}">
        <rect width="${cls.w}" height="${cls.h}" rx="12"/>
      </clipPath>
    </defs>
    <rect width="${cls.w}" height="${cls.h}" rx="12" fill="#fffbfc" stroke="#dea0b2" stroke-width="1.5" filter="url(#cardShadow)"/>
    <rect width="${cls.w}" height="${HEADER_H}" rx="12" fill="#c45674"/>
    <rect y="${HEADER_H - 10}" width="${cls.w}" height="10" fill="#c45674"/>
    <text x="16" y="29" class="card-title">${esc(cls.name)}</text>
    <text x="${cls.w - 16}" y="29" text-anchor="end" class="card-stereo">Form</text>
    <g clip-path="url(#clip-${cls.id})">
    ${sections.filter(Boolean).join("\n    ")}
    </g>
  </g>`;
}

function anchor(cls, side) {
  switch (side) {
    case "right":
      return { x: cls.x + cls.w, y: cls.y + cls.h / 2 };
    case "left":
      return { x: cls.x, y: cls.y + cls.h / 2 };
    case "bottom":
      return { x: cls.x + cls.w / 2, y: cls.y + cls.h };
    case "top":
      return { x: cls.x + cls.w / 2, y: cls.y };
    default:
      return { x: cls.x + cls.w / 2, y: cls.y + cls.h / 2 };
  }
}

function routeOrthogonal(x1, y1, x2, y2, bendX) {
  const mid = bendX ?? (x1 + x2) / 2;
  return `M ${x1} ${y1} L ${mid} ${y1} L ${mid} ${y2} L ${x2} ${y2}`;
}

function buildArrows(boxes) {
  const b = Object.fromEntries(boxes.map((c) => [c.id, c]));
  const gutter1 = MARGIN_X + BOX_W + COL_GAP / 2;
  const gutter2 = MARGIN_X + BOX_W + COL_GAP + BOX_W + COL_GAP / 2;

  const defs = [
    ["login", "standart", "-standartForm", "right", "left", gutter1],
    ["login", "admin", "-adminForm", "right", "left", gutter1],
    ["login", "premium", "-premiumForm", "right", "left", gutter1],
    ["login", "form1", "-form1", "bottom", "top", null],
    ["standart", "detay-stndrt", "-detayForm", "right", "left", gutter2],
    ["standart", "profilim", "profilForm", "right", "left", gutter2 + 40],
    ["admin", "detay", "detayForm", "right", "left", gutter2],
    ["admin", "profilim", "profilForm", "right", "left", gutter2 + 40],
    ["premium", "detay", "-detayForm", "right", "left", gutter2 + 80],
    ["premium", "profilim", "-profilForm", "right", "left", gutter2 + 120],
    ["profilim", "standart", "-profilfim", "top", "bottom", null],
    ["profilim", "admin", "-profilfim", "left", "right", null],
  ];

  return defs.map(([from, to, label, s1, s2, bend], i) => {
    const a = anchor(b[from], s1);
    const t = anchor(b[to], s2);
    let d;
    let lx;
    let ly;

    if (s1 === "bottom" && s2 === "top") {
      const midY = (a.y + t.y) / 2;
      d = `M ${a.x} ${a.y} L ${a.x} ${midY} L ${t.x} ${midY} L ${t.x} ${t.y}`;
      lx = a.x + 8;
      ly = midY - 8;
    } else if (s1 === "top" && s2 === "bottom") {
      const midY = t.y + 48;
      d = `M ${a.x} ${a.y} L ${a.x} ${midY} L ${t.x} ${midY} L ${t.x} ${t.y}`;
      lx = a.x + 10;
      ly = midY + 16;
    } else if (s1 === "left" && s2 === "right") {
      const midX = t.x + 56;
      d = `M ${a.x} ${a.y} L ${midX} ${a.y} L ${midX} ${t.y} L ${t.x} ${t.y}`;
      lx = midX + 8;
      ly = a.y - 8;
    } else {
      d = routeOrthogonal(a.x, a.y, t.x, t.y, bend);
      lx = (bend ?? (a.x + t.x) / 2) + 6;
      ly = Math.min(a.y, t.y) - 10;
    }

    const lw = label.length * 7.4 + 16;
    return `  <g id="arrow-${i}">
    <path class="arrow" d="${d}"/>
    <rect x="${lx}" y="${ly - 15}" width="${lw}" height="22" rx="5" fill="#fff" fill-opacity="0.94" stroke="#d4849a"/>
    <text x="${lx + 8}" y="${ly}" class="edge-label">${esc(label)}</text>
  </g>`;
  });
}

const { boxes, W, H } = layoutClasses();
const arrows = buildArrows(boxes);

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Cinema Night WinForms UML class diagram">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fadce4"/>
      <stop offset="100%" stop-color="#e8a0b4"/>
    </linearGradient>
    <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
      <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>
    </pattern>
    <marker id="arrow-head" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 Z" fill="#8f3d58"/>
    </marker>
    <filter id="cardShadow" x="-8%" y="-8%" width="116%" height="116%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#9a3d5c" flood-opacity="0.15"/>
    </filter>
    <style>
      .title { font: 700 38px Georgia, serif; fill: #fff; letter-spacing: 0.06em; }
      .subtitle { font: 600 16px "Segoe UI", Arial, sans-serif; fill: rgba(255,255,255,0.95); }
      .card-title { font: 700 16px "Segoe UI", Arial, sans-serif; fill: #fff; }
      .card-stereo { font: 600 11px "Segoe UI", Arial, sans-serif; fill: rgba(255,255,255,0.9); }
      .section-label { font: 700 11px "Segoe UI", Arial, sans-serif; fill: #b84d68; }
      .card-text { font: 11.5px Consolas, monospace; fill: #452030; }
      .edge-label { font: 600 11px "Segoe UI", Arial, sans-serif; fill: #7a2f45; }
      .arrow { fill: none; stroke: #8f3d58; stroke-width: 2.2; marker-end: url(#arrow-head); }
    </style>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bgGrad)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <text x="${W / 2}" y="64" text-anchor="middle" class="title">CINEMA NIGHT</text>
  <text x="${W / 2}" y="96" text-anchor="middle" class="subtitle">WinForms UML Class Diagram</text>

  <g id="layer-classes">
${boxes.map(renderBox).join("\n")}
  </g>

  <g id="layer-arrows">
${arrows.join("\n")}
  </g>
</svg>
`;

writeFileSync("public/projects/cinema-night/uml-diagram.svg", svg, "utf8");
console.log(`Wrote SVG ${W}x${H}, boxes: ${boxes.map((b) => `${b.id}@${b.y}+${b.h}`).join(", ")}`);
