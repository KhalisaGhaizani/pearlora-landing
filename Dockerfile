# Pearlora landing page: static Astro build served by Caddy.
FROM node:22-alpine AS build
WORKDIR /src
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm check && pnpm build

FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /src/dist /srv
EXPOSE 8080
