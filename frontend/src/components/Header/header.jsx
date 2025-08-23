import React from 'react';
import Ham from '../menu/menu';
import { useState, useRef, useEffect } from 'react';
import logo from "../../assets/logo.png"
import { initializeHeaders } from '../../api/googleSheetsService';

export default function Header(){
    const handleDownloadExcel = () => {
        excelService.downloadExcel();
    };

    const handleTestGoogleSheets = async () => {
        console.log('🧪 Testing Google Sheets API...');
        const result = await testGoogleSheetsAPI();
        if (result.success) {
            alert('✅ Google Sheets API test successful! Check console for details.');
        } else {
            alert(`❌ Google Sheets API test failed: ${result.error}`);
        }
    };

    const handleInitializeSheet = async () => {
        console.log('🔧 Initializing Google Sheet...');
        const result = await initializeHeaders();
        if (result.success) {
            alert(`✅ Google Sheet initialized successfully! ${result.data ? result.data.message : 'Headers ready'}`);
        } else {
            alert(`❌ Google Sheet initialization failed: ${result.error}`);
        }
    };

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        }
        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isDropdownOpen]);

    const links = [
        { name: "Shops", href: "https://fooddle.in/shops" },
        { name: "Privacy Policy", href: "https://fooddle.in/privacy-policy" },
        {
            name: "Shipping & Delivery",
            href: "https://fooddle.in/shipping-return-refund-policy",
        },
    ];

    return(
        <header className='w-full bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-100 shadow-2xl px-4 sm:px-6 py-5 relative overflow-hidden border-b-4 border-indigo-200'>
            {/* Light background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-100/30 to-blue-200/30"></div>
            <div className="absolute top-0 left-1/4 w-40 h-40 bg-indigo-200/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/3 w-48 h-48 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-indigo-100/30 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10 flex flex-col">
                <div className="flex items-center justify-between">
                    {/* Logo Section - Enhanced */}
                    <div className='flex items-center space-x-4 group flex-1'>
                        <div className="relative">
                            {/* Enhanced glow effect for logo - updated for light background */}
                            <div className="absolute -inset-3 bg-indigo-200/40 rounded-full blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                            <div className="absolute -inset-2 bg-gradient-to-r from-blue-300/50 to-indigo-400/50 rounded-full blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                            <img 
                                src={logo}
                                alt="Fooddle-Jal Logo" 
                                className='h-16 w-auto sm:h-18 md:h-20 relative z-10 rounded-full transform group-hover:scale-110 transition-all duration-300 '
                            />
                        </div>
                    </div>
                    <Ham isOpen={isDropdownOpen} onClick={() => setIsDropdownOpen((v) => !v)} />
                </div>
                {/* Dropdown Navbar in Header */}
                {isDropdownOpen && (
                    <div
                        ref={dropdownRef}
                        id="mobile-menu"
                        className="mt-2 mx-auto w-full max-w-xs bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-100 shadow-lg rounded-lg border border-indigo-200 z-[9999] transition-all duration-300 transform origin-top opacity-100 scale-100"
                    >
                        <ul className="py-4 px-6 flex flex-row gap-6 text-indigo-800 font-medium justify-center items-center">
                            {links.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="hover:text-indigo-900 transition-colors duration-200"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </header>
    )
}