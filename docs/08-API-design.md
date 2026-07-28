# API Design

**Project:** AI Resume Analyzer
**Version:** 1.0
**Status:** Draft
**Last Updated:** July 28, 2026

---

# 1. Overview

RESTful API served by Express.js. All protected routes require a valid JWT sent via `httpOnly` cookie (see System Architecture, Section 7). All responses follow a consistent envelope so the frontend can handle success/error uniformly.

**Success response:**
```json
{ "success": true, "data": { ... } }
```

**Error response:**
```json
{ "success": false, "error": "Human-readable message" }
```

References: `decisions-log.md` for AI provider, file size limit, retry behavior, and pagination decisions.

---

# 2. Endpoint Summary

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| POST | `/api/auth/register` | No | Create account |
| POST | `/api/auth/login` | No | Log in, sets JWT cookie |
| POST | `/api/auth/logout` | Yes | Clears JWT cookie |
| GET | `/api/auth/me` | Yes | Get current logged-in user |
| POST | `/api/analysis` | Yes | Upload resume + run full analysis pipeline |
| GET | `/api/analysis` | Yes | List analysis history (paginated) |
| GET | `/api/analysis/:id` | Yes | Get one analysis's full details |
| POST | `/api/analysis/:id/retry` | Yes | Retry a failed analysis |
| DELETE | `/api/analysis/:id` | Yes | Delete an analysis + its stored file |

---

# 3. Auth Endpoints

## 3.1 POST /api/auth/register

**Auth:** No

**Request body:**
```json
{
  "name": "Nishant Khatiwada",
  "email": "nishant@example.com",
  "password": "securepass123"
}
```

**Success (201):**
```json
{
  "success": true,
  "data": {
    "id": "665f1a2b3c4d5e6f7a8b9c0d",
    "name": "Nishant Khatiwada",
    "email": "nishant@example.com"
  }
}
```

**Errors:**
| Status | Condition | Body |
|--------|-----------|------|
| 400 | Email already registered | `{ "success": false, "error": "Email already registered" }` |
| 400 | Missing/invalid fields | `{ "success": false, "error": "Name, email, and password are required" }` |
| 400 | Password too short | `{ "success": false, "error": "Password must be at least 8 characters" }` |

---

## 3.2 POST /api/auth/login

**Auth:** No

**Request body:**
```json
{
  "email": "nishant@example.com",
  "password": "securepass123"
}
```

**Success (200):** Sets `httpOnly` JWT cookie. Body:
```json
{
  "success": true,
  "data": {
    "id": "665f1a2b3c4d5e6f7a8b9c0d",
    "name": "Nishant Khatiwada",
    "email": "nishant@example.com"
  }
}
```

**Errors:**
| Status | Condition | Body |
|--------|-----------|------|
| 401 | Invalid email or password | `{ "success": false, "error": "Invalid email or password" }` |

---

## 3.3 POST /api/auth/logout

**Auth:** Yes

**Request body:** none

**Success (200):** Clears JWT cookie.
```json
{ "success": true, "data": { "message": "Logged out successfully" } }
```

---

## 3.4 GET /api/auth/me

**Auth:** Yes

**Purpose:** Lets the frontend check auth state on page load/refresh (e.g. to decide whether to redirect to login).

**Success (200):**
```json
{
  "success": true,
  "data": {
    "id": "665f1a2b3c4d5e6f7a8b9c0d",
    "name": "Nishant Khatiwada",
    "email": "nishant@example.com"
  }
}
```

**Errors:**
| Status | Condition | Body |
|--------|-----------|------|
| 401 | No valid session/cookie | `{ "success": false, "error": "Not authenticated" }` |

---

# 4. Analysis Endpoints

## 4.1 POST /api/analysis

**Auth:** Yes

**Purpose:** Uploads a resume and runs the full pipeline synchronously: validate → store in ImageKit → extract text → send to AI provider → save result. Request stays open until the full result is ready (see Section 6, Design Notes).

