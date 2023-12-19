import { useState } from "react";
import { createContext } from "react"


const HomeContext = createContext();

const HomeContextProvider = ({ children }) => {
    const [contentLink, setContentLink] = useState(null);

    const updateContentLink = (newValue) => {
        setContentLink(newValue);
    };
    return (
        <HomeContext.Provider value={{ contentLink, updateContentLink }}>
            {children}
        </HomeContext.Provider>
    )
}

export { HomeContext, HomeContextProvider }