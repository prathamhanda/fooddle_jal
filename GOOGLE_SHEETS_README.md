# 📊 Google Sheets Integration

This setup automatically saves customer phone numbers and order data to Google Sheets when orders are placed through the website.

## 🚀 Setup Instructions

### 1. Deploy Google Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Create a new project
3. Replace the default code with contents from `google-apps-script.js`
4. Save the project
5. Click "Deploy" > "New deployment"
6. Choose type: "Web app"
7. Execute as: "Me"
8. Who has access: "Anyone"
9. Click "Deploy" and copy the web app URL

### 2. Configure Environment Variables

Update your `.env` file with the web app URL:
```env
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec
```

## 📁 Working Files

### Frontend Files:
- `frontend/src/api/googleSheetsService.js` - Main service for Google Sheets operations
- `frontend/src/components/Header/header.jsx` - Header with initialization button

### Google Apps Script:
- `google-apps-script.js` - Server-side script for Google Sheets operations

## 🔧 How It Works

1. **Customer places order** through the website
2. **Phone number is captured** during order flow  
3. **Data is automatically saved** to Google Sheets via Apps Script
4. **Existing customers** get their order count and total amount updated
5. **New customers** get added with their first order details

## 📊 Google Sheet Structure

| Name         | Email            | Phone Number | Registration Date | Total Orders | Total Amount | Last Order Date |
|--------------|------------------|--------------|-------------------|--------------|--------------|-----------------|
| John Doe     | john@email.com   | 919876543210 | 2025-08-23        | 2            | ₹598         | 2025-08-23      |

## ⚡ Key Features

- ✅ **Automatic data capture** during payments
- ✅ **Duplicate phone number handling** (updates existing records)
- ✅ **Real-time updates** to Google Sheets  
- ✅ **Reliable GET-based API** (no CORS issues)
- ✅ **Error handling** with fallback to localStorage

## 🧪 Testing

Use the "Initialize Sheet" button in the header to:
- Test Google Apps Script connection
- Initialize headers in your Google Sheet
- Verify the integration is working

The system will automatically start saving customer data once a payment is completed successfully.
