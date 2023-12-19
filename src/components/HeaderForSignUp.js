import { Outlet, Link } from "react-router-dom";
import "./HeaderForSignUp.css";
import PropTypes from "prop-types";
import { useEffect, useContext } from "react";
import { SignContext } from "../context/signContext";



function HeaderForSignUp(props) {
    useEffect(() => {
        document.title = "Netflix"
    }, []);
    const { sign } = useContext(SignContext);
    return (

        <body id="header-body">
            <div id="header-1">
                <div id="logo-container-1">
                    <Link to="/"><img id="logo-1" src="https://github.com/CodeTusharSingh/Netflix-Clone/blob/main/netflix.png?raw=true" alt="Netflix" title="Netflix"></img></Link>
                </div>
                <div id="sign-container-1">
                    {sign === 'Sign In' && <Link id="sign-title" to="/signin">{props.Signtitle}</Link>}
                    {sign === 'Sign Out' && <Link id="sign-title" to="/signout">{props.Signtitle}</Link>}
                </div>
            </div>
            <Outlet></Outlet>
            <footer id="end-part-1">
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
                <svg height={"20px"} width={"20px"} id="globe">
                    <circle cx="10" cy="10" r="9" fill="black" strokeWidth="1" stroke="black"></circle>
                    <ellipse cx="10" cy="10" rx="5" ry="10" fill="black" strokeWidth="1" stroke="white"></ellipse>
                    <line x1="10" y1="1" x2="10" y2="19" stroke="white" strokeWidth="1"></line>
                    <line x1="1" y1="10" x2="19" y2="10" stroke="white" strokeWidth="1"></line>
                    <line x1="1" y1="5" x2="19" y2="5" stroke="white" strokeWidth="1"></line>
                    <line x1="1" y1="15" x2="19" y2="15" stroke="white" strokeWidth="1"></line>
                </svg>
                <select id="lang-selector-1">
                    <option id="en">English</option>
                    <option id="hi">Hindi</option>
                    <option id="fr">French</option>
                    <option id="ger">German</option>
                    <option id="esp">Spanish</option>
                    <option id="rus">Russian</option>
                </select>
                <svg height={"10px"} width={"10px"} id="arrow">
                    <polygon points="0,0 5,8 10,0" fill="black" strokeWidth="1" stroke="black"></polygon>
                </svg>
                <br></br>
                <br></br>
            </footer>
        </body>

    )
}

export default HeaderForSignUp;

HeaderForSignUp.propTypes = {
    title: PropTypes.string
}
