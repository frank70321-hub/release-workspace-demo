# Engineering Portfolio Casebook

A dependency-free GitHub Pages portfolio covering two self-owned implementations and one interactive engineering demonstration.

## Cases

### AI API Gateway

The public architecture diagram is derived from the self-owned private `ai-gateway-mvp` implementation. The inspected implementation uses FastAPI, PostgreSQL/Supabase, customer API keys stored as hashes, a credit wallet, usage logs, OpenAI Responses API forwarding, and Render configuration.

Excluded from the public case: provider secrets, environment values, database credentials, customer data, and private source paths.

### Planet Console

The screenshots come from the self-owned private `xingqiu-frontend` implementation. The inspected web application uses React 19, TypeScript, React Three Fiber, Three.js, and Vite. The case describes its local batch reconciliation, explicit human gates, and responsive verification behavior.

Evidence files:

- `assets/planet-console-workflow.png`: desktop overview from the read-only API prototype review.
- `assets/planet-console-mobile.png`: mobile overview from the same review.

Excluded from the public case: private repository links, local filesystem paths, account information, and private source.

### Checkout Release Workspace

This is an engineering demonstration built directly in this public repository with semantic HTML, CSS, and native JavaScript. It is not described as React, Vite, or client work.

## Verification

Run the factual-copy gate:

```bash
node scripts/verify-content.mjs
```

Serve locally:

```bash
python3 -m http.server 8765
```

Open `http://127.0.0.1:8765/`.
