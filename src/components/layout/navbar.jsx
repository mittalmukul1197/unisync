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
    { name: 'Performance', label: 'Performance', icon: '🏆' },
  ];

  const handleItemClick = (name) => {
    if (setActiveTab) setActiveTab(name);
    if (onClose) onClose();
  };

  return (
    <>
      {isOpen && <div className="sdb-overlay" onClick={onClose}></div>}

      <aside className={`sdb ${isOpen ? 'open' : ''}`}>
        <div className="sdb-header">
          <div className="sdb-brand-group">
            <img src={log} alt="Logo" className="sdb-logo" />
            <img src={aplh} alt="Unisync" className="sdb-brand-name" />
          </div>

          {onClose && (
            <button
              className="sdb-close-btn"
              onClick={onClose}
              aria-label="Close Sidebar"
            >
              ✕
            </button>
          )}
        </div>

        <nav className="sdb-nav-section">
          <ul className="sdb-nav-list">
            {mainNavItems.map((item) => (
              <li
                key={item.name}
                className={`sdb-nav-item ${
                  activeTab === item.name ? 'active' : ''
                }`}
                onClick={() => handleItemClick(item.name)}
              >
                <span className="sdb-icon">{item.icon}</span>
                <span className="sdb-text">
                  {item.label || item.name}
                </span>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sdb-footer">
          <div
            className={`sdb-nav-item ${
              activeTab === 'Settings' ? 'active' : ''
            }`}
            onClick={() => handleItemClick('Settings')}
          >
            <span className="sdb-icon">⚙️</span>
            <span className="sdb-text">Settings</span>
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
      {isOpen && <div className="sdb-overlay" onClick={onClose}></div>}

      <aside className={`sdb ${isOpen ? 'open' : ''}`}>
        <div className="sdb-header">
          <div className="sdb-brand-group">
            <img src={log} alt="Logo" className="sdb-logo" />
            <img src={aplh} alt="Unisync" className="sdb-brand-name" />
          </div>

          {onClose && (
            <button
              className="sdb-close-btn"
              onClick={onClose}
              aria-label="Close Sidebar"
            >
              ✕
            </button>
          )}
        </div>

        <nav className="sdb-nav-section">
          <ul className="sdb-nav-list">
            {mainNavItems.map((item) => (
              <li
                key={item.name}
                className={`sdb-nav-item ${
                  activeTab === item.name ? 'active' : ''
                }`}
                onClick={() => handleItemClick(item.name)}
              >
                <span className="sdb-icon">{item.icon}</span>
                <span className="sdb-text">{item.name}</span>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sdb-footer">
          <div
            className={`sdb-nav-item ${
              activeTab === 'Settings' ? 'active' : ''
            }`}
            onClick={() => handleItemClick('Settings')}
          >
            <span className="sdb-icon">⚙️</span>
            <span className="sdb-text">Settings</span>
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
    {name: 'Updates', label: 'Updates', icon: '🔔'},
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
      {isOpen && <div className="sdb-overlay" onClick={onClose}></div>}

      <aside className={`sdb ${isOpen ? 'open' : ''}`}>
        <div className="sdb-header">
          <div className="sdb-brand-group">
            <img src={log} alt="Logo" className="sdb-logo" />
            <img src={aplh} alt="Unisync" className="sdb-brand-name" />
          </div>

          {onClose && (
            <button
              className="sdb-close-btn"
              onClick={onClose}
              aria-label="Close Sidebar"
            >
              ✕
            </button>
          )}
        </div>

        <nav className="sdb-nav-section">
          <ul className="sdb-nav-list">
            {mainNavItems.map((item) => (
              <li
                key={item.name}
                className={`sdb-nav-item ${
                  activeTab === item.name ? 'active' : ''
                }`}
                onClick={() => handleItemClick(item.name)}
              >
                <span className="sdb-icon">{item.icon}</span>
                <span className="sdb-text">{item.name}</span>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sdb-footer">
          <div
            className={`sdb-nav-item ${
              activeTab === 'Settings' ? 'active' : ''
            }`}
            onClick={() => handleItemClick('Settings')}
          >
            <span className="sdb-icon">⚙️</span>
            <span className="sdb-text">Settings</span>
          </div>
        </div>
      </aside>
    </>
  );
}

export { StudentSidebar, AdminSidebar, FacultySidebar };
export default StudentSidebar;