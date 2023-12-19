import { useState, useEffect, useRef } from 'react';
import './SignIn.css';
import netflixpng from "./netflix.png";
import { Link, useNavigate } from 'react-router-dom';


function SignIn() {
    useEffect(() => {
        document.title = "Netflix"
    }, []);
    let history = useNavigate();

    const [inputValue, setInputValue] = useState('');
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [incorrectPassword, setIncorrectPassword] = useState(false);

    const showButtonRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateInput(inputValue);
        // showButtonRef.current.style.bottom = '75px';
        setErrors(validationErrors);
        if (validationErrors.length === 0) {
            console.log('Form submitted successfully');
            try {
                const response = await fetch('https://netflixcloneserver-1g07.onrender.com/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                    credentials: 'include'
                });

                if (response.status === 200) {
                    history('/home'); // Use 'push' to navigate to the new URL
                }
                else if (response.status === 404) {
                    setIncorrectPassword(true);
                    console.log('user not found');
                }
                else if (response.status === 403) {
                    history('/signup/step2of2');
                }
                else if (response.status === 401) {
                    setIncorrectPassword(true);
                    console.log('email or password are invalid');
                    showButtonRef.current.style.bottom = '75px';
                } else if (response.status === 400) {
                    setIncorrectPassword(true);
                    console.log('enter password');
                    showButtonRef.current.style.bottom = '75px';
                }
                else {
                    // Handle non-201 responses here
                    console.log('login failed with status code:', response.status);
                }

            } catch (error) {
                console.error('Error occurred during registration:', error);
            }
        }
    }
    const validateInput = (value) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobilePattern = /^[0-9]{10}$/;

        const errors = [];

        if (!emailPattern.test(value) && !mobilePattern.test(value)) {
            errors.push('Please enter a valid email address or phone number.');
        }
        return errors;
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
    }

    const handleInputChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setInputValue(newEmail); // Update inputValue if needed
    };


    const [passType, setPassType] = useState('password');
    const [buttontext, setButtontext] = useState('SHOW');
    const [count, setCount] = useState(0);


    const hideShow = () => {
        if (count === 0) {
            setPassType('text')
            setButtontext('HIDE')
            setCount(1)
        } else {
            setPassType('password')
            setButtontext('SHOW')
            setCount(0)
        }
    }
    const [emailLabelStyle, setEmailLabelStyle] = useState({
        position: 'relative',
        top: '15px',
        left: '10px',
        fontFamily: 'NetflixSans',
        fontSize: '10px',
        color: 'rgb(51,51,51)'
    })
    const [passLabelStyle, setPassLabelStyle] = useState({
        position: 'relative',
        top: '15px',
        left: '10px',
        fontSize: '12px',
        fontFamily: 'NetflixSans',
        color: 'rgb(51,51,51)'
    })
    const [emailPlaceholder, setEmailPlaceholder] = useState('Email or phone number');
    const [passPlaceholder, setPassPlaceholder] = useState('Password');
    const handleEmailFocus = () => {
        setEmailPlaceholder('')
        setEmailLabelStyle(prevStyle => {
            const newStyle = {
                ...prevStyle,
                color: prevStyle.color === 'rgb(51,51,51)' ? 'rgb(115,115,115)' : 'rgb(51,51,51)'
            }
            return newStyle
        })
    }
    const handlePassFocus = () => {
        setPassPlaceholder('')
        setPassLabelStyle(prevStyle => {
            const newStyle = {
                ...prevStyle,
                color: prevStyle.color === 'rgb(51,51,51)' ? 'rgb(115,115,115)' : 'rgb(51,51,51)'
            }
            return newStyle
        })
    }
    const handleEmailBlur = () => {
        setEmailPlaceholder('Email or phone number')
        setEmailLabelStyle(prevStyle => {
            const newStyle = {
                ...prevStyle,
                color: prevStyle.color === 'rgb(51,51,51)' ? 'rgb(115,115,115)' : 'rgb(51,51,51)'
            }
            return newStyle
        })
    }
    const handlePassBlur = () => {
        setPassPlaceholder('Password')
        setPassLabelStyle(prevStyle => {
            const newStyle = {
                ...prevStyle,
                color: prevStyle.color === 'rgb(51,51,51)' ? 'rgb(115,115,115)' : 'rgb(51,51,51)'
            }
            return newStyle
        })
    }

    return (
        <div id='signInBkg'>
            <div id="signInHeader">
                <Link to='/'><img id="signInNetflixLogo" src={netflixpng} title="Netflix" alt="Netflix Logo" /></Link>
            </div>
            <div id="middle-container-7">
                <h1>Sign In</h1>
                <form id='signInForm' onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label forhtml='signInFormEmail' style={emailLabelStyle}>Email or phone number</label>
                        <input type="text"
                            value={inputValue}
                            onChange={handleInputChange} placeholder={emailPlaceholder} id="signInFormEmail" onFocus={handleEmailFocus} onBlur={handleEmailBlur}></input>
                        {errors.length > 0 && (
                            <ul style={{ listStyleType: 'none', fontSize: '13px', position: 'relative', right: '35px', fontFamily: 'NetflixSans' }}>
                                {errors.map((error, index) => (
                                    <li key={index} style={{ color: 'orange' }}>{error}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label forhtml='signInFormPass' style={passLabelStyle}>Password</label>
                        <input type={passType} id="signInFormPass" placeholder={passPlaceholder} onFocus={handlePassFocus} onBlur={handlePassBlur} onChange={handlePasswordChange} ></input>
                        {incorrectPassword && (<p id='incorrectPass' style={{ color: 'orange', fontFamily: 'NetflixSans', fontSize: '13px' }}>Incorrect password!!!</p>)}
                        <button ref={showButtonRef} onClick={hideShow} style={{ width: 'fit-content', color: 'rgb(115,115,115)', fontFamily: 'NetflixSansLite', backgroundColor: 'rgb(0,0,0,0)', border: 'none', cursor: 'pointer', position: 'relative', left: '250px', bottom: '35px' }}>{buttontext}</button>
                    </div>
                    <input type='submit' id='signInFormSubmit' value={"Sign In"} style={{ cursor: 'pointer' }}></input><br></br><br></br>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
                        <div>
                            <input type='checkbox' id='rememberCheckbox'></input>
                            <label forhtml="rememberCheckbox" style={{ color: 'rgb(115,115,115)', fontFamily: 'NetflixSansLite' }}>Remember me</label>
                        </div>
                        <div>
                            <a href='/' style={{ color: 'rgb(115,115,115)', fontFamily: 'NetflixSansLite', textDecoration: 'none', }}>Need Help?</a>
                        </div>
                    </div>
                </form>
                <br></br>
                <p style={{ color: 'rgb(115,115,115)', fontFamily: 'NetflixSansLite', }}>New to Netflix? <a href='/' style={{ color: 'rgb(255,255,255)', fontFamily: 'NetflixSansLite', textDecoration: 'none', }}>Sign up now</a></p>
                <p style={{ color: 'rgb(115,115,115)', fontFamily: 'NetflixSansLite', fontSize: '13px' }}>This page is protected by Google reCAPTCHA to<br></br> ensure you're not a bot. <a href='/' style={{ color: 'rgb(0, 113, 235)', fontFamily: 'NetflixSansLite', textDecoration: 'none', }} > Learn more.</a></p>
                <br></br>
                <br></br>
                <br></br>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <footer id="signInFooter">
                <br></br>
                <p>Questions? Calls 000-819-919-1694</p>
                <ul>
                    <li><a href="/">FAQ</a></li>
                    <li><a href="/">Help Center</a></li>
                    <li><a href="/">Netflix Shop</a></li>
                    <li> <a href="/">Terms of Use</a></li>
                    <li><a href="/">Privacy</a></li>
                    <li><a href="/">Cookie Preferences</a></li>
                    <li><a href="/">Corporate Information</a></li>
                </ul>
                <br></br>
                <svg height={"20px"} width={"20px"} id="signInGlobe">
                    <circle cx="10" cy="10" r="9" fill="white" strokeWidth="1" stroke="white"></circle>
                    <ellipse cx="10" cy="10" rx="5" ry="10" fill="white" strokeWidth="1" stroke="black"></ellipse>
                    <line x1="10" y1="1" x2="10" y2="19" stroke="black" strokeWidth="1"></line>
                    <line x1="1" y1="10" x2="19" y2="10" stroke="black" strokeWidth="1"></line>
                    <line x1="1" y1="5" x2="19" y2="5" stroke="black" strokeWidth="1"></line>
                    <line x1="1" y1="15" x2="19" y2="15" stroke="black" strokeWidth="1"></line>
                </svg>
                <select id="signInlang-selector">
                    <option id="en">English</option>
                    <option id="hi">Hindi</option>
                    <option id="fr">French</option>
                    <option id="ger">German</option>
                    <option id="esp">Spanish</option>
                    <option id="rus">Russian</option>
                </select>
                <svg height={"10px"} width={"10px"} id="signInArrow">
                    <polygon points="0,0 5,8 10,0" fill="black" strokeWidth="1" stroke="white"></polygon>
                </svg>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </footer>
        </div>
    )
}

export default SignIn;