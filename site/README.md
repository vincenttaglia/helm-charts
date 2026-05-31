# Landing Page

React + Vite landing page for the Helm chart repository. It reads the published
`index.yaml` from GitHub Pages and renders the available charts.

## Develop

```bash
cd site
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs to site/dist
```

## Deploy

Deployment is automated: pushing changes under `site/**` to `main` triggers the
[`deploy-site.yml`](../.github/workflows/deploy-site.yml) workflow, which builds
the site and publishes `site/dist` to the `gh-pages` branch (preserving the
existing chart `index.yaml`).

Branding (GitHub user, site URL, social links) lives at the top of
[`src/App.jsx`](src/App.jsx).
