import React, { useState, createContext } from "react";
import { data } from "../data";
import Card from "../components/Card";
import Button from "../components/Button";
import NavBar from "../components/Navbar";
import LoginProvider from "../components/LoginProvider";

function Home() {
    const [cards, setCards] = useState(data);
    const cats = ["all", ...new Set(data.map((card) => card.category))];
  
    const filter = (cat) => {
      if (cat === "all") {
        setCards(data);
        return;
      }
      setCards(data.filter((item) => item.category === cat));
    };
    
    return (
        <div className="App">
    
            <LoginProvider>
            <NavBar/>
            </LoginProvider>
          <h1>Hall-of-Fame</h1>
          <Button categories={cats} handleClick={filter} />
          <Card allcards={cards} />
        </div>
      );
}

export default Home