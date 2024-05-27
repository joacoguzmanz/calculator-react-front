import { useState } from 'react'

function App() {
    const [expression, setExpression] = useState('')
    const [currentNumber, setCurrentNumber] = useState(0)

    const handleNumber = async (number: number) => {
        const response = await fetch(`http://localhost:8080/operations/number?number=${number}`)
        const data = await response.json()
        setExpression(data);
    }

    const handleOperation = async (operation: string) => {
        switch (operation) {
            case 'sum':
                const responseSum = await fetch(`http://localhost:8080/operations/sum?number=${currentNumber}`);
                const dataSum = await responseSum.json();
                console.log('Result of sum operation: ', dataSum);

                // Update the expression to include the addition operation
                setExpression(`${expression} + ${currentNumber}`);
                break;
            case 'subtract':
                setExpression(`${expression} - `)
                break
            default:
                break
        }
    }

    const handleEqual = async () => {
        const response = await fetch('/operations/equal');
        const data = await response.text();
        console.log(data);
    }

    const handleClear = async () => {
        const response = await fetch('/operations/clear');
        const data = await response.text();
        if (data === '0') {
            setCurrentNumber(0);
            setExpression('');
        }
        console.log('Data clear: ' + data);
        console.log('Current number clear: ' + currentNumber);
    }

    return (
        <>
            <h1>Calculator</h1>
            <input type='text' value={expression} readOnly/>
            <input type="text" value={''} readOnly/>

            <div>
                <button onClick={() => handleNumber(1)}>1</button>
                <button onClick={() => handleNumber(2)}>2</button>
                <button onClick={() => handleNumber(3)}>3</button>
                <button onClick={() => handleNumber(4)}>4</button>
                <button onClick={() => handleNumber(5)}>5</button>
                <button onClick={() => handleNumber(6)}>6</button>
                <button onClick={() => handleNumber(7)}>7</button>
                <button onClick={() => handleNumber(8)}>8</button>
                <button onClick={() => handleNumber(9)}>9</button>
                <button onClick={() => handleNumber(0)}>0</button>

                <button onClick={() => handleOperation('sum')}>+</button>
                <button onClick={() => handleOperation('subtract')}>-</button>

                <button onClick={handleEqual}>=</button>
                <button onClick={handleClear}>Clear</button>
            </div>
        </>
    )
}

export default App
