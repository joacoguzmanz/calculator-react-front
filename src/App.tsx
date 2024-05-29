// import { useState } from 'react'
import Keyboard from "./components/Keyboard/Keyboard.tsx";

import 'normalize.css'
import './App.css'
import Display from "./components/Display/Display.tsx";

function App() {
    // const [value, setValue] = useState("0");
    const value: string = "0";

    return (
        <div className='calculator'>
            <div className="top"></div>
            <Display value={value} />
            <Keyboard />
        </div>
    )
}

export default App;
