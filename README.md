# Dilber Özer — Living Knowledge Library

Minimalist **3D library** homepage (Next.js 16 + React Three Fiber). Four books:

- **Desk (open)** — Home
- **Shelf** — About Me, AI Projects, Contact

## Run

```bash
npm install
cp .env.example .env.local
npm run dev
```

→ http://localhost:3000

## Deep links

- `/?book=about`
- `/?book=projects` (legacy: `/?book=ai-projects`)
- `/?book=internships`
- `/?book=contact`

Project case studies: `/projects/[slug]` (with return link to library).

## Content

| Book | Data |
|------|------|
| Home | `src/data/site.ts`, projects teaser |
| About | `src/data/about.ts` |
| AI Projects | `src/data/projects.ts`, internships, AI page |
| Contact | Formspree via `/api/contact` |

## 3D scene

- `src/components/library3d/` — Three.js room (desk + shelf books)
- Reuses parchment UI from `src/components/library/BookSpread.tsx`

## Deploy

[DEPLOY.md](./DEPLOY.md) — Vercel, `FORMSPREE_FORM_ID`, `NEXT_PUBLIC_SITE_URL`

*Full AI Twin stack lives on branch `feature/ai-twin-full`.*
