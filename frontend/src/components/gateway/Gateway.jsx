import React, { useState } from 'react';
import { CreditCard, Loader2, CheckCircle, XCircle, Lock, Shield, Phone } from 'lucide-react';
import { saveOrderData } from '../../api/googleSheetsService';
import { PhoneInput } from '../index';

export default function Gateway({ amount, quantity, onPaymentSuccess, onPaymentFailure }) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('');
    const [customerData, setCustomerData] = useState(null);
    const [showCustomerInput, setShowCustomerInput] = useState(true);
    const [error, setError] = useState('');

    const handleCustomerSubmit = (customerInfo) => {
        setCustomerData(customerInfo);
        setShowCustomerInput(false);
    };

    const handleSimulatePayment = async () => {
        if (amount <= 0) {
            alert('Please select at least one bottle to proceed');
            return;
        }

        setIsProcessing(true);
        setPaymentStatus('processing');
        
        // Simulate processing time
        setTimeout(async () => {
            try {
                // Update customer's order count and total amount in Google Sheets
                const orderData = {
                    customerName: customerData.name,
                    customerEmail: customerData.email,
                    customerPhone: customerData.phone,
                    quantity,
                    amount,
                    timestamp: new Date().toISOString(),
                    status: 'Order Placed'
                };

                // Only update the order count/amount since customer is already saved
                await saveOrderData(orderData);
                
                setPaymentStatus('success');
                if (onPaymentSuccess) {
                    onPaymentSuccess({
                        order_id: 'ORDER_' + Date.now(),
                        amount,
                        quantity,
                        customerData
                    });
                }
            } catch (error) {
                console.error('Error saving order:', error);
                setPaymentStatus('error');
                setError('Failed to place order. Please try again.');
                if (onPaymentFailure) onPaymentFailure('Order placement failed');
            }
            setIsProcessing(false);
        }, 2000);
    };

    // Show customer input first
    if (showCustomerInput) {
        return (
            <div className="space-y-6">
                <div className="bg-white/90 backdrop-blur-lg text-indigo-900 p-6 border border-white/20 rounded-3xl shadow-xl text-center">
                    <h3 className="text-xl font-bold text-indigo-800 mb-2">Order Summary</h3>
                    <p className="text-gray-600">
                        {quantity} Water Bottle{quantity !== 1 ? 's' : ''} - ₹{amount}
                    </p>
                </div>
                <PhoneInput onPhoneSubmit={handleCustomerSubmit} />
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
                        Place Order
                    </h2>
                    <p className="text-gray-600 text-sm">Complete your order</p>
                </div>
                
                {/* Customer Info */}
                {customerData && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl mb-6 border border-blue-100">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Customer Information:</h4>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 text-sm">Name:</span>
                                <span className="font-semibold text-indigo-800">{customerData.name}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 text-sm">Email:</span>
                                <span className="font-semibold text-indigo-800">{customerData.email}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 text-sm">Phone:</span>
                                <span className="font-semibold text-indigo-800">{customerData.phone}</span>
                            </div>
                        </div>
                        <button 
                            onClick={() => {
                                setShowCustomerInput(true);
                                setCustomerData(null);
                                setPaymentStatus('');
                                setError('');
                            }}
                            className="mt-3 text-sm text-indigo-600 hover:text-indigo-800 underline"
                        >
                            Change information?
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
                        <div className="flex justify-between items-center text-lg font-bold">
                            <span className="text-indigo-800">Total Amount:</span>
                            <span className="text-green-600">₹{amount}</span>
                        </div>
                    </div>
                </div>

                {/* Status Messages */}
                {paymentStatus === 'success' && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-4 rounded-2xl mb-6 flex items-center shadow-sm">
                        <CheckCircle className="mr-3 text-green-500" size={24} />
                        <div>
                            <div className="font-semibold">Order Placed Successfully!</div>
                            <div className="text-sm text-green-600">We'll contact you shortly for delivery details</div>
                        </div>
                    </div>
                )}

                {paymentStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-4 rounded-2xl mb-6 flex items-center shadow-sm">
                        <XCircle className="mr-3 text-red-500" size={24} />
                        <div>
                            <div className="font-semibold">Order Failed</div>
                            <div className="text-sm text-red-600">{error || 'Please try again or contact support'}</div>
                        </div>
                    </div>
                )}

                {/* Place Order Button */}
                {paymentStatus !== 'success' && (
                    <button
                        onClick={handleSimulatePayment}
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
                                <span>Processing Order...</span>
                            </>
                        ) : (
                            <>
                                <CreditCard size={20} />
                                <span>Place Order ₹{amount}</span>
                                <CheckCircle size={20} />
                            </>
                        )}
                    </button>
                )}

                {/* Info */}
                <div className="mt-6 text-center">
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-2">
                        <div className="flex items-center space-x-1">
                            <Shield size={14} />
                            <span>Secure Order</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Phone size={14} />
                            <span>Quick Contact</span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500">
                        Your order will be saved and we'll contact you for <span className="font-semibold text-blue-600">delivery arrangements</span>
                    </p>
                </div>
            </div>
        </div>
    );
}