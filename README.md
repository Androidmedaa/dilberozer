# Dilber Özer — Portfolio

Next.js 16 portföy sitesi: projeler, stajlar, AI sayfası, hakkında, iletişim.

## Geliştirme

```bash
npm install
cp .env.example .env.local
# FORMSPREE_FORM_ID ve NEXT_PUBLIC_SITE_URL düzenle
npm run dev
```

→ http://localhost:3000

## İçerik düzenleme

| Ne | Dosya |
|----|--------|
| Menü, sosyal linkler | `src/data/site.ts` |
| Projeler | `src/data/projects.ts` |
| Stajlar | `src/data/internships.ts` |
| About | `src/data/about.ts` |
| AI sayfası | `src/data/artificial-intelligence.ts` |
| CV PDF | `public/cv/dilber_ozer.pdf` |

## Deploy

Vercel + Formspree: [DEPLOY.md](./DEPLOY.md)

## Ortam değişkenleri

| Değişken | Açıklama |
|----------|----------|
| `NEXT_PUBLIC_SITE_URL` | Canlı site URL (sonda `/` yok) |
| `FORMSPREE_FORM_ID` | İletişim formu |
| `SITE_PRIVATE` | `true` → arama motorları kapalı |

## Komutlar

```bash
npm run build
npm start
```

---

*AI Digital Twin / LLM backend ayrı branch’te: `feature/ai-twin-full`*
