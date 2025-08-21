import  { useCallback, useEffect, useState } from 'react';

export default function BottleSelector(){
    const [input,setInput] = useState(0);
    const [price,setPrice] = useState(0);
    const adder = () => {
        setInput(input + 1)
    }

    const subtracter = () => {
        if(input > 0) setInput(input - 1)
    }

    const PriceCalculator = useCallback((cost = 20) => {
        setPrice(cost*input)
    },[input,setPrice])

    useEffect(()=>{PriceCalculator()},[input])

    return(
        <div className="bg-white text-indigo-900 p-6 max-w-sm w-full mx-auto mt-6 border rounded-2xl shadow-lg flex flex-col items-center space-y-5">
            <h2 className="text-2xl font-bold text-indigo-600">Water Bottle</h2>
            <div className="flex items-center gap-6">
                <button 
                onClick={subtracter}
                className='px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition'>
                    -
                </button>
                <span className="text-2xl font-semibold">{input}</span>
                <button 
                onClick={adder}
                className='px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition'>
                    +
                </button>
            </div>
            <div className='text-lg font-medium'>
                 Total Price: <span className="font-bold text-indigo-700">₹{price}</span>
            </div>
        </div>
    )
}