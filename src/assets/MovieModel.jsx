import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/MovieModel.css';

const TMDB_API_KEY = '0d00d8441e85b1211c86a60f3bbc2f2c';

function MovieModal({ movie, isOpen, onClose }) {
  const [trailerKey, setTrailerKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    if (isOpen && movie) {
      fetchMovieData();
    }
  },[isOpen, movie]);

  const fetchMovieData = async () => {
    setLoading(true);
    try {
  
      const mediaType = movie.media_type || (movie.title ? 'movie' : 'tv');
    
      const detailsResponse = await axios.get(
        `https://api.themoviedb.org/3/${mediaType}/${movie.id}?api_key=${TMDB_API_KEY}`
      );
      setMovieDetails(detailsResponse.data);
      console.log(detailsResponse.data)

      // Fetch trailer
      const videosResponse = await axios.get(
        `https://api.themoviedb.org/3/${mediaType}/${movie.id}/videos?api_key=${TMDB_API_KEY}`
      );
      
      const trailer = videosResponse.data.results.find(
        video => video.type === 'Trailer' && video.site === 'YouTube'
      );
      
      if (trailer) {
        setTrailerKey(trailer.key);
      } else {
        setTrailerKey('');
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
    setLoading(false);
  };

  const handleClose = () => {
    setTrailerKey('');
    setMovieDetails(null);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      handleClose();
    }
  };

  if (!isOpen || !movie) return null;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={handleClose}>
          ×
        </button>
        
        <div className="modal-header">
          <h2 className="modal-title">
            {movie.title || movie.name}
          </h2>
        </div>

        {loading ? (
          <div className="modal-loading">Loading trailer...</div>
        ) : (
          <div className="modal-body">
            {trailerKey ? (
              <div className="trailer-container">
                <iframe
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
                  title="Movie Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="no-trailer">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className="modal-image"
                />
                <p>No trailer available for this title</p>
              </div>
            )}
            
            <div className="movie-info">
              <div className="movie-meta">
                {movieDetails && (
                  <>
                    <span className="release-date">
                      {movieDetails.release_date || movieDetails.first_air_date}
                    </span>
                    <span className="rating">
                      ⭐ {movieDetails.vote_average?.toFixed(1)}/10
                    </span>
                    {movieDetails.runtime && (
                      <span className="runtime">{movieDetails.runtime} min</span>
                    )}
                  </>
                )}
              </div>
              
              <p className="movie-overview">
                {movie.overview}
              </p>
              
              {movieDetails?.genres && (
                <div className="genres">
                  {movieDetails.genres.map(genre => (
                    <span key={genre.id} className="genre-tag">
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieModal;