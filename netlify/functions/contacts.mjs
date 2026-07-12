import { contactsStore, isAuthorized, json } from "./_shared.mjs";

export async function handler(event) {
  if (event.httpMethod !== "GET") {
    return json({ ok: false, error: "Method not allowed" }, 405);
  }

  if (!isAuthorized(event)) {
    return json({ ok: false, error: "Unauthorized" }, 401);
  }

  const store = contactsStore();
  const contacts = (await store.get("contacts", { type: "json" })) || [];
  return json({ ok: true, contacts });
}
