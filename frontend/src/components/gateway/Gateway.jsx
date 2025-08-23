import React, { useState } from 'react';
import { CreditCard, Loader2, CheckCircle, XCircle, Lock, Shield, Phone } from 'lucide-react';
// import { paymentAPI, getRazorpayKey } from '../../api/paymentService';
import { saveOrderData } from '../../api/googleSheetsService';
import { PhoneInput } from '../index';

export default function Gateway({ amount, quantity, onPaymentSuccess, onPaymentFailure }) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [showPhoneInput, setShowPhoneInput] = useState(true);
    const [error, setError] = useState(''); // Added error state

    // Remove UPI/phone input logic. Only require phone for Razorpay prefill (optional).
    const handlePhoneSubmit = (phoneNumber) => {
        setCustomerPhone(phoneNumber);
        setShowPhoneInput(false);
    };

    // UPI Deep Link Payment
    const RAZORPAY_KEY = "rzp_test_R8sIuQtWlvOfpw";

    const initiatePayment = async () => {
        if (amount <= 0) {
            alert('Please select at least one bottle to proceed with payment');
            return;
        }
        setIsProcessing(true);
        setPaymentStatus('');

        // 1. Create order on backend
        let order_id = null;
        try {
            const res = await fetch('http://localhost:5000/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount, currency: 'INR' })
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error || 'Order creation failed');
            order_id = data.order.id;
        } catch (err) {
            setError('Failed to create payment order. Please try again.');
            setIsProcessing(false);
            return;
        }

        // 2. Open Razorpay checkout with real order_id
        const options = {
            key: RAZORPAY_KEY,
            amount: amount * 100, // in paise
            currency: 'INR',
            name: 'Foodle-Jal',
            description: `Payment for ${quantity} Water Bottle${quantity !== 1 ? 's' : ''}`,
            order_id,
            handler: async function (response) {
                // 3. Verify payment with backend
                setIsProcessing(true);
                try {
                    const verifyRes = await fetch('http://localhost:5000/verify-payment', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        })
                    });
                    const verifyData = await verifyRes.json();
                    if (verifyData.success) {
                        setPaymentStatus('success');
                        if (onPaymentSuccess) onPaymentSuccess(response);
                    } else {
                        setPaymentStatus('error');
                        setError(verifyData.error || 'Payment verification failed');
                        if (onPaymentFailure) onPaymentFailure(verifyData.error);
                    }
                } catch (err) {
                    setPaymentStatus('error');
                    setError('Payment verification failed.');
                    if (onPaymentFailure) onPaymentFailure('Payment verification failed');
                }
                setIsProcessing(false);
            },
            prefill: {
                name: 'Customer',
                email: 'customer@foodle.com',
                contact: customerPhone
            },
            theme: {
                color: '#4F46E5'
            },
            modal: {
                ondismiss: function() {
                    setIsProcessing(false);
                    setPaymentStatus('cancelled');
                }
            }
        };

        if (typeof window.Razorpay === 'undefined') {
            alert('Razorpay SDK not loaded. Please check your internet connection.');
            setIsProcessing(false);
            return;
        }

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    // No server-side verification for UPI deep link. User must confirm manually.
    // No server-side verification for Razorpay test mode
    const verifyPayment = () => {};

    // Show phone input first
    // Optionally, you can skip phone input entirely and just show the payment UI
    // If you want to keep phone input for Razorpay prefill, keep the block below:
    if (showPhoneInput) {
        return (
            <div className="space-y-6">
                <div className="bg-white/90 backdrop-blur-lg text-indigo-900 p-6 border border-white/20 rounded-3xl shadow-xl text-center">
                    <h3 className="text-xl font-bold text-indigo-800 mb-2">Order Summary</h3>
                    <p className="text-gray-600">
                        {quantity} Water Bottle{quantity !== 1 ? 's' : ''} - ₹{amount}
                    </p>
                </div>
                {/* Phone Input for Razorpay prefill (optional, can remove if not needed) */}
                <PhoneInput onPhoneSubmit={handlePhoneSubmit} />
            </div>
        );
    }

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
                
                {/* Customer Info (optional, can remove if not needed) */}
                {customerPhone && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl mb-6 border border-blue-100">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-700 font-medium">Customer Phone:</span>
                            <span className="font-semibold text-indigo-800">{customerPhone}</span>
                        </div>
                        <button 
                            onClick={() => {
                                setShowPhoneInput(true);
                                setCustomerPhone('');
                            }}
                            className="mt-2 text-sm text-indigo-600 hover:text-indigo-800 underline"
                        >
                            Change phone number?
                        </button>
                    </div>
                )}
                
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
                        {/* Confirm Payment Button for Razorpay */}
                        {paymentStatus === 'pending' && (
                            <button
                                onClick={verifyPayment}
                                className="w-full mt-4 py-3 px-6 rounded-2xl font-semibold text-lg bg-gradient-to-r from-indigo-500 to-blue-600 text-white hover:from-indigo-600 hover:to-blue-700 transition-all duration-300"
                            >
                                I have completed the payment
                            </button>
                        )}
                    </div>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-4 rounded-2xl mb-6 flex items-center shadow-sm">
                        <XCircle className="mr-3 text-red-500" size={24} />
                        <div>
                            <div className="font-semibold">Error</div>
                            <div className="text-sm text-red-600">{error}</div>
                        </div>
                    </div>
                )}
                            <p className="text-sm text-gray-500">
                                Powered by <span className="font-semibold text-blue-600">Razorpay</span> - India's most trusted payment gateway
                            </p>
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-4 rounded-2xl mb-6 flex items-center shadow-sm">
                        <CheckCircle className="mr-3 text-green-500" size={24} />
                        <div>
                            <div className="font-semibold">Payment Successful!</div>
                            <div className="text-sm text-green-600">Your order has been confirmed</div>
                        </div>
                    </div>
                

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
                            <span>Opening Razorpay...</span>
                        </>
                    ) : (
                        <>
                            <Lock size={20} />
                            <span>Pay Securely ₹{amount}</span>
                            <CreditCard size={20} />
                        </>
                    )}
                </button>
                {/* Confirm Payment Button for UPI */}
                {paymentStatus === 'pending' && (
                    <button
                        onClick={verifyPayment}
                        className="w-full mt-4 py-3 px-6 rounded-2xl font-semibold text-lg bg-gradient-to-r from-indigo-500 to-blue-600 text-white hover:from-indigo-600 hover:to-blue-700 transition-all duration-300"
                    >
                        I have completed the payment
                    </button>
                )}

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
                        Powered by <span className="font-semibold text-blue-600">UPI</span> - India's trusted payment system
                    </p>
                </div>
            </div>
        </div>
    );
}