# Fooddle Deployment Guide

This guide will help you deploy the Fooddle application with the frontend on Vercel and the backend on Render.

## Prerequisites

- GitHub account
- Vercel account (free)
- Render account (free)
- Your Razorpay credentials (Key ID and Secret)

## Step 1: Deploy Backend on Render

### 1.1 Push your code to GitHub
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 1.2 Deploy on Render
1. Go to [render.com](https://render.com) and sign in
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the `fooddle_jal` repository
5. Configure the deployment:
   - **Name**: `fooddle-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 1.3 Set Environment Variables on Render
In the Render dashboard, go to your service → Environment tab and add:
- `NODE_ENV` = `production`
- `RAZORPAY_KEY_ID` = `your_razorpay_key_id`
- `RAZORPAY_KEY_SECRET` = `your_razorpay_secret_key`
- `FRONTEND_URL` = `https://your-frontend-domain.vercel.app` (you'll get this after frontend deployment)
- `PORT` = `10000` (Render default)

### 1.4 Deploy
Click "Create Web Service" and wait for deployment to complete.
Note down your backend URL (e.g., `https://fooddle-backend.onrender.com`)

## Step 2: Deploy Frontend on Vercel

### 2.1 Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure the deployment:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 2.2 Set Environment Variables on Vercel
In the Vercel dashboard, go to your project → Settings → Environment Variables and add:
- `VITE_API_BASE_URL` = `https://your-backend-url.onrender.com` (from Step 1.4)
- `VITE_GOOGLE_SHEETS_ID` = `your_google_sheets_id`
- `VITE_GOOGLE_API_KEY` = `your_google_api_key`
- `VITE_GOOGLE_APPS_SCRIPT_URL` = `your_google_apps_script_url`

### 2.3 Deploy
Click "Deploy" and wait for deployment to complete.
Note down your frontend URL.

## Step 3: Update Backend with Frontend URL

1. Go back to Render dashboard
2. Update the `FRONTEND_URL` environment variable with your Vercel URL
3. Redeploy the backend service

## Step 4: Test Your Deployment

1. Visit your Vercel frontend URL
2. Test the application:
   - Add bottles to cart
   - Fill customer information
   - Try both payment methods (Razorpay and Simple Order)
3. Check the backend health endpoint: `https://your-backend-url.onrender.com/api/health`

## Troubleshooting

### Backend Issues
- Check Render logs for any startup errors
- Ensure all environment variables are set correctly
- Verify Razorpay credentials

### Frontend Issues
- Check Vercel deployment logs
- Ensure `VITE_API_BASE_URL` points to your Render backend
- Test API connectivity in browser console

### CORS Issues
If you get CORS errors:
1. Ensure `FRONTEND_URL` in backend matches your Vercel domain exactly
2. Check that both HTTP and HTTPS are handled correctly

## URLs After Deployment
- Frontend: `https://your-project-name.vercel.app`
- Backend: `https://your-service-name.onrender.com`
- API Health Check: `https://your-service-name.onrender.com/api/health`

## Notes
- Render free tier may have cold starts (first request after inactivity takes longer)
- Both platforms offer automatic deployments when you push to GitHub
- Keep your Razorpay credentials secure and never commit them to version control
