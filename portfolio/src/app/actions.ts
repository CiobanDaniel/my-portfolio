"use server";

export async function sendEmail(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "api-key": process.env.BREVO_API_KEY || "",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Portfolio Bot", email: "admin@cioban.dev" },
      to: [{ email: "admin@cioban.dev" }],
      subject: `New Portfolio Message from ${name}`,
      textContent: `Sender: ${email}\n\nMessage: ${message}`,
    }),
  });
}