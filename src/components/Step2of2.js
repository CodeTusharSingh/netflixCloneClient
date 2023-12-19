import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Step2of2.css';
import { useContext } from 'react';
import { SignContext } from "../context/signContext";

function Step2of2() {
    let history = useNavigate();
    const [plan, setPlan] = useState(199);
    const [mobileColor, setMobileColor] = useState('rgb(79, 79, 79)')

    const { updateSign } = useContext(SignContext);

    useEffect(() => {
        updateSign('Sign Out')
    }, [updateSign])

    const check = async () => {
        try {
            const response = await fetch('https://netflixcloneserver-1g07.onrender.com/main', {
                method: 'get',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.status === 401) {
                console.log('true');
                history('/');
            }
        } catch (err) {
            console.error('An error occurred while checking:', err);
        }
    };

    useEffect(() => {
        check();
    }, []);


    const handleSubmit = async (e) => {
        console.log(plan);
        e.preventDefault();
        try {
            const response = await fetch('https://netflixcloneserver-1g07.onrender.com/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ plan }),
                credentials: 'include'
            });


            if (response.ok) {
                console.log('Token generated successfully');
                history('/signup/Step1of3');
            } else {
                console.error('Failed to generate token');
            }

        } catch (error) {
            console.log('error')
            console.error('Error:', error);
        }
    }
    const [mobileStyle, setMobileStyle] = useState({
        backgroundColor: 'rgb(241, 92, 100)',
        boxShadow: 'none',
        borderRadius: '1px',
        width: '120px',
        height: '120px',
        color: 'white',
        fontFamily: "NetflixSans",
        position: 'relative',
        right: '150px'
    })
    const [mobileSquare, setMobileSquare] = useState({
        height: '20px',
        width: '20px',
        position: 'absolute',
        left: '50px',
        top: '110px',
        transform: 'rotate(45deg)',
        backgroundColor: 'rgb(229, 9, 20)',
        display: 'none'
    })
    const handleMobileClick = () => {
        setPlan(149)
        console.log(plan);
        setMobileColor('rgb(229,20,9)')
        setBasicColor('rgb(79,79,79)')
        setStandardColor('rgb(79,79,79)')
        setPremiumColor('rgb(79,79,79)')
        setMobileStyle(prevState => {
            return {
                ...prevState,
                backgroundColor: 'rgb(229,9,20)',
                boxShadow: '0 0 4px red'
            }
        })
        setMobileSquare(prevState => {
            return {
                ...prevState,
                display: 'block'
            }
        })
        setBasicStyle(prevState => {
            return {
                ...prevState,
                backgroundColor: 'rgb(241, 92, 100)',
                boxShadow: 'none'
            }
        })
        setBasicSquare(prevState => {
            return {
                ...prevState,
                display: 'none'
            }
        })
        setStandardStyle(prevState => {
            return {
                ...prevState,
                backgroundColor: 'rgb(241, 92, 100)',
                boxShadow: 'none'
            }
        })
        setStandardSquare(prevState => {
            return {
                ...prevState,
                display: 'none'
            }
        })
        setPremiumStyle(prevState => {
            return {
                ...prevState,
                backgroundColor: 'rgb(241, 92, 100)',
                boxShadow: 'none'
            }
        })
        setPremiumSquare(prevState => {
            return {
                ...prevState,
                display: 'none'
            }
        })
    }

    const [basicColor, setBasicColor] = useState('rgb(220, 9, 20)')

    const [basicStyle, setBasicStyle] = useState({
        backgroundColor: 'rgb(229, 9, 20)',
        boxShadow: '0 0 4px red',
        borderRadius: '1px',
        width: '120px',
        height: '120px',
        color: 'white',
        fontFamily: "NetflixSans",
        position: 'relative',
        right: '100px'
    })
    const [basicSquare, setBasicSquare] = useState({
        height: '20px',
        width: '20px',
        position: 'absolute',
        left: '50px',
        top: '110px',
        transform: 'rotate(45deg)',
        backgroundColor: 'rgb(229, 9, 20)',
        display: 'block'
    })
    const handleBasicClick = () => {
        setPlan(199)
        console.log(plan);
        setBasicColor('rgb(229,20,9)')
        setMobileColor('rgb(79,79,79)')
        setStandardColor('rgb(79,79,79)')
        setPremiumColor('rgb(79,79,79)')
        setBasicStyle(prevState => {
            return {
                ...prevState,
                backgroundColor: 'rgb(229,9,20)',
                boxShadow: '0 0 4px red'
            }
        })
        setBasicSquare(prevState => {
            return {
                ...prevState,
                display: 'block'
            }
        })
        setMobileStyle(prevState => {
            return {
                ...prevState,
                backgroundColor: 'rgb(241, 92, 100)',
                boxShadow: 'none'
            }
        })
        setMobileSquare(prevState => {
            return {
                ...prevState,
                display: 'none'
            }
        })
        setStandardStyle(prevState => {
            return {
                ...prevState,
                backgroundColor: 'rgb(241, 92, 100)',
                boxShadow: 'none'
            }
        })
        setStandardSquare(prevState => {
            return {
                ...prevState,
                display: 'none'
            }
        })
        setPremiumStyle(prevState => {
            return {
                ...prevState,
                backgroundColor: 'rgb(241, 92, 100)',
                boxShadow: 'none'
            }
        })
        setPremiumSquare(prevState => {
            return {
                ...prevState,
                display: 'none'
            }
        })
    }
    const [standardColor, setStandardColor] = useState('rgb(79, 79, 79)')
    const [standardStyle, setStandardStyle] = useState({
        backgroundColor: 'rgb(241, 92, 100)',
        boxShadow: 'none',
        borderRadius: '1px',
        width: '120px',
        height: '120px',
        color: 'white',
        fontFamily: "NetflixSans",
        position: 'relative',
        right: '50px'
    })
    const [standardSquare, setStandardSquare] = useState({
        height: '20px',
        width: '20px',
        position: 'absolute',
        left: '50px',
        top: '110px',
        transform: 'rotate(45deg)',
        backgroundColor: 'rgb(229, 9, 20)',
        display: 'none'
    })
    const handleStandardClick = () => {
        setPlan(499)
        console.log(plan);
        setStandardColor('rgb(229,20,9)')
        setMobileColor('rgb(79,79,79)')
        setBasicColor('rgb(79,79,79)')
        setPremiumColor('rgb(79,79,79)')
        setStandardStyle(prevState => {
            return {
                ...prevState,
                backgroundColor: 'rgb(229,9,20)',
                boxShadow: '0 0 4px red'
            }
        })
        setStandardSquare(prevState => {
            return {
                ...prevState,
                display: 'block'
            }
        })
        setMobileStyle(prevState => {
            return {
                ...prevState,
                backgroundColor: 'rgb(241, 92, 100)',
                boxShadow: 'none'
            }
        })
        setMobileSquare(prevState => {
            return {
                ...prevState,
                display: 'none'
            }
        })
        setBasicStyle(prevState => {
            return {
                ...prevState,
                backgroundColor: 'rgb(241, 92, 100)',
                boxShadow: 'none'
            }
        })
        setBasicSquare(prevState => {
            return {
                ...prevState,
                display: 'none'
            }
        })
        setPremiumStyle(prevState => {
            return {
                ...prevState,
                backgroundColor: 'rgb(241, 92, 100)',
                boxShadow: 'none'
            }
        })
        setPremiumSquare(prevState => {
            return {
                ...prevState,
                display: 'none'
            }
        })
    }
    const [premiumColor, setPremiumColor] = useState('rgb(79, 79, 79)')
    const [premiumStyle, setPremiumStyle] = useState({
        backgroundColor: 'rgb(241, 92, 100)',
        boxShadow: 'none',
        borderRadius: '1px',
        width: '120px',
        height: '120px',
        color: 'white',
        fontFamily: "NetflixSans",
        position: 'relative',
    })
    const [premiumSquare, setPremiumSquare] = useState({
        height: '20px',
        width: '20px',
        position: 'absolute',
        left: '50px',
        top: '110px',
        transform: 'rotate(45deg)',
        backgroundColor: 'rgb(229, 9, 20)',
        display: 'none'
    })

    const handlePremiumClick = () => {
        setPlan(649)
        console.log(plan);
        setPremiumColor('rgb(229,20,9)')
        setMobileColor('rgb(79,79,79)')
        setBasicColor('rgb(79,79,79)')
        setStandardColor('rgb(79,79,79)')
        setPremiumStyle(prevState => {
            return {
                ...prevState,
                backgroundColor: 'rgb(229,9,20)',
                boxShadow: '0 0 4px red'
            }
        })
        setPremiumSquare(prevState => {
            return {
                ...prevState,
                display: 'block'
            }
        })
        setMobileStyle(prevState => {
            return {
                ...prevState,
                backgroundColor: 'rgb(241, 92, 100)',
                boxShadow: 'none'
            }
        })
        setMobileSquare(prevState => {
            return {
                ...prevState,
                display: 'none'
            }
        })
        setBasicStyle(prevState => {
            return {
                ...prevState,
                backgroundColor: 'rgb(241, 92, 100)',
                boxShadow: 'none'
            }
        })
        setBasicSquare(prevState => {
            return {
                ...prevState,
                display: 'none'
            }
        })
        setStandardStyle(prevState => {
            return {
                ...prevState,
                backgroundColor: 'rgb(241, 92, 100)',
                boxShadow: 'none'
            }
        })
        setStandardSquare(prevState => {
            return {
                ...prevState,
                display: 'none'
            }
        })
    }
    return (
        <>
            <div id="middle-container-4">
                <p >
                    STEP <b>2</b> OF <b>3</b>
                </p>
                <h1>
                    Choose the plan that’s right for you
                </h1>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ position: 'relative', right: '15px' }}>
                        <svg height={'40px'} width={'40px'}>
                            <line x1='15' y1='25' x2='22' y2='32' stroke='rgb(220,9,20)' strokeWidth={'2'}></line>
                            <line x1='21' y1='32' x2='35' y2='19' stroke='rgb(220,9,20)' strokeWidth={'2'}></line>
                        </svg>
                    </div>
                    <p >
                        Watch all you want.
                        Ad-free.
                    </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ position: 'relative', right: '15px' }}>
                        <svg height={'40px'} width={'40px'}>
                            <line x1='15' y1='25' x2='22' y2='32' stroke='rgb(220,9,20)' strokeWidth={'2'}></line>
                            <line x1='21' y1='32' x2='35' y2='19' stroke='rgb(220,9,20)' strokeWidth={'2'}></line>
                        </svg>
                    </div>
                    <p>
                        Recommendations just for
                        you.
                    </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ position: 'relative', right: '15px' }}>
                        <svg height={'40px'} width={'40px'}>
                            <line x1='15' y1='25' x2='22' y2='32' stroke='rgb(220,9,20)' strokeWidth={'2'}></line>
                            <line x1='21' y1='32' x2='35' y2='19' stroke='rgb(220,9,20)' strokeWidth={'2'}></line>
                        </svg>
                    </div>
                    <p>
                        Change or cancel your
                        plan
                        anytime.
                    </p>
                </div>
                <br></br>
                <div id="containerplan">
                    <div id="mobile" style={mobileStyle} onClick={handleMobileClick}>
                        <center>
                            <p>Mobile</p>
                        </center>
                        <div id="mobsq" style={mobileSquare}></div>
                    </div>
                    <div id="basic" style={basicStyle} onClick={handleBasicClick}>
                        <center>
                            <p>Basic</p>
                        </center>
                        <div id="basq" style={basicSquare}></div>
                    </div>
                    <div id="standard" style={standardStyle} onClick={handleStandardClick}>
                        <center>
                            <p>Standard</p>
                        </center>
                        <div id="stdsq" style={standardSquare}></div>
                    </div>
                    <div id="premium" style={premiumStyle} onClick={handlePremiumClick}>
                        <center>
                            <p>Premium</p>
                        </center>
                        <div id="presq" style={premiumSquare}></div>
                    </div>
                </div>
                <table id="plandetails">
                    <tr>
                        <td style={{ width: '220px', color: 'rgb(79, 79, 79)' }}>Monthly price</td>
                        <td style={{ position: 'relative', width: '200px', color: mobileColor }}>
                            <div id="mobplan1" style={{ position: 'relative', left: '105px', fontWeight: '700' }}>₹149</div>
                        </td>
                        <td style={{ position: 'relative', color: basicColor }}>
                            <div id="basplan1" style={{ position: 'relative', left: '40px', fontWeight: '700' }}> ₹199</div>
                        </td>
                        <td style={{ position: 'relative', color: standardColor }}>
                            <div id="stdplan1" style={{ position: 'relative', left: '60px', fontWeight: '700' }}>₹499</div>
                        </td>
                        <td style={{ position: 'relative', width: '150px', color: premiumColor }}>
                            <div id="preplan1" style={{ position: 'relative', left: '90px', fontWeight: '700' }}>₹649</div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ color: 'rgb(79, 79, 79)' }}>Video quality</td>
                        <td style={{ color: mobileColor }}>
                            <div id="mobplan2" style={{ position: 'relative', left: '110px', fontWeight: '700' }}>Good</div>
                        </td>
                        <td style={{ color: basicColor }}>
                            <div id="basplan2" style={{ position: 'relative', left: '40px', fontWeight: '700' }}>Good</div>
                        </td>
                        <td style={{ color: standardColor }}>
                            <div id="stdplan2" style={{ position: 'relative', left: '60px', fontWeight: '700' }}>Better</div>
                        </td>
                        <td style={{ color: premiumColor }}>
                            <div id="preplan2" style={{ position: 'relative', left: '95px', fontWeight: '700' }}>Best</div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ color: 'rgb(79, 79, 79)' }}>Resolution</td>
                        <td style={{ color: mobileColor }}>
                            <div id="mobplan3" style={{ position: 'relative', left: '110px', fontWeight: '700' }}>480p</div>
                        </td>
                        <td style={{ color: basicColor }}>
                            <div id="basplan3" style={{ position: 'relative', left: '40px', fontWeight: '700' }}>720p</div>
                        </td>
                        <td style={{ color: standardColor }}>
                            <div id="stdplan3" style={{ position: 'relative', left: '57px', fontWeight: '700' }}>1080p</div>
                        </td>
                        <td style={{ color: premiumColor }}>
                            <div id="preplan3" style={{ position: 'relative', left: '80px', fontWeight: '700' }}>4K+HDR</div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ border: 'none', position: 'relative', bottom: '130px', color: 'rgb(79, 79, 79)' }}>Devices you can use to watch</td>
                        <td style={{ border: 'none', position: 'relative', left: '102px' }} >
                            <div id="device-column-1" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'fit-content', userSelect: 'none' }}>
                                <svg width={"40px"} height={"56px"}>
                                    <rect x="6" y="2" height={"37px"} width={"24px"} ry="3" rx="3" stroke={mobileColor} strokeWidth={"2"} fill="none"></rect>
                                    <circle cx="18" cy="33" r="2" stroke={mobileColor} strokeWidth={"1"} fill="none"></circle>
                                    <text x='0' y='55' fontSize={'13px'} fill={mobileColor} fontWeight={'600'} fontFamily='NetflixSans'>Phone</text>
                                </svg>
                                <br></br>
                                <svg width={"55px"} height={"50px"}>
                                    <rect x="5" y="2" height={"30px"} width={"40px"} ry="3" rx="3" stroke={mobileColor} strokeWidth={"2"} fill="none"></rect>
                                    <circle cx="40" cy="18" r="2" stroke={mobileColor} strokeWidth={"1"} fill="none"></circle>
                                    <text x='5' y='49' fontSize={'13px'} fill={mobileColor} fontWeight={'600'} fontFamily='NetflixSans'>Tablet</text>
                                </svg>
                                <br></br>
                                <svg width={"60px"} height={"62px"}>
                                    <polyline points='4,40 4,2 55,2 55,40' fill='none' stroke='rgb(255,255,255)' strokeWidth={'2'}></polyline>
                                    <polyline points='0,43 60,43 ' fill='none' stroke='rgb(255,255,255)' strokeWidth={'4'}></polyline>
                                    <text x='0' y='59' fontSize={'13px'} fill='rgb(255,255,255)' fontWeight={'600'} fontFamily='NetflixSans'>Computer</text>
                                </svg>
                                <br></br>
                                <svg width={"60px"} height={"62px"}>
                                    <polyline points='4,40 4,2 55,2 55,40 3,40' fill='none' stroke='rgb(255,255,255)' strokeWidth={'2'}></polyline>
                                    <polyline points='19,42 40,42' fill='none' stroke='rgb(255,255,255)' strokeWidth={'5'}></polyline>
                                    <text x='20' y='59' fontSize={'13px'} fill='rgb(255,255,255)' fontWeight={'600'} fontFamily='NetflixSans'>TV</text>
                                </svg>
                            </div>
                        </td >


                        <td style={{ border: 'none', position: 'relative', left: '62px' }}>
                            <div id="device-column-2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100px', position: 'relative', right: '50px', userSelect: 'none' }}>
                                <svg width={"40px"} height={"56px"}>
                                    <rect x="6" y="2" height={"37px"} width={"24px"} ry="3" rx="3" stroke={basicColor} strokeWidth={"2"} fill="none"></rect>
                                    <circle cx="18" cy="33" r="2" stroke={basicColor} strokeWidth={"1"} fill="none"></circle>
                                    <text x='0' y='55' fontSize={'13px'} fill={basicColor} fontWeight={'600'} fontFamily='NetflixSans'>Phone</text>
                                </svg>
                                <br></br>
                                <svg width={"55px"} height={"50px"}>
                                    <rect x="5" y="2" height={"30px"} width={"40px"} ry="3" rx="3" stroke={basicColor} strokeWidth={"2"} fill="none"></rect>
                                    <circle cx="40" cy="18" r="2" stroke={basicColor} strokeWidth={"1"} fill="none"></circle>
                                    <text x='5' y='49' fontSize={'13px'} fill={basicColor} fontWeight={'600'} fontFamily='NetflixSans'>Tablet</text>
                                </svg>
                                <br></br>
                                <svg width={"60px"} height={"62px"}>
                                    <polyline points='4,40 4,2 55,2 55,40' fill='none' stroke={basicColor} strokeWidth={'2'}></polyline>
                                    <polyline points='0,43 60,43 ' fill='none' stroke={basicColor} strokeWidth={'4'}></polyline>
                                    <text x='0' y='59' fontSize={'13px'} fill={basicColor} fontWeight={'600'} fontFamily='NetflixSans'>Computer</text>
                                </svg>
                                <br></br>
                                <svg width={"60px"} height={"62px"}>
                                    <polyline points='4,40 4,2 55,2 55,40 3,40' fill='none' stroke={basicColor} strokeWidth={'2'}></polyline>
                                    <polyline points='19,42 40,42' fill='none' stroke={basicColor} strokeWidth={'5'}></polyline>
                                    <text x='20' y='59' fontSize={'13px'} fill={basicColor} fontWeight={'600'} fontFamily='NetflixSans'>TV</text>
                                </svg>
                            </div>
                        </td>


                        <td style={{ border: 'none', position: 'relative', left: '37px' }}>

                            <div id="device-column-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100px', userSelect: 'none' }}>
                                <svg width={"40px"} height={"56px"}>
                                    <rect x="6" y="2" height={"37px"} width={"24px"} ry="3" rx="3" stroke={standardColor} strokeWidth={"2"} fill="none"></rect>
                                    <circle cx="18" cy="33" r="2" stroke={standardColor} strokeWidth={"1"} fill="none"></circle>
                                    <text x='0' y='55' fontSize={'13px'} fill={standardColor} fontWeight={'600'} fontFamily='NetflixSans'>Phone</text>
                                </svg>
                                <br></br>
                                <svg width={"55px"} height={"50px"}>
                                    <rect x="5" y="2" height={"30px"} width={"40px"} ry="3" rx="3" stroke={standardColor} strokeWidth={"2"} fill="none"></rect>
                                    <circle cx="40" cy="18" r="2" stroke={standardColor} strokeWidth={"1"} fill="none"></circle>
                                    <text x='5' y='49' fontSize={'13px'} fill={standardColor} fontWeight={'600'} fontFamily='NetflixSans'>Tablet</text>
                                </svg>
                                <br></br>
                                <svg width={"60px"} height={"62px"}>
                                    <polyline points='4,40 4,2 55,2 55,40' fill='none' stroke={standardColor} strokeWidth={'2'}></polyline>
                                    <polyline points='0,43 60,43 ' fill='none' stroke={standardColor} strokeWidth={'4'}></polyline>
                                    <text x='0' y='59' fontSize={'13px'} fill={standardColor} fontWeight={'600'} fontFamily='NetflixSans'>Computer</text>
                                </svg>
                                <br></br>
                                <svg width={"60px"} height={"62px"}>
                                    <polyline points='4,40 4,2 55,2 55,40 3,40' fill='none' stroke={standardColor} strokeWidth={'2'}></polyline>
                                    <polyline points='19,42 40,42' fill='none' stroke={standardColor} strokeWidth={'5'}></polyline>
                                    <text x='20' y='59' fontSize={'13px'} fill={standardColor} fontWeight={'600'} fontFamily='NetflixSans'>TV</text>
                                </svg>
                            </div>
                        </td>


                        <td style={{ border: 'none', position: 'relative', left: '62px' }}>
                            <div id="device-column-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100px', userSelect: 'none' }}>
                                <svg width={"40px"} height={"56px"}>
                                    <rect x="6" y="2" height={"37px"} width={"24px"} ry="3" rx="3" stroke={premiumColor} strokeWidth={"2"} fill="none"></rect>
                                    <circle cx="18" cy="33" r="2" stroke={premiumColor} strokeWidth={"1"} fill="none"></circle>
                                    <text x='0' y='55' fontSize={'13px'} fill={premiumColor} fontWeight={'600'} fontFamily='NetflixSans'>Phone</text>
                                </svg>
                                <br></br>
                                <svg width={"55px"} height={"50px"}>
                                    <rect x="5" y="2" height={"30px"} width={"40px"} ry="3" rx="3" stroke={premiumColor} strokeWidth={"2"} fill="none"></rect>
                                    <circle cx="40" cy="18" r="2" stroke={premiumColor} strokeWidth={"1"} fill="none"></circle>
                                    <text x='5' y='49' fontSize={'13px'} fill={premiumColor} fontWeight={'600'} fontFamily='NetflixSans'>Tablet</text>
                                </svg>
                                <br></br>
                                <svg width={"60px"} height={"62px"}>
                                    <polyline points='4,40 4,2 55,2 55,40' fill='none' stroke={premiumColor} strokeWidth={'2'}></polyline>
                                    <polyline points='0,43 60,43 ' fill='none' stroke={premiumColor} strokeWidth={'4'}></polyline>
                                    <text x='0' y='59' fontSize={'13px'} fill={premiumColor} fontWeight={'600'} fontFamily='NetflixSans'>Computer</text>
                                </svg>
                                <br></br>
                                <svg width={"60px"} height={"62px"}>
                                    <polyline points='4,40 4,2 55,2 55,40 3,40' fill='none' stroke={premiumColor} strokeWidth={'2'}></polyline>
                                    <polyline points='19,42 40,42' fill='none' stroke={premiumColor} strokeWidth={'5'}></polyline>
                                    <text x='20' y='59' fontSize={'13px'} fill={premiumColor} fontWeight={'600'} fontFamily='NetflixSans'>TV</text>
                                </svg>
                            </div>
                        </td >
                    </tr >
                </table >
                <br></br>
                <br></br>
                <br></br>
                <p style={{ color: 'rgb(79, 79, 79)', fontSize: 'small', position: 'relative' }}>
                    HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device
                    capabilities. Not all content is available in all resolutions. See our <a href="/" style={{ color: "#0071eb" }}>Terms of Use</a> for
                    more
                    details.<br></br><br></br>
                    Only people who live with you may use your account. Watch on 4 different devices at the same time with
                    Premium, 2 with Standard, and 1 with Basic and Mobile.
                </p>
                <br></br>
                <br></br>
                <br></br>
                <center><span id="next-4" onClick={handleSubmit}>Next</span></center>
            </div >
            <br></br>
            <br></br>
            <br></br>
            <br></br>

        </>
    )
}

export default Step2of2;
