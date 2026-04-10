"use server";

export async function sendEmail(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    throw new Error("All fields are required.");
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new Error("Email service is not configured.");
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "accept": "application/json",
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

  if (!response.ok) {
    throw new Error("Failed to send message.");
  }
}