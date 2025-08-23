import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Ham() {
    const [isOpen, setIsOpen] = useState(false);

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Hamburger Button */}
            <div className="flex items-center space-x-4 z-50 relative">
                <button
                    onClick={togglePanel}
                    className="text-indigo-700 hover:text-indigo-900 p-3 rounded-xl hover:bg-indigo-200/40 duration-300 group border border-indigo-300/50 hover:border-indigo-400/70"
                >
                    {isOpen ? (
                        <X size={26} className="transform transition-all duration-300" />
                    ) : (
                        <>
                            <Menu
                                size={24}
                                className="sm:hidden transform group-hover:scale-110 transition-all duration-300"
                            />
                            <Menu
                                size={26}
                                className="hidden sm:block transform group-hover:scale-110 transition-all duration-300"
                            />
                        </>
                    )}
                </button>
            </div>

            {/* Side Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-64  bg-gradient-to-br from-blue-100 via-indigo-200 to-blue-200 shadow-xl border-l border-indigo-300 transform transition-transform duration-300 z-40 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="p-6">
                    <ul className="space-y-4 text-indigo-800 font-medium">
                        <li>
                            <a href="https://fooddle.in/shops" className="hover:text-indigo-900 transition-colors duration-200">
                                Shops   
                            </a>
                        </li>
                        <li>
                            <a href="https://fooddle.in/privacy-policy" className="hover:text-indigo-900 transition-colors duration-200">
                                Privacy Policy 
                            </a>
                        </li>
                        <li>
                            <a href="https://fooddle.in/shipping-return-refund-policy" className="hover:text-indigo-900 transition-colors duration-200">
                                Shipping & Delivery
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Optional Backdrop */}
            {isOpen && (
                <div
                    onClick={togglePanel}
                    className="fixed inset-0 bg-black/20 z-30 transition-opacity duration-300"
                />
            )}
        </>
    );
}
