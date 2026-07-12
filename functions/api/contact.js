const RECIPIENTS = ["cooltankis007@gmail.com", "chowonjang@gmail.com"];

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function onRequestPost({ request, env }) {
  const data = await request.json();
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

  const list = (await env.HP_CONTACTS?.get("contacts", "json")) || [];
  list.unshift(inquiry);
  await env.HP_CONTACTS.put("contacts", JSON.stringify(list.slice(0, 200)));

  if (env.EMAIL && env.CONTACT_FROM) {
    const subject = `[Hamburger Pictures] New inquiry from ${inquiry.name}`;
    const text = [
      `Name: ${inquiry.name}`,
      `Email: ${inquiry.email}`,
      `Phone: ${inquiry.phone}`,
      `Project: ${inquiry.projectType}`,
      "",
      inquiry.message
    ].join("\n");
    const html = `
      <h2>New Hamburger Pictures inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(inquiry.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(inquiry.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(inquiry.phone)}</p>
      <p><strong>Project:</strong> ${escapeHtml(inquiry.projectType)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(inquiry.message).replaceAll("\n", "<br>")}</p>
    `;

    await env.EMAIL.send({
      to: RECIPIENTS,
      from: env.CONTACT_FROM,
      replyTo: inquiry.email,
      subject,
      text,
      html
    });
  }

  return json({ ok: true });
}
