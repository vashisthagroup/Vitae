# 🆓 Vitae - 100% FREE Deployment Guide

> **Deploy Vitae completely FREE with NO paid services, NO Google APIs, NO credit cards required!**

---

## ✅ What's FREE in This Setup

- ✅ **Frontend Hosting** - Vercel (free tier: unlimited)
- ✅ **Backend Server** - Railway or Render (free tier: 512MB RAM)
- ✅ **Database** - PostgreSQL free tier OR SQLite
- ✅ **AI Screening** - Ollama (self-hosted, open-source, FREE)
- ✅ **Email Service** - Mailgun (5000 emails/month free)
- ✅ **Source Control** - GitHub (free public repo)
- ✅ **Domain** - Free subdomain included
- ✅ **SSL/HTTPS** - Free (automatic with Vercel)

**Total Cost: $0/month** 🎉

---

## 📋 Free Stack Architecture

```
┌─────────────────────────────────────────────────┐
│         Your Website (Free Domain)              │
│  ✅ Vercel (Free)                               │
│  ✅ Tailwind CSS (Free)                         │
│  ✅ React + Next.js (Free)                      │
└──────────────────┬──────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
   ┌────▼─────┐          ┌────▼─────┐
   │ Railway  │          │ Mailgun  │
   │ Backend  │          │ Email    │
   │ (Free)   │          │ (Free)   │
   └────┬─────┘          └──────────┘
        │
   ┌────▼─────┐
   │PostgreSQL│
   │ Free     │
   └────┬─────┘
        │
   ┌────▼──────────┐
   │ Ollama (Local)│
   │ Mistral AI    │
   │ (Free)        │
   └───────────────┘
```

---

## 🚀 Step 1: Deploy Frontend (Vercel - FREE)

### 1.1 Create GitHub Repository

```bash
# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/vitae.git
git push -u origin main
```

### 1.2 Deploy to Vercel (Free)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

**Your app is now LIVE at:** `https://vitae.vercel.app`

---

## 🗄️ Step 2: Database (FREE PostgreSQL or SQLite)

### Option A: PostgreSQL Free Tier

Use **Railway.app** free tier:

1. Visit https://railway.app
2. Sign up with GitHub
3. Create new project → PostgreSQL
4. Copy connection string
5. Add to `.env.production`:
```
DATABASE_URL=postgresql://...
```

**Free tier:** 5GB storage, 1GB RAM

### Option B: SQLite (EASIEST)

Even simpler - use SQLite (no setup needed):

```typescript
// prisma/schema.prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

No database to manage! ✅

---

## 🤖 Step 3: AI Screening (Ollama - FREE Self-Hosted)

### 3.1 Install Ollama Locally

**MacOS:**
```bash
# Download from https://ollama.ai
# Or use Homebrew
brew install ollama
```

**Linux:**
```bash
curl https://ollama.ai/install.sh | sh
```

**Windows:**
Download from https://ollama.ai/download

### 3.2 Run Ollama with Mistral

```bash
# Start Ollama server (runs on localhost:11434)
ollama serve

# In another terminal, pull Mistral model (4GB, free)
ollama pull mistral

# Or use smaller model (2GB)
ollama pull neural-chat
```

### 3.3 Enable in Vitae

Add to `.env.local`:
```
USE_OLLAMA=true
```

Now screening uses FREE Mistral AI! No Google APIs needed.

---

## 📧 Step 4: Email Service (Mailgun - FREE)

### 4.1 Create Free Mailgun Account

1. Visit https://mailgun.com
2. Sign up (no credit card needed for free tier)
3. Add domain (use free sandbox domain)
4. Get API key

### 4.2 Configure Email Service

Update `/app/api/email/send/route.ts`:

```typescript
import mailgun from 'mailgun.js';
import FormData from 'form-data';

const client = new mailgun.default({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
});

