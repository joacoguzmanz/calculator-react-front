import React, { createContext, useContext, useState } from 'react';

interface DisplayContextProps {
    displayValue: string;
    setDisplayValue: (value: string) => void;
}

const DisplayContext = createContext<DisplayContextProps | undefined>(undefined);

interface DisplayProviderProps {
    children: React.ReactNode;
}

export const DisplayProvider: React.FC<DisplayProviderProps> = ({ children }) => {
    const [displayValue, setDisplayValue] = useState<string>('0');

    return (
        <DisplayContext.Provider value={{ displayValue, setDisplayValue }}>
            {children}
        </DisplayContext.Provider>
    );
}

export const useDisplay = () => {
    const context = useContext(DisplayContext);
    if (!context) {
        throw new Error('useDisplay must be used within a DisplayProvider');
    }
    return context;
}