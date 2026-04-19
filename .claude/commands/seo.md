Perform a thorough SEO audit of this Next.js project.

If a specific file path is provided as an argument ($ARGUMENTS), audit only that file. Otherwise, audit all page and layout components under `src/app/` and `src/pages/` (if they exist).

For each file audited, check:

1. **Title** — Is there a `metadata` export with a `title` field? Is it descriptive and under 60 characters?
2. **Meta description** — Is there a `description` in `metadata`? Is it between 120–160 characters?
3. **Open Graph tags** — Are `og:title`, `og:description`, and `og:image` defined in `metadata.openGraph`?
4. **Canonical URL** — Is there a `alternates.canonical` or equivalent set?
5. **H1 heading** — Is there exactly one `<h1>` per page?
6. **Image alt text** — Do all `<img>` tags and Next.js `<Image>` components have non-empty `alt` props?
7. **Structured data** — Is there any JSON-LD schema markup for rich results?
8. **robots / noindex** — Are any pages accidentally set to `noindex`?

After the audit, output a summary table:

| File | Missing / Issues |
|------|-----------------|
| ...  | ...             |

Then list actionable fixes for each issue found. If everything looks good, say so.
