import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <header className="flex flex-1 bg-darkBlue h-12 border-b-2 border-cyan-600"></header>
    </>
  );
}

export default App;
