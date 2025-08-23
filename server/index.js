const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const crypto = require('crypto'); // Built-in Node.js module
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? [
            process.env.FRONTEND_URL,
            'https://fooddle-jal.vercel.app',
            'https://fooddle-backend.onrender.com'
          ].filter(Boolean) // Remove undefined values
        : ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// === HEALTH CHECK ENDPOINT ===
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'Server is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// === ENDPOINT 1: CREATE PAYMENT LINK ===
app.post('/api/create-payment-link', async (req, res) => {
    try {
        const { amount, quantity, customerData } = req.body;

        // Validate required fields
        if (!amount || !quantity || !customerData) {
            return res.status(400).json({ 
                error: 'Missing required fields: amount, quantity, and customerData are required.' 
            });
        }

        // Validate amount is positive
        if (amount <= 0) {
            return res.status(400).json({ 
                error: 'Amount must be greater than 0.' 
            });
        }

        const paymentLink = await razorpay.paymentLink.create({
            amount: amount * 100, // Convert to paisa
            currency: 'INR',
            accept_partial: false,
            description: `Payment for ${quantity} Water Bottle${quantity > 1 ? 's' : ''}`,
            customer: {
                name: customerData.name,
                email: customerData.email,
                contact: customerData.phone,
            },
            notify: {
                sms: true,
                email: true,
            },
            reminder_enable: true,
            callback_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment-success`,
            callback_method: 'get',
        });

        res.status(200).json({ 
            short_url: paymentLink.short_url,
            payment_link_id: paymentLink.id 
        });

    } catch (error) {
        console.error('Error creating payment link:', error);
        res.status(500).json({ error: 'Failed to create payment link.' });
    }
});

// === ENDPOINT 2: CREATE ORDER (Without Payment - existing functionality) ===
app.post('/api/create-order', async (req, res) => {
    try {
        const { amount, quantity, customerData } = req.body;

        // Validate required fields
        if (!amount || !quantity || !customerData) {
            return res.status(400).json({ 
                error: 'Missing required fields: amount, quantity, and customerData are required.' 
            });
        }

        // For now, just return success - you can add database storage here
        const orderData = {
            orderId: 'ORDER_' + Date.now(),
            amount,
            quantity,
            customerData,
            timestamp: new Date().toISOString(),
            status: 'Order Placed'
        };

        console.log('Order created:', orderData);
        res.status(200).json({ 
            success: true, 
            message: 'Order created successfully',
            orderData 
        });

    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order.' });
    }
});

// === ENDPOINT 3: VERIFY PAYMENT ===
app.post('/api/payment-verification', (req, res) => {
    try {
        const {
            razorpay_payment_id,
            razorpay_payment_link_id,
            razorpay_payment_link_reference_id,
            razorpay_payment_link_status,
            razorpay_signature
        } = req.body;

        // The exact data that needs to be signed by your secret
        const signatureData = razorpay_payment_link_id + "|" + razorpay_payment_link_reference_id + "|" + razorpay_payment_link_status + "|" + razorpay_payment_id;

        // 1. Generate the expected signature
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(signatureData.toString())
            .digest("hex");

        // 2. Compare the signature from Razorpay with the one you generated
        if (expectedSignature === razorpay_signature) {
            // Payment is verified, everything is fine.
            console.log("SUCCESS: Payment Verified Successfully!");
            // You can now update your database, confirm the order, etc.
            res.status(200).json({ success: true, message: "Payment verified successfully" });
        } else {
            // Payment verification failed. This might be a fraudulent attempt.
            console.log("FAILURE: Payment Verification Failed!");
            res.status(400).json({ success: false, message: "Payment verification failed" });
        }
    } catch (error) {
        console.error("Internal Server Error during verification:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});