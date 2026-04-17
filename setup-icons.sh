#!/bin/bash

# Create app icons from SVG to PNG
# This generates properly sized icons for Android

set -e

# Colors
BLUE='\033[0;34m'
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${BLUE}Generating app icons...${NC}"

# Create res directory for icons
mkdir -p res/icon/android

# Use ImageMagick to convert SVG to PNG if available
# Otherwise, we'll use a simple fallback

if command -v convert &> /dev/null; then
    echo "Using ImageMagick to convert icons..."
    # High DPI icon (192x192)
    convert -background white -flatten -density 192 public/icons.svg -resize 192x192 res/icon/android/icon-192.png 2>/dev/null || true
    # Ultra High DPI icon (512x512)
    convert -background white -flatten -density 512 public/icons.svg -resize 512x512 res/icon/android/icon-512.png 2>/dev/null || true
else
    echo -e "${BLUE}ImageMagick not found. Using fallback icons...${NC}"
    
    # Create a simple SVG-based icon fallback using inline SVG
    # We'll copy the existing SVG and let Android handle it
    cp public/icons.svg res/icon/android/icon.svg 2>/dev/null || true
fi

echo -e "${GREEN}✓ Icons prepared${NC}"
