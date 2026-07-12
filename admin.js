const tokenInput = document.querySelector("#admin-token");
const loadButton = document.querySelector("#load-admin");
const saveButton = document.querySelector("#save-admin");
const addWorkButton = document.querySelector("#add-work");
const refreshContactsButton = document.querySelector("#refresh-contacts");
const showreelInput = document.querySelector("#showreel-url");
const workEditor = document.querySelector("#work-editor");
const contactList = document.querySelector("#contact-list");
const statusNode = document.querySelector("#admin-status");

let content = structuredClone(window.HP_DEFAULT_CONTENT);

function token() {
  return tokenInput.value.trim();
}

function setStatus(message) {
  statusNode.textContent = message;
}

function renderWorks() {
  workEditor.innerHTML = "";
  content.works.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "work-edit-card";
    card.innerHTML = `
      <label>Image URL<input data-field="image" value="${item.image || ""}" /></label>
      <label>Caption<input data-field="caption" value="${item.caption || ""}" /></label>
      <label>Alt text<input data-field="alt" value="${item.alt || ""}" /></label>
      <label class="check-row"><input data-field="wide" type="checkbox" ${item.wide ? "checked" : ""} /> Wide tile</label>
      <button class="button ghost" type="button" data-remove="${index}">Remove</button>
    `;

    card.querySelectorAll("[data-field]").forEach((input) => {
      input.addEventListener("input", () => {
        const field = input.dataset.field;
        content.works[index][field] = input.type === "checkbox" ? input.checked : input.value;
      });
      input.addEventListener("change", () => {
        const field = input.dataset.field;
        content.works[index][field] = input.type === "checkbox" ? input.checked : input.value;
      });
    });

    card.querySelector("[data-remove]").addEventListener("click", () => {
      content.works.splice(index, 1);
      renderWorks();
    });

    workEditor.append(card);
  });
}

async function loadContent() {
  setStatus("Loading...");
  const response = await fetch("/api/content", { cache: "no-store" });
  const saved = await response.json();
  content = saved || structuredClone(window.HP_DEFAULT_CONTENT);
  showreelInput.value = content.showreelUrl || "";
  renderWorks();
  await loadContacts();
  setStatus("Loaded.");
}

async function saveContent() {
  content.showreelUrl = showreelInput.value.trim();
  setStatus("Saving...");
  const response = await fetch("/api/content", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token()}`
    },
    body: JSON.stringify(content)
  });
  const result = await response.json();
  if (!response.ok) {
    setStatus(result.error || "Save failed.");
    return;
  }
  content = result.content;
  renderWorks();
  setStatus("Saved.");
}

async function loadContacts() {
  contactList.innerHTML = "<p>Loading contacts...</p>";
  const response = await fetch("/api/contacts", {
    headers: { authorization: `Bearer ${token()}` },
    cache: "no-store"
  });
  const result = await response.json();
  if (!response.ok) {
    contactList.innerHTML = `<p>${result.error || "Cannot load contacts."}</p>`;
    return;
  }
  if (!result.contacts.length) {
    contactList.innerHTML = "<p>No inquiries yet.</p>";
    return;
  }
  contactList.innerHTML = result.contacts.map((item) => `
    <article>
      <strong>${item.name}</strong>
      <span>${new Date(item.createdAt).toLocaleString()}</span>
      <a href="mailto:${item.email}">${item.email}</a>
      <p>${item.phone || ""}</p>
      <p>${item.projectType || ""}</p>
      <p>${item.message || ""}</p>
    </article>
  `).join("");
}

loadButton.addEventListener("click", loadContent);
saveButton.addEventListener("click", saveContent);
refreshContactsButton.addEventListener("click", loadContacts);
addWorkButton.addEventListener("click", () => {
  content.works.push({ image: "assets/work-01.jpg", caption: "New Work", alt: "", wide: false });
  renderWorks();
});

showreelInput.addEventListener("input", () => {
  content.showreelUrl = showreelInput.value.trim();
});

renderWorks();
