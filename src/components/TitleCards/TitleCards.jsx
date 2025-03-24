import './TitleCards.css';
import Cards_data from '../../assets/cards/Cards_data'
import cards_data from '../../assets/cards/Cards_data';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';



const TitleCards = ({ title, category }) => {

    const cardsRef = useRef();

    const [apiData, setApiData] = useState([]);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTUxMTAxM2U2NTgzMmIxOWVhY2JhZjM4Y2VmNDcwNiIsIm5iZiI6MTc0MjMxMzUwOC4zODUsInN1YiI6IjY3ZDk5ODI0NWY1OGUzMmY3ZTA4YTZhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w_beyaCHmGDQjms1pad6NqtL534xScv4Jh8TegWPZto'
        }
    };



    const handleWheel = (event) => {
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;
    }

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => setApiData(res.results))
            .catch(err => console.error(err));
        cardsRef.current.addEventListener('wheel', handleWheel);
    }, []);


    return (
        <div className='titlecards'>
            <h2>{title ? title : 'Polular on Netflix'}</h2>
            <div className='card-list' ref={cardsRef}>
                {apiData.map((card, index) => {

                    return <Link to={`/player/${card.id}`} className='card' key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
                        <p>{card.original_title}</p>
                    </Link>
                })}
            </div>
        </div>
    )
}

export default TitleCards
