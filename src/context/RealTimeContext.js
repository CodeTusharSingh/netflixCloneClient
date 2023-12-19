import React, { createContext, useState, useEffect } from 'react';

const RealTimeContext = createContext();

const RealTimeProvider = ({ children }) => {
    const [realTimeData, setRealTimeData] = useState(window.location.href);
    useEffect(() => {
        const handleURLChange = () => {
            setRealTimeData(window.location.href);
        };

        window.addEventListener('popstate', handleURLChange);

        return () => {
            window.removeEventListener('popstate', handleURLChange);
        };
    }, []);
    return (
        <RealTimeContext.Provider value={{ realTimeData }}>
            {children}
        </RealTimeContext.Provider>
    );
}

export { RealTimeContext, RealTimeProvider };
