# eve + Next.js — Durable Agent Harness

## Perbaikan build (penting)

Peer dependency eve 0.80.x:
- `ai` harus **^7.0.137** (bukan v5)
- `just-bash` **^3.1.0**
- `zod` **^3.25.76**

```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run build
```

## Struktur

```
agent/
  instructions.md
  agent.ts
  channels/eve.ts
src/app/page.tsx      # useEveAgent
next.config.ts        # withEve(nextConfig)
```

## Dev

```bash
npm run dev
# http://localhost:3000
```

## Verifikasi

```bash
npx eve info
curl http://localhost:3000/eve/v1/info
curl http://localhost:3000/eve/v1/health
```

## Deploy

```bash
npx eve link
npx eve deploy
```

Ganti `none()` di `agent/channels/eve.ts` sebelum production.
