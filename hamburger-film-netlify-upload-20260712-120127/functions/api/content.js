const KEY = "site-content";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

function isAuthorized(request, env) {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  return Boolean(env.ADMIN_TOKEN && token && token === env.ADMIN_TOKEN);
}

export async function onRequestGet({ env }) {
  const saved = await env.HP_CONTENT?.get(KEY, "json");
  return json(saved || null);
}

export async function onRequestPost({ request, env }) {
  if (!isAuthorized(request, env)) {
    return json({ ok: false, error: "Unauthorized" }, 401);
  }

  const body = await request.json();
  const works = Array.isArray(body.works) ? body.works : [];
  const showreelUrl = String(body.showreelUrl || "").trim();

  const clean = {
    showreelUrl,
    works: works.slice(0, 30).map((item) => ({
      image: String(item.image || "").trim(),
      alt: String(item.alt || "").trim(),
      caption: String(item.caption || "").trim(),
      wide: Boolean(item.wide)
    })).filter((item) => item.image && item.caption)
  };

  await env.HP_CONTENT.put(KEY, JSON.stringify(clean));
  return json({ ok: true, content: clean });
}
