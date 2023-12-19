import './SeasonX.css'
import { useEffect, useState } from "react";
import SeasonXComponent from "./SeasonXComponent";
import axios from 'axios';
import { useContext } from 'react';
import { ContentContext } from '../context/contentContext';
import ErrorPage from './ErrorPage';

function SeasonX() {
    const [series, setSeries] = useState([])
    const [loading, setLoading] = useState(true);
    const { linkexpo } = useContext(ContentContext);
    const [error, setError] = useState(null);

    useEffect(() => {
        Promise.all([
            axios.get(`https://seriesapi-production.up.railway.app/seriesAPI/${linkexpo}`),
        ])
            .then(([seriesResponse]) => {
                setSeries(seriesResponse.data);
            })
            .catch(error => {
                setError(error);
                console.error('Error:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [linkexpo]);

    if (error) {
        return <ErrorPage />;
    }

    return (
        <>
            {loading ? (
                <div id='loading'>
                    <div id='load-animation'>

                    </div>
                </div>
            ) : (
                <SeasonXComponent series={series[0][Object.keys(series[0])]} seasons={series[1][Object.keys(series[1])]} moreDetails={series[2][Object.keys(series[2])]} />
            )}
        </>
    )
}

export default SeasonX;
