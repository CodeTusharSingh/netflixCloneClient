import './Step1of3.css'
import visa from './VISA.png'
import mastercard from './MASTERCARD.png'
import amex from './AMEX.png'
import diners from './DINERS.png'
import paytm from './PAYTM.png'
import phonepe from './PHONEPE.png'
import gpay from './GPAY.png'
import amazonpay from './AMAZONPAY.png'
import bhim from './BHIM.png'
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignContext } from "../context/signContext";


function Step1of3() {
    let history = useNavigate();

    const { updateSign } = useContext(SignContext);

    useEffect(() => {
        updateSign('Sign Out')
    }, [updateSign])

    const check = async () => {
        try {
            const response = await fetch('https://netflixcloneserver-1g07.onrender.com/verifyAllToken', {
                method: 'GET',
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


    const handleClick = async (e) => {
        console.log('Div clicked!');
        e.preventDefault();
        try {
            const response = await fetch('https://netflixcloneserver-1g07.onrender.com/api/getkey', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
            const data = await response.json(); // Parse the response body as JSON
            console.log(data.key);

            const planResponse = await fetch('https://netflixcloneserver-1g07.onrender.com/getPlan', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const JsonPlan = await planResponse.json();
            console.log(JsonPlan.plan)
            const plan = JsonPlan.plan;

            const res = await fetch('https://netflixcloneserver-1g07.onrender.com/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: plan }),
                credentials: 'include'
            })

            const order_data = await res.json();
            const { amount, id } = order_data.order;

            const options = {
                key: data.key,
                amount: amount,
                currency: "INR",
                name: "Netflix Payment",
                description: "Netflix Payment",
                image: "https://imgs.search.brave.com/S_FdUC7P0znM-T2KyXpDEqBYQtkugcUs6ZN7c0Gn4-c/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDUwNjMz/NDIucG5n",
                order_id: id,
                callback_url: `https://netflixcloneserver-1g07.onrender.com/paymentverification`,
                // "/paymentverification" `/destination?data=${dataToSend}`,

                prefill: {
                    name: "rayzerpay",
                    email: "rayzer@example.com",
                    contact: "9999999999"
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#121212"
                }
            };
            const razor = new window.Razorpay(options);
            razor.open();

        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div id='middle-container-5'>
                <svg height={'50px'} width={'50px'}>
                    <circle cx='25' cy='25' r='23' fill='none' stroke='rgb(229,9,20)' strokeWidth='2'></circle>
                    <rect x='13' y='22' width={'25px'} height={'16px'} fill='none' stroke='rgb(229,9,20)' strokeWidth='2'></rect>
                    <circle cx='25' cy='30' r='2' fill='none' stroke='rgb(229,9,20)' strokeWidth='2'></circle>
                    <line x1='19' y1='22' x2='19' y2='12' stroke='rgb(229,9,20)' strokeWidth='2'></line>
                    <line x1='32' y1='22' x2='32' y2='12' stroke='rgb(229,9,20)' strokeWidth='2'></line>
                    <path d="M19 12 A13 26 0 0 1 32 12" fill='none' stroke='rgb(229,9,20)' strokeWidth='2'></path>
                </svg>
                <p>STEP <b>3</b> OF <b>3</b></p>
                <h1>Choose how to pay</h1>
                <p>Your payment is encrypted and you can change your<br></br>
                    payment method at anytime.</p>
                <h3>Secure for peace of mind.<br></br>
                    Cancel easily online.</h3>
                <div id='payment-options'>
                    <p style={{ position: 'relative', top: '10px', left: '180px' }}>End-to-end encrypted🔒</p>
                    <div id='option-1' onClick={handleClick}>
                        <div id='card-option'>
                            <p>Credit or Debit Card</p>
                            <img src={visa} alt='Visa' width={'40px'} height={'25px'}></img>
                            <img src={mastercard} alt='Mastercard' width={'40px'} height={'25px'}></img>
                            <img src={amex} alt='Amex' width={'40px'} height={'25px'}></img>
                            <img src={diners} alt='Diners' width={'40px'} height={'25px'}></img>
                        </div>
                        <div style={{ paddingRight: '10px', position: 'relative', bottom: '5px' }}>
                            <p> {'>'} </p>
                        </div>
                    </div>
                    <br></br>
                    <div id='option-2' onClick={handleClick}>
                        <div id='upi-option'>
                            <p>UPI Auto Pay</p>
                            <img src={paytm} alt='Paytm' width={'40px'} height={'25px'}></img>
                            <img src={phonepe} alt='Phonepe' width={'40px'} height={'25px'}></img>
                            <img src={gpay} alt='GPay' width={'40px'} height={'25px'}></img>
                            <img src={amazonpay} alt='Amazonpay' width={'40px'} height={'25px'}></img>
                            <img src={bhim} alt='BHIM' width={'40px'} height={'25px'}></img>
                        </div>
                        <div style={{ paddingRight: '10px', position: 'relative', bottom: '5px' }}>
                            <p> {'>'} </p>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </>
    )
}

export default Step1of3