#!/bin/bash

# Fooddle Deployment Preparation Script
echo "🚀 Preparing Fooddle for deployment..."

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check dependencies
if ! command_exists git; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Test backend build
echo "🔧 Testing backend..."
cd server
if [ ! -f ".env" ]; then
    echo "⚠️  Backend .env file not found!"
    echo "Please create server/.env with your Razorpay credentials"
    echo "Required variables:"
    echo "  RAZORPAY_KEY_ID=your_key_here"
    echo "  RAZORPAY_KEY_SECRET=your_secret_here"
    echo "  FRONTEND_URL=http://localhost:5173"
    echo "  PORT=5000"
    exit 1
fi

# Install backend dependencies
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

echo "✅ Backend ready for deployment"

# Test frontend build
echo "🔧 Testing frontend build..."
cd ../frontend

# Install frontend dependencies
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Test build
echo "🔨 Testing frontend build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Frontend build successful"
    rm -rf dist  # Clean up test build
else
    echo "❌ Frontend build failed. Please fix errors before deployment."
    exit 1
fi

# Git status check
cd ..
echo "📝 Checking git status..."
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  You have uncommitted changes. Commit them before deployment:"
    git status --short
    echo ""
    echo "Run these commands to commit your changes:"
    echo "  git add ."
    echo "  git commit -m 'Prepare for deployment'"
    echo "  git push origin main"
else
    echo "✅ Git repository is clean"
fi

echo ""
echo "🎉 Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Follow the DEPLOYMENT_GUIDE.md for detailed instructions"
echo "2. Deploy backend on Render: https://render.com"
echo "3. Deploy frontend on Vercel: https://vercel.com"
echo "4. Update environment variables with production URLs"
echo ""
echo "Need help? Check DEPLOYMENT_CHECKLIST.md for a step-by-step guide."
