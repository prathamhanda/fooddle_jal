import { useState } from "react";
import "./App.css";
import { BottleSelector, Branding, Header } from "./components";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className=" justify-center items-center min-h-screen bg-[#EAF3FF]">
        <Header/>
        <Branding/>
        <BottleSelector />
        <Branding/>
      </div>  
    </>
  );
}

export default App;
