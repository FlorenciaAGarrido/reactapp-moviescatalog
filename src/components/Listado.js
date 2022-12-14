import { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import swAlert from '@sweetalert/with-react';

function Listado (props) {
    let token = sessionStorage.getItem('token');

    const [ moviesList, setMoviesList ] = useState([])

    useEffect(() => {
        const endPoint = 'https://api.themoviedb.org/3/discover/movie?api_key=544312123493d5b24c13b7003bb4b594&language=es-ES&page=1'
        axios.get(endPoint)
            .then(response => {
                const apiData = response.data;
                setMoviesList(apiData.results);
            })
            .catch(error => {
                swAlert(<h2>Hubo errores, intenta mas tarde.</h2>)
            })
    }, [setMoviesList]);

    return (
        <>
            { !token && <Redirect to="/" />  }
            <div className='row'>
                {/* Estructura base */}
                {
                    moviesList.map((oneMovie, indx) => {
                        return (
                            <div className='col-3' key={indx}>
                    <div className="card">
                        <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="..." />
                        <button 
                        className='favourite-btn'
                        onClick={props.addOrRemoveFromFavs}
                        data-movie-id={oneMovie.id}
                        >🖤</button>
                        <div className="card-body">
                            <h5 className="card-title">{oneMovie.title.substring(0, 30) }...</h5>
                            <p className="card-text">{oneMovie.overview.substring(0, 100) }...</p>
                        <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-primary">Vie detail</Link>
                        </div>
                    </div>
                </div>
                        )
                    })
                }
            </div>
        </>
    )
} 

export default Listado