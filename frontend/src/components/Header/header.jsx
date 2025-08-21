import React from 'react';
import { Menu, Droplets, Shield, Truck } from 'lucide-react'
import logo from "../../assets/logo.png"

export default function Header(){
    return(
        <header className='w-full bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-100 shadow-2xl px-4 sm:px-6 py-5 relative overflow-hidden border-b-4 border-indigo-200'>
            {/* Light background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-100/30 to-blue-200/30"></div>
            <div className="absolute top-0 left-1/4 w-40 h-40 bg-indigo-200/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/3 w-48 h-48 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-indigo-100/30 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="relative z-10 flex items-center justify-between">
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

                {/* Right Section - Enhanced */}
                <div className="flex items-center space-x-4">
                    
                    {/* Menu Button - updated for light background */}
                    <button className="text-indigo-700 hover:text-indigo-900 p-3 rounded-xl hover:bg-indigo-200/40 backdrop-blur-sm transition-all duration-300 group border border-indigo-300/50 hover:border-indigo-400/70">
                        <Menu size={24} className="sm:hidden transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" /> 
                        <Menu size={26} className="hidden sm:block transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                    </button>
                </div>
            </div>
        </header>
    )
}