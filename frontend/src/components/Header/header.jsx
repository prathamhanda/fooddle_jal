import React from 'react';
import {Menu} from 'lucide-react'
import logo from "../../assets/logo.png"
export default function Header(){
    return(
        <header className='w-full bg-indigo-600 shadow-md px-4 sm:px-6 py-3 flex items-center justify-between'>
            {/* logo */}
            <div className='flex items-center'>
                <img 
                    src={logo}
                    alt="Logo" 
                    className='h-8 w-auto sm:h-10'
                />
            </div>

            <h1 className='text-lg sm:text-xl md:text-2xl font-bold text-white text-center flex-1'>Foodle-Jal</h1>

            <button className="text-white hover:text-blue-300 ml-2 sm:ml-4">
                <Menu size={24} className="sm:hidden" /> 
                <Menu size={28} className="hidden sm:block" />
            </button>
        </header>
    )
}