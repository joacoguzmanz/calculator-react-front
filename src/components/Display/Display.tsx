import commafy from "../../utils/commafy.ts";

import './Display.css';

const Display = ({ value }: { value: string }) => {
    return (
        <div className='display'>
            <span>{commafy(value)}</span>
        </div>
    );
}

export default Display;