# Cloudflare Pages Setup

## Deploy

Upload or connect this folder as the Cloudflare Pages project root:

```text
outputs/hamburger-film
```

No build command is required.

## KV bindings

Create two KV namespaces and bind them to the Pages project:

```text
HP_CONTENT
HP_CONTACTS
```

`HP_CONTENT` stores showreel and work-gallery edits.
`HP_CONTACTS` stores submitted inquiries.

## Environment variables

Add:

```text
ADMIN_TOKEN=your-private-admin-password
CONTACT_FROM=noreply@your-verified-domain.com
```

Use `ADMIN_TOKEN` when opening `/admin.html`.

## Email sending

To send inquiry emails, configure Cloudflare Email Service / send_email binding:

```text
Binding name: EMAIL
Recipients: cooltankis007@gmail.com, chowonjang@gmail.com
```

The sender in `CONTACT_FROM` must be a verified sending address/domain in Cloudflare.

If the email binding is not configured, inquiries are still stored in `HP_CONTACTS`, and the local/static fallback opens the visitor's email app.

## Admin URL

```text
/admin.html
```

Admin can:

- Change showreel URL
- Add/remove/edit work-gallery items
- Read submitted inquiries
