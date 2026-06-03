import { NextResponse } from "next/server";

const backendUrl = process.env.TWIN_BACKEND_URL ?? "http://localhost:8000";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  try {
    const response = await fetch(`${backendUrl.replace(/\/$/, "")}/api/v1/voice/tts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(120_000),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => ({}))) as {
        detail?: string | { message?: string };
      };
      const detail = data.detail;
      const message =
        typeof detail === "string"
          ? detail
          : typeof detail === "object" && detail?.message
            ? detail.message
            : "TTS backend error.";
      return NextResponse.json({ error: message }, { status: response.status });
    }

    const audioBuffer = await response.arrayBuffer();
    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": response.headers.get("Content-Type") ?? "audio/wav",
      },
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "TTS backend is not reachable. Install Piper model and piper-tts, then restart uvicorn.",
      },
      { status: 503 },
    );
  }
}
