import commafy from "../../utils/commafy.ts";

import './Display.css';
import { useDisplay } from "../../context/DisplayContext.tsx";

// { value }: { value: string }
const Display = () => {
    const { displayValue } = useDisplay();

    return (
        <div className='display'>
            {displayValue === 'Error'
                ? <span>Error</span>
                : <span>{commafy(displayValue)}</span>}
        </div>
    );
}

export default Display;