const domain = process.env.MAILGUN_DOMAIN;

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html } = await request.json();

    await client.messages.create(domain, {
      from: `Vitae <vitae@${domain}>`,
      to: to,
      subject: subject,
      html: html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}
```

### 4.3 Add to .env

```
MAILGUN_API_KEY=your_api_key
MAILGUN_DOMAIN=vitae.mailgun.org
```

**Free tier:** 5,000 emails/month

---

## 🔧 Step 5: Deploy Backend (Railway - FREE)

### 5.1 Create Railway Account

1. Visit https://railway.app
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"

### 5.2 Configure Environment

In Railway dashboard:
- Add `DATABASE_URL` (from PostgreSQL)
- Add `MAILGUN_API_KEY`
- Add `MAILGUN_DOMAIN`
- Add `USE_OLLAMA=false` (cloud servers can't run Ollama)

### 5.3 Deploy

```bash
# Railway auto-deploys on git push
git push origin main
```

**Your API is now at:** `https://vitae-production.up.railway.app`

---

## 💾 Step 6: Setup SQLite Database (NO SETUP NEEDED)

If using SQLite (recommended for free):

```bash
# Install Prisma
npm install @prisma/client @prisma/cli

# Create schema
npx prisma init

# Generate database
npx prisma db push

# Done! Database is at ./prisma/dev.db
```

SQLite automatically saves to git - NO separate database needed!

---

## 🌍 Step 7: Connect Everything

Update `next.config.js`:

```typescript
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
};

module.exports = nextConfig;
```

Add to `.env.production`:

```
NEXT_PUBLIC_API_URL=https://vitae-production.up.railway.app
NEXT_PUBLIC_APP_URL=https://vitae.vercel.app
DATABASE_URL=postgresql://... (or sqlite)
MAILGUN_API_KEY=...
MAILGUN_DOMAIN=...
```

---

## 📝 Step 8: Custom Domain (FREE)

### Option A: Free Subdomain

Vercel auto-gives: `vitae.vercel.app` ✅

### Option B: Free .tk Domain

1. Visit https://www.freenom.com
2. Search `vitae.tk`
3. Register free for 12 months
4. Point to Vercel nameservers
5. Done!

---

## ✨ Final Setup Checklist

- [ ] Code pushed to GitHub
- [ ] Frontend deployed on Vercel
- [ ] Database configured (PostgreSQL or SQLite)
- [ ] Ollama running locally with Mistral
- [ ] Mailgun account created & API key added
- [ ] Backend deployed on Railway
- [ ] Environment variables set in both Vercel & Railway
- [ ] Test login at your deployment URL
- [ ] Send test email via API
- [ ] Test AI screening (check console for output)

---

## 🧪 Test Everything Works

### Test Login

```bash
curl -X POST https://your-railway-app.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"recruiter@vitae.com","password":"demo123","role":"recruiter"}'
```

### Test AI Screening

```bash
curl -X POST https://your-railway-app.com/api/screening/evaluate \
  -H "Content-Type: application/json" \
  -d '{
    "candidateName":"John",
    "jobRole":"Engineer",
    "requirements":["5+ years"],
    "responses":["I have 8 years experience...","Always learning..."]
  }'
```

### Test Email

```bash
curl -X POST https://your-railway-app.com/api/email/send \
  -H "Content-Type: application/json" \
  -d '{
    "type":"screening_completed",
    "to":"test@example.com",
    "recipientName":"John",
    "data":{"jobRole":"Engineer","fitScore":85}
  }'
```

---

## 💰 Total Cost Breakdown

| Service | Free Tier | Cost |
|---------|-----------|------|
| **Frontend (Vercel)** | Unlimited | $0 |
| **Backend (Railway)** | 512MB RAM | $0 |
| **Database (SQLite)** | Unlimited | $0 |
| **AI (Ollama)** | Unlimited | $0 |
| **Email (Mailgun)** | 5000/month | $0 |
| **Domain** | .vercel.app + .tk | $0 |
| **SSL/HTTPS** | Included | $0 |
| **Git (GitHub)** | Unlimited | $0 |
| | | |
| **TOTAL** | | **$0/month** ✅ |

---

## 🎯 Scaling (Still FREE until you need it)

All services have generous free tiers:

- **Vercel:** 100GB bandwidth/month
- **Railway:** 5GB storage, 512MB RAM
- **Mailgun:** 5,000 emails/month
- **SQLite:** No limits
- **GitHub:** Unlimited repos

When you grow, upgrade individually and only pay for what you need.

---

## 🚨 Important Limitations

### Ollama (AI Screening)

**Local machine:** Works perfectly ✅
**Railway server:** Can't install Ollama

**Solutions:**
1. Use rule-based scoring (no AI needed) ✅
2. Keep Ollama on your local computer for testing
3. Deploy Ollama separately on cheap VPS later

### Email

**Free tier:** 5,000 emails/month
- Enough for 166 daily emails
- Upgrade to Mailgun Pro if needed ($25/month)

### Database

**SQLite:** Perfect for starting
**PostgreSQL:** Free tier limited to 5GB

---

## 📚 Free Resources

- **Next.js:** https://nextjs.org/docs
- **Vercel:** https://vercel.com/docs
- **Ollama:** https://ollama.ai
- **Mailgun:** https://mailgun.com/docs
- **Railway:** https://railway.app/docs
- **Prisma:** https://prisma.io/docs

---

## 🔒 Security on Free Tier

✅ HTTPS/SSL automatic (Vercel, Railway)
✅ Environment variables encrypted
✅ GitHub private repo option
✅ No exposed credentials in code
✅ Rate limiting can be added free

---

## 📱 Monitor Performance (FREE)

Use free monitoring tools:

- **Vercel Analytics:** https://vercel.com/analytics
- **Railway Logs:** Built-in dashboard
- **Sentry:** https://sentry.io (free tier)

---

## 🆘 Troubleshooting

### Ollama not working
→ Run `ollama serve` in terminal
→ Check `http://localhost:11434` is accessible

### Email not sending
→ Check Mailgun API key
→ Verify sandbox domain
→ Check spam folder

### Database connection error
→ Verify DATABASE_URL in .env
→ Check Railway PostgreSQL status
→ Or switch to SQLite (no setup)

### Vercel deployment fails
→ Check Node version (need 18+)
→ Check build logs in Vercel dashboard

---

## ✨ You're All Set!

You now have:
- ✅ Free frontend hosting (Vercel)
- ✅ Free backend hosting (Railway)
- ✅ Free database (SQLite or PostgreSQL)
- ✅ Free AI screening (Ollama)
- ✅ Free email service (Mailgun)
- ✅ Free domain options
- ✅ Free HTTPS/SSL
- ✅ No credit card ever needed

**Deploy now and start recruiting for FREE!** 🚀

---

**Total deployment time:** ~30 minutes  
**Total cost:** $0  
**Total value:** Unlimited recruiting power!

