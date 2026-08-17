import React from 'react';
import log from '../../assets/logowithbg(1).png';
import aplh from '../../assets/stylishname(dark).png';
import './navbar.css';

function StudentSidebar({ activeTab = 'Dashboard', setActiveTab, isOpen, onClose }) {
  const mainNavItems = [
    { name: 'home', label: 'Dashboard', icon: '📊' },
    { name: 'profile', label: 'My Info', icon: '👤' },
    { name: 'attendance', label: 'Attendance Ledger', icon: '📈' },
    { name: 'timetable', label: 'Academic Calendar', icon: '📅' },
    { name: 'updates', label: 'Updates', icon: '🔔' },
    { name: 'notes', label: 'Notes', icon: '📂' },
    { name: 'library', label: 'Library Terminal', icon: '📖' },
    { name: 'fees', label: 'Fee', icon: '💳' },
    { name: 'hostel', label: 'Hostel Portal', icon: '🏠' },
    { name: 'Performance', icon: '📈' },
  ];

  const handleItemClick = (name) => {
    if (setActiveTab) setActiveTab(name);
    if (onClose) onClose();
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand-group">
            <img src={log} alt="Logo" className="sidebar-logo" />
            <img src={aplh} alt="Unisync" className="sidebar-brand-name" />
          </div>
          {onClose && (
            <button className="sidebar-close-btn" onClick={onClose} aria-label="Close Sidebar">
              ✕
            </button>
          )}
        </div>

        <nav className="sidebar-nav-section">
          <ul className="sidebar-nav-list">
            {mainNavItems.map((item) => (
              <li
                key={item.name}
                className={`sidebar-nav-item ${activeTab === item.name ? 'active' : ''}`}
                onClick={() => handleItemClick(item.name)}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-text">{item.name}</span>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div
            className={`sidebar-nav-item ${activeTab === 'Settings' ? 'active' : ''}`}
            onClick={() => handleItemClick('Settings')}
          >
            <span className="sidebar-icon">⚙️</span>
            <span className="sidebar-text">Settings</span>
          </div>
        </div>
      </aside>
    </>
  );
}

function AdminSidebar({ activeTab = 'Dashboard', setActiveTab, isOpen, onClose }) {
  const mainNavItems = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'My Info', icon: '👤' },
    { name: 'Attendance', icon: '📅' },
    { name: 'Faculty', icon: '👨‍🏫' },
    { name: 'Batches', icon: '👥' },
    { name: 'Performance', icon: '📈' },
  ];

  const handleItemClick = (name) => {
    if (setActiveTab) setActiveTab(name);
    if (onClose) onClose();
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand-group">
            <img src={log} alt="Logo" className="sidebar-logo" />
            <img src={aplh} alt="Unisync" className="sidebar-brand-name" />
          </div>
          {onClose && (
            <button className="sidebar-close-btn" onClick={onClose} aria-label="Close Sidebar">
              ✕
            </button>
          )}
        </div>
        <nav className="sidebar-nav-section">
          <ul className="sidebar-nav-list">
            {mainNavItems.map((item) => (
              <li
                key={item.name}
                className={`sidebar-nav-item ${activeTab === item.name ? 'active' : ''}`}
                onClick={() => handleItemClick(item.name)}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-text">{item.name}</span>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div
            className={`sidebar-nav-item ${activeTab === 'Settings' ? 'active' : ''}`}
            onClick={() => handleItemClick('Settings')}
          >
            <span className="sidebar-icon">⚙️</span>
            <span className="sidebar-text">Settings</span>
          </div>
        </div>
      </aside>
    </>
  );
}

function FacultySidebar({ activeTab = 'Dashboard', setActiveTab, isOpen, onClose }) {
  const mainNavItems = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'My Info', icon: '👤' },
    { name: 'Attendance Update', icon: '📝' },
    { name: 'Students', icon: '🎓' },
    { name: 'Notes Upload', icon: '📤' },
    { name: 'Performance', icon: '📈' },
  ];

  const handleItemClick = (name) => {
    if (setActiveTab) setActiveTab(name);
    if (onClose) onClose();
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand-group">
            <img src={log} alt="Logo" className="sidebar-logo" />
            <img src={aplh} alt="Unisync" className="sidebar-brand-name" />
          </div>
          {onClose && (
            <button className="sidebar-close-btn" onClick={onClose} aria-label="Close Sidebar">
              ✕
            </button>
          )}
        </div>
        <nav className="sidebar-nav-section">
          <ul className="sidebar-nav-list">
            {mainNavItems.map((item) => (
              <li
                key={item.name}
                className={`sidebar-nav-item ${activeTab === item.name ? 'active' : ''}`}
                onClick={() => handleItemClick(item.name)}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-text">{item.name}</span>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div
            className={`sidebar-nav-item ${activeTab === 'Settings' ? 'active' : ''}`}
            onClick={() => handleItemClick('Settings')}
          >
            <span className="sidebar-icon">⚙️</span>
            <span className="sidebar-text">Settings</span>
          </div>
        </div>
      </aside>
    </>
  );
}

const StudentNavbar = StudentSidebar;
const AdminNavbar = AdminSidebar;
const TeacherNavbar = FacultySidebar;

export { StudentSidebar, AdminSidebar, FacultySidebar, StudentNavbar, AdminNavbar, TeacherNavbar };
export default StudentSidebar;