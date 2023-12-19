import { useState } from "react";
import { createContext } from "react"

const SignContext = createContext();


function SignContextProvider({ children }) {
    const [sign, setSign] = useState(null);
    const [signed, setSigned] = useState('SIGN IN');

    const updateSign = (newValue) => {
        setSign(newValue)
    }

    const updateSigned = (newValue) => {
        setSigned(newValue)
    }

    return (
        <SignContext.Provider value={{ sign, updateSign, signed, updateSigned }}>
            {children}
        </SignContext.Provider>
    )

}

export { SignContext, SignContextProvider }