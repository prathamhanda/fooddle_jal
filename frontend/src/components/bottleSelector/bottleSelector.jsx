import React, { useCallback, useEffect, useState } from 'react';

export default function BottleSelector(){
    const [input,setInput] = useState(0);
    const [price,setPrice] = useState(0);
    const adder = () => {
        setInput(input + 1)
    }

    const subtracter = () => {
        if(input > 0) setInput(input - 1)
    }

    const PriceCalculator = useCallback((cost = 10) => {
        setPrice(cost*input)
    },[input,setPrice])

    useEffect(()=>{PriceCalculator()},[input])

    return(
        <div className="text-black p-4 space-y-4 max-w-sm mx-auto border rounded-2xl shadow">
            <h2 className="text-xl font-semibold">Bottle</h2>
            <div className="flex items-center gap-4">
                <button 
                onClick={subtracter}
                className='px-3 py-1 bg-blue-300 text-white rounded-lg hover:bg-blue-500'>
                    -
                </button>
                <span className="text-lg font-medium">{input}</span>
                <button 
                onClick={adder}
                className='px-3 py-1 bg-blue-300 text-white rounded-lg hover:bg-blue-500'>
                    +
                </button>
            </div>
            <div className='text-lg'>
                 Total Price: <span className="font-bold">₹{price}</span>
            </div>
        </div>
    )
}