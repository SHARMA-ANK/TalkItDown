#!/bin/bash
set -e

echo "=== Building Expo web app ==="
cd artifacts/survive-the-shift
EXPO_PUBLIC_DOMAIN="${REPLIT_INTERNAL_APP_DOMAIN:-$REPLIT_DEV_DOMAIN}" \
  pnpm exec expo export --platform web --output-dir ../../frontend-dist
cd ../..

echo "=== Building API server ==="
pnpm --filter @workspace/api-server run build

echo "=== Build complete ==="
