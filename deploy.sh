#!/bin/bash
# -------------------------------------------------------------
# Birla Heritage Siwan - Fast Production Update Script
# Usage: ./deploy.sh
# -------------------------------------------------------------

set -e

echo "🚀 [1/6] Pulling latest code from GitHub..."
git pull origin main

echo "📦 [2/6] Installing dependencies..."
npm install

echo "🏗️ [3/6] Building Next.js production bundle..."
npm run build

echo "📂 [4/6] Copying public and static assets to standalone..."
cp -rn public .next/standalone/ || cp -r public .next/standalone/
mkdir -p .next/standalone/.next
cp -rn .next/static .next/standalone/.next/ || cp -r .next/static .next/standalone/.next/

echo "🔄 [5/6] Reloading PM2 processes with zero downtime..."
pm2 reload birlaheritage || pm2 restart birlaheritage
pm2 reload birlaheritage-bac || pm2 restart birlaheritage-bac

echo "🎉 [6/6] Deployment complete! Site is live and updated."
