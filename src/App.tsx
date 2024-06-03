// import { useState } from 'react'
import Keyboard from "./components/Keyboard/Keyboard.tsx";

import 'normalize.css'
import './App.css'
import Display from "./components/Display/Display.tsx";
import { DisplayProvider } from "./context/DisplayContext.tsx";

function App() {
        return (
        <div className='calculator'>
            <DisplayProvider>
                <div className="top"></div>
                <Display />
                <Keyboard />
            </DisplayProvider>
        </div>
    )
}

export default App;
