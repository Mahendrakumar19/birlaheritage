#!/bin/bash
# -------------------------------------------------------------
# Birla Heritage Siwan - Fast Production Update Script
# Usage: ./deploy.sh
# -------------------------------------------------------------

set -e

echo "🚀 [1/5] Pulling latest code from GitHub..."
git pull origin main

echo "🧹 [2/5] Cleaning Turbopack cache..."
rm -rf .next/build .next/cache

echo "📦 [3/5] Installing dependencies..."
npm install --include=dev

echo "🏗️ [4/5] Building Next.js production bundle..."
npm run build

echo "🔄 [5/5] Reloading PM2 processes with zero downtime..."
pm2 reload birlaheritage || pm2 restart birlaheritage
pm2 reload birlaheritage-bac || pm2 restart birlaheritage-bac

echo "🎉 Deployment complete! Site is live and updated."
