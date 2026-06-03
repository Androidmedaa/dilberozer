# Dilber Özer — Portfolio + AI Digital Twin

Bu README, projeyi **GitHub’a push** edip **başka bir GPU makinesinde** kaldığın yerden devam etmen için hazırlanmış ana rehberdir.  
Her şeyi unuttuğunda önce bu dosyaya bak.

---

## 1. Proje nedir?

İki parçalı sistem:

| Parça | Teknoloji | Nerede çalışır |
|--------|-----------|----------------|
| **Portföy sitesi** | Next.js 16, TypeScript, CSS Modules, Framer Motion | Vercel (veya `npm run dev`) |
| **AI Digital Twin** | FastAPI + Ollama (open-source LLM) + JSON RAG | **GPU makinesi** (localhost:8000) |

Ziyaretçi portföyü gezer; `/twin` sayfasında Dilber hakkında **metin sohbet** yapar (Phase 1).  
Ses (STT/TTS) ve avatar **henüz stub** — Phase 2–3.

**Vizyon dokümanı:** Digital Twin (ses, avatar, pgvector) — `docs/OPEN_SOURCE_AI_STACK.md`

---

## 2. Ne tamamlandı? (checklist)

### Portföy (frontend)
- [x] Ana sayfa proje galerisi (`/`)
- [x] Stajlar (`/internships`) — CallMetric, Norm, Proceedit
- [x] AI sayfası (`/artificial-intelligence`)
- [x] About + CV indirme (`/about`)
- [x] Contact form → Formspree (`/api/contact`)
- [x] Case study sayfaları (`/projects/[slug]`)
- [x] Lightbox (linkli olmayan görseller: büyütme, ok, Esc)
- [x] Sosyal linkler: GitHub, LinkedIn, Medium (`src/data/site.ts`)
- [x] Proje kapak görselleri güncellendi (KiTS23, SEMA, Flower)

### AI Digital Twin (Phase 1)
- [x] FastAPI backend (`backend/`)
- [x] Ollama ile chat (`POST /api/v1/chat`)
- [x] Knowledge RAG — `knowledge/*.json` (keyword retrieval)
- [x] Modlar: `default` | `interview` | `skills`
- [x] Next.js `/twin` + proxy `POST /api/twin/chat`
- [x] STT/TTS (`/api/v1/voice/*`) — faster-whisper + Piper TR
- [x] `/twin` mikrofon + sesli yanıt + Next proxy `/api/twin/voice/*`

### Deploy hazırlığı
- [x] `.env.example`, `DEPLOY.md`, `robots.ts`, `sitemap.ts`
- [x] `SITE_PRIVATE` — unlisted mod

### Yapılmadı (sıradaki işler)
- [x] GPU config: Whisper `cuda` + Piper `PIPER_USE_CUDA` (`backend/.env`, `scripts/setup-gpu.sh`)
- [ ] Phase 3: PostgreSQL + pgvector + bge-m3 embeddings
- [ ] Avatar / lip-sync (Wav2Lip veya HeyGen alternatifi)
- [ ] GitHub → Vercel deploy (repo henüz remote’a bağlı olmayabilir)
- [ ] GPU sunucuda production systemd / Docker

---

## 3. Mimari (özet)

```text
[Ziyaretçi]
    │
    ├─► Vercel: Next.js (portföy + /twin UI)
    │         │
    │         └─► POST /api/twin/chat  (Next proxy)
    │                    │
    └────────────────────┼─► GPU sunucu: FastAPI :8000
                             ├─ RAG ← knowledge/*.json
                             ├─ LLM ← Ollama :11434
                             ├─ Whisper STT (faster-whisper)
                             └─ Piper TTS (TR)
```

**Önemli:** Vercel üzerinde Ollama/Whisper çalışmaz. Twin için GPU makinede backend açık olmalı; Vercel’de `TWIN_BACKEND_URL=https://gpu-sunucu-adresi` tanımlanır.

---

## 4. Klasör yapısı

```text
new_portfolio/
├── src/                    # Next.js frontend
│   ├── app/                  # Sayfalar + API routes
│   │   ├── twin/             # AI Digital Twin UI
│   │   └── api/twin/chat/    # Backend proxy
│   ├── components/
│   ├── data/                 # site, projects, internships, about, ai
│   └── ...
├── public/                   # Statik dosyalar (görseller, CV)
│   ├── projects/
│   ├── internships/
│   └── cv/dilber_ozer.pdf
├── backend/                  # FastAPI (GPU makinede çalıştır)
│   └── app/
│       ├── main.py
│       ├── routers/          # health, chat, voice (stub)
│       └── services/         # llm, rag, knowledge
├── knowledge/                # RAG bilgi kaynağı (JSON)
├── scripts/
│   └── export-knowledge.mjs  # knowledge yenileme
├── docs/
│   └── OPEN_SOURCE_AI_STACK.md
├── DEPLOY.md                 # Vercel + Formspree detay
└── .env.example              # Tüm env değişkenleri
```

---

## 5. İçerik nereden düzenlenir?

| Ne değişecek | Dosya |
|--------------|--------|
| İsim, sosyal, OCR Medium | `src/data/site.ts` |
| Projeler + case study | `src/data/projects.ts` |
| Stajlar | `src/data/internships.ts` |
| About metni | `src/data/about.ts` |
| AI sayfası metinleri | `src/data/artificial-intelligence.ts` |
| Menü | `src/data/site.ts` → `navItems` |
| Twin bilgi tabanı | `knowledge/*.json` → sonra `node scripts/export-knowledge.mjs` |
| CV PDF | `public/cv/dilber_ozer.pdf` |

Portföy metnini değiştirdikten sonra Twin’i güncellemek için:

```bash
node scripts/export-knowledge.mjs
```

---

## 6. GitHub’a ilk push

Proje klasöründe (remote yoksa):

```bash
git init
git add .
git commit -m "Portfolio + AI Digital Twin Phase 1"
git branch -M main
git remote add origin https://github.com/Androidmedaa/new_portfolio.git
git push -u origin main
```

Zaten remote varsa:

```bash
git remote -v
git add .
git commit -m "Update portfolio and twin backend"
git push
```

**Commit etme (öneri):** `.env.local`, `backend/.env`, `backend/.venv/`, `.next/` — `.gitignore`’da zaten var.

**İsteğe bağlı:** Kökteki büyük dosyalar (`*.docx`, `semaai.pdf`, `_docx_extract/`) repoyu şişirir; GitHub’a atmadan önce silmek veya `.gitignore`’a eklemek isteyebilirsin.

---

## 7. Yeni GPU makinesinde kurulum (sıfırdan)

### 7.1 Gereksinimler

- **Node.js** 20+ (frontend)
- **Python** 3.11+ (backend)
- **Git**
- **Ollama** — https://ollama.com
- **NVIDIA GPU + CUDA** (Phase 2 STT ve büyük modeller için; Phase 1 metin için CPU da yeterli olabilir)

### 7.2 Repoyu klonla

```bash
git clone https://github.com/Androidmedaa/new_portfolio.git
cd new_portfolio
```

### 7.3 Frontend

```bash
npm install
cp .env.example .env.local
```

`.env.local` örneği:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
TWIN_BACKEND_URL=http://localhost:8000
FORMSPREE_FORM_ID=your_formspree_id
SITE_PRIVATE=false
```

```bash
npm run dev
```

→ http://localhost:3000

### 7.4 Ollama (LLM)

```bash
ollama pull qwen2.5:7b-instruct
ollama serve
```

Alternatif modeller: `llama3.1:8b`, `mistral:7b` — `backend/.env` içinde `OLLAMA_MODEL` değiştir.

### 7.5 Backend (FastAPI)

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

# Linux
source .venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
```

`backend/.env` örneği:

```env
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen2.5:7b-instruct
KNOWLEDGE_DIR=../knowledge
CORS_ORIGINS=http://localhost:3000,https://your-vercel-app.vercel.app
```

```bash
# backend/ klasöründeyken
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Kontrol:

- http://localhost:8000/docs — Swagger
- http://localhost:8000/api/v1/health — `ollama: true`, `knowledge_chunks` > 0

### 7.6 Twin test

1. Backend + Ollama çalışıyor olmalı  
2. `npm run dev` açık  
3. http://localhost:3000/twin — “Dilber kimdir?” yaz  

---

## 8. İki makine senaryosu (senin planın)

| Makine | Rol |
|--------|-----|
| **Laptop / geliştirme** | Kod, `npm run dev`, isteğe bağlı local Ollama |
| **GPU sunucu** | Ollama + `uvicorn` 7/24, public IP veya tunnel |

GPU sunucuda:

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

Firewall’da **8000** (veya reverse proxy ile 443) aç.  
Vercel Environment:

```env
TWIN_BACKEND_URL=https://api.senin-domainin.com
```

`backend/.env` → `CORS_ORIGINS` içine Vercel URL’ini ekle.

---

## 9. Ortam değişkenleri (tam liste)

### Next.js (`.env.local` / Vercel)

| Değişken | Zorunlu | Açıklama |
|----------|---------|----------|
| `NEXT_PUBLIC_SITE_URL` | Evet (prod) | Canlı site URL, sonda `/` yok |
| `TWIN_BACKEND_URL` | Twin için | FastAPI adresi |
| `FORMSPREE_FORM_ID` | Contact için | Formspree form ID |
| `SITE_PRIVATE` | Hayır | `true` → Google index kapalı |

### Backend (`backend/.env`)

| Değişken | Varsayılan | Açıklama |
|----------|------------|----------|
| `OLLAMA_BASE_URL` | `http://localhost:11434` | Ollama API |
| `OLLAMA_MODEL` | `qwen2.5:7b-instruct` | Model adı |
| `KNOWLEDGE_DIR` | `../knowledge` | JSON RAG klasörü |
| `CORS_ORIGINS` | `http://localhost:3000` | Virgülle ayrılmış origin |

---

## 10. API uçları (backend)

| Method | Path | Durum |
|--------|------|--------|
| GET | `/api/v1/health` | Hazır |
| POST | `/api/v1/chat` | Hazır — body: `{ "message", "mode", "locale" }` |
| POST | `/api/v1/voice/stt` | Hazır — multipart `audio` |
| POST | `/api/v1/voice/tts` | Hazır — `{ text, locale }` → WAV |

`mode`: `default` | `interview` | `skills`  
`locale`: `tr` | `en`

---

## 11. Yol haritası (devam etme sırası)

1. **GitHub push** + Vercel deploy → `DEPLOY.md`  
2. **GPU makine** → bu README §7  
3. **Phase 2 ses (kurulum)**  
   - `pip install -r backend/requirements.txt`  
   - `bash scripts/download-piper-tr.sh`  
   - GPU: `WHISPER_DEVICE=cuda` in `backend/.env`  
4. **Phase 3 RAG**  
   - PostgreSQL + pgvector  
   - `sentence-transformers` / bge-m3 embed  
   - CV PDF ingest pipeline  
5. **Avatar** — Wav2Lip + profil foto veya streaming servis  

Detay: `docs/OPEN_SOURCE_AI_STACK.md`

---

## 12. Sık sorunlar

| Sorun | Çözüm |
|--------|--------|
| Twin “backend'e bağlanamıyor” | `uvicorn` çalışıyor mu? `TWIN_BACKEND_URL` doğru mu? |
| Ollama yanıt vermiyor | `ollama serve`, `ollama list`, model pull edildi mi? |
| `knowledge_chunks: 0` | `knowledge/` klasörü var mı? `KNOWLEDGE_DIR` yolu |
| Contact form çalışmıyor | `FORMSPREE_FORM_ID` Vercel’de tanımlı mı? |
| Build uyarısı metadataBase | Prod’da `NEXT_PUBLIC_SITE_URL` set et |
| Vercel’de Twin boş | GPU backend public URL + CORS |

---

## 13. Faydalı komutlar

```bash
# Frontend production build
npm run build && npm start

# Knowledge export
node scripts/export-knowledge.mjs

# Backend health (curl)
curl http://localhost:8000/api/v1/health

# Chat test
curl -X POST http://localhost:8000/api/v1/chat \
  -H "Content-Type: application/json" \
  -d "{\"message\":\"Dilber kimdir?\",\"mode\":\"default\",\"locale\":\"tr\"}"
```

---

## 14. İlgili dosyalar

| Dosya | İçerik |
|--------|--------|
| [DEPLOY.md](./DEPLOY.md) | Vercel, Formspree, private site |
| [backend/README.md](./backend/README.md) | Backend kısa özet |
| [docs/OPEN_SOURCE_AI_STACK.md](./docs/OPEN_SOURCE_AI_STACK.md) | Open-source STT/TTS/LLM planı |
| [knowledge/README.md](./knowledge/README.md) | RAG JSON kaynakları |

---

## 15. Kişisel bilgiler (hızlı referans)

- **GitHub:** https://github.com/Androidmedaa  
- **LinkedIn:** https://www.linkedin.com/in/dilber-ozer  
- **Medium:** https://medium.com/@dilberozer  
- **E-posta (About/Contact):** dilberozer.ceng@gmail.com  

---

*Son güncelleme: Phase 2 kodu hazır (STT/TTS + /twin ses). GPU makinesinde §7 + Piper model indir.*
