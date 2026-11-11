# Pearlora landing page

Public website for Pearlora, served at `https://pearlora.nighttealabs.tech`.
Static [Astro](https://astro.build) site styled with Tailwind, shipped as a
small Caddy container.

## Run locally

Needs **Node 22.23.4 or newer** (`nvm install` reads `.nvmrc`) and pnpm.

```sh
pnpm install
pnpm dev        # http://localhost:4321
pnpm check      # type-check
pnpm build      # output in dist/
pnpm preview    # serve dist/
```

## Where things are

| What | Where |
|---|---|
| Contact email, pricing, page title | `src/config.ts` |
| Page sections and copy | `src/pages/index.astro` |
| Interactive depth simulation | `src/components/DepthDemo.astro` |
| Colours and fonts | `src/styles/global.css` |
| Images (cropped from the pitch deck) | `src/assets/` |

**Before launch:** set the real address in `CONTACT_EMAIL` in `src/config.ts`.
It is a placeholder (`hello@example.com`) and every "Request a demo" button
uses it.

The images are crops of the pitch-deck slides, so the logo is a raster, not a
vector. To use originals, replace the files in `src/assets/` keeping the same
names.

## CI/CD (GitHub Actions)

`.github/workflows/ci-cd.yml`:

| Trigger | Jobs |
|---|---|
| Pull request | type-check + build |
| Push to `main` | the same, then build + push the image to GHCR, then deploy to the VPS |

Image: `ghcr.io/<owner>/<repo>`, tagged `latest` and with the commit SHA.

On the VPS the site runs from `~/pearlora-web` (separate from the backend in
`~/pearlora`) and listens on `127.0.0.1:8082`. The host's Caddy adds HTTPS.

### One-time setup

1. **GitHub secrets** (Settings → Secrets and variables → Actions). Same
   values as the backend repo; secrets are not shared between repos.

   | Secret | Value |
   |---|---|
   | `VPS_HOST` | VPS IP or hostname |
   | `VPS_USER` | SSH user (must be able to run `docker`) |
   | `VPS_SSH_KEY` | private deploy key |
   | `VPS_PORT` | optional, defaults to 22 |

2. **DNS**: add `pearlora` as a CNAME to `vps-jkt-01.nighttealabs.com`
   (the same target as `api.pearlora`).

3. **Caddy on the VPS**: add to `/etc/caddy/Caddyfile`, then
   `sudo systemctl reload caddy`:

   ```
   pearlora.nighttealabs.tech {
       reverse_proxy 127.0.0.1:8082
   }
   ```

The deploy job uses the `production` environment, which is created on the
first run. The first deploy works before steps 2 and 3 are done; the site is
just not reachable from outside until they are.

### Check a deploy

```sh
ssh <user>@<vps> 'cd ~/pearlora-web && docker compose ps && curl -sI localhost:8082 | head -1'
curl -I https://pearlora.nighttealabs.tech
```
