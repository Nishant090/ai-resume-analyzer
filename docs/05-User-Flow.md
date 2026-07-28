# User Flow

**Project:** AI Resume Analyzer
**Version:** 1.0
**Status:** Draft
**Last Updated:** July 28, 2026

---

# Overview

This document describes how users navigate through the AI Resume Analyzer application, from authentication to viewing resume analysis results. It includes the primary user journey and alternative flows for handling errors.

---

# Primary User Flow

The primary journey is:

Landing Page
→ Register/Login
→ Dashboard
→ Upload Resume
→ Resume Processing
→ AI Analysis
→ View Results
→ Resume History
→ Logout

> See: `diagrams/user-flow.drawio`

---

# Alternative Flows

## Authentication

- Invalid email/password
- Email already registered
- Session expired
- Unauthorized access

## Resume Upload

- Invalid file type
- File too large
- Upload failure

## AI Analysis

- AI request timeout
- AI service unavailable
- Analysis failed

---

# Navigation Summary

| Screen | Next Screen |
|---------|-------------|
| Landing | Login / Register |
| Login | Dashboard |
| Register | Dashboard |
| Dashboard | Upload Resume |
| Upload Resume | Analysis Result |
| Analysis Result | Dashboard / History |
| History | Analysis Detail |
| Analysis Detail | Dashboard |

---

# Notes

- Protected pages require authentication.
- Users cannot access the dashboard without logging in.
- Every uploaded resume generates a new analysis record.