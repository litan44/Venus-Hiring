#!/usr/bin/env bash

# Helper script to sync environment variables to Vercel via Vercel CLI
echo "=================================================="
echo " Syncing Venus Hiring SMTP Env Vars to Vercel"
echo "=================================================="

npx vercel env rm SMTP_HOST production -y 2>/dev/null || true
npx vercel env rm SMTP_PORT production -y 2>/dev/null || true
npx vercel env rm SMTP_SECURE production -y 2>/dev/null || true
npx vercel env rm SMTP_USER production -y 2>/dev/null || true
npx vercel env rm SMTP_PASSWORD production -y 2>/dev/null || true
npx vercel env rm SMTP_FROM production -y 2>/dev/null || true
npx vercel env rm CONTACT_RECEIVER_EMAIL production -y 2>/dev/null || true

printf "smtppro.zoho.in" | npx vercel env add SMTP_HOST production
printf "465" | npx vercel env add SMTP_PORT production
printf "true" | npx vercel env add SMTP_SECURE production
printf "jivan@venushiring.com" | npx vercel env add SMTP_USER production
printf "8pySPQs5G1Gw" | npx vercel env add SMTP_PASSWORD production
printf "jivan@venushiring.com" | npx vercel env add SMTP_FROM production
printf "jivan@venushiring.com" | npx vercel env add CONTACT_RECEIVER_EMAIL production

echo "=================================================="
echo "✅ All Vercel Environment Variables Configured!"
echo "=================================================="
