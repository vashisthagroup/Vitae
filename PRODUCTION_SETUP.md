# Vitae Production Deployment Guide

## Pre-Deployment Checklist

- [ ] Database configured (PostgreSQL)
- [ ] Gemini AI API key obtained
- [ ] Email service configured (SendGrid/Resend)
- [ ] Environment variables set
- [ ] Database migrations run
- [ ] Tests passing
- [ ] Security review completed
- [ ] Rate limiting configured
- [ ] Monitoring set up

## Step 1: Database Setup

### PostgreSQL Installation

```bash
# macOS
brew install postgresql
brew services start postgresql

# Ubuntu
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql

# Windows
# Download from https://www.postgresql.org/download/windows/
```

### Create Vitae Database

```bash
createdb vitae
```

### Install Prisma

```bash
npm install @prisma/client @prisma/cli
```

### Initialize Prisma Schema

```bash
npx prisma init
```

### Configure Database URL

Edit `.env.local`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/vitae"
```

### Create Schema (prisma/schema.prisma)

```prisma
// Generated schema for User, Job, Candidate, etc.
// See lib/database.ts for data model references
```

### Run Migrations

```bash
npx prisma migrate dev --name init
```

## Step 2: AI Screening Setup (Gemini)

### Get API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Choose your project or create new one
4. Copy the API key

### Configure Environment

Add to `.env.local`:
```
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

### Test Screening

```bash
curl -X POST http://localhost:3000/api/screening/evaluate \
  -H "Content-Type: application/json" \
  -d '{
    "candidateName": "Test Candidate",
    "jobRole": "Engineer",
    "requirements": ["5+ years", "JavaScript"],
    "responses": ["I have 8 years of experience...", "Always learning new tech..."]
  }'
```

## Step 3: Email Service Setup

### Option A: SendGrid

1. Create SendGrid account at [sendgrid.com](https://sendgrid.com)
2. Get API key from Settings → API Keys
3. Add to `.env.local`:
```
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxx
```

4. Update email service:
```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

// Use in email route
await sgMail.send({
  to: email,
  from: 'noreply@vitae.ai',
  subject: emailContent.subject,
  html: emailContent.html,
});
```

### Option B: Resend (Recommended)

1. Create Resend account at [resend.com](https://resend.com)
2. Get API key from Settings
3. Add to `.env.local`:
```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
```

4. Install Resend client:
```bash
npm install resend
```

5. Update email service:
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Use in email route
await resend.emails.send({
  from: 'noreply@vitae.ai',
  to: email,
  subject: emailContent.subject,
  html: emailContent.html,
});
```

## Step 4: Environment Configuration

### Create .env.production

```
# Database
DATABASE_URL=postgresql://user:password@prod-db:5432/vitae

# AI Screening
NEXT_PUBLIC_GEMINI_API_KEY=your_production_key

# Email
SENDGRID_API_KEY=your_sendgrid_key
# OR
RESEND_API_KEY=your_resend_key

# Security
JWT_SECRET=your_very_secure_secret_key_here
SESSION_SECRET=another_secure_secret_key

# URLs
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Calendar Integration (optional)
GOOGLE_CALENDAR_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CALENDAR_CLIENT_SECRET=your_client_secret

# OAuth (optional)
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
```

## Step 5: Build & Test

### Local Production Build

```bash
npm run build
npm start
```

### Run Tests

```bash
npm run test
npm run test:e2e
```

### Security Scan

```bash
npm audit
npm audit fix
```

## Step 6: Deployment Options

### Option A: Vercel (Easiest)

```bash
npm i -g vercel
vercel login
vercel deploy --prod
```

Configure environment variables in Vercel dashboard:
- Settings → Environment Variables
- Add all .env.production variables

### Option B: AWS

1. Create EC2 instance (Ubuntu 22.04)
2. Install Node.js and PostgreSQL
3. Clone repository
4. Install dependencies
5. Configure environment variables
6. Set up systemd service
7. Configure nginx reverse proxy

### Option C: DigitalOcean App Platform

1. Connect GitHub repository
2. Set environment variables
3. Configure database connection
4. Deploy

### Option D: Docker

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY .next ./.next
COPY public ./public
COPY prisma ./prisma

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t vitae .
docker run -e DATABASE_URL=... vitae
```

## Step 7: Security Hardening

### Enable HTTPS

Use certbot with Let's Encrypt:
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d yourdomain.com
```

### Configure Nginx

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Database Security

```sql
-- Create dedicated user
CREATE USER vitae_app WITH PASSWORD 'secure_password';

-- Grant permissions
GRANT CONNECT ON DATABASE vitae TO vitae_app;
GRANT USAGE ON SCHEMA public TO vitae_app;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO vitae_app;

-- Enforce SSL
ALTER SYSTEM SET ssl = on;
SELECT pg_reload_conf();
```

## Step 8: Monitoring & Logging

### Set Up Logging

```typescript
// Use Winston or Pino for logging
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
  },
});

export default logger;
```

### Monitor with Sentry

```bash
npm install @sentry/nextjs
```

Configure in `next.config.js`:
```javascript
withSentryConfig(nextConfig, {
  org: "your-org",
  project: "vitae",
  authToken: process.env.SENTRY_AUTH_TOKEN,
});
```

### Set Up Error Tracking

1. Create Sentry account
2. Get DSN
3. Add to environment variables
4. Test error tracking

## Step 9: Performance Optimization

### Enable Caching

```typescript
// Cache user queries for 5 minutes
export async function GET(request) {
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, max-age=300',
    },
  });
}
```

### Set Up CDN

Use Cloudflare:
1. Add domain to Cloudflare
2. Update nameservers
3. Enable caching rules
4. Set up Page Rules

### Database Indexing

```sql
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_candidates_email ON candidates(email);
CREATE INDEX idx_jobs_department ON jobs(department);
```

## Step 10: Backup & Disaster Recovery

### Automated Backups

PostgreSQL backup script:
```bash
#!/bin/bash
pg_dump vitae > /backups/vitae_$(date +%Y%m%d_%H%M%S).sql
# Upload to S3 or similar
```

Schedule with cron:
```
0 2 * * * /usr/local/bin/backup-vitae.sh
```

### Restore from Backup

```bash
psql vitae < /backups/vitae_20260801_020000.sql
```

## Troubleshooting

### Common Issues

**Database connection refused:**
- Check PostgreSQL is running
- Verify DATABASE_URL
- Check firewall rules

**Gemini API errors:**
- Verify API key in .env
- Check API quota
- Ensure region support

**Email not sending:**
- Verify SendGrid/Resend key
- Check email domain verification
- Review logs for SMTP errors

**Performance issues:**
- Add database indexes
- Enable caching
- Use CDN for static assets

## Next Steps

1. Set up CI/CD pipeline (GitHub Actions)
2. Configure automated testing
3. Set up staging environment
4. Enable blue-green deployments
5. Implement feature flags
6. Set up customer support system

## Support

For production issues:
- Check logs in /var/log/vitae/
- Review error tracking (Sentry)
- Check database status
- Contact support@vitae.ai
