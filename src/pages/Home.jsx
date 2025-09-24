import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import HeroBanner from '../assets/HeroBanner';
import MovieRow from '../assets/MovieRow';
import MovieModal from '../assets/MovieModel';
import '../styles/HomePage.css';

const TMBD_API_KEY = '0d00d8441e85b1211c86a60f3bbc2f2c';

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [bannerMovie, setBannerMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!TMBD_API_KEY) {
        setError('TMDB API key is missing');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const trendingRes = await axios.get(
          `https://api.themoviedb.org/3/trending/all/week?api_key=${TMBD_API_KEY}`
        );
        const trendingResults = trendingRes.data.results;
        setTrendingMovies(trendingResults);

        const popularRes = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${TMBD_API_KEY}`
        );
        setPopularMovies(popularRes.data.results);

        const topRatedRes = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMBD_API_KEY}`
        );
        setTopRatedMovies(topRatedRes.data.results);

        const randomMovie =
          trendingResults[Math.floor(Math.random() * trendingResults.length)];
        setBannerMovie(randomMovie);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to fetch movies');
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  ////
  const handleMovieClick = useCallback((movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  }, []);

  return (
    <div className="home-page">
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      <HeroBanner bannerMovie={bannerMovie} />

      <div className="movie-rows-container">
        {trendingMovies.length > 0 && (
          <MovieRow
            title="Trending Now"
            movies={trendingMovies}
            onMovieClick={handleMovieClick}
            showNumbers={true}
          />
        )}
        {popularMovies.length > 0 && (
          <MovieRow
            title="Popular on Netflix"
            movies={popularMovies}
            onMovieClick={handleMovieClick}
            showNumbers={false}
          />
        )}
        {topRatedMovies.length > 0 && (
          <MovieRow
            title="Top Rated"
            movies={topRatedMovies}
            onMovieClick={handleMovieClick}
            showNumbers={false}
          />
        )}
      </div>

      {/* Movie Modal */}
      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default Home;
