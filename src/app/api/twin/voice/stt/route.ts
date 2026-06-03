import { NextResponse } from "next/server";

const backendUrl = process.env.TWIN_BACKEND_URL ?? "http://localhost:8000";

export async function POST(request: Request) {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const audio = formData.get("audio");
  if (!audio || !(audio instanceof Blob)) {
    return NextResponse.json({ error: "Missing audio field." }, { status: 400 });
  }

  const locale = (formData.get("locale") as string | null) ?? "tr";
  const outbound = new FormData();
  outbound.append("audio", audio, "recording.webm");
  outbound.append("locale", locale);

  try {
    const url = new URL(`${backendUrl.replace(/\/$/, "")}/api/v1/voice/stt`);
    url.searchParams.set("locale", locale);

    const response = await fetch(url.toString(), {
      method: "POST",
      body: outbound,
      signal: AbortSignal.timeout(180_000),
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
            : "STT backend error.";
      return NextResponse.json({ error: message }, { status: response.status });
    }

    const data = (await response.json()) as {
      text: string;
      language: string;
      duration_seconds?: number;
    };

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      {
        error:
          "STT backend is not reachable. Install faster-whisper and run uvicorn on port 8000.",
      },
      { status: 503 },
    );
  }
}
