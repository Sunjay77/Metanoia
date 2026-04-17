#!/bin/bash

# Generate a simple PNG icon for the app using ImageMagick
# This creates a professional-looking app icon

echo "Creating Metanoia app icon..."

# Create icon directory
mkdir -p public/icons

# Create different sizes for Android
# Android requires icons at: 192x192 (xxhdpi), 144x144 (xhdpi), 96x96 (hdpi), 72x72 (mdpi), 48x48 (ldpi)

# Using ImageMagick if available
if command -v convert &> /dev/null; then
    # Create a simple icon with gradient background and checkmark
    
    # 192x192 - High DPI
    convert -size 192x192 \
      xc:'#6366f1' \
      -fill 'white' \
      -pointsize 100 \
      -gravity center \
      -annotate +0+0 '✓' \
      -quality 95 \
      public/icons/metanoia-192.png 2>/dev/null && echo "✓ Created 192x192 icon" || echo "✗ Failed to create 192x192 icon"
    
    # 144x144 - XHigh DPI
    convert -size 144x144 \
      xc:'#6366f1' \
      -fill 'white' \
      -pointsize 75 \
      -gravity center \
      -annotate +0+0 '✓' \
      -quality 95 \
      public/icons/metanoia-144.png 2>/dev/null && echo "✓ Created 144x144 icon" || echo "✗ Failed to create 144x144 icon"
    
    # 96x96 - High DPI
    convert -size 96x96 \
      xc:'#6366f1' \
      -fill 'white' \
      -pointsize 48 \
      -gravity center \
      -annotate +0+0 '✓' \
      -quality 95 \
      public/icons/metanoia-96.png 2>/dev/null && echo "✓ Created 96x96 icon" || echo "✗ Failed to create 96x96 icon"
    
    echo "✓ All icons created successfully!"
else
    echo "ImageMagick (convert) not found."
    echo "Install it with: brew install imagemagick"
    echo "Then run this script again."
    exit 1
fi
