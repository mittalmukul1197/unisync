import React from 'react';
import './footer.css';

const Footer = () => {
  const statusItems = ['Secure Gateway', 'Server Online'];

  return (
    <footer className="portal-footer">
      <div className="footer-container">
        
        
        <div className="footer-brand-section">
          <span className="copyright-symbol">©</span>
          <span className="current-year">{new Date().getFullYear()}</span>
          <span className="footer-brand-name">Arogya University.</span>
          <span className="rights-text">All rights reserved.</span>
        </div>

        {/* Center: Live Status Indicators */}
        <div className="status-section">
          {statusItems.map((item, index) => (
            <div key={index} className="status-badge">
              <span className="dot"></span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="right-section">
          <span className="portal-title">Student Management Portal</span>
          <span className="separator">•</span>
          <span className="powered-by">
            Powered by <strong className="unisync-text">unisync</strong>
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;