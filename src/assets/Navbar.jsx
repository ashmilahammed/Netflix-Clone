import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import '../styles/Navbar.css';
import { auth } from '../firebase';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

 const navigate = useNavigate()
  const handleLogout = async () => {
  try {
    await signOut(auth);
    navigate('/', { replace: true }); 
  } catch (error) {
    console.error('Logout error:', error);
  }
};

  return (
    <header className={`netflix-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="left-section">
          <Link to="/home" className="netflix-logo" >NETFLIX</Link>
          <nav className="nav-links">
            <Link to="/home">Home</Link>
            <Link to="/tv">TV Shows</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/new">New & Popular</Link>
          </nav>
        </div>
        
             <button className='signOut' onClick={handleLogout} style={{width:'80px', height:'30px', backgroundColor:'red',
                 color:'black', display:'flex', justifyContent:'center', alignItems:'center', 
                 position:'absolute', left:'1400px'}}>SignOut</button>

       
      </div>
    </header>
  );
}

export default Navbar;
