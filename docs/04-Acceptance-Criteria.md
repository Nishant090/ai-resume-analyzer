# Acceptance Criteria

**Project:** AI Resume Analyzer  
**Version:** 1.0  
**Status:** Draft  
**Last Updated:** July 28, 2026

---

# US-001 Register

### Scenario 1 – Successful Registration

Given I am on the registration page

When I enter a valid name, email, and password

Then my account should be created successfully.

---

### Scenario 2 – Duplicate Email

Given an account already exists

When I register using the same email

Then I should see an "Email already registered" message.

---

### Scenario 3 – Invalid Password

Given I am on the registration page

When I enter a password shorter than the minimum length

Then I should see a validation error.

---

# US-002 Login

### Scenario 1 – Successful Login

Given I have a registered account

When I enter valid credentials

Then I should be logged in.

---

### Scenario 2 – Invalid Credentials

Given I have entered an incorrect email or password

When I submit the login form

Then I should see an authentication error.

---

# US-003 Upload Resume

### Scenario 1 – Successful Upload

Given I am logged in

When I upload a valid PDF

Then the resume should be stored successfully.

---

### Scenario 2 – Invalid File Type

Given I am on the upload page

When I upload a non-PDF file

Then the upload should be rejected.

---

### Scenario 3 – Oversized File

Given I am uploading a file

When the file exceeds the maximum size

Then I should see a file size error.

---

# US-006 Analyze Resume

### Scenario 1 – Successful Analysis

Given a valid resume has been uploaded

When AI analysis completes

Then I should receive:

- Resume Score
- ATS Score
- Strengths
- Weaknesses
- Suggestions

---

### Scenario 2 – AI Failure

Given the AI service is unavailable

When analysis fails

Then I should receive an informative error message.

---

# US-009 Dashboard

### Scenario 1 – View History

Given I have previous analyses

When I open my dashboard

Then I should see all previous analyses.

---

### Scenario 2 – Empty History

Given I have never uploaded a resume

When I open the dashboard

Then I should see an empty state encouraging my first upload.
