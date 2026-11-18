# Repository Guidelines

## Project structure

Passkeys is a static, bilingual guide to passwordless sign-in built with React and Vite. Use the following layout:

- Put page sections in `src/sections/`, shared UI in `src/components/`, and demos and animations in its `interactive/` and `animations/` subdirectories.
- Keep educational material in `src/content/` and translations in `src/i18n/`. Put pure functions such as recommendation rules in `src/lib/` so they can be tested independently.
- Use `src/styles/` for shared styles, `public/` for static assets, and `tests/` for automated checks.

## Build and development

Use Node.js 24 and run these commands from the repository root:

| Command | Purpose |
| --- | --- |
| `npm ci` | Install the locked dependency versions. |
| `npm run dev` | Start the Vite development server. |
| `npm test` | Run Vitest unit tests. |
| `npm run lint` | Check source and configuration with ESLint. |
| `npm run build` | Type-check and produce the static site. |
| `npm run preview` | Serve the production build under `/passkeys/`. |
| `npm run test:e2e` | Exercise the built site with Chromium via Playwright. |

## Code and content conventions

Use strict TypeScript and two-space indentation. Name React components in PascalCase (`ProviderCard.tsx`) and hooks in camelCase with a `use` prefix. Add user-facing copy in Swiss High German and English together. Cite official documentation and record a last-reviewed date for provider instructions. Label sign-in demos as simulations and use fictional inputs throughout.

## Testing

Cover wizard recommendations and quiz scoring with unit tests such as `tests/recommendations.test.ts`. Use Playwright specs such as `tests/playground.spec.ts` for browser flows. Check that a keyboard user can finish each demo, that reduced motion preserves its meaning, and that switching languages preserves the selected section. Verify mobile layout and section links under the GitHub Pages base path.

## Commits and pull requests

Use short, imperative subjects such as `Add keyboard controls to the security key demo`. Describe the learner-visible change, link any relevant issue, and list the checks you ran. Include screenshots or a short recording for visual or interaction changes.
