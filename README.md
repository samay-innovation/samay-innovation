# Samay Innovation — Website Documentation

**Live site:** https://samayinnovation.com

Luxury interior design firm based in Ahmedabad, Gujarat. This repo is the full source code for the company website — portfolio showcase, blog, services, contact form, and client review system.

---

## 📋 Table of Contents

1. [Tech Stack](#-tech-stack)
2. [Live Deployment](#-live-deployment)
3. [Domain & DNS](#-domain--dns)
4. [Environment Variables](#-environment-variables)
5. [Local Development Setup](#-local-development-setup)
6. [Project Structure](#-project-structure)
7. [Pages & Routes](#-pages--routes)
8. [Client Review Flow](#-client-review-flow)
9. [Admin Dashboard](#-admin-dashboard)
10. [Supabase (Database)](#-supabase-database)
11. [EmailJS (Contact Form)](#-emailjs-contact-form)
12. [Adding & Updating Content](#-adding--updating-content)
13. [Image Hosting (Cloudinary)](#-image-hosting-cloudinary)
14. [SEO Management](#-seo-management)
15. [Build & Deploy](#-build--deploy)
16. [Useful Links](#-useful-links)

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 7 |
| Routing | React Router DOM v7 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion + GSAP |
| Smooth Scroll | Lenis |
| Carousel | Embla Carousel |
| Forms | React Hook Form + Zod |
| SEO | React Helmet Async |
| Database | Supabase (PostgreSQL) |
| Contact Form | EmailJS |
| Image CDN | Cloudinary |
| Icons | Lucide React |
| Image Lightbox | Yet Another React Lightbox |

---

## 🚀 Live Deployment

The site is deployed on **Vercel** and is connected to the GitHub `main` branch.

- **Every push to `main` automatically deploys** — no manual steps needed.
- Vercel handles SSL, CDN, and edge caching automatically.
- The custom domain `samayinnovation.com` is pointed at Vercel via DNS (see below).
- Security headers and cache rules are configured in [`vercel.json`](./vercel.json).

**To trigger a manual redeploy:** Push any commit to `main`, or go to the Vercel dashboard → Deployments → Redeploy.

---

## 🌐 Domain & DNS

| Item | Detail |
|------|--------|
| Domain | `samayinnovation.com` |
| Registrar | **BigRock** |
| Login Email | `samayinnovation@gmail.com` |
| Login Password | *(stored in password manager — do not commit to repo)* |

**BigRock Dashboard:** https://www.bigrock.in → Login → My Domains

### DNS Records (pointed to Vercel)

The nameservers or A/CNAME records in BigRock must point to Vercel's servers. These are configured in BigRock's DNS Management panel. If you ever need to update them, go to Vercel → Project Settings → Domains → and follow Vercel's DNS setup instructions.

> ⚠️ Do not change DNS settings unless you know what you're doing — incorrect DNS can take the site offline.

---

## 🔑 Environment Variables

Create a `.env` file in the project root (copy from `.env.example`):

```bash
cp .env.example .env
```

Then fill in the values:

```env
# ── EmailJS (Contact Form) ──────────────────────────────
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# ── Supabase (Reviews Database) ────────────────────────
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...

# ── Admin Dashboard ────────────────────────────────────
VITE_ADMIN_PASSWORD=your_chosen_password
```

| Variable | Purpose | Where to Find |
|----------|---------|---------------|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID | EmailJS dashboard → Email Services |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID | EmailJS dashboard → Email Templates |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key | EmailJS dashboard → Account → General |
| `VITE_SUPABASE_URL` | Supabase project URL | Supabase → Project Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Supabase → Project Settings → API |
| `VITE_ADMIN_PASSWORD` | Password to access `/samay-admin` | You set this yourself |

> These variables are also set in **Vercel → Project Settings → Environment Variables** for production.

---

## 💻 Local Development Setup

### Prerequisites
- Node.js 18+ (check with `node -v`)
- npm (comes with Node)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-org/samay-innovation-v2.git
cd samay-innovation-v2

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Then edit .env and fill in all the values (see section above)

# 4. Start the development server
npm run dev
```

The site will be available at **http://localhost:5173**

### Other Commands

```bash
npm run build     # Build for production (outputs to /dist)
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint code checks
```

---

## 📁 Project Structure

```
samay-innovation-v2/
├── public/
│   ├── logo/           # Logo SVG files
│   ├── assets/         # Static images (hero, etc.)
│   ├── sitemap.xml     # SEO sitemap
│   └── robots.txt      # SEO robots file
├── src/
│   ├── components/
│   │   ├── layout/     # Header, Footer, BottomNav
│   │   ├── sections/   # Page sections (Hero, Stats, Testimonials, etc.)
│   │   ├── ui/         # Reusable UI (Preloader, ScrollProgress, etc.)
│   │   └── seo/        # SEO component + JSON-LD schemas
│   ├── data/
│   │   ├── projects.ts         # All portfolio project data
│   │   ├── blogs.ts            # All blog post data
│   │   ├── services.ts         # Services page data
│   │   └── cloudinary-urls.json # All Cloudinary image URLs
│   ├── lib/
│   │   ├── constants.ts        # Site config, stats, awards, social links
│   │   └── supabase.ts         # Supabase client + Review type
│   ├── pages/          # One file per route (Home, About, Portfolio, etc.)
│   ├── App.tsx         # Router setup — all routes defined here
│   └── main.tsx        # App entry point
├── .env.example        # Template for environment variables
├── vercel.json         # Vercel deployment config (headers, caching, rewrites)
├── vite.config.ts      # Vite build config
└── package.json
```

---

## 🗺 Pages & Routes

| Route | Page | Has Header/Footer |
|-------|------|:-----------------:|
| `/` | Home | ✅ |
| `/about` | About | ✅ |
| `/portfolio` | Portfolio listing | ✅ |
| `/portfolio/:slug` | Project detail page | ✅ |
| `/services` | Services | ✅ |
| `/blogs` | Blog listing | ✅ |
| `/blogs/:slug` | Blog post detail | ✅ |
| `/contact` | Contact form | ✅ |
| `/client-review` | Client review submission | ❌ Standalone |
| `/samay-admin` | Admin dashboard | ❌ Standalone |

---

## ⭐ Client Review Flow

This is how a client submits a testimonial and it appears on the homepage.

### Step-by-step

```
1. Share the review link with the client:
   https://samayinnovation.com/client-review

2. Client fills the form:
   - Name (required)
   - Role / Designation (optional) — e.g. "Homeowner", "Business Owner"
   - Project / Property (optional) — e.g. "4BHK Villa, Bodakdev"
   - Star rating 1–5 (required)
   - Review text (required)
   - Email (optional — for follow-up)

3. Client submits → review is saved to Supabase with approved = false

4. Admin receives it in the dashboard at /samay-admin under "Pending Reviews"

5. Admin approves → review appears in the Testimonials section on the homepage

6. Admin rejects → review is deleted from the database
```

> The homepage Testimonials section always shows only **approved** reviews. If Supabase is unreachable, fallback testimonials are shown from the hardcoded list in `src/components/sections/Testimonials.tsx`.

---

## 🔐 Admin Dashboard

**URL:** https://samayinnovation.com/samay-admin

### How to Log In

1. Go to `/samay-admin`
2. Enter the admin password (set via `VITE_ADMIN_PASSWORD` environment variable in Vercel)
3. Click **Enter**

### How to Approve a Review

1. Log in to the admin dashboard
2. You will see the **Pending Reviews** tab by default
3. Each card shows: client name, star rating, review text, role, project, and submission date
4. Click **✓ Approve** to publish the review → it immediately appears on the homepage testimonials
5. Click **✗ Reject** to delete the review permanently

### How to Unpublish an Approved Review

1. Click the **Approved Reviews** tab
2. Find the review you want to remove
3. Click **Unpublish** → it moves back to Pending (you can then reject/delete it)

### Forgot Admin Password?

The password is stored in Vercel → Project Settings → Environment Variables as `VITE_ADMIN_PASSWORD`. Update it there and redeploy.

---

## 🗄 Supabase (Database)

Supabase is used exclusively for the **reviews system**.

### Accessing the Dashboard

1. Go to https://supabase.com and log in
2. Open the **Samay Innovation** project
3. Navigate to **Table Editor** → `reviews` table

### Reviews Table Schema

```sql
CREATE TABLE reviews (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text        NOT NULL,
  role        text,
  project     text,
  rating      integer     NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review      text        NOT NULL,
  email       text,
  approved    boolean     DEFAULT false,
  created_at  timestamptz DEFAULT now()
);
```

### Manually Approving a Review via Supabase

If needed, you can approve reviews directly in the Supabase dashboard:
1. Open the `reviews` table
2. Find the row
3. Set `approved = true`
4. Save

### API Keys

Found in **Supabase → Project Settings → API**:
- `Project URL` → `VITE_SUPABASE_URL`
- `anon / public` key → `VITE_SUPABASE_ANON_KEY`

---

## 📧 EmailJS (Contact Form)

EmailJS handles the contact form at `/contact` — no backend server needed.

When a visitor submits the contact form, EmailJS sends an email directly to the configured inbox.

### Accessing EmailJS

1. Go to https://emailjs.com and log in
2. Check **Email Services** for the connected Gmail/inbox
3. Check **Email Templates** to edit the email format visitors receive
4. **Account → General** has the Public Key

### Updating the Email Template

If you want to change the format of the email you receive from inquiries:
1. EmailJS Dashboard → Email Templates
2. Edit the template
3. No code changes needed — it updates automatically

---

## ✏️ Adding & Updating Content

### Portfolio Projects

File: `src/data/projects.ts`

Each project is an object in the `projects` array. Add a new object at the top of the array with these fields:

```ts
{
  id: 'unique-id',
  slug: 'url-friendly-name',          // used in /portfolio/:slug
  title: 'Project Name',
  category: 'residential',            // residential | commercial | hospitality | retail
  location: 'Ahmedabad',
  year: 2024,
  size: '2500 sq ft',
  description: 'Project description...',
  thumbnail: 'https://res.cloudinary.com/...',
  images: ['url1', 'url2', ...],
  tags: ['Tag1', 'Tag2'],
  region: 'india',                    // 'india' | 'international'
  country: 'India',                   // for international projects
  flag: '🇮🇳',                        // emoji flag for international
  challenges: 'Optional text...',
  solution: 'Optional text...',
}
```

### Blog Posts

File: `src/data/blogs.ts`

Same pattern — add a new object to the `blogs` array.

### Services

File: `src/data/services.ts`

Edit the array to add or update services shown on the `/services` page.

### Stats & Company Info

File: `src/lib/constants.ts`

Update `STATS` for the numbers shown on the homepage (200+ Projects, etc.) and `SITE_CONFIG` for phone, email, address, and social links.

---

## 🖼 Image Hosting (Cloudinary)

All project images are hosted on **Cloudinary** (two accounts for storage capacity).

- Account 1: `diojzujpv`
- Account 2: `dpv8br6pe`

All image URLs are centrally managed in `src/data/cloudinary-urls.json`.

### Adding New Images

1. Log in to the appropriate Cloudinary account
2. Upload the image
3. Copy the delivery URL (format: `https://res.cloudinary.com/{account}/image/upload/...`)
4. Add it to `cloudinary-urls.json` or directly in the project object in `projects.ts`

### Recommended Upload Settings

- Format: JPG or WebP
- Quality: 80–90%
- Max width: 2400px for hero images, 1200px for thumbnails

---

## 🔍 SEO Management

### Per-Page Meta Tags

Each page uses the `<SEO>` component (`src/components/seo/SEO.tsx`) which sets `<title>`, `<meta description>`, `<meta keywords>`, Open Graph tags, and JSON-LD structured data via React Helmet Async.

To update a page's SEO:
1. Open the page file (e.g. `src/pages/Home.tsx`)
2. Find the `<SEO ... />` component near the top
3. Update `title`, `description`, or `keywords` props

### Structured Data (Schema.org)

All JSON-LD schemas are in `src/components/seo/schemas.ts`:
- `localBusinessSchema` — company info, address, geo coordinates, reviews
- `projectSchema` — per-project structured data
- `breadcrumbSchema` — breadcrumb trails for all pages

### Company Info Used in SEO

Canonical address and contact info are in `src/lib/constants.ts` → `SITE_CONFIG`. Update it there and it propagates to schemas and footer automatically.

### Sitemap & Robots

- `public/sitemap.xml` — manually maintained; update when adding new pages/projects
- `public/robots.txt` — currently allows all crawlers

---

## 📦 Build & Deploy

### Production Build

```bash
npm run build
```

This runs TypeScript type checking (`tsc -b`) then Vite build. Output goes to `/dist`.

### Deploying

**Automatic:** Any push to the `main` branch on GitHub triggers a Vercel deployment automatically.

**Manual:** Go to Vercel dashboard → Samay Innovation project → Deployments → Redeploy.

### Vercel Config (`vercel.json`)

- All routes rewrite to `index.html` (SPA routing)
- `/assets/` and `/logo/` are cached for 1 year (immutable)
- `sitemap.xml` and `robots.txt` cached for 24 hours
- Security headers set on all responses

---

## 🔗 Useful Links

| Resource | URL | Login |
|----------|-----|-------|
| Live Website | https://samayinnovation.com | — |
| Vercel Dashboard | https://vercel.com/dashboard | GitHub account |
| Supabase Dashboard | https://supabase.com/dashboard | Project credentials |
| EmailJS Dashboard | https://emailjs.com | Account credentials |
| BigRock (Domain) | https://www.bigrock.in | samayinnovation@gmail.com |
| GitHub Repository | https://github.com | GitHub account |
| Cloudinary (Account 1) | https://cloudinary.com | Account credentials |
| Cloudinary (Account 2) | https://cloudinary.com | Account credentials |

> 🔒 **Security reminder:** Never commit passwords or API keys to this repository. All secrets must be stored in Vercel Environment Variables and in a password manager.

---

## 👤 Maintained By

**Samay Innovation** — Ahmedabad, Gujarat, India
📞 (+91) 989 852 4366
📧 info@samayinnovation.com
🌐 https://samayinnovation.com
