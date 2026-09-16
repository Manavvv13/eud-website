import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  CheckCircle, 
  MessageSquare, 
  ArrowLeft 
} from 'lucide-react';
import './GodrejMajestyConfirmation.css';

export default function GodrejMajestyConfirmation() {
  const location = useLocation();
  const userName = location.state?.name ? location.state.name.trim() : '';

  // Scroll to top upon mount and ensure noindex
  useEffect(() => {
    window.scrollTo(0, 0);

    let metaTag = document.querySelector('meta[name="robots"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = 'robots';
      document.head.appendChild(metaTag);
    }
    metaTag.content = 'noindex, nofollow';

    return () => {
      if (metaTag) metaTag.content = 'index, follow';
    };
  }, []);

  return (
    <div className="godrej-confirm-root">
      
      {/* Minimal Standalone Header */}
      <header className="godrej-confirm-header">
        <div className="godrej-confirm-header-inner">
          <Link to="/godrej-majesty" className="godrej-confirm-brand">
            <img 
              src="/EUD_Logo_clean.png" 
              alt="EUD Group" 
              className="godrej-confirm-logo"
            />
            <div className="godrej-confirm-brand-divider"></div>
            <span className="godrej-confirm-brand-tag">GODREJ MAJESTY</span>
          </Link>

          <div className="godrej-confirm-header-actions">
            <Link to="/godrej-majesty" className="godrej-confirm-back-btn">
              <ArrowLeft size={15} />
              <span>Back to Project</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Confirmation Container */}
      <main className="godrej-confirm-main">
        <div className="godrej-confirm-container">
          
          {/* Centered Minimalist Confirmation Card */}
          <div className="godrej-confirm-card">
            <div className="godrej-confirm-icon-box">
              <CheckCircle size={52} />
            </div>
            
            <h1 className="godrej-confirm-title">
              Thank You{userName ? `, ${userName}` : ''}!
            </h1>
            
            <p className="godrej-confirm-sub">
              Your enquiry for <strong>Godrej Majesty</strong> has been recorded successfully. Our senior luxury advisor will connect with you shortly.
            </p>

            {/* Primary Action - WhatsApp Only */}
            <div className="godrej-confirm-actions">
              <a 
                href="https://wa.me/919999888990?text=Hi%2C%20I%20have%20submitted%20an%20enquiry%20for%20Godrej%20Majesty%20Sector%2012%20Greater%20Noida%20West.%20Please%20share%20the%20cost%20sheet%2C%20floor%20plans%20and%2030%3A70%20payment%20plan%20details."
                target="_blank"
                rel="noopener noreferrer"
                className="godrej-confirm-action-btn whatsapp"
              >
                <MessageSquare size={18} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Return Link */}
            <div className="godrej-confirm-return-box">
              <Link to="/godrej-majesty" className="godrej-confirm-return-link">
                <ArrowLeft size={16} />
                <span>Return to Godrej Majesty</span>
              </Link>
            </div>

          </div>
        </div>
      </main>

      {/* Standalone Minimalist Footer */}
      <footer className="godrej-confirm-footer">
        <div className="godrej-confirm-footer-inner">
          <div className="godrej-confirm-footer-bottom">
            <span>&copy; {new Date().getFullYear()} Godrej Majesty &bull; EUD Group. All rights reserved.</span>
            <Link to="/godrej-majesty">Project Details</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
