import { Link } from "react-router-dom";
import { SignContext } from "../context/signContext";
import "./Step1of1.css"
import { useContext, useEffect } from "react";

const check = async () => {
    try {
        const response = await fetch('https://netflixcloneserver-1g07.onrender.com/step1', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (response.status === 200) {
            console.log('User is valid, proceed to Step 2 page');
        } else {
            console.log('User is not valid');
        }
    } catch (err) {
        console.error('An error occurred while checking:', err);
    }
};

function Step1of1() {
    useEffect(() => {
        check();
    }, []);

    const { updateSign } = useContext(SignContext);
    useEffect(() => {
        updateSign('Sign In')
    }, [updateSign])

    return (
        <>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div id="middle-container">
                <div id="svg-device-logo">
                    <svg width={"90px"} height={"80px"} id="computer-svg">
                        <rect x="5" y="5" height={"50px"} width={"80px"} ry="3" rx="3" stroke="rgb(229,9,20)" strokeWidth={"2"} fill="none"></rect>
                        <line x1="5" y1="55" x2="3" y2="60" stroke="rgb(229,9,20)" strokeWidth={"2"}></line>
                        <line x1="85" y1="55" x2="87" y2="60" stroke="rgb(229,9,20)" strokeWidth={"2"}></line>
                        <line x1="3" y1="60" x2="87" y2="60" stroke="rgb(229,9,20)" strokeWidth={"2"}></line>
                        <line x1="3" y1="60" x2="3" y2="63" stroke="rgb(229,9,20)" strokeWidth={"2"}></line>
                        <line x1="87" y1="60" x2="87" y2="63" stroke="rgb(229,9,20)" strokeWidth={"2"}></line>
                        <line x1="3" y1="63" x2="87" y2="63" stroke="rgb(229,9,20)" strokeWidth={"2"}></line>
                    </svg>
                    <svg width={"110px"} height={"100px"} id="tv-svg">
                        <rect x="5" y="5" height={"60px"} width={"102px"} ry="5" rx="5" stroke="rgb(229,9,20)" strokeWidth={"2"} fill="none"></rect>
                        <line x1="56" y1="65" x2="56" y2="83" stroke="rgb(229,9,20)" strokeWidth={"2"}></line>
                        <line x1="36" y1="83" x2="76" y2="83" stroke="rgb(229,9,20)" strokeWidth={"2"}></line>
                    </svg>
                    <svg width={"35px"} height={"40px"} id="tablet-svg">
                        <rect x="2" y="2" height={"37px"} width={"30px"} ry="3" rx="3" stroke="rgb(229,9,20)" strokeWidth={"2"} fill="none"></rect>
                        <circle cx="17" cy="34" r="2" stroke="rgb(229,9,20)" strokeWidth={"1"} fill="none"></circle>
                    </svg>
                    <svg width={"22px"} height={"30px"} id="phone-svg">
                        <rect x="2" y="2" height={"27px"} width={"18px"} ry="3" rx="3" stroke="rgb(229,9,20)" strokeWidth={"2"} fill="none"></rect>
                        <circle cx="11" cy="24" r="2" stroke="rgb(229,9,20)" strokeWidth={"1"} fill="none"></circle>
                    </svg>
                </div>
                <div id="middle-content">
                    <p>
                        STEP <b>1</b> OF <b>3</b>
                    </p>
                    <h1>
                        Finish setting up your account
                    </h1>
                    <p>
                        Netflix is personalised for you.<br></br> Create a password to watch on any device at any time.
                    </p>
                    <br></br>
                    <Link id="next-button-1" to='/signup/step2of1'>Next</Link>
                </div >
            </div >
        </>
    )
}

export default Step1of1;