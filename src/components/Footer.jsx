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

      {/* Nav row — links left, logo center, links right */}
      <div className="footer-new-nav">
        <nav className="footer-new-nav-links">
          <a href="#home" onClick={(e) => handleFooterLinkClick(e, 'properties')}>Home</a>
          <a href="#about" onClick={(e) => handleFooterLinkClick(e, 'about')}>About</a>
          <a href="#properties" onClick={(e) => handleFooterLinkClick(e, 'properties')}>Properties</a>
          <a href="#services" onClick={(e) => handleFooterLinkClick(e, 'about')}>Services</a>
        </nav>
        <div className="footer-new-logo" style={{ cursor: 'pointer' }} onClick={() => window.location.hash = '#/'}>EUD Group</div>
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
