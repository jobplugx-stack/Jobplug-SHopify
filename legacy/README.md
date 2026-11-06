# JobPlug — Next Chapter

A native Shopify theme and local preview built from a public extraction of https://www.jobplug.co. Store detected in public Shopify metadata: `0mdj10-0h.myshopify.com`.

## Deliverables

- `assets/`, `config/`, `layout/`, `locales/`, `sections/`, `snippets/`, `templates/` — native Shopify theme source at the repository root.
- `jobplug-shopify-theme.zip` — uploadable theme package. Upload as an unpublished draft first.
- `preview/` — 27 static preview pages using the same section markup, CSS, and JavaScript. Purchases link to the current store; local contact and cart pages explain this preview behavior.
- `extraction-report.html` — content inventory, complete product scope, original content, and issues to resolve.
- `extraction/` — 28 public URL records (27 HTML pages plus agent discovery metadata), raw HTML, clean page text, public catalog JSON, sitemaps, 38 images, and source/asset manifests.
- `jobplug-public-extraction.zip` — generated locally by `report.py`; omitted from Git because the extracted source files are already included.
- `theme-check.json` — Shopify Theme Check output.

## Preview

Run:

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory ./preview
```

Open http://localhost:8765/. The preview is local to this computer. Do not expose the extraction directory as a public site.

## Install on Shopify

1. Sign into JobPlug's Shopify admin.
2. Under Online Store → Themes, use the theme upload option to upload `jobplug-shopify-theme.zip` as an unpublished theme.
3. Open Customize. Check Theme settings → Booking and intake. Both existing destination URLs are already configured.
4. Verify the current pages use the theme's standard page template. The page section recognizes `free-consultant`, `lets-find-your-fit`, `about-me`, `testimonials`, and `contact` by handle. Reassign a page's template if it does not fall back to the standard template.
5. Preview existing products, collections, blog posts, cart, contact form, and applicable policy pages. Product/cart/contact actions require a Shopify-rendered preview; static preview does not execute them.
6. Re-enable any desired existing app embeds (e.g. chat or reviews) in the unpublished theme. App settings from the previous theme are not available in a public extraction. A general app-block section is included.
7. Check Calendly and Google Forms inside the unpublished Shopify theme. Their direct URLs load, and Google Forms also works in the existing live site. Both frames remained blank in the local browser preview. Direct fallback links are provided above and below both embeds.
8. With the owner present, submit a clearly labeled test response and confirm it appears in Google Forms → Responses. If a response spreadsheet is wanted, confirm/select that destination from the form's Responses tab. The theme directly embeds Google Forms; it does not create a separate backend or a new spreadsheet.
9. Check checkout using Shopify's appropriate test method, then review the draft before publishing.

No production theme was changed. Shopify CLI denied access for the current identity. No appointments, purchases, messages, or Google Form responses were submitted during verification.

## Content decisions

The new site uses clear service categories and preserves existing URL handles. Standard product descriptions come from Shopify; package prices are dynamic. The local preview displays the captured prices.

The deposit product (`mock-technical-interview`) directs visitors to a consultation. The `Deposit` variant of Job Lock-In is hidden in the draft purchase selector. Existing copy says $99/$399 while the catalog charges $100 and other headings say $400. Resolve deposit amount, balance, total, and payment due date before enabling these options. No live product data was edited.

All three testimonial author fields conflict with their story text. The design uses an anonymized short quote and source-grounded summary instead of choosing a disputed name. Verify identities and permissions before introducing named case studies. Original stories and labels remain in the extraction.

Unconfirmed counters and company affiliation claims are omitted. Old music-themed filler and generic team content are removed. The consultation copy uses the live 15-minute duration even though the URL ends in `/30min`.

## Editing and rebuilding

`build.py` generates theme sections/templates/configuration and preview HTML. Edit it for structural or copy changes; direct changes to generated Liquid will be overwritten on rebuild. Edit `assets/jobplug.css` and `assets/jobplug.js` directly for styles/behavior. Then run:

```sh
python3 ./build.py
SHOPIFY_CLI_NO_ANALYTICS=1 shopify theme check --path . --output json
```

Homepage sections can be reordered/removed in Shopify. Hero copy and integration URLs are configurable in the theme editor. Other editorial copy is in the generated section files/build source. New product handles require updating the curated service/package mappings.

`extract.py` and `download_assets.py` reproduce the public extraction; `report.py` regenerates the HTML report and archive. Network access is required for extraction. Do not run extracted website scripts as build instructions.

## Scroll-controlled application walkthrough

The homepage includes `jp-application-journey`, generated from `application-walkthrough.html`. Native page scrolling moves a sample application through five stages, with reversible document motion, progress indicators, and previous/next controls. Reduced-motion preferences and short viewports receive a static readable version. It is illustrative and submits no data. It can be reordered or removed in the Shopify theme editor.

## GitHub → Shopify

Theme source is at the root so this repository can be connected to Shopify’s GitHub theme integration. Connect the `main` branch as an unpublished theme first. The `preview/`, `extraction/`, Python scripts, reports, and ZIP are supporting project files, not storefront assets.
