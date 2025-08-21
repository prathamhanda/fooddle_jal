import React, { useState } from 'react';
import { CreditCard, Loader2, CheckCircle, XCircle, Lock, Shield } from 'lucide-react';
import { paymentAPI, getRazorpayKey } from '../../api/paymentService';

export default function Gateway({ amount, quantity, onPaymentSuccess, onPaymentFailure }) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('');

    // Initialize Razorpay payment
    const initiatePayment = async () => {
        if (amount <= 0) {
            alert('Please select at least one bottle to proceed with payment');
            return;
        }

        setIsProcessing(true);
        setPaymentStatus('');

        try {
            // Create order using API service
            const orderResponse = await paymentAPI.createOrder({
                amount: amount * 100, // Razorpay expects amount in paise
                currency: 'INR',
                receipt: `receipt_${Date.now()}`,
                notes: {
                    bottles: quantity,
                    product: 'Water Bottles'
                }
            });

            const { order_id, amount: orderAmount, currency } = orderResponse.data;

            // Razorpay configuration
            const options = {
                key: getRazorpayKey(),
                amount: orderAmount,
                currency: currency,
                name: 'Foodle-Jal',
                description: `Payment for ${quantity} Water Bottles`,
                order_id: order_id,
                image: '/src/assets/logo.png', // Your company logo
                handler: function (response) {
                    // Payment successful callback
                    verifyPayment(response);
                },
                prefill: {
                    name: 'Customer',
                    email: 'customer@foodle.com',
                    contact: '+91XXXXXXXXXX'
                },
                theme: {
                    color: '#4F46E5' // Indigo color matching your theme
                },
                modal: {
                    ondismiss: function() {
                        setIsProcessing(false);
                        setPaymentStatus('cancelled');
                    }
                }
            };

            // Check if Razorpay is loaded
            if (typeof window.Razorpay === 'undefined') {
                throw new Error('Razorpay SDK not loaded. Please check your internet connection.');
            }

            // Open Razorpay checkout
            const razorpay = new window.Razorpay(options);
            razorpay.open();

        } catch (error) {
            console.error('Payment initiation failed:', error);
            setIsProcessing(false);
            setPaymentStatus('error');
            if (onPaymentFailure) {
                onPaymentFailure(error);
            }
        }
    };

    // Verify payment using API service
    const verifyPayment = async (response) => {
        try {
            const verificationResponse = await paymentAPI.verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
            });

            if (verificationResponse.data.success) {
                setPaymentStatus('success');
                if (onPaymentSuccess) {
                    onPaymentSuccess(response);
                }
            } else {
                setPaymentStatus('error');
                if (onPaymentFailure) {
                    onPaymentFailure('Payment verification failed');
                }
            }
        } catch (error) {
            console.error('Payment verification failed:', error);
            setPaymentStatus('error');
            if (onPaymentFailure) {
                onPaymentFailure(error);
            }
        }
        setIsProcessing(false);
    };

    return (
        <div className="bg-white/90 backdrop-blur-lg text-indigo-900 p-8 border border-white/20 rounded-3xl shadow-2xl relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -translate-y-16 translate-x-16 opacity-40"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full translate-y-12 -translate-x-12 opacity-40"></div>
            
            <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <CreditCard className="text-white" size={32} />
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-800 bg-clip-text text-transparent mb-2">
                        Secure Payment
                    </h2>
                    <p className="text-gray-600 text-sm">Complete your order safely</p>
                </div>
                
                {/* Order Summary */}
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-2xl mb-6 border border-indigo-100">
                    <h3 className="text-lg font-semibold text-indigo-800 mb-4 flex items-center">
                        <Shield className="mr-2" size={20} />
                        Order Summary
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700">Premium Water Bottles:</span>
                            <span className="font-semibold text-indigo-800">{quantity}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700">Price per bottle:</span>
                            <span className="font-semibold text-indigo-800">₹20</span>
                        </div>
                        <hr className="border-indigo-200" />
                        <div className="flex justify-between items-center text-lg">
                            <span className="font-bold text-indigo-900">Total Amount:</span>
                            <span className="font-bold text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">₹{amount}</span>
                        </div>
                    </div>
                </div>

                {/* Payment Status */}
                {paymentStatus === 'success' && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-4 rounded-2xl mb-6 flex items-center shadow-sm">
                        <CheckCircle className="mr-3 text-green-500" size={24} />
                        <div>
                            <div className="font-semibold">Payment Successful!</div>
                            <div className="text-sm text-green-600">Your order has been confirmed</div>
                        </div>
                    </div>
                )}

                {paymentStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-4 rounded-2xl mb-6 flex items-center shadow-sm">
                        <XCircle className="mr-3 text-red-500" size={24} />
                        <div>
                            <div className="font-semibold">Payment Failed</div>
                            <div className="text-sm text-red-600">Please try again or contact support</div>
                        </div>
                    </div>
                )}

                {paymentStatus === 'cancelled' && (
                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-4 rounded-2xl mb-6 flex items-center shadow-sm">
                        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white text-sm">!</span>
                        </div>
                        <div>
                            <div className="font-semibold">Payment Cancelled</div>
                            <div className="text-sm text-yellow-600">You can try again when ready</div>
                        </div>
                    </div>
                )}

                {/* Pay Now Button */}
                <button
                    onClick={initiatePayment}
                    disabled={isProcessing || amount <= 0}
                    className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-3 ${
                        isProcessing || amount <= 0
                            ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                            : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:shadow-green-500/25 text-white'
                    }`}
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="animate-spin" size={24} />
                            <span>Processing Payment...</span>
                        </>
                    ) : (
                        <>
                            <Lock size={20} />
                            <span>Pay Securely ₹{amount}</span>
                            <CreditCard size={20} />
                        </>
                    )}
                </button>

                {/* Security badges */}
                <div className="mt-6 text-center">
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-2">
                        <div className="flex items-center space-x-1">
                            <Lock size={14} />
                            <span>SSL Encrypted</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Shield size={14} />
                            <span>Secure Payment</span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500">
                        Powered by <span className="font-semibold text-blue-600">Razorpay</span> - India's most trusted payment gateway
                    </p>
                </div>
            </div>
        </div>
    );
}