# Iskupljen — Coming Soon

Next.js 16 coming soon page with email subscription via Resend. The site collects emails for launch notifications and immediately sends:

1. A **notification mail** to the team for each new sign-up.
2. A branded **welcome mail** to the subscriber as confirmation.
3. The contact is added to the default Resend Audience for later broadcast.

All user-facing copy is in **Serbian Cyrillic**. Codebase, comments, and docs are in **English**.

## Stack

- **Next.js 16** (App Router, Turbopack), **React 19**
- **Tailwind CSS v4** — CSS-first `@theme` config in `globals.css`, no `tailwind.config.ts`
- **TypeScript 5.9**
- **Sofia Sans Variable** font via `next/font/local`
- **react-hook-form** + **zod** for form validation
- **Resend 6** + **@react-email/components** for transactional email
- **SVGR** (`@svgr/webpack`) wired through Turbopack rules for inline SVG components
- **@vercel/analytics**

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx              # Root layout, font + analytics + OG metadata
│  ├─ page.tsx                # Coming soon page (responsive: mobile <xl, desktop ≥xl)
│  ├─ globals.css             # Tailwind v4 @theme + autofill override
│  └─ api/subscribe/route.ts  # POST endpoint that sends mails + adds Audience contact
├─ components/
│  └─ SubscribeForm.tsx       # Email input + parallelogram button (client component)
├─ icons/                     # SVG sources, imported as React components via SVGR
├─ lib/schemas.ts             # Zod schema shared by client form and server route
└─ fonts/sofia-sans/          # Sofia Sans Variable TTF
emails/
├─ subscription.tsx           # Notification mail template (to the team)
└─ welcome.tsx                # Confirmation mail template (to the subscriber)
public/
├─ images/                    # WebP hero/card images (desktop + mobile variants)
├─ icons/                     # SVG copies for direct fetch if needed
├─ logo.svg                   # Horizontal brand mark
├─ logo-vertical.svg          # Vertical brand mark (mobile header)
├─ iskupljen.png             # Open Graph / social preview image
└─ favicon.svg
```

## Local development

```bash
pnpm install
cp .env.example .env.local
# fill in RESEND_API_KEY
pnpm dev
```

Open http://localhost:3000.

### API smoke test

```bash
curl -X POST http://localhost:3000/api/subscribe \
    -H 'Content-Type: application/json' \
    -d '{"email":"test@example.com"}'
```

> ⚠️ This hits the real Resend API if `RESEND_API_KEY` is set. It will send real mail to recipients in `SUBSCRIBE_TO_EMAILS` and to the test email. Use a sandbox address.

### Email template preview

```bash
pnpm email
```

Starts the React Email dev server (usually on `localhost:3001`) with both templates:

- `subscription.tsx` — team notification with the new subscriber's address
- `welcome.tsx` — branded confirmation to the subscriber

If logos look broken in the preview, also run `pnpm dev` so the email fetches `localhost:3000/logo.svg`.

## Scripts

| Command      | What it does                                          |
| ------------ | ----------------------------------------------------- |
| `pnpm dev`   | Next dev server on `:3000`                            |
| `pnpm build` | Production build + type check                         |
| `pnpm start` | Run production build                                  |
| `pnpm lint`  | ESLint (flat config, Next.js + TypeScript rules)      |
| `pnpm email` | React Email preview server for templates in `/emails` |

## Environment variables

| Name                   | Required | Description                                                                                                                                  |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`       | Yes      | API key from the Resend dashboard. Without it, the API route returns 500.                                                                    |
| `SUBSCRIBE_TO_EMAILS`  | No       | Comma-separated recipient list for notification mail. Empty falls back to `shop@iskupljen.com,gagiac@gmail.com`.                             |
| `NEXT_PUBLIC_BASE_URL` | Yes      | Public site URL. Used for OG metadata canonical URLs and as `<Img>` base in email templates. Defaults to `https://iskupljen.com` if not set. |

`.env.local` is git-ignored; commit only `.env.example`.

## Resend setup (required before go-live)

The `from:` address must live on a **verified domain** in Resend. We send from `noreply@shop.iskupljen.com` (subdomain — recommended practice so a deliverability issue on the sending subdomain doesn't poison the root `iskupljen.com` domain).

1. In the [Resend dashboard](https://resend.com/domains), add the domain `shop.iskupljen.com`.
2. Add the DNS records (SPF, DKIM, optional DMARC) shown by Resend at your registrar (currently Namecheap).
3. Wait for the **Verified** status (typically 5–30 min, sometimes up to a few hours).

Until the domain is verified, Resend will reject every send in production.

Every successful subscription is automatically added to the default Resend **Audience**. You can see all subscribers in the Resend dashboard under **Audience → Contacts**, and use that list later to send a launch broadcast.

## Vercel deploy

1. Push to GitHub (this repo).
2. Import the repo into Vercel.
3. In **Project Settings → Environment Variables**, set:
    - `RESEND_API_KEY`
    - `SUBSCRIBE_TO_EMAILS` (e.g. `shop@iskupljen.com,gagiac@gmail.com`)
    - `NEXT_PUBLIC_BASE_URL` (e.g. `https://iskupljen.com`)
4. In **Project Settings → Domains**, add `iskupljen.com` and set the DNS A/CNAME records Vercel shows.
5. In **Project Settings → Analytics**, enable Vercel Analytics (free for hobby).

### Later: when Hostinger forwarding is active

Right now the notification mail is delivered to both `shop@iskupljen.com` and `gagiac@gmail.com` in parallel, because the `shop@` mailbox does not yet exist and `gagiac@gmail.com` is the working backup.

When you set up Hostinger forwarding (`shop@iskupljen.com` → `gagiac@gmail.com`):

1. Vercel → Environment Variables → `SUBSCRIBE_TO_EMAILS` → drop `,gagiac@gmail.com`, keep `shop@iskupljen.com`.
2. **Redeploy** (Vercel → Deployments → "…" → Redeploy).
3. Done. No code change, no git push.

## Form behavior

- **Layout**: stacked input + button below `xl` breakpoint (1280px); parallelogram button inset inside the input above `xl`.
- **Validation**: zod schema (`src/lib/schemas.ts`) is the single source of truth, used by both the client form and the API route.
- **Anti-spam**: a hidden honeypot input (`_website`). Bots fill it, the server returns 200 OK without sending mail.
- **Cyrillic placeholder/buttons/messages** — the entire UI is in Serbian Cyrillic.
- **Chrome autofill** is overridden in `globals.css` so the input keeps its glassy black background.

## OG / social preview

`public/iskupljen.png` (2400×1280, ~1.875:1) is used as the Open Graph and Twitter card image. After deploy, test the preview with:

- Facebook Sharing Debugger — <https://developers.facebook.com/tools/debug/>
- Twitter Card Validator — <https://cards-dev.twitter.com/validator>
- LinkedIn Post Inspector — <https://www.linkedin.com/post-inspector/>
- Telegram / WhatsApp — paste the link to yourself and check the preview

## What is intentionally NOT included

- No Facebook Pixel or GTM
- No axios / react-query / framer-motion
- No KV-store rate limiting (honeypot only)
- No GDPR checkbox (small disclaimer text under the form is the only consent UX)
- No i18n routing (Serbian Cyrillic only)
- No `output: 'standalone'` (Vercel doesn't need it)
