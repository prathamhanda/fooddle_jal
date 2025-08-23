# Foodle-Jal - Razorpay Payment Integration with Google Sheets Storage

A React-based water bottle ordering system with integrated Razorpay payment gateway and Google Sheets/Excel-based customer data management.

## Features

- 📱 Modern, responsive UI with Tailwind CSS
- 📞 Phone number collection and validation with **automatic processing**
- 📊 **Google Sheets integration** for real-time customer data storage
- 📋 Excel sheet fallback and download functionality
- 🧮 Dynamic bottle quantity selector with real-time price calculation
- 💳 Secure Razorpay payment integration with phone number prefill
- ✅ Payment verification and status tracking
- 📥 Download customer data as Excel file
- 🎨 Beautiful UI with loading states and feedback messages
- 🚀 **One-click "Proceed" button** - no manual save required

## New Phone Number Integration

### How it works:
1. **Phone Number Collection**: Users enter phone number and click **"Proceed"**
2. **Automatic Google Sheets Storage**: Phone numbers are automatically saved to Google Sheets in real-time
3. **Excel Fallback**: If Google Sheets fails, automatically falls back to Excel download
4. **Payment Integration**: Phone number is pre-filled in Razorpay checkout
5. **Order Tracking**: Each successful order updates the customer's order count and total amount in Google Sheets
6. **Data Export**: Download complete customer database as Excel file anytime

### Customer Data Structure (Google Sheets):
- **Column A**: Phone Number
- **Column B**: Registration Date
- **Column C**: Total Orders
- **Column D**: Total Amount Spent (₹)
- **Column E**: Last Order Date

## Setup Instructions

### 1. Google Sheets API Setup

#### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Google Sheets API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

#### Step 2: Create API Key
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the API key and add it to your `.env` file

#### Step 3: Create Google Sheet
1. Create a new Google Sheet
2. Copy the Spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
   ```
3. Make the sheet **public** or **shareable with view access**
4. Add headers in first row: `Phone Number | Registration Date | Total Orders | Total Amount | Last Order Date`

#### Step 4: Configure Environment Variables
```env
# Google Sheets Configuration
VITE_GOOGLE_SHEETS_ID=your_spreadsheet_id_here
VITE_GOOGLE_API_KEY=your_api_key_here
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (includes Google Sheets API)
npm install

# Create environment file
cp .env.example .env
```

### 3. Razorpay Configuration

1. **Sign up for Razorpay**: Go to https://dashboard.razorpay.com/
2. **Get API Keys**: 
   - Go to Settings > API Keys
   - Generate Test Keys for development
   - Generate Live Keys for production
3. **Update Environment Variables**:
   ```
   VITE_RAZORPAY_KEY_ID=your_razorpay_key_id_here
   VITE_API_BASE_URL=http://localhost:5000
   ```

### 4. Running the Application

```bash
# Start frontend development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage Flow (Updated)

1. **Select Bottles**: Use the + and - buttons to select the number of water bottles
2. **View Total**: The total price updates automatically (₹20 per bottle)
3. **Proceed to Payment**: Click "Proceed to Payment" when ready
4. **Enter Phone Number**: Enter and validate phone number
5. **Auto-Save & Proceed**: Click **"Proceed"** - phone number is automatically saved to Google Sheets
6. **Complete Payment**: Razorpay checkout opens with pre-filled phone number
7. **Order Completion**: Successful payment updates customer's order history in Google Sheets
8. **Data Management**: Download Excel file anytime from header button

## Payment Flow (Updated)

1. User selects quantity and clicks "Proceed to Payment"
2. User enters phone number in the payment gateway
3. User clicks **"Proceed"** → phone number automatically saved to Google Sheets
4. Payment gateway appears with order summary and customer phone
5. Clicking "Pay Now" opens Razorpay checkout modal with pre-filled phone
6. User completes payment using various methods (Cards, UPI, Net Banking, etc.)
7. Payment is verified and customer order data is updated in Google Sheets
8. Google Sheets and Excel files are automatically updated with latest order information

## File Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── bottleSelector/        # Bottle quantity selector
│   │   ├── gateway/              # Razorpay payment gateway with phone integration
│   │   ├── Header/               # App header with Excel download button
│   │   ├── Branding/             # Branding + Enhanced PhoneInput component
│   │   └── index.js              # Component exports
│   ├── api/
│   │   ├── paymentService.js     # Google Sheets + Excel service integration
│   │   └── backend-reference.js  # Backend implementation reference
│   └── assets/                   # Images and static assets
├── .env                          # Environment variables (including Google Sheets)
└── package.json                  # Dependencies and scripts (with googleapis)
```

## Environment Variables

```env
# Razorpay Configuration
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_here

