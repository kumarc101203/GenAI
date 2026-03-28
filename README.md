# InterVAI — AI-Powered Interview Preparation Platform

> A full-stack MERN application that uses Google Gemini AI to generate personalized interview reports based on your resume and job description.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [OAuth Setup](#oauth-setup)
- [Deployment](#deployment)
- [Known Issues & Notes](#known-issues--notes)

---

## Overview

InterVAI analyzes a candidate's resume (PDF) and a job description using Google Gemini AI to produce a comprehensive interview preparation report including:

- Match score (0–100)
- Strengths & weaknesses
- Actionable suggestions
- Technical & behavioral questions with answers
- Skill gap analysis
- Day-by-day preparation plan

---

## Features

- JWT-based authentication (register / login / logout)
- Google OAuth & GitHub OAuth login
- AI-generated interview reports via Gemini 2.5 Flash
- PDF resume parsing
- Report history with timestamps
- PDF download of generated reports
- User profile with avatar upload
- Light / Dark theme toggle
- Liquid glassmorphism UI
- Settings page (AI model, notifications, file transfer)
- Fully responsive design

---

## Tech Stack

### Backend
| Package | Purpose |
|---|---|
| Express 5 | HTTP server |
| Mongoose | MongoDB ODM |
| JWT (jsonwebtoken) | Authentication tokens |
| bcryptjs | Password hashing |
| Passport.js | OAuth strategies |
| passport-google-oauth20 | Google OAuth |
| passport-github2 | GitHub OAuth |
| Multer | File upload (PDF) |
| pdf-parse | PDF text extraction |
| @google/genai | Gemini AI SDK |
| dotenv | Environment variables |
| cookie-parser | Cookie handling |
| cors | Cross-origin requests |

### Frontend
| Package | Purpose |
|---|---|
| React 19 | UI framework |
| React Router | Client-side routing |
| Axios | HTTP client |
| jsPDF | PDF generation |
| Sass | Styling (SCSS) |
| Vite | Build tool |

---

## Project Structure

```
GenAI/
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js          # MongoDB connection
│   │   │   └── passport.js          # Google & GitHub OAuth config
│   │   ├── controllers/
│   │   │   ├── auth.controller.js   # Register, login, logout, getMe
│   │   │   ├── interview.controller.js  # Generate report, history, get by ID
│   │   │   └── profile.controller.js    # Get & update profile
│   │   ├── middlewares/
│   │   │   └── auth.middleware.js   # JWT verification
│   │   ├── models/
│   │   │   ├── user.model.js        # User schema (with profile fields)
│   │   │   ├── interviewReport.model.js  # Report schema
│   │   │   └── blacklist.model.js   # Token blacklist (logout)
│   │   ├── routes/
│   │   │   ├── auth.routes.js       # /api/auth/*
│   │   │   ├── interview.routes.js  # /api/interview/*
│   │   │   └── profile.routes.js    # /api/profile/*
│   │   ├── services/
│   │   │   └── ai.service.js        # Gemini AI integration
│   │   └── app.js                   # Express app setup
│   ├── server.js                    # Entry point
│   ├── .env                         # Environment variables (not committed)
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx           # Global navbar with profile dropdown
    │   │   └── navbar.scss
    │   ├── config/
    │   │   └── api.js               # Shared axios instance (uses VITE_API_URL)
    │   ├── context/
    │   │   └── ThemeContext.jsx     # Light/dark theme context
    │   ├── features/
    │   │   ├── auth/
    │   │   │   ├── pages/           # Login.jsx, Register.jsx
    │   │   │   ├── hooks/           # useAuth.js
    │   │   │   ├── services/        # auth.api.js
    │   │   │   ├── components/      # Protected.jsx (route guard + Navbar)
    │   │   │   └── auth.context.jsx # Auth state (user, loading)
    │   │   ├── dashboard/           # Dashboard landing page
    │   │   ├── interview/
    │   │   │   ├── pages/           # home.jsx (form), report.jsx
    │   │   │   ├── hooks/           # useInterview.js
    │   │   │   └── services/        # interview.api.js
    │   │   ├── history/             # Report history page
    │   │   ├── profile/             # Edit profile page
    │   │   └── settings/            # Settings page
    │   ├── style/
    │   │   ├── glass.scss           # Glassmorphism mixins
    │   │   └── button.scss
    │   ├── App.jsx
    │   ├── app.routes.jsx           # All routes
    │   ├── main.jsx
    │   └── style.scss               # Global styles + CSS variables
    ├── .env                         # VITE_API_URL (not committed)
    └── package.json
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Google Gemini API key

### 1. Clone the repo
```bash
git clone https://github.com/your-username/GenAI.git
cd GenAI
```

### 2. Setup Backend
```bash
cd Backend
npm install
```

Create `Backend/.env` (see [Environment Variables](#environment-variables))

```bash
npm run dev
```

Backend runs on `http://localhost:3000`

### 3. Setup Frontend
```bash
cd Frontend
npm install
```

Create `Frontend/.env`:
```
VITE_API_URL=http://localhost:3000
```

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## Environment Variables

### Backend `.env`
```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/dbname
JWT_SECRET=your_jwt_secret_here

GOOGLE_API_KEY=your_gemini_api_key

GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret

GITHUB_CLIENT_ID=your_github_oauth_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_client_secret

CLIENT_URL=http://localhost:5173
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:3000
```

> For production, change `CLIENT_URL` and `VITE_API_URL` to your deployed URLs.

---

## API Reference

### Auth — `/api/auth`
| Method | Route | Description | Auth |
|---|---|---|---|
| POST | `/register` | Register new user | Public |
| POST | `/login` | Login with email & password | Public |
| GET | `/logout` | Logout (blacklists token) | Public |
| GET | `/me` | Get current user | Private |
| GET | `/google` | Initiate Google OAuth | Public |
| GET | `/google/callback` | Google OAuth callback | Public |
| GET | `/github` | Initiate GitHub OAuth | Public |
| GET | `/github/callback` | GitHub OAuth callback | Public |

### Interview — `/api/interview`
| Method | Route | Description | Auth |
|---|---|---|---|
| POST | `/` | Generate interview report | Private |
| GET | `/history` | Get all reports for user | Private |
| GET | `/:id` | Get single report by ID | Private |

### Profile — `/api/profile`
| Method | Route | Description | Auth |
|---|---|---|---|
| GET | `/` | Get user profile | Private |
| PUT | `/` | Update user profile | Private |

---

## OAuth Setup

### Google OAuth
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project → APIs & Services → Credentials
3. Create OAuth 2.0 Client ID (Web application)
4. Add authorized redirect URI: `http://localhost:3000/api/auth/google/callback`
5. Copy Client ID and Secret to `Backend/.env`

### GitHub OAuth
1. Go to [github.com/settings/developers](https://github.com/settings/developers)
2. New OAuth App
3. Set Homepage URL: `http://localhost:5173`
4. Set Callback URL: `http://localhost:3000/api/auth/github/callback`
5. Copy Client ID and Secret to `Backend/.env`

> For production, update all callback URLs to your deployed backend domain.

---

## Deployment

### When deploying to production:

**Backend `.env`:**
```env
CLIENT_URL=https://your-frontend-domain.com
```

**Frontend `.env`:**
```env
VITE_API_URL=https://your-backend-domain.com
```

**OAuth provider settings:**
- Update Google redirect URI to `https://your-backend-domain.com/api/auth/google/callback`
- Update GitHub callback URL to `https://your-backend-domain.com/api/auth/github/callback`

No code changes needed — everything reads from environment variables.

---

## Known Issues & Notes

- **Gemini rate limit**: Free tier allows 20 requests/day on `gemini-2.5-flash`. If you hit the limit, wait 24 hours or create a new API key from [aistudio.google.com](https://aistudio.google.com).
- **PDF parsing**: Uses `pdf-parse` v2 which requires `new PDFParse({ data: buffer })` syntax.
- **Avatar storage**: Profile avatars are stored as base64 strings in MongoDB. For production, consider using S3 or Cloudinary.
- **OAuth not tested in production**: OAuth callback URLs must be updated in both the provider dashboard and `.env` before deploying.
- **Token blacklist**: Logout blacklists the JWT in MongoDB. Old tokens in the blacklist are never cleaned up — consider adding a TTL index on the blacklist collection.

---

## .gitignore Reminder

Make sure these are in your `.gitignore`:
```
node_modules/
.env
dist/
```
