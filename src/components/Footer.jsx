import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleFooterLinkClick = (e, targetId) => {
    e.preventDefault();
    if (window.location.hash === '#/properties') {
      window.location.hash = '#/';
      setTimeout(() => {
        // If targetId is 'contact', we scroll to footer since contact form is removed
        const finalId = targetId === 'contact' ? 'footer' : targetId;
        const element = document.getElementById(finalId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      const finalId = targetId === 'contact' ? 'footer' : targetId;
      const element = document.getElementById(finalId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer id="footer" className="footer-new">

      {/* Top row — tagline left, contact right */}
      <div className="footer-new-top">
        <div className="footer-new-tagline">
          <h2 className="footer-new-heading">
            Discover <em>Nature's</em> Wonders<br />with Expert Guidance
          </h2>
        </div>
        <div className="footer-new-contact">
          <p className="footer-new-address">
            GH-04A, Near Arihant Abode, Sector 10,<br />
            Vaidpura, Greater Noida,<br />
            Uttar Pradesh 203207
          </p>
          <a href="tel:+919999888990" className="footer-new-phone">+91 9999888990</a>
          <a href="mailto:info@eudgroup.in" className="footer-new-phone">info@eudgroup.in</a>
        </div>
      </div>

      {/* Divider */}
      <div className="footer-new-divider" />

      {/* Nav row — links left, logo + socials center, links right */}
      <div className="footer-new-nav">
        <nav className="footer-new-nav-links">
          <a href="#home" onClick={(e) => handleFooterLinkClick(e, 'properties')}>Home</a>
          <a href="#about" onClick={(e) => handleFooterLinkClick(e, 'about')}>About</a>
          <a href="#properties" onClick={(e) => handleFooterLinkClick(e, 'properties')}>Properties</a>
          <a href="#services" onClick={(e) => handleFooterLinkClick(e, 'about')}>Services</a>
        </nav>
        
        <div className="footer-new-center-group">
          <div className="footer-new-logo" style={{ cursor: 'pointer' }} onClick={() => window.location.hash = '#/'}>EUD Group</div>
          <div className="footer-new-socials">
            <a href="https://www.instagram.com/eud_group/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://www.facebook.com/eudgroup/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer-social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://www.youtube.com/@EUDGroup" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="footer-social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/vimal-soni-68004b41a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>

        <nav className="footer-new-nav-links footer-new-nav-right">
          <a href="#properties" onClick={(e) => handleFooterLinkClick(e, 'properties')}>Gallery</a>
          <a href="#faq" onClick={(e) => handleFooterLinkClick(e, 'faq')}>FAQ</a>
          <a href="#properties" onClick={(e) => handleFooterLinkClick(e, 'properties')}>Pricing</a>
          <a href="#contact" onClick={(e) => handleFooterLinkClick(e, 'contact')}>Contact</a>
        </nav>
      </div>

      {/* Divider */}
      <div className="footer-new-divider" />

      {/* Bottom bar — copyright left, legal right */}
      <div className="footer-new-bottom">
        <p className="footer-new-copy">© {currentYear} EUD Group. All rights reserved.</p>
        <div className="footer-new-legal">
          <a href="#">Terms &amp; Conditions</a>
          <span>|</span>
          <a href="#">Privacy Policy</a>
        </div>
      </div>

    </footer>
  );
}
