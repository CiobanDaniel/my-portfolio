import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export const runtime = "nodejs";

async function getRuntimeVar(name: string): Promise<string | undefined> {
  const fromProcess = process.env[name]?.trim();
  if (fromProcess) return fromProcess;

  try {
    const { env } = await getCloudflareContext({ async: true });
    const value = (env as Record<string, unknown>)[name];
    return typeof value === "string" ? value.trim() : undefined;
  } catch {
    return undefined;
  }
}

export async function POST(request: Request) {
  const payload = (await request.json()) as ContactPayload;
  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const subject = payload.subject?.trim() || "Portfolio Contact";
  const message = payload.message?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Please fill in all fields." },
      { status: 400 }
    );
  }

  const [apiKey, senderEmail, receiverEmail, senderName] = await Promise.all([
    getRuntimeVar("BREVO_API_KEY"),
    getRuntimeVar("BREVO_SENDER_EMAIL"),
    getRuntimeVar("BREVO_TO_EMAIL"),
    getRuntimeVar("BREVO_SENDER_NAME"),
  ]);

  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        error: "Email service not configured: missing BREVO_API_KEY.",
      },
      { status: 500 }
    );
  }

  if (!senderEmail || !receiverEmail) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Email service not configured: set BREVO_SENDER_EMAIL and BREVO_TO_EMAIL.",
      },
      { status: 500 }
    );
  }

  const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: senderName || "Portfolio Bot",
        email: senderEmail,
      },
      to: [{ email: receiverEmail }],
      subject: `${subject} — from ${name}`,
      textContent: `Sender: ${email}\n\nMessage: ${message}`,
    }),
  });

  if (brevoResponse.ok) {
    return NextResponse.json({ ok: true });
  }

  let hint = "";
  try {
    const data = (await brevoResponse.json()) as { message?: string };
    const msg = data.message?.toLowerCase() ?? "";
    if (msg.includes("sender") || msg.includes("not valid")) {
      hint = " Verify sender email in Brevo SMTP & API settings.";
    }
  } catch {
    // No-op, keep generic message.
  }

  return NextResponse.json(
    {
      ok: false,
      error: `Could not send message (${brevoResponse.status}).${hint}`,
    },
    { status: 502 }
  );
}
