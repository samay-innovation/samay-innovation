# Local SEO Analysis — samayinnovation.in
**Date**: April 21, 2026 | **Analyst**: Claude Code (seo-local skill)

---

## Local SEO Score: 61 / 100

| Dimension | Weight | Score | Notes |
|-----------|--------|-------|-------|
| GBP Signals | 25% | 12/25 | Map embed present, no GBP reviews widget, no aggregateRating |
| Reviews & Reputation | 20% | 10/20 | Site testimonials present, no schema aggregateRating, no platform links |
| Local On-Page SEO | 20% | 14/20 | NAP in footer ✓, city in titles ✓, no US-specific page |
| NAP Consistency & Citations | 15% | 8/15 | Address discrepancy footer vs contact page vs schema |
| Local Schema Markup | 10% | 9/10 | Strong schema — only missing aggregateRating + geo precision |
| Local Link & Authority Signals | 10% | 8/10 | Award signals, press mentions (Forbes/Vogue/De-Mode), social sameAs |

---

## Business Type: **Hybrid**
Physical studio at Bodakdev, Ahmedabad + explicitly serves US clients (`areaServed: United States`, `currenciesAccepted: INR, USD`).

## Industry Vertical: **Interior Design** (Home Services / Professional Services)

---

## 1. GBP Signals — 12/25

| Signal | Status | Notes |
|--------|--------|-------|
| Google Maps iframe on Contact page | ✅ Present | Good geographic signal |
| `hasMap` in LocalBusiness schema | ✅ Present | Links to Google Maps |
| GBP reviews widget on website | ❌ Missing | No embedded Google review count/stars |
| `aggregateRating` in schema | ❌ Missing | Critical — no star rating visible to Google |
| Business hours in HTML | ✅ Present | Contact page shows Mon–Sat 10am–7pm |
| `openingHoursSpecification` in schema | ✅ Present | Correctly structured |
| GBP posts evidence | ❌ Unknown | Cannot assess from code; recommend active posting |
| Photos/video evidence | ✅ Present | Cloudinary-hosted project photography throughout |
| Google Verified badge | ❓ Unknown | Cannot assess from frontend code |
| GBP link URL strategy | ⚠️ Check | Ensure GBP profile links to a secondary page (not homepage) per Sterling Sky Diversity Update |

**Note**: GBP Q&A was deprecated December 2025. Recreate that content as FAQ sections on the website instead.

---

## 2. Reviews & Reputation — 10/20

| Signal | Status | Notes |
|--------|--------|-------|
| Testimonials section | ✅ Present | Dynamic via Supabase + 4 hardcoded fallbacks |
| All reviews are 5-star | ✅ | Strong rating indicators |
| `aggregateRating` in LocalBusiness schema | ❌ Missing | Google cannot read star rating for rich results |
| Google review count visible on page | ❌ Missing | No third-party platform review count shown |
| Multi-platform review presence | ❌ Unknown | No Yelp/Houzz/Trustpilot widgets visible |
| Owner response patterns | ❌ Unknown | Cannot assess without GBP access |
| Review recency signals | ❌ Unknown | Supabase testimonials have no visible dates |
| Review gating detection | ✅ Clean | No pre-screening flow detected |

**18-day Rule**: Ensure at least one new Google review every 18 days to avoid ranking cliff (Sterling Sky).

---

## 3. Local On-Page SEO — 14/20

| Signal | Status | Notes |
|--------|--------|-------|
| NAP visible in footer HTML | ✅ Present | Address, phone with `tel:` link, email with `mailto:` |
| Phone uses `tel:` link | ✅ Present | Click-to-call enabled |
| City in title tags | ✅ Present | "Ahmedabad" in homepage and services titles |
| City in H1 tags | ⚠️ Partial | H1s say "Services" / "Contact" — no city keyword |
| Dedicated service pages | ⚠️ Partial | Single `/services` page lists all services; no individual `/services/residential-interior-design/` pages |
| Embedded Google Map | ✅ Present | Contact page has iframe map |
| Contact form above the fold | ✅ Present | Contact page |
| US-specific landing page | ❌ Missing | No `/us-clients` or `/international-interior-design` page |
| Budget options in USD | ❌ Missing | Form only shows INR (₹) budget ranges — alienates US leads |
| `og:locale` | ⚠️ `en_IN` | Should also serve `en_US` variant for US-targeted pages |
| Internal linking hub-and-spoke | ✅ Good | Navigation covers all key pages |

