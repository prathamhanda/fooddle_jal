    import React from 'react';

    export default function Branding({source}){
        return(
            <div className="flex justify-center items-center p-6">
                <a
                    href="https://www.fooddle.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-2xl shadow-lg p-4 w-full max-w-md flex justify-center hover:scale-105 transition-transform duration-300"
                >
                    <img
                        src={source}
                        alt="Coming Soon"
                        className="rounded-lg object-contain w-full"
                    />
                </a>
            </div>
        )
    }