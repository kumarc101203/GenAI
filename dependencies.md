# InterVAI — Frozen Dependencies

> Node.js equivalent of `requirements.txt`. All versions are exact (no `^` ranges).
> To reinstall everything from scratch: `cd Backend && npm install` then `cd ../Frontend && npm install`

---

## Backend (`/Backend`)

**Runtime: Node.js v18+ | Type: CommonJS**

| Package | Version | Purpose |
|---|---|---|
| @google/genai | 1.46.0 | Gemini AI SDK |
| bcryptjs | 3.0.3 | Password hashing |
| cookie-parser | 1.4.7 | Parse cookies |
| cors | 2.8.6 | Cross-origin requests |
| dotenv | 17.3.1 | Environment variables |
| express | 5.2.1 | HTTP server |
| jsonwebtoken | 9.0.3 | JWT auth tokens |
| mongoose | 9.3.2 | MongoDB ODM |
| multer | 2.1.1 | File upload (PDF) |
| passport | 0.7.0 | OAuth middleware |
| passport-github2 | 0.1.12 | GitHub OAuth strategy |
| passport-google-oauth20 | 2.0.0 | Google OAuth strategy |
| pdf-parse | 2.4.5 | PDF text extraction |
| zod | 4.3.6 | Schema validation |
| zod-to-json-schema | 3.25.2 | Zod → JSON Schema |

### Install
```bash
cd Backend
npm install
```

---

## Frontend (`/Frontend`)

**Runtime: Node.js v18+ | Build: Vite | Type: ESModule**

### Production Dependencies

| Package | Version | Purpose |
|---|---|---|
| axios | 1.13.6 | HTTP client |
| jspdf | 4.2.1 | PDF generation |
| jspdf-autotable | 5.0.7 | PDF table support |
| react | 19.2.4 | UI framework |
| react-dom | 19.2.4 | React DOM renderer |
| react-router | 7.13.2 | Client-side routing |
| sass | 1.98.0 | SCSS compiler |

### Dev Dependencies

| Package | Version | Purpose |
|---|---|---|
| @eslint/js | 9.39.4 | ESLint JS config |
| @types/react | 19.2.14 | React TypeScript types |
| @types/react-dom | 19.2.3 | React DOM TS types |
| @vitejs/plugin-react | 6.0.1 | Vite React plugin |
| eslint | 9.39.4 | Linter |
| eslint-plugin-react-hooks | 7.0.1 | React hooks lint rules |
| eslint-plugin-react-refresh | 0.5.2 | HMR lint rules |
| globals | 17.4.0 | Global variables for ESLint |
| vite | 8.0.2 | Build tool / dev server |

### Install
```bash
cd Frontend
npm install
```

---

## Quick Full Setup

```bash
# Backend
cd Backend && npm install

# Frontend
cd ../Frontend && npm install

# Run both (in separate terminals)
cd Backend && npm run dev
cd Frontend && npm run dev
```
