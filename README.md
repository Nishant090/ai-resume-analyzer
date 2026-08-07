# 📄 AI Resume Analyzer

An AI-powered resume analyzer that evaluates resumes, provides ATS compatibility scoring, and offers actionable improvement suggestions using modern web technologies.

Built as a full-stack MERN application with a focus on clean architecture, thoughtful UX, and real-world production patterns (JWT auth, file storage, AI integration, and structured error handling).

---

## ✨ Features

- **Resume Upload** — drag-and-drop or file picker, supports PDF, DOC, and DOCX
- **AI-Powered Analysis** — extracts resume text and generates:
  - Overall Score (0–100)
  - ATS Compatibility Score (0–100)
  - Strengths
  - Weaknesses
  - Missing Skills
  - Actionable Suggestions
- **Analysis History** — view all past analyses with delete support
- **Dashboard** — quick stats (total analyses, average score) and recent activity
- **Authentication** — secure register/login with JWT-based sessions
- **Profile** — view account details and analysis stats
- **Responsive UI** — mobile-first design with a custom design system

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- React Router
- Tailwind CSS v4
- Axios

**Backend**
- Node.js / Express
- MongoDB with Mongoose
- JWT authentication
- `pdf-parse` for resume text extraction

**AI & Storage**
- Hugging Face Inference API for resume analysis
- ImageKit for resume file storage (2MB limit)

---

## 📁 Project Structure

```
ai-resume-analyzer/
├── backend/
│   ├── src/
│   │   ├── controller/       # Route handlers
│   │   ├── middleware/       # Auth, error handling
│   │   ├── models/           # Mongoose schemas (User, Analysis)
│   │   ├── routes/           # Express routes
│   │   ├── services/         # Business logic (auth, analysis, AI, ImageKit)
│   │   └── app.js
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── api/               # Axios instance
│   │   ├── components/
│   │   │   ├── ui/            # Button, Card, Input
│   │   │   └── layout/        # Navbar, Sidebar, AnalysisList
│   │   ├── context/           # AuthContext
│   │   ├── hooks/             # useAuth
│   │   ├── layouts/           # AuthLayout, DashboardLayout
│   │   ├── pages/
│   │   │   ├── auth/          # Login, Register
│   │   │   ├── dashboard/     # Dashboard, Upload, Analysis, History, Profile
│   │   │   └── public/        # Landing
│   │   ├── routes/            # AppRoutes, ProtectedRoutes
│   │   └── services/          # API service functions
│   └── vite.config.js
└── docs/                      # PRD, roadmap, user stories, system architecture, API design
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- ImageKit account
- Hugging Face API key

### 1. Clone the repository
```bash
git clone https://github.com/Nishant090/ai-resume-analyzer.git
cd ai-resume-analyzer
```

### 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env
# fill in your environment variables
npm run dev
```

### 3. Frontend setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Environment Variables

**`backend/.env`**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
HUGGINGFACE_API_KEY=your_huggingface_api_key
```

**`frontend/.env`**
```env
VITE_API_URL=http://localhost:5000/api
```

> ⚠️ Adjust variable names above to match what your backend and frontend actually read — update this section once your `.env.example` and `axios.js` config are finalized.

---

## 📡 API Overview

| Method | Endpoint              | Description                    |
|--------|------------------------|--------------------------------|
| POST   | `/auth/register`       | Register a new user            |
| POST   | `/auth/login`          | Log in                         |
| POST   | `/auth/logout`         | Log out                        |
| GET    | `/analysis/history`    | Get all analyses for the user  |
| GET    | `/analysis/:id`        | Get a single analysis          |
| POST   | `/analysis/upload`     | Upload and analyze a resume    |
| DELETE | `/analysis/:id`        | Delete an analysis             |

> Full API design is documented in `docs/08-API-design.md`.

---

## 🗺️ Roadmap

- [x] Planning & documentation (PRD, architecture, database design)
- [x] Design system (Tailwind v4)
- [x] Authentication (register, login, JWT middleware)
- [x] Resume upload & AI analysis
- [x] Dashboard, history, and profile pages
- [ ] Deployment (Vercel + Render)
- [ ] RAG-based document Q&A app (planned as a follow-up project)

---

## 📌 Project Documentation

Detailed planning docs are available in `/docs`:
- `01-PRD.md` — Product Requirements
- `02-Roadmap.md`
- `03-User-Stories.md`
- `04-Acceptance-Criteria.md`
- `05-User-Flow.md`
- `06-System-Architecture.md`
- `07-Database-design.md`
- `08-API-design.md`
- `decisions-log.md` — locked technical decisions

---

## 👤 Author

**Nishant Khatiwada**
- GitHub: [@Nishant090](https://github.com/Nishant090)
- Email: nishantkhatiwada6@gmail.com

---

## 📄 License

This project is currently unlicensed. Add a license (e.g. MIT) if you plan to open it up for contributions or reuse.
