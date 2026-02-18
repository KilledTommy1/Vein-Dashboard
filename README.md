# Vein Dashboard

Minimal Vite + React + TypeScript starter for the Vein Dashboard.

Quick start

```bash
npm install
npm run dev
```

Build

```bash
npm run build
npm run preview
```
Environment

Create a `.env` file in the project root (or set environment variables) with the following values when using a weather API:


If you're running a local Vein backend or service, add the base URL for the client to use (Vite requires `VITE_` prefix for exposed env vars in the browser):

```
VITE_VEIN_BASE_URL=http://localhost:3030
VEIN_BASE_URL=http://localhost:3030    # optional fallback for non-Vite tooling
```
