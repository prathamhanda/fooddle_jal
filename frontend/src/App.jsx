import { useState } from "react";
import "./App.css";
import { BottleSelector, Branding, Header } from "./components";
import image1 from "./assets/image1.png"

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
        <Header/>
        
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-indigo-600/10"></div>
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center justify-center py-12 px-4">
            {/* Welcome Section */}
            <div className="text-center mb-8 max-w-2xl">
              {/* Brand Title */}
              <div className="mb-6">
                <h1 className="text-3xl md:text-5xl font-bold text-indigo-800 mb-2 tracking-wide">
                  <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 bg-clip-text text-transparent">
                    Fooddle
                  </span>
                </h1>
                <div className="flex items-center justify-center">
                  <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-4 text-sm text-indigo-600 font-medium">
                <span className="flex items-center gap-1">  
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  One-Click Access
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  Smart Shopping
                </span>
              </div>
            </div>

            <div className="mb-8">
              <Branding source={image1}/>
            </div>

            <BottleSelector />

            <Branding source = ""/>
          </div>
        </div>
      </div>  
    </>
  );
}

export default App;
