import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { signup } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      await signup(email, password); 
      navigate('/home', { replace: true });
    } catch (err) {
      console.error(err); 
      const code = err?.code;
      if (code === 'auth/email-already-in-use') {
        setError('This email is already in use.');
      } else if (code === 'auth/invalid-email') {
        setError('Please enter a valid email.');
      } else if (code === 'auth/weak-password') {
        setError('Password is too weak. Use at least 6 characters.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mainAuth">
      <div className='netflix-header'>
        <div className='netflix-logo'>NETFLIX</div>
      </div>

      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSignup}>
          <h2>Sign Up</h2>
          {error && <p className="error">{error}</p>}

          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=" "
            />
            <label className="floating-label">Email or phone number</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=" "
            />
            <label className="floating-label">Password</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder=" "
            />
            <label className="floating-label">Confirm Password</label>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <div className="form-help">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#" className="help-link">Need help?</a>
          </div>

          <p>Already have an account? <a href="/">Sign in now.</a></p>

          <div className="captcha-notice">
            <p>
              This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
              <a href="#">Learn more.</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
