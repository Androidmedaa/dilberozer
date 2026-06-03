"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/site";
import styles from "./twin-chat.module.css";

type ChatMode = "default" | "interview" | "skills";

type Message = {
  role: "user" | "assistant";
  content: string;
  fallback?: boolean;
};

const GREETING_TR =
  "Merhaba, ben Dilber'in yapay zeka temsilcisiyim. Dilber hakkında merak ettiğiniz her şeyi bana sorabilirsiniz. Mikrofonla da konuşabilirsiniz.";

export function TwinChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: GREETING_TR },
  ]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<ChatMode>("default");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [voiceReply, setVoiceReply] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    });
  }, []);

  const stopSpeaking = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setSpeaking(false);
  }, []);

  const playTts = useCallback(
    async (text: string) => {
      if (!voiceReply || !text.trim()) return;

      stopSpeaking();
      setSpeaking(true);

      try {
        const response = await fetch("/api/twin/voice/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, locale: "tr" }),
        });

        if (!response.ok) return;

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audioRef.current = audio;
        audio.onended = () => {
          URL.revokeObjectURL(url);
          setSpeaking(false);
          audioRef.current = null;
        };
        audio.onerror = () => {
          URL.revokeObjectURL(url);
          setSpeaking(false);
        };
        await audio.play();
      } catch {
        setSpeaking(false);
      }
    },
    [voiceReply, stopSpeaking],
  );

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      setError("");
      setInput("");
      setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
      setLoading(true);
      scrollToBottom();

      try {
        const response = await fetch("/api/twin/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, mode, locale: "tr" }),
        });

        const data = (await response.json()) as {
          reply?: string;
          error?: string;
          fallback?: boolean;
        };

        if (!response.ok) {
          throw new Error(data.error ?? "Yanıt alınamadı.");
        }

        const reply = data.reply ?? "Yanıt boş geldi.";
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: reply,
            fallback: data.fallback,
          },
        ]);
        void playTts(reply);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Bağlantı hatası.";
        setError(msg);
        const fallbackText =
          "Şu an backend'e bağlanamıyorum. `backend` klasöründe uvicorn çalıştırın ve Ollama'yı açın.";
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: fallbackText, fallback: true },
        ]);
      } finally {
        setLoading(false);
        scrollToBottom();
      }
    },
    [loading, mode, scrollToBottom, playTts],
  );

  const transcribeBlob = useCallback(
    async (blob: Blob) => {
      setTranscribing(true);
      setError("");

      try {
        const form = new FormData();
        form.append("audio", blob, "recording.webm");
        form.append("locale", "tr");

        const response = await fetch("/api/twin/voice/stt", {
          method: "POST",
          body: form,
        });

        const data = (await response.json()) as { text?: string; error?: string };

        if (!response.ok) {
          throw new Error(data.error ?? "Ses tanıma başarısız.");
        }

        const text = data.text?.trim();
        if (!text) {
          throw new Error("Konuşma algılanamadı. Tekrar deneyin.");
        }

        await sendMessage(text);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "STT hatası.";
        setError(msg);
      } finally {
        setTranscribing(false);
      }
    },
    [sendMessage],
  );

  const startRecording = useCallback(async () => {
    setError("");
    stopSpeaking();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : "audio/webm";
      const recorder = new MediaRecorder(stream, { mimeType });
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: mimeType });
        if (blob.size > 0) {
          void transcribeBlob(blob);
        }
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch {
      setError("Mikrofon erişimi reddedildi veya kullanılamıyor.");
    }
  }, [stopSpeaking, transcribeBlob]);

  const stopRecording = useCallback(() => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
    }
    mediaRecorderRef.current = null;
    setIsRecording(false);
  }, []);

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      void startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  useEffect(() => {
    return () => stopSpeaking();
  }, [stopSpeaking]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    void sendMessage(input);
  }

  const busy = loading || transcribing || isRecording;

  return (
    <div className={styles.layout}>
      <aside className={styles.avatarPanel} aria-label="AI representative">
        <div className={styles.avatarWrap}>
          <Image
            src={siteConfig.profileImage}
            alt="Dilber Özer"
            fill
            className={styles.avatarImage}
            sizes="280px"
            priority
          />
          {speaking && <span className={styles.speakingBadge}>Konuşuyor…</span>}
        </div>
        <p className={styles.avatarCaption}>AI Digital Twin · Phase 2 (text + voice)</p>
        <p className={styles.avatarNote}>
          Mikrofon: faster-whisper STT · Yanıt sesi: Piper TR (GPU sunucuda backend gerekir)
        </p>
      </aside>

      <section className={styles.chatPanel}>
        <div className={styles.modeBar}>
          <span className={styles.modeLabel}>Mod:</span>
          {(
            [
              ["default", "Genel"],
              ["interview", "Mülakat"],
              ["skills", "Yetenekler"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={`${styles.modeBtn} ${mode === value ? styles.modeBtnActive : ""}`}
              onClick={() => setMode(value)}
              disabled={busy}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            className={`${styles.voiceToggle} ${voiceReply ? styles.voiceToggleOn : ""}`}
            onClick={() => {
              if (voiceReply) stopSpeaking();
              setVoiceReply((v) => !v);
            }}
            disabled={busy}
            title="Yanıtları sesli oku (Piper TTS)"
          >
            {voiceReply ? "🔊 Sesli yanıt" : "🔇 Sessiz"}
          </button>
        </div>

        <div className={styles.messages} ref={listRef} role="log" aria-live="polite">
          {messages.map((msg, i) => (
            <div
              key={`${msg.role}-${i}`}
              className={`${styles.bubble} ${msg.role === "user" ? styles.bubbleUser : styles.bubbleAssistant}`}
            >
              {msg.content}
              {msg.fallback && <span className={styles.fallbackTag}> (offline / fallback)</span>}
              {msg.role === "assistant" && !msg.fallback && voiceReply && i > 0 && (
                <button
                  type="button"
                  className={styles.replayBtn}
                  onClick={() => void playTts(msg.content)}
                  disabled={speaking || loading}
                  aria-label="Yanıtı tekrar dinle"
                >
                  ▶ Dinle
                </button>
              )}
            </div>
          ))}
          {loading && (
            <div className={styles.typing}>
              Yanıt hazırlanıyor… (CPU&apos;da 30–120 sn sürebilir; GPU veya küçük model daha hızlı)
            </div>
          )}
          {transcribing && <div className={styles.typing}>Ses yazıya çevriliyor…</div>}
        </div>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <button
            type="button"
            className={`${styles.micBtn} ${isRecording ? styles.micBtnActive : ""}`}
            onClick={toggleRecording}
            disabled={loading || transcribing}
            aria-pressed={isRecording}
            aria-label={isRecording ? "Kaydı durdur" : "Sesle konuş"}
          >
            {isRecording ? "⏹ Durdur" : "🎤 Konuş"}
          </button>
          <input
            className={styles.input}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Yazın veya mikrofonla konuşun…"
            disabled={busy}
            autoComplete="off"
          />
          <button type="submit" className={styles.send} disabled={busy || !input.trim()}>
            Gönder
          </button>
        </form>

        <p className={styles.hint}>
          LLM: Ollama · RAG: portföy JSON · STT: faster-whisper · TTS: Piper TR
        </p>
      </section>
    </div>
  );
}
