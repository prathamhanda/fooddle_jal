import { useState } from "react";
import "./App.css";
import { BottleSelector, Branding, Header } from "./components";
import image1 from "./assets/image.png"
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className=" justify-center items-center min-h-screen bg-[#EAF3FF]">
        <Header/>
        <Branding source = {image1}/>
        <BottleSelector />
        <Branding />
      </div>  
    </>
  );
}

export default App;
