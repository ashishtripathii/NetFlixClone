import React, { Suspense, useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {

    const { id } = useParams();
    const navigate = useNavigate();


    const [apiData, setApiData] = useState({
        name: "",
        key: "",
        published_at: "",
        type: ""
    });

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTUxMTAxM2U2NTgzMmIxOWVhY2JhZjM4Y2VmNDcwNiIsIm5iZiI6MTc0MjMxMzUwOC4zODUsInN1YiI6IjY3ZDk5ODI0NWY1OGUzMmY3ZTA4YTZhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w_beyaCHmGDQjms1pad6NqtL534xScv4Jh8TegWPZto'
        }
    };

    // useEffect(() => {
    //     console.log(id);
    //     fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    //         .then(res => res.json())
    //         .then(res => setApiData(res.results[0]))
    //         .catch(err => console.error(err));
    // }, [id])


    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
                    options
                );
                const data = await response.json();

                if (data.results && data.results.length > 0) {
                    setApiData(data.results[0]);
                    console.log(data.results[0]);
                } else {
                    console.warn("No video found for this movie.");
                    setApiData(null);
                }
            } catch (error) {
                console.error("Error fetching video:", error);
            }
        };

        fetchVideo();
    }, [id]);
    return (
        <div className='player'>
            <img src={back_arrow_icon} alt="" onClick={() => { navigate(-1) }} />
            <iframe width="90%" height="90%" src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' style={{ border: "0" }} allowFullScreen></iframe>
            <div className="player-info">
                <p>{apiData.published_at.slice(0, 10)}</p>
                <p>{apiData.name}</p>
                <p>{apiData.type}</p>
            </div>
        </div>
    )
}

export default Player
