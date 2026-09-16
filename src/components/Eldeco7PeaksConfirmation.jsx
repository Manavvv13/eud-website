import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Phone, 
  Download, 
  MessageSquare, 
  ArrowLeft, 
  ShieldCheck, 
  MapPin, 
  Clock 
} from 'lucide-react';
import './Eldeco7PeaksConfirmation.css';

export default function Eldeco7PeaksConfirmation() {
  const location = useLocation();
  const userName = location.state?.name || '';

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
      
      {/* Editorial Standalone Header */}
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
            <a href="tel:+919999888990" className="eldeco-confirm-call-btn">
              <Phone size={15} />
              <span>Sales Desk: +91 99998 88990</span>
            </a>
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
          
          {/* Hero Confirmation Card */}
          <div className="eldeco-confirm-card">
            <div className="eldeco-confirm-icon-box">
              <CheckCircle size={44} />
            </div>

            <span className="eldeco-confirm-badge">Submission Confirmed • Priority VIP Queue</span>
            
            <h1 className="eldeco-confirm-title">
              Thank You{userName ? `, ${userName}` : ''}!
            </h1>
            
            <p className="eldeco-confirm-sub">
              Your enquiry for <strong>Eldeco 7 Peaks Residences</strong> has been received successfully. 
              Our senior project specialist has been allocated to your request and will connect with you shortly.
            </p>

            {/* What Happens Next Section */}
            <div className="eldeco-confirm-steps">
              <div className="eldeco-confirm-step">
                <div className="eldeco-step-num">01</div>
                <div className="eldeco-step-content">
                  <h4>Instant Details Dispatch</h4>
                  <p>Comprehensive pricing sheets, brochure, and tower floor plans are queued for dispatch to your details.</p>
                </div>
              </div>

              <div className="eldeco-confirm-step">
                <div className="eldeco-step-num">02</div>
                <div className="eldeco-step-content">
                  <h4>Dedicated Specialist Connect</h4>
                  <p>A senior luxury advisor will reach out to address inventory availability, payment plans, and pre-launch benefits.</p>
                </div>
              </div>

              <div className="eldeco-confirm-step">
                <div className="eldeco-step-num">03</div>
                <div className="eldeco-step-content">
                  <h4>Priority Site Visit Scheduling</h4>
                  <p>Confirm an exclusive tour at Sector Omicron 1A, Greater Noida with complimentary chauffeur-driven cab transit.</p>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="eldeco-confirm-actions">
              <a 
                href="tel:+919999888990" 
                className="eldeco-confirm-action-btn primary"
              >
                <Phone size={17} />
                <span>Call Sales Desk Directly (+91 99998 88990)</span>
              </a>

              <a 
                href="https://wa.me/919999888990?text=Hi%2C%20I%20have%20submitted%20an%20enquiry%20for%20Eldeco%207%20Peaks%20Residences.%20Please%20share%20the%20cost%20sheet%20and%20brochure."
                target="_blank"
                rel="noopener noreferrer"
                className="eldeco-confirm-action-btn whatsapp"
              >
                <MessageSquare size={17} />
                <span>Chat on WhatsApp Now</span>
              </a>

              <a 
                href="/Properties/Eldeco 7 Peaks/site-plan-img.webp" 
                download="Eldeco_7_Peaks_Master_Plan.webp"
                className="eldeco-confirm-action-btn outline"
              >
                <Download size={17} />
                <span>Download Master Site Plan</span>
              </a>
            </div>

            {/* Project Quick Overview */}
            <div className="eldeco-confirm-project-snapshot">
              <div className="eldeco-snapshot-item">
                <MapPin size={18} />
                <div>
                  <span className="eldeco-snapshot-label">Location</span>
                  <strong>Sector Omicron 1A, Greater Noida</strong>
                </div>
              </div>

              <div className="eldeco-snapshot-item">
                <Clock size={18} />
                <div>
                  <span className="eldeco-snapshot-label">Typologies</span>
                  <strong>3 & 4 BR Oxy-Rich Residences</strong>
                </div>
              </div>

              <div className="eldeco-snapshot-item">
                <ShieldCheck size={18} />
                <div>
                  <span className="eldeco-snapshot-label">RERA Registration</span>
                  <strong>UPRERA.PRJ06513/01/2026</strong>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div className="eldeco-confirm-return-box">
              <Link to="/eldeco-7-peaks" className="eldeco-confirm-return-link">
                <ArrowLeft size={16} />
                <span>Return to Eldeco 7 Peaks Project Page</span>
              </Link>
            </div>

          </div>
        </div>
      </main>

      {/* Standalone Minimalist Footer */}
      <footer className="eldeco-confirm-footer">
        <div className="eldeco-confirm-footer-inner">
          <p className="eldeco-confirm-disclaimer">
            Disclaimer: This confirmation acknowledges receipt of your enquiry for Eldeco 7 Peaks Residences. 
            Official Promoter: Eldeco Group. All project details and pricing are subject to official allotment terms.
          </p>
          <div className="eldeco-confirm-footer-bottom">
            <span>© {new Date().getFullYear()} Eldeco 7 Peaks Residences. All rights reserved.</span>
            <Link to="/eldeco-7-peaks">Project Details</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
