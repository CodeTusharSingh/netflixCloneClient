import React, { useRef } from "react";
import netflixpng from "./netflix.png";
import './MovieXComponent.css';
import SeasonXTrailerVideoSlider from "./SeasonXTrailerVideoSlider";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SeasonXComponent = ({ movies, moreDetails }) => {
    const moviesArray = movies.find((movies) => movies);
    useEffect(() => {
        document.title = `Watch ${moviesArray.titleName} | Netflix`
    }, [moviesArray.titleName])
    const moreDetailsArray = moreDetails.find((moreDetails) => moreDetails);

    const descriptionRef = useRef(null);
    useEffect(() => {
        if (moviesArray.description.length === 0) {
            const descriptionTab = descriptionRef.current;
            descriptionTab.style.display = 'none';
        }
    }, [moviesArray.description.length])
    const videoDivRef = useRef(null);
    useEffect(() => {
        if (moviesArray.trailerRecap.length === 0) {
            const videoTab = videoDivRef.current;
            videoTab.style.display = 'none';
        }
    }, [moviesArray.trailerRecap.length])
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
            <div id='movies-info'
                style={{
                    backgroundImage: `linear-gradient(to right, rgb(24, 24, 24, 1), rgb(24, 24, 24, 0.9), rgb(24, 24, 24, 0), rgb(24, 24, 24, 0)), url(${moviesArray.backgroundImg})`
                }}>
                <div id='info-container'>
                    <img width='450px' height='101px' src={moviesArray.titleImg} alt={moviesArray.titleName} title={moviesArray.titleName}></img>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h2>{moviesArray.titleName}</h2>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '250px' }}>
                        <p id='release-year' style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{moviesArray.releaseYear}</p>
                        <p style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>|</p>
                        <p id='maturity-ratin' style={{ color: '#a1a1a1', border: '1px solid #a1a1a1', width: 'fit-content', height: 'fit-content', padding: '1px 6px', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{moviesArray.maturityRating}</p>
                        <p style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>|</p>
                        <p id='no-of-seasons' style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>{moviesArray.runtime}</p>
                        <p style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>|</p>
                        <p id='genre' style={{ fontSize: '14px' }}><a href='/'>{moviesArray.genre}</a></p>
                    </div>
                    <p id='content-summary' style={{ color: 'white', width: 'fit-content', fontSize: '16px', fontFamily: 'NetflixSansLite' }}>{moviesArray.summary}</p>
                    <p id='starring-creator' style={{ color: '#a1a1a1', fontSize: '16px', fontFamily: 'NetflixSansLite' }}> Starring: <span id='starring' style={{ color: 'white', fontSize: '16px', fontFamily: 'NetflixSansLite' }}>{moviesArray.starring}</span><br></br>
                        Creators: <span id='creator' style={{ color: 'white', fontSize: '16px', fontFamily: 'NetflixSansLite' }}>{moviesArray.creators}</span></p>
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
            <div id='movies-description-tab' ref={descriptionRef}>
                <div id='movies-description-container'>
                    <p id='movies-description' style={{ color: '#a1a1a1', fontSize: '16px', fontFamily: 'NetflixSansLite' }}>{moviesArray.description}</p>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div ref={videoDivRef}>
                <div id='video-heading'>
                    <h1>Videos <span style={{ color: '#a3a3a3' }} >|</span> <span style={{ color: '#a3a3a3', fontSize: '20px' }} id='content-name'>{moviesArray.titleName}</span></h1>
                </div>
                <SeasonXTrailerVideoSlider trailers={moviesArray.trailerRecap} trailersTitle={moviesArray.trailerRecapTitle} trailersVideo={moviesArray.trailerRecapVideo}></SeasonXTrailerVideoSlider>
            </div>
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
                            <p style={{ color: '#a3a3a3', fontSize: '16px', fontFamily: 'NetflixSansLite' }}>This movie is...</p>
                            <p style={{ color: 'white', fontSize: '16px', fontFamily: 'NetflixSansLite' }}>{moreDetailsArray.thisMovieIs}</p>
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