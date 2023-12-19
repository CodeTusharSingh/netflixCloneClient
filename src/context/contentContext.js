import { useState } from "react";
import { createContext } from "react"
import { RealTimeContext } from './RealTimeContext';
import { useContext } from 'react';


const ContentContext = createContext();

const ContentContextProvider = ({ children }) => {
    const { realTimeData } = useContext(RealTimeContext);
    const segment = realTimeData.split('/');
    const [linkexpo, setLinkexpo] = useState(segment[segment.length - 1]);

    const updateLinkexpo = (newValue) => {
        setLinkexpo(newValue);
    };
    return (
        <ContentContext.Provider value={{ linkexpo, updateLinkexpo }}>
            {children}
        </ContentContext.Provider>
    )
}

export { ContentContext, ContentContextProvider }