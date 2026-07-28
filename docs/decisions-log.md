# Decisions Log

**Project:** AI Resume Analyzer
**Purpose:** Track decisions made during planning/development so nothing stays an unresolved "TBD" across multiple docs.

---

| # | Decision | Choice | Reason | Date |
|---|----------|--------|--------|------|
| 1 | AI Provider | Hugging Face Inference API | Reuses pattern from What's Cooking; free tier suitable for portfolio project | Jul 28, 2026 |
| 2 | Max resume upload size | 2 MB | Sufficient for text-based PDF resumes; keeps ImageKit storage cheap | Jul 28, 2026 |
| 3 | AI failure handling | Manual retry via button; extracted text preserved so retry doesn't require re-upload | Avoids doubling wait on Hugging Face cold starts; simpler state than auto-retry | Jul 28, 2026 |
| 4 | History pagination | Page-based (page/limit), not cursor-based | Matches actual scale (dozens of records per user); simpler to implement correctly | Jul 28, 2026 |

---

## Open (not yet decided)

- **Max analyses per user** — unbounded for MVP, or capped for storage/cost control? (Raised in Database Design, Section 5)

---

## How to use this doc

Whenever a new open question comes up while writing a doc (Database Design, API Design, etc.), add a row here immediately instead of leaving it as a vague placeholder in the doc itself. Reference the row number in the doc where relevant (e.g. "See Decision #2 for file size limit").