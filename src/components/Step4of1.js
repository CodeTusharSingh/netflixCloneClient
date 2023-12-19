import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Step4of1.css'

import { useContext } from 'react';
import { SignContext } from "../context/signContext";

function Step4of1() {
    let history = useNavigate();

    const { updateSign } = useContext(SignContext);

    useEffect(() => {
        updateSign('Sign In')
    }, [updateSign])

    const [email, setEmail] = useState('');
    const [incorrect, setIncorrect] = useState(false);

    const check = async () => {
        try {
            const response = await fetch('https://netflixcloneserver-1g07.onrender.com/step2of1', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log('User is valid. Email:', data.email);
                setEmail(data.email);
            } else if (response.status === 401) {
                console.log('User is not valid. Proceed to error page');
            } else {
                console.log('Unexpected response status:', response.status);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        check();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(email);
        // console.log(passwordValue);
        try {
            const response = await fetch('https://netflixcloneserver-1g07.onrender.com/Step4of1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password: passwordValue }),
                credentials: 'include'
            });

            if (response.status === 200) {

                history('/signup/Step1of2'); // Use 'push' to navigate to the new URL
            }
            else if (response.status === 404) {
                setIncorrect(true);
                console.log('user not found');
            }
            else if (response.status === 401) {
                setIncorrect(true);
                console.log('email or password are invalid');
            }
            else {
                // Handle non-201 responses here
                console.log('login failed with status code:', response.status);
            }
        } catch (error) {
            console.error('Error occurred during registration:', error);
        }
        // Step4of1
    };
    const [passwordLabelStyle, setPasswordLabelStyle] = useState({
        position: 'relative',
        top: '18px',
        left: '15px',
        color: 'white'
    });
    const [initialPassState, setPassState] = useState('Enter your password');
    const [passwordValue, setPasswordValue] = useState('');
    const handlePasswordChange = (event) => {
        setPasswordValue(event.target.value)
    }
    const handlePassFocus = () => {
        setPassState('')
        setPasswordLabelStyle({
            position: 'relative',
            top: '18px',
            left: '15px',
            color: 'rgb(79,79,79)'
        })
    }
    const handlePassBlur = () => {
        setPassState('Enter your password')
        setPasswordLabelStyle({
            position: 'relative',
            top: '18px',
            left: '15px',
            color: 'rgb(255,255,255)'
        })
    }
    const passwordDivStyle = {
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'NetflixSansLite',
        color: 'rgb(79,79,79)'
    }
    return (
        <>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div id="middle-container-6">
                {incorrect && <div id='warning-1'>
                    <div>
                        <svg height={'24px'} width={'24px'} >
                            <polygon points='0,24 12,0 24,24' fill='black' stroke='black' strokeWidth='1'></polygon>
                            <line x1='12' y1='8' x2='12' y2='16' stroke='#D89D31' strokeWidth={'2'}></line>
                            <line x1='12' y1='18' x2='12' y2='20' stroke='#D89D31' strokeWidth={'2'}></line>
                        </svg>
                    </div>

                    <div>

                        <p style={{ fontFamily: 'NetflixSans', color: 'black' }}>Your password is incorrect. Please try again.</p>
                    </div>
                </div>
                }

                <p>STEP <b>1</b> OF <b>3</b></p>
                <h1>Welcome back! Joining Netflix is easy.</h1>
                <p>Enter your password and you'll be watching in no time.</p>
                <form id="setup-login-form">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor='email-value' style={{ position: 'relative', left: '15px', top: '18px', fontFamily: 'NetflixSansLite' }}>Email</label>
                        <input id='email-value' value={email} disabled></input>
                    </div>
                    <div style={passwordDivStyle}>
                        <label htmlFor='password-input' style={passwordLabelStyle}>Enter your password</label>
                        <input id='setup-password' type='password' autoComplete='on' placeholder={initialPassState} onFocus={handlePassFocus} onBlur={handlePassBlur} onChange={handlePasswordChange} value={passwordValue}></input>
                    </div>
                    <br></br>
                    <a href='/' id='forgot-password-1'>Forget your password?</a>
                    <br></br>
                    <br></br>
                    <input id='submit-setup-login-form' type='submit' value='Next' onClick={handleSubmit}></input>
                </form>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </>
    )
}

export default Step4of1;