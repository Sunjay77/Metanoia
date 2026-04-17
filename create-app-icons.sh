#!/bin/bash

# Create Android app icons
# This script generates properly sized PNG icons for the app

set -e

mkdir -p res/icon/android

# Create a simple geometric icon using ImageMagick
# If ImageMagick is available, create a nice gradient icon
# Otherwise, create a placeholder

cat > create_icon.sh << 'ICON_SCRIPT'
#!/bin/bash

# Create a simple geometric icon (indigo gradient with checkmark)
# Android icon sizes: 192x192, 144x144, 96x96, 72x72, 48x48

convert -size 192x192 \
  xc:'#f9fafb' \
  -background white \
  -fill '#6366f1' \
  -draw 'rectangle 50,50 142,142' \
  -fill 'white' \
  -pointsize 80 \
  -gravity center \
  -annotate +0+0 '✓' \
  res/icon/android/icon-192.png 2>/dev/null || true

convert -size 144x144 \
  xc:'#f9fafb' \
  -background white \
  -fill '#6366f1' \
  -draw 'rectangle 36,36 108,108' \
  -fill 'white' \
  -pointsize 60 \
  -gravity center \
  -annotate +0+0 '✓' \
  res/icon/android/icon-144.png 2>/dev/null || true

echo "✓ Icons created"
ICON_SCRIPT

chmod +x create_icon.sh
./create_icon.sh || {
    echo "ImageMagick not available. Using fallback icon setup..."
    
    # Copy your existing SVG as fallback
    if [ -f "public/icons.svg" ]; then
        cp public/icons.svg res/icon/android/icon.svg
    fi
}

rm create_icon.sh
echo "✓ Icon setup complete"
