# Vitae API Documentation

## Overview

Vitae provides a comprehensive REST API for managing recruitment operations. All endpoints support JSON request/response format.

## Base URL

```
http://localhost:3000/api
https://api.yourdomain.com/api (production)
```

## Authentication Endpoints

### POST /auth/login
Login user (recruiter or candidate)

**Request:**
```json
{
  "email": "recruiter@vitae.com",
  "password": "demo123",
  "role": "recruiter"
}
```

**Response:**
```json
{
  "id": "1",
  "email": "recruiter@vitae.com",
  "name": "John Recruiter",
  "role": "recruiter"
}
```

### POST /auth/signup
Create new user account

**Request:**
```json
{
  "email": "newuser@example.com",
  "password": "secure_password",
  "name": "Jane Doe",
  "role": "recruiter"
}
```

## Jobs Endpoints

### GET /jobs
List all job postings

**Query Parameters:**
- `status` - Filter by status (active, paused, closed)
- `department` - Filter by department
- `limit` - Items per page (default: 50)
- `offset` - Pagination offset (default: 0)

**Response:**
```json
[
  {
    "id": "1",
    "title": "Senior Full Stack Engineer",
    "department": "Engineering",
    "location": "San Francisco, CA",
    "status": "active",
    "autoScheduleCutoff": 75,
    "applicants": 10,
    "screened": 8
  }
]
```

### POST /jobs
Create new job posting

**Request:**
```json
{
  "title": "Backend Engineer",
  "department": "Engineering",
  "location": "Remote",
  "description": "We are looking for...",
  "requirements": ["Node.js", "PostgreSQL"],
  "autoScheduleCutoff": 75,
  "screeningQuestions": [
    "Tell us about your backend experience",
    "How do you approach system design?"
  ]
}
```

## Candidates Endpoints

### GET /candidates
List all candidates

**Query Parameters:**
- `location` - Filter by location
- `limit` - Items per page
- `offset` - Pagination offset

**Response:**
```json
[
  {
    "id": "1",
    "name": "Alex Rivera",
    "email": "alex@example.com",
    "location": "San Francisco, CA",
    "skills": ["React", "Node.js"],
    "profileCompleteness": 95
  }
]
```

### POST /candidates
Create new candidate profile

**Request:**
```json
{
  "name": "Jane Developer",
  "email": "jane@example.com",
  "phone": "(555) 123-4567",
  "location": "Austin, TX",
  "skills": ["Python", "PostgreSQL"],
  "linkedinUrl": "https://linkedin.com/in/jane"
}
```

## Applications Endpoints

### GET /applications
List applications

**Query Parameters:**
- `jobRoleId` - Filter by job
- `candidateId` - Filter by candidate
- `status` - Filter by status

**Response:**
```json
[
  {
    "id": "1",
    "candidateName": "Alex Rivera",
    "jobTitle": "Senior Full Stack Engineer",
    "status": "interview_scheduled",
    "aiScreeningScore": 92,
    "appliedAt": "2026-08-01T09:00:00Z"
  }
]
```

### POST /applications
Submit application (candidate)

**Request:**
```json
{
  "candidateId": "1",
  "jobRoleId": "1"
}
```

## Screening Endpoint

### POST /screening/evaluate
Evaluate candidate using AI (Gemini)

**Request:**
```json
{
  "candidateName": "Alex Rivera",
  "jobRole": "Senior Full Stack Engineer",
  "requirements": ["10+ years", "React & Node.js"],
  "responses": [
    "Built a real-time trading platform...",
    "Follow dev.to and conferences...",
    "Your mission aligns with my values..."
  ]
}
```

**Response:**
```json
{
  "candidateName": "Alex Rivera",
  "jobRole": "Senior Full Stack Engineer",
  "score": 92,
  "strengths": [
    "Strong technical background",
    "Leadership experience",
    "Alignment with company values"
  ],
  "weaknesses": ["Prefers on-site, we're hybrid"],
  "recommendation": "STRONG_HIRE",
  "reasoning": "Exceptional fit with perfect score. Recommend fast-tracking to final round."
}
```

## Interviews Endpoint

### GET /interviews
List scheduled interviews

**Query Parameters:**
- `status` - Filter by status (scheduled, pending_confirmation, completed)
- `jobRoleId` - Filter by job

**Response:**
```json
[
  {
    "id": "1",
    "candidateName": "Alex Rivera",
    "jobTitle": "Senior Full Stack Engineer",
    "type": "phone_screen",
    "startTime": "2026-08-05T14:00:00Z",
    "duration": 45,
    "status": "scheduled"
  }
]
```

### POST /interviews
Create interview slot

**Request:**
```json
{
  "candidateId": "1",
  "jobRoleId": "1",
  "type": "phone_screen",
  "startTime": "2026-08-05T14:00:00Z",
  "duration": 45
}
```

## Admin Approvals Endpoint

### GET /admin/approvals
List pending approvals

**Response:**
```json
{
  "pending": [
    {
      "id": "1",
      "type": "job_posting",
      "title": "Staff Software Engineer",
      "requestedBy": "John Recruiter",
      "status": "pending",
      "submittedAt": "2026-08-03T14:30:00Z"
    }
  ],
  "approved": []
}
```

### POST /admin/approvals
Approve or reject request

**Request:**
```json
{
  "approvalId": "1",
  "action": "approve"
}
```

Or for rejection:
```json
{
  "approvalId": "1",
  "action": "reject",
  "feedback": "Please add more details about the role..."
}
```

## Email Endpoint

### POST /email/send
Send email notification

**Request:**
```json
{
  "type": "screening_completed",
  "to": "candidate@example.com",
  "recipientName": "Alex Rivera",
  "data": {
    "jobRole": "Senior Full Stack Engineer",
    "fitScore": 92
  }
}
```

**Supported Template Types:**
- `screening_completed` - AI screening results
- `interview_scheduled` - Interview confirmation
- `rejection` - Application rejection
- `offer` - Job offer
- `approval_notification` - Job posting approved

## Error Responses

All errors return JSON with error message:

```json
{
  "error": "Invalid credentials"
}
```

Common status codes:
- 200 - Success
- 201 - Created
- 400 - Bad request
- 401 - Unauthorized
- 404 - Not found
- 409 - Conflict (e.g., duplicate email)
- 500 - Server error

## Production Setup

### Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=postgresql://user:password@localhost:5432/vitae
SENDGRID_API_KEY=your_sendgrid_key
JWT_SECRET=your_secret_key
```

### Database Setup

1. Create PostgreSQL database:
```sql
CREATE DATABASE vitae;
```

2. Install Prisma:
```bash
npm install @prisma/client @prisma/cli
```

3. Create Prisma schema (prisma/schema.prisma)

4. Run migrations:
```bash
npx prisma migrate dev
```

### Email Service

Configure SendGrid:
1. Get API key from SendGrid dashboard
2. Add to environment variables
3. Update email service to use SendGrid client

### AI Screening

Get Gemini API key:
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create API key
3. Add to `.env.local`

### Deployment

Deploy to Vercel:
```bash
vercel deploy
```

Or to your own server:
1. Build: `npm run build`
2. Start: `npm start`
3. Set up environment variables on server
4. Configure database connection
5. Set up reverse proxy (nginx)
6. Enable HTTPS with SSL certificate

## Rate Limiting

Production API has rate limits:
- 100 requests per minute per IP
- 1000 requests per day per user
- Screening endpoint: 10 evaluations per minute

## Support

For API questions or issues:
- Check this documentation
- Review code in `/app/api`
- File issues on GitHub
