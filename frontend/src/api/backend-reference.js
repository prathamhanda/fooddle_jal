/**
 * Backend API Documentation for Razorpay Integration
 * 
 * You need to implement these endpoints on your backend server (Node.js/Express recommended)
 * 
 * Required Dependencies:
 * - razorpay: npm install razorpay
 * - crypto: Built-in Node.js module
 * - express: npm install express
 * - cors: npm install cors
 */

// Example Backend Structure (Node.js/Express)

/*
1. POST /api/payment/create-order
   - Creates a Razorpay order
   - Request Body: { amount: number (in paise), currency: 'INR', receipt: string, notes: object }
   - Response: { order_id: string, amount: number, currency: string }

2. POST /api/payment/verify
   - Verifies payment signature from Razorpay
   - Request Body: { razorpay_order_id: string, razorpay_payment_id: string, razorpay_signature: string }
   - Response: { success: boolean, message: string }

Sample Backend Code:

const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const razorpay = new Razorpay({
  key_id: 'your_razorpay_key_id',
  key_secret: 'your_razorpay_key_secret',
});

// Create Order
app.post('/api/payment/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;
    
    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt,
      notes,
    });
    
    res.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify Payment
app.post('/api/payment/verify', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", 'your_razorpay_key_secret')
      .update(sign.toString())
      .digest("hex");
    
    if (razorpay_signature === expectedSign) {
      // Save payment details to database
      res.json({ success: true, message: 'Payment verified successfully' });
    } else {
      res.json({ success: false, message: 'Payment verification failed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

*/
