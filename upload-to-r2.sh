#!/bin/bash

# Cloudflare R2 Image Upload Script
# This script uploads all images from public/images/ to Cloudflare R2

set -e

echo "🚀 Cloudflare R2 Image Upload Script"
echo "======================================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ Error: .env.local file not found"
    echo ""
    echo "Please create .env.local with your R2 credentials:"
    echo "  cp .env.r2.example .env.local"
    echo "  # Edit .env.local with your credentials"
    echo ""
    exit 1
fi

# Load environment variables
export $(grep -v '^#' .env.local | xargs)

# Check required variables
if [ -z "$R2_ACCESS_KEY_ID" ] || [ -z "$R2_SECRET_ACCESS_KEY" ] || [ -z "$R2_BUCKET_NAME" ]; then
    echo "❌ Error: Missing required environment variables"
    echo "Please check your .env.local file includes:"
    echo "  - R2_ACCESS_KEY_ID"
    echo "  - R2_SECRET_ACCESS_KEY"
    echo "  - R2_BUCKET_NAME"
    echo "  - R2_ACCOUNT_ID (or R2_ENDPOINT)"
    exit 1
fi

# Check if images directory exists
if [ ! -d "public/images" ]; then
    echo "❌ Error: public/images directory not found"
    exit 1
fi

# Count images
IMAGE_COUNT=$(find public/images -type f | wc -l)
echo "📁 Found $IMAGE_COUNT images to upload"
echo ""

# Run the upload script
node upload-images-to-r2.js
