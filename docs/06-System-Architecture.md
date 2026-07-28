# System Architecture

**Project:** AI Resume Analyzer  
**Version:** 1.0  
**Status:** Draft  
**Last Updated:** July 28, 2026

---

# 1. Overview

The AI Resume Analyzer follows a **Monolithic Three-Tier Architecture** using the MERN stack. The system separates the presentation layer, application layer, and data layer to ensure maintainability, scalability, and clean separation of responsibilities.

The frontend communicates with the backend through RESTful APIs. The backend handles business logic, authentication, resume processing, AI communication, and database operations. MongoDB stores application data, while ImageKit stores uploaded resume files.

---

# 2. Architecture Style

- Monolithic Architecture
- Three-Tier Architecture
- Client–Server Architecture
- RESTful API Communication

---

# 3. Technology Stack

| Layer | Technology |
|--------|------------|
| Frontend | React, React Router, Tailwind CSS, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT (HttpOnly Cookie), bcrypt |
| File Storage | ImageKit |
| PDF Parsing | pdf-parse |
| AI Integration | AI Provider (LLM API) |

---

# 4. System Components

## Frontend (Presentation Layer)

### Responsibilities

- Render the user interface.
- Manage application routing.
- Handle authentication state.
- Upload resume files.
- Display AI analysis results.
- Communicate with backend APIs.

The frontend never communicates directly with the database or the AI provider.

---

## Backend (Application Layer)

### Responsibilities

- Authenticate users.
- Authorize protected routes.
- Validate uploaded files.
- Process PDF resumes.
- Extract text using pdf-parse.
- Communicate with the AI provider.
- Store and retrieve application data.
- Expose REST APIs.

The backend acts as the central coordinator of the system.

---

## Database (Data Layer)

### Technology

MongoDB

### Stores

- User accounts
- Resume analysis history
- AI-generated analysis
- Resume metadata

MongoDB was selected because of its flexible schema and strong integration with the MERN stack.

---

## External Services

### ImageKit

Stores uploaded PDF resumes securely and provides optimized file delivery.

### AI Provider

Analyzes extracted resume text and returns:

- Resume Score
- ATS Score
- Strengths
- Weaknesses
- Improvement Suggestions

### pdf-parse

Extracts plain text from uploaded PDF resumes before sending the content to the AI provider.

---

# 5. High-Level Architecture Diagram

> Architecture diagram will be added after the design phase.

---

# 6. Resume Analysis Flow

1. User uploads a PDF resume.
2. Frontend sends the file to the backend.
3. Backend validates the user's JWT.
4. Backend validates the uploaded file.
5. PDF is stored in ImageKit.
6. Backend extracts text using pdf-parse.
7. Extracted text is cleaned and prepared.
8. Text is sent to the AI provider.
9. AI returns resume analysis.
10. Analysis is stored in MongoDB.
11. Backend returns the analysis to the frontend.
12. Frontend displays the results to the user.

---

# 7. Authentication Flow

1. User registers or logs in.
2. Backend verifies credentials.
3. Passwords are compared using bcrypt.
4. Backend generates a JWT.
5. JWT is stored in an HttpOnly cookie.
6. Protected requests include the cookie automatically.
7. JWT middleware verifies authentication before allowing access.

---

# 8. Security Considerations

- Passwords are hashed using bcrypt.
- JWT is stored in an HttpOnly cookie.
- Protected routes require authentication.
- Uploaded files are validated before processing.
- User input is validated on the server.
- Environment variables store sensitive credentials.
- API keys are never exposed to the frontend.

---

# 9. Design Principles

- Separation of Concerns
- Single Responsibility Principle
- Modular Architecture
- RESTful API Design
- Security by Default

---

# 10. Architecture Decisions

| Decision | Reason |
|----------|--------|
| React | Component-based UI development |
| Express.js | Lightweight REST API framework |
| MongoDB | Flexible schema and MERN compatibility |
| JWT in HttpOnly Cookie | Secure authentication |
| ImageKit | Cloud-based file storage and CDN |
| pdf-parse | Reliable PDF text extraction |
| REST API | Standard communication between frontend and backend |

---

# 11. Scalability

The architecture separates presentation, application, and data layers, allowing each layer to evolve independently. Future improvements may include load balancing, caching, background job processing, CDN optimization, and migration to microservices if the application grows significantly.

---

# 12. Future Considerations

- AI Resume Builder
- Cover Letter Generator
- Job Description Matching
- Resume Version Comparison
- Interview Preparation
- Background Job Queue for AI Processing
- Microservices Architecture (if required)