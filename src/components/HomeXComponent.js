import { useRef, useState, useEffect, useContext } from "react";
import './HomeXComponent.css'
import { HomeContext } from "../context/homeContext";
import { HomeTypeContext } from "../context/homeTypeContext";
import { VideoContext } from "../context/videoContext";
import { MyListContext } from "../context/myListContext";

function HomeXComponent({ contents }) {

    const { updateMyListUpdation } = useContext(MyListContext);
    const [email, setEmail] = useState('');

    const check = async () => {
        try {
            const response = await fetch('https://netflixcloneserver-1g07.onrender.com/home', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.status === 200) {
                const data = await response.json();
                // console.log('User is valid. Email:', data.email);
                setEmail(data.email);
            } else if (response.status === 401) {
                // console.log('User is not valid. Proceed to error page');
            } else {
                // console.log('Unexpected response status:', response.status);
            }
        }
        catch (err) {
            // console.log(err);
        }
    }

    useEffect(() => {
        check();
    }, []);


    const { updateContentLink } = useContext(HomeContext);
    const { updateContentType } = useContext(HomeTypeContext);
    const { videoLink, videoImgLink, updateShowMore, updateVideoLink, updateVideoImgLink } = useContext(VideoContext);

    const contentImgArray = videoImgLink.find((videoImgLink) => videoImgLink)
    const [imgLink, setImgLink] = useState(null);
    const [maturityRatingLink, setMaturityRatingLink] = useState(null);
    const [contentInfoLink, setContentInfoLink] = useState([]);
    const [seasonLink, setSeasonLink] = useState(null);
    const [runtimeLink, setRuntimeLink] = useState(null);
    const [movieLink, setMovieLink] = useState(null);
    const [seriesLink, setSeriesLink] = useState(null);
    const [episodeLink, setEpisodeLink] = useState(null);

    useEffect(() => {
        if (contentImgArray !== undefined) {
            setImgLink(contentImgArray[Object.keys(contentImgArray)][Object.keys(contentImgArray[Object.keys(contentImgArray)])].titleImg);
            setMaturityRatingLink(contentImgArray[Object.keys(contentImgArray)][Object.keys(contentImgArray[Object.keys(contentImgArray)])].maturityRating);
            setContentInfoLink(contentImgArray[Object.keys(contentImgArray)][Object.keys(contentImgArray[Object.keys(contentImgArray)])].thisContentIs);
            setSeasonLink(contentImgArray[Object.keys(contentImgArray)][Object.keys(contentImgArray[Object.keys(contentImgArray)])].NoOfSeasons);
            setRuntimeLink(contentImgArray[Object.keys(contentImgArray)][Object.keys(contentImgArray[Object.keys(contentImgArray)])].runtime);
            setEpisodeLink(contentImgArray[Object.keys(contentImgArray)][Object.keys(contentImgArray[Object.keys(contentImgArray)])].NoOfEpisodes);
            setMovieLink(contentImgArray[Object.keys(contentImgArray)][Object.keys(contentImgArray[Object.keys(contentImgArray)])].movieLink);
            setSeriesLink(contentImgArray[Object.keys(contentImgArray)][Object.keys(contentImgArray[Object.keys(contentImgArray)])].seriesLink);
        }
    }, [contentImgArray, setImgLink, setMaturityRatingLink, setContentInfoLink, setSeasonLink])

    let contentImage1Index;
    let contentImage2Index;
    let contentImage3Index;
    let contentImage4Index;
    const [trailerScrollLeftButton, settrailerScrollLeftButton] = useState({
        fontSize: '60px',
        padding: '0px 10px',
        height: '170px',
        border: 'none',
        backgroundColor: 'rgb(20,20,20)',
        color: 'white',
        zIndex: '-1',
    });

    const [trailerScrollRightButton, settrailerScrollRightButton] = useState({
        fontSize: '60px',
        padding: '0px 10px',
        height: '170x',
        border: 'none',
        backgroundColor: 'rgb(0,0,0,0.5)',
        color: 'white',
        zIndex: '3'
    });

    const containerRef = useRef(null);
    const divRef = useRef([]);

    const leftButtonRef = useRef(null);
    const rightButtonRef = useRef(null);
    const handleMouseEnterScroll = (direction) => {
        if (direction === 'left') {
            leftButtonRef.current.style.transition = 'fontSize 0.1s'
            leftButtonRef.current.style.fontSize = '70px'
        } else if (direction === 'right') {
            rightButtonRef.current.style.transition = 'fontSize 0.1s'
            rightButtonRef.current.style.fontSize = '70px'
        }
    }
    const handleMouseLeaveScroll = (direction) => {
        if (direction === 'left') {
            leftButtonRef.current.style.transition = 'fontSize 0.1s'
            leftButtonRef.current.style.fontSize = '60px'
        } else if (direction === 'right') {
            rightButtonRef.current.style.transition = 'fontSize 0.1s'
            rightButtonRef.current.style.fontSize = '60px'
        }
    }
    const [count, setCount] = useState(0);
    useEffect(() => {
        setCount(count + divRef.current[0].clientWidth);
    }, [])



    const handleSlide = (direction) => {
        const container = containerRef.current;
        const divWidth = divRef.current[0].clientWidth;
        const scrollAmount = divWidth;
        if (direction === 'left') {
            container.scrollTo({
                left: container.scrollLeft - scrollAmount,
                behavior: 'smooth'
            });
        } else if (direction === 'right') {
            setCount(count + container.scrollLeft)
            if (count < container.scrollWidth) {
                container.scrollTo({
                    left: container.scrollLeft + scrollAmount,
                    behavior: 'smooth'
                });
            } else {
                setCount(containerRef.current.clientWidth)
                container.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            }
        }
    };

    const [scrollX, setScrollX] = useState(0);
    const [reachedEnd, setReachedEnd] = useState(false);
    useEffect(() => {
        const container = containerRef.current;
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
                            zIndex: '3'
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
    }, [containerRef, reachedEnd, scrollX]);



    const videoInsiderRef = useRef([]);
    const insiderImgRef = useRef([]);
    const insiderComponentRef = useRef([]);
    const videoTitleImgRef = useRef([]);
    const insiderVolumneControlRef = useRef([]);
    const insiderUnmuteRef = useRef([]);
    const insiderMuteRef = useRef([]);
    const homeContentDivRef = useRef([]);
    const homeContainerRef = useRef(null);
    const [insiderMute, setInsiderMute] = useState(false);

    const handleInsiderVolumneControl = (index) => {
        const videoInsider = videoInsiderRef.current[index];
        videoInsider.muted = insiderMute;

        if (insiderMute === false) {
            setInsiderMute(true);
            insiderUnmuteRef.current[index].style.display = 'block';
            insiderMuteRef.current[index].style.display = 'none';
        } else {
            setInsiderMute(false);
            insiderUnmuteRef.current[index].style.display = 'none';
            insiderMuteRef.current[index].style.display = 'block';
        }
    }


    const addRef = useRef([]);
    const removeRef = useRef([]);

    const checkContent = async (index) => {
        try {
            const response = await fetch('https://netflixcloneserver-1g07.onrender.com/userList/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, contentLinkName: contentArray.contentLinkName[index] }),
            });

            if (response.status === 200) {
                // console.log('does not exist');
                removeRef.current[index].style.display = 'none';
                addRef.current[index].style.display = 'inline';
            }
            else if (response.status === 409) {
                // console.log('exist');
                removeRef.current[index].style.display = 'inline';
                addRef.current[index].style.display = 'none';
            }
            else {
                // console.log('Failed:', response.status);
                removeRef.current[index].style.display = 'none';
                addRef.current[index].style.display = 'inline';
            }
        } catch (error) {
            // console.error('Error checking content to user list:', error);
            try {
                removeRef.current[index].style.display = 'none';
                addRef.current[index].style.display = 'inline';
            } catch (err) {
                console.log(err)
            }
        }
    }


    const [loading, setLoading] = useState(true);
    const [i, setI] = useState(-1);

    const moreInfoRef = useRef([]);

    const videoPlayButtonRef = useRef([]);

    const timeoutRef = useRef(null);


    const set = (index) => {
        clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            console.log('entered settimeout')
            updateContentLink(contentArray.contentLinkName[index]);
            updateContentType(contentArray.contentType[index]);
            setI(index);
            setLoading(false);
        }, 1000)
    }


    useEffect(() => {
        clearTimeout(timeoutRef.current)
        if (loading === false) {

            leftButtonRef.current.style.display = 'none';
            rightButtonRef.current.style.display = 'none';

            divRef.current[Math.floor(i / 4)].style.position = 'absolute'
            divRef.current[Math.floor(i / 4)].style.zIndex = '3'

            homeContentDivRef.current[i].style.transition = 'transform 0.25s';
            homeContentDivRef.current[i].style.position = 'relative';
            homeContentDivRef.current[i].style.zIndex = '5';
            homeContentDivRef.current[i].style.transformOrigin = 'bottom left';
            homeContentDivRef.current[i].style.transform = 'scale(1.25) translateX(-10%)';
            insiderImgRef.current[i].style.boxShadow = '0px 0px 20px black';
            insiderComponentRef.current[i].style.display = 'block';


            if (videoLink !== null) {
                moreInfoRef.current[i].style.display = 'block';
                insiderImgRef.current[i].style.display = 'none';
                insiderVolumneControlRef.current[i].style.display = 'block';
                videoTitleImgRef.current[i].style.display = 'block';
                videoPlayButtonRef.current[i].style.display = 'inline'


                if (videoInsiderRef.current[i]) {
                    videoInsiderRef.current[i].style.display = 'block';
                    if (videoInsiderRef.current[i].paused) {
                        videoInsiderRef.current[i].play().catch(error => {
                            insiderImgRef.current[i].style.display = 'block';
                            console.error('Error playing video:', error)
                        });
                    }
                }

                if (videoInsiderRef.current[i].muted) {
                    insiderMuteRef.current[i].style.display = 'block';
                    insiderUnmuteRef.current[i].style.display = 'none';
                } else {
                    insiderMuteRef.current[i].style.display = 'none';
                    insiderUnmuteRef.current[i].style.display = 'block';
                }
            }
            else {
                setImgLink('')
                setMaturityRatingLink('')
                setContentInfoLink('')
                setSeasonLink('')
                setRuntimeLink('')
                setEpisodeLink('')
                videoPlayButtonRef.current[i].style.display = 'none'
                insiderImgRef.current[i].style.display = 'block';
                insiderVolumneControlRef.current[i].style.display = 'none';
                videoTitleImgRef.current[i].style.display = 'none';
                moreInfoRef.current[i].style.display = 'none';
            }
        }
        return () => {
            clearTimeout(timeoutRef.current);
        };

    }, [videoLink, loading, i, timeoutRef]);


    const handleMouseLeave = (index) => {
        clearTimeout(timeoutRef.current)
        setLoading(true)
        setI(-1)
        updateVideoLink(null);
        updateVideoImgLink([]);
        updateContentLink(null);

        if (videoLink !== null) {
            videoInsiderRef.current[index].pause();
            videoInsiderRef.current[index].currentTime = 0;
            videoInsiderRef.current[index].style.display = 'none';
        }


        divRef.current[Math.floor(index / 4)].style.position = ''
        divRef.current[Math.floor(index / 4)].style.zIndex = ''


        if (Math.floor(index / 4) === 3) {
            const scrollWidth = containerRef.current.scrollWidth;
            containerRef.current.scrollLeft = scrollWidth;
        }


        leftButtonRef.current.style.display = 'block';
        rightButtonRef.current.style.display = 'block';



        insiderImgRef.current[index].style.boxShadow = '0px 0px 0px black';
        homeContentDivRef.current[index].style.zIndex = '0';
        homeContentDivRef.current[index].style.transition = 'transform 0.25s';
        homeContentDivRef.current[index].style.transformOrigin = 'bottom left';
        homeContentDivRef.current[index].style.transform = 'scale(1) translateX(0%)';


        insiderComponentRef.current[index].style.display = 'none';
        insiderImgRef.current[index].style.display = 'block';
    }



    const addListTitleRef = useRef([]);
    const removeListTitleRef = useRef([]);
    const moreInfoTitleRef = useRef([]);




    const handleListClick = async (index) => {
        if (removeRef.current[index].style.display === 'none') {
            console.log('added')
            removeRef.current[index].style.display = 'block';
            addRef.current[index].style.display = 'none';
            try {
                const response = await fetch('https://netflixcloneserver-1g07.onrender.com/userList/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({ email: email, contentLinkName: contentArray.contentLinkName[index] }),
                });

                if (response.status === 200) {
                    // console.log('Added successfully');
                    updateMyListUpdation((prev) => prev + 1);
                }
                else if (response.status === 400) {
                    // console.log('Failed: ', response.status);
                }
                else {
                    // console.log('Failed:', response.status);
                }
            } catch (error) {
                // console.error('Error adding content to user list:', error);
            }
        } else {
            console.log('removed')
            removeRef.current[index].style.display = 'none';
            addRef.current[index].style.display = 'block';
            try {
                const response = await fetch('https://netflixcloneserver-1g07.onrender.com/userList/remove', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({ email: email, contentLinkName: contentArray.contentLinkName[index] }),
                });

                if (response.status === 200) {
                    // console.log('Removed successfully');
                    updateMyListUpdation((prev) => prev + 1)
                }
                else if (response.status === 400) {
                    // console.log('Failed: ', response.status);
                }
                else {
                    // console.log('Failed:', response.status);
                }
            } catch (error) {
                // console.error('Error removing content to user list:', error);
            }
        }
    }



    const handleMoreInfo = (index) => {
        updateShowMore(true);
        if (videoLink !== null) {
            videoInsiderRef.current[index].pause();
            videoInsiderRef.current[index].currentTime = 0;
            videoInsiderRef.current[index].style.display = 'none';
        }
    }

    const showAddRemoveTitle = (index) => {
        if (removeRef.current[index].style.display === 'none') {
            addListTitleRef.current[index].style.display = 'inline'
            removeListTitleRef.current[index].style.display = 'none'
        } else {
            removeListTitleRef.current[index].style.display = 'inline'
            addListTitleRef.current[index].style.display = 'none'
        }
    }

    const hideAddRemoveTitle = (index) => {
        addListTitleRef.current[index].style.display = 'none'
        removeListTitleRef.current[index].style.display = 'none'
    }


    const showMoreInfoTitle = (index) => {
        moreInfoTitleRef.current[index].style.display = 'inline'
    }

    const hideMoreInfoTitle = (index) => {
        moreInfoTitleRef.current[index].style.display = 'none'
    }

    const [videoSrc, setVideoSrc] = useState(null);
    const [videoTitle, setVideoTitle] = useState(null);


    const playContent = async (index) => {
        if (movieLink !== undefined) {
            setVideoSrc(movieLink);
        } else {
            setVideoSrc(seriesLink);
        }
        setVideoTitle(contentArray.contentTitle[index]);

        try {
            const response = await fetch('https://netflixcloneserver-1g07.onrender.com/userHistory/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, contentLinkName: contentArray.contentLinkName[index] }),
            });

            if (response.status === 200) {
                // console.log('Added successfully');
                updateMyListUpdation((prev) => prev + 1);
            }
            else if (response.status === 400) {
                // console.log('Failed: ', response.status);
            }
            else {
                // console.log('Failed:', response.status);
            }
        } catch (error) {
            // console.error('Error adding content to user list:', error);
        }

    }

    const closeVideo = () => {
        setVideoSrc(null);
        setVideoTitle(null);
    }


    const contentArray = contents.find((contents) => contents)
    const contentSlider = contentArray.contentImg.map((item, index) => {
        if (contentImage4Index === contentArray.contentImg.length - 1) {
            return null;
        }
        if (index === 0) {
            contentImage1Index = index;
            contentImage2Index = index + 1;
            contentImage3Index = index + 2;
            contentImage4Index = index + 3;
        } else {
            contentImage1Index = contentImage4Index + 1;
            contentImage2Index = contentImage1Index + 1;
            contentImage3Index = contentImage2Index + 1;
            contentImage4Index = contentImage3Index + 1;
        }
        let t1 = contentImage1Index;
        let t2 = contentImage2Index;
        let t3 = contentImage3Index;
        let t4 = contentImage4Index;


        return (
            <div key={index} className='home-content-container' ref={el => divRef.current[index] = el}>
                <div className='home-content-name' ref={el => homeContentDivRef.current[t1] = el} onMouseEnter={() => { set(t1); checkContent(t1); }} onMouseLeave={() => handleMouseLeave(t1)}>

                    {videoLink !== null &&
                        (
                            <video ref={el => videoInsiderRef.current[t1] = el} src={videoLink} poster={contentArray.contentImg[contentImage1Index]} playsInline preload="none" muted></video>
                        )
                    }
                    <img ref={el => insiderImgRef.current[t1] = el} style={{ height: '169px', width: '299px', borderRadius: '4px' }} src={contentArray.contentImg[contentImage1Index]} alt={contentArray.contentTitle[contentImage1Index]} title={contentArray.contentTitle[contentImage1Index]}></img>
                    <div ref={el => insiderComponentRef.current[t1] = el} style={{ boxShadow: '0px 0px 20px rgb(0,0,0)', display: 'none', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px', backgroundColor: '#181818', width: '299px', height: '160px' }}>
                        <div id='insider-div-components' >
                            <br></br>
                            <div id='insider-video-div-components' style={{ position: 'relative', bottom: '65px', display: 'flex', flexDirection: 'row', height: '0', alignItems: 'center', justifyContent: 'space-evenly' }}>

                                <img ref={el => videoTitleImgRef.current[t1] = el} src={imgLink} width={192} height={43.2} alt={contentArray.contentTitle[contentImage1Index]}></img>

                                <button ref={el => insiderVolumneControlRef.current[t1] = el} onClick={() => handleInsiderVolumneControl(t1)} id='insider-video-div-components-volume-control-button'>
                                    <svg ref={el => insiderUnmuteRef.current[t1] = el} style={{ height: '20', width: '30' }} >
                                        <line x1="3" y1="7" x2="3" y2="14" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="3" y1="7" x2="10" y2="7" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="3" y1="14" x2="10" y2="14" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="10" y1="7" x2="15" y2="3.5" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="10" y1="14" x2="15" y2="17.5" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="15" y1="3.5" x2="15" y2="17.5" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <path d="M 18.5 7 A 30 30 0 0 1 18.5 14" fill="none" stroke="#a1a1a1" strokeWidth={1.5} />
                                        <path d="M 22 3.5 A 20 20 0 0 1 22 17.5" fill="none" stroke="#a1a1a1" strokeWidth={1.5} />
                                    </svg>
                                    <svg ref={el => insiderMuteRef.current[t1] = el} style={{ height: '20', width: '30' }} >
                                        <line x1="3" y1="7" x2="3" y2="14" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="3" y1="7" x2="10" y2="7" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="3" y1="14" x2="10" y2="14" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="10" y1="7" x2="15" y2="3.5" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="10" y1="14" x2="15" y2="17.5" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="15" y1="3.5" x2="15" y2="17.5" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="18.5" y1="7" x2="26.5" y2="14" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="18.5" y1="14" x2="26.5" y2="7" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                    </svg>
                                </button>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginLeft: '10px' }}>
                                <div>
                                    <svg height={"42px"} width={"42px"} ref={el => videoPlayButtonRef.current[t1] = el} onClick={() => playContent(t1)}>
                                        <circle cx={20} cy={20} r='19' stroke='white' fill='white'></circle>
                                        <polygon points="15,10 15,30 30,20" fill="black" strokeWidth="1" stroke="black"></polygon>
                                    </svg>
                                    <p ref={el => addListTitleRef.current[t1] = el} style={{ color: 'black', backgroundColor: 'white', fontFamily: 'NetflixSansLite', borderRadius: '4px', position: 'absolute', left: '30px', top: '140px', padding: '5px 10px', display: 'none' }}>Add to list</p>
                                    <p ref={el => removeListTitleRef.current[t1] = el} style={{ color: 'black', backgroundColor: 'white', fontFamily: 'NetflixSansLite', borderRadius: '4px', position: 'absolute', left: '30px', top: '140px', padding: '5px 10px', display: 'none' }}>Remove from list</p>

                                    <svg height={"42px"} width={"42px"} onClick={() => { handleListClick(t1) }} onMouseEnter={() => showAddRemoveTitle(t1)} onMouseLeave={() => hideAddRemoveTitle(t1)}>
                                        <circle cx={20} cy={20} r='19' stroke='#a1a1a1' strokeWidth={1.5} fill='none'></circle>
                                        <g ref={el => addRef.current[t1] = el}>
                                            <line x1={20} y1={10} x2={20} y2={30} strokeWidth="1" stroke="white"></line>
                                            <line x1={10} y1={20} x2={30} y2={20} strokeWidth="1" stroke="white"></line>
                                        </g>
                                        <g ref={el => removeRef.current[t1] = el} style={{ display: 'none' }}>
                                            <line x1="10" y1="20" x2="16" y2="26" strokeWidth="1" stroke="white" />
                                            <line x1="16" y1="26" x2="30" y2="12" strokeWidth="1" stroke="white" />
                                        </g>
                                    </svg>
                                </div>
                                <p ref={el => moreInfoTitleRef.current[t1] = el} style={{ color: 'black', backgroundColor: 'white', fontFamily: 'NetflixSansLite', borderRadius: '4px', position: 'absolute', right: '-10px', top: '140px', padding: '5px 10px', display: 'none' }}>More Info</p>
                                <svg height={"42px"} width={"42px"} onClick={() => handleMoreInfo(t1)} ref={el => moreInfoRef.current[t1] = el} onMouseEnter={() => showMoreInfoTitle(t1)} onMouseLeave={() => hideMoreInfoTitle(t1)}>
                                    <circle cx={20} cy={20} r='19' stroke='#a1a1a1' strokeWidth={1.5} fill='none'></circle>
                                    <line x1="11" y1="18" x2="20" y2="26" strokeWidth="2" stroke="white" />
                                    <line x1="20" y1="26" x2="29" y2="18" strokeWidth="2" stroke="white" />
                                </svg>
                            </div>
                        </div>
                        <div id='insider-info' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: '', marginLeft: '10px' }}>
                            <p style={{ color: '#a1a1a1', border: '1px solid #a1a1a1', width: 'fit-content', height: 'fit-content', padding: '1px 6px', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{maturityRatingLink}</p>
                            <p> &nbsp;</p>
                            <p style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{contentArray.contentType[contentImage1Index] === 'series' ? (<span>{seasonLink === 1 ? (<span>{episodeLink} Episodes</span>) : (<span>{seasonLink} Seasons </span>)}</span>) : (<span>{runtimeLink}</span>)}</p>
                        </div>
                        <div id='insider-show-info' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '10px' }}>
                            <p style={{ color: 'white', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{contentInfoLink[0]}</p>
                            <p style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>&nbsp;&bull;&nbsp;</p>
                            <p style={{ color: 'white', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{contentInfoLink[1]}</p>
                            <p style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>&nbsp;&bull;&nbsp;</p>
                            <p style={{ color: 'white', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{contentInfoLink[2]}</p>
                        </div>
                        <br></br>
                    </div>

                </div>
                <div className='home-content-name' ref={el => homeContentDivRef.current[t2] = el} onMouseEnter={() => { set(t2); checkContent(t2); }} onMouseLeave={() => handleMouseLeave(t2)}>

                    {videoLink !== null &&
                        (
                            <video ref={el => videoInsiderRef.current[t2] = el} src={videoLink} poster={contentArray.contentImg[contentImage2Index]} playsInline preload="none" muted></video>
                        )
                    }
                    <img ref={el => insiderImgRef.current[t2] = el} style={{ height: '169px', width: '299px', borderRadius: '4px' }} src={contentArray.contentImg[contentImage2Index]} alt={contentArray.contentTitle[contentImage2Index]} title={contentArray.contentTitle[contentImage2Index]}></img>
                    <div ref={el => insiderComponentRef.current[t2] = el} style={{ boxShadow: '0px 0px 20px rgb(0,0,0)', display: 'none', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px', backgroundColor: '#181818', width: '299px', height: '160px' }}>
                        <div id='insider-div-components' >
                            <br></br>
                            <div id='insider-video-div-components' style={{ position: 'relative', bottom: '65px', display: 'flex', flexDirection: 'row', height: '0', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                <img ref={el => videoTitleImgRef.current[t2] = el} src={imgLink} width={192} height={43.2} alt={contentArray.contentTitle[contentImage2Index]}></img>
                                <button ref={el => insiderVolumneControlRef.current[t2] = el} onClick={() => handleInsiderVolumneControl(t2)} id='insider-video-div-components-volume-control-button'>
                                    <svg ref={el => insiderUnmuteRef.current[t2] = el} style={{ height: '20', width: '30' }} >
                                        <line x1="3" y1="7" x2="3" y2="14" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="3" y1="7" x2="10" y2="7" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="3" y1="14" x2="10" y2="14" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="10" y1="7" x2="15" y2="3.5" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="10" y1="14" x2="15" y2="17.5" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="15" y1="3.5" x2="15" y2="17.5" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <path d="M 18.5 7 A 30 30 0 0 1 18.5 14" fill="none" stroke="#a1a1a1" strokeWidth={1.5} />
                                        <path d="M 22 3.5 A 20 20 0 0 1 22 17.5" fill="none" stroke="#a1a1a1" strokeWidth={1.5} />
                                    </svg>
                                    <svg ref={el => insiderMuteRef.current[t2] = el} style={{ height: '20', width: '30' }} >
                                        <line x1="3" y1="7" x2="3" y2="14" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="3" y1="7" x2="10" y2="7" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="3" y1="14" x2="10" y2="14" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="10" y1="7" x2="15" y2="3.5" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="10" y1="14" x2="15" y2="17.5" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="15" y1="3.5" x2="15" y2="17.5" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="18.5" y1="7" x2="26.5" y2="14" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="18.5" y1="14" x2="26.5" y2="7" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                    </svg>
                                </button>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginLeft: '10px' }}>
                                <div>
                                    <svg height={"42px"} width={"42px"} ref={el => videoPlayButtonRef.current[t2] = el} onClick={() => playContent(t2)}>
                                        <circle cx={20} cy={20} r='19' stroke='white' fill='white'></circle>
                                        <polygon points="15,10 15,30 30,20" fill="black" strokeWidth="1" stroke="black"></polygon>
                                    </svg>
                                    <p ref={el => addListTitleRef.current[t2] = el} style={{ color: 'black', backgroundColor: 'white', fontFamily: 'NetflixSansLite', borderRadius: '4px', position: 'absolute', left: '30px', top: '140px', padding: '5px 10px', display: 'none' }}>Add to list</p>
                                    <p ref={el => removeListTitleRef.current[t2] = el} style={{ color: 'black', backgroundColor: 'white', fontFamily: 'NetflixSansLite', borderRadius: '4px', position: 'absolute', left: '30px', top: '140px', padding: '5px 10px', display: 'none' }}>Remove from list</p>

                                    <svg height={"42px"} width={"42px"} onClick={() => handleListClick(t2)} onMouseEnter={() => showAddRemoveTitle(t2)} onMouseLeave={() => hideAddRemoveTitle(t2)}>
                                        <circle cx={20} cy={20} r='19' stroke='#a1a1a1' strokeWidth={1.5} fill='none'></circle>
                                        <g ref={el => addRef.current[t2] = el}>
                                            <line x1={20} y1={10} x2={20} y2={30} strokeWidth="1" stroke="white"></line>
                                            <line x1={10} y1={20} x2={30} y2={20} strokeWidth="1" stroke="white"></line>
                                        </g>
                                        <g ref={el => removeRef.current[t2] = el} style={{ display: 'none' }}>
                                            <line x1="10" y1="20" x2="16" y2="26" strokeWidth="1" stroke="white" />
                                            <line x1="16" y1="26" x2="30" y2="12" strokeWidth="1" stroke="white" />
                                        </g>
                                    </svg>
                                </div>
                                <p ref={el => moreInfoTitleRef.current[t2] = el} style={{ color: 'black', backgroundColor: 'white', fontFamily: 'NetflixSansLite', borderRadius: '4px', position: 'absolute', right: '-10px', top: '140px', padding: '5px 10px', display: 'none' }}>More Info</p>
                                <svg height={"42px"} width={"42px"} onClick={() => handleMoreInfo(t2)} ref={el => moreInfoRef.current[t2] = el} onMouseEnter={() => showMoreInfoTitle(t2)} onMouseLeave={() => hideMoreInfoTitle(t2)}>
                                    <circle cx={20} cy={20} r='19' stroke='#a1a1a1' strokeWidth={1.5} fill='none'></circle>
                                    <line x1="11" y1="18" x2="20" y2="26" strokeWidth="2" stroke="white" />
                                    <line x1="20" y1="26" x2="29" y2="18" strokeWidth="2" stroke="white" />
                                </svg>
                            </div>
                        </div>
                        <div id='insider-info' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: '', marginLeft: '10px' }}>
                            <p style={{ color: '#a1a1a1', border: '1px solid #a1a1a1', width: 'fit-content', height: 'fit-content', padding: '1px 6px', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{maturityRatingLink}</p>
                            <p> &nbsp;</p>
                            <p style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{contentArray.contentType[contentImage2Index] === 'series' ? (<span>{seasonLink === 1 ? (<span>{episodeLink} Episodes</span>) : (<span>{seasonLink} Seasons </span>)}</span>) : (<span>{runtimeLink}</span>)}</p>
                        </div>
                        <div id='insider-show-info' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '10px' }}>
                            <p style={{ color: 'white', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{contentInfoLink[0]}</p>
                            <p style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>&nbsp;&bull;&nbsp;</p>
                            <p style={{ color: 'white', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{contentInfoLink[1]}</p>
                            <p style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>&nbsp;&bull;&nbsp;</p>
                            <p style={{ color: 'white', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{contentInfoLink[2]}</p>
                        </div>
                        <br></br>
                    </div>
                </div>
                <div className='home-content-name' ref={el => homeContentDivRef.current[t3] = el} onMouseEnter={() => { set(t3); checkContent(t3); }} onMouseLeave={() => handleMouseLeave(t3)}>
                    {videoLink !== null &&
                        (
                            <video ref={el => videoInsiderRef.current[t3] = el} src={videoLink} poster={contentArray.contentImg[contentImage3Index]} playsInline preload="none" muted></video>
                        )
                    }
                    <img ref={el => insiderImgRef.current[t3] = el} style={{ height: '169px', width: '299px', borderRadius: '4px' }} src={contentArray.contentImg[contentImage3Index]} alt={contentArray.contentTitle[contentImage3Index]} title={contentArray.contentTitle[contentImage3Index]}></img>
                    <div ref={el => insiderComponentRef.current[t3] = el} style={{ boxShadow: '0px 0px 20px rgb(0,0,0)', display: 'none', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px', backgroundColor: '#181818', width: '299px', height: '160px' }}>
                        <div id='insider-div-components' >
                            <br></br>
                            <div id='insider-video-div-components' style={{ position: 'relative', bottom: '65px', display: 'flex', flexDirection: 'row', height: '0', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                <img ref={el => videoTitleImgRef.current[t3] = el} src={imgLink} width={192} height={43.2} alt={contentArray.contentTitle[contentImage3Index]}></img>
                                <button ref={el => insiderVolumneControlRef.current[t3] = el} onClick={() => handleInsiderVolumneControl(t3)} id='insider-video-div-components-volume-control-button'>
                                    <svg ref={el => insiderUnmuteRef.current[t3] = el} style={{ height: '20', width: '30' }} >
                                        <line x1="3" y1="7" x2="3" y2="14" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="3" y1="7" x2="10" y2="7" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="3" y1="14" x2="10" y2="14" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="10" y1="7" x2="15" y2="3.5" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="10" y1="14" x2="15" y2="17.5" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="15" y1="3.5" x2="15" y2="17.5" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <path d="M 18.5 7 A 30 30 0 0 1 18.5 14" fill="none" stroke="#a1a1a1" strokeWidth={1.5} />
                                        <path d="M 22 3.5 A 20 20 0 0 1 22 17.5" fill="none" stroke="#a1a1a1" strokeWidth={1.5} />
                                    </svg>
                                    <svg ref={el => insiderMuteRef.current[t3] = el} style={{ height: '20', width: '30' }} >
                                        <line x1="3" y1="7" x2="3" y2="14" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="3" y1="7" x2="10" y2="7" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="3" y1="14" x2="10" y2="14" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="10" y1="7" x2="15" y2="3.5" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="10" y1="14" x2="15" y2="17.5" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="15" y1="3.5" x2="15" y2="17.5" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="18.5" y1="7" x2="26.5" y2="14" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="18.5" y1="14" x2="26.5" y2="7" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                    </svg>
                                </button>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginLeft: '10px' }}>
                                <div>
                                    <svg height={"42px"} width={"42px"} ref={el => videoPlayButtonRef.current[t3] = el} onClick={() => playContent(t3)}>
                                        <circle cx={20} cy={20} r='19' stroke='white' fill='white'></circle>
                                        <polygon points="15,10 15,30 30,20" fill="black" strokeWidth="1" stroke="black"></polygon>
                                    </svg>
                                    <p ref={el => addListTitleRef.current[t3] = el} style={{ color: 'black', backgroundColor: 'white', fontFamily: 'NetflixSansLite', borderRadius: '4px', position: 'absolute', left: '30px', top: '140px', padding: '5px 10px', display: 'none' }}>Add to list</p>
                                    <p ref={el => removeListTitleRef.current[t3] = el} style={{ color: 'black', backgroundColor: 'white', fontFamily: 'NetflixSansLite', borderRadius: '4px', position: 'absolute', left: '30px', top: '140px', padding: '5px 10px', display: 'none' }}>Remove from list</p>

                                    <svg height={"42px"} width={"42px"} onClick={() => handleListClick(t3)} onMouseEnter={() => showAddRemoveTitle(t3)} onMouseLeave={() => hideAddRemoveTitle(t3)}>
                                        <circle cx={20} cy={20} r='19' stroke='#a1a1a1' strokeWidth={1.5} fill='none'></circle>
                                        <g ref={el => addRef.current[t3] = el}>
                                            <line x1={20} y1={10} x2={20} y2={30} strokeWidth="1" stroke="white"></line>
                                            <line x1={10} y1={20} x2={30} y2={20} strokeWidth="1" stroke="white"></line>
                                        </g>
                                        <g ref={el => removeRef.current[t3] = el} style={{ display: 'none' }}>
                                            <line x1="10" y1="20" x2="16" y2="26" strokeWidth="1" stroke="white" />
                                            <line x1="16" y1="26" x2="30" y2="12" strokeWidth="1" stroke="white" />
                                        </g>
                                    </svg>
                                </div>
                                <p ref={el => moreInfoTitleRef.current[t3] = el} style={{ color: 'black', backgroundColor: 'white', fontFamily: 'NetflixSansLite', borderRadius: '4px', position: 'absolute', right: '-10px', top: '140px', padding: '5px 10px', display: 'none' }}>More Info</p>
                                <svg height={"42px"} width={"42px"} onClick={() => handleMoreInfo(t3)} ref={el => moreInfoRef.current[t3] = el} onMouseEnter={() => showMoreInfoTitle(t3)} onMouseLeave={() => hideMoreInfoTitle(t3)}>
                                    <circle cx={20} cy={20} r='19' stroke='#a1a1a1' strokeWidth={1.5} fill='none'></circle>
                                    <line x1="11" y1="18" x2="20" y2="26" strokeWidth="2" stroke="white" />
                                    <line x1="20" y1="26" x2="29" y2="18" strokeWidth="2" stroke="white" />
                                </svg>
                            </div>
                        </div>
                        <div id='insider-info' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: '', marginLeft: '10px' }}>
                            <p style={{ color: '#a1a1a1', border: '1px solid #a1a1a1', width: 'fit-content', height: 'fit-content', padding: '1px 6px', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{maturityRatingLink}</p>
                            <p> &nbsp;</p>
                            <p style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{contentArray.contentType[contentImage3Index] === 'series' ? (<span>{seasonLink === 1 ? (<span>{episodeLink} Episodes</span>) : (<span>{seasonLink} Seasons </span>)}</span>) : (<span>{runtimeLink}</span>)}</p>
                        </div>
                        <div id='insider-show-info' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '10px' }}>
                            <p style={{ color: 'white', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{contentInfoLink[0]}</p>
                            <p style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>&nbsp;&bull;&nbsp;</p>
                            <p style={{ color: 'white', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{contentInfoLink[1]}</p>
                            <p style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>&nbsp;&bull;&nbsp;</p>
                            <p style={{ color: 'white', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{contentInfoLink[2]}</p>
                        </div>
                        <br></br>
                    </div>
                </div>
                <div className='home-content-name' ref={el => homeContentDivRef.current[t4] = el} onMouseEnter={() => { set(t4); checkContent(t4); }} onMouseLeave={() => handleMouseLeave(t4)}>
                    {videoLink !== null &&
                        (
                            <video ref={el => videoInsiderRef.current[t4] = el} src={videoLink} poster={contentArray.contentImg[contentImage4Index]} playsInline preload="none" muted></video>
                        )
                    }
                    <img ref={el => insiderImgRef.current[t4] = el} style={{ height: '169px', width: '299px', borderRadius: '4px' }} src={contentArray.contentImg[contentImage4Index]} alt={contentArray.contentTitle[contentImage4Index]} title={contentArray.contentTitle[contentImage4Index]}></img>
                    <div ref={el => insiderComponentRef.current[t4] = el} style={{ boxShadow: '0px 0px 20px rgb(0,0,0)', display: 'none', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px', backgroundColor: '#181818', width: '299px', height: '160px' }}>
                        <div id='insider-div-components' >
                            <br></br>
                            <div id='insider-video-div-components' style={{ position: 'relative', bottom: '65px', display: 'flex', flexDirection: 'row', height: '0', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                <img ref={el => videoTitleImgRef.current[t4] = el} src={imgLink} width={192} height={43.2} alt={contentArray.contentTitle[contentImage4Index]}></img>
                                <button ref={el => insiderVolumneControlRef.current[t4] = el} onClick={() => handleInsiderVolumneControl(t4)} id='insider-video-div-components-volume-control-button'>
                                    <svg ref={el => insiderUnmuteRef.current[t4] = el} style={{ height: '20', width: '30' }} >
                                        <line x1="3" y1="7" x2="3" y2="14" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="3" y1="7" x2="10" y2="7" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="3" y1="14" x2="10" y2="14" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="10" y1="7" x2="15" y2="3.5" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="10" y1="14" x2="15" y2="17.5" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="15" y1="3.5" x2="15" y2="17.5" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <path d="M 18.5 7 A 30 30 0 0 1 18.5 14" fill="none" stroke="#a1a1a1" strokeWidth={1.5} />
                                        <path d="M 22 3.5 A 20 20 0 0 1 22 17.5" fill="none" stroke="#a1a1a1" strokeWidth={1.5} />
                                    </svg>
                                    <svg ref={el => insiderMuteRef.current[t4] = el} style={{ height: '20', width: '30' }} >
                                        <line x1="3" y1="7" x2="3" y2="14" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="3" y1="7" x2="10" y2="7" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="3" y1="14" x2="10" y2="14" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="10" y1="7" x2="15" y2="3.5" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="10" y1="14" x2="15" y2="17.5" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="15" y1="3.5" x2="15" y2="17.5" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="18.5" y1="7" x2="26.5" y2="14" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="18.5" y1="14" x2="26.5" y2="7" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                    </svg>
                                </button>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginLeft: '10px' }}>
                                <div>
                                    <svg height={"42px"} width={"42px"} ref={el => videoPlayButtonRef.current[t4] = el} onClick={() => playContent(t4)}>
                                        <circle cx={20} cy={20} r='19' stroke='white' fill='white'></circle>
                                        <polygon points="15,10 15,30 30,20" fill="black" strokeWidth="1" stroke="black"></polygon>
                                    </svg>
                                    <p ref={el => addListTitleRef.current[t4] = el} style={{ color: 'black', backgroundColor: 'white', fontFamily: 'NetflixSansLite', borderRadius: '4px', position: 'absolute', left: '30px', top: '140px', padding: '5px 10px', display: 'none' }}>Add to list</p>
                                    <p ref={el => removeListTitleRef.current[t4] = el} style={{ color: 'black', backgroundColor: 'white', fontFamily: 'NetflixSansLite', borderRadius: '4px', position: 'absolute', left: '30px', top: '140px', padding: '5px 10px', display: 'none' }}>Remove from list</p>

                                    <svg height={"42px"} width={"42px"} onClick={() => handleListClick(t4)} onMouseEnter={() => showAddRemoveTitle(t4)} onMouseLeave={() => hideAddRemoveTitle(t4)}>
                                        <circle cx={20} cy={20} r='19' stroke='#a1a1a1' strokeWidth={1.5} fill='none'></circle>
                                        <g ref={el => addRef.current[t4] = el}>
                                            <line x1={20} y1={10} x2={20} y2={30} strokeWidth="1" stroke="white"></line>
                                            <line x1={10} y1={20} x2={30} y2={20} strokeWidth="1" stroke="white"></line>
                                        </g>
                                        <g ref={el => removeRef.current[t4] = el} style={{ display: 'none' }}>
                                            <line x1="10" y1="20" x2="16" y2="26" strokeWidth="1" stroke="white" />
                                            <line x1="16" y1="26" x2="30" y2="12" strokeWidth="1" stroke="white" />
                                        </g>
                                    </svg>
                                </div>
                                <p ref={el => moreInfoTitleRef.current[t4] = el} style={{ color: 'black', backgroundColor: 'white', fontFamily: 'NetflixSansLite', borderRadius: '4px', position: 'absolute', right: '-10px', top: '140px', padding: '5px 10px', display: 'none' }}>More Info</p>

                                <svg height={"42px"} width={"42px"} onClick={() => handleMoreInfo(t4)} ref={el => moreInfoRef.current[t4] = el} onMouseEnter={() => showMoreInfoTitle(t4)} onMouseLeave={() => hideMoreInfoTitle(t4)}>
                                    <circle cx={20} cy={20} r='19' stroke='#a1a1a1' strokeWidth={1.5} fill='none'></circle>
                                    <line x1="11" y1="18" x2="20" y2="26" strokeWidth="2" stroke="white" />
                                    <line x1="20" y1="26" x2="29" y2="18" strokeWidth="2" stroke="white" />
                                </svg>
                            </div>
                        </div>
                        <div id='insider-info' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: '', marginLeft: '10px' }}>
                            <p style={{ color: '#a1a1a1', border: '1px solid #a1a1a1', width: 'fit-content', height: 'fit-content', padding: '1px 6px', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{maturityRatingLink}</p>
                            <p> &nbsp;</p>
                            <p style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{contentArray.contentType[contentImage4Index] === 'series' ? (<span>{seasonLink === 1 ? (<span>{episodeLink} Episodes</span>) : (<span>{seasonLink} Seasons </span>)}</span>) : (<span>{runtimeLink}</span>)}</p>
                        </div>
                        <div id='insider-show-info' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '10px' }}>
                            <p style={{ color: 'white', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{contentInfoLink[0]}</p>
                            <p style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>&nbsp;&bull;&nbsp;</p>
                            <p style={{ color: 'white', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{contentInfoLink[1]}</p>
                            <p style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>&nbsp;&bull;&nbsp;</p>
                            <p style={{ color: 'white', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{contentInfoLink[2]}</p>
                        </div>
                        <br></br>
                    </div>
                </div>
            </div >
        )
    }
    );

    return (
        <>
            <div id='home-content' ref={homeContainerRef}>
                <div id='home-content-slider' ref={containerRef}>
                    {contentSlider}
                </div>
                <div id='home-content-scroll-bottons'>
                    <button onClick={() => handleSlide('left')} onMouseEnter={() => handleMouseEnterScroll('left')} onMouseLeave={() => handleMouseLeaveScroll('left')} style={trailerScrollLeftButton} ref={leftButtonRef}>&lsaquo;</button>
                    <button onClick={() => handleSlide('right')} onMouseEnter={() => handleMouseEnterScroll('right')} onMouseLeave={() => handleMouseLeaveScroll('right')} style={trailerScrollRightButton} ref={rightButtonRef}>&rsaquo;</button>
                </div>
            </div>
            {videoSrc !== null &&
                (
                    <div id='home-content-video-player'>
                        <video src={videoSrc} controls autoPlay ></video>
                        <div id='home-content-video-title'>
                            <svg height={30} width={30} onClick={closeVideo}>
                                <line x1={4} y1={15} x2={14} y2={5} stroke='white' strokeWidth={3}></line>
                                <line x1={4} y1={15} x2={14} y2={25} stroke='white' strokeWidth={3}></line>
                                <line x1={4} y1={15} x2={29} y2={15} stroke='white' strokeWidth={3}></line>
                            </svg>
                            <p style={{ color: 'white', fontFamily: 'NetflixSans', fontSize: '20px' }}> <span style={{ color: 'rgb(229,9,20)', fontSize: '25px', fontWeight: 'bolder' }}> | </span> {videoTitle}</p>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default HomeXComponent;