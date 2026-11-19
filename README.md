# ionics – Website

Source code of [ionics-it.ch](https://ionics-it.ch), the website of Ionics IT GmbH.
Built with [Astro](https://astro.build) as a fully static site (no client-side JavaScript),
hosted on GitHub Pages. Bilingual: German (default, at `/`) and English (at `/en/`).

## Requirements

- Node.js as specified in [`.nvmrc`](.nvmrc) (currently 26 LTS) – e.g. via `nvm use`
- npm

## Development

```sh
nvm use
npm install
npm run dev        # dev server on http://localhost:4321
```

| Command           | Purpose                                                  |
| ----------------- | -------------------------------------------------------- |
| `npm run dev`     | Local dev server with hot reload                         |
| `npm run build`   | Production build into `dist/`                            |
| `npm run preview` | Preview the production build locally                     |
| `npm run check`   | Type and template checks                                 |
| `npm run icons`   | Regenerate favicons, app icons and OG image from the logo |

## Structure

```
src/
  site.ts              Company data (name, address, email, UID, LinkedIn) – single source of truth
  i18n/ui.ts           All UI/home page texts per language + localized routes
  pages/               One file = one page; German at the root, English under pages/en/
  layouts/Base.astro   HTML skeleton, meta tags, hreflang, Open Graph, JSON-LD
  components/          Home (shared home page), Header, Footer, LangSwitch, Logo (inline SVG)
  styles/global.css    Colours, typography, base styles
  assets/              Images optimized by Astro (AVIF/WebP)
public/                Served as-is (favicons, robots.txt, OG image)
scripts/               Helper scripts (icon generation)
```

## Languages

| Page    | German         | English        |
| ------- | -------------- | -------------- |
| Home    | `/`            | `/en/`         |
| Imprint | `/impressum/`  | `/en/imprint/` |
| Privacy | `/datenschutz/`| `/en/privacy/` |

- Home page texts live in `src/i18n/ui.ts`; the layout is shared via `src/components/Home.astro`.
- Legal pages are separate files per language (`src/pages/*.astro`, `src/pages/en/*.astro`);
  the German version is legally binding.
- Every page passes `lang` and `page` to the layout, which renders `hreflang` alternates and
  the language switcher. New bilingual pages need an entry in `routes` in `src/i18n/ui.ts`.

## Logo & icons

Canonical logo files:

- `src/assets/logo.svg` – wordmark + mark (cleaned with svgo, editable in Inkscape)
- `public/favicon.svg` – mark only, with a dark-mode colour
- `src/components/Logo.astro` – the same paths as inline SVG for the site

After changing the logo, update the path data in `Logo.astro` and `favicon.svg`, then run
`npm run icons`.

Colours: wordmark `#0f1a33`, mark `#003399`, sky/hero `#0172be`.

## Hero panorama

The panorama (`src/assets/panorama.jpg`) tiles seamlessly and drifts endlessly from left to
right. Size, cropping and overlap are controlled by the CSS variables `--pano-h`,
`--pano-visible` and `--pano-overlap` in `src/pages/index.astro`. The animation stops when
the visitor's system prefers reduced motion.

## Deployment

Every push to `main` builds and publishes the site via GitHub Actions
([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)). An additional scheduled
rebuild runs on 1 January so the year in the footer stays current.

One-time setup in the repository under **Settings → Pages**:

- **Source:** GitHub Actions
- **Custom domain:** `ionics-it.ch` (with "Enforce HTTPS")

No `CNAME` file is needed when deploying via GitHub Actions – the domain is managed in the
repository settings.

## Extending

Add new pages as `.astro` or `.md` files under `src/pages/`.
Possible next steps: references/projects, a blog (content collections).
