# ESW Frontend

A Next.js headless CMS frontend for ESW, powered by WordPress (via GraphQL) as the content source. Pages are composed of flexible layout panels driven by WordPress ACF fields.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | SCSS Modules + CSS custom properties |
| CMS | WordPress (headless, via WPGraphQL) |
| GraphQL client | `@fridayagency/graphql-client` |
| Animations | GSAP |
| UI primitives | Radix UI / shadcn |
| Type generation | GraphQL Codegen |

---

## Getting Started

Copy the environment file and fill in your values:

```bash
cp .env.example .env.local
```

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## How It Works

### Routing

All pages are handled by a single catch-all route at [app/[[...uri]]/page.tsx](app/[[...uri]]/page.tsx). On each request:

1. The URI is normalised via `processPageUri()`.
2. The `GET_CONTENTNODE` GraphQL query fetches content from WordPress by URI.
3. The response `__typename` determines how to render:
   - `Page` / `Product` → [PagePanels](app/components/PagePanels/) component
   - `Post` → [PostTemplate](app/components/PostTemplate/) component

### Panel System

WordPress pages are built from an ordered list of ACF layout blocks. The [PagePanels](app/components/PagePanels/) component receives this array and delegates each item to a [PanelResolver](app/components/PagePanels/PanelResolver.tsx), which:

1. Strips the GraphQL typename prefix/suffix to get a component name (e.g. `PagePanelsPagePanelsHeroHeaderLayout` → `HeroHeader`).
2. Dynamically imports `app/components/Panels/{PanelName}/index.tsx`.
3. Renders it inside an error boundary so one broken panel doesn't crash the whole page.

Each panel lives at `app/components/Panels/<PanelName>/` alongside its co-located `<PanelName>.module.scss`.

### Data / GraphQL

Queries and fragments live in [data/fragments.ts](data/fragments.ts). Each panel type has a dedicated GraphQL fragment that maps WordPress ACF fields to typed props. Shared fragments (`AcfMediaItem`, `AcfLinkFragment`, etc.) are reused across panels.

TypeScript types are generated from the WordPress schema via GraphQL Codegen — run `npm run codegen` to regenerate after schema changes.

---

## Project Structure

```
app/
  [[...uri]]/         # Catch-all page route
  components/
    Panels/           # One folder per CMS layout block (~30 panels)
    PagePanels/       # Panel array renderer + resolver
    PostTemplate/     # Blog post layout
    Header/           # Site header + navigation
    Footer/           # Site footer
    Button/           # Shared Button component
    Container/        # Responsive max-width wrapper
    FormUI/           # Form input components
    ...               # Other shared UI components
  styles/
    generic/          # SCSS partials: variables, mixins, text-styles
data/
  fragments.ts        # All GraphQL queries and fragments
types/
  graphql.ts          # Generated GraphQL types (do not edit manually)
lib/
  client.ts           # GraphQL client setup
  seo.ts              # SEO helpers
utils/                # General helper functions
public/               # Static assets
```

---

## Styling

The project uses SCSS Modules with BEM naming (`.panel-name__element`). Every module imports two shared partials:

```scss
@use "@/app/styles/generic/text-styles";
@use "@/app/styles/generic/mixins";
```

Apply typography:

```scss
@include text-styles.text-style("desktop-h2");
```

Apply breakpoints:

```scss
@include mixins.breakpoint-up(tablet); // 1023px+
@include mixins.breakpoint-up(mobile); // 767px+
```

Design tokens are CSS custom properties defined in `app/styles/generic/_variables.scss`, e.g. `--Foundation-Signal-Green`, `--gradient-dark`.

---

## Adding a New Panel

1. Create `app/components/Panels/<PanelName>/index.tsx` and `<PanelName>.module.scss`.
2. Add a GraphQL fragment for the panel's ACF fields in `data/fragments.ts` and include it in the `GET_CONTENTNODE` query.
3. Run `npm run codegen` to generate TypeScript types.
4. The panel will be automatically resolved by the dynamic import in `PanelResolver.tsx` — no registration step needed.

---

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | Lint the codebase |
| `npm run codegen` | Regenerate GraphQL types from schema |
