import React from 'react'


export default function Branding({ source }) {
    return (
        <div className="flex justify-center items-center p-6 relative">
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-indigo-600/5 rounded-3xl"></div>
            
            <div className="relative group">
                <a
                    href="https://www.fooddle.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative"
                >
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                    
                    {/* Main card */}
                    <div className="relative bg-white rounded-3xl shadow-2xl p-6 w-full max-w-md transform group-hover:scale-105 transition-all duration-300 border border-blue-100 overflow-hidden">
                        {/* Background pattern */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>
                        
                        {/* Content */}
                       {source && <div>
                            { (
                                <img
                                    src={source}
                                    alt="Fooddle Coming Soon"
                                    className="rounded-2xl object-contain w-full"
                                />
                            )}
                            
                            {/* Visit website indicator */}
                            <div className="mt-4 text-center">
                                <span className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 group-hover:text-indigo-800 transition-colors">
                                    Visit Website
                                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </span>
                            </div>
                        </div>}
                        {
                            !source && <div>
                            { (
                                <h1>Foodle Coming Soon...</h1>
                            )}
                            
                            {/* Visit website indicator */}
                            <div className="mt-4 text-center">
                                <span className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 group-hover:text-indigo-800 transition-colors">
                                    Visit Website
                                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        }
                    </div>
                </a>
            </div>
        </div>
    )
}

// PhoneInput component - temporarily placed here
export function PhoneInput({ onPhoneSubmit, storedData }) {
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [isValidPhone, setIsValidPhone] = React.useState(false);
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [isProcessing, setIsProcessing] = React.useState(false);

    const validatePhoneNumber = (phone) => {
        // Indian phone number validation: 10 digits, optionally starting with +91
        const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
        return phoneRegex.test(phone.replace(/\s+/g, ''));
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/[^0-9+\s]/g, ''); // Only allow numbers, + and spaces
        setPhoneNumber(value);
        setIsValidPhone(validatePhoneNumber(value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isValidPhone && !isProcessing) {
            setIsProcessing(true);
            const cleanPhone = phoneNumber.replace(/\s+/g, '');
            
            try {
                // Automatically save to Excel and proceed
                await onPhoneSubmit(cleanPhone);
                setIsSubmitted(true);
            } catch (error) {
                console.error('Error processing phone number:', error);
                alert('Failed to process phone number. Please try again.');
            } finally {
                setIsProcessing(false);
            }
        }
    };

    const formatPhoneDisplay = (phone) => {
        // Format phone number for display (XXX XXX XXXX)
        const cleaned = phone.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return `${match[1]} ${match[2]} ${match[3]}`;
        }
        return phone;
    };

    if (isSubmitted) {
        return (
            <div className="bg-white/90 backdrop-blur-lg text-indigo-900 p-8 border border-white/20 rounded-3xl shadow-2xl relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full -translate-y-16 translate-x-16 opacity-40"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full translate-y-12 -translate-x-12 opacity-40"></div>
                
                <div className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <svg className="text-white w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-800 bg-clip-text text-transparent mb-2">
                        Phone Number Saved!
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Your phone number {formatPhoneDisplay(phoneNumber)} has been automatically saved to our secure database.
                    </p>
                    <p className="text-sm text-gray-500">
                        Data securely stored for developers to access. Proceeding to payment...
                    </p>
                </div>
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
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <svg className="text-white w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-800 bg-clip-text text-transparent mb-2">
                        Enter Your Phone Number
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Phone Input Field */}
                    <div className="relative">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <input
                                type="tel"
                                id="phone"
                                value={phoneNumber}
                                onChange={handlePhoneChange}
                                placeholder="+91 98765 43210"
                                disabled={isProcessing}
                                className={`w-full pl-12 pr-12 py-4 text-lg border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                                    isProcessing
                                        ? 'border-gray-300 bg-gray-100 cursor-not-allowed'
                                        : phoneNumber === '' 
                                        ? 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                                        : isValidPhone
                                        ? 'border-green-500 focus:ring-green-500 bg-green-50'
                                        : 'border-red-500 focus:ring-red-500 bg-red-50'
                                }`}
                            />
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                {isProcessing ? (
                                    <svg className="animate-spin h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : phoneNumber !== '' && (
                                    isValidPhone ? (
                                        <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                        </svg>
                                    )
                                )}
                            </div>
                        </div>
                        {phoneNumber !== '' && !isValidPhone && !isProcessing && (
                            <p className="mt-2 text-sm text-red-600">
                                Please enter a valid Indian phone number (10 digits)
                            </p>
                        )}
                        {isValidPhone && !isProcessing && (
                            <p className="mt-2 text-sm text-green-600">
                                Valid phone number entered! Ready to proceed.
                            </p>
                        )}
                    </div>

                    {/* Proceed Button */}
                    <button
                        type="submit"
                        disabled={!isValidPhone || isProcessing}
                        className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-3 ${
                            !isValidPhone || isProcessing
                                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                                : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:shadow-green-500/25 text-white'
                        }`}
                    >
                        {isProcessing ? (
                            <>
                                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Processing...</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                                <span>Proceed</span>
                            </>
                        )}
                    </button>
                </form>

                
            </div>
        </div>
    );
}