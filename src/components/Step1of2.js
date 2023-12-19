import './Step1of2.css'
import { useContext, useEffect } from 'react';
import { SignContext } from "../context/signContext";
import { useNavigate } from 'react-router-dom';


function Step1of2() {
    let history = useNavigate();
    const handleSubmit = async (e) => {
        history('/signup/Step2of2');
    }

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

    return (
        <>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div id="middle-container-2">
                <div id='top-svg'>
                    <svg height={"50px"} width={"50px"}>
                        <circle cx="25" cy="25" r="20" stroke='rgb(220,9,20)' strokeWidth={'3'} fill='none'></circle>
                        <line x1='15' y1='25' x2='22' y2='32' stroke='rgb(220,9,20)' strokeWidth={'3'}></line>
                        <line x1='21' y1='33' x2='35' y2='19' stroke='rgb(220,9,20)' strokeWidth={'3'}></line>
                    </svg>
                </div>
                <div id="middle-content-2">
                    <p>STEP <b>2</b> OF <b>3</b></p>
                    <h1>Choose your plan.</h1>
                    <div id='points'>
                        <div>
                            <svg height={'40px'} width={'40px'}>
                                <line x1='15' y1='25' x2='22' y2='32' stroke='rgb(220,9,20)' strokeWidth={'2'}></line>
                                <line x1='21' y1='32' x2='35' y2='19' stroke='rgb(220,9,20)' strokeWidth={'2'}></line>
                            </svg>
                        </div>
                        <div style={{ position: 'relative', left: '15px' }}><p>No commitments, cancel anytime.</p></div>
                    </div>
                    <div id='points'>
                        <div>
                            <svg height={'40px'} width={'40px'}>
                                <line x1='15' y1='25' x2='22' y2='32' stroke='rgb(220,9,20)' strokeWidth={'2'}></line>
                                <line x1='21' y1='32' x2='35' y2='19' stroke='rgb(220,9,20)' strokeWidth={'2'}></line>
                            </svg>
                        </div>
                        <div style={{ position: 'relative', left: '15px' }}><p>Everything on Netflix for one low price.</p></div>
                    </div>
                    <div id='points'>
                        <div>
                            <svg height={'40px'} width={'40px'}>
                                <line x1='15' y1='25' x2='22' y2='32' stroke='rgb(220,9,20)' strokeWidth={'2'}></line>
                                <line x1='21' y1='32' x2='35' y2='19' stroke='rgb(220,9,20)' strokeWidth={'2'}></line>
                            </svg>
                        </div>
                        <div style={{ position: 'relative', left: '15px' }}><p>No ads and no extra fees. Ever.</p></div>
                    </div >
                    <br></br>
                    <br></br>
                    <span id="next-button-2" onClick={handleSubmit} >Next</span>
                </div >
            </div >
            <br></br>
            <br></br>
        </>
    )
}

export default Step1of2;