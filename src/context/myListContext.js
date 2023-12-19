import { useState } from "react";
import { createContext } from "react"


const MyListContext = createContext();

const MyListContextProvider = ({ children }) => {
    const [myListUpdation, setMyListUpdation] = useState(0);

    const updateMyListUpdation = (newValue) => {
        setMyListUpdation(newValue);
    };
    return (
        <MyListContext.Provider value={{ myListUpdation, updateMyListUpdation }}>
            {children}
        </MyListContext.Provider>
    )
}

export { MyListContext, MyListContextProvider }