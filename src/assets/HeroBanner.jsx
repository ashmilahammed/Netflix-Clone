
import '../styles/HeroBanner.css';

import Navbar from './Navbar';
import MovieRow from './MovieRow';




const TMBD_API_KEY = '0d00d8441e85b1211c86a60f3bbc2f2c'
function HeroBanner({ bannerMovie }) {
  return (
    <div
      className="hero-banner"
      style={{
        backgroundImage: bannerMovie
          ? `url(https://image.tmdb.org/t/p/original${bannerMovie.backdrop_path})`
          : 'none',
      }}
    >
      <Navbar />
      {bannerMovie && (
        <div className="hero-content">
          <h1 className="hero-title">{bannerMovie.title || bannerMovie.name}</h1>
          <p className="hero-description">{bannerMovie.overview}</p>
        </div>
      )}
      <div className="hero-fadeBottom" />
    </div>
  );
}

export default HeroBanner;

