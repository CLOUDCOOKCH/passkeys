# Contributing

Use the setup commands in [README.md](README.md). Follow the [repository guidelines](AGENTS.md) for structure and naming.

## Edit a lesson

1. Update the content in Swiss High German and English in the same change. Use stable section and tutorial IDs so shared links work in either language.
2. Check provider-specific instructions against official documentation. Link directly to that documentation and record the date you reviewed it. Describe version differences when navigation or availability varies.
3. Keep tutorials and demos local to the browser. Use fictional account data. Distinguish provider recovery from recovery at an individual service, and synced credentials from device-bound credentials.

## Verify and submit

Run `npm run lint`, `npm test`, `npm run build`, and `npm run test:e2e`. Add tests for new branching logic, important keyboard interactions, and new shareable entries. For visible changes, check both languages on a small screen, tab through controls, and enable reduced motion. When editing the executive summary, check print preview in both languages.

Use a short imperative commit subject. In the pull request, explain what learners can do, link relevant issues and sources, list the checks you ran, and include a screenshot or recording for visual changes. Contributions are accepted under the repository's MIT license.

## Poster artwork and exports

The poster library uses committed files in `public/posters/`, so Pages serves downloads without a generator or external service. Edit the bilingual catalogue in `src/content/posters.json` and the 800 × 1000 designs in `scripts/posters/`. Original meme illustrations and the print-page fonts live in `public/posters/media/`.

Run `npm ci`, install Chromium with `npx playwright install chromium`, then run `npm run posters`. If using system Chromium, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its executable path. This renders a 1080 × 1350 PNG, a small WebP preview, a single A4 PDF and a standalone print page for each language and design. Inspect the exports and commit them alongside their sources.

The A4 editions carry a QR code linking to the corresponding lesson. Set `VITE_SITE_ORIGIN` and `VITE_BASE_PATH` before regenerating for another domain or fork. Existing paper copies retain their original destination.
