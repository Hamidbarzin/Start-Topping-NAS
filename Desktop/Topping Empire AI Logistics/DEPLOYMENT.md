# Deployment Guide (Render)

## 🚀 Manual Configuration (Recommended)

**DO NOT use render.yaml** - Configure manually in Render Dashboard:

1. Go to [Render Dashboard](https://render.com)
2. Click **New → Web Service**
3. Connect your repo: `Hamidbarzin/Topping_Empire_AI-Logistics`
4. **Manual Configuration:**
   - **Root Directory**: `.` (leave empty or put `.`)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Node Version**: `20` (or leave default)

5. Click **Create Web Service**
6. Wait for build to finish

## 🌐 Live URL
https://topping-empire-ai-logistics.onrender.com

## ✅ Expected Result
- Build should complete successfully
- App will be live at the URL above
- All pages accessible: `/`, `/coach`, `/test-xai`, etc.

## 🔧 Troubleshooting
If build fails:
1. Check Root Directory is set to `.` (not `src/` or empty)
2. Ensure package.json is in root directory
3. Verify Node version compatibility
