import React from 'react';
import './App.css';
// import FacultyDashboard from './components/academic/FacultyDashboard';
// import Footer from './components/layout/Footer';
import { FacultySidebar } from './components/layout/navbar';
import { StudentHeader } from './components/layout/header';
import { FacultyHeader } from './components/layout/header';
import {StudentSidebar} from './components/layout/navbar';
import Footer from './components/layout/footer';

function App() {
  return (
    <div className="app-wrapper">
<StudentHeader/>
<Footer/> 


   </div>
  );
}


export default App;