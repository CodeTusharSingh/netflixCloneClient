import { useEffect, useState, useContext } from 'react';
import './SignOut.css'
import netflixpng from "./netflix.png";
import { Link, useNavigate } from 'react-router-dom';
import { SignContext } from "../context/signContext";


function SignOut() {
    let history = useNavigate();

    const [countdown, setCoutdown] = useState(30);
    const { updateSigned } = useContext(SignContext);
    const signout = async () => {
        console.log('User signed out');
        updateSigned('SIGN IN')
        try {
            const response = await fetch('https://netflixcloneserver-1g07.onrender.com/removeToken', {

                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.status === 200) {
                history('/');
            }
        } catch (err) {
            console.error('An error occurred while checking:', err);
        }
    }

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (countdown > 0) {
                setCoutdown(countdown - 1)
            } else {
                updateSigned('SIGN IN')
                try {
                    const response = await fetch('https://netflixcloneserver-1g07.onrender.com/removeToken', {
                        method: 'DELETE',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                    });

                    if (response.status === 200) {
                        history('/');
                    }
                } catch (err) {
                    console.error('An error occurred while checking:', err);
                }
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [countdown, history])
    return (
        <div id='sign-out-body'>
            <div id='sign-out-header'>
                <div id='sign-out-logo-container'>
                    <img id="sign-out-netflix-logo" src={netflixpng} title="Netflix" alt="Netflix Logo" height={'120px'} width={'120px'} />
                </div>
                <div>
                    <Link to="/signin" id="sign-in">Sign In</Link>
                </div>
            </div>
            <br></br>
            <br></br>
            <div id='sign-out-main-div'>
                <h1>Leaving So Soon?</h1>
                <p>Just so you know, you don't always need to sign out of Netflix, it's only necessary if you're on a shared or public computer.</p>
                <p>You'll be redirected to Netflix.com in {countdown} seconds.</p>
                <button onClick={signout}>Go Now</button>
            </div>
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
        </div >
    )
}

export default SignOut;