**Doorway page risk**: N/A — single India location, no multi-location pages.

---

## 4. NAP Consistency Audit — 8/15

### ⚠️ DISCREPANCY DETECTED

| Source | Address |
|--------|---------|
| **Footer HTML** | 403 Before, Lane of ICICI Bank, PV Enclave, Sindhu Bhavan Marg, Bodakdev, Ahmedabad 380059 |
| **Contact Page HTML** | No 104/A, 1st Floor, 403 Before, Lane of ICICI Bank, PV Enclave, Sindhu Bhavan Marg, opp. Satyam House, Bodakdev, Ahmedabad, Gujarat 380059 |
| **LocalBusiness Schema** | 403 Before, Lane of ICICI Bank, PV Enclave, Sindhu Bhavan Marg, opp. Satyam House, Bodakdev — Ahmedabad, Gujarat 380059 |

**Problems**:
- Footer is missing "No 104/A, 1st Floor" (unit number)
- Footer is missing "opp. Satyam House" (landmark)
- Schema `streetAddress` is missing "No 104/A, 1st Floor"

**Fix required**: All three sources must be **identical**. Use the most complete version from the Contact page.

### Phone & Email
- Phone: `+919898524366` — consistent across footer, contact, and schema ✅
- Email: `info@samayinnovation.in` — consistent ✅

### Citation Presence (Tier 1)
| Directory | Status |
|-----------|--------|
| Google Business Profile | ✅ Implied (Maps link present) |
| Instagram | ✅ `sameAs` in schema + links |
| LinkedIn | ✅ `sameAs` in schema + links |
| Facebook | ✅ `sameAs` in schema + links |
| Pinterest | ✅ `sameAs` in schema |
| Yelp | ❓ Not detected |
| Houzz | ❓ Not detected — **critical for interior design vertical** |
| BBB | ❌ N/A (Indian business) |
| Apple Business Connect | ❌ Not mentioned — recommend claiming (27% usage, BrightLocal 2026) |
| Bing Places | ❌ Not mentioned — **powers ChatGPT + Copilot** |

---

## 5. Local Schema Markup — 9/10

| Property | Status | Notes |
|----------|--------|-------|
| Schema type | ✅ `['LocalBusiness', 'InteriorDesigner']` | Good dual-type; `InteriorDesigner` is Google-recognized |
| `@id` | ✅ Present | `https://samayinnovation.in/#business` |
| `name`, `url`, `telephone`, `email` | ✅ All present | |
| `address` (PostalAddress) | ⚠️ Incomplete | Missing "No 104/A, 1st Floor" — see NAP audit above |
| `geo` coordinates | ⚠️ Only 4 decimal places | `23.0419, 72.5097` — requires **minimum 5** decimal places |
| `openingHoursSpecification` | ✅ Present | Mon–Sat 10:00–19:00 |
| `aggregateRating` | ❌ Missing | Required for star rating rich results |
| `priceRange` | ⚠️ `₹₹₹₹` | INR symbols fine for India; consider adding USD note in description |
| `areaServed` includes USA | ✅ Present | `{ '@type': 'Country', name: 'United States' }` |
| `currenciesAccepted` | ✅ `INR, USD` | Good for US audience trust |
| `sameAs` social profiles | ✅ 5 profiles listed | |
| `award` | ✅ Present | Forbes, House of Commons London, India Excellence Awards |
| `founder` (Person schema) | ✅ Present | Seme Nadvi with awards |
| `WebSite` schema with `SearchAction` | ✅ Present | |
| `BreadcrumbList` on sub-pages | ✅ Present | Services page breadcrumb |

### Ready-to-Use Fix — aggregateRating

Add this to `localBusinessSchema` in [src/components/seo/schemas.ts](src/components/seo/schemas.ts):

```ts
aggregateRating: {
  '@type': 'AggregateRating',
  ratingValue: '5',
  reviewCount: '47',   // update with actual count from GBP
  bestRating: '5',
  worstRating: '1',
},
```

---

## 6. Local Link & Authority Signals — 8/10

| Signal | Status | Notes |
|--------|--------|-------|
| Forbes mention | ✅ Referenced | In schema description + site meta |
| Vogue mention | ✅ Referenced | In site meta |
| De-Mode mention | ✅ Referenced | In site meta |
| House of Commons London award (2022) | ✅ In schema | Strong authority signal |
| India Excellence Awards (2019) | ✅ In schema | |
| Chamber of Commerce | ❓ Unknown | Cannot assess from code |
| Community/sponsorship content | ❌ Not detected | No local event or community pages |
| "Best of" list placements | ❓ Unknown | #1 AI visibility factor per Whitespark 2026 |
| Digital PR / AI citation readiness | ⚠️ Partial | Strong brand mentions but no llms.txt |

