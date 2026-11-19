# Repository Guidelines

## Project Structure

Kanwoo is a Next.js App Router frontend written in React and TypeScript. Routes, layouts, route handlers, and global CSS live in `src/app/`. Keep feature-specific code in `src/features/` and shared UI in `src/components/`. Look in `src/lib/api/` for shared API access and `src/lib/state/` for Redux state. Shared hooks, types, and utilities live in `src/hooks/`, `src/types/`, and `src/utils/`. Static assets, including the logo, robots file, and sitemap, live in `public/`.

## Development Commands

- `npm ci --legacy-peer-deps` installs dependencies from the lockfile using the peer dependency behavior used by the Docker build.
- `npm run dev` starts the Turbopack development server at `http://localhost:3000`.
- `npm run build` compiles the production standalone build. Copy `public/` and `.next/static/` into `.next/standalone/` as shown in the Dockerfile, then run `node .next/standalone/server.js` from the repository root.
- `npm test` runs Jest. Use `npm run test:watch` during development.
- ESLint rules live in `eslint.config.mjs`. The current `npm run lint` script calls the removed `next lint` command, and direct ESLint execution currently errors while loading the configuration.

## Coding Style

Use strict TypeScript and match the surrounding file's indentation. Many components use four spaces, while the existing test uses two. Use PascalCase for React components and their filenames, and prefix custom hooks with `use`. Use the `@/` alias for imports from `src/`. Follow nearby Material UI patterns when extending shared components.

## Testing

Jest uses `ts-jest` and jsdom. Add `*.test.ts` or `*.test.tsx` files in `src/__tests__/`. Use React Testing Library for component behavior. To run one file, use `npm test -- src/__tests__/sum.test.ts`. CI runs `npm test`, and Jest has no configured coverage threshold.

## Commits and Pull Requests

Use short, imperative commit subjects that name the affected behavior, following examples such as `Fix catalog` and `Update bookmarks`. In pull requests, describe the change and how you verified it, link relevant issues, and include screenshots for visible UI changes.
