import React from "react";

import "./Button.css";

interface ButtonProps {
  value: string;
  onButtonClick: (value: string) => () => void;
  type?: string;
}

const Button: React.FC<ButtonProps> = ({ value, onButtonClick, type }) => {
    return (
        <button
        className={`button ${value === "0" ? "zero" : ""} ${type || ""}`}
        onClick={onButtonClick(value)}
        >
        {value}
        </button>
    );
}

export default Button;
