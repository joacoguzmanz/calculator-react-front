import React from "react";
import Button from "../Button/Button.tsx";

import "./Keyboard.css";

import { useDisplay } from "../../context/DisplayContext.tsx";

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
    const { setDisplayValue } = useDisplay();
    const [firstNumber, setFirstNumber] = React.useState<string>('0')
    const [operator, setOperator] = React.useState<string>('')
    const [secondNumber, setSecondNumber] = React.useState<string>('0')
    const [quasiResult, setQuasiResult] = React.useState<number>(0)

    const handleButtonPress = (content: string) => async () => {
        // Function buttons
        if (content === "AC") {
            setFirstNumber('0');
            setOperator('');
            setSecondNumber('0');
            setDisplayValue('0');
            setQuasiResult(0);
        }

        if (content === "+/-") {
            fetch(`${API_URL}/calculateFunction`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    singleNumber: firstNumber,
                    function: "opposite",
                }),
            })
                .then(response => response.json())
                .then(data => {
                    setDisplayValue(data.toString())
                })
            setFirstNumber(firstNumber.includes('-') ? firstNumber.replace('-', '') : '-' + firstNumber);
        }

        if (content === "%") {
            fetch(`${API_URL}/calculateFunction`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    singleNumber: firstNumber,
                    function: "%",
                }),
            })
                .then(response => response.json())
                .then(data => {
                    setDisplayValue(data.toString())
                })
            setFirstNumber('0');
        }

        // Number buttons
        if (!isNaN(Number(content))) {
            if (operator) {
                if (secondNumber.replace(',', '').length >= 8) return;
                if (secondNumber.includes(',')) {
                    setSecondNumber(prev => prev + content);
                    setDisplayValue(secondNumber + content);
                } else {
                    setSecondNumber(prev => (Number(prev.replace(/,/g, '.')) * 10 + Number(content)).toString());
                    setDisplayValue(secondNumber + content);
                }
            } else {
                if (firstNumber.replace(',', '').length >= 8) return;
                if (firstNumber.includes(',')) {
                    setFirstNumber(prev => prev + content);
                    setDisplayValue(firstNumber + content);
                } else {
                    setFirstNumber(prev => (Number(prev.replace(/,/g, '.')) * 10 + Number(content)).toString());
                    setDisplayValue(firstNumber + content);
                }
            }
        } else if (content === ",") {
            if (operator) {
                if (secondNumber.replace(',', '').length >= 8) return;
                setSecondNumber(prev => prev.includes(',') ? prev : prev + content);
                setDisplayValue(secondNumber + content);
            } else {
                if (firstNumber.replace(',', '').length >= 8) return;
                setFirstNumber(prev => prev.includes(',') ? prev : prev + content);
                setDisplayValue(firstNumber + content);
            }
        }

        // Operator buttons
        if (['+', '-', 'X', '÷'].includes(content)) {
            if (firstNumber && operator && secondNumber) {
                // Calculate the result of the current operation
                let result = 0;
                switch (operator) {
                    case '+':
                        result = Number(firstNumber.replace(',', '.')) + Number(secondNumber.replace(',', '.'));
                        break;
                    case '-':
                        result = Number(firstNumber.replace(',', '.')) - Number(secondNumber.replace(',', '.'));
                        break;
                    case 'X':
                        result = Number(firstNumber.replace(',', '.')) * Number(secondNumber.replace(',', '.'));
                        break;
                    case '÷':
                        if (Number(secondNumber) === 0) {
                            setDisplayValue('Error');
                            return;
                        } else {
                            result = Number(firstNumber.replace(',', '.')) / Number(secondNumber.replace(',', '.'));
                        }
                        break;
                }

                // Display the result and set it as the first number for the next operation
                setDisplayValue(result.toString());
                setFirstNumber(result.toString());
                setSecondNumber('0');
            }
            setOperator(content);
        }

        // Calculate
        if (content === "=") {
            const firstNumberToSend = firstNumber.replace(',', '.');
            const secondNumberToSend = secondNumber.replace(',', '.');

            fetch(`${API_URL}/calculate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstNumber: firstNumberToSend,
                    operator: operator,
                    secondNumber: secondNumberToSend,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        setDisplayValue(data.error);
                    } else {
                        setDisplayValue(data.toString());
                        setQuasiResult(data);
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                });

            setFirstNumber('0');
            setOperator('');
            setSecondNumber('0');
            setQuasiResult(0);
        }

        if (quasiResult && content !== "=") {
            setFirstNumber(quasiResult.toString());
            setQuasiResult(0);
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