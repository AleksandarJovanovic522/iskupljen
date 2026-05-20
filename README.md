# Iskupljen — Coming Soon

Next.js 16 coming-soon stranica sa email prijavom preko Resend-a.

## Stack

- Next.js 16 + React 19 (App Router, Turbopack default)
- Tailwind CSS v4 (CSS-based `@theme` config)
- TypeScript 5.9
- react-hook-form + zod
- Resend 6 + @react-email/components
- @vercel/analytics

## Lokalno pokretanje

```bash
pnpm install
cp .env.example .env.local
# popuni RESEND_API_KEY u .env.local
pnpm dev
```

Otvori http://localhost:3000.

### Smoke test API rute

```bash
curl -X POST http://localhost:3000/api/subscribe \
    -H 'Content-Type: application/json' \
    -d '{"email":"test@example.com"}'
```

### Preview email template-a

```bash
pnpm email
```

Otvara React Email dev server koji prikazuje oba template-a:
- `subscription.tsx` — notifikacioni mail koji stiže tebi sa svakom prijavom
- `welcome.tsx` — welcome mail koji stiže korisniku kao potvrda prijave (kratko sada, brendiraće se kasnije sa coming-soon dizajnom)

## Env vars

| Ime | Obavezno | Opis |
|---|---|---|
| `RESEND_API_KEY` | Da | API ključ iz Resend dashboard-a |
| `SUBSCRIBE_TO_EMAILS` | Ne | Comma-separated lista recipient-a. Prazno → fallback `shop@iskupljen.com,gagiac@gmail.com` |
| `NEXT_PUBLIC_BASE_URL` | Da | Base URL aplikacije (npr. http://localhost:3000) |

## Resend setup (kritično pre live-a)

`from:` adresa mora biti na verifikovanom domenu u Resend-u. Trenutno koristimo `noreply@shop.iskupljen.com` (subdomen — preporučena praksa).

1. U [Resend dashboard-u](https://resend.com/domains) dodaj domen `shop.iskupljen.com`
2. Dodaj DNS rekorde (SPF, DKIM, opciono DMARC) kod registrar-a — Resend pokaže tačne vrednosti
3. Sačekaj "Verified" status (5–30 min)

Bez koraka 1–3, Resend će odbijati slanje mail-ova u produkciji.

Svaka prijava se automatski čuva u tvojoj default Resend Audience listi — vidiš sve u Resend dashboard → Audience tab.

## Vercel deploy

1. Push na GitHub
2. Import repo u Vercel
3. U Vercel project settings → Environment Variables postavi: `RESEND_API_KEY`, `SUBSCRIBE_TO_EMAILS`, `NEXT_PUBLIC_BASE_URL` (npr. `https://iskupljen.com`)
4. Vercel project settings → Domains: dodaj `iskupljen.com`, podesi DNS A/CNAME rekorde
5. Vercel project settings → Analytics: uključi (besplatno)

### Kasnije: kad Hostinger forwarding bude aktivan

Trenutno mail-ovi idu na `shop@iskupljen.com` + `gagiac@gmail.com` paralelno (mailbox `shop@` još ne postoji, pa `gagiac@gmail.com` služi kao backup).

Kad podesiš Hostinger forwarding `shop@iskupljen.com` → `gagiac@gmail.com`:
1. Vercel → Environment Variables → `SUBSCRIBE_TO_EMAILS` → ukloni `,gagiac@gmail.com`, ostavi samo `shop@iskupljen.com`
2. Redeploy (Vercel → Deployments → "..." → Redeploy)
3. Gotovo — bez code change-a, bez git push-a

## Šta nije uključeno

- Bez FB Pixel-a / GTM-a
- Bez axios-a / react-query-ja / framer-motion-a
- Bez rate-limit KV store-a (samo honeypot polje protiv botova)
- Bez GDPR checkbox-a (samo sitan tekst ispod input-a)
- Bez i18n routing-a (samo srpski)
