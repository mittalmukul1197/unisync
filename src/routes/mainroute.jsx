import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from './protectedRoute';
import LandingLogin from '../landinglogin';
import StudentDashboard from '../components/academic/studentdashboard';
import FacultyDashboard from '../components/academic/facFacultyDashboard';
import Pagenotfound from './PageNotFound';
import Adminlayout from '../components/academic/admin/Adminlayout';
import AdminInfo from '../components/academic/admin/AdminInfo';
import AdminDashboard from '../components/academic/admin/AdminDashboard';
import AdminBatches from '../components/academic/admin/AdminBatches';
import AdminAttendence from '../components/academic/admin/AdminAttendence';
import AdminPerformance from '../components/academic/admin/AdminPerformance';
import AdminFaculty from '../components/academic/admin/AdminFaculty';
import AdminUpdates from '../components/academic/admin/AdminUpdates';
export default function MainRoute() {


  const [userSession, setUserSession] = useState(() => {
    const savedSession = localStorage.getItem('user_session');
    return savedSession ? JSON.parse(savedSession) : null;

  });

  const handleLogin = (sessionData) => {
    setUserSession(sessionData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user_session');
    setUserSession(null);
  };

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            !userSession ? (
              <LandingLogin onLogin={handleLogin} />
            ) : userSession.role === 'student' ? (
              <Navigate to="/student" />
            ) : userSession.role === 'faculty' ? (
              <Navigate to="/faculty" />
            ) : userSession.role === 'admin' ? (
              <Navigate to="/admin" />
            ) : (
              <LandingLogin onLogin={handleLogin} />
            )
          }
        />

        <Route element={<ProtectedRoute user={userSession} />} >
          <Route
            path="/student"
            element={
              userSession?.role === 'student' ? (
                <StudentDashboard
                  user={userSession}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />


          <Route
            path="/faculty"
            element={
              userSession?.role === 'faculty' ? (
                <FacultyDashboard
                  user={userSession}
                  onLogout={handleLogout}
                />

              ) : (
                <Navigate to="/" />
              )
            }
          >


          </Route>

          <Route
            path="/admin"
            element={
              userSession?.role === 'admin' ? (
                <Adminlayout onLogout={handleLogout} />
              ) : (<Navigate to="/"></Navigate>)
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path='info' element={<AdminInfo />} />
            <Route path='updates' element={<AdminUpdates />} />
            <Route path='attendence' element={<AdminAttendence />} />
            <Route path='faculty' element={<AdminFaculty />} />
            <Route path='batches' element={<AdminBatches />} />
            <Route path='performance' element={<AdminPerformance />} />

            <Route
              path="*"
              element={<Pagenotfound />}
            />


          </Route>




          <Route
            path="*"
            element={<Pagenotfound />}
          />
        </Route>


      </Routes>
    </BrowserRouter>
  );


}
