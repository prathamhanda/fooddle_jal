// Simple Express backend for Razorpay integration
const express = require('express');
const Razorpay = require('razorpay');
// const crypto = require('crypto');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
app.use(express.json());
app.use(cors());


const RAZORPAY_KEY_ID = 'YOUR-RAZORPAY-KEY-ID';
const RAZORPAY_KEY_SECRET = 'YOUR-RAZORPAY-KEY-SECRET';

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

// Create order endpoint
app.post('/create-order', async (req, res) => {
  const { amount, currency = 'INR', receipt = 'receipt_' + Date.now() } = req.body;
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // amount in paise
      currency,
      receipt,
    });
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Verify payment endpoint
app.post('/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const hmac = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET);
  hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
  const generated_signature = hmac.digest('hex');
  if (generated_signature === razorpay_signature) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, error: 'Signature mismatch' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Razorpay backend running on port', PORT);
});
