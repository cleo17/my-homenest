# HomeNest Marketplace — Phase 1

> **Status:** Phase 1 — Frontend-only, mock data, no external API keys required.  
> **Next:** Phase 2 adds Vercel deployment, real backend, Stripe payments, and Google Maps.

---

## What's included in Phase 1

| Feature | Status |
|---|---|
| Homepage (hero, listings, categories, how it works, pricing, testimonials) | ✅ |
| Browse & filter listings | ✅ |
| Listing detail with inquiry form | ✅ |
| Login / Register (mock auth via cookies) | ✅ |
| Landlord dashboard (listings, inquiries, payments) | ✅ |
| Post a listing (3-step form, plan selection) | ✅ |
| Static location display (no Google Maps key needed) | ✅ |
| Plan selection UI (no Stripe key needed) | ✅ |
| All data from `mockData.ts` — no backend required | ✅ |

---

## Quick Start (Local)

### Prerequisites
- **Node.js 18+** — download at https://nodejs.org  
- **npm** (comes with Node) or **yarn**

### Steps

```bash
# 1. Clone or download this repo
git clone https://github.com/YOUR_USERNAME/homenest.git
cd homenest/frontend

# 2. Install dependencies (takes ~1 minute)
npm install

# 3. Start the development server
npm run dev

# 4. Open your browser
# → http://localhost:3000
```

That's it. No `.env` file, no API keys, no database needed.

---

## Demo Login

In mock mode, **any email/password works**.  
To get a landlord dashboard, use an email containing the word `landlord`:

| Role | Email | Password |
|---|---|---|
| Tenant | `tenant@example.com` | anything |
| Landlord | `landlord@example.com` | anything |

---

## Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Homepage
│   │   ├── listings/           # Browse + detail pages
│   │   ├── auth/               # Login & Register
│   │   ├── dashboard/          # Landlord/Tenant dashboard
│   │   └── list-property/      # Post a listing
│   ├── components/
│   │   ├── layout/             # Navbar, Footer
│   │   └── home/               # Hero, Featured, Stats, etc.
│   ├── lib/
│   │   ├── api.ts              # API layer (USE_MOCK = true)
│   │   └── mockData.ts         # All demo data
│   ├── context/
│   │   └── AuthContext.tsx     # Auth state (cookie-based in mock mode)
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   └── styles/
│       └── globals.css         # Tailwind + custom CSS
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## Pushing to GitHub

### First time setup

```bash
# Inside the homenest-phase1 folder (parent of frontend/)
git init
git add .
git commit -m "feat: Phase 1 - HomeNest frontend with mock data"

# Create a repo on GitHub (github.com → New repository → name: homenest)
# Then:
git remote add origin https://github.com/YOUR_USERNAME/homenest.git
git branch -M main
git push -u origin main
```

### Subsequent updates

```bash
git add .
git commit -m "your change description"
git push
```

---

## Sharing with teammates (GitHub)

Once pushed, teammates can run the site with:

```bash
git clone https://github.com/YOUR_USERNAME/homenest.git
cd homenest/frontend
npm install
npm run dev
```

---

## Switching off mock mode (Phase 2 prep)

When you're ready to connect a real backend, open `src/lib/api.ts` and change:

```ts
export const USE_MOCK = true   // ← change to false
```

Then set up `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## Phase 2 Roadmap

- [ ] Deploy frontend to **Vercel** (zero config with Next.js)
- [ ] Deploy backend to **Railway** or **Render**
- [ ] Connect **PostgreSQL** via Prisma
- [ ] Add **Stripe** payment integration (listing plans)
- [ ] Add **Google Maps** for property location
- [ ] Add **AWS S3** for image uploads
- [ ] Email notifications via **Resend** or **SendGrid**

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS 3 |
| Language | TypeScript |
| State | React Context + Hooks |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Notifications | React Hot Toast |
| Auth (Phase 1) | Cookie-based mock |
| Auth (Phase 2) | JWT + Express |

---

## Colour Palette

| Name | Hex | Usage |
|---|---|---|
| Navy | `#0B1F3A` | Primary text, navbar, buttons |
| Gold | `#C9973A` | Accents, CTAs, highlights |
| Cream | `#FAF7F2` | Page background |
| Stone | `#E8E2D9` | Borders, dividers |
