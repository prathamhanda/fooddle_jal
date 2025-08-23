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

// CustomerInfoInput component - collects name, email, and phone
export function PhoneInput({ onPhoneSubmit, storedData }) {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: ''
    });
    const [validation, setValidation] = React.useState({
        name: false,
        email: false,
        phone: false
    });
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [isProcessing, setIsProcessing] = React.useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phone) => {
        // Indian phone number validation: 10 digits, optionally starting with +91
        const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
        return phoneRegex.test(phone.replace(/\s+/g, ''));
    };

    const validateName = (name) => {
        return name.trim().length >= 2;
    };

    const handleInputChange = (field, value) => {
        const updatedFormData = { ...formData, [field]: value };
        setFormData(updatedFormData);

        // Update validation
        const updatedValidation = { ...validation };
        switch (field) {
            case 'name':
                updatedValidation.name = validateName(value);
                break;
            case 'email':
                updatedValidation.email = validateEmail(value);
                break;
            case 'phone':
                const cleanPhone = value.replace(/[^0-9+\s]/g, '');
                updatedFormData.phone = cleanPhone;
                setFormData(updatedFormData);
                updatedValidation.phone = validatePhoneNumber(cleanPhone);
                break;
        }
        setValidation(updatedValidation);
    };

    const isFormValid = validation.name && validation.email && validation.phone;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid && !isProcessing) {
            setIsProcessing(true);
            
            try {
                const customerData = {
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    phone: formData.phone.replace(/\s+/g, '')
                };
                
                // Import and use the Google Sheets service directly
                const { addCustomerToGoogleSheets } = await import('../../api/googleSheetsService.js');
                
                // Save customer data to Google Sheets immediately
                await addCustomerToGoogleSheets(customerData.name, customerData.email, customerData.phone);
                
                // Pass customer data to parent component
                await onPhoneSubmit(customerData);
                setIsSubmitted(true);
            } catch (error) {
                console.error('Error processing customer information:', error);
                alert('Failed to process information. Please try again.');
            } finally {
                setIsProcessing(false);
            }
        }
    };

    const formatPhoneDisplay = (phone) => {
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
                        Information Saved!
                    </h3>
                    <div className="text-gray-600 mb-4 space-y-1">
                        <p><strong>Name:</strong> {formData.name}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Phone:</strong> {formatPhoneDisplay(formData.phone)}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                        Your information has been securely saved. Proceeding to order...
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-800 bg-clip-text text-transparent mb-2">
                        Enter Your Information
                    </h2>
                    <p className="text-gray-600 text-sm">We need your details to process your order</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Input Field */}
                    <div className="relative">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                placeholder="Enter your full name"
                                disabled={isProcessing}
                                className={`w-full pl-12 pr-12 py-4 text-lg border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                                    isProcessing
                                        ? 'border-gray-300 bg-gray-100 cursor-not-allowed'
                                        : formData.name === '' 
                                        ? 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                                        : validation.name
                                        ? 'border-green-500 focus:ring-green-500 bg-green-50'
                                        : 'border-red-500 focus:ring-red-500 bg-red-50'
                                }`}
                            />
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                {formData.name !== '' && (
                                    validation.name ? (
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
                        {formData.name !== '' && !validation.name && (
                            <p className="mt-2 text-sm text-red-600">
                                Name must be at least 2 characters long
                            </p>
                        )}
                    </div>

                    {/* Email Input Field */}
                    <div className="relative">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            </div>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                placeholder="example@email.com"
                                disabled={isProcessing}
                                className={`w-full pl-12 pr-12 py-4 text-lg border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                                    isProcessing
                                        ? 'border-gray-300 bg-gray-100 cursor-not-allowed'
                                        : formData.email === '' 
                                        ? 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                                        : validation.email
                                        ? 'border-green-500 focus:ring-green-500 bg-green-50'
                                        : 'border-red-500 focus:ring-red-500 bg-red-50'
                                }`}
                            />
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                {formData.email !== '' && (
                                    validation.email ? (
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
                        {formData.email !== '' && !validation.email && (
                            <p className="mt-2 text-sm text-red-600">
                                Please enter a valid email address
                            </p>
                        )}
                    </div>

                    {/* Phone Input Field */}
                    <div className="relative">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number *
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
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                placeholder="+91 98765 43210"
                                disabled={isProcessing}
                                className={`w-full pl-12 pr-12 py-4 text-lg border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                                    isProcessing
                                        ? 'border-gray-300 bg-gray-100 cursor-not-allowed'
                                        : formData.phone === '' 
                                        ? 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                                        : validation.phone
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
                                ) : formData.phone !== '' && (
                                    validation.phone ? (
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
                        {formData.phone !== '' && !validation.phone && (
                            <p className="mt-2 text-sm text-red-600">
                                Please enter a valid Indian phone number (10 digits)
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!isFormValid || isProcessing}
                        className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-3 ${
                            !isFormValid || isProcessing
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
                                <span>Continue to Order</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
