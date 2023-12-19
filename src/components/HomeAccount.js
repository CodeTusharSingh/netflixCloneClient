import { useState, useEffect } from "react";

function HomeAccount() {

    const [email, setEmail] = useState('');

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

    const [amount, setAmount] = useState('');
    const [validity, setValidity] = useState('');
    const [plan, setPlan] = useState('');

    const userInformation = async () => {
        try {
            const response = await fetch(`https://netflixcloneserver-1g07.onrender.com/homeaccount/${email}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (response.status === 200) {
                const data = await response.json();
                console.log('User data:', data[0].plan);
                setAmount(data[0].plan);
                const validityDate = new Date(data[0].validity)
                setValidity(validityDate.toISOString().split('T')[0])
                if (data[0].plan === 149) {
                    setPlan('Mobile')
                }
                else if (data[0].plan === 199) {
                    setPlan('Basic')
                }
                else if (data[0].plan === 499) {
                    setPlan('Standard')
                }
                else if (data[0].plan === 649) {
                    setPlan('Premium')
                }
            } else if (response.status === 401) {
                console.log('User is not valid. Proceed to error page');
            } else {
                console.log('Unexpected response status:', response.status);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const [showFeedback, setShowFeedback] = useState(true)

    const fetchFeedback = async () => {
        try {
            const response = await fetch(`https://netflixcloneserver-1g07.onrender.com/user/feedback/check/${email}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (response.status === 200) {
                console.log('feedback present')
                setShowFeedback(false)
            } else if (response.status === 404) {
                setShowFeedback(true)
                console.log('feedback not present')
            } else {
                console.log('Unexpected response status:', response.status);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (email.length !== 0) {
            userInformation()
            fetchFeedback()
        }
    }, [email])

    const [text, setText] = useState('');
    const maxLength = 255;

    const handleChange = (event) => {
        const inputText = event.target.value;

        if (inputText.length <= maxLength) {
            setText(inputText);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`https://netflixcloneserver-1g07.onrender.com/user/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, feedback: text })
            });
            if (response.status === 200) {
                setShowFeedback(false)
                console.log('Feedback submitted')
            } else {
                console.log('Failed to update feedback');
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://netflixcloneserver-1g07.onrender.com/user/feedback/delete`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email })
            });
            if (response.status === 200) {
                setShowFeedback(true)
                console.log('Feedback deleted')
            } else {
                console.log('Failed to delete feedback');
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <div style={{ marginLeft: '50px' }}>
                <h1 style={{ color: 'white', fontFamily: 'NetflixSans' }}>Your Account</h1>
                <br></br>
                <div>
                    <h3 style={{ color: 'white', fontFamily: 'NetflixSans' }}>Email Id: <span style={{ color: '#a1a1a1', fontFamily: 'NetflixSansLite', fontSize: '16px' }}> {email}</span></h3>
                </div>
                <div>
                    <h3 style={{ color: 'white', fontFamily: 'NetflixSansLite' }}>Plan: <span style={{ color: '#a1a1a1', fontFamily: 'NetflixSansLite', fontSize: '16px' }}> {plan}</span></h3>
                </div>
                <div>
                    <h3 style={{ color: 'white', fontFamily: 'NetflixSansLite' }}>Amount: <span style={{ color: '#a1a1a1', fontFamily: 'NetflixSansLite', fontSize: '16px' }}> ₹{amount}</span></h3>
                </div>
                <div>
                    <h3 style={{ color: 'white', fontFamily: 'NetflixSansLite' }}>Validity: <span style={{ color: '#a1a1a1', fontFamily: 'NetflixSansLite', fontSize: '16px' }}> {validity}</span></h3>
                </div>
                <div>
                    <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                        <h3 style={{ color: 'white', fontFamily: 'NetflixSansLite' }}>Feedback:</h3>
                        {showFeedback && <>
                            <textarea
                                style={{ width: '400px', backgroundColor: '#181818', color: 'white', fontFamily: 'NetflixSansLite', fontSize: '16px', borderRadius: '4px' }}
                                id="myTextBox"
                                rows="7"
                                value={text}
                                onChange={handleChange}
                            ></textarea>
                            <p style={{ color: 'white', fontFamily: 'NetflixSansLite' }}>{text.length}/{maxLength} characters</p>
                        </>}
                    </div>
                    {showFeedback &&
                        <button onClick={handleSubmit} style={{ backgroundColor: 'rgb(229,9,20)', border: 'none', padding: '15px', color: 'white', fontFamily: 'NetflixSansLite', fontSize: '16px', borderRadius: '4px', cursor: 'pointer' }}>Submit feedback</button>
                    }
                    {!showFeedback &&
                        <p onClick={handleDelete} style={{ color: '#0073E6', fontFamily: 'NetflixSansLite', fontSize: '16px', textDecoration: 'underline', cursor: 'pointer' }}>Feedback submitted......</p>
                    }
                </div>
            </div>
        </>
    )
}

export default HomeAccount;