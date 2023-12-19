import "./Main.css"
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { SignContext } from "../context/signContext";

function Main() {

    let history = useNavigate();
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [signedIn, setSignedIn] = useState(false);
    const { updateSigned } = useContext(SignContext);

    const check = async () => {
        try {
            const response = await fetch('https://netflixcloneserver-1g07.onrender.com/main', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.status === 201) {
                updateSigned('SIGN OUT')
                setSignedIn(true);
                console.log('true');
            } else {
                updateSigned('SIGN IN')
                setSignedIn(false);
                console.log('SIGN IN');
            }
        } catch (err) {
            console.error('An error occurred while checking:', err);
        }
        try {
            const response = await fetch('https://netflixcloneserver-1g07.onrender.com/home', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            })
            if (response.status === 200) {
                console.log('home');
                history('/home')
            } else {
                console.log('main')
            }
        } catch (error) {
            console.error('An error occurred while checking:', error);
        }
    };


    useEffect(() => {
        check();
    }, []);

    const handleEmailChange = (e) => {
        const inputValue = e.target.value;
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmail(inputValue);
        setIsValidEmail(emailRegex.test(inputValue) || inputValue === ''); // Update validation state
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email)
        if (!email.trim()) {
            // Handle the case where the email is empty
            setIsValidEmail(false)
            console.log('Email is required.');
            return;
        }
        if (!isValidEmail) {
            console.log('Please enter a valid email address.');
            return;
        }
        try {
            const response = await fetch('https://netflixcloneserver-1g07.onrender.com/generateToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
                credentials: 'include'
            });

            if (response.status === 201) {
                const res = await fetch('https://netflixcloneserver-1g07.onrender.com/reg', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                    credentials: 'include'
                });

                if (res.status === 409) {
                    history('./signup/step4of1');
                }
                else if (res.status === 201) {
                    history('./signup/Step1of1');
                }
                else if (res.status === 408) {
                    history('/SignIn');
                }
            }

        } catch (error) {
            console.error('Error occurred during registration:', error);
        }
    }

    // const handleSignOut = async () => {
    //     // Add your sign-out logic here
    //     console.log('User signed out');

    //     try {
    //         const response = await fetch('/removeToken', {
    //             method: 'get',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             credentials: 'include',
    //         });

    //         if (response.status === 200) {
    //             history('./SignOut');
    //         }
    //     } catch (err) {
    //         console.error('An error occurred while checking:', err);
    //     }
    // };

    const [descriptionstyle1, setDescriptionStyle1] = useState({
        backgroundColor: 'rgb(56, 54, 54)',
        height: '200px',
        width: '1000px',
        margin: '0 auto',
        fontSize: 'x-large',
        border: '2px solid rgb(0, 0, 0)',
        borderBottom: '10px solid black',
        fontFamily: "NetflixSansLite",
        display: 'none'
    })

    const showDescription1 = () => {
        setDescriptionStyle1(prevStyle1 => {
            const newStyle1 = {
                ...prevStyle1,
                display: prevStyle1.display === 'none' ? 'block' : 'none'
            }
            return newStyle1;
        })
    }
    const [rotation1, setRotation1] = useState({
        position: 'relative',
        top: '20px',
        right: '20px',
        transform: 'rotate(0deg)'
    });
    const [count1, setCount1] = useState(0);
    const rotatePlus1 = () => {
        if (count1 === 0) {
            setRotation1({
                position: 'relative',
                top: '20px',
                right: '20px',
                transform: 'rotate(45deg)'
            })
            setCount1(1)
        }
        else if (count1 === 1) {
            setRotation1({
                position: 'relative',
                top: '20px',
                right: '20px',
                transform: 'rotate(0deg)'
            })
            setCount1(0)
        }
    }
    const [descriptionstyle2, setDescriptionStyle2] = useState({
        backgroundColor: 'rgb(56, 54, 54)',
        height: '70px',
        width: '1000px',
        margin: '0 auto',
        fontSize: 'x-large',
        border: '2px solid rgb(0, 0, 0)',
        borderBottom: '10px solid black',
        fontFamily: "NetflixSansLite",
        display: 'none'
    })
    const showDescription2 = () => {
        setDescriptionStyle2(prevStyle2 => {
            const newStyle2 = {
                ...prevStyle2,
                display: prevStyle2.display === 'none' ? 'block' : 'none'
            }
            return newStyle2;
        })
    }

    const [rotation2, setRotation2] = useState({
        position: 'relative',
        top: '20px',
        right: '20px',
        transform: 'rotate(0deg)'
    });

    const [count2, setCount2] = useState(0);

    const rotatePlus2 = () => {
        if (count2 === 0) {
            setRotation2({
                position: 'relative',
                top: '20px',
                right: '20px',
                transform: 'rotate(45deg)'
            })
            setCount2(1)
        }
        else if (count2 === 1) {
            setRotation2({
                position: 'relative',
                top: '20px',
                right: '20px',
                transform: 'rotate(0deg)'
            })
            setCount2(0)
        }
    }
    const [descriptionstyle3, setDescriptionStyle3] = useState({
        backgroundColor: 'rgb(56, 54, 54)',
        height: '250px',
        width: '1000px',
        margin: '0 auto',
        fontSize: 'x-large',
        border: '2px solid rgb(0, 0, 0)',
        borderBottom: '10px solid black',
        fontFamily: "NetflixSansLite",
        display: 'none'
    })
    const showDescription3 = () => {
        setDescriptionStyle3(prevStyle3 => {
            const newStyle3 = {
                ...prevStyle3,
                display: prevStyle3.display === 'none' ? 'block' : 'none'
            }
            return newStyle3;
        })
    }

    const [rotation3, setRotation3] = useState({
        position: 'relative',
        top: '20px',
        right: '20px',
        transform: 'rotate(0deg)'
    });

    const [count3, setCount3] = useState(0);

    const rotatePlus3 = () => {
        if (count3 === 0) {
            setRotation3({
                position: 'relative',
                top: '20px',
                right: '20px',
                transform: 'rotate(45deg)'
            })
            setCount3(1)
        }
        else if (count3 === 1) {
            setRotation3({
                position: 'relative',
                top: '20px',
                right: '20px',
                transform: 'rotate(0deg)'
            })
            setCount3(0)
        }
    }
    const [descriptionstyle4, setDescriptionStyle4] = useState({
        backgroundColor: 'rgb(56, 54, 54)',
        height: '100px',
        width: '1000px',
        margin: '0 auto',
        fontSize: 'x-large',
        border: '2px solid rgb(0, 0, 0)',
        borderBottom: '10px solid black',
        fontFamily: "NetflixSansLite",
        display: 'none'
    })
    const showDescription4 = () => {
        setDescriptionStyle4(prevStyle4 => {
            const newStyle4 = {
                ...prevStyle4,
                display: prevStyle4.display === 'none' ? 'block' : 'none'
            }
            return newStyle4;
        })
    }

    const [rotation4, setRotation4] = useState({
        position: 'relative',
        top: '20px',
        right: '20px',
        transform: 'rotate(0deg)'
    });

    const [count4, setCount4] = useState(0);

    const rotatePlus4 = () => {
        if (count4 === 0) {
            setRotation4({
                position: 'relative',
                top: '20px',
                right: '20px',
                transform: 'rotate(45deg)'
            })
            setCount4(1)
        }
        else if (count4 === 1) {
            setRotation4({
                position: 'relative',
                top: '20px',
                right: '20px',
                transform: 'rotate(0deg)'
            })
            setCount4(0)
        }
    }

    const [descriptionstyle5, setDescriptionStyle5] = useState({
        backgroundColor: 'rgb(56, 54, 54)',
        height: '80px',
        width: '1000px',
        margin: '0 auto',
        fontSize: 'x-large',
        border: '2px solid rgb(0, 0, 0)',
        borderBottom: '10px solid black',
        fontFamily: "NetflixSansLite",
        display: 'none'
    })
    const showDescription5 = () => {
        setDescriptionStyle5(prevStyle5 => {
            const newStyle5 = {
                ...prevStyle5,
                display: prevStyle5.display === 'none' ? 'block' : 'none'
            }
            return newStyle5;
        })
    }

    const [rotation5, setRotation5] = useState({
        position: 'relative',
        top: '20px',
        right: '20px',
        transform: 'rotate(0deg)'
    });

    const [count5, setCount5] = useState(0);

    const rotatePlus5 = () => {
        if (count5 === 0) {
            setRotation5({
                position: 'relative',
                top: '20px',
                right: '20px',
                transform: 'rotate(45deg)'
            })
            setCount5(1)
        }
        else if (count5 === 1) {
            setRotation5({
                position: 'relative',
                top: '20px',
                right: '20px',
                transform: 'rotate(0deg)'
            })
            setCount5(0)
        }
    }

    const [descriptionstyle6, setDescriptionStyle6] = useState({
        backgroundColor: 'rgb(56, 54, 54)',
        height: '130px',
        width: '1000px',
        margin: '0 auto',
        fontSize: 'x-large',
        border: '2px solid rgb(0, 0, 0)',
        borderBottom: '10px solid black',
        fontFamily: "NetflixSansLite",
        display: 'none'
    })
    const showDescription6 = () => {
        setDescriptionStyle6(prevStyle6 => {
            const newStyle6 = {
                ...prevStyle6,
                display: prevStyle6.display === 'none' ? 'block' : 'none'
            }
            return newStyle6;
        })
    }

    const [rotation6, setRotation6] = useState({
        position: 'relative',
        top: '20px',
        right: '20px',
        transform: 'rotate(0deg)'
    });

    const [count6, setCount6] = useState(0);

    const rotatePlus6 = () => {
        if (count6 === 0) {
            setRotation6({
                position: 'relative',
                top: '20px',
                right: '20px',
                transform: 'rotate(45deg)'
            })
            setCount6(1)
        }
        else if (count6 === 1) {
            setRotation6({
                position: 'relative',
                top: '20px',
                right: '20px',
                transform: 'rotate(0deg)'
            })
            setCount6(0)
        }
    }

    return (

        <div id="Main-body">
            <div id="first">
                <div id="header">
                    <div id="logo-container"><Link to='/'><img id="logo" src="https://github.com/CodeTusharSingh/Netflix-Clone/blob/main/netflix.png?raw=true" title="Netflix" alt="Netflix Logo" /></Link>
                    </div>
                    <div id="sign-translate">
                        <div id="translate-container">
                            <svg height={"20px"} width={"20px"} style={{ position: 'absolute', top: '8px', left: '8px' }}>
                                <circle cx="10" cy="10" r="8" fill="none" strokeWidth="1" stroke="white"></circle>
                                <ellipse cx="10" cy="10" rx="4" ry="8" fill="none" strokeWidth="1" stroke="white"></ellipse>
                                <line x1="10" y1="2" x2="10" y2="18" stroke="white" strokeWidth="1"></line>
                                <line x1="2" y1="10" x2="18" y2="10" stroke="white" strokeWidth="1"></line>
                                <line x1="2" y1="6" x2="18" y2="6" stroke="white" strokeWidth="1"></line>
                                <line x1="2" y1="14" x2="18" y2="14" stroke="white" strokeWidth="1"></line>
                            </svg>
                            <svg height={"10px"} width={"10px"} style={{ position: 'absolute', top: '15px', left: '100px' }}>
                                <polygon points="0,0 5,8 10,0" fill="white" strokeWidth="1" stroke="white"></polygon>
                            </svg>
                            <select id="lang-selector">
                                <option id="en">English</option>
                                <option id="hi">Hindi</option>
                                <option id="fr">French</option>
                                <option id="ger">German</option>
                                <option id="esp">Spanish</option>
                                <option id="rus">Russian</option>
                            </select>
                        </div>
                        <div id="sign-container">
                            {!signedIn &&
                                <Link to="/signin" id="sign">Sign In</Link>
                            }
                            {
                                signedIn &&
                                <Link id="sign" to='/signout' >Sign Out</Link>
                            }
                        </div>
                    </div>
                </div>
                <br></br>
                <br></br>
                <div id="midSection">
                    <h1><b>Unlimited movies, TV shows and more</b></h1>
                    <p id='p1'>Watch anywhere. Cancel anytime.</p>
                    {!signedIn &&
                        <>
                            <p id='p2'>Ready to watch? Enter your email to create or restart your membership.</p>
                            <div id="emailStart" >
                                <form method="post">
                                    <input type="email" id="email" name="email" placeholder="Email address"
                                        value={email}
                                        onChange={handleEmailChange} style={{ borderColor: isValidEmail ? '' : 'rgb(229,9,20)' }} />

                                    <input type="submit" id="start" value="Get Started   >" onClick={handleSubmit}></input>
                                </form>
                            </div>
                        </>
                    }
                    {signedIn &&
                        <>
                            <Link id='finish-sign-up' to="/signup/Step1of2" >Finish Sign-up {'>'}</Link>
                        </>
                    }
                </div>
            </div>
            <hr></hr>
            <div id="second">
                <div id="second-div-1" >
                    <h1>Enjoy on your TV</h1>
                    <p>Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple
                        TV,
                        Blu-ray players and
                        more.</p>
                </div>
                <div id="second-div-img-container"><img src="https://github.com/CodeTusharSingh/Netflix-Clone/blob/main/netflix-intro.gif?raw=true" width="300px" height="250px" alt='Enjoy on TV' />
                </div>
            </div>
            <hr></hr>
            <div id="third">
                <div id="third-div-img-container"><img src="https://github.com/CodeTusharSingh/Netflix-Clone/blob/main/mobile-0819.jpg?raw=true" width="450px" height="350px" alt='Watch offline' />
                </div>
                <div id="third-div-1" >
                    <h1>Download your shows to watch offline</h1>
                    <p >Save your favourites easily and always have something to
                        watch.</p>
                </div>
            </div>
            <hr></hr>
            <div id="fourth">
                <div id="fourth-div-1">
                    <h1>Watch everywhere</h1>
                    <p>Stream unlimited movies and TV shows on
                        your phone, tablet, laptop, and TV.</p>
                </div>
                <div id="fourth-div-img-container"><img src="https://github.com/CodeTusharSingh/Netflix-Clone/blob/main/giphy.gif?raw=true" width="350px" height="250px" alt='Watch everywhere' />
                </div>
            </div>
            <hr></hr>
            <div id="fifth">
                <div id="fifth-div-img-container"><img src="https://github.com/CodeTusharSingh/Netflix-Clone/blob/main/child.png?raw=true" width="450px" height="350px" alt="Create profile for kids" />
                </div>
                <div id="fifth-div-1">
                    <h1>Create profiles for kids</h1>
                    <p>Send children on adventures with their favourite
                        characters in a space made just for them—free with your membership.</p>
                </div>
            </div>
            <hr></hr>
            <div id="faq">
                <h1>Frequently Asked Questions</h1>
                <div id="dq1" onClick={() => { showDescription1(); rotatePlus1() }}>
                    <p id="q1"> What is Netflix?</p>
                    <svg height="30px" width="30px" id="x1" style={rotation1}>
                        <line x1="15" y1="0" x2="15" y2="30" stroke="white" strokeWidth="2"></line>
                        <line x1="0" y1="15" x2="30" y2="15" stroke="white" strokeWidth="2"></line>
                    </svg>
                </div>
                <div id="da1" style={descriptionstyle1}>
                    Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime,
                    documentaries and more – on thousands of internet-connected devices.<br></br>
                    <br></br>
                    You can watch as much as you want, whenever you want, without a single ad – all for one low monthly
                    price.
                    There's always something new to discover, and new TV shows and movies are added every week!
                </div>
                <div id="dq2" onClick={() => { showDescription2(); rotatePlus2() }}>
                    <p id="q2"> How much does Netflix cost?</p>
                    <svg height="30px" width="30px" id="x2" style={rotation2}>
                        <line x1="15" y1="0" x2="15" y2="30" stroke="white" strokeWidth="2"></line>
                        <line x1="0" y1="15" x2="30" y2="15" stroke="white" strokeWidth="2"></line>
                    </svg>
                </div>
                <div id="da2" style={descriptionstyle2}>
                    Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed
                    monthly
                    fee. Plans range from ₹ 649 to ₹ 149 a month. No extra costs, no contracts.
                </div>
                <div id="dq3" onClick={() => { showDescription3(); rotatePlus3() }}>
                    <p id="q3"> Where can I watch?
                    </p>
                    <svg height="30px" width="30px" id="x3" style={rotation3}>
                        <line x1="15" y1="0" x2="15" y2="30" stroke="white" strokeWidth="2"></line>
                        <line x1="0" y1="15" x2="30" y2="15" stroke="white" strokeWidth="2"></line>
                    </svg>
                </div>
                <div id="da3" style={descriptionstyle3}>
                    Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com
                    from
                    your personal computer or on any internet-connected device that offers the Netflix app, including smart
                    TVs,
                    smartphones, tablets, streaming media players and game consoles.<br></br>
                    <br></br>
                    You can also download your favourite shows with the iOS, Android, or Windows 10 app. Use downloads to
                    watch
                    while you're on the go and without an internet connection. Take Netflix with you anywhere.
                </div>
                <div id="dq4" onClick={() => { showDescription4(); rotatePlus4() }}>
                    <p id="q4" > How do I cancel? </p>
                    <svg height="30px" width="30px" id="x4" style={rotation4}>
                        <line x1="15" y1="0" x2="15" y2="30" stroke="white" strokeWidth="2"></line>
                        <line x1="0" y1="15" x2="30" y2="15" stroke="white" strokeWidth="2"></line>
                    </svg>
                </div>
                <div id="da4" style={descriptionstyle4}>
                    Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your
                    account
                    online in two clicks. There are no cancellation fees – start or stop your account anytime.<br></br>
                </div>
                <div id="dq5" onClick={() => { showDescription5(); rotatePlus5() }}>
                    <p id="q5" > What can I watch on Netflix?</p>
                    <svg height="30px" width="30px" id="x5" style={rotation5}>
                        <line x1="15" y1="0" x2="15" y2="30" stroke="white" strokeWidth="2"></line>
                        <line x1="0" y1="15" x2="30" y2="15" stroke="white" strokeWidth="2"></line>
                    </svg>
                </div>
                <div id="da5" style={descriptionstyle5}>
                    Netflix has an extensive library of feature films, documentaries, TV shows, anime,
                    award-winning Netflix originals,
                    and more. Watch as much as you want, anytime you want.
                </div>
                <div id="dq6" onClick={() => { showDescription6(); rotatePlus6() }}>
                    <p id="q6" > Is Netflix good for kids? </p>
                    <svg height="30px" width="30px" id="x6" style={rotation6}>
                        <line x1="15" y1="0" x2="15" y2="30" stroke="white" strokeWidth="2"></line>
                        <line x1="0" y1="15" x2="30" y2="15" stroke="white" strokeWidth="2"></line>
                    </svg>
                </div>
                <div id="da6" style={descriptionstyle6}>
                    The Netflix Kids experience is included in your membership to give parents control while kids enjoy
                    family-friendly TV shows and films in their own space.
                    Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of
                    content
                    kids can watch and block specific titles you don’t want kids to see.
                </div>
                <br></br>
                {!signedIn &&
                    <>
                        <p>Ready to watch? Enter your email to create
                            or
                            restart your
                            membership.</p>
                        <div id="emailStart" >
                            <form method="post">
                                <input type="email" id="email" name="email" placeholder="Email address"
                                    value={email}
                                    onChange={handleEmailChange} style={{ borderColor: isValidEmail ? '' : 'rgb(229,9,20)' }} />

                                <input type="submit" id="start" value="Get Started   >" onClick={handleSubmit}></input>
                            </form>
                        </div>
                    </>
                }
                {signedIn &&
                    <>
                        <a id='finish-sign-up' href="/" >Finish Sign-up {'>'}</a>
                    </>
                }
                <br></br>
                <br></br>
            </div>
            <hr></hr>
            <footer id='end-part'>
                <br></br>
                <br></br>
                <p>Questions? Calls 000-819-919-1694</p><br></br>
                <ul
                >
                    <li><a href="/">FAQ</a></li>
                    <li><a href="/">Help Center</a></li>
                    <li><a href="/">Account</a></li>
                    <li><a href="/">Media Center</a></li>
                    <li><a href="/">Investor Relations</a></li>
                    <li><a href="/">Jobs</a></li>
                    <li><a href="/">Ways to Watch</a></li>
                    <li><a href="/">Terms of Use</a></li>
                    <li><a href="/">Privacy</a></li>
                    <li><a href="/">Cookie Preferences</a></li>
                    <li><a href="/">Corporate Information</a></li>
                    <li><a href="/">Contact Us</a></li>
                    <li><a href="https:www.fast.com" alt="Speed Test" title="Speed Test">Speed
                        Test</a></li>
                    <li><a href="/">Legal Notices</a></li>
                    <li><Link to="/onlyonnetflix/content">Only on Netflix</Link></li>
                </ul>
                <svg height={"20px"} width={"20px"} style={{ position: 'relative', left: '205px', top: '32px' }}>
                    <circle cx="10" cy="10" r="8" fill="none" strokeWidth="1" stroke="white"></circle>
                    <ellipse cx="10" cy="10" rx="4" ry="8" fill="none" strokeWidth="1" stroke="white"></ellipse>
                    <line x1="10" y1="2" x2="10" y2="18" stroke="white" strokeWidth="1"></line>
                    <line x1="2" y1="10" x2="18" y2="10" stroke="white" strokeWidth="1"></line>
                    <line x1="2" y1="6" x2="18" y2="6" stroke="white" strokeWidth="1"></line>
                    <line x1="2" y1="14" x2="18" y2="14" stroke="white" strokeWidth="1"></line>
                </svg>
                <br></br>
                <select id="lang-selector">
                    <option id="en">English</option>
                    <option id="hi">Hindi</option>
                    <option id="fr">French</option>
                    <option id="ger">German</option>
                    <option id="esp">Spanish</option>
                    <option id="rus">Russian</option>
                </select>
                <svg height={"10px"} width={"10px"} style={{ position: 'relative', right: '20px', top: '2px' }}>
                    <polygon points="0,0 5,8 10,0" fill="white" strokeWidth="1" stroke="white"></polygon>
                </svg>
                <p>Netflix India</p>
            </footer>
            <br></br>
            <br></br>

        </div >
    );
}

export default Main