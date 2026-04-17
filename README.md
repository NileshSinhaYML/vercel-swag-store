# Vercel Swag Store

Monorepo for the Swag Store web app: a Next.js storefront that talks to a Swag Store HTTP API (products, categories, cart), with shared UI and tooling packages.

## Structure

| Path | Description |
|------|-------------|
| `apps/web` | Next.js 16 app (App Router, React 19, next-intl, Tailwind v4). Port **3001** in dev. |
| `packages/ui` | Shared UI (shadcn-style components, Tailwind). Builds `dist/` CSS and TypeScript declarations consumed by the app. |
| `packages/eslint-config` | Shared ESLint flat configs. |
| `packages/typescript-config` | Shared `tsconfig` bases. |
| `packages/tailwind-config` | Shared Tailwind/PostCSS pieces. |

## Requirements

- **Node.js** 22.x (see root and `apps/web` `package.json` `engines`; Vercel uses this instead of the platform default)
- **pnpm** 10.x (see `packageManager` in root `package.json`)

## Setup

Install dependencies from the repository root:

```bash
pnpm install
```

### Environment (web app)

Copy `apps/web/.env.example` to `apps/web/.env` and set:

- `SWAG_STORE_API_ENDPOINT` — base URL of the Swag Store API (no trailing slash)
- `SWAG_STORE_API_TOKEN` — value sent as `x-vercel-protection-bypass` for upstream requests

Server code uses `@/server/swag-store-api.fetch` (`swagStoreApiUrl`, `swagStoreApiAuthHeaders`) for those calls.

## Scripts (root)

| Command | Description |
|---------|-------------|
| `pnpm dev` | Run all `dev` tasks (web dev server, etc.) via Turborepo. |
| `pnpm build` | Build dependencies (`^build`) then apps (`@repo/ui` then `web`). |
| `pnpm lint` | ESLint in workspaces that define a `lint` script. |
| `pnpm check-types` | Typecheck in workspaces that define `check-types`. |
| `pnpm format` | Prettier on `*.{ts,tsx,md}`. |

## Turborepo

Root [`turbo.json`](turbo.json) defines pipeline tasks and cache boundaries:

- **build** — default `dependsOn: ["^build"]` so libraries build before dependents. Caches `.next/**` (excluding `.next/cache`) and `dist/**`, and declares Swag Store env vars so cache keys stay correct when upstream credentials change.
- **lint** / **check-types** — `dependsOn: ["^…"]` where those scripts exist in dependencies.
- **dev** — not cached, persistent; same env keys for local parity.

Workspace overrides (narrow the build graph for this repo):

- [`packages/ui/turbo.json`](packages/ui/turbo.json) — `build` has no `^build` deps (config-only workspace packages have no `build` script).
- [`apps/web/turbo.json`](apps/web/turbo.json) — `build` depends only on `@repo/ui#build` (not every devDependency).

`@repo/ui` exposes a composite **`build`** script (`build:styles` + `build:components`) so UI assets exist before `next build`.

## License

Private / internal unless otherwise noted per package.
