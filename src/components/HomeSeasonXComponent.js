import { useState } from 'react';
import './HomeSeasonXComponent.css';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { VideoContext } from '../context/videoContext';
import { HomeContext } from '../context/homeContext';
import { MyListContext } from "../context/myListContext";


function HomeSeasonXComponent({ series, seasons, moreDetails }) {


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
                console.log('User is valid. Email:', data.email);
                setEmail(data.email);
            } else if (response.status === 401) {
                console.log('User is not valid. Proceed to error page');
            } else {
                console.log('Unexpected response status:', response.status);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        check();
    }, []);


    const { updateShowMore } = useContext(VideoContext);
    const { updateContentLink } = useContext(HomeContext);


    const [selectStyle, setSelectStyle] = useState({
        backgroundColor: '#242424',
        border: '1px #a1a1a1 solid',
        borderRadius: '4px',
        color: 'white',
        display: 'block',
        fontSize: '20px',
        fontFamily: 'NetflixSansLite',
        cursor: 'Pointer',
        padding: '0px 20px',
        height: '50px'
    }
    );

    const [selectedPart, setSelectedPart] = useState(Object.keys(seasons[0])[0]);

    const handlePartChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedPart(selectedValue);
    };
    const selectedSeason = seasons.find((season) => season[selectedPart]);
    const seriesArray = series.find((series) => series);
    useEffect(() => {
        document.title = `${seriesArray.titleName} - Netflix`
        updateContentLink(null)
    }, [seriesArray.titleName, updateContentLink])
    const moreDetailsArray = moreDetails.find((moreDetails) => moreDetails);

    const [mute, setMute] = useState(false);

    const videoRef = useRef(null);
    const muteRef = useRef(null);
    const unmuteRef = useRef(null);

    const handleVolumneControl = () => {
        const video = videoRef.current;
        video.muted = mute;

        if (mute === false) {
            setMute(true);
            unmuteRef.current.style.display = 'block';
            muteRef.current.style.display = 'none';
        } else {
            setMute(false);
            unmuteRef.current.style.display = 'none';
            muteRef.current.style.display = 'block';
        }
    }

    const addRef = useRef(null);
    const removeRef = useRef(null);

    const checkContent = async () => {
        try {
            const response = await fetch('https://netflixcloneserver-1g07.onrender.com/userList/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({ email: email, contentLinkName: seriesArray.contentLinkName }),
            });
            console.log(series.contentLinkName)
            console.log(email)
            if (response.status === 200) {
                console.log('does not exist');
                removeRef.current.style.display = 'none';
                addRef.current.style.display = 'inline';
            }
            else if (response.status === 409) {
                console.log('exist');
                removeRef.current.style.display = 'inline';
                addRef.current.style.display = 'none';
            }
            else {
                console.log('Failed:', response.status);
                removeRef.current.style.display = 'none';
                addRef.current.style.display = 'inline';
            }
        } catch (error) {
            console.error('Error checking content to user list:', error);
            removeRef.current.style.display = 'none';
            addRef.current.style.display = 'inline';
        }
    }

    useEffect(() => {
        if (email.length !== 0) {
            checkContent()
        }
    }, [email])

    const handleListClick = async () => {
        if (removeRef.current.style.display === 'none') {
            console.log('added')
            removeRef.current.style.display = 'block';
            addRef.current.style.display = 'none';
            try {
                const response = await fetch('https://netflixcloneserver-1g07.onrender.com/userList/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({ email: email, contentLinkName: seriesArray.contentLinkName }),
                });

                if (response.status === 200) {
                    console.log('Added successfully');
                    updateMyListUpdation((prev) => prev + 1);
                }
                else if (response.status === 400) {
                    console.log('Failed: ', response.status);
                }
                else {
                    console.log('Failed:', response.status);
                }
            } catch (error) {
                console.error('Error adding content to user list:', error);
            }
        } else {
            console.log('removed')
            removeRef.current.style.display = 'none';
            addRef.current.style.display = 'block';
            try {
                const response = await fetch('https://netflixcloneserver-1g07.onrender.com/userList/remove', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({ email: email, contentLinkName: seriesArray.contentLinkName }),
                });

                if (response.status === 200) {
                    console.log('Removed successfully');
                    updateMyListUpdation((prev) => prev + 1)
                }
                else if (response.status === 400) {
                    console.log('Failed: ', response.status);
                }
                else {
                    console.log('Failed:', response.status);
                }
            } catch (error) {
                console.error('Error removing content to user list:', error);
            }
        }
    }

    const [videoSrc, setVideoSrc] = useState(null);
    const [videoTitle, setVideoTitle] = useState(null);

    const handleClose = () => {
        updateShowMore(false)
    }


    const playTrailer = (index) => {
        setVideoSrc(seriesArray.trailerRecapVideo[index]);
        setVideoTitle(seriesArray.trailerRecapTitle[index]);
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
    }

    const closeVideo = () => {
        setVideoSrc(null);
        setVideoTitle(null);
        videoRef.current.play();
    }

    const playButtonRef = useRef([]);

    const showPlayButton = (index) => {
        playButtonRef.current[index].style.display = 'inline'
    }
    const hidePlayButton = (index) => {
        playButtonRef.current[index].style.display = 'none'
    }

    const episodePlayButtonRef = useRef([]);

    const showEpisodePlayButton = (index) => {
        episodePlayButtonRef.current[index].style.display = 'inline'
    }
    const hideEpisodePlayButton = (index) => {
        episodePlayButtonRef.current[index].style.display = 'none'
    }

    const addListTitleRef = useRef([]);
    const removeListTitleRef = useRef([]);

    const showAddRemoveTitle = () => {
        if (removeRef.current.style.display === 'none') {
            addListTitleRef.current.style.display = 'inline'
            removeListTitleRef.current.style.display = 'none'
        } else {
            removeListTitleRef.current.style.display = 'inline'
            addListTitleRef.current.style.display = 'none'
        }
    }

    const hideAddRemoveTitle = () => {
        addListTitleRef.current.style.display = 'none'
        removeListTitleRef.current.style.display = 'none'
    }



    const playContent = async () => {
        setVideoSrc(selectedSeason[selectedPart][0].episodeLink[0])
        setVideoTitle(`${selectedPart} : ${selectedSeason[selectedPart][0].episodeName[0]}`)
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        try {
            const response = await fetch('https://netflixcloneserver-1g07.onrender.com/userHistory/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({ email: email, contentLinkName: seriesArray.contentLinkName }),
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

    const playEpisodes = async (index) => {
        setVideoSrc(selectedSeason[selectedPart][0].episodeLink[index])
        setVideoTitle(`${selectedPart} : ${selectedSeason[selectedPart][0].episodeName[index]}`)
        try {
            const response = await fetch('https://netflixcloneserver-1g07.onrender.com/userHistory/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({ email: email, contentLinkName: seriesArray.contentLinkName }),
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

    return (
        <>
            <div id='home-season-info-div'>
                <div id='home-season-info-video'>
                    <video ref={videoRef} src={seriesArray.trailer} poster={seriesArray.backgroundImg} muted autoPlay></video>
                    <div id='close-home-season' onClick={handleClose}>
                        <svg height={32} width={32}>
                            <circle cx={15} cy={15} r='15' stroke='#181818' fill='#181818' strokeWidth={0}></circle>
                            <line x1="8" y1="8" x2="22" y2="22" stroke='white' strokeWidth='1.5' ></line>
                            <line x1="8" y1="22" x2="22" y2="8" stroke='white' strokeWidth='1.5' ></line>
                        </svg>
                    </div>
                    <div id='home-season-info-video-components'>
                        <img src={seriesArray.titleImg} height={100} width={400} alt={seriesArray.titleName}></img>
                        <br></br>
                        <br></br>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', width: '170px', justifyContent: 'space-evenly' }}>
                                <div onClick={playContent} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', border: 'none', height: '40px', borderRadius: '4px', backgroundColor: 'white', width: '110px' }}>
                                    <svg height={"20px"} width={"20px"}>
                                        <polygon points="0,0 0,20 15,10" fill="black" strokeWidth="1" stroke="black"></polygon>
                                    </svg>
                                    <p style={{ fontFamily: 'NetflixSans', color: 'black', fontSize: '18px' }}>Play</p>
                                </div>
                                <div>
                                    <p ref={addListTitleRef} style={{ color: 'black', backgroundColor: 'white', fontFamily: 'NetflixSansLite', borderRadius: '4px', position: 'absolute', left: '95px', top: '70px', padding: '5px 10px', display: 'none' }}>Add to list</p>
                                    <p ref={removeListTitleRef} style={{ color: 'black', backgroundColor: 'white', fontFamily: 'NetflixSansLite', borderRadius: '4px', position: 'absolute', left: '75px', top: '70px', padding: '5px 10px', display: 'none' }}>Remove from list</p>

                                    <svg height={"42px"} width={"42px"} onClick={handleListClick} onMouseEnter={showAddRemoveTitle} onMouseLeave={hideAddRemoveTitle} style={{ cursor: 'pointer' }}>
                                        <circle cx={20} cy={20} r='19' stroke='#a1a1a1' strokeWidth={2} fill='none'></circle>
                                        <g ref={addRef}>
                                            <line x1={20} y1={10} x2={20} y2={30} strokeWidth="1.5" stroke="white"></line>
                                            <line x1={10} y1={20} x2={30} y2={20} strokeWidth="1.5" stroke="white"></line>
                                        </g>
                                        <g ref={removeRef} style={{ display: 'none' }}>
                                            <line x1="10" y1="20" x2="16" y2="26" strokeWidth="1.5" stroke="white" />
                                            <line x1="16" y1="26" x2="30" y2="12" strokeWidth="1.5" stroke="white" />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <button id='home-season-info-volume-control-buttons' onClick={handleVolumneControl}>
                                    <svg ref={unmuteRef} style={{ height: '20', width: '30', display: 'none' }} >
                                        <line x1="3" y1="7" x2="3" y2="14" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="3" y1="7" x2="10" y2="7" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="3" y1="14" x2="10" y2="14" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="10" y1="7" x2="15" y2="3.5" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="10" y1="14" x2="15" y2="17.5" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <line x1="15" y1="3.5" x2="15" y2="17.5" stroke='#a1a1a1' strokeWidth='1.5' ></line>
                                        <path d="M 18.5 7 A 30 30 0 0 1 18.5 14" fill="none" stroke="#a1a1a1" strokeWidth={1.5} />
                                        <path d="M 22 3.5 A 20 20 0 0 1 22 17.5" fill="none" stroke="#a1a1a1" strokeWidth={1.5} />
                                    </svg>
                                    <svg ref={muteRef} style={{ height: '20', width: '30' }} >
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
                        </div>
                    </div>
                </div>
                <div id='home-season-info'>
                    <div style={{ width: '60%' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <p style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '16px', fontFamily: 'NetflixSans' }}>{seriesArray.releaseYear}</p>
                            <p style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '16px', fontFamily: 'NetflixSansLite' }}>&nbsp;&nbsp;&nbsp;</p>
                            <p style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '16px', fontFamily: 'NetflixSans' }}>{seriesArray.NoOfSeasons === 1 ? (<span>{seriesArray.NoOfEpisodes} Episodes</span>) : (<span>{seriesArray.NoOfSeasons} Seasons </span>)}</p>
                            <p style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '16px', fontFamily: 'NetflixSansLite' }}>&nbsp;&nbsp;&nbsp;</p>
                            <p style={{ color: '#a1a1a1', border: '1px solid #a1a1a1', width: 'fit-content', height: 'fit-content', padding: '1px 6px', fontSize: '16px', fontFamily: 'NetflixSans' }}>{seriesArray.maturityRating}</p>
                        </div>
                        <div>
                            <p style={{ color: 'white', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{seriesArray.summary}</p>
                        </div>
                    </div>
                    <div style={{ width: '40%' }}>
                        <p style={{ color: '#a1a1a1', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>Cast: <span style={{ color: 'white', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{seriesArray.starring}</span></p>
                        <p style={{ color: '#a1a1a1', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>Genres: <span style={{ color: 'white', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{moreDetailsArray.genres}</span></p>
                        <p style={{ color: '#a1a1a1', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>This show is: <span style={{ color: 'white', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{moreDetailsArray.thisShowIs}</span></p>
                    </div>
                </div>
                <div id='home-season-episodes'>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ color: 'white', fontFamily: 'NetflixSansLite' }}>Episodes</h2>
                        {seriesArray.NoOfSeasons !== 1 &&
                            <select onChange={handlePartChange} style={selectStyle}>
                                {seasons.map((season, index) => (
                                    <option key={index} value={Object.keys(season)[0]} style={{ color: 'white' }}>
                                        {Object.keys(season)[0]}
                                    </option>
                                ))}
                            </select>
                        }
                        {seriesArray.NoOfSeasons === 1 &&
                            <p style={{ color: 'white', fontFamily: 'NetflixSans', fontSize: '16px' }}>{seriesArray.titleName}</p>
                        }
                    </div>
                    <div>
                        {selectedPart && selectedSeason && (

                            selectedSeason[selectedPart][0].episodes.map((episode, index) => (
                                <div key={index} onClick={() => playEpisodes(index)} onMouseLeave={() => hideEpisodePlayButton(index)} onMouseEnter={() => showEpisodePlayButton(index)} style={{ display: 'flex', position: 'relative', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', borderBottom: '1px solid #a1a1a1', backgroundColor: `${index === 0 ? '#333333' : ''}` }}>
                                    <svg height={"32px"} width={"32px"} ref={el => episodePlayButtonRef.current[index] = el} style={{ position: 'absolute', left: '110px', display: 'none' }}>
                                        <circle cx={15} cy={15} r='14' stroke='white' fill='#3333'></circle>
                                        <polygon points="12,10 12,20 20,15" fill="white" strokeWidth="1" stroke="white"></polygon>
                                    </svg>

                                    <div>
                                        <p style={{ color: '#a1a1a1', fontFamily: 'NetflixSans', fontSize: '18px' }}>{index + 1}</p>
                                    </div>
                                    <div>
                                        <img src={episode} alt={selectedSeason[selectedPart][0].episodeName[index]} height={73} width={130} style={{ borderRadius: '4px' }}></img>
                                    </div>
                                    <div style={{ width: '70%' }}>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <p style={{ color: 'white', fontFamily: 'NetflixSans', fontSize: '14px' }}>{selectedSeason[selectedPart][0].episodeName[index]}</p>
                                            <p style={{ color: 'white', fontFamily: 'NetflixSans', fontSize: '14px' }}>{selectedSeason[selectedPart][0].episodeRuntime[index]}</p>
                                        </div>
                                        <div>
                                            <p style={{ color: '#a1a1a1', fontFamily: 'NetflixSans', fontSize: '14px' }}>{selectedSeason[selectedPart][0].episodeDescription[index]}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div id='home-season-trailer'>
                    <h2 style={{ color: 'white', fontFamily: 'NetflixSansLite' }}>Trailers & More</h2>
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {
                            seriesArray.trailerRecap.map((item, index) => (
                                <div key={index} style={{ paddingRight: '20px', paddingBottom: '20px', position: 'relative' }} onMouseLeave={() => hidePlayButton(index)} onMouseEnter={() => showPlayButton(index)} onClick={() => playTrailer(index)}>
                                    <img src={item} alt={seriesArray.trailerRecapTitle[index]} height={134} width={237} style={{ borderRadius: '4px' }}></img>
                                    <svg height={"42px"} width={"42px"} ref={el => playButtonRef.current[index] = el} style={{ position: 'absolute', zIndex: '1', right: '118px', top: '55px', display: 'none' }}>
                                        <circle cx={20} cy={20} r='19' stroke='white' fill='#3333'></circle>
                                        <polygon points="15,10 15,30 30,20" fill="white" strokeWidth="1" stroke="white"></polygon>
                                    </svg>
                                    <figcaption style={{ color: 'white', fontFamily: 'NetflixSans', fontSize: '16px', width: '237px' }}>{seriesArray.trailerRecapTitle[index]}</figcaption>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div id='home-season-about'>
                    <h2 style={{ color: 'white', fontFamily: 'NetflixSansLite' }}>About {seriesArray.titleName}</h2>
                    <p style={{ color: '#a1a1a1', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>Creators: <span style={{ color: 'white', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{seriesArray.creators}</span></p>
                    <p style={{ color: '#a1a1a1', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>Cast: <span style={{ color: 'white', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{seriesArray.starring}</span></p>
                    <p style={{ color: '#a1a1a1', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>Genres: <span style={{ color: 'white', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{moreDetailsArray.genres}</span></p>
                    <p style={{ color: '#a1a1a1', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>This show is: <span style={{ color: 'white', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{moreDetailsArray.thisShowIs}</span></p>
                    <p style={{ color: '#a1a1a1', fontSize: '14px', fontFamily: 'NetflixSansLite' }}> Maturity rating: <span style={{ color: 'white', border: '1px solid #a1a1a1', width: 'fit-content', height: 'fit-content', padding: '1px 6px', fontSize: '16px', fontFamily: 'NetflixSansLite' }}>{seriesArray.maturityRating}</span></p>

                </div>
            </div >

            {videoSrc !== null &&
                (
                    <div id='home-season-video-player'>
                        <video src={videoSrc} controls autoPlay ></video>
                        <div id='home-season-video-title'>
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

export default HomeSeasonXComponent;