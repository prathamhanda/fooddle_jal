import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowLeft, Home, RefreshCw, AlertCircle } from 'lucide-react';
import axios from 'axios';

const PaymentSuccess = () => {
    const [verificationStatus, setVerificationStatus] = useState('verifying');
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                // Extract payment details from URL query parameters
                const urlParams = new URLSearchParams(window.location.search);
                const paymentData = {
                    razorpay_payment_id: urlParams.get('razorpay_payment_id'),
                    razorpay_payment_link_id: urlParams.get('razorpay_payment_link_id'),
                    razorpay_payment_link_reference_id: urlParams.get('razorpay_payment_link_reference_id'),
                    razorpay_payment_link_status: urlParams.get('razorpay_payment_link_status'),
                    razorpay_signature: urlParams.get('razorpay_signature')
                };

                setPaymentDetails(paymentData);

                // Verify payment with backend
                const response = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/api/payment-verification`, 
                    paymentData
                );

                if (response.data.success) {
                    setVerificationStatus('success');
                } else {
                    setVerificationStatus('failed');
                    setError('Payment verification failed. Please contact support.');
                }
            } catch (error) {
                console.error('Verification API call failed:', error);
                setVerificationStatus('failed');
                setError('An error occurred during verification. Please contact support.');
            }
        };

        verifyPayment();
    }, []);

    const goHome = () => {
        window.location.href = '/';
    };

    const retryVerification = () => {
        setVerificationStatus('verifying');
        setError('');
        // Re-run verification after a short delay
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="bg-white/90 backdrop-blur-lg text-indigo-900 p-8 border border-white/20 rounded-3xl shadow-2xl relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -translate-y-16 translate-x-16 opacity-40"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full translate-y-12 -translate-x-12 opacity-40"></div>
                    
                    <div className="relative z-10 text-center">
                        {verificationStatus === 'verifying' && (
                            <>
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <RefreshCw className="text-white animate-spin" size={32} />
                                </div>
                                <h1 className="text-3xl font-bold text-indigo-800 mb-4">
                                    Verifying Payment
                                </h1>
                                <p className="text-gray-600 mb-6">
                                    Please wait while we verify your payment...
                                </p>
                                <div className="flex justify-center">
                                    <div className="animate-pulse flex space-x-1">
                                        <div className="w-3 h-3 bg-indigo-400 rounded-full"></div>
                                        <div className="w-3 h-3 bg-indigo-400 rounded-full"></div>
                                        <div className="w-3 h-3 bg-indigo-400 rounded-full"></div>
                                    </div>
                                </div>
                            </>
                        )}

                        {verificationStatus === 'success' && (
                            <>
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <CheckCircle className="text-white" size={32} />
                                </div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-800 bg-clip-text text-transparent mb-4">
                                    Payment Successful!
                                </h1>
                                <p className="text-gray-600 mb-6">
                                    Thank you for your purchase. Your order has been confirmed and you'll receive a confirmation shortly.
                                </p>
                                
                                {paymentDetails?.razorpay_payment_id && (
                                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl mb-6 border border-green-100">
                                        <p className="text-sm text-gray-600 mb-2">Payment ID:</p>
                                        <p className="font-mono text-sm text-green-700 bg-white/60 px-3 py-2 rounded-lg">
                                            {paymentDetails.razorpay_payment_id}
                                        </p>
                                    </div>
                                )}
                                
                                <button
                                    onClick={goHome}
                                    className="w-full py-4 px-6 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-2"
                                >
                                    <Home size={20} />
                                    <span>Continue Shopping</span>
                                </button>
                            </>
                        )}

                        {verificationStatus === 'failed' && (
                            <>
                                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <AlertCircle className="text-white" size={32} />
                                </div>
                                <h1 className="text-3xl font-bold text-red-600 mb-4">
                                    Verification Failed
                                </h1>
                                <p className="text-gray-600 mb-6">
                                    {error || 'We couldn\'t verify your payment. Please contact our support team.'}
                                </p>
                                
                                <div className="space-y-3">
                                    <button
                                        onClick={retryVerification}
                                        className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-2"
                                    >
                                        <RefreshCw size={18} />
                                        <span>Retry Verification</span>
                                    </button>
                                    
                                    <button
                                        onClick={goHome}
                                        className="w-full py-3 px-6 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-2"
                                    >
                                        <ArrowLeft size={18} />
                                        <span>Go Back</span>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
