"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";

export type SendEmailResult =
  | { ok: true }
  | { ok: false; error: string };

async function getBrevoApiKey(): Promise<string | undefined> {
  const fromProcess = process.env.BREVO_API_KEY?.trim();
  if (fromProcess) return fromProcess;

  try {
    const { env } = await getCloudflareContext({ async: true });
    const key = (env as Record<string, unknown>).BREVO_API_KEY;
    return typeof key === "string" ? key.trim() : undefined;
  } catch {
    return undefined;
  }
}

export async function sendEmail(formData: FormData): Promise<SendEmailResult> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { ok: false, error: "Please fill in all fields." };
  }

  const apiKey = await getBrevoApiKey();
  if (!apiKey) {
    return {
      ok: false,
      error:
        "Email service is not configured. Add BREVO_API_KEY under this Worker’s Variables and Secrets (runtime), then redeploy.",
    };
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Portfolio Bot", email: "admin@cioban.dev" },
      to: [{ email: "admin@cioban.dev" }],
      subject: `New Portfolio Message from ${name}`,
      textContent: `Sender: ${email}\n\nMessage: ${message}`,
    }),
  });

  if (response.ok) {
    return { ok: true };
  }

  let brevoHint = "";
  try {
    const data = (await response.json()) as { message?: string };
    const msg = data.message?.toLowerCase() ?? "";
    if (msg.includes("sender") || msg.includes("not valid")) {
      brevoHint =
        " Check that the sender address is verified in Brevo (SMTP & API → Senders).";
    }
  } catch {
    /* ignore */
  }

  return {
    ok: false,
    error: `Could not send message (${response.status}).${brevoHint}`,
  };
}
