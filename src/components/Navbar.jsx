import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

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
    if (location.pathname === '/') {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollTo: targetId } });
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
          <button className="btn-contact-nav" onClick={() => navigate('/contact')}>
            Contact Us
          </button>
          
          {/* Mobile Toggle */}
          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown (Smaller Menu) */}
      <div className={`mobile-dropdown-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-dropdown-header">
          <span className="mobile-dropdown-title">Menu</span>
          <button className="btn-close-mobile-menu" onClick={() => setMobileMenuOpen(false)}>
            <X size={16} />
          </button>
        </div>
        <div className="mobile-dropdown-links">
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="mobile-dropdown-link">Home</a>
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="mobile-dropdown-link">About Us</a>
          <a href="#premier-houses" onClick={(e) => handleNavClick(e, 'premier-houses')} className="mobile-dropdown-link">Properties</a>
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="mobile-dropdown-link">Services</a>
          
          <button className="btn-contact-mobile-menu" onClick={() => { setMobileMenuOpen(false); navigate('/contact'); }}>
            Contact Us
          </button>
        </div>
      </div>
    </nav>
  );
}
