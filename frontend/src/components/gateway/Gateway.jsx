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

    const handlePhoneSubmit = async (phoneNumber) => {
        try {
            setIsProcessing(true);
            setError('');
            console.log('🔄 Gateway: Processing phone number submission for:', phoneNumber);
            
            // Validate phone number
            if (!phoneNumber || phoneNumber.length < 10) {
                throw new Error('Please enter a valid phone number');
            }
            
            console.log('📞 Gateway: Phone number validated:', phoneNumber);
            console.log('💾 Gateway: Saving order data to Google Sheets immediately...', {
                phoneNumber: phoneNumber,
                amount: amount,
                quantity: quantity
            });
            
            // Save order data to Google Sheets immediately when user clicks Proceed
            const saveResult = await saveOrderData({
                phoneNumber: phoneNumber,
                amount: amount
            });
            
            if (saveResult.success) {
                console.log('✅ Gateway: Order data saved to Google Sheets successfully');
            } else {
                console.warn('⚠️ Gateway: Google Sheets save failed:', saveResult.error);
                // Don't block the user flow due to Google Sheets issue, but show a warning
                setError('Data save warning: Your order will be processed, but there was an issue saving to our records.');
            }
            
            // Store phone number and proceed to payment
            setCustomerPhone(phoneNumber);
            setShowPhoneInput(false);
            console.log('✅ Gateway: Phone number stored and data saved, ready for payment');
            
        } catch (error) {
            console.error('❌ Gateway: Error in handlePhoneSubmit:', error);
            setError(`Error: ${error.message}. Please try again.`);
        } finally {
            setIsProcessing(false);
        }
    };

    // UPI Deep Link Payment
    const upiVPA = "prathamhanda10@okhdfcbank"; // TODO: Replace with your UPI ID
    const upiName = "Fooddle";
    const upiNote = `Payment for ${quantity} Water Bottle${quantity !== 1 ? 's' : ''}`;

    const initiatePayment = () => {
        if (amount <= 0) {
            alert('Please select at least one bottle to proceed with payment');
            return;
        }
        setIsProcessing(true);
        setPaymentStatus('');

        // Construct UPI deep link
        const upiUrl = `upi://pay?pa=${encodeURIComponent(upiVPA)}&pn=${encodeURIComponent(upiName)}&am=${encodeURIComponent(amount)}&cu=INR&tn=${encodeURIComponent(upiNote)}`;
        window.location.href = upiUrl;
        // Optionally, you can also show a QR code for desktop users
        setTimeout(() => {
            setIsProcessing(false);
            setPaymentStatus('pending');
        }, 2000);
    };

    // No server-side verification for UPI deep link. User must confirm manually.
    const verifyPayment = () => {
        setPaymentStatus('success');
        if (onPaymentSuccess) {
            onPaymentSuccess();
        }
    };

    // Show phone input first
    if (showPhoneInput) {
        return (
            <div className="space-y-6">
                {/* Order Summary Header */}
                <div className="bg-white/90 backdrop-blur-lg text-indigo-900 p-6 border border-white/20 rounded-3xl shadow-xl text-center">
                    <h3 className="text-xl font-bold text-indigo-800 mb-2">Order Summary</h3>
                    <p className="text-gray-600">
                        {quantity} Water Bottle{quantity !== 1 ? 's' : ''} - ₹{amount}
                    </p>
                </div>

                {/* Phone Input */}
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
                
                {/* Customer Info */}
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
                    disabled={isProcessing || amount <= 0 || !customerPhone}
                    className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-3 ${
                        isProcessing || amount <= 0 || !customerPhone
                            ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                            : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:shadow-green-500/25 text-white'
                    }`}
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="animate-spin" size={24} />
                            <span>Opening UPI App...</span>
                        </>
                    ) : (
                        <>
                            <Lock size={20} />
                            <span>Pay via UPI ₹{amount}</span>
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