import { useState } from "react";
import { createContext } from "react"


const VideoContext = createContext();

const VideoContextProvider = ({ children }) => {
    const [videoLink, setVideoLink] = useState(null);
    const [videoImgLink, setVideoImgLink] = useState([]);
    const [showMore, setShowMore] = useState(false);


    const updateVideoLink = (newValue) => {
        setVideoLink(newValue);
    };

    const updateVideoImgLink = (newValue) => {
        setVideoImgLink(newValue);
    };

    const updateShowMore = (newValue) => {
        setShowMore(newValue);
    };

    return (
        <VideoContext.Provider value={{ videoLink, updateVideoLink, videoImgLink, updateVideoImgLink, showMore, updateShowMore }}>
            {children}
        </VideoContext.Provider>
    )
}

export { VideoContext, VideoContextProvider }