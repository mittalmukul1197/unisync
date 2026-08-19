import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './landinglogin.css';
import log from './assets/logowithbg(1).png';
import StudentDashboard from './components/academic/studentdashboard.jsx';
// import FacultyDashboard from './components/academic/facultydashbaord.jsx';
import customealert from './components/layout/errorcustom.jsx';


function LandingLoginApp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [customError, setCustomError] = useState('');
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    try {
      const savedSession = localStorage.getItem('user_session');
      if (savedSession) {
        setUserSession(JSON.parse(savedSession));
      }
      // const savedError = localStorage.getItem('custom_login_error');
      // if (savedError) {
      //   setCustomError(savedError);
      // }
    } catch (e) {
      console.error('Error reading from localStorage', e);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      const errorMsg = 'Please enter both email and password.';
      // setCustomError(errorMsg);
      // localStorage.setItem('custom_login_error', errorMsg);
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
    } else {
      const errorMsg = 'Invalid email or password. Please check your credentials.';
      // setCustomError(errorMsg);
      // localStorage.setItem('custom_login_error', errorMsg);
      customealert(errorMsg, { timeout: true, time: 3500, button: true });
      return;
    }

    try {
      localStorage.setItem('user_session', JSON.stringify(sessionData));
      // localStorage.removeItem('custom_login_error');
    } catch (err) {
      console.error('Error saving session:', err);
    }

    customealert(`Welcome back, ${sessionData.role}! Login Successful.`, {
      timeout: true,
      time: 2500,
      button: false
    });

    // setCustomError('');
    setUserSession(sessionData);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('student_session');
      // localStorage.removeItem('custom_login_error');
    } catch (err) {
      console.error('Error clearing localStorage', err);
    }
    setUserSession(null);
    // setEmail('');
    // setPassword('');
    // setCustomError('');
  };

  if (userSession?.role == 'student') {
    return <StudentDashboard user={userSession} onLogout={handleLogout} />;
  }
  else if (userSession?.role === 'faculty') {
    return <FacultyDashboard user={userSession} onLogout={handleLogout} />
  }

  return (
    <div className='logincard'>
      <div>
        <img src={log} alt="Unisync Logo" />
      </div>

      <form className='form' onSubmit={handleLogin}>


        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder='Enter your mail' value={email} onChange={(e) => {
            setEmail(e.target.value);
            // setCustomError('');
          }}

          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder='Enter your Password' value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              // setCustomError('');
            }}

          />
        </div>

        <button type="submit" className="login-btn">
          Log In
        </button>
      </form>


    </div>
  );


}
createRoot(document.getElementById('root')).render(<LandingLoginApp />);