# Web (`apps/web`)

Next.js storefront for the Swag Store: localized routes, product search and PDP, cart (client store + API routes proxying the upstream cart API), and shared components from `@repo/ui`.

## Prerequisites

- Root monorepo installed with `pnpm install` (from repository root).
- Environment variables configured (see below).

## Environment

Create `apps/web/.env` (see `.env.example`):

| Variable | Purpose |
|----------|---------|
| `SWAG_STORE_API_ENDPOINT` | Base URL for the Swag Store API |
| `SWAG_STORE_API_TOKEN` | Bypass / auth header for protected upstream |

Validated with `@t3-oss/env-nextjs` in `src/env.ts`.

## Scripts

Run from **`apps/web`** or via **`pnpm --filter web <script>`** from the repo root:

| Script | Description |
|--------|-------------|
| `pnpm dev` | Next dev server on **http://localhost:3001** |
| `pnpm build` | Production build |
| `pnpm start` | Start production server (after `build`) |
| `pnpm lint` | ESLint (`--max-warnings 0`) |
| `pnpm check-types` | `next typegen` + `tsc --noEmit` |

From the monorepo root, `pnpm dev` / `pnpm build` run through Turborepo (see root `README.md`).

## App layout

- `src/app` — App Router pages, API route handlers, layouts.
- `src/components` — Feature and layout components.
- `src/hooks`, `src/stores`, `src/utils` — Client hooks, Zustand stores, helpers.
- `src/server` — Server-only helpers (e.g. upstream API URL/headers).

## Learn more

- [Next.js documentation](https://nextjs.org/docs)
- [Turborepo documentation](https://turbo.build/repo/docs)
