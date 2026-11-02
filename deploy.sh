#!/bin/bash
# -------------------------------------------------------------
# Birla Heritage Siwan - Fast Production Update Script
# Usage: ./deploy.sh
# -------------------------------------------------------------

set -e

echo "🚀 [1/4] Pulling latest code from GitHub..."
git pull origin main

echo "📦 [2/4] Installing dependencies (including build packages)..."
npm install

echo "🏗️ [3/4] Building Next.js production bundle..."
npm run build

echo "🔄 [4/4] Reloading PM2 processes with zero downtime..."
pm2 reload birlaheritage || pm2 restart birlaheritage
pm2 reload birlaheritage-bac || pm2 restart birlaheritage-bac

echo "🎉 Deployment complete! Site is live and updated."