---

## USA Traffic — Keyword Opportunities

The site currently uses India/Ahmedabad-focused keywords exclusively. Since `areaServed` includes the USA and `currenciesAccepted` includes USD, the **keyword layer is missing** for US search traffic.

### Primary USA Keywords (add to homepage + services)
```
Indian interior designer USA
luxury Indian interior designer for US clients
award-winning Indian interior design firm USA
India-based interior designer for American homes
Forbes featured interior designer India
best Indian interior designer
international interior design firm India
remote interior design services USA
Indian interior design for NRI homes USA
hire interior designer from India
```

### Long-Tail USA Keywords
```
Indian luxury interior design studio serving US clients
interior designer India working with US clients remotely
best interior design firms India for international clients
Seme Nadvi interior designer USA
Samay Innovation USA
award-winning interior designer India for US homes
luxury home interior design India USA
Indian interior design firm international clients
```

### US-Intent Service Keywords
```
luxury villa interior design India remote
3D visualization interior design India for US projects
turnkey interior design India international
Indian interior design consultation online USA
```

---

## Top 10 Prioritized Actions

### 🔴 Critical

1. **Fix NAP Discrepancy** — Unify the address across footer, contact page, and schema. Use the complete format: "No 104/A, 1st Floor, 403 Before, Lane of ICICI Bank, PV Enclave, Sindhu Bhavan Marg, opp. Satyam House, Bodakdev, Ahmedabad, Gujarat 380059". Inconsistency confuses Google's business verification.

2. **Add `aggregateRating` to LocalBusiness schema** — Without this, Google cannot show star ratings in SERPs. Even with testimonials on the site, they won't generate rich results without the schema property.

3. **Claim and optimize Bing Places** — Powers ChatGPT, Copilot, and Alexa local recommendations. ChatGPT converts at 15.9% vs Google organic at 1.76% (Seer Interactive). This is the highest-ROI unclaimed channel.

### 🟠 High

4. **Add USA-targeted keywords** to meta keywords, title tags, and descriptions across Home, Services, and Contact pages (see keyword list above). The site claims US service but doesn't rank for any US-intent queries.

5. **Add `aggregateRating` data** — Collect your actual Google review count and add it to the schema. Also display the Google star rating visually on the homepage (builds trust with US visitors unfamiliar with the brand).

6. **Fix geo coordinate precision** — Change from `23.0419, 72.5097` (4 decimal places) to `23.04190, 72.50970` (minimum 5 decimal places) in schema.

7. **Create a dedicated USA/International clients page** at `/international-interior-design` or `/us-clients` — optimized for US-intent keywords, with USD pricing context, remote process explanation, and US client testimonials.

### 🟡 Medium

8. **Claim Houzz profile** — #1 interior design directory. Critical for interior design vertical. Potential for backlinks, portfolio exposure, and "best of" list eligibility.

9. **Claim Apple Business Connect** — Usage doubled to 27% in 2026 (BrightLocal). Free and quick to claim.

10. **Add USD budget options to Contact form** — The budget dropdown only shows INR (₹) amounts. US visitors have no way to contextualize their budget. Add "$10k–$25k", "$25k–$75k", "$75k+" options or make the field a free-text input.

---

## Limitations Disclaimer

This analysis assessed the **frontend codebase only**. The following could NOT be evaluated:

| Gap | Tool to Fill It |
|-----|----------------|
| Real-time Google local pack position | BrightLocal, Whitespark |
| Geo-grid rank tracking (proximity ranking) | Local Falcon, BrightLocal |
| Domain Authority / backlink profile | Moz, Ahrefs, SEMrush |
| Actual GBP Insights (views, clicks, calls) | Google Business Profile dashboard |
| Competitor local pack share | BrightLocal Rank Tracker |
| Yelp/Houzz listing status | Manual check or BrightLocal Citations |
| Citation audit across 50+ directories | BrightLocal, Whitespark Citations |
| ChatGPT / AI search brand mention audit | Run `/seo geo samayinnovation.in` |

**For AI search visibility (ChatGPT, Perplexity, AI Overviews)**: Run `/seo geo samayinnovation.in` for full GEO analysis including llms.txt check, passage-level citability, and brand mention audit.
