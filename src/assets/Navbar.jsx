import React, { useState, useEffect, useCallback } from 'react';
import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { auth } from '../firebase';



function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  ///
  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth);
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [navigate]);

  return (
    <header className={`netflix-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="left-section">
          <Link to="/home" className="netflix-logo">NETFLIX</Link>
          <nav className="nav-links">
            <Link to="/home">Home</Link>
            <Link to="/tv">TV Shows</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/new">New & Popular</Link>
          </nav>
        </div>

        <button
          className="signOut"
          onClick={handleLogout}
          style={{
            width: '80px',
            height: '30px',
            backgroundColor: 'red',
            color: 'black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: '1250px',
          }}
        >
          SignOut
        </button>
      </div>
    </header>
  );
}

export default Navbar;
