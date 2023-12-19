import { useEffect } from 'react';
import './Home.css'
import { useRef } from 'react';
import { useState } from 'react';
import netflixlogo from './netflix.png'
import HomeXComponent from './HomeXComponent';
import { useContext } from 'react';
import { HomeContext } from '../context/homeContext';
import axios from 'axios';
import { VideoContext } from '../context/videoContext';
import { HomeTypeContext } from '../context/homeTypeContext';
import HomeSeasonXComponent from './HomeSeasonXComponent';
import HomeMovieXComponent from './HomeMovieXComponent';
import { Link, useNavigate } from 'react-router-dom';
import HomeTVShowsComponent from './HomeTVShowsComponent';
import HomeMovieComponent from './HomeMovieComponent';
import HomeMyListComponent from './HomeMyListComponent';
import { MyListContext } from '../context/myListContext';
import HomeAccount from './HomeAccount';
import HomeHistoryComponent from './HomeHistoryComponent';
import HomeSearchComponent from './HomeSearchComponent';


function Home() {

    const [email, setEmail] = useState('');
    const { myListUpdation } = useContext(MyListContext);

    const [userList, setUserList] = useState(null);
    const [userSearchList, setUserSearchList] = useState(null);
    const [userHistory, setUserHistory] = useState(null);
    const [planExpired, setPlanExpired] = useState(false);

    let history = useNavigate();

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
                // console.log('User is valid. Email:', data.email);
                setPlanExpired(false);
                setEmail(data.email);
            } else if (response.status === 401) {
                // console.log('User is not valid. Proceed to error page');
                history('/');
            }
            else if (response.status === 500) {
                setPlanExpired(true);
            }
            else {
                // console.log('Unexpected response status:', response.status);
                history('/');
            }
        }
        catch (err) {
            console.log(err);
        }

        try {
            const response = await fetch('https://netflixcloneserver-1g07.onrender.com/protected-route', {
                method: 'GET',

                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            console.log("validity: ", response.status)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        check();
        const intervalId = setInterval(() => {
            check();
        }, 60000);
        return () => clearInterval(intervalId);
    }, []);




    const { contentLink, updateContentLink } = useContext(HomeContext);
    const { contentType, updateContentType } = useContext(HomeTypeContext);
    const { updateVideoLink, updateVideoImgLink, showMore, updateShowMore } = useContext(VideoContext);
    const [navbar, setNavbar] = useState('home');
    useEffect(() => {
        document.title = "Home - Netflix";
    }, [showMore])
    const videoRef = useRef(null);
    const unmuteRef = useRef(null);
    const muteRef = useRef(null);
    const replayRef = useRef(null);
    const volumeControlRef = useRef(null);
    const [countdown, setCountDown] = useState(0);
    const [videoSrc, setVideoSrc] = useState(null);
    const [videoTitle, setVideoTitle] = useState(null);


    const showMoreInfo = () => {
        updateContentLink('onepiece')
        updateContentType('series')
        updateShowMore(true)
    }


    const [error, setError] = useState(null);
    const [content, setContent] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // console.log(contentType)
        // console.log(contentLink)
        // console.log(content);
        if (contentLink !== null) {
            if (contentType === 'movies') {
                Promise.all([
                    axios.get(`https://moviesapi-production-7860.up.railway.app/moviesAPI/${contentLink}`)
                ])
                    .then(([moviesResponse]) => {
                        if (moviesResponse.data && moviesResponse.data[0] !== null && moviesResponse.data[0] !== undefined) {
                            setContent(moviesResponse.data)
                            updateVideoLink(moviesResponse.data[0][Object.keys(moviesResponse.data[0])][0].trailer)
                            updateVideoImgLink(moviesResponse.data)
                        }
                    })
                    .catch(error => {
                        setError(error);
                        setContent([])
                        updateVideoLink(null)
                        updateVideoImgLink([])
                    })

                    .finally(() => {
                        setLoading(false);
                    });
            }
            else if (contentType === 'series') {
                Promise.all([
                    axios.get(`https://seriesapi-production.up.railway.app/seriesAPI/${contentLink}`)
                ])
                    .then(([seriesResponse]) => {
                        if (seriesResponse.data && seriesResponse.data[0] !== null && seriesResponse.data[0] !== undefined) {
                            setContent(seriesResponse.data)
                            updateVideoLink(seriesResponse.data[0][Object.keys(seriesResponse.data[0])][0].trailer)
                            updateVideoImgLink(seriesResponse.data)
                        }
                    })
                    .catch(error => {
                        setError(error);
                        setContent([])
                        updateVideoLink(null)
                        updateVideoImgLink([])
                    })

                    .finally(() => {
                        setLoading(false);
                    });
            }
        }
    }, [contentLink, updateVideoLink, contentType, updateVideoImgLink])

    const [mute, setMute] = useState(false);
    const titleImgRef = useRef(null);
    const titleContentRef = useRef(null);

    useEffect(() => {
        if (navbar === 'home') {
            volumeControlRef.current.style.display = 'none';
            unmuteRef.current.style.display = 'none';
            muteRef.current.style.display = 'none';
            replayRef.current.style.display = 'none';
            const timer = setTimeout(() => {
                videoRef.current.style.display = 'block';
                volumeControlRef.current.style.display = 'block';
                muteRef.current.style.display = 'block';
                unmuteRef.current.style.display = 'none';
                replayRef.current.style.display = 'none';
                setCountDown(1);
            }, 5000)
            return () => { clearTimeout(timer) };
        }
    }, [navbar])
    useEffect(() => {
        if (navbar === 'home') {
            const titleImg = titleImgRef.current;
            const titleContent = titleContentRef.current;
            if (countdown >= 1) {
                const timer = setTimeout(() => {
                    if (countdown < 10) {
                        // console.log(countdown)
                        videoRef.current.play().catch(error => {
                            console.log('Error: ', error)
                        })
                        titleImg.style.transition = 'transform 0.5s';
                        titleImg.style.transformOrigin = 'bottom left';
                        titleImg.style.transform = 'scale(0.5)';
                        titleContent.style.transition = 'opacity 0.5s';
                        titleContent.style.opacity = '0';
                        titleContent.style.fontSize = '2px'
                        setCountDown(countdown + 1);
                    } else {
                        const vid = videoRef.current;
                        vid.style.display = 'none';
                        vid.load();
                        vid.pause();
                        unmuteRef.current.style.display = 'none';
                        muteRef.current.style.display = 'none';
                        replayRef.current.style.display = 'block';
                        titleImg.style.transition = 'transform 0.5s';
                        titleImg.style.transformOrigin = 'bottom left';
                        titleImg.style.transform = 'scale(1)';
                        titleContent.style.transition = 'opacity 0.5s';
                        titleContent.style.opacity = '1';
                        titleContent.style.fontSize = '18px'
                    }
                }, 1000)
                return () => clearTimeout(timer)
            }
        }
    }, [countdown, navbar])


    const volumeControl = () => {
        if (navbar === 'home') {
            if (replayRef.current.style.display === 'block') {
                setCountDown(1)
                videoRef.current.style.display = 'block'
                videoRef.current.play().catch(error => {
                    console.log('Error: ', error)
                })
                replayRef.current.style.display = 'none'
            }
            videoRef.current.muted = mute;
            if (mute === false) {
                muteRef.current.style.display = 'none';
                unmuteRef.current.style.display = 'block';
                setMute(true)
            } else {
                unmuteRef.current.style.display = 'none';
                muteRef.current.style.display = 'block';
                setMute(false)
            }
        }
    }
    const { updateMyListUpdation } = useContext(MyListContext);

    const playContent = async () => {
        if (navbar === 'home') {
            setVideoSrc('https://github.com/CodeTusharSingh/Netflix-Clone/raw/main/sample-video-2.mp4')
            setVideoTitle("One Piece")
        }
        try {
            const response = await fetch('https://netflixcloneserver-1g07.onrender.com/userHistory/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({ email: email, contentLinkName: 'onepiece' }),
            });

            if (response.status === 200) {
                // console.log('Added successfully');
                updateMyListUpdation((prev) => prev + 1);
            }
            else if (response.status === 400) {
                // console.log('Failed: ', response.status);
            }
            else {
                // console.log('Failed:', response.status);
            }
        } catch (error) {
            // console.error('Error adding content to user list:', error);
        }
    }

    const closeVideo = () => {
        if (navbar === 'home') {
            setVideoSrc(null);
            setVideoTitle(null);
        }
    }

    const pouplarContents = [
        {
            contentImg: ['https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABdf2SJtglKZ5boseg8-x4HWFhBlxEpG8alnizl4m9PPEridKP4mAkKHTnb9apWu5oE-73HrHvDhrcZaoFl1tL1kIXE7GkHDexT2QQvQDA57_PXCZbnl3TMrzr6FcUbe2YXse.jpg?r=d31', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABXKFNO0_GERe_ILuMmmCsc5lhNe0ifUGto67PA9sot7kCCGC0EPwLWCirUj6leZei9WK9fBonAI96qlk-VfeW3NE02bCVgjtd38UoZIjKKVEk8EBNKO0yJYakhIS5wFVvpiw.jpg?r=841', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABZCulBDOkneF3RJouRk0n4tThLEIdh1fDn6adyo1u_UagkVUP0r2B_jw6w1sdkjnlWYUKHZ6_3PH_ovttNhaS1xBuVOmNDpJn6-uUMymUSvKfNnit89eZTbCzBFevWrwQb0y.jpg?r=257', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABbWeuHshVh6x9nCg0T8TeBMB0gw0L2LVt-YSCDkQ9JkfeKP6Lt9969MeHFy1Ydm7obZOjaUED2BAsOa4wCKpZnFI6k_IULpVtI-XiFrL_2sc8p9FK_W-7oHTdWNBlpI18B71.jpg?r=221', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABUm0kq-hgAoJYUIL_uZv0UH992lx_BScPg_3t3-nEofhLXgYS5weaeJiacTGN_j91oAaAFP2ei8FYSEbeznozZN6vV_0sB2txByyR3pfIMFnq9mTp-Rn-FY2pAAJtYzoop_i.jpg?r=807', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABbz0IhHbae_eEyf4mT_pnYwO2NPJcA_uQDTM8hod8I_pU7AFp96TY5HmNKLwDI1S9nQCHK-msYJ1MlrPxiwwBcM_53gv39Imd-Bm_TokUAjPSY-uYKvdeOvfrG88u1GuD1R-.jpg?r=eac', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABVjjBfZfN899XB71sZDqzXzMRZjfeNhfUTMVUYGXQd8bEeLhg1vH7BZMAfglYYGyf_yGoZgCGb8dswsBbxBcJtj0IPnIsCRt1DRSc41Sli1vD1rR7YZ9bWwOMY3eTkL7xEDG.jpg?r=b33', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABTVWwGF4TVyF3-z6YvjdAtqVup5oKHTlK-QRmQYrEz_HX_qI3ZGRiSAFOXAIqcmLpu2B8TQWteMdILB6Zl3VaLLtHWXUHsE_vmXgufINoqYJjuLDrUcV_JwjJJ-3O8gURiyp.jpg?r=4d2', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABeCZHngrzPm5ubs1wnpgLJEE9wa20q1hUaP-NsKJVgDPpa76_EI2kwvsYQ8vP-KkhPXfWUAzYCNGel6CdnGMU6peqr89zZZtGiEF26gV0sXwzz-F2mxMeww2XFgN3IwEkUff.jpg?r=6ab', 'https://occ-0-4344-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABX4dfCjmqQlyajE5r0sdyieV86hyjUYFmYUkjK5uPbcIMIMDJLOpZXbU7sENcySHLQx8eESNeTyIbgWfZUdbi2dBDDzXLwN9T3_G.jpg?r=5c9', 'https://occ-0-4344-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABR9G_JTaBG_aX6slElFOB7or3h5RF8u5Fqv53BAsTwVwVFKrkKHX5xZtpC9NBgEH4BUtgoF78ZuwLrIUsEusoJFOCSxsiSFheXNm.jpg?r=ac5', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABayhG1uUQCbZGE94Blth-OkeIXWypV_A1jJxbB0Nq_U_LdsNKyCkgm6HG5MYq2IaWeLISFuEXCdlEl2V7pWUxpGZMmZgfa_1qzVB2xYFYmc9qX7T0gYLC3uNz_T4Jh0j6R3H.jpg?r=e44', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABRTCPqXpci3utWBdjhChlGhxuk346g-R6O0oOIrEAHWgKTM6Jhfhptdg8EAoB9QU41fJcAh1Nr8FDn5wggXbKnsimIJVg2VGeZxMGD-FqVpnLZDKKtaBYr-WWFguQZk_5KNd.jpg?r=3a5', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABUQy1Imjj9G7L0VuUcz_nYDMlm6gqNZ4-6Ukolm2_IFph0YY3hlz95Mhfl3nKRv9FtLEi0_tpw8ZtGJ5UMN9b9muIHrk1zYI6CdLSGWUm2pOCwAkTByXuje-XzRxp7Gwx6kc.jpg?r=a7a', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABdQ38eP8Osmwcn0WxiPcDjDXLksBHVhUnZTJTnUYNAbxqNZMz5uVxHsSNJVnAVFvA2MeWbqnMOveluDVt7DBHL9dUCnd90f18UaOINDCG7W_tOI1WOVTeILv5nugxXGGS39z.jpg?r=aca', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABRY1_HPoM-hyTyKairetWEGkbDHmTGDT08EF-kJzmCIpfWIn_m5go583ybQbS-JufXK7wlN9Y9NhqOcfPy2gdgzt-RRs8blIweT2wQG8cB-8QvLVQ0m0T-uriWGPSj4OcUM6.jpg?r=a9c'],
            contentTitle: ['Dark', 'The Gray Man', '1899', 'Jamtara - Sabka Number Ayega', 'Money Heist', 'Extraction', 'Khakee - The Bihar Chapter', 'Wednesday', 'One Piece', 'Don', 'Don 2', 'Drive', 'Extraction 2', 'Red Notice', 'Guns & Gulaabs', 'Our Planet'],
            contentType: ['series', 'movies', 'series', 'series', 'series', 'movies', 'series', 'series', 'series', 'movies', 'movies', 'movies', 'movies', 'movies', 'series', 'series'],
            contentLink: ['/onlyonnetflix/series', '/onlyonnetflix/movie', '/onlyonnetflix/series', '/onlyonnetflix/series', '/onlyonnetflix/series', '/onlyonnetflix/movie', '/onlyonnetflix/series', '/onlyonnetflix/series', '/onlyonnetflix/series', '/onlyonnetflix/movie', '/onlyonnetflix/movie', '/onlyonnetflix/movie', '/onlyonnetflix/movie', '/onlyonnetflix/movie', '/onlyonnetflix/series', '/onlyonnetflix/series'],
            contentLinkName: ['dark', 'thegrayman', '1899', 'jamtara', 'moneyheist', 'extraction', 'khakeethebiharchapter', 'wednesday', 'onepiece', 'don', 'don2', 'drive', 'extraction2', 'rednotice', 'guns&gulaabs', 'ourplanet'],
        }
    ]

    const IndiaContents = [
        {
            contentImg: ['https://occ-0-4344-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABX4dfCjmqQlyajE5r0sdyieV86hyjUYFmYUkjK5uPbcIMIMDJLOpZXbU7sENcySHLQx8eESNeTyIbgWfZUdbi2dBDDzXLwN9T3_G.jpg?r=5c9', 'https://occ-0-4344-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABR9G_JTaBG_aX6slElFOB7or3h5RF8u5Fqv53BAsTwVwVFKrkKHX5xZtpC9NBgEH4BUtgoF78ZuwLrIUsEusoJFOCSxsiSFheXNm.jpg?r=ac5', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABayhG1uUQCbZGE94Blth-OkeIXWypV_A1jJxbB0Nq_U_LdsNKyCkgm6HG5MYq2IaWeLISFuEXCdlEl2V7pWUxpGZMmZgfa_1qzVB2xYFYmc9qX7T0gYLC3uNz_T4Jh0j6R3H.jpg?r=e44', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABVjjBfZfN899XB71sZDqzXzMRZjfeNhfUTMVUYGXQd8bEeLhg1vH7BZMAfglYYGyf_yGoZgCGb8dswsBbxBcJtj0IPnIsCRt1DRSc41Sli1vD1rR7YZ9bWwOMY3eTkL7xEDG.jpg?r=b33', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABbWeuHshVh6x9nCg0T8TeBMB0gw0L2LVt-YSCDkQ9JkfeKP6Lt9969MeHFy1Ydm7obZOjaUED2BAsOa4wCKpZnFI6k_IULpVtI-XiFrL_2sc8p9FK_W-7oHTdWNBlpI18B71.jpg?r=221', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABdQ38eP8Osmwcn0WxiPcDjDXLksBHVhUnZTJTnUYNAbxqNZMz5uVxHsSNJVnAVFvA2MeWbqnMOveluDVt7DBHL9dUCnd90f18UaOINDCG7W_tOI1WOVTeILv5nugxXGGS39z.jpg?r=aca', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABdf2SJtglKZ5boseg8-x4HWFhBlxEpG8alnizl4m9PPEridKP4mAkKHTnb9apWu5oE-73HrHvDhrcZaoFl1tL1kIXE7GkHDexT2QQvQDA57_PXCZbnl3TMrzr6FcUbe2YXse.jpg?r=d31', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABXKFNO0_GERe_ILuMmmCsc5lhNe0ifUGto67PA9sot7kCCGC0EPwLWCirUj6leZei9WK9fBonAI96qlk-VfeW3NE02bCVgjtd38UoZIjKKVEk8EBNKO0yJYakhIS5wFVvpiw.jpg?r=841', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABZCulBDOkneF3RJouRk0n4tThLEIdh1fDn6adyo1u_UagkVUP0r2B_jw6w1sdkjnlWYUKHZ6_3PH_ovttNhaS1xBuVOmNDpJn6-uUMymUSvKfNnit89eZTbCzBFevWrwQb0y.jpg?r=257', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABUm0kq-hgAoJYUIL_uZv0UH992lx_BScPg_3t3-nEofhLXgYS5weaeJiacTGN_j91oAaAFP2ei8FYSEbeznozZN6vV_0sB2txByyR3pfIMFnq9mTp-Rn-FY2pAAJtYzoop_i.jpg?r=807', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABbz0IhHbae_eEyf4mT_pnYwO2NPJcA_uQDTM8hod8I_pU7AFp96TY5HmNKLwDI1S9nQCHK-msYJ1MlrPxiwwBcM_53gv39Imd-Bm_TokUAjPSY-uYKvdeOvfrG88u1GuD1R-.jpg?r=eac', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABTVWwGF4TVyF3-z6YvjdAtqVup5oKHTlK-QRmQYrEz_HX_qI3ZGRiSAFOXAIqcmLpu2B8TQWteMdILB6Zl3VaLLtHWXUHsE_vmXgufINoqYJjuLDrUcV_JwjJJ-3O8gURiyp.jpg?r=4d2', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABeCZHngrzPm5ubs1wnpgLJEE9wa20q1hUaP-NsKJVgDPpa76_EI2kwvsYQ8vP-KkhPXfWUAzYCNGel6CdnGMU6peqr89zZZtGiEF26gV0sXwzz-F2mxMeww2XFgN3IwEkUff.jpg?r=6ab', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABRTCPqXpci3utWBdjhChlGhxuk346g-R6O0oOIrEAHWgKTM6Jhfhptdg8EAoB9QU41fJcAh1Nr8FDn5wggXbKnsimIJVg2VGeZxMGD-FqVpnLZDKKtaBYr-WWFguQZk_5KNd.jpg?r=3a5', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABUQy1Imjj9G7L0VuUcz_nYDMlm6gqNZ4-6Ukolm2_IFph0YY3hlz95Mhfl3nKRv9FtLEi0_tpw8ZtGJ5UMN9b9muIHrk1zYI6CdLSGWUm2pOCwAkTByXuje-XzRxp7Gwx6kc.jpg?r=a7a', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABRY1_HPoM-hyTyKairetWEGkbDHmTGDT08EF-kJzmCIpfWIn_m5go583ybQbS-JufXK7wlN9Y9NhqOcfPy2gdgzt-RRs8blIweT2wQG8cB-8QvLVQ0m0T-uriWGPSj4OcUM6.jpg?r=a9c'],
            contentTitle: ['Don', 'Don 2', 'Drive', 'Khakee - The Bihar Chapter', 'Jamtara - Sabka Number Ayega', 'Guns & Gulaabs', 'Dark', 'The Gray Man', '1899', 'Money Heist', 'Extraction', 'Wednesday', 'One Piece', 'Extraction 2', 'Red Notice', 'Our Planet'],
            contentType: ['movies', 'movies', 'movies', 'series', 'series', 'series', 'series', 'movies', 'series', 'series', 'movies', 'series', 'series', 'movies', 'movies', 'series'],
            contentLink: ['/onlyonnetflix/movie', '/onlyonnetflix/movie', '/onlyonnetflix/movie', '/onlyonnetflix/series', '/onlyonnetflix/series', '/onlyonnetflix/series', '/onlyonnetflix/series', '/onlyonnetflix/movie', '/onlyonnetflix/series', '/onlyonnetflix/series', '/onlyonnetflix/movie', '/onlyonnetflix/series', '/onlyonnetflix/series', '/onlyonnetflix/movie', '/onlyonnetflix/movie', '/onlyonnetflix/series'],
            contentLinkName: ['don', 'don2', 'drive', 'khakeethebiharchapter', 'jamtara', 'guns&gulaabs', 'dark', 'thegrayman', '1899', 'moneyheist', 'extraction', 'wednesday', 'onepiece', 'extraction2', 'rednotice', 'ourplanet'],
        }
    ]

    const actionContents = [
        {
            contentImg: ['https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABXKFNO0_GERe_ILuMmmCsc5lhNe0ifUGto67PA9sot7kCCGC0EPwLWCirUj6leZei9WK9fBonAI96qlk-VfeW3NE02bCVgjtd38UoZIjKKVEk8EBNKO0yJYakhIS5wFVvpiw.jpg?r=841', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABbz0IhHbae_eEyf4mT_pnYwO2NPJcA_uQDTM8hod8I_pU7AFp96TY5HmNKLwDI1S9nQCHK-msYJ1MlrPxiwwBcM_53gv39Imd-Bm_TokUAjPSY-uYKvdeOvfrG88u1GuD1R-.jpg?r=eac', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABRTCPqXpci3utWBdjhChlGhxuk346g-R6O0oOIrEAHWgKTM6Jhfhptdg8EAoB9QU41fJcAh1Nr8FDn5wggXbKnsimIJVg2VGeZxMGD-FqVpnLZDKKtaBYr-WWFguQZk_5KNd.jpg?r=3a5', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABUQy1Imjj9G7L0VuUcz_nYDMlm6gqNZ4-6Ukolm2_IFph0YY3hlz95Mhfl3nKRv9FtLEi0_tpw8ZtGJ5UMN9b9muIHrk1zYI6CdLSGWUm2pOCwAkTByXuje-XzRxp7Gwx6kc.jpg?r=a7a', 'https://occ-0-4344-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABR9G_JTaBG_aX6slElFOB7or3h5RF8u5Fqv53BAsTwVwVFKrkKHX5xZtpC9NBgEH4BUtgoF78ZuwLrIUsEusoJFOCSxsiSFheXNm.jpg?r=ac5', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABdf2SJtglKZ5boseg8-x4HWFhBlxEpG8alnizl4m9PPEridKP4mAkKHTnb9apWu5oE-73HrHvDhrcZaoFl1tL1kIXE7GkHDexT2QQvQDA57_PXCZbnl3TMrzr6FcUbe2YXse.jpg?r=d31', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABZCulBDOkneF3RJouRk0n4tThLEIdh1fDn6adyo1u_UagkVUP0r2B_jw6w1sdkjnlWYUKHZ6_3PH_ovttNhaS1xBuVOmNDpJn6-uUMymUSvKfNnit89eZTbCzBFevWrwQb0y.jpg?r=257', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABbWeuHshVh6x9nCg0T8TeBMB0gw0L2LVt-YSCDkQ9JkfeKP6Lt9969MeHFy1Ydm7obZOjaUED2BAsOa4wCKpZnFI6k_IULpVtI-XiFrL_2sc8p9FK_W-7oHTdWNBlpI18B71.jpg?r=221', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABUm0kq-hgAoJYUIL_uZv0UH992lx_BScPg_3t3-nEofhLXgYS5weaeJiacTGN_j91oAaAFP2ei8FYSEbeznozZN6vV_0sB2txByyR3pfIMFnq9mTp-Rn-FY2pAAJtYzoop_i.jpg?r=807', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABVjjBfZfN899XB71sZDqzXzMRZjfeNhfUTMVUYGXQd8bEeLhg1vH7BZMAfglYYGyf_yGoZgCGb8dswsBbxBcJtj0IPnIsCRt1DRSc41Sli1vD1rR7YZ9bWwOMY3eTkL7xEDG.jpg?r=b33', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABTVWwGF4TVyF3-z6YvjdAtqVup5oKHTlK-QRmQYrEz_HX_qI3ZGRiSAFOXAIqcmLpu2B8TQWteMdILB6Zl3VaLLtHWXUHsE_vmXgufINoqYJjuLDrUcV_JwjJJ-3O8gURiyp.jpg?r=4d2', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABeCZHngrzPm5ubs1wnpgLJEE9wa20q1hUaP-NsKJVgDPpa76_EI2kwvsYQ8vP-KkhPXfWUAzYCNGel6CdnGMU6peqr89zZZtGiEF26gV0sXwzz-F2mxMeww2XFgN3IwEkUff.jpg?r=6ab', 'https://occ-0-4344-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABX4dfCjmqQlyajE5r0sdyieV86hyjUYFmYUkjK5uPbcIMIMDJLOpZXbU7sENcySHLQx8eESNeTyIbgWfZUdbi2dBDDzXLwN9T3_G.jpg?r=5c9', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABayhG1uUQCbZGE94Blth-OkeIXWypV_A1jJxbB0Nq_U_LdsNKyCkgm6HG5MYq2IaWeLISFuEXCdlEl2V7pWUxpGZMmZgfa_1qzVB2xYFYmc9qX7T0gYLC3uNz_T4Jh0j6R3H.jpg?r=e44', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABdQ38eP8Osmwcn0WxiPcDjDXLksBHVhUnZTJTnUYNAbxqNZMz5uVxHsSNJVnAVFvA2MeWbqnMOveluDVt7DBHL9dUCnd90f18UaOINDCG7W_tOI1WOVTeILv5nugxXGGS39z.jpg?r=aca', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABRY1_HPoM-hyTyKairetWEGkbDHmTGDT08EF-kJzmCIpfWIn_m5go583ybQbS-JufXK7wlN9Y9NhqOcfPy2gdgzt-RRs8blIweT2wQG8cB-8QvLVQ0m0T-uriWGPSj4OcUM6.jpg?r=a9c'],
            contentTitle: ['The Gray Man', 'Extraction', 'Extraction 2', 'Red Notice', 'Don 2', 'Dark', '1899', 'Jamtara - Sabka Number Ayega', 'Money Heist', 'Khakee - The Bihar Chapter', 'Wednesday', 'One Piece', 'Don', 'Drive', 'Guns & Gulaabs', 'Our Planet'],
            contentType: ['movies', 'movies', 'movies', 'movies', 'movies', 'series', 'series', 'series', 'series', 'series', 'series', 'series', 'movies', 'movies', 'series', 'series'],
            contentLink: ['/onlyonnetflix/movie', '/onlyonnetflix/movie', '/onlyonnetflix/movie', '/onlyonnetflix/movie', '/onlyonnetflix/movie', '/onlyonnetflix/series', '/onlyonnetflix/series', '/onlyonnetflix/series', '/onlyonnetflix/series', '/onlyonnetflix/series', '/onlyonnetflix/series', '/onlyonnetflix/series', '/onlyonnetflix/movie', '/onlyonnetflix/series', '/onlyonnetflix/series', '/onlyonnetflix/series'],
            contentLinkName: ['thegrayman', 'extraction', 'extraction2', 'rednotice', 'don2', 'dark', '1899', 'jamtara', 'moneyheist', 'khakeethebiharchapter', 'wednesday', 'onepiece', 'don', 'drive', 'guns&gulaabs', 'ourplanet'],

        }
    ]

    const USTVContents = [
        {
            contentImg: ['https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABeCZHngrzPm5ubs1wnpgLJEE9wa20q1hUaP-NsKJVgDPpa76_EI2kwvsYQ8vP-KkhPXfWUAzYCNGel6CdnGMU6peqr89zZZtGiEF26gV0sXwzz-F2mxMeww2XFgN3IwEkUff.jpg?r=6ab', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABTVWwGF4TVyF3-z6YvjdAtqVup5oKHTlK-QRmQYrEz_HX_qI3ZGRiSAFOXAIqcmLpu2B8TQWteMdILB6Zl3VaLLtHWXUHsE_vmXgufINoqYJjuLDrUcV_JwjJJ-3O8gURiyp.jpg?r=4d2', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABRY1_HPoM-hyTyKairetWEGkbDHmTGDT08EF-kJzmCIpfWIn_m5go583ybQbS-JufXK7wlN9Y9NhqOcfPy2gdgzt-RRs8blIweT2wQG8cB-8QvLVQ0m0T-uriWGPSj4OcUM6.jpg?r=a9c', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABUm0kq-hgAoJYUIL_uZv0UH992lx_BScPg_3t3-nEofhLXgYS5weaeJiacTGN_j91oAaAFP2ei8FYSEbeznozZN6vV_0sB2txByyR3pfIMFnq9mTp-Rn-FY2pAAJtYzoop_i.jpg?r=807', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABdf2SJtglKZ5boseg8-x4HWFhBlxEpG8alnizl4m9PPEridKP4mAkKHTnb9apWu5oE-73HrHvDhrcZaoFl1tL1kIXE7GkHDexT2QQvQDA57_PXCZbnl3TMrzr6FcUbe2YXse.jpg?r=d31', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABXKFNO0_GERe_ILuMmmCsc5lhNe0ifUGto67PA9sot7kCCGC0EPwLWCirUj6leZei9WK9fBonAI96qlk-VfeW3NE02bCVgjtd38UoZIjKKVEk8EBNKO0yJYakhIS5wFVvpiw.jpg?r=841', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABZCulBDOkneF3RJouRk0n4tThLEIdh1fDn6adyo1u_UagkVUP0r2B_jw6w1sdkjnlWYUKHZ6_3PH_ovttNhaS1xBuVOmNDpJn6-uUMymUSvKfNnit89eZTbCzBFevWrwQb0y.jpg?r=257', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABbWeuHshVh6x9nCg0T8TeBMB0gw0L2LVt-YSCDkQ9JkfeKP6Lt9969MeHFy1Ydm7obZOjaUED2BAsOa4wCKpZnFI6k_IULpVtI-XiFrL_2sc8p9FK_W-7oHTdWNBlpI18B71.jpg?r=221', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABbz0IhHbae_eEyf4mT_pnYwO2NPJcA_uQDTM8hod8I_pU7AFp96TY5HmNKLwDI1S9nQCHK-msYJ1MlrPxiwwBcM_53gv39Imd-Bm_TokUAjPSY-uYKvdeOvfrG88u1GuD1R-.jpg?r=eac', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABVjjBfZfN899XB71sZDqzXzMRZjfeNhfUTMVUYGXQd8bEeLhg1vH7BZMAfglYYGyf_yGoZgCGb8dswsBbxBcJtj0IPnIsCRt1DRSc41Sli1vD1rR7YZ9bWwOMY3eTkL7xEDG.jpg?r=b33', 'https://occ-0-4344-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABX4dfCjmqQlyajE5r0sdyieV86hyjUYFmYUkjK5uPbcIMIMDJLOpZXbU7sENcySHLQx8eESNeTyIbgWfZUdbi2dBDDzXLwN9T3_G.jpg?r=5c9', 'https://occ-0-4344-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABR9G_JTaBG_aX6slElFOB7or3h5RF8u5Fqv53BAsTwVwVFKrkKHX5xZtpC9NBgEH4BUtgoF78ZuwLrIUsEusoJFOCSxsiSFheXNm.jpg?r=ac5', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABayhG1uUQCbZGE94Blth-OkeIXWypV_A1jJxbB0Nq_U_LdsNKyCkgm6HG5MYq2IaWeLISFuEXCdlEl2V7pWUxpGZMmZgfa_1qzVB2xYFYmc9qX7T0gYLC3uNz_T4Jh0j6R3H.jpg?r=e44', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABRTCPqXpci3utWBdjhChlGhxuk346g-R6O0oOIrEAHWgKTM6Jhfhptdg8EAoB9QU41fJcAh1Nr8FDn5wggXbKnsimIJVg2VGeZxMGD-FqVpnLZDKKtaBYr-WWFguQZk_5KNd.jpg?r=3a5', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABUQy1Imjj9G7L0VuUcz_nYDMlm6gqNZ4-6Ukolm2_IFph0YY3hlz95Mhfl3nKRv9FtLEi0_tpw8ZtGJ5UMN9b9muIHrk1zYI6CdLSGWUm2pOCwAkTByXuje-XzRxp7Gwx6kc.jpg?r=a7a', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABdQ38eP8Osmwcn0WxiPcDjDXLksBHVhUnZTJTnUYNAbxqNZMz5uVxHsSNJVnAVFvA2MeWbqnMOveluDVt7DBHL9dUCnd90f18UaOINDCG7W_tOI1WOVTeILv5nugxXGGS39z.jpg?r=aca'],
            contentTitle: ['One Piece', 'Wednesday', 'Our Planet', 'Money Heist', 'Dark', 'The Gray Man', '1899', 'Jamtara - Sabka Number Ayega', 'Extraction', 'Khakee - The Bihar Chapter', 'Don', 'Don 2', 'Drive', 'Extraction 2', 'Red Notice', 'Guns & Gulaabs'],
            contentType: ['series', 'series', 'series', 'series', 'series', 'movies', 'series', 'series', 'movies', 'series', 'movies', 'movies', 'movies', 'movies', 'movies', 'series'],
            contentLink: ['/onlyonnetflix/series', '/onlyonnetflix/series', '/onlyonnetflix/series', '/onlyonnetflix/series', '/onlyonnetflix/series', '/onlyonnetflix/movie', '/onlyonnetflix/series', '/onlyonnetflix/series', '/onlyonnetflix/movie', '/onlyonnetflix/series', '/onlyonnetflix/movie', '/onlyonnetflix/movie', '/onlyonnetflix/movie', '/onlyonnetflix/movie', '/onlyonnetflix/movie', '/onlyonnetflix/series'],
            contentLinkName: ['onepiece', 'wednesday', 'ourplanet', 'moneyheist', 'dark', 'thegrayman', '1899', 'jamtara', 'extraction', 'khakeethebiharchapter', 'don', 'don2', 'drive', 'extraction2', 'rednotice', 'guns&gulaabs'],
        }
    ]

    const actionAdventureContents = [
        {
            contentImg: ['https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABdQ38eP8Osmwcn0WxiPcDjDXLksBHVhUnZTJTnUYNAbxqNZMz5uVxHsSNJVnAVFvA2MeWbqnMOveluDVt7DBHL9dUCnd90f18UaOINDCG7W_tOI1WOVTeILv5nugxXGGS39z.jpg?r=aca', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABXKFNO0_GERe_ILuMmmCsc5lhNe0ifUGto67PA9sot7kCCGC0EPwLWCirUj6leZei9WK9fBonAI96qlk-VfeW3NE02bCVgjtd38UoZIjKKVEk8EBNKO0yJYakhIS5wFVvpiw.jpg?r=841', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABZCulBDOkneF3RJouRk0n4tThLEIdh1fDn6adyo1u_UagkVUP0r2B_jw6w1sdkjnlWYUKHZ6_3PH_ovttNhaS1xBuVOmNDpJn6-uUMymUSvKfNnit89eZTbCzBFevWrwQb0y.jpg?r=257', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABbWeuHshVh6x9nCg0T8TeBMB0gw0L2LVt-YSCDkQ9JkfeKP6Lt9969MeHFy1Ydm7obZOjaUED2BAsOa4wCKpZnFI6k_IULpVtI-XiFrL_2sc8p9FK_W-7oHTdWNBlpI18B71.jpg?r=221', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABUm0kq-hgAoJYUIL_uZv0UH992lx_BScPg_3t3-nEofhLXgYS5weaeJiacTGN_j91oAaAFP2ei8FYSEbeznozZN6vV_0sB2txByyR3pfIMFnq9mTp-Rn-FY2pAAJtYzoop_i.jpg?r=807', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABbz0IhHbae_eEyf4mT_pnYwO2NPJcA_uQDTM8hod8I_pU7AFp96TY5HmNKLwDI1S9nQCHK-msYJ1MlrPxiwwBcM_53gv39Imd-Bm_TokUAjPSY-uYKvdeOvfrG88u1GuD1R-.jpg?r=eac', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABVjjBfZfN899XB71sZDqzXzMRZjfeNhfUTMVUYGXQd8bEeLhg1vH7BZMAfglYYGyf_yGoZgCGb8dswsBbxBcJtj0IPnIsCRt1DRSc41Sli1vD1rR7YZ9bWwOMY3eTkL7xEDG.jpg?r=b33', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABTVWwGF4TVyF3-z6YvjdAtqVup5oKHTlK-QRmQYrEz_HX_qI3ZGRiSAFOXAIqcmLpu2B8TQWteMdILB6Zl3VaLLtHWXUHsE_vmXgufINoqYJjuLDrUcV_JwjJJ-3O8gURiyp.jpg?r=4d2', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABeCZHngrzPm5ubs1wnpgLJEE9wa20q1hUaP-NsKJVgDPpa76_EI2kwvsYQ8vP-KkhPXfWUAzYCNGel6CdnGMU6peqr89zZZtGiEF26gV0sXwzz-F2mxMeww2XFgN3IwEkUff.jpg?r=6ab', 'https://occ-0-4344-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABX4dfCjmqQlyajE5r0sdyieV86hyjUYFmYUkjK5uPbcIMIMDJLOpZXbU7sENcySHLQx8eESNeTyIbgWfZUdbi2dBDDzXLwN9T3_G.jpg?r=5c9', 'https://occ-0-4344-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABR9G_JTaBG_aX6slElFOB7or3h5RF8u5Fqv53BAsTwVwVFKrkKHX5xZtpC9NBgEH4BUtgoF78ZuwLrIUsEusoJFOCSxsiSFheXNm.jpg?r=ac5', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABayhG1uUQCbZGE94Blth-OkeIXWypV_A1jJxbB0Nq_U_LdsNKyCkgm6HG5MYq2IaWeLISFuEXCdlEl2V7pWUxpGZMmZgfa_1qzVB2xYFYmc9qX7T0gYLC3uNz_T4Jh0j6R3H.jpg?r=e44', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABRTCPqXpci3utWBdjhChlGhxuk346g-R6O0oOIrEAHWgKTM6Jhfhptdg8EAoB9QU41fJcAh1Nr8FDn5wggXbKnsimIJVg2VGeZxMGD-FqVpnLZDKKtaBYr-WWFguQZk_5KNd.jpg?r=3a5', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABUQy1Imjj9G7L0VuUcz_nYDMlm6gqNZ4-6Ukolm2_IFph0YY3hlz95Mhfl3nKRv9FtLEi0_tpw8ZtGJ5UMN9b9muIHrk1zYI6CdLSGWUm2pOCwAkTByXuje-XzRxp7Gwx6kc.jpg?r=a7a', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABRY1_HPoM-hyTyKairetWEGkbDHmTGDT08EF-kJzmCIpfWIn_m5go583ybQbS-JufXK7wlN9Y9NhqOcfPy2gdgzt-RRs8blIweT2wQG8cB-8QvLVQ0m0T-uriWGPSj4OcUM6.jpg?r=a9c', 'https://occ-0-2461-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABdf2SJtglKZ5boseg8-x4HWFhBlxEpG8alnizl4m9PPEridKP4mAkKHTnb9apWu5oE-73HrHvDhrcZaoFl1tL1kIXE7GkHDexT2QQvQDA57_PXCZbnl3TMrzr6FcUbe2YXse.jpg?r=d31'],
            contentTitle: ['Guns & Gulaabs', 'The Gray Man', '1899', 'Jamtara - Sabka Number Ayega', 'Money Heist', 'Extraction', 'Khakee - The Bihar Chapter', 'Wednesday', 'One Piece', 'Don', 'Don 2', 'Drive', 'Extraction 2', 'Red Notice', 'Our Planet', 'Dark'],
            contentType: ['series', 'movies', 'series', 'series', 'series', 'movies', 'series', 'series', 'series', 'movies', 'movies', 'movies', 'movies', 'movies', 'series', 'series'],
            contentLink: ['/onlyonnetflix/series', '/onlyonnetflix/movie', '/onlyonnetflix/series', '/onlyonnetflix/series', '/onlyonnetflix/series', '/onlyonnetflix/movie', '/onlyonnetflix/series', '/onlyonnetflix/series', '/onlyonnetflix/series', '/onlyonnetflix/movie', '/onlyonnetflix/movie', '/onlyonnetflix/movie', '/onlyonnetflix/movie', '/onlyonnetflix/movie', '/onlyonnetflix/series', '/onlyonnetflix/series'],
            contentLinkName: ['guns&gulaabs', 'thegrayman', '1899', 'jamtara', 'moneyheist', 'extraction', 'khakeethebiharchapter', 'wednesday', 'onepiece', 'don', 'don2', 'drive', 'extraction2', 'rednotice', 'ourplanet', 'dark'],
        }
    ]



    const fetchData = async () => {
        try {
            const response = await axios.get(`https://netflixcloneserver-1g07.onrender.com/userList/${email}`);
            const data = response.data;

            const userContentList = [{
                contentImg: data.map((item) => item.contentImg),
                contentTitle: data.map((item) => item.contentTitle),
                contentType: data.map((item) => item.contentType),
                contentLink: data.map((item) => item.contentLink),
                contentLinkName: data.map((item) => item.contentLinkName),
            }]
            // console.log(userContentList);
            setUserList(userContentList)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        try {
            const response = await axios.get(`https://netflixcloneserver-1g07.onrender.com/userHistory/${email}`);
            const data = response.data;

            const userHistoryList = [{
                contentImg: data.map((item) => item.contentImg),
                contentTitle: data.map((item) => item.contentTitle),
                contentType: data.map((item) => item.contentType),
                contentLink: data.map((item) => item.contentLink),
                contentLinkName: data.map((item) => item.contentLinkName),
            }]
            // console.log(userHistoryList);
            setUserHistory(userHistoryList)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        // console.log(myListUpdation)
        if (email.length !== 0) {
            fetchData();
        }
    }, [email, myListUpdation]);

    const homeRef = useRef(null);

    useEffect(() => {
        if (showMore === true) {
            homeRef.current.style.height = '100vh';
            homeRef.current.style.overflow = 'hidden';
        }
        else if (showMore === false) {
            homeRef.current.style.height = '';
            homeRef.current.style.overflow = '';
        }
    }, [showMore])

    const navbarHomeRef = useRef(null);
    const navbarMovieRef = useRef(null);
    const navbarTVShowRef = useRef(null);
    const navbarMyListRef = useRef(null);
    const navbarHistoryRef = useRef(null);
    const navbarAccountRef = useRef(null);


    useEffect(() => {
        if (navbar === 'home') {
            navbarHomeRef.current.style.color = 'white'
            navbarHomeRef.current.style.fontWeight = '700'
            navbarMovieRef.current.style.color = '#a1a1a1'
            navbarMovieRef.current.style.fontWeight = '500'
            navbarTVShowRef.current.style.color = '#a1a1a1'
            navbarTVShowRef.current.style.fontWeight = '500'
            navbarMyListRef.current.style.color = '#a1a1a1'
            navbarMyListRef.current.style.fontWeight = '500'
            navbarHistoryRef.current.style.color = '#a1a1a1'
            navbarHistoryRef.current.style.fontWeight = '500'
            navbarAccountRef.current.style.border = 'none';

        }
        else if (navbar === 'movie') {
            navbarHomeRef.current.style.color = '#a1a1a1'
            navbarHomeRef.current.style.fontWeight = '500'
            navbarMovieRef.current.style.color = 'white'
            navbarMovieRef.current.style.fontWeight = '700'
            navbarTVShowRef.current.style.color = '#a1a1a1'
            navbarTVShowRef.current.style.fontWeight = '500'
            navbarMyListRef.current.style.color = '#a1a1a1'
            navbarMyListRef.current.style.fontWeight = '500'
            navbarHistoryRef.current.style.color = '#a1a1a1'
            navbarHistoryRef.current.style.fontWeight = '500'
            navbarAccountRef.current.style.border = 'none';

        }
        else if (navbar === 'tvshow') {
            navbarHomeRef.current.style.color = '#a1a1a1'
            navbarHomeRef.current.style.fontWeight = '500'
            navbarMovieRef.current.style.color = '#a1a1a1'
            navbarMovieRef.current.style.fontWeight = '500'
            navbarTVShowRef.current.style.color = 'white'
            navbarTVShowRef.current.style.fontWeight = '700'
            navbarMyListRef.current.style.color = '#a1a1a1'
            navbarMyListRef.current.style.fontWeight = '500'
            navbarHistoryRef.current.style.color = '#a1a1a1'
            navbarHistoryRef.current.style.fontWeight = '500'
            navbarAccountRef.current.style.border = 'none';

        }
        else if (navbar === 'mylist') {
            navbarHomeRef.current.style.color = '#a1a1a1'
            navbarHomeRef.current.style.fontWeight = '500'
            navbarMovieRef.current.style.color = '#a1a1a1'
            navbarMovieRef.current.style.fontWeight = '500'
            navbarTVShowRef.current.style.color = '#a1a1a1'
            navbarTVShowRef.current.style.fontWeight = '500'
            navbarMyListRef.current.style.color = 'white'
            navbarMyListRef.current.style.fontWeight = '700'
            navbarHistoryRef.current.style.color = '#a1a1a1'
            navbarHistoryRef.current.style.fontWeight = '500'
            navbarAccountRef.current.style.border = 'none';
        }
        else if (navbar === 'account') {
            navbarHomeRef.current.style.color = '#a1a1a1'
            navbarHomeRef.current.style.fontWeight = '500'
            navbarMovieRef.current.style.color = '#a1a1a1'
            navbarMovieRef.current.style.fontWeight = '500'
            navbarTVShowRef.current.style.color = '#a1a1a1'
            navbarTVShowRef.current.style.fontWeight = '500'
            navbarMyListRef.current.style.color = '#a1a1a1'
            navbarMyListRef.current.style.fontWeight = '500'
            navbarHistoryRef.current.style.color = '#a1a1a1'
            navbarHistoryRef.current.style.fontWeight = '500'
            navbarAccountRef.current.style.border = '2px solid white';
        }
        else if (navbar === 'history') {
            navbarHomeRef.current.style.color = '#a1a1a1'
            navbarHomeRef.current.style.fontWeight = '500'
            navbarMovieRef.current.style.color = '#a1a1a1'
            navbarMovieRef.current.style.fontWeight = '500'
            navbarTVShowRef.current.style.color = '#a1a1a1'
            navbarTVShowRef.current.style.fontWeight = '500'
            navbarMyListRef.current.style.color = '#a1a1a1'
            navbarMyListRef.current.style.fontWeight = '500'
            navbarHistoryRef.current.style.color = 'white'
            navbarHistoryRef.current.style.fontWeight = '700'
            navbarAccountRef.current.style.border = 'none';
        }
        else if (navbar === 'search') {
            navbarHomeRef.current.style.color = '#a1a1a1'
            navbarHomeRef.current.style.fontWeight = '500'
            navbarMovieRef.current.style.color = '#a1a1a1'
            navbarMovieRef.current.style.fontWeight = '500'
            navbarTVShowRef.current.style.color = '#a1a1a1'
            navbarTVShowRef.current.style.fontWeight = '500'
            navbarMyListRef.current.style.color = '#a1a1a1'
            navbarMyListRef.current.style.fontWeight = '500'
            navbarHistoryRef.current.style.color = '#a1a1a1'
            navbarHistoryRef.current.style.fontWeight = '500'
            navbarAccountRef.current.style.border = 'none';
        }
    }, [navbar])

    const handleNavbar = (value) => {
        setNavbar(value);
    }

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);



    useEffect(() => {
        const handleSearch = async () => {
            try {
                if (searchTerm.trim().length === 0) {
                    console.log(searchTerm.trim().length);
                    setUserSearchList(null);
                    setNavbar('home')
                } else if (searchTerm.trim().length > 0) {
                    console.log(searchTerm.trim().length);
                    const response = await axios.post('https://netflixcloneserver-1g07.onrender.com/content/search', { searchTerm });
                    const data = response.data.results;
                    const SearchList = [{
                        contentImg: data.map((item) => item.contentImg),
                        contentTitle: data.map((item) => item.contentTitle),
                        contentType: data.map((item) => item.contentType),
                        contentLink: data.map((item) => item.contentLink),
                        contentLinkName: data.map((item) => item.contentLinkName),
                    }]

                    setUserSearchList(SearchList)
                    setSearchResults(response.data.results);
                }
            } catch (error) {
                console.error('Error during search:', error);
            }
        };

        handleSearch();
        if (searchTerm === '') {
            setSearchResults([])
            setUserSearchList(null)
        }
        return () => {

        };
    }, [searchTerm]);


    return (
        <div ref={homeRef} style={{ backgroundColor: '#141414' }}>

            <div id='home-header'>
                <div id='home-header-navbar'>
                    <Link to='/home'><img src={netflixlogo} alt='Netflix Home' title='Netflix Home' height={120} width={120}></img></Link>
                    <p ref={navbarHomeRef} onClick={() => handleNavbar('home')}>Home</p>
                    <p ref={navbarMovieRef} onClick={() => handleNavbar('movie')}>Movies</p>
                    <p ref={navbarTVShowRef} onClick={() => handleNavbar('tvshow')}>TV Shows</p>
                    <p ref={navbarMyListRef} onClick={() => handleNavbar('mylist')}>My List</p>
                    <p ref={navbarHistoryRef} onClick={() => handleNavbar('history')}>History</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '20%', backgroundColor: 'black', border: '1px solid white', borderRadius: '4px', padding: '1px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
                        <path stroke='white' fill='white' d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
                    </svg>
                    <input
                        type="text"
                        placeholder="Search Titles..."
                        value={searchTerm}
                        style={{ width: '100%', fontSize: '16px', backgroundColor: 'black', color: 'white', fontFamily: 'NetflixSansLite', padding: '10px', border: 'none' }}
                        onChange={(e) => { setSearchTerm(e.target.value); setNavbar('search') }}
                    />
                </div>
                <div id='home-header-account-icon'>

                    <img ref={navbarAccountRef} onClick={() => handleNavbar('account')} src='https://occ-0-4344-2186.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABY20DrC9-11ewwAs6nfEgb1vrORxRPP9IGmlW1WtKuaLIz8VxCx5NryzDK3_ez064IsBGdXjVUT59G5IRuFdqZlCJCneepU.png?r=229' alt='Your Account' title='Your Account'></img>
                    <Link to="/signout" id="sign">Sign Out</Link>

                </div>
            </div>
            {navbar === 'home' &&
                <div style={{ position: 'relative', bottom: '122px' }}>
                    <div id='home-background'>
                        <video ref={videoRef} src={'https://github.com/PratikGangle/Netflix-video/raw/main/one_piece.mp4'} autoPlay muted>
                        </video>


                        <div id='home-main'>
                            <div id='home-main-content'>
                                <div id='home-main-content-info-div'>
                                    <img title="One Piece" ref={titleImgRef} src="https://occ-0-2461-2164.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABTFy_br4YKzY3Qn6eY70xB-vJTOIkCcROFycIyyM5RprbOFhuYrDpZ5EziINP6No1mGbPqSLsERf4RyWZhLFxPN0MfkJ_FopWRfHn4J8oXfzSWPecdP-wpcQaR-ff5Z8XqoyvUfLpMZvOt--m16_jCHZdRDPx94xOdQSphU8MXE941xn33v5pw.png?r=b2a" alt="One Piece" />
                                    <section ref={titleContentRef} >
                                        <p>
                                            With his straw hat and ragtag crew, young pirate Monkey D. Luffy goes on an epic voyage for treasure in this live-action adaptation of the popular manga.
                                        </p>
                                    </section>
                                </div>
                            </div>
                            <div id='home-main-content-controls' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '90%', flexWrap: 'wrap', alignItems: 'center', marginLeft: '50px' }}>

                                <div id='home-main-content-controls-play' style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '270px' }}>
                                    <div onClick={playContent} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', border: 'none', height: '50px', borderRadius: '4px', padding: '0px 25px', backgroundColor: 'white' }}>
                                        <svg height={"20px"} width={"20px"}>
                                            <polygon points="0,0 0,20 15,10" fill="black" strokeWidth="1" stroke="black"></polygon>
                                        </svg>
                                        <p style={{ fontFamily: 'NetflixSans', color: 'black', fontSize: '18px' }}>Play</p>
                                    </div>
                                    <div onClick={showMoreInfo} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', border: 'none', height: '50px', borderRadius: '4px', backgroundColor: 'rgb(161,161,161,0.8)', padding: '0px 25px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid white', textAlign: 'center', color: 'white', fontFamily: 'NetflixSansLite', fontSize: '15px', borderRadius: '50%', padding: '2px 10px' }}>
                                            i
                                        </div>
                                        <p style={{ fontFamily: 'NetflixSans', color: 'white', fontSize: '18px' }}>&nbsp;More Info</p>
                                    </div>
                                </div>

                                <div id='home-main-content-volume-controls'>
                                    <button ref={volumeControlRef} onClick={volumeControl} id='volume-control-button'>
                                        <svg height={30} width={40} ref={unmuteRef} id='unmute-svg'>
                                            <line x1="5" y1="10" x2="5" y2="20" stroke='#a1a1a1' strokeWidth='2' ></line>
                                            <line x1="5" y1="10" x2="13" y2="10" stroke='#a1a1a1' strokeWidth='2' ></line>
                                            <line x1="5" y1="20" x2="13" y2="20" stroke='#a1a1a1' strokeWidth='2' ></line>
                                            <line x1="13" y1="10" x2="20" y2="5" stroke='#a1a1a1' strokeWidth='2' ></line>
                                            <line x1="13" y1="20" x2="20" y2="25" stroke='#a1a1a1' strokeWidth='2' ></line>
                                            <line x1="20" y1="5" x2="20" y2="25" stroke='#a1a1a1' strokeWidth='2' ></line>
                                            <path d="M 25 10 A 40 40 0 0 1 25 20" fill="none" stroke="#a1a1a1" strokeWidth={2} />
                                            <path d="M 30 5 A 30 30 0 0 1 30 25" fill="none" stroke="#a1a1a1" strokeWidth={2} />
                                        </svg>
                                        <svg height={30} width={40} ref={muteRef} id='mute-svg'>
                                            <line x1="5" y1="10" x2="5" y2="20" stroke='#a1a1a1' strokeWidth='2' ></line>
                                            <line x1="5" y1="10" x2="13" y2="10" stroke='#a1a1a1' strokeWidth='2' ></line>
                                            <line x1="5" y1="20" x2="13" y2="20" stroke='#a1a1a1' strokeWidth='2' ></line>
                                            <line x1="13" y1="10" x2="20" y2="5" stroke='#a1a1a1' strokeWidth='2' ></line>
                                            <line x1="13" y1="20" x2="20" y2="25" stroke='#a1a1a1' strokeWidth='2' ></line>
                                            <line x1="20" y1="5" x2="20" y2="25" stroke='#a1a1a1' strokeWidth='2' ></line>
                                            <line x1="25" y1="10" x2="35" y2="20" stroke='#a1a1a1' strokeWidth='2' ></line>
                                            <line x1="25" y1="20" x2="35" y2="10" stroke='#a1a1a1' strokeWidth='2' ></line>
                                        </svg>
                                        <svg ref={replayRef} fill="#a1a1a1" height="30px" width="40px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 367.136 367.136" space="preserve" transform="rotate(270)matrix(1, 0, 0, -1, 0, 0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M336.554,86.871c-11.975-18.584-27.145-34.707-44.706-47.731L330.801,0H217.436v113.91L270.4,60.691 c40.142,28.131,65.042,74.724,65.042,124.571c0,83.744-68.13,151.874-151.874,151.874S31.694,269.005,31.694,185.262 c0-58.641,32.781-111.009,85.551-136.669l-13.119-26.979C73.885,36.318,48.315,59.1,30.182,87.494 c-18.637,29.184-28.488,62.991-28.488,97.768c0,100.286,81.588,181.874,181.874,181.874s181.874-81.588,181.874-181.874 C365.442,150.223,355.453,116.201,336.554,86.871z"></path> </g></svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div id='home-trending'>
                        <h3>Trending</h3>
                        <HomeXComponent contents={USTVContents}></HomeXComponent>
                    </div>
                    <div id="home-popular-title">
                        <h3>Popular on Netflix</h3>
                        <HomeXComponent contents={pouplarContents} ></HomeXComponent>
                    </div>
                    <div id="home-made-in-india">
                        <h3>Made in India</h3>
                        <HomeXComponent contents={IndiaContents} ></HomeXComponent>
                    </div>
                    <div id="home-action-movies">
                        <h3>Action Movies</h3>
                        <HomeXComponent contents={actionContents} ></HomeXComponent>
                    </div >
                    <div id="home-us-tv-shows">
                        <h3>US TV Shows</h3>
                        <HomeXComponent contents={USTVContents} ></HomeXComponent>
                    </div>
                    <div id="home-action-adventure-movies">
                        <h3>Action & Adventure Movies</h3>
                        <HomeXComponent contents={actionAdventureContents} ></HomeXComponent>
                    </div>
                    <br></br>
                </div>}
            {navbar === 'tvshow' &&
                <HomeTVShowsComponent contents={pouplarContents}></HomeTVShowsComponent>
            }
            {navbar === 'movie' &&
                <HomeMovieComponent contents={actionContents}></HomeMovieComponent>
            }
            {navbar === 'mylist' &&
                (userList !== null &&
                    <HomeMyListComponent contents={userList}></HomeMyListComponent>
                )
            }
            {
                navbar === 'history' &&
                (userHistory !== null &&
                    <HomeHistoryComponent contents={userHistory}></HomeHistoryComponent>
                )
            }
            {
                navbar === 'account' &&
                <HomeAccount></HomeAccount>
            }
            {
                navbar === 'search' &&
                (
                    userSearchList !== null &&
                    <HomeSearchComponent contents={userSearchList}></HomeSearchComponent>
                )
            }




            {
                contentType === 'series' &&
                (showMore === true &&

                    <div style={{ position: 'fixed', top: '0', left: '0', height: '100% ', width: '100% ', backgroundColor: 'rgb(0, 0, 0, 0.7)', zIndex: '100' }}>
                        {!loading &&
                            <div style={{
                                width: '100%',
                                height: '100%',
                                overflowY: 'auto',
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                {
                                    content.length === 3 &&
                                    <HomeSeasonXComponent series={content[0][Object.keys(content[0])]} seasons={content[1][Object.keys(content[1])]} moreDetails={content[2][Object.keys(content[2])]}></HomeSeasonXComponent>
                                }
                            </div>
                        }
                    </div>
                )
            }
            {
                contentType === 'movies' &&
                (showMore === true &&

                    <div style={{ position: 'fixed', top: '0', left: '0', height: '100% ', width: '100% ', backgroundColor: 'rgb(0, 0, 0, 0.7)', zIndex: '100' }}>
                        {!loading &&
                            <div style={{
                                width: '100%',
                                height: '100%',
                                overflowY: 'auto',
                                display: 'flex',
                                justifyContent: 'center'
                            }}>

                                <HomeMovieXComponent series={content[0][Object.keys(content[0])]} moreDetails={content[1][Object.keys(content[1])]}></HomeMovieXComponent>

                            </div>
                        }
                    </div>
                )
            }


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
            {videoSrc !== null &&
                (
                    <div id='home-content-video-player'>
                        <video src={videoSrc} controls autoPlay ></video>
                        <div id='home-content-video-title'>
                            <svg height={30} width={30} onClick={closeVideo}>
                                <line x1={4} y1={15} x2={14} y2={5} stroke='white' strokeWidth={3}></line>
                                <line x1={4} y1={15} x2={14} y2={25} stroke='white' strokeWidth={3}></line>
                                <line x1={4} y1={15} x2={29} y2={15} stroke='white' strokeWidth={3}></line>
                            </svg>
                            <p style={{ color: 'white', fontFamily: 'NetflixSans', fontSize: '20px' }}> <span style={{ color: 'rgb(229,9,20)', fontSize: '25px', fontWeight: 'bolder' }}> | </span> {videoTitle}</p>
                        </div>
                    </div>
                )
            }
            {planExpired &&
                <div id='home-plan-expired'>
                    <div id='plan-expired'>
                        <h2 style={{ color: 'white', fontFamily: 'NetflixSans' }}>Your subscription plan has expired. To continue using our services, please renew your subscription.
                        </h2>
                        <Link to='/' >Sign In</Link>
                    </div>
                </div>
            }
        </div >
    )
}

export default Home;






