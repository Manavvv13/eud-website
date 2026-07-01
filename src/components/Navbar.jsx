import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ onContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    if (window.location.hash === '#/properties') {
      window.location.hash = '#/';
      // Delay slightly to allow the home view to mount and render sections in DOM
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-content">
        {/* Brand Logo */}
        <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="navbar-logo">
          <img src="/EUD Logo.png" alt="EUD Logo" className="logo-img" />
        </a>

        {/* Center Capsule Menu */}
        <div className="nav-capsule-wrapper">
          <div className="nav-capsule">
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="nav-link active">Home</a>
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="nav-link">About Us</a>
            <a href="#premier-houses" onClick={(e) => handleNavClick(e, 'premier-houses')} className="nav-link">Properties</a>
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="nav-link">Services</a>
          </div>
        </div>

        {/* Right Side Buttons */}
        <div className="navbar-right">
          <button className="btn-contact-nav" onClick={onContact}>
            Contact Us
          </button>
          
          {/* Mobile Toggle */}
          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-links">
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="mobile-link">Home</a>
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="mobile-link">About Us</a>
          <a href="#premier-houses" onClick={(e) => handleNavClick(e, 'premier-houses')} className="mobile-link">Properties</a>
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="mobile-link">Services</a>
          
          <div className="mobile-drawer-footer">
            <button className="btn-contact-nav mobile-btn" onClick={onContact}>
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
