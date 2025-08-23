# Pre-Deployment Checklist

## Backend Preparation ✅
- [ ] Razorpay credentials are ready (Key ID and Secret)
- [ ] Environment variables are configured in `.env` file
- [ ] Package.json has correct start script
- [ ] CORS is configured for production
- [ ] Health check endpoint is working
- [ ] All dependencies are listed in package.json

## Frontend Preparation ✅
- [ ] API base URL is configurable via environment variable
- [ ] Build command works locally (`npm run build`)
- [ ] All environment variables are identified
- [ ] React Router is properly configured
- [ ] All imports are correct (case-sensitive)

## Render Deployment (Backend)
- [ ] Create Render account
- [ ] Connect GitHub repository
- [ ] Set root directory to `server`
- [ ] Configure build command: `npm install`
- [ ] Configure start command: `npm start`
- [ ] Add environment variables:
  - [ ] `NODE_ENV=production`
  - [ ] `RAZORPAY_KEY_ID=your_key`
  - [ ] `RAZORPAY_KEY_SECRET=your_secret`
  - [ ] `FRONTEND_URL=your_vercel_url`
  - [ ] `PORT=10000`
- [ ] Deploy and note the URL

## Vercel Deployment (Frontend)
- [ ] Create Vercel account
- [ ] Connect GitHub repository
- [ ] Set root directory to `frontend`
- [ ] Configure framework preset: Vite
- [ ] Configure build command: `npm run build`
- [ ] Configure output directory: `dist`
- [ ] Add environment variables:
  - [ ] `VITE_API_BASE_URL=your_render_url`
  - [ ] `VITE_GOOGLE_SHEETS_ID=your_sheets_id`
  - [ ] `VITE_GOOGLE_API_KEY=your_api_key`
  - [ ] `VITE_GOOGLE_APPS_SCRIPT_URL=your_script_url`
- [ ] Deploy and note the URL

## Post-Deployment
- [ ] Update backend's `FRONTEND_URL` with Vercel URL
- [ ] Test health endpoint
- [ ] Test frontend loads correctly
- [ ] Test API communication
- [ ] Test Razorpay payment flow
- [ ] Test simple order flow
- [ ] Test payment success page

## Testing URLs
- Frontend: https://your-project.vercel.app
- Backend Health: https://your-backend.onrender.com/api/health
- Payment Link Test: POST to https://your-backend.onrender.com/api/create-payment-link
