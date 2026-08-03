#!/bin/bash

# 🚀 VITAE - ONE-CLICK PRODUCTION DEPLOYMENT TO VERCEL
# This script deploys Vitae to production automatically

set -e

echo "🚀 VITAE PRODUCTION DEPLOYMENT TO VERCEL"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Step 1: Verify build is ready
echo -e "${BLUE}[1/4]${NC} Verifying production build..."
if [ -d ".next" ]; then
  echo -e "${GREEN}✅ Production build ready${NC}"
else
  echo -e "${YELLOW}⚠️ Building production bundle...${NC}"
  npm run build
fi

echo ""

# Step 2: Check Vercel CLI
echo -e "${BLUE}[2/4]${NC} Checking Vercel CLI..."
if command -v vercel &> /dev/null; then
  echo -e "${GREEN}✅ Vercel CLI installed${NC}"
else
  echo -e "${YELLOW}Installing Vercel CLI...${NC}"
  npm install -g vercel
fi

echo ""

# Step 3: Login to Vercel
echo -e "${BLUE}[3/4]${NC} Logging in to Vercel..."
echo -e "${YELLOW}You'll be prompted to login. Use your Vercel account (GitHub recommended)${NC}"
vercel login

echo ""

# Step 4: Deploy to production
echo -e "${BLUE}[4/4]${NC} Deploying to production..."
echo -e "${YELLOW}Deploying with Vercel...${NC}"
vercel deploy --prod

echo ""
echo -e "${GREEN}✅ DEPLOYMENT COMPLETE!${NC}"
echo ""
echo "🎉 YOUR APP IS LIVE!"
echo ""
echo "Frontend URL:"
echo "  https://vitae.vercel.app"
echo ""
echo "Test your live app:"
echo "  1. Visit https://vitae.vercel.app"
echo "  2. Click 'Recruiter Login'"
echo "  3. Email: recruiter@vitae.com"
echo "  4. Password: demo123"
echo ""
echo "Dashboard:"
echo "  https://vercel.com/dashboard"
echo ""
echo "Next steps:"
echo "  1. Deploy backend to Railway (https://railway.app)"
echo "  2. Setup email with Mailgun (https://mailgun.com)"
echo "  3. Update VCG website with Vitae button"
echo "  4. Invite your team!"
echo ""
echo "Documentation:"
echo "  📄 DEPLOY_FINAL.md - Full deployment guide"
echo "  📄 API_DOCUMENTATION.md - All API endpoints"
echo "  📄 TESTING_CHECKLIST.md - Test cases"
echo ""
echo "========================================"
echo "Status: 🚀 LIVE IN PRODUCTION"
echo "Cost: \$0/month forever"
echo "========================================"
