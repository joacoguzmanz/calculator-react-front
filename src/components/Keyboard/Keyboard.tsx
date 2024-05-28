import React from "react";
import Button from "../Button/Button.tsx";

import "./Keyboard.css";

interface Keys {
    value: string;
    type?: string;
}

const keys: Keys[] = [
    { value: "AC", type: "function" },
    { value: "+/-", type: "function" },
    { value: "%", type: "function" },
    { value: "÷", type: "operator" },
    { value: "7" },
    { value: "8" },
    { value: "9" },
    { value: "X", type: "operator" },
    { value: "4" },
    { value: "5" },
    { value: "6" },
    { value: "-", type: "operator" },
    { value: "1" },
    { value: "2" },
    { value: "3" },
    { value: "+", type: "operator" },
    { value: "0" },
    { value: "," },
    { value: "=", type: "operator" },
];

const Keyboard: React.FC = () => {
    const handleButtonPress = (content: string) => () => {
        console.log(`Button "${content}" clicked`);
    };

    return (
        <div className='keyboard'>
            {keys.map((key, index) => (
                <Button onButtonClick={handleButtonPress} key={index} value={key.value} type={key.type} />
            ))}
        </div>
    )
}

export default Keyboard;