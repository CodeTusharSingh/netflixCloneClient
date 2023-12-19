import "./Step3of1.css"
import { useContext, useEffect, useState } from 'react';
import { SignContext } from "../context/signContext";
import { Link } from "react-router-dom";

function Step3of1() {
    const [email, setEmail] = useState('');

    const { updateSign } = useContext(SignContext);

    useEffect(() => {
        updateSign('Sign Out')
    }, [updateSign])

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

    return (
        <>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div id='middle-container-3'>
                <p>STEP <b>1</b> OF <b>3</b></p>
                <h1>Account Created</h1>
                <p>Use this email to access your account:</p>
                <br></br>
                <p id="user-email"><b>{email} </b></p>
                <br></br>
                <br></br>
                <Link to="/signup/Step1of2" id='next-3'>Next</Link>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </>
    )
}

export default Step3of1;