**Request:** `multipart/form-data`
| Field | Type | Constraints |
|-------|------|-------------|
| resume | File | PDF only, max 2 MB (Decision #2) |

**Success (201):**
```json
{
  "success": true,
  "data": {
    "id": "6a1b2c3d4e5f6a7b8c9d0e1f",
    "status": "completed",
    "fileName": "resume.pdf",
    "resumeScore": 78,
    "atsScore": 82,
    "strengths": ["Clear work history", "Quantified achievements"],
    "weaknesses": ["Missing keywords for target role", "No summary section"],
    "suggestions": ["Add a professional summary", "Include measurable metrics in project descriptions"],
    "createdAt": "2026-07-28T13:05:00.000Z"
  }
}
```

**Success but AI failed (201) — record still created with `status: failed`:**
```json
{
  "success": true,
  "data": {
    "id": "6a1b2c3d4e5f6a7b8c9d0e1f",
    "status": "failed",
    "fileName": "resume.pdf",
    "errorMessage": "AI service unavailable, please retry",
    "createdAt": "2026-07-28T13:05:00.000Z"
  }
}
```

**Errors:**
| Status | Condition | Body |
|--------|-----------|------|
| 400 | No file provided | `{ "success": false, "error": "Resume file is required" }` |
| 400 | Invalid file type | `{ "success": false, "error": "Only PDF files are supported" }` |
| 400 | File too large | `{ "success": false, "error": "File exceeds 2MB limit" }` |
| 422 | PDF text extraction failed (e.g. scanned/image-only PDF) | `{ "success": false, "error": "Could not extract text from this PDF" }` |

---

## 4.2 GET /api/analysis

**Auth:** Yes

**Purpose:** Returns paginated analysis history for the logged-in user, newest first (Decision #4: page-based pagination).

**Query params:**
| Param | Type | Default |
|-------|------|---------|
| page | Number | 1 |
| limit | Number | 10 |

**Success (200):**
```json
{
  "success": true,
  "data": {
    "analyses": [
      {
        "id": "6a1b2c3d4e5f6a7b8c9d0e1f",
        "fileName": "resume.pdf",
        "status": "completed",
        "resumeScore": 78,
        "atsScore": 82,
        "createdAt": "2026-07-28T13:05:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 24,
      "limit": 10
    }
  }
}
```

**Empty state (200):**
```json
{
  "success": true,
  "data": {
    "analyses": [],
    "pagination": { "currentPage": 1, "totalPages": 0, "totalItems": 0, "limit": 10 }
  }
}
```

---

## 4.3 GET /api/analysis/:id

**Auth:** Yes

**Purpose:** Returns full details of a single analysis.

**Success (200):**
```json
{
  "success": true,
  "data": {
    "id": "6a1b2c3d4e5f6a7b8c9d0e1f",
    "fileName": "resume.pdf",
    "fileUrl": "https://ik.imagekit.io/.../resume.pdf",
    "status": "completed",
    "resumeScore": 78,
    "atsScore": 82,
    "strengths": ["..."],
    "weaknesses": ["..."],
    "suggestions": ["..."],
    "createdAt": "2026-07-28T13:05:00.000Z"
  }
}
```

**Errors:**
| Status | Condition | Body |
|--------|-----------|------|
| 404 | Analysis not found, or belongs to another user | `{ "success": false, "error": "Analysis not found" }` |

> Note: return 404 (not 403) when the analysis belongs to another user — this avoids revealing that a given ID exists at all.

---

## 4.4 POST /api/analysis/:id/retry

**Auth:** Yes

**Purpose:** Re-runs the AI analysis step only, using the `extractedText` already saved on the record (Decision #3). Does not require re-upload.

**Request body:** none

**Success (200):** Same shape as 4.1's success response, with updated `status`.

**Errors:**
| Status | Condition | Body |
|--------|-----------|------|
| 404 | Analysis not found / not owned by user | `{ "success": false, "error": "Analysis not found" }` |
| 400 | Analysis is not in `failed` state | `{ "success": false, "error": "Only failed analyses can be retried" }` |

---

## 4.5 DELETE /api/analysis/:id

**Auth:** Yes

**Purpose:** Deletes the analysis record from MongoDB **and** the file from ImageKit (using the stored `fileId` — see Database Design, Section 4).

**Success (200):**
```json
{ "success": true, "data": { "message": "Analysis deleted" } }
```

**Errors:**
| Status | Condition | Body |
|--------|-----------|------|
| 404 | Analysis not found / not owned by user | `{ "success": false, "error": "Analysis not found" }` |

---

# 5. Status Codes Used

| Code | Meaning |
|------|---------|
| 200 | Success (read/update/delete) |
| 201 | Success (resource created — register, upload) |
| 400 | Bad request (validation failure) |
| 401 | Not authenticated |
| 404 | Resource not found or not owned by user |
| 422 | Request was valid but processing failed (e.g. unparseable PDF) |
| 500 | Unexpected server error |

---

# 6. Design Notes

- **Synchronous upload pipeline (MVP tradeoff):** `POST /api/analysis` waits for the entire pipeline (upload → parse → AI call → save) before responding. Simpler than polling/websockets, at the cost of request latency (Hugging Face cold starts may add 10-20s). Acceptable for MVP scale; revisit with a background job queue if this becomes a real product (see System Architecture, Section 12).
- **Ownership checks:** every `:id` route must verify the analysis belongs to the logged-in user before returning/modifying it — otherwise one user could read or delete another user's data by guessing IDs.
- **404 over 403 for ownership mismatches:** prevents leaking whether an ID exists.