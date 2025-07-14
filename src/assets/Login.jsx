import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [error, seterror] = useState('');
    const [loading, setloading] = useState(false);
    const Navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        seterror('');
        setloading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            Navigate('/home',{ replace: true });
        } catch (err) {
            if (err.code === 'auth/user-not-found') {
                seterror("User not found with this email");
            } else if (err.code === 'auth/wrong-password') {
                seterror("Incorrect password. Please try again");
            } else if (err.code === 'auth/invalid-email') {
                seterror("Please enter a valid email");
            } else {
                seterror("Something went wrong. Please try again");
            }
        } finally {
            setloading(false);
        }
    };

    return (
        <div className='mainAuth'>

       <div className='netflix-login'>
            <div className='netflix-header'>
                <div className='netflix-logo'>NETFLIX</div>
            </div>
            </div>
            
            <div className='netflix-login-container'>
                <form className='netflix-login-form' onSubmit={handleLogin}>
                    <h1>Sign In</h1>
                    {error && <div className="netflix-error">{error}</div>}
                    
                    <div className="netflix-input-container">
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setemail(e.target.value)} 
                            required 
                        />
                        <label>Email or mobile number</label>
                    </div>
                    
                    <div className="netflix-input-container">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            required
                        />
                        <label>Password</label>
                    </div>
                    
                    <button type="submit" disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                    
                    <div className="netflix-help-container">
                        <div className="remember-me">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <a href="#" className="help-link">Need help?</a>
                    </div>
                    
                    <div className="netflix-signup-text">
                        New to Netflix? <a href="/signup">Sign up now.</a>
                    </div>
                    
                    <div className="netflix-captcha">
                      
                        <a href="#"> Learn more.</a>
                    </div>
                </form>
            </div>
        

        </div>
       
    );
}

export default Login;