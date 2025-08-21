import { useState } from "react";
import "./App.css";
import { BottleSelector, Branding, Header } from "./components";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <div className="flex justify-center items-center min-h-screen bg-[#EAF3FF]">
      <Header/>
      <div className="text-black text-5xl font-sans">Fooddle Jal 💦</div>
        <Branding/>
        <BottleSelector />
      </div>  
    </>
  );
}

export default App;
