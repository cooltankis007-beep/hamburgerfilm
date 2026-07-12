import { contactsStore, escapeHtml, json, RECIPIENTS } from "./_shared.mjs";

async function sendEmail(inquiry) {
  if (!process.env.RESEND_API_KEY || !process.env.FROM_EMAIL) return;

  const subject = `[Hamburger Pictures] New inquiry from ${inquiry.name}`;
  const html = `
    <h2>New Hamburger Pictures inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(inquiry.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(inquiry.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(inquiry.phone)}</p>
    <p><strong>Project:</strong> ${escapeHtml(inquiry.projectType)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(inquiry.message).replaceAll("\n", "<br>")}</p>
  `;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      from: process.env.FROM_EMAIL,
      to: RECIPIENTS,
      reply_to: inquiry.email,
      subject,
      html
    })
  });
}

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return json({ ok: false, error: "Method not allowed" }, 405);
  }

  const data = JSON.parse(event.body || "{}");
  const inquiry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name: String(data.name || "").trim(),
    email: String(data.email || "").trim(),
    phone: String(data.phone || "").trim(),
    projectType: String(data.projectType || "").trim(),
    message: String(data.message || "").trim()
  };

  if (!inquiry.name || !inquiry.email || !inquiry.message) {
    return json({ ok: false, error: "Name, email, and message are required." }, 400);
  }

  const store = contactsStore();
  const contacts = (await store.get("contacts", { type: "json" })) || [];
  contacts.unshift(inquiry);
  await store.setJSON("contacts", contacts.slice(0, 200));
  await sendEmail(inquiry);

  return json({ ok: true });
}
