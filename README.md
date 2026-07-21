# Voucher Prototype

Voucher is a mobile-first speculative prototype for a barangay-level MSME trust and supply network. The integrated application demonstrates four connected product areas:

- Supply Access Gate
- Vouch Score
- Supply Availability and Scarcity
- Mesh Exchange

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite. Use the orange **Demo** control to switch between Vouch Score states and accepted or declined simulated responses.

## Verification

```bash
npm run lint
npm run build
```

The project uses React, TypeScript, Vite, React Router, local state, and browser storage. No backend or sign-in is required.

## Deployment

The repository includes SPA fallback configuration for Vercel and Netlify-style hosting so refreshing nested prototype routes returns the application shell.
