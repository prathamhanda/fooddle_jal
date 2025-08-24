import { useCallback, useEffect, useState } from 'react';
import { Minus, Plus, ShoppingCart, Droplets } from 'lucide-react';
import Gateway from '../gateway/Gateway';

export default function BottleSelector(){
    const [input,setInput] = useState(0);
    const [price,setPrice] = useState(0);
    const [showPayment, setShowPayment] = useState(false);

    const adder = () => {
        setInput(input + 1)
    }

    const subtracter = () => {
        if(input > 0) setInput(input - 1)
    }

    const PriceCalculator = useCallback((cost = 21) => {
        setPrice(cost*input)
    },[input,setPrice])

    useEffect(()=>{PriceCalculator()},[input])

    const handlePaymentSuccess = (response) => {
        console.log('Payment successful:', response);
        alert(`Payment successful! Order placed for ${input} bottles.`);
        // Reset after successful payment
        setInput(0);
        setShowPayment(false);
    };

    const handlePaymentFailure = (error) => {
        console.error('Payment failed:', error);
        alert('Payment failed. Please try again.');
    };

    const proceedToPayment = () => {
        if (input > 0) {
            setShowPayment(true);
        } else {
            alert('Please select at least one bottle to proceed.');
        }
    };

    return(
        <div className="space-y-8 w-full max-w-md mx-auto">
            {/* Bottle Selector */}
            <div className="bg-white/80 backdrop-blur-lg text-indigo-900 p-8 border border-white/20 rounded-3xl shadow-2xl relative overflow-hidden group">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -translate-y-12 translate-x-12 opacity-60"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full translate-y-10 -translate-x-10 opacity-60"></div>
                
                <div className="relative z-10 flex flex-col items-center space-y-6">
                    {/* Product Header */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-800 bg-clip-text text-transparent mb-2">
                             Water Bottle
                        </h2>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-center space-x-6">
                        <button 
                            onClick={subtracter}
                            disabled={input === 0}
                            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 transform hover:scale-110 ${
                                input === 0 
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                    : 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 shadow-lg hover:shadow-red-500/25'
                            }`}
                        >
                            <Minus size={20} />
                        </button>
                        
                        <div className="text-center">
                            <div className="text-4xl font-bold text-indigo-800 mb-1">{input}</div>
                            <div className="text-sm text-gray-500 font-medium">
                                {input === 1 ? 'Bottle' : 'Bottles'}
                            </div>
                        </div>
                        
                        <button 
                            onClick={adder}
                            className='w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-bold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-green-500/25'>
                            <Plus size={20} />
                        </button>
                    </div>

                    {/* Price Display */}
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-2xl w-full text-center border border-indigo-100">
                        <div className="text-sm text-gray-600 mb-1">Total Amount</div>
                        <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                            ₹{price}
                        </div>
                        {input > 0 && (
                            <div className="text-xs text-gray-500 mt-1">
                                ₹20 per bottle
                            </div>
                        )}
                    </div>
                    
                    {/* Proceed to Payment Button */}
                    {input > 0 && !showPayment && (
                        <button
                            onClick={proceedToPayment}
                            className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-green-500/25 flex items-center justify-center space-x-2"
                        >
                            <ShoppingCart size={20} />
                            <span>Proceed to Payment</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Payment Gateway */}
            {showPayment && (
                <div className="animate-fadeIn">
                    <Gateway 
                        amount={price}
                        quantity={input}
                        onPaymentSuccess={handlePaymentSuccess}
                        onPaymentFailure={handlePaymentFailure}
                    />
                </div>
            )}
        </div>
    )
}