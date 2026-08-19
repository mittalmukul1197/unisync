import React from 'react';
import './header.css';

function StudentHeader({ title = 'Student Dashboard', user, onLogout, onToggleMobileMenu }) {
  const email = user?.email || 'student@gmail.com';
  const name = email.split('@')[0];

  return (
    <header className="appheader">
      <div className="header-left">
        {onToggleMobileMenu && (
          <button className="mobilebtn" onClick={onToggleMobileMenu} title="Open Navigation Menu">
            ☰
          </button>
        )}
        <h1 className="header-title">{title}</h1>
      </div>
      <div className='header-center'>

        <h2>Explore <span>Your</span> Potential</h2>

      </div>

      <div className="header-right">
        <div className="userbadge">
          <div className="avatar student-avatar">
            {name.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <span className="user-name">{name}</span>
            <span className="user-role">Student • CSE Dept</span>
          </div>
        </div>

        {onLogout && (
          <button className="logoutbtn" onClick={onLogout} title="Logout">
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

function FacultyHeader({ title = 'Faculty Portal', user, onLogout, onToggleMobileMenu }) {
  const email = user?.email || 'faculty@gmail.com';
  const name = email.split('@')[0];

  return (
    <header className="appheader">
      <div className="header-left">
        {onToggleMobileMenu && (
          <button className="mobilebtn" onClick={onToggleMobileMenu} title="Open Navigation Menu">
            ☰
          </button>
        )}
        <h1 className="header-title">{title}</h1>
      </div>

      

      <div className="header-right">
        <div className="header-search">
          <span>🔍</span>
          <input type="text" placeholder="Search students, batches..." />
        </div>

        <div className="userbadge">
          <div className="avatar faculty-avatar">
            {name.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <span className="user-name">{name}</span>
            <span className="user-role">Faculty • CS Dept</span>
          </div>
        </div>

        {onLogout && (
          <button className="logoutbtn" onClick={onLogout} title="Logout">
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

function AdminHeader({ title = 'Admin Control Panel', user, onLogout, onToggleMobileMenu }) {
  const email = user?.email || 'admin@gmail.com';
  const name = email.split('@')[0];

  return (
    <header className="appheader">
      <div className="header-left">
        {onToggleMobileMenu && (
          <button className="mobilebtn" onClick={onToggleMobileMenu} title="Open Navigation Menu">
            ☰
          </button>
        )}
        <h1 className="header-title">{title}</h1>
      </div>

      <div className="header-right">
        <div className="header-search">
          <span>🔍</span>
          <input type="text" placeholder="Search system logs, users..." />
        </div>

        <div className="userbadge">
          <div className="avatar admin-avatar">
            {name.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <span className="user-name">{name}</span>
            <span className="user-role">System Admin</span>
          </div>
        </div>

        {onLogout && (
          <button className="logoutbtn" onClick={onLogout} title="Logout">
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

export default function Header({ role, title, user, onLogout, onToggleMobileMenu }) {
  const activeRole = role || user?.role || 'student';

  if (activeRole === 'faculty') {
    return <FacultyHeader title={title} user={user} onLogout={onLogout} onToggleMobileMenu={onToggleMobileMenu} />;
  }
  if (activeRole === 'admin') {
    return <AdminHeader title={title} user={user} onLogout={onLogout} onToggleMobileMenu={onToggleMobileMenu} />;
  }

  return <StudentHeader title={title} user={user} onLogout={onLogout} onToggleMobileMenu={onToggleMobileMenu} />;
}

export { StudentHeader, FacultyHeader, AdminHeader };
