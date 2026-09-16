import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  CheckCircle, 
  MessageSquare, 
  ArrowLeft 
} from 'lucide-react';
import './Eldeco7PeaksConfirmation.css';

export default function Eldeco7PeaksConfirmation() {
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
    <div className="eldeco-confirm-root">
      
      {/* Minimal Standalone Header */}
      <header className="eldeco-confirm-header">
        <div className="eldeco-confirm-header-inner">
          <Link to="/eldeco-7-peaks" className="eldeco-confirm-brand">
            <img 
              src="/EUD_Logo_clean.png" 
              alt="EUD Group" 
              className="eldeco-confirm-logo"
            />
          </Link>

          <div className="eldeco-confirm-header-actions">
            <Link to="/eldeco-7-peaks" className="eldeco-confirm-back-btn">
              <ArrowLeft size={15} />
              <span>Back to Project</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Confirmation Container */}
      <main className="eldeco-confirm-main">
        <div className="eldeco-confirm-container">
          
          {/* Centered Minimalist Confirmation Card */}
          <div className="eldeco-confirm-card">
            <div className="eldeco-confirm-icon-box">
              <CheckCircle size={50} />
            </div>
            
            <h1 className="eldeco-confirm-title">
              Thank You{userName ? `, ${userName}` : ''}!
            </h1>
            
            <p className="eldeco-confirm-sub">
              Your enquiry has been recorded successfully. Our team will get in touch with you shortly.
            </p>

            {/* Primary Action - WhatsApp Only */}
            <div className="eldeco-confirm-actions">
              <a 
                href="https://wa.me/919999888990?text=Hi%2C%20I%20have%20submitted%20an%20enquiry%20for%20Eldeco%207%20Peaks%20Residences.%20Please%20share%20the%20details."
                target="_blank"
                rel="noopener noreferrer"
                className="eldeco-confirm-action-btn whatsapp"
              >
                <MessageSquare size={18} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Return Link */}
            <div className="eldeco-confirm-return-box">
              <Link to="/eldeco-7-peaks" className="eldeco-confirm-return-link">
                <ArrowLeft size={16} />
                <span>Back to Eldeco 7 Peaks</span>
              </Link>
            </div>

          </div>
        </div>
      </main>

      {/* Standalone Minimalist Footer */}
      <footer className="eldeco-confirm-footer">
        <div className="eldeco-confirm-footer-inner">
          <div className="eldeco-confirm-footer-bottom">
            <span>© {new Date().getFullYear()} Eldeco 7 Peaks Residences. All rights reserved.</span>
            <Link to="/eldeco-7-peaks">Project Details</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
