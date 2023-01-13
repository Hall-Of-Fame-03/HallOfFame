import React, { useState, createContext } from "react";
import { data } from "../data";
import Card from "../components/Card";
import Button from "../components/Button";
import NavBar from "../components/Navbar";
import LoginProvider from "../components/LoginProvider";
import './achieve.css';



function Achieve() {


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
        <div className="Achieve">

            <LoginProvider>
                <NavBar />
            </LoginProvider>
            <h1>HALL OF FAME</h1>
            <Button categories={cats} handleClick={filter} />
            <Card allcards={cards} />
            <br />
            <br />
            <br />
        </div>
    );
}

export default Achieve;