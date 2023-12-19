import { useState } from "react";
import { createContext } from "react"


const HomeTypeContext = createContext();

const HomeTypeContextProvider = ({ children }) => {
    const [contentType, setContentType] = useState(null);

    const updateContentType = (newValue) => {
        setContentType(newValue);
    };
    return (
        <HomeTypeContext.Provider value={{ contentType, updateContentType }}>
            {children}
        </HomeTypeContext.Provider>
    )
}

export { HomeTypeContext, HomeTypeContextProvider }