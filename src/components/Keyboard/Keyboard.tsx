import React, { useEffect } from "react";
import Button from "../Button/Button.tsx";

import "./Keyboard.css";

const API_URL = "http://localhost:8080/operations";

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
    const [firstNumber, setFirstNumber] = React.useState<string>('0')
    const [operator, setOperator] = React.useState<string>('')
    const [secondNumber, setSecondNumber] = React.useState<string>('0')

    useEffect(() => {
        console.log('First number: ' + firstNumber);
        console.log('Second number: ' + secondNumber);
    }, [firstNumber, secondNumber]);

    const handleButtonPress = (content: string) => async () => {
        // Implement button press logic here
        // Function buttons
        if (content === "AC") {
            console.log("Clear display");
            setFirstNumber('0');
            setOperator('');
            setSecondNumber('0');
        } else if (content === "+/-") {
            console.log("Toggle sign");
        } else if (content === "%") {
            console.log("Percentage");
        }

        // Number buttons
        /*if (!isNaN(Number(content)) || content === ",") {
            if (operator) {
                setSecondNumber(prev => prev * 10 + Number(content));
            } else {
                setFirstNumber(prev => prev * 10 + Number(content));
            }
        }*/
        if (!isNaN(Number(content))) {
            if (operator) {
                if (secondNumber.includes(',')) {
                    setSecondNumber(prev => prev + content);
                } else {
                    setSecondNumber(prev => (Number(prev.replace(/,/g, '.')) * 10 + Number(content)).toString());
                }
            } else {
                if (firstNumber.includes(',')) {
                    setFirstNumber(prev => prev + content);
                } else {
                    setFirstNumber(prev => (Number(prev.replace(/,/g, '.')) * 10 + Number(content)).toString());
                }
            }
        } else if (content === ",") {
            if (operator) {
                setSecondNumber(prev => prev.includes(',') ? prev : prev + content);
            } else {
                setFirstNumber(prev => prev.includes(',') ? prev : prev + content);
            }
}

        /*if (!isNaN(Number(content))) {
            if (operator) {
                setSecondNumber(prev => (Number(prev.replace(/,/g, '.')) * 10 + Number(content)).toString());
            } else {
                setFirstNumber(prev => (Number(prev.replace(/,/g, '.')) * 10 + Number(content)).toString());
            }
        } else if (content === ",") {
            if (operator) {
                setSecondNumber(prev => prev.includes(',') ? prev : prev + content);
            } else {
                setFirstNumber(prev => prev.includes(',') ? prev : prev + content);
            }
        }*/

        // Operator buttons
        if (['+', '-', '*', '/'].includes(content)) {
            setOperator(content);
            console.log("Operator: " + content);
        }

        // Calculate
        if (content === "=") {
            console.log('To calculate: ' + firstNumber + operator + secondNumber)

            fetch(`${API_URL}/calculate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstNumber: parseFloat(firstNumber),
                    operator: operator,
                    secondNumber: secondNumber,
                }),
            })
                .then(response => response.json())
                .then(data => console.log(data))

            setFirstNumber('0');
            setOperator('');
            setSecondNumber('0');
        }
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