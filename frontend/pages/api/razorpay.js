const Razorpay = require('razorpay');
const crypto = require('crypto');

const RAZORPAY_KEY_ID = 'rzp_test_R8sIuQtWlvOfpw';
const RAZORPAY_KEY_SECRET = '7wL278DHT0YUmPNycst5z6VF';

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

module.exports = async function handler(req, res) {
  if (req.method === 'POST') {
    const { action } = req.query;
    if (action === 'create-order') {
      const { amount, currency = 'INR', receipt = 'receipt_' + Date.now() } = req.body;
      try {
        const order = await razorpay.orders.create({
          amount: amount * 100,
          currency,
          receipt,
        });
        res.status(200).json({ success: true, order });
      } catch (err) {
        res.status(500).json({ success: false, error: err.message });
      }
    } else if (action === 'verify-payment') {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      const hmac = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET);
      hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
      const generated_signature = hmac.digest('hex');
      if (generated_signature === razorpay_signature) {
        // Fetch payment details from Razorpay
        try {
          const payment = await razorpay.payments.fetch(razorpay_payment_id);
          if (payment.status === 'captured') {
            res.status(200).json({ success: true });
          } else {
            res.status(400).json({ success: false, error: 'Payment not captured', payment_status: payment.status });
          }
        } catch (err) {
          res.status(500).json({ success: false, error: 'Failed to fetch payment details', details: err.message });
        }
      } else {
        res.status(400).json({ success: false, error: 'Signature mismatch' });
      }
    } else {
      res.status(400).json({ success: false, error: 'Invalid action' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
