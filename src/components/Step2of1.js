import { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Step3of1 from './Step3of1';
import { SignContext } from "../context/signContext";

import './Step2of1.css'
// import { SignContext } from '../context/signContext';
function Step2of1() {
  let history = useNavigate();
  let p;

  // const { pass, updatePass } = useContext(SignContext);

  const { updateSign } = useContext(SignContext);
  const [initialEmailState, setEmailState] = useState('Email');
  let [password, setPassword] = useState('');
  const [shouldRenderComponentB, setshouldRenderComponentB] = useState(false);
  useEffect(() => {
    updateSign('Sign In')
  }, [updateSign])

  const emptyPassRef = useRef(null);

  const handlePasswordChange = (event) => {
    // setPassword(event.target.value)
    p = event.target.value;
  };


  useEffect(() => {
    check();
  }, []);


  const check = async () => {
    try {
      // Assuming this is your first request to '/main'
      const tokenResponse = await fetch('https://netflixcloneserver-1g07.onrender.com/main', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (tokenResponse.status === 201) {
        console.log('Step 3 of 1');
        setshouldRenderComponentB(true);
        return; // Important: Return or use 'else' to avoid the rest of the function execution
      }

      else {
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
          setEmailValue(data.email);
        } else if (response.status === 401) {
          console.log('User is not valid. Proceed to error page');
        } else {
          console.log('Unexpected response status:', response.status);
        }
      }
      // Assuming this is your second request to '/step2of1'

    } catch (err) {
      console.error('An error occurred while checking:', err);
      // Handle errors appropriately
    }
  };



  const handleSubmit = async (e) => {
    setPassword(p);
    console.log(p);
    e.preventDefault();
    try {
      const response = await fetch('https://netflixcloneserver-1g07.onrender.com/step2of1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ email: emailValue, password: p }),
        credentials: 'include'
      });

      if (response.status === 200) {
        console.log('Password updated successfully');
        history('/signup/Step1of2');
      }
      else if (response.status === 400) {
        emptyPassRef.current.style.color = 'rgb(229,9,20)'
      }
      else {
        console.log('Password update failed with status code:', response.status);
      }
    } catch (error) {
      console.error('An error occurred during the password update:', error);
    }
  };



  const [emailValue, setEmailValue] = useState('');
  const [emailLabelStyle, setEmailLabelStyle] = useState({
    position: 'relative',
    top: '18px',
    left: '15px',
    color: 'white'
  });
  const [passwordLabelStyle, setPasswordLabelStyle] = useState({
    position: 'relative',
    top: '18px',
    left: '15px',
    color: 'rgb(79,79,79)'
  });

  const handleEmailFocus = () => {
    setEmailState('')
    setEmailLabelStyle({
      position: 'relative',
      top: '18px',
      left: '15px',
      color: 'rgb(79,79,79)'
    })
  }
  const handleEmailBlur = () => {
    setEmailState('Email address')
    setEmailLabelStyle({
      position: 'relative',
      top: '18px',
      left: '15px',
      color: 'rgb(255,255,255)'
    })
  }

  const handleEmailChange = (event) => {
    setEmailState(event.target.value);
    setEmailValue(event.target.value)
  }


  const emailDivStyle = {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'NetflixSansLite',
    color: 'rgb(79,79,79)'
  }
  const passwordDivStyle = {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'NetflixSansLite',
    color: 'rgb(79,79,79)',

  }
  const ComponentB = () => {
    return <>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div id="middle-container-1">
        <p>STEP <b>1</b> OF <b>3</b></p>
        <h1>Create a password to start your membership</h1>
        <p>Just a few more steps and you're done!<br></br> We hate paperwork, too.</p>
        <form id="signup-form">
          <div style={emailDivStyle}>
            <label htmlFor='email-input' style={emailLabelStyle}>Email</label>
            <input id='email-input' type='email' autoComplete='on' placeholder={initialEmailState} onFocus={handleEmailFocus} onBlur={handleEmailBlur} onChange={handleEmailChange} value={emailValue}></input>
          </div>
          <div style={passwordDivStyle}>
            <label htmlFor='password-input' style={passwordLabelStyle} ref={emptyPassRef}>Add a password</label>
            <input id='password-input' type='password' autoComplete='on' onChange={handlePasswordChange}></input>
          </div>
          <br></br>
          <input id='submit-signup-form' type='submit' value='Next' onClick={handleSubmit} ></input>
        </form>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </>
  };
  return (
    <div>
      {shouldRenderComponentB ? <Step3of1 /> : <ComponentB />}
    </div>
  )
}
export default Step2of1;