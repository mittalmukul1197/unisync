import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './landinglogin.css';
import log from './assets/logowithbg(1).png';
import customealert from './components/layout/errorcustom.jsx';
import eyeon from './assets/eyeon.png';
import eyeoff from './assets/eyeoff.png';

export default function LandingLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      const errorMsg = 'Please enter both email and password.';
      customealert(errorMsg, { timeout: true, time: 3000, button: true });
      return;
    }

    let sessionData = null;

    if (
      email.trim() === 'student@gmail.com' &&
      password === 'student'
    ) {
      sessionData = {
        email: email.trim(),
        role: 'student',
      };
    } else if (
      email.trim() === 'faculty@gmail.com' &&
      password === 'faculty'
    ) {
      sessionData = {
        email: email.trim(),
        role: 'faculty',
      };
    } 
    else if(email.trim() === 'admin@gmail.com' &&
      password === 'admin')
      {
        sessionData={
          email: email.trim(),
        role: 'admin',
        };

    }
    else {
      const errorMsg = 'Invalid email or password. Please check your credentials.';
      customealert(errorMsg, { timeout: true, time: 3500, button: true });
      return;
    }

    try {
      localStorage.setItem('user_session', JSON.stringify(sessionData));
    } catch (err) {
      console.error('Error saving session:', err);
    }

    customealert(`Welcome back, ${sessionData.role}! Login Successful.`, {
      timeout: true,
      time: 2500,
      button: false,
    });

    if (onLogin) {
      onLogin(sessionData);
    }

    // Navigate to role-based dashboard route
    if (sessionData.role === 'student') {
      navigate('/student');
    } else if (sessionData.role === 'faculty') {
      navigate('/faculty');
    }
    else if (sessionData.role === 'admin') {
      navigate('/admin');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="logincard">
        <div>
          <img src={log} alt="Unisync Logo" />
        </div>

        <form className="form" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <div className="password-box">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <img src={showPassword ? eyeoff : eyeon} alt="" />
              </button>
            </div>
          </div>

          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}