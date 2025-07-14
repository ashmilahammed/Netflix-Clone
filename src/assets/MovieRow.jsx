import React from 'react';
import '../styles/MovieRow.css';

function MovieRow({ title, movies, onMovieClick, showNumbers = false }) {
  return (
    <div className="movie-row">
      <h2 className="row-title">{title}</h2>
      <div className="row-posters">
        {movies.map((movie, index) => (
          <div key={movie.id} className="movie-item" onClick={() => onMovieClick(movie)}>
            {showNumbers && (
              <div className="movie-number">
                {index + 1}
              </div>
            )}
            <img
              className="row-poster"
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title || movie.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieRow;