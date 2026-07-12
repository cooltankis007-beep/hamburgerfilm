# Netlify Setup

## GitHub upload

Upload the contents of this folder as the repository root:

```text
outputs/hamburger-film
```

## Netlify build settings

Netlify will read `netlify.toml`.

Use:

```text
Build command: leave empty
Publish directory: .
Functions directory: netlify/functions
```

## Environment variables

Add these in Netlify:

```text
ADMIN_TOKEN=your-private-admin-password
```

Optional email sending with Resend:

```text
RESEND_API_KEY=your-resend-api-key
FROM_EMAIL=Hamburger Pictures <noreply@your-verified-domain.com>
```

Inquiries are sent to:

```text
cooltankis007@gmail.com
chowonjang@gmail.com
```

If Resend is not configured, inquiries are still stored in Netlify Blobs and can be checked in `/admin.html`.

## Admin

Open:

```text
/admin.html
```

Use the value of `ADMIN_TOKEN`.
