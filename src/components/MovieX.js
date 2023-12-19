import './MovieX.css'
import { useEffect, useState } from "react";
import MovieXComponent from "./MovieXComponent";
import axios from 'axios';
import { useContext } from 'react';
import { ContentContext } from '../context/contentContext';
import ErrorPage from './ErrorPage';


function SeasonX() {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true);
    const { linkexpo } = useContext(ContentContext);
    const [error, setError] = useState(null);

    useEffect(() => {
        Promise.all([
            axios.get(`https://moviesapi-production-7860.up.railway.app/moviesAPI/${linkexpo}`),
        ])
            .then(([moviesResponse]) => {
                setMovies(moviesResponse.data);
            })
            .catch(error => {
                setError(error);
                console.error('Error:', error);
            }).finally(() => {
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
                <MovieXComponent movies={movies[0][Object.keys(movies[0])]} moreDetails={movies[1][Object.keys(movies[1])]} />
            )}
        </>
    )
}

export default SeasonX;