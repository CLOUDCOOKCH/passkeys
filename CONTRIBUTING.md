# Contributing

Use the setup commands in [README.md](README.md). Follow the [repository guidelines](AGENTS.md) for structure and naming.

## Edit a lesson

1. Update the content in Swiss High German and English in the same change. Use stable section and tutorial IDs so shared links work in either language.
2. Check provider-specific instructions against official documentation. Link directly to that documentation and record the date you reviewed it. Describe version differences when navigation or availability varies.
3. Keep tutorials and demos local to the browser. Use fictional account data. Distinguish provider recovery from recovery at an individual service, and synced credentials from device-bound credentials.

## Verify and submit

Run `npm run lint`, `npm test`, `npm run build`, and `npm run test:e2e`. Add tests for new branching logic, important keyboard interactions, and new shareable entries. For visible changes, check both languages on a small screen, tab through controls, and enable reduced motion. When editing the executive summary, check print preview in both languages.

Use a short imperative commit subject. In the pull request, explain what learners can do, link relevant issues and sources, list the checks you ran, and include a screenshot or recording for visual changes. Contributions are accepted under the repository's MIT license.
