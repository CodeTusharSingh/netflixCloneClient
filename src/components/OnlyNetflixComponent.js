import { Link } from 'react-router-dom';
import './OnlyNetflixComponent.css'
import { useState, useEffect, useRef, useContext } from 'react';
import { ContentContext } from '../context/contentContext';


function OnlyNetflixComponent({ contents }) {
    const { updateLinkexpo } = useContext(ContentContext);

    let contentImage1Index;
    let contentImage2Index;
    let contentImage3Index;
    let contentImage4Index;
    const [trailerScrollLeftButton, settrailerScrollLeftButton] = useState({
        fontSize: '40px',
        padding: '0px 10px',
        height: '192px',
        border: 'none',
        backgroundColor: '#181818',
        color: 'rgb(229,9,20)',
        zIndex: '-1'
    });

    const [trailerScrollRightButton, settrailerScrollRightButton] = useState({
        fontSize: '40px',
        padding: '0px 10px',
        height: '192px',
        border: 'none',
        backgroundColor: '#181818',
        color: 'rgb(229,9,20)',
        zIndex: '3'
    });

    const containerRef = useRef(null);
    const divRef = useRef(null);

    const handleSlide = (direction) => {
        const container = containerRef.current;
        const divWidth = divRef.current.getBoundingClientRect().width;
        const scrollAmount = divWidth;

        if (direction === 'left') {
            container.scrollTo({
                left: container.scrollLeft - scrollAmount,
                behavior: 'smooth'
            });
        } else if (direction === 'right') {
            container.scrollTo({
                left: container.scrollLeft + scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const [scrollX, setScrollX] = useState(0);
    const [reachedEnd, setReachedEnd] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        const handleScroll = () => {
            if (container) {
                setScrollX(container.scrollLeft);
                const isAtEnd = container.scrollLeft + container.clientWidth === container.scrollWidth;
                setReachedEnd(isAtEnd);
                if (container.scrollLeft === 0) {
                    settrailerScrollLeftButton(prevStyle => {
                        return {
                            ...prevStyle,
                            zIndex: '-1'
                        }
                    });
                } else {
                    settrailerScrollLeftButton(prevStyle => {
                        return {
                            ...prevStyle,
                            zIndex: '3'
                        }
                    });
                }
                if (isAtEnd) {
                    settrailerScrollRightButton(prevStyle => {
                        return {
                            ...prevStyle,
                            zIndex: '-1'
                        }
                    });
                } else {
                    settrailerScrollRightButton(prevStyle => {
                        return {
                            ...prevStyle,
                            zIndex: '3'
                        }
                    });
                }
            }
        };
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [containerRef, reachedEnd, scrollX]);
    const exportLink = (linkValue) => {
        updateLinkexpo(linkValue);
    }
    const contentArray = contents.find((contents) => contents)
    const contentSlider = contentArray.contentImg.map((item, index) => {
        if (contentImage4Index === contentArray.contentImg.length - 1) {
            return null;
        }
        if (index === 0) {
            contentImage1Index = index;
            contentImage2Index = index + 1;
            contentImage3Index = index + 2;
            contentImage4Index = index + 3;
        } else {
            contentImage1Index = contentImage4Index + 1;
            contentImage2Index = contentImage1Index + 1;
            contentImage3Index = contentImage2Index + 1;
            contentImage4Index = contentImage3Index + 1;
        }
        let t1 = contentImage1Index;
        let t2 = contentImage2Index;
        let t3 = contentImage3Index;
        let t4 = contentImage4Index;
        return (
            <div key={index} className='content-container' ref={divRef}>
                <div className='content-name' onClick={() => exportLink(contentArray.contentLinkName[t1])}>
                    <Link to={`${contentArray.contentLink[contentImage1Index]}/${contentArray.contentLinkName[contentImage1Index]}`}>
                        <img src={contentArray.contentImg[contentImage1Index]} alt={contentArray.contentTitle[contentImage1Index]} title={contentArray.contentTitle[contentImage1Index]} height={'169px'} width={'299px'}></img>
                        <figcaption>{contentArray.contentTitle[contentImage1Index]}</figcaption>
                    </Link>
                </div>
                <div className='content-name' onClick={() => exportLink(contentArray.contentLinkName[t2])}>
                    <Link to={`${contentArray.contentLink[contentImage2Index]}/${contentArray.contentLinkName[contentImage2Index]}`}>
                        <img src={contentArray.contentImg[contentImage2Index]} alt={contentArray.contentTitle[contentImage2Index]} title={contentArray.contentTitle[contentImage2Index]} height={'169px'} width={'299px'}></img>
                        <figcaption>{contentArray.contentTitle[contentImage2Index]}</figcaption>
                    </Link>
                </div>
                <div className='content-name' onClick={() => exportLink(contentArray.contentLinkName[t3])}>
                    <Link to={`${contentArray.contentLink[contentImage3Index]}/${contentArray.contentLinkName[contentImage3Index]}`}>
                        <img src={contentArray.contentImg[contentImage3Index]} alt={contentArray.contentTitle[contentImage3Index]} title={contentArray.contentTitle[contentImage3Index]} height={'169px'} width={'299px'}></img>
                        <figcaption>{contentArray.contentTitle[contentImage3Index]}</figcaption>
                    </Link>
                </div>
                <div className='content-name' onClick={() => exportLink(contentArray.contentLinkName[t4])}>
                    <Link to={`${contentArray.contentLink[contentImage4Index]}/${contentArray.contentLinkName[contentImage4Index]}`}>
                        <img src={contentArray.contentImg[contentImage4Index]} alt={contentArray.contentTitle[contentImage4Index]} title={contentArray.contentTitle[contentImage4Index]} height={'169px'} width={'299px'}></img>
                        <figcaption>{contentArray.contentTitle[contentImage4Index]}</figcaption>
                    </Link>
                </div>
            </div >
        )
    }
    );
    return (
        <>
            <div id='content'>
                <div id='content-slider' ref={containerRef}>
                    {contentSlider}
                </div>
                <div id='content-scroll-buttons'>
                    <button onClick={() => handleSlide('left')} style={trailerScrollLeftButton}>&lsaquo;</button>
                    <button onClick={() => handleSlide('right')} style={trailerScrollRightButton}>&rsaquo;</button>
                </div>
            </div>
        </>
    )
}

export default OnlyNetflixComponent;