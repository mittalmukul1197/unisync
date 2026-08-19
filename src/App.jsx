import React from 'react';
import './App.css';
// import FacultyDashboard from './components/academic/FacultyDashboard';
// import Footer from './components/layout/Footer';
import { FacultySidebar } from './components/layout/navbar';
import { StudentHeader } from './components/layout/header';
import { FacultyHeader } from './components/layout/header';
import {StudentSidebar} from './components/layout/navbar';
// import Footer from './components/layout/footer';
import { TeacherUpdatesDrawer} from './components/academic/facTeacherUpdates';
import { TeacherUpdatesWidget } from './components/academic/facTeacherUpdates';
import TeacherUpdates  from './components/academic/facTeacherUpdates';

function App() {
  return (
    <div className="app-wrapper">
{/* <StudentHeader/>
<Footer/>  */}
{/* <TeacherUpdatesDrawer isOpen={true}/> */}
{/* <TeacherUpdatesWidget isOpen={true}/> */}


<TeacherUpdates/>

   </div>
  );
}


export default App;