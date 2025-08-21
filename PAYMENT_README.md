# Foodle-Jal - Razorpay Payment Integration

A React-based water bottle ordering system with integrated Razorpay payment gateway.

## Features

- 📱 Modern, responsive UI with Tailwind CSS
- 🧮 Dynamic bottle quantity selector with real-time price calculation
- 💳 Secure Razorpay payment integration
- ✅ Payment verification and status tracking
- 🎨 Beautiful UI with loading states and feedback messages

## Setup Instructions

### 1. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### 2. Razorpay Configuration

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

### 3. Backend Setup (Required for Production)

The frontend currently uses mock API calls. For production, you need to implement the backend:

```bash
# Create backend directory
mkdir ../backend
cd ../backend

# Initialize Node.js project
npm init -y

# Install dependencies
npm install express razorpay crypto cors dotenv
```

Create the backend server based on the reference in `src/api/backend-reference.js`.

### 4. Running the Application

```bash
# Start frontend development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

1. **Select Bottles**: Use the + and - buttons to select the number of water bottles
2. **View Total**: The total price updates automatically (₹20 per bottle)
3. **Proceed to Payment**: Click "Proceed to Payment" when ready
4. **Complete Payment**: Use the Razorpay payment gateway to complete the transaction

## Payment Flow

1. User selects quantity and clicks "Proceed to Payment"
2. Payment gateway component appears with order summary
3. Clicking "Pay Now" opens Razorpay checkout modal
4. User completes payment using various methods (Cards, UPI, Net Banking, etc.)
5. Payment is verified and user receives confirmation

## File Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── bottleSelector/        # Bottle quantity selector
│   │   ├── gateway/              # Razorpay payment gateway
│   │   ├── Header/               # App header with logo
│   │   └── Branding/             # Branding component
│   ├── api/
│   │   ├── paymentService.js     # API service for payments
│   │   └── backend-reference.js  # Backend implementation reference
│   └── assets/                   # Images and static assets
├── .env                          # Environment variables
└── package.json                  # Dependencies and scripts
```

## Environment Variables

```env
# Razorpay Configuration
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_here

# API Configuration
VITE_API_BASE_URL=http://localhost:5000
```

## Development vs Production

### Development Mode
- Uses mock API calls for testing
- Razorpay test keys for safe testing
- No actual payments processed

### Production Mode
- Requires backend API implementation
- Uses Razorpay live keys
- Real payments processed

## Security Considerations

1. **Never expose secret keys** in frontend code
2. **Always verify payments** on the backend
3. **Use HTTPS** in production
4. **Validate all inputs** before processing
5. **Store sensitive data** only on backend

## Customization

### Styling
- Uses Tailwind CSS for styling
- Color scheme: Indigo theme
- Fully responsive design

### Payment Options
Razorpay supports:
- Credit/Debit Cards
- Net Banking
- UPI
- Wallets
- EMI options

## Troubleshooting

### Common Issues

1. **Razorpay not loading**: Check internet connection and script inclusion
2. **Payment failing**: Verify API keys and backend implementation
3. **CORS errors**: Configure backend CORS settings properly

### Testing

Use Razorpay test cards for testing:
- Card Number: 4111 1111 1111 1111
- CVV: Any 3 digits
- Expiry: Any future date

## Support

For Razorpay integration help:
- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay Support](https://razorpay.com/support/)

## License

This project is for educational/commercial use. Please ensure compliance with Razorpay's terms of service.
