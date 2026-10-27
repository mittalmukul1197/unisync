import React from 'react';
import './App.css';
import MainRoute from './routes/mainroute';
import { FacultyProvider } from './context/FacultyContext';

function App() {
  return (
    <FacultyProvider>
      <div className="app-wrapper">
        <MainRoute />
      </div>
    </FacultyProvider>
  );
}

export default App;