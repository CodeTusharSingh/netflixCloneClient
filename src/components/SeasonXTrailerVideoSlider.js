import { useState, useEffect, useRef } from "react";
import React from "react";
import './SeasonXTrailerVideoSlider.css'

const SeasonXVideoSlider = ({ trailers, trailersTitle, trailersVideo }) => {
    let trailerImage1;
    let trailerImage1Index;
    let trailerImage2;
    let trailerImage2Index;

    const [trailerScrollLeftButton, settrailerScrollLeftButton] = useState({
        fontSize: '40px',
        padding: '0px 10px',
        height: '272px',
        border: 'none',
        backgroundColor: '#181818',
        color: 'rgb(229,9,20)',
        zIndex: '-1'
    });

    const [trailerScrollRightButton, settrailerScrollRightButton] = useState({
        fontSize: '40px',
        padding: '0px 10px',
        height: '272px',
        border: 'none',
        backgroundColor: '#181818',
        color: 'rgb(229,9,20)',
        zIndex: '3'
    });

    const containerRef = useRef(null);
    const divRef = useRef(null);

    const handleSlide = (direction) => {
        const container = containerRef.current;
        const divWidth = divRef.current.getBoundingClientRect().width;
        const scrollAmount = divWidth;

        if (direction === 'left') {
            container.scrollTo({
                left: container.scrollLeft - scrollAmount,
                behavior: 'smooth'
            });
        } else if (direction === 'right') {
            container.scrollTo({
                left: container.scrollLeft + scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const [scrollX, setScrollX] = useState(0);
    const [reachedEnd, setReachedEnd] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        if (trailers.length < 3) {
            settrailerScrollRightButton(prevStyle => {
                return {
                    ...prevStyle,
                    zIndex: '-1'
                }
            });
        }
        const handleScroll = () => {
            if (container) {
                setScrollX(container.scrollLeft);
                const isAtEnd = container.scrollLeft + container.clientWidth === container.scrollWidth;
                setReachedEnd(isAtEnd);
                if (container.scrollLeft === 0) {
                    settrailerScrollLeftButton(prevStyle => {
                        return {
                            ...prevStyle,
                            zIndex: '-1'
                        }
                    });
                } else {
                    settrailerScrollLeftButton(prevStyle => {
                        return {
                            ...prevStyle,
                            zIndex: '3'
                        }
                    });
                }
                if (isAtEnd) {
                    settrailerScrollRightButton(prevStyle => {
                        return {
                            ...prevStyle,
                            zIndex: '-1'
                        }
                    });
                } else {
                    settrailerScrollRightButton(prevStyle => {
                        return {
                            ...prevStyle,
                            zIndex: '3'
                        }
                    });
                }
            }
        };
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [containerRef, reachedEnd, scrollX, trailers.length]);

    const [videoStyle, setVideoStyle] = useState({
        backgroundColor: 'rgb(0, 0, 0, 0.8)',
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '9999',
        display: 'none',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    })
    const [videoLink, setVideoLink] = useState(trailersVideo[0]);
    const [videoTitle, setVideoTitle] = useState(trailersTitle[0]);
    const videoRef = useRef(null);
    const playTrailer = (index) => {
        setVideoLink(trailersVideo[index]);
        setVideoTitle(trailersTitle[index]);
        const video = videoRef.current;
        video.muted = false;
        video.play();
        setVideoStyle(prevStyle => {
            return {
                ...prevStyle,
                display: prevStyle.display === 'none' ? 'flex' : 'none'
            };
        });
    };

    const hideTrailer = () => {
        const video = videoRef.current;
        if (video) {
            video.pause();
            video.load();
            video.currentTime = 0;
            video.pause();
            setVideoStyle(prevStyle => {
                return {
                    ...prevStyle,
                    display: prevStyle.display === 'none' ? 'flex' : 'none'
                }
            })
        }
    }

    const trailerArray = trailers.map((item, index) => {
        if (trailers.length % 2 === 1 && trailerImage1Index === trailers.length - 1) {
            return null;
        } else if (trailers.length % 2 === 0 && trailerImage1Index === trailers.length - 2) {
            return null;
        }
        if (index === 0) {
            trailerImage1 = item;
            trailerImage1Index = index;
            trailerImage2 = trailers[(index + 1) % trailers.length]
            trailerImage2Index = index + 1;
        } else if (index !== 0) {
            trailerImage1 = trailers[(trailerImage2Index + 1) % trailers.length];
            trailerImage1Index = trailerImage2Index + 1;
            trailerImage2 = trailers[(trailerImage1Index + 1) % trailers.length];
            trailerImage2Index = trailerImage1Index + 1;
        }
        let t1 = trailerImage1Index;
        let t2 = trailerImage2Index;
        if (trailers.length % 2 === 1 && trailerImage1Index === trailers.length - 1) {
            return (<div key={index} className="trailer-container">
                <div className="trailer-name" onClick={() => playTrailer(trailerImage1Index)}>
                    <div >
                        <img src={trailerImage1} alt={trailersTitle[trailerImage1Index]} title={trailersTitle[trailerImage1Index]} height={'252px'} width={'448px'} />
                        <figcaption>{trailersTitle[trailerImage1Index]}</figcaption>
                    </div>
                    <svg height={'50px'} width={'50px'} id='trailer-play-button-svg'>
                        <circle cx='25' cy='25' r='23' fill='white' stroke='white' strokeWidth={'1'}></circle>
                        <polygon points='33,25 20,17 20,33' fill='black' stroke='black' strokeWidth={'1'}></polygon>
                    </svg>
                </div>
            </div>);
        } else {
            return (
                <div key={index} ref={divRef} className="trailer-container">
                    <div className="trailer-name" onClick={() => playTrailer(t1)}>
                        <div >
                            <img src={trailerImage1} alt={trailersTitle[trailerImage1Index]} title={trailersTitle[trailerImage1Index]} height={'252px'} width={'448px'} />
                            <figcaption>{trailersTitle[trailerImage1Index]}</figcaption>
                        </div>
                        <svg height={'50px'} width={'50px'} id='trailer-play-button-svg'>
                            <circle cx='25' cy='25' r='23' fill='white' stroke='white' strokeWidth={'1'}></circle>
                            <polygon points='33,25 20,17 20,33' fill='black' stroke='black' strokeWidth={'1'}></polygon>
                        </svg>
                    </div>
                    <div className="trailer-name" onClick={() => playTrailer(t2)}>
                        <div >
                            <img src={trailerImage2} alt={trailersTitle[trailerImage1Index]} title={trailersTitle[trailerImage1Index]} height={'252px'} width={'448px'} />
                            <figcaption>{trailersTitle[trailerImage2Index]}</figcaption>
                        </div>
                        <svg height={'50px'} width={'50px'} id='trailer-play-button-svg'>
                            <circle cx='25' cy='25' r='23' fill='white' stroke='white' strokeWidth={'1'}></circle>
                            <polygon points='33,25 20,17 20,33' fill='black' stroke='black' strokeWidth={'1'}></polygon>
                        </svg>
                    </div>
                </div>
            )
        }
    }
    )


    return (
        <>
            <div id='trailer'>
                <div id='trailer-slider' ref={containerRef}>
                    {trailerArray}
                </div>
                <div id='trailer-scroll-buttons'>
                    <button onClick={() => handleSlide('left')} style={trailerScrollLeftButton}>&lsaquo;</button>
                    <button onClick={() => handleSlide('right')} style={trailerScrollRightButton}>&rsaquo;</button>
                </div>
            </div>
            <div id='trailer-video' style={videoStyle} >
                <div id='trailer-video-content'>
                    <div id='trailer-video-title'>
                        <p id='trailer-video-name' style={{ fontFamily: 'NetflixSans', color: 'white', fontSize: '20px' }}><span style={{ color: 'rgb(229,9,20)' }}>| </span> {videoTitle}</p>
                        <svg height={'20px'} width={'20px'} onClick={hideTrailer} style={{ cursor: 'pointer' }}>
                            <line x1={0} y1={0} x2={20} y2={20} stroke='white' strokeWidth={2}></line>
                            <line x1={0} y1={20} x2={20} y2={0} stroke='white' strokeWidth={2}></line>
                        </svg>
                    </div>
                    <div>
                        <video ref={videoRef} src={videoLink} controls height={'300px'} width={'550px'} muted autoPlay>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SeasonXVideoSlider;