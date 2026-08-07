# Database Design

**Project:** AI Resume Analyzer
**Version:** 1.0
**Status:** Draft
**Last Updated:** July 28, 2026

---

# 1. Overview

The application uses MongoDB with Mongoose as the ODM. There are two collections: `User` and `Analysis`, connected by a one-to-many relationship (one user can have many analyses).

Design references:

- Decision #1 (AI Provider) — see `decisions-log.md`
- Decision #3 (Retry behavior) — see `decisions-log.md`

---

# 2. Collections

## 2.1 User

| Field     | Type     | Constraints                 |
| --------- | -------- | --------------------------- |
| _id       | ObjectId | Auto-generated              |
| name      | String   | Required                    |
| email     | String   | Required, unique, lowercase |
| password  | String   | Required, bcrypt hash       |
| createdAt | Date     | Auto (timestamps)           |
| updatedAt | Date     | Auto (timestamps)           |

**Indexes:** unique index on `email`.

---

## 2.2 Analysis

| Field         | Type     | Constraints                                          |
| ------------- | -------- | ---------------------------------------------------- |
| _id           | ObjectId | Auto-generated                                       |
| user          | ObjectId | Required, ref: `User`                                |
| fileName      | String   | Required                                             |
| fileUrl       | String   | Required (ImageKit URL)                              |
| fileId        | String   | Required (ImageKit file ID, needed for deletion)     |
| extractedText | String   | Required — preserved for retry (Decision #3)         |
| status        | String   | Enum: `pending`, `processing`, `completed`, `failed` |
| aiProvider    | String   | Default: `huggingface` (Decision #1)                 |
| resumeScore   | Number   | Populated when status = completed                    |
| atsScore      | Number   | Populated when status = completed                    |
| strengths     | [String] | Populated when status = completed                    |
| weaknesses    | [String] | Populated when status = completed                    |
| suggestions   | [String] | Populated when status = completed                    |
| errorMessage  | String   | Populated only when status = failed                  |
| createdAt     | Date     | Auto (timestamps)                                    |
| updatedAt     | Date     | Auto (timestamps)                                    |

**Indexes:** compound index on `{ user: 1, createdAt: -1 }` for fast, pre-sorted dashboard history queries.

---

# 3. Relationships

- One `User` → Many `Analysis` documents (referenced via `user` field, not embedded).
- Embedding was avoided because MongoDB documents have a 16MB size limit, and a user's analysis history can grow unbounded over time.

---

# 4. Field Design Rationale

- **`status`** exists specifically to support retry behavior (Decision #3): the frontend checks `status === 'failed'` to show a "Retry Analysis" button.
- **`extractedText`** is persisted rather than discarded after the AI call, so a retry re-sends only the AI request — not the full upload + PDF parse pipeline.
- **`fileId`** is stored separately from `fileUrl` because ImageKit's delete API requires the file ID, not the URL. This is required for US-011 (Delete Analysis) to avoid orphaned files in storage.

---

# 5. Open Questions

- Max analyses per user (unbounded, or capped for storage/cost reasons)? — not yet decided, add to `decisions-log.md` when resolved.
