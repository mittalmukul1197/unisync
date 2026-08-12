import React from 'react';
import { createRoot } from 'react-dom/client';
import './landinglogin.css';
import log from './assets/logo.png';
import aplh from './assets/stylishname(1).png';

const card = (
  <div className='logincard'>
    <div>
      <img src={log} alt="Logo" />
    </div>
    <div className='form'>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="" id="email" placeholder='Enter your mail' />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="" id="password" placeholder='Enter your Password' />
      </div>
    </div>
  </div>
);

createRoot(document.getElementById('root')).render(card);




