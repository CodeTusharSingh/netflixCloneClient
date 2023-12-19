import './OnlyNetflixHeader.css'
import { Outlet, Link } from "react-router-dom";
import netflixpng from "./netflix.png";
import { useContext, useState, useEffect } from 'react';
import { SignContext } from '../context/signContext';

function OnlyNetflixHeader(props) {
    const { signed } = useContext(SignContext);
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
        <div id="only-netflix-body">
            <div id="only-netflix-header">
                <div id="only-netflix-header-logo-container">
                    <Link to='/'><img id="only-netflix-header-logo" src={netflixpng} title="Netflix" alt="Netflix Logo" /></Link>
                </div>
                <div id="only-netflix-header-sign-join">
                    <div id='only-netflix-title' >
                        <p style={{ color: 'white', fontFamily: 'NetflixSansLite', fontSize: '13px' }}>UNLIMITED TV SHOWS & MOVIES</p>
                    </div>
                    {show &&
                        <>
                            <div id="only-netflix-header-join-container">
                                <Link to="/" id="only-netflix-header-join">JOIN NOW</Link>
                            </div>
                            <div id="only-netflix-header-sign-container">
                                {signed === 'SIGN IN' && <Link to="/signin" id="only-netflix-header-sign">{props.Signtitle}</Link>}
                                {signed === 'SIGN OUT' && <Link to="/signout" id="only-netflix-header-sign">{props.Signtitle}</Link>}
                            </div>
                        </>
                    }
                </div>
            </div>
            <Outlet></Outlet>
            <footer id='only-netflix-footer'>
                <br></br>
                <br></br>
                <p>Questions? Contact us. 000-819-919-1694</p><br></br>
                <ul>
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
                <svg height={"20px"} width={"20px"} style={{ position: 'relative', left: '105px', top: '32px' }}>
                    <circle cx="10" cy="10" r="8" fill="none" strokeWidth="1" stroke="white"></circle>
                    <ellipse cx="10" cy="10" rx="4" ry="8" fill="none" strokeWidth="1" stroke="white"></ellipse>
                    <line x1="10" y1="2" x2="10" y2="18" stroke="white" strokeWidth="1"></line>
                    <line x1="2" y1="10" x2="18" y2="10" stroke="white" strokeWidth="1"></line>
                    <line x1="2" y1="6" x2="18" y2="6" stroke="white" strokeWidth="1"></line>
                    <line x1="2" y1="14" x2="18" y2="14" stroke="white" strokeWidth="1"></line>
                </svg>
                <br></br>
                <select id="only-netflix-lang-selector">
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
                <br></br>
                <br></br>
            </footer >
        </div>
    );
}

export default OnlyNetflixHeader;