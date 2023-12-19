import React from "react";
import netflixpng from "./netflix.png";
import './SeasonXComponent.css'
import SeasonXTrailerVideoSlider from "./SeasonXTrailerVideoSlider";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";


const SeasonXComponent = ({ series, seasons, moreDetails }) => {
    const [selectedPart, setSelectedPart] = useState(Object.keys(seasons[0])[0]);
    const handlePartChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedPart(selectedValue);
    };
    const selectedSeason = seasons.find((season) => season[selectedPart]);
    const seriesArray = series.find((series) => series);
    useEffect(() => {
        document.title = `Watch ${seriesArray.titleName} | Netflix`
    }, [seriesArray.titleName])
    const moreDetailsArray = moreDetails.find((moreDetails) => moreDetails);
    const [selectStyle, setSelectStyle] = useState({
        backgroundColor: 'rgb(26,26,26)',
        border: 'none',
        color: 'rgb(229,9,20)',
        display: 'block',
        fontSize: '18px',
        fontFamily: 'NetflixSansLite',
        cursor: 'Pointer'
    }
    );
    const [pStyle, setPStyle] = useState({
        color: 'white',
        fontSize: '16px',
        fontFamily: 'NetflixSans',
        display: 'none'
    }
    );
    const descriptionRef = useRef(null);
    useEffect(() => {
        const descriptionTab = descriptionRef.current;
        if (seriesArray.description.length === 0) {
            descriptionTab.style.display = 'none';
        }
    }, [seriesArray.description.length])
    const videoDivRef = useRef(null);
    useEffect(() => {
        if (seriesArray.trailerRecap.length === 0) {
            const videoTab = videoDivRef.current;
            videoTab.style.display = 'none';
        }
    }, [seriesArray.trailerRecap.length])
    useEffect(() => {
        if (seasons.length === 1) {
            setSelectStyle(prev => {
                return {
                    ...prev,
                    display: prev.display === 'block' ? 'none' : 'none'
                }
            })
            setPStyle(prev => {
                return {
                    ...prev,
                    display: prev.display === 'none' ? 'block' : 'block'
                }
            })
        }
    }, [seasons.length])
    const [show, setShow] = useState(true);
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
                setShow(false);
            }
            else {
                console.log('Unexpected response status:', response.status);
                setShow(true)
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        check();
    }, []);
    return (
        <>
            <div id='series-info'
                style={{
                    backgroundImage: `linear-gradient(to right, rgb(24, 24, 24, 1), rgb(24, 24, 24, 0.9), rgb(24, 24, 24, 0), rgb(24, 24, 24, 0)), url(${seriesArray.backgroundImg})`
                }}>
                <div id='info-container'>
                    <img width='450px' height='101px' src={seriesArray.titleImg} alt={seriesArray.titleName} title={seriesArray.titleName}></img>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h2>{seriesArray.titleName}</h2>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '250px' }}>
                        <p id='release-year' style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{seriesArray.releaseYear}</p>
                        <p style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>|</p>
                        <p id='maturity-rating' style={{ color: '#a1a1a1', border: '1px solid #a1a1a1', width: 'fit-content', height: 'fit-content', padding: '1px 6px', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{seriesArray.maturityRating}</p>
                        <p style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>|</p>
                        <p id='no-of-seasons' style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{seriesArray.NoOfSeasons} Seasons</p>
                        <p style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>|</p>
                        <p id='genre' style={{ fontSize: '14px' }}><a href='/'>{seriesArray.genre}</a></p>
                    </div>
                    <p id='content-summary' style={{ color: 'white', width: 'fit-content', fontSize: '16px', fontFamily: 'NetflixSansLite' }}>{seriesArray.summary}</p>
                    <p id='starring-creator' style={{ color: '#a1a1a1', fontSize: '16px', fontFamily: 'NetflixSansLite' }}> Starring: <span id='starring' style={{ color: 'white', fontSize: '16px', fontFamily: 'NetflixSansLite' }}>{seriesArray.starring}</span><br></br>
                        Creators: <span id='creator' style={{ color: 'white', fontSize: '16px', fontFamily: 'NetflixSansLite' }}>{seriesArray.creators}</span></p>
                </div>
            </div>
            {show && <>
                <div id='join-now-tab'>
                    <div id='join-now-tab-logo-container'>
                        <img id="join-now-tab-logo" src={netflixpng} title="Netflix" alt="Netflix Logo" />
                        <p style={{ color: 'white', fontSize: '16px', fontFamily: 'NetflixSans' }}>Watch all you want.</p>
                    </div>
                    <div id='join-now-tab-link-container'>
                        <Link to="/" id="join-now-tab-link">JOIN NOW</Link>
                    </div>
                </div>
            </>}
            <br></br>
            <br></br>
            <br></br>
            <div id='series-description-tab' ref={descriptionRef}>
                <div id='series-description-container'>
                    <p id='series-description' style={{ color: '#a1a1a1', fontSize: '16px', fontFamily: 'NetflixSansLite' }}>{seriesArray.description}</p>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div ref={videoDivRef}>
                <div id='video-heading'>
                    <h1>Videos <span style={{ color: '#a3a3a3' }} >|</span> <span style={{ color: '#a3a3a3', fontSize: '20px' }} id='content-name'>{seriesArray.titleName}</span></h1>
                </div>
                <SeasonXTrailerVideoSlider trailers={seriesArray.trailerRecap} trailersTitle={seriesArray.trailerRecapTitle} trailersVideo={seriesArray.trailerRecapVideo}></SeasonXTrailerVideoSlider>
            </div>
            <div id='episode'>
                <div id='video-heading'>
                    <h1>Episodes <span style={{ color: '#a3a3a3' }} >|</span> <span style={{ color: '#a3a3a3', fontSize: '20px' }} id='content-name'> {seriesArray.titleName}</span></h1>
                </div>
                <div style={{ marginLeft: '50px' }}>
                    <select onChange={handlePartChange} style={selectStyle}>
                        {seasons.map((season, index) => (
                            <option key={index} value={Object.keys(season)[0]} style={{ color: 'white' }}>
                                {Object.keys(season)[0]}
                            </option>
                        ))}
                    </select>
                    <p style={pStyle} >{seriesArray.titleName}</p>
                    {selectedPart && selectedSeason && (
                        <div>
                            <div style={{ width: '45%' }}>
                                <h4 style={{ color: 'white', fontFamily: 'NetflixSansLite' }}>Release Year: {selectedSeason[selectedPart][0].releaseYear}</h4>
                                <p style={{ fontFamily: 'NetflixSansLite', color: '#a3a3a3', fontSize: '16px' }}>{selectedSeason[selectedPart][0].seasonDescription}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                {selectedSeason[selectedPart][0].episodes.map((episode, index) => (
                                    <div key={index} style={{ paddingRight: '12px', paddingTop: '10px' }}>
                                        <div>
                                            <img src={episode} alt={`Episode ${index + 1}`} height={'223px'} width={'396px'} />
                                        </div>
                                        <div width='396px'>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '396px' }}>
                                                <p style={{ color: 'white', fontFamily: 'NetflixSans' }}>{index + 1}. {selectedSeason[selectedPart][0].episodeName[index]}</p>
                                                <p style={{ color: '#a3a3a3', fontFamily: 'NetflixSansLite' }}>{selectedSeason[selectedPart][0].episodeRuntime[index]}</p>
                                            </div>
                                            <div width='396px'>
                                                <p style={{ color: '#a3a3a3', fontFamily: 'NetflixSansLite', width: '396px', fontSize: '12px' }}>{selectedSeason[selectedPart][0].episodeDescription[index]}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div id='more-detail' style={{ margin: '0 50px' }}>
                <h1 style={{ color: 'white', fontFamily: 'NetflixSansLite' }}>More Details</h1>
                <div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%', flexWrap: 'wrap' }}>
                        <div id='watch-offline' style={{ width: '250px' }}>
                            <p style={{ color: '#a3a3a3', fontSize: '16px', fontFamily: 'NetflixSansLite' }}>Watch offline</p>
                            <p style={{ color: 'white', fontSize: '16px', fontFamily: 'NetflixSansLite' }}>{moreDetailsArray.watchOffline}</p>
                        </div>
                        <div id='genres' style={{ width: '250px' }}>
                            <p style={{ color: '#a3a3a3', fontSize: '16px', fontFamily: 'NetflixSansLite' }}>Genres</p>
                            <p style={{ color: 'white', fontSize: '16px', fontFamily: 'NetflixSansLite' }}>{moreDetailsArray.genres}</p>
                        </div>
                        <div id='this-show-is' style={{ width: '250px' }}>
                            <p style={{ color: '#a3a3a3', fontSize: '16px', fontFamily: 'NetflixSansLite' }}>This show is...</p>
                            <p style={{ color: 'white', fontSize: '16px', fontFamily: 'NetflixSansLite' }}>{moreDetailsArray.thisShowIs}</p>
                        </div>
                    </div>
                    <div id='cast'>
                        <p style={{ color: '#a3a3a3', fontSize: '16px', fontFamily: 'NetflixSansLite' }}>Cast</p>
                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                            {moreDetailsArray.cast.map((item, index) => <p key={index} style={{ color: 'white', fontSize: '16px', fontFamily: 'NetflixSansLite', width: '30%' }}>{item}</p>)}
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default SeasonXComponent;