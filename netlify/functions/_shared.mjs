import { getStore } from "@netlify/blobs";

export const RECIPIENTS = ["cooltankis007@gmail.com", "chowonjang@gmail.com"];

export function json(data, statusCode = 200) {
  return {
    statusCode,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    },
    body: JSON.stringify(data)
  };
}

export function isAuthorized(event) {
  const auth = event.headers.authorization || event.headers.Authorization || "";
  const token = auth.replace(/^Bearer\s+/i, "");
  return Boolean(process.env.ADMIN_TOKEN && token && token === process.env.ADMIN_TOKEN);
}

export function contentStore() {
  return getStore("hp-content");
}

export function contactsStore() {
  return getStore("hp-contacts");
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