# API Configuration
VITE_API_BASE_URL=http://localhost:5000

# Google Sheets Configuration
VITE_GOOGLE_SHEETS_ID=your_google_sheets_id_here
VITE_GOOGLE_API_KEY=your_google_api_key_here
```

## Data Management

### Google Sheets Integration
- **Real-time updates**: Phone numbers and orders saved directly to Google Sheets
- **Automatic fallback**: If Google Sheets fails, Excel download is triggered
- **Collaborative access**: Multiple users can view the Google Sheet simultaneously
- **Cloud storage**: Data is safely stored in Google's cloud infrastructure

### Excel Features (Fallback)
- Automatic file naming with date: `foodle_jal_customers_YYYY-MM-DD.xlsx`
- Includes all customer data: phone, registration date, orders, amounts
- Download triggered automatically when Google Sheets is unavailable
- Manual download available via header button

### Data Privacy
- Google Sheets with controlled access
- Excel files downloaded to user's device
- No sensitive payment information stored
- Only phone numbers and order statistics tracked
- Compliant with data privacy regulations

## Development vs Production

### Development Mode
- Uses Google Sheets API for real-time storage
- Excel downloads as backup
- Mock API calls for payment testing
- Razorpay test keys for safe testing

### Production Mode
- Requires backend API implementation for enhanced security
- Google Sheets integration for real-time data
- Database integration for additional data processing
- Uses Razorpay live keys
- Real payments processed
- Secure data handling

## Phone Number Validation

- Supports Indian phone numbers (10 digits)
- Optional +91 country code
- Formats: +91XXXXXXXXXX or XXXXXXXXXX
- Real-time validation feedback
- **Automatic processing** - no manual save required

## Security Considerations

1. **Google Sheets API**: Use API keys with restricted access
2. **Never expose secret keys** in frontend code
3. **Always verify payments** on the backend
4. **Use HTTPS** in production
5. **Validate all inputs** before processing
6. **Restrict Google Sheets access** to necessary permissions only
7. **Phone number validation** prevents spam entries

## New UI/UX Features

### Enhanced Phone Input
- **"Proceed" button** instead of "Save Phone Number"
- **Automatic saving** to Google Sheets
- **Real-time processing feedback** with loading states
- **Seamless flow** from phone entry to payment
- **Error handling** with automatic Excel fallback

### Visual Improvements
- Green color scheme for "Proceed" actions
- Loading spinners during processing
- Success confirmation messages
- Automatic progress indication

## Customization

### Styling
- Uses Tailwind CSS for styling
- Color scheme: Indigo theme with green accents for actions
- Fully responsive design
- Smooth animations and transitions

### Payment Options
Razorpay supports:
- Credit/Debit Cards
- Net Banking
- UPI (with phone number for UPI ID suggestions)
- Wallets
- EMI options

## Troubleshooting

### Common Issues

1. **Google Sheets not updating**: Check API key and spreadsheet permissions
2. **Phone number not saving**: System automatically falls back to Excel download
3. **Excel download not working**: Ensure xlsx library is installed
4. **Razorpay not loading**: Check internet connection and script inclusion
5. **Payment failing**: Verify API keys and backend implementation
6. **CORS errors**: Configure backend CORS settings properly
7. **Google API errors**: Verify spreadsheet is public or properly shared

### Testing

Use Razorpay test cards for testing:
- Card Number: 4111 1111 1111 1111
- CVV: Any 3 digits
- Expiry: Any future date

Test phone numbers:
- Valid: +919876543210, 9876543210
- Invalid: 1234567890, +1234567890

## Google Sheets Setup Verification

To verify your Google Sheets integration:

1. **Create a test entry**: Enter a phone number and click "Proceed"
2. **Check Google Sheets**: Verify the data appears in your spreadsheet
3. **Test Excel fallback**: Temporarily use invalid Google Sheets credentials
4. **Verify download**: Check that Excel file downloads as fallback

## Support

For Google Sheets API help:
- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Google Cloud Console](https://console.cloud.google.com/)

For Razorpay integration help:
- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay Support](https://razorpay.com/support/)

For Excel/XLSX library:
- [SheetJS Documentation](https://docs.sheetjs.com/)

## License

This project is for educational/commercial use. Please ensure compliance with:
- Razorpay's terms of service
- Google's API usage policies
- Data privacy regulations (GDPR, etc.)
- Local data protection laws
