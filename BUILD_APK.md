# Building Your Metonia APK

## Quick Start: GitHub Actions (Automated)

### Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Create a new repository called `metonia-app`
3. **Do NOT** initialize with README, .gitignore, or license

### Step 2: Push Your Code to GitHub

Run these commands in your project:

```bash
cd /Users/sunjaylama/Documents/Metanoia

# Add your GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/metonia-app.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 3: Watch the Build

1. Go to your repository on GitHub
2. Click the **"Actions"** tab
3. You'll see "Build Android APK" workflow running
4. Wait ~5-10 minutes for the build to complete

### Step 4: Download Your APK

Once the build succeeds:

1. Click the successful workflow run
2. Scroll down to "Artifacts"
3. Download `metanoia-app` (the APK file)

---

## Alternative: Immediate Build (No GitHub Needed)

If you want to build immediately without GitHub:

### Using PWA Builder (5 minutes):

1. Go to https://www.pwabuilder.com/
2. Enter app URL: `file:///Users/sunjaylama/Documents/Metanoia/dist/index.html`
3. Click "Build for Android"
4. Download the APK

### Using ApkPure Converter (Quick):

1. Host your `dist/` folder on a simple HTTP server
2. Go to https://apkpure.com/developer
3. Convert to APK

---

## Future Updates

Once set up, every time you:

1. Update your code locally
2. Run `git push`
3. GitHub automatically builds a new APK

You can then download it from Actions → Artifacts.

---

## Testing the APK

To test on Android:

1. Enable "Unknown Sources" in Android Settings
2. Transfer APK to phone
3. Install it
4. Your Todo app runs as a native app!

---

## Need Help?

If the GitHub Actions build fails:

- Check the "Actions" tab for error logs
- Ensure all files were pushed: `git push --all`
- Contact me for debugging
