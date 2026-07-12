import { contentStore, isAuthorized, json } from "./_shared.mjs";

const KEY = "site-content";

export async function handler(event) {
  const store = contentStore();

  if (event.httpMethod === "GET") {
    const saved = await store.get(KEY, { type: "json" });
    return json(saved || null);
  }

  if (event.httpMethod !== "POST") {
    return json({ ok: false, error: "Method not allowed" }, 405);
  }

  if (!isAuthorized(event)) {
    return json({ ok: false, error: "Unauthorized" }, 401);
  }

  const body = JSON.parse(event.body || "{}");
  const works = Array.isArray(body.works) ? body.works : [];
  const clean = {
    showreelUrl: String(body.showreelUrl || "").trim(),
    works: works.slice(0, 30).map((item) => ({
      image: String(item.image || "").trim(),
      alt: String(item.alt || "").trim(),
      caption: String(item.caption || "").trim(),
      wide: Boolean(item.wide)
    })).filter((item) => item.image && item.caption)
  };

  await store.setJSON(KEY, clean);
  return json({ ok: true, content: clean });
}
