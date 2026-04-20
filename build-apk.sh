ls ~/Library/Android/sdk/cmdline-tools/latest/bin/#!/bin/bash

# Metonia APK Build Script
# This script automates the APK building process

set -e

# Set Gradle from Android Studio FIRST
export GRADLE_HOME="/Applications/Android Studio.app/Contents/gradle/gradle-8.9"
export PATH=$GRADLE_HOME/bin:$PATH
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export ANDROID_HOME=$HOME/Library/Android/sdk

echo "🚀 Starting Metonia APK Build..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this script from the Metanoia project root."
    exit 1
fi

# Step 1: Build React app
echo -e "${BLUE}Step 1: Building React app...${NC}"
npm run build
echo -e "${GREEN}✓ React app built successfully${NC}"
echo ""

# Step 2: Check if Cordova is installed globally
echo -e "${BLUE}Step 2: Checking Cordova...${NC}"
if ! command -v cordova &> /dev/null; then
    echo "Installing Cordova globally..."
    npm install -g cordova
fi
echo -e "${GREEN}✓ Cordova is available${NC}"
echo ""

# Step 3: Create/update Cordova project
CORDOVA_DIR="../MetanoiaApp"
if [ -d "$CORDOVA_DIR" ]; then
    echo -e "${BLUE}Step 3: Updating existing Cordova project...${NC}"
    cd "$CORDOVA_DIR"
else
    echo -e "${BLUE}Step 3: Creating new Cordova project...${NC}"
    cd ..
    cordova create MetanoiaApp com.metanoia.app Metanoia
    cd MetanoiaApp
fi
echo -e "${GREEN}✓ Cordova project ready${NC}"
echo ""

# Step 4: Add Android platform if not already there
echo -e "${BLUE}Step 4: Setting up Android platform...${NC}"
if [ ! -d "platforms/android" ]; then
    cordova platform add android
else
    echo "Android platform already exists"
fi
echo -e "${GREEN}✓ Android platform ready${NC}"
echo ""

# Step 5: Copy built app
echo -e "${BLUE}Step 5: Copying built app to Cordova...${NC}"
rm -rf www/* || true
cp -r ../Metanoia/dist/* www/
echo -e "${GREEN}✓ App copied${NC}"
echo ""

# Step 6: Build APK
echo -e "${BLUE}Step 6: Building debug APK (no signing required)...${NC}"
echo -e "${YELLOW}Note: Debug APK is unsigned and can be installed directly on any device${NC}"
cordova build android
echo -e "${GREEN}✓ APK built successfully!${NC}"
echo ""

# Step 7: Show APK location
APK_PATH=$(find platforms/android/app/build/outputs/apk -name "*.apk" -type f 2>/dev/null | grep -i debug | head -1)
if [ -z "$APK_PATH" ]; then
  APK_PATH=$(find platforms/android/app/build/outputs/apk -name "*.apk" -type f 2>/dev/null | head -1)
fi

if [ -f "$APK_PATH" ]; then
    # Copy and rename APK
    cp "$APK_PATH" "Metanoia.apk"
    
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}✅ APK built successfully!${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${YELLOW}APK Location:${NC}"
    echo "$PWD/Metanoia.apk"
    echo ""
    echo -e "${YELLOW}File Size:${NC}"
    du -h "Metanoia.apk"
    echo ""
    echo -e "${YELLOW}Installation Instructions:${NC}"
    echo "1. Transfer APK to your Android device"
    echo "2. Enable 'Unknown Sources' in device settings"
    echo "3. Open file manager and install the APK"
    echo "4. Open 'Metanoia' app on your device"
    echo ""
    echo -e "${GREEN}✓ Your app is ready to install!${NC}"
else
    echo -e "${YELLOW}⚠️  APK file not found${NC}"
    echo "Build output should be in: platforms/android/app/build/outputs/apk/"
    echo "Check the build output above for errors"
    exit 1
fi
