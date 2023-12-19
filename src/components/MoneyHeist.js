import { useEffect, useState, useRef } from 'react';
import './MoneyHeist.css';
import netflixpng from "./netflix.png";
import SeasonComponent from './SeasonComponent';

function MoneyHeist() {
    useEffect(() => {
        document.title = "Watch Money Heist | Netflix";
    }, []);
    const [trailerContainerScrollStyle, settrailerContainerScrollStyle] = useState({
        display: 'flex',
        flexDirection: 'row',
        transition: 'ease-in 0.3s',
        zIndex: '2'
    });

    const [trailerScrollCount, settrailerScrollCount] = useState(0);

    const [trailerScrollLeftButton, settrailerScrollLeftButton] = useState({
        fontSize: '40px',
        padding: '0px 10px',
        height: '252px',
        border: 'none',
        backgroundColor: '#181818',
        color: 'rgb(229,9,20)',
    });

    const [trailerScrollRightButton, settrailerScrollRightButton] = useState({
        fontSize: '40px',
        padding: '0px 10px',
        height: '252px',
        border: 'none',
        backgroundColor: '#181818',
        color: 'rgb(229,9,20)',
    });

    useEffect(() => {
        const elementsWithClassName = document.querySelectorAll('.trailer-container');
        const len = elementsWithClassName.length;
        if (trailerScrollCount === 0) {
            settrailerScrollLeftButton(prevStyle => {
                return {
                    ...prevStyle,
                    zIndex: '-1'
                }
            });
        }
        else {
            settrailerScrollLeftButton(prevStyle => {
                return {
                    ...prevStyle,
                    zIndex: '3'
                }
            });
        }
        if (trailerScrollCount === len - 1) {
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
    }, [trailerScrollCount]);

    const trailerHandleScrollLeft = () => {
        const elementsWithClassName = document.querySelectorAll('.trailer-container');
        const len = elementsWithClassName.length;
        settrailerScrollCount(prevtrailerScrollCount => prevtrailerScrollCount - 1);
        settrailerContainerScrollStyle(prevStyle => {
            const newOffset = prevStyle.transform ? parseFloat(prevStyle.transform.match(/-?\d+/)[0]) : 0;
            let updatedOffset
            if (trailerScrollCount === len - 1) {
                updatedOffset = newOffset + 60;
            } else {
                updatedOffset = newOffset + 100;
            }
            console.log(updatedOffset);
            return {
                ...prevStyle,
                transform: `translateX(${updatedOffset}%)`
            }
        });
    };

    const trailerHandleScrollRight = () => {
        const elementsWithClassName = document.querySelectorAll('.trailer-container');
        const len = elementsWithClassName.length;
        settrailerScrollCount(prevtrailerScrollCount => prevtrailerScrollCount + 1);
        settrailerContainerScrollStyle(prevStyle => {
            const newOffset = prevStyle.transform ? parseFloat(prevStyle.transform.match(/-?\d+/)[0]) : 0;
            console.log(newOffset);
            let updatedOffset
            if (trailerScrollCount === len - 2) {
                updatedOffset = newOffset - 60;
            } else {
                updatedOffset = newOffset - 100;
            }
            console.log(updatedOffset);
            return {
                ...prevStyle,
                transform: `translateX(${updatedOffset}%)`
            }
        });
    };
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

    const videoRef = useRef(null);
    const playTrailer = () => {
        const video = videoRef.current;
        video.muted = false;
        video.play();
        setVideoStyle(prevStyle => {
            return {
                ...prevStyle,
                display: prevStyle.display === 'none' ? 'flex' : 'none'
            }
        })
    }
    const hideTrailer = () => {
        const video = videoRef.current;
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

    const seasons = [
        {
            "Part 1": [
                {
                    episodes: ['https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABX_TEIN9iXVmG7unvjlLiwVQMEk98RVSGVtPDtM2483tnkfLBV33fSp0HTNh5pANZEEDgA0_E8Txenj2NbEDmHhfFXgu2UM0LZPeZgPS-1p7AdxD7pdulEs8.jpg?r=940', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABYbJx_3IfZZ5als65opwcvovi2PHYgas6akp0076FgSvKmmRRBdV1JyZJBxdjyFRWXDUStaStHIraNb9vahvlXYnQyAnbfgqzcQSDiM0voBtRQQAvcbE3QmD.jpg?r=556', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABdZhR7NvuXst92_ANZtsIlHLT0KRvFclZcL7YQ8DJonyxfJYcERPTXpDny2MxsVUVPq00a15A7gF5Mt7t1sHPK6WHLzJBNvCQnqG3CKbiGChE5fptPj1s_mR.jpg?r=026', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABcqlGNbMGW7shjWbc5RIAMWipAIZ3M93jAxc5KFqh520pw0n3VLzVglXzq3gVzW2xK72AOd3PstdAczm4z-FlVn95MVWNYh0EdGVDd73Ne0d09G9_AGGLEsY.jpg?r=dd1', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABaz7aGdsOxQLA5psH7IB2Am7iigztxxdxunLiy9UHK3HGGznA5Tx_M3Gv8UPL8ISFFEiFqgXDHC9k5dprNF9hEkBBPCsM5vdp0xlrsO2u6CbubHo9DcBRINP.jpg?r=522', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABRjNjf1cG7OkGUeLnDqWPpErnNESg9m_PZ4K6Y5l54YqJmxgJoF9XbGoygIWzJo_oirxNrHYE3vc1HnWKxg6y_4u51204jJaWXR2l8MPmbZ2T9tT34T8i8fr.jpg?r=496', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABRFUsS5pL2LanFl1FxLMy4s8Bo4agvrOiQVcgufvrA7fw5aVaeSO4YuDDOZyKnAkypnG0xOKV62R_hhNwCUiijk9ZVdjC5LS5dtGUnCA2B-pvDC6JzBvWjYl.jpg?r=b00', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABel7HunsZyEl1VMccqjUEo3mW54oG0OhlTQGFnsRerWVs0ablXSZuiODem3yqJZL2ySMpQ3NbtILpefcB1pbDq4QRBYPcbY17w8RbM9iYY5SM_vN_IWzmtQV.jpg?r=f15', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABVxTo_oOG31H5MjA8eq7tGxTL8DmWYPgSqzkX7eS8D1FjGzkFYHARyLpLnuACJB-ihppC3rwn22wHwcHUhdqymCj0hCnqjtDNd3ghlErqYBCoESkpOjjjsC7.jpg?r=2dc', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABWtXGvWXyPlJ4Aoq1kk2_VPX1kfNSzlbS3hHVI5OBZkNfMVhBtqxS2p0AdmaR4kn_EQJfHrX2Up_2AwqMlknum7qQtIc5PInoAtMXZTJ0eZu_s60hnt73Vo9.jpg?r=0b8', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABQInLhOiykieECdqdXNlw4WXxSNlDA540H33tP1xYlTswIjmgExo4d6H-J7tvwq-VM_HALu5dIi6ycvn5wFY9CvpzlSrgUCxlB2oCuHocIrDNPdEmnL6TqC9.jpg?r=9d0', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABek-tXKd9PiV9G7VcYhpV2Csp-C0c4XB55893u5VSPz1L0EtknMe1-WYPOieIKfxB2PDr9944Y-GNQGtWEwez1S8-ZzrJJ1zD8lUaft2W_12ftgRRZbIVC4_.jpg?r=354', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABZEdC_hAnkP2O1W0uXSNNlKwJX1UKG1b0hnVPK4-FuI1lFM_OFU2KyshojydqRul7ZZf40GozTyrrnCoieGVWeF-iS101Y8rXPH_XcpfBJ8npxos5th-7bWL.jpg?r=19f'],
                    releaseYear: 2017,
                    seasonDescription: 'Eight thieves take hostages and lock themselves in the Royal Mint of Spain as a criminal mastermind manipulates the police to carry out his plan.'
                }
            ]
        },
        {
            "Part 2": [
                {
                    episodes: ['https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABWMP8gHYkc4P-yFlZyg5Ku2DooykoZumTBHbwZ-8YcMVFCAMnsW84lxLad770e2k7-nURGuzhhsXX_pDaUeU7H8-uP_HCw__V7kRTrj-ptgEPbXdDgbxFez6.jpg?r=283', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABXvjgTbyH2C6s27Xg_d7rr5XClmrnguFC7S_8sb-Dlh87qPnL9OjoJmk8svIRPeIGfaPoENN9O4pQIVwmX_14qXGIknXw_2ZDBNEe8iz6rjDL1cuuAvxshCa.jpg?r=f86', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABVKA4qD4Po_8R7pwtremIYDJ69JoghNJohbSeEZW5XbfcP3O3kqpFZSjuZ6H0ZeGsmynKEZsDMPJE5B9VPKHJ3d7XX_8Mp1lUDTwK3Zv3wVSeEwPp-VzGJ2u.jpg?r=62d', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABT9MyG__YRwAgLqMZ59Glii5uT-oxklRahIrQnK-LnBnsufLOSW9X5hyW3W0HL1WtKxIO4UIb0Qbrw1OJM6G6arpVerobEXXqzgQQrNeOk8bZSkyavY_uJQu.jpg?r=50e', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABT5Y30oB0g7hHsFEjqCmafgiBK3iJ6cKrxuyoN8ZlsH3BKiwIkB8ZFDcWLafw0eOX0G3ffHCdmnYpg_azSbnGrsMi0KytOX2R-nZJiF97cRETFwXFg3yLOLG.jpg?r=33b', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABTucYoJKIQr6HdksYLKNERnyqrieJVJAHupDhD8gh93EBy4zf1q_za5KGS001Bw5r8zdETnUnVXqigkzpt9TEYcg3KUhkU8oCl8gzaO9cs0dCSp1y-3QCAkJ.jpg?r=deb', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABXm-22XxWleP4CjHMIkdRzox3dHHeQ98uDG05G9Yf0RjR-8yCE-IxpH2RDaIFu96nChRPGUgNTyW21JI19xva9P2zIYNPNGYKQ9caXVEdR3F9vuXtwTdF_Is.jpg?r=94a', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABfssCxuxLhNNRnG5E4zpWvQmLfDSlZS5gSEcOx3Vsms-yjh75Q_6nwAMwlqkFg64yz1NSIUHHVppItIjW6tQrNW2YomML3AlMq9jaCyaYAMaqbc0behrQqpq.jpg?r=691', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABQAzXEvZGPhE-bdMrgjbaz4ElLgNl98pJO9QPpsROK3WL8GKFih4_DbrDhL_dYlkJvUDh7g-ybrE5bZH8u9QlNf6Kmz6xIHUduXl8b76WpnZXNdSd1dl2Cmb.jpg?r=999'],
                    releaseYear: 2017,
                    seasonDescription: "As the police close in on the Professor's identity, his lack of communication with the Mint team leads to mutiny and the arrest of one of the robbers."
                }
            ]
        }
    ]
    return (
        <>
            <div id="money-heist-info">
                <div id="money-heist-info-container">
                    <img width='450px' height='101px' src='https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABRYwssiYqFQk0AMTz6Sk2gJcynwEXm7Z63r-s6aIkwDimtUWoZefgzIsMjMumecjIZWEPE8uoixk_-Acjx57MGODKOw9AGpXTDdPwzwBjSTR2U4COxyFlrtRISIBmHYYtyuEUIvm__G6eMlm0HfP2gEJeq6LnU5O8cdpioXzGlMxJWq1c-qikw.png?r=768' alt='Money Heist' title='Money Heist' />
                    <br></br>
                    <br></br>
                    <br></br>
                    <h2>Money Heist</h2>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '250px' }}>
                        <p id='release-year' style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>2017</p>
                        <p id='release-year' style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>|</p>
                        <p id="maturity-rating" style={{ color: '#a1a1a1', border: '1px solid #a1a1a1', width: 'fit-content', height: 'fit-content', padding: '1px 6px', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>A</p>
                        <p id='release-year' style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>|</p>
                        <p id='no-of-seasons' style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>5 Seasons</p>
                        <p id='release-year' style={{ color: '#a1a1a1', width: 'fit-content', height: 'fit-content', fontSize: '14px', fontFamily: 'NetflixSansLite' }}>|</p>
                        <p id='genre' style={{ fontSize: '14px' }}><a href='/'>Thrillers</a></p>
                    </div>
                    <p id="content-description" style={{ color: 'white', width: 'fit-content', fontSize: '16px', fontFamily: 'NetflixSansLite' }}>Eight thieves take hostages and lock themselves in the Royal Mint of Spain as a criminal mastermind manipulates the police to carry out his plan.</p>
                    <p id='starring-creator' style={{ color: '#a1a1a1', fontSize: '16px', fontFamily: 'NetflixSansLite' }}> Starring: <span id='starring' style={{ color: 'white', fontSize: '16px', fontFamily: 'NetflixSansLite' }}>Úrsula Corberó,Álvaro Morte,Itziar Ituño</span><br></br>
                        Creators: <span id='creator' style={{ color: 'white', fontSize: '16px', fontFamily: 'NetflixSansLite' }}>Álex Pina</span></p>
                </div>
            </div >
            <div id='join-now-tab'>
                <div id='join-now-tab-logo-container'>
                    <img id="join-now-tab-logo" src={netflixpng} title="Netflix" alt="Netflix Logo" />
                    <p style={{ color: 'white', fontSize: '16px', fontFamily: 'NetflixSans' }}>Watch all you want.</p>
                </div>
                <div id='join-now-tab-link-container'>
                    <a href="/" id="join-now-tab-link">JOIN NOW</a>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div id='content-achievement-tab'>
                <div id='content-achievement-container'>
                    <p id='content-achievement' style={{ color: '#a1a1a1', fontSize: '16px', fontFamily: 'NetflixSansLite' }}>This riveting crime series won Best Drama at the International Emmy Awards, Premios Fénix and Premios Iris (plus six more Iris wins).</p>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div id="trailer">
                <div id='video-heading'>
                    <h1>Videos <span style={{ color: '#a3a3a3' }} >|</span> <span style={{ color: '#a3a3a3', fontSize: '20px' }} id='content-name'> Money Heist</span></h1>
                </div>
                <div id="trailer-slider">
                    <div className="trailer-container" style={trailerContainerScrollStyle} onClick={playTrailer}>
                        <div className="trailer-name">
                            <div id='trailer-1' >
                                <img src='https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABU8YARADfiQPQ1bPDLAenNJPHHvdDa1KZL3UpNg2q3j3tJO6qN8woGgwMPxtF-RVC-64xRJUw8XN6_Ffe61PV1DrI2DBlEeNGZyLNnihpJIRFFuFJ95BhUMZ.jpg?r=fb1' alt='Trailer-1' title='Trailer-1' />
                                <figcaption>Part 5 Trailer: Money Heist</figcaption>
                            </div>
                            <svg height={'50px'} width={'50px'} id='trailer-play-button-svg'>
                                <circle cx='25' cy='25' r='23' fill='white' stroke='white' strokeWidth={'1'}></circle>
                                <polygon points='33,25 20,17 20,33' fill='black' stroke='black' strokeWidth={'1'}></polygon>
                            </svg>
                        </div>
                        <div className="trailer-name">
                            <div id='trailer-2'>
                                <img src='https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABeKLoSvD4AzKts9NX-gbj0ceToO-d_gBddk2lz-De9YzcFIyEjQMhG7i3bYlxLx9NrBU6_MVEQA9kvy13rMALwZOXtuU4AqbhO-0qCbZG5jPskdEYCZH-byr.jpg?r=05d' alt='Trailer-2' title='Trailer-2' />
                                <figcaption>
                                    Part 4 Trailer: Money Heist</figcaption>
                            </div>
                            <svg height={'50px'} width={'50px'} id='trailer-play-button-svg'>
                                <circle cx='25' cy='25' r='23' fill='white' stroke='white' strokeWidth={'1'}></circle>
                                <polygon points='33,25 20,17 20,33' fill='black' stroke='black' strokeWidth={'1'}></polygon>
                            </svg>
                        </div>
                    </div>
                    <div id='trailer-video' style={videoStyle} >
                        <div id='trailer-video-content'>
                            <div id='trailer-video-title'>
                                <p id='trailer-video-name' style={{ fontFamily: 'NetflixSans', color: 'white', fontSize: '20px' }}><span style={{ color: 'rgb(229,9,20)' }}>| </span> Part 5 Trailer: Money Heist</p>
                                <svg height={'20px'} width={'20px'} onClick={hideTrailer} style={{ cursor: 'pointer' }}>
                                    <line x1={0} y1={0} x2={20} y2={20} stroke='white' strokeWidth={2}></line>
                                    <line x1={0} y1={20} x2={20} y2={0} stroke='white' strokeWidth={2}></line>
                                </svg>
                            </div>
                            <div>
                                <video ref={videoRef} src={'https://github.com/CodeTusharSingh/Netflix-Clone/raw/main/sample-video-1.mp4'} controls height={'300px'} width={'550px'} muted autoPlay>
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </div>

                    <div className="trailer-container" style={trailerContainerScrollStyle}>
                        <div className="trailer-name">
                            <div id='trailer-3'>
                                <img src='https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABfutAaWcuZe8YDLr6gTscuYuwDC-tNBueImbfp49jDL-tAfFw0H1m8u5wcsi3HANTwAyaTQ5kqLA3URDzCXXEKX0x20waaGIA-7RYO35xfZB8_0p8TdFPt4h.jpg?r=5bf' alt='Trailer-3' title='Trailer-3' />
                                <figcaption>
                                    Part 3 Trailer: Money Heist</figcaption>
                            </div>
                            <svg height={'50px'} width={'50px'} id='trailer-play-button-svg'>
                                <circle cx='25' cy='25' r='23' fill='white' stroke='white' strokeWidth={'1'}></circle>
                                <polygon points='33,25 20,17 20,33' fill='black' stroke='black' strokeWidth={'1'}></polygon>
                            </svg>
                        </div>
                        <div className="trailer-name">
                            <div id='trailer-4'>
                                <img src='https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABaxi5jev5b9OJHXxNsd-2OVqjWqSeIE26fzTYQkRXihXDKrd4d_coNjs-jMEv-bTm7HQn8KoFiwxgDhQHLp1XC2nsz7sMGfEiiQqmDOJdMYqGivGVs7lSJbu.jpg?r=888' alt='Trailer-4' title='Trailer-4' />
                                <figcaption>Part 2 Trailer: Money Heist</figcaption>
                            </div>
                            <svg height={'50px'} width={'50px'} id='trailer-play-button-svg'>
                                <circle cx='25' cy='25' r='23' fill='white' stroke='white' strokeWidth={'1'}></circle>
                                <polygon points='33,25 20,17 20,33' fill='black' stroke='black' strokeWidth={'1'}></polygon>
                            </svg>
                        </div>
                    </div>

                    <div className="trailer-container" style={trailerContainerScrollStyle}>
                        <div className="trailer-name">
                            <div id='trailer-5'>
                                <img src='https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABUUmXCzmeiR3jafC_nS3Z_YkN4OGWctqzwpi4DhzK-Xc-d0gKD5V6z11upxrPW-e9ol4u90DA4XFqQYiXDy9SiOfRelufXeAFyE8UGkUDxYytLVwRX3MDvOr.jpg?r=c5d' alt='Trailer-5' title='Trailer-5' />
                                <figcaption>Trailer: Money Heist</figcaption>
                            </div>
                            <svg height={'50px'} width={'50px'} id='trailer-play-button-svg'>
                                <circle cx='25' cy='25' r='23' fill='white' stroke='white' strokeWidth={'1'}></circle>
                                <polygon points='33,25 20,17 20,33' fill='black' stroke='black' strokeWidth={'1'}></polygon>
                            </svg>
                        </div>
                        <div className="trailer-name">
                            <div id='trailer-6'>
                                <img src='https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABdd7SXAAwIIh6ydcMC7_5uuG_SehAjR-wp8rR6SbI5xbi5DU6Snpo4hxqFMYd1AyFGR__iKEAK_170ue3Mzarp9kP3VE2dZdeiVXsR1vhocdUHdbDKSB-yY6.jpg?r=92f' alt='Trailer-6' title='Trailer-6' />
                                <figcaption>Money Heist: Recap</figcaption>
                            </div>
                            <svg height={'50px'} width={'50px'} id='trailer-play-button-svg'>
                                <circle cx='25' cy='25' r='23' fill='white' stroke='white' strokeWidth={'1'}></circle>
                                <polygon points='33,25 20,17 20,33' fill='black' stroke='black' strokeWidth={'1'}></polygon>
                            </svg>
                        </div>
                    </div>
                </div>
                <div id='trailer-scroll-buttons'>
                    <button onClick={trailerHandleScrollLeft} style={trailerScrollLeftButton}>&lsaquo;</button>
                    <button onClick={trailerHandleScrollRight} style={trailerScrollRightButton}>&rsaquo;</button>
                </div>
            </div>
            {/* <div id='trailer-video' style={videoStyle} >
                <div id='trailer-video-content'>
                    <div id='trailer-video-title'>
                        <p id='trailer-video-name' style={{ fontFamily: 'NetflixSans', color: 'white', fontSize: '20px' }}><span style={{ color: 'rgb(229,9,20)' }}>| </span> Part 5 Trailer: Money Heist</p>
                        <svg height={'20px'} width={'20px'} onClick={hideTrailer} style={{ cursor: 'pointer' }}>
                            <line x1={0} y1={0} x2={20} y2={20} stroke='white' strokeWidth={2}></line>
                            <line x1={0} y1={20} x2={20} y2={0} stroke='white' strokeWidth={2}></line>
                        </svg>
                    </div>
                    <div>
                        <video ref={videoRef} src={samplevideo} controls height={'300px'} width={'550px'} muted autoPlay>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div> */}
            <div id='episode'>
                <div id='video-heading'>
                    <h1>Episodes <span style={{ color: '#a3a3a3' }} >|</span> <span style={{ color: '#a3a3a3', fontSize: '20px' }} id='content-name'> Money Heist</span></h1>
                </div>
                <div style={{ marginLeft: '50px' }}>
                    <SeasonComponent seasons={seasons} />
                </div>
            </div>
        </>
    )
}

export default MoneyHeist;