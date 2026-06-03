import httpx

from app.config import settings

SYSTEM_PROMPT_TR = """Sen Dilber Özer'in yapay zeka dijital ikizisin.
SADECE verilen bağlamdaki bilgileri kullanarak cevap ver.
Bağlamda olmayan konularda uydurma; "Bu bilgi portföy/CV verilerinde yer almıyor" de.
Ton: profesyonel, samimi, net. Kısa ve öz cevaplar ver (tercihen 2-5 cümle).
Teknik sorularda Deneyim → Yaklaşım → Sonuç sırasını kullan."""

SYSTEM_PROMPT_INTERVIEW_TR = """Sen Dilber Özer adına mülakat simülasyonu yapıyorsun.
Sadece bağlamdaki deneyim ve projelere dayanarak cevap ver.
Metric ve teknoloji isimlerini abartma; emin olmadığın detayı söyleme."""

SYSTEM_PROMPT_SKILLS_TR = """Kullanıcı Dilber'in yetkinliklerini soruyor.
Bağlamdan ilgili projeleri, teknolojileri ve staj deneyimlerini özetle."""


async def generate_reply(
    user_message: str,
    context: str,
    mode: str = "default",
    locale: str = "tr",
) -> tuple[str, str | None, bool]:
    """
    Returns (reply_text, model_name, used_fallback).
    Calls Ollama; on failure returns a safe fallback without hallucinating CV facts.
    """
    system = _system_for_mode(mode, locale)
    user_block = f"""Bağlam (Dilber Özer — portföy/CV):
{context or "(Bağlam yüklenemedi — knowledge/ klasörünü kontrol edin.)"}

Kullanıcı sorusu:
{user_message}"""

    payload = {
        "model": settings.ollama_model,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user_block},
        ],
        "stream": False,
        "options": {
            "temperature": 0.3,
            "num_predict": settings.ollama_num_predict,
        },
    }

    url = f"{settings.ollama_base_url.rstrip('/')}/api/chat"

    try:
        async with httpx.AsyncClient(timeout=120.0) as client:
            response = await client.post(url, json=payload)
            response.raise_for_status()
            data = response.json()
            content = data.get("message", {}).get("content", "").strip()
            if content:
                return content, settings.ollama_model, False
    except (httpx.HTTPError, KeyError):
        pass

    return _fallback_reply(user_message, context, locale), None, True


def _system_for_mode(mode: str, locale: str) -> str:
    if locale != "tr":
        return SYSTEM_PROMPT_TR.replace("Dilber Özer", "Dilber Ozer")
    if mode == "interview":
        return SYSTEM_PROMPT_INTERVIEW_TR
    if mode == "skills":
        return SYSTEM_PROMPT_SKILLS_TR
    return SYSTEM_PROMPT_TR


def _fallback_reply(user_message: str, context: str, locale: str) -> str:
    if locale == "tr":
        if not context.strip():
            return (
                "Şu an LLM servisine (Ollama) bağlanamıyorum ve bilgi tabanı boş görünüyor. "
                "Lütfen backend'i başlatın: `cd backend && uvicorn app.main:app --reload` "
                "ve Ollama'yı çalıştırın: `ollama pull qwen2.5:7b-instruct`."
            )
        snippet = context[:1200].strip()
        return (
            "Ollama şu an yanıt vermiyor; geçici olarak bağlamdan kısa özet paylaşıyorum:\n\n"
            f"{snippet}\n\n"
            "Tam sohbet için Ollama'nın çalıştığından emin olun."
        )
    return "LLM service unavailable. Start Ollama and the FastAPI backend, then try again."


async def check_ollama() -> bool:
    try:
        async with httpx.AsyncClient(timeout=3.0) as client:
            r = await client.get(f"{settings.ollama_base_url.rstrip('/')}/api/tags")
            return r.status_code == 200
    except httpx.HTTPError:
        return False
