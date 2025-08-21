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
                        <div>
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
                        </div>
                    </div>
                </a>
            </div>
        </div>
    )
}