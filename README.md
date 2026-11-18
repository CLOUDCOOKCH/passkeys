# Passkeys

An interactive guide to passwordless sign-in for individuals, organisations, and IT teams. Explore a simulated sign-in, compare passkey providers, or practise recovery decisions in Swiss High German or English.

The poster library at `#library` offers fourteen designs in both languages, including twelve memes. Browse the featured Drake, Expanding Brain and astronaut posters, or expand the full collection. Each poster has an A4 PDF, a portrait PNG for sharing, and a print view. [German poster files](public/posters/de/) · [English poster files](public/posters/en/)

The Microsoft 365 guide at `#microsoft-365` includes a fictional registration and sign-in exercise, a Microsoft Authenticator walkthrough, troubleshooting and a two-sided A6 first-day card for employees. At `#m365-card-builder`, IT teams can choose a method and language, add their organisation and help-desk contact, then print or download a customised PDF. The card is generated in the browser.

## Run locally

Use Node.js 24 and npm. From the repository root:

```sh
npm ci
npm run dev
```

Open the development server's printed URL under `/passkeys/`. The German homepage is at `/passkeys/` and English at `/passkeys/en/`. Each learning section has a shareable anchor.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite with hot reload. |
| `npm run typecheck` | Check strict TypeScript without building. |
| `npm run lint` | Check JavaScript, TypeScript and React hooks. |
| `npm test` | Run the Vitest unit suite. |
| `npm run build` | Check types and produce the production site in `dist/`. |
| `npm run preview` | Serve the most recent build locally. |
| `npm run test:e2e` | Start a preview server and run Playwright against the built site. |

Before a first browser test run, use `npx playwright install --with-deps chromium` and `npm run build`. To test with an existing Chromium installation, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its executable path. Use `npm install` when intentionally updating dependencies and include the resulting lockfile.

## Publish with GitHub Pages

1. Open [Settings → Pages](https://github.com/CLOUDCOOKCH/passkeys/settings/pages) and select **GitHub Actions** under **Build and deployment → Source**.
2. Merge the site and workflow into `main`. The workflow runs lint, unit tests, strict type checking, a production build and browser tests before deploying the validated `dist/` artifact.
3. Open the [Pages workflow](https://github.com/CLOUDCOOKCH/passkeys/actions/workflows/deploy.yml) and follow the `github-pages` environment link in the successful deployment. To deploy the same revision again, select **Run workflow** on `main`.

On a deployment from `main`, the workflow reads the URL configured in **Settings → Pages** before Vite builds the site. The custom domain `https://passkey.cloudcook.ch/` uses `/` as its base path. The project URL `https://cloudcookch.github.io/passkeys/` uses `/passkeys/`. Both language pages, their assets and their canonical URLs use the same base. After changing the domain in Pages settings, run the workflow again on `main` to rebuild the artifact.

To preview a domain-root build locally, use `VITE_BASE_PATH=/ VITE_SITE_ORIGIN=https://passkey.cloudcook.ch npm run build` and `VITE_BASE_PATH=/ npm run preview`. Pull-request builds can use the repository Actions variables `VITE_BASE_PATH` and `VITE_SITE_ORIGIN` to preview a particular configuration.

## Content and licensing

All interactions run in the browser with simulated credentials. Provider instructions link to official documentation and carry review dates. The project is independent of the named vendors.

See [Contributing](CONTRIBUTING.md) for the content-review and test workflow. Original code, copy and illustrations are distributed under the [MIT license](LICENSE). Bundled fonts, icons and libraries retain their upstream licenses.
