@echo off
echo 🚀 Preparing Fooddle for deployment...

REM Check dependencies
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git is not installed. Please install Git first.
    pause
    exit /b 1
)

node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed

REM Test backend
echo 🔧 Testing backend...
cd server

if not exist ".env" (
    echo ⚠️  Backend .env file not found!
    echo Please create server\.env with your Razorpay credentials
    echo Required variables:
    echo   RAZORPAY_KEY_ID=your_key_here
    echo   RAZORPAY_KEY_SECRET=your_secret_here
    echo   FRONTEND_URL=http://localhost:5173
    echo   PORT=5000
    pause
    exit /b 1
)

REM Install backend dependencies
if not exist "node_modules" (
    echo 📦 Installing backend dependencies...
    npm install
)

echo ✅ Backend ready for deployment

REM Test frontend build
echo 🔧 Testing frontend build...
cd ..\frontend

REM Install frontend dependencies
if not exist "node_modules" (
    echo 📦 Installing frontend dependencies...
    npm install
)

REM Test build
echo 🔨 Testing frontend build...
npm run build

if errorlevel 1 (
    echo ❌ Frontend build failed. Please fix errors before deployment.
    pause
    exit /b 1
) else (
    echo ✅ Frontend build successful
    if exist "dist" rmdir /s /q dist
)

REM Git status check
cd ..
echo 📝 Checking git status...
git status --porcelain > nul
if not errorlevel 1 (
    echo ⚠️  You have uncommitted changes. Commit them before deployment:
    git status --short
    echo.
    echo Run these commands to commit your changes:
    echo   git add .
    echo   git commit -m "Prepare for deployment"
    echo   git push origin main
) else (
    echo ✅ Git repository is clean
)

echo.
echo 🎉 Deployment preparation complete!
echo.
echo Next steps:
echo 1. Follow the DEPLOYMENT_GUIDE.md for detailed instructions
echo 2. Deploy backend on Render: https://render.com
echo 3. Deploy frontend on Vercel: https://vercel.com
echo 4. Update environment variables with production URLs
echo.
echo Need help? Check DEPLOYMENT_CHECKLIST.md for a step-by-step guide.
pause
