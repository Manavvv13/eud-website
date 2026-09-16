import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Send, 
  CheckCircle, 
  X, 
  ShieldCheck, 
  Maximize2, 
  Download, 
  MapPin, 
  Calendar,
  Building2,
  Waves,
  Trees,
  Compass,
  Menu,
  IndianRupee,
  Wind,
  Crown,
  Activity,
  Trophy,
  Target
} from 'lucide-react';
import './Eldeco7PeaksLanding.css';

export default function Eldeco7PeaksLanding() {
  // Navigation & Scroll states
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Tab states
  const [activeHighlightTab, setActiveHighlightTab] = useState('planning'); // 'planning' | 'specs' | 'design'
  const [galleryTab, setGalleryTab] = useState('all'); // 'all' | 'exterior' | 'interior'

  // Modal & Lightbox states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Get Project Details & Price Breakup');
  const [lightboxImage, setLightboxImage] = useState(null);

  // Form states (Hero & Modal shared logic)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Manage SEO: noindex, nofollow for performance marketing
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Eldeco 7 Peak Residences | Official Campaign | EUD Group';

    let metaRobots = document.querySelector('meta[name="robots"]');
    let createdMeta = false;

    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
      createdMeta = true;
    }
    const previousRobotsContent = metaRobots.getAttribute('content');
    metaRobots.setAttribute('content', 'noindex, nofollow');

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      document.title = originalTitle;
      window.removeEventListener('scroll', handleScroll);
      if (createdMeta && metaRobots.parentNode) {
        metaRobots.parentNode.removeChild(metaRobots);
      } else if (metaRobots && previousRobotsContent) {
        metaRobots.setAttribute('content', previousRobotsContent);
      }
    };
  }, []);

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      message: ''
    });
    setIsSuccess(false);
  };

  const openEnquiryModal = (title = 'Get Project Details & Price Breakup') => {
    setModalTitle(title);
    setIsModalOpen(true);
    setIsSuccess(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      alert('Please fill out all mandatory fields: Name, Email, Phone Number, and Message.');
      return;
    }

    setIsSubmitting(true);

    const submissionPayload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim(),
      project: 'Eldeco 7 Peak Residences',
      source: 'Paid Ad Campaign'
    };

    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbzuVTHml7v49EwW3EDB2lKLqCNZUSePhaGqpwah5SNYUhEiCmAVJROhhY7IZMaTNPik/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify(submissionPayload)
        }
      );
    } catch (err) {
      console.warn('Lead dispatch note:', err);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Gallery items using authentic project assets
  const galleryItems = [
    { id: 1, type: 'exterior', src: '/Properties/Eldeco 7 Peaks/images-1.webp', title: 'Tower Elevation & Skyline' },
    { id: 2, type: 'exterior', src: '/Properties/Eldeco 7 Peaks/images-2.webp', title: 'Central Greens & Clubhouse' },
    { id: 3, type: 'exterior', src: '/Properties/Eldeco 7 Peaks/images-3.webp', title: 'Resort Swimming Pool & Decks' },
    { id: 4, type: 'exterior', src: '/Properties/Eldeco 7 Peaks/images-4.webp', title: 'Grand Arrival Court' },
    { id: 5, type: 'interior', src: '/Properties/Eldeco 7 Peaks/images-01.webp', title: 'Double Height Living Room' },
    { id: 6, type: 'interior', src: '/Properties/Eldeco 7 Peaks/images-02.webp', title: 'Master Bedroom with Balcony' },
    { id: 7, type: 'interior', src: '/Properties/Eldeco 7 Peaks/images-03.webp', title: 'Gourmet Kitchen & Dining' },
    { id: 8, type: 'interior', src: '/Properties/Eldeco 7 Peaks/images-04.webp', title: 'Luxury Bathroom Suite' },
  ];

  const filteredGallery = galleryTab === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.type === galleryTab);

  return (
    <div className="eldeco-landing-root">
      
      {/* ==========================================================================
          HEADER / NAVBAR (CAMPAIGN STANDALONE)
          ========================================================================== */}
      <header className={`eldeco-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="eldeco-header-inner">
          <div className="eldeco-brand">
            <img 
              src="/EUD_Logo_clean.png" 
              alt="EUD Group" 
              className="eldeco-brand-img"
            />
          </div>

          <nav>
            <ul className="eldeco-nav-links">
              <li><a href="#overview" onClick={(e) => { e.preventDefault(); scrollToSection('overview'); }} className="eldeco-nav-link">Overview</a></li>
              <li><a href="#highlights" onClick={(e) => { e.preventDefault(); scrollToSection('highlights'); }} className="eldeco-nav-link">Highlights</a></li>
              <li><a href="#amenities" onClick={(e) => { e.preventDefault(); scrollToSection('amenities'); }} className="eldeco-nav-link">Amenities</a></li>
              <li><a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }} className="eldeco-nav-link">Pricing</a></li>
              <li><a href="#siteplan" onClick={(e) => { e.preventDefault(); scrollToSection('siteplan'); }} className="eldeco-nav-link">Site Plan</a></li>
              <li><a href="#location" onClick={(e) => { e.preventDefault(); scrollToSection('location'); }} className="eldeco-nav-link">Location</a></li>
              <li><a href="#gallery" onClick={(e) => { e.preventDefault(); scrollToSection('gallery'); }} className="eldeco-nav-link">Gallery</a></li>
            </ul>
          </nav>

          <div className="eldeco-header-actions">
            <a href="tel:+919999888990" className="eldeco-call-btn">
              <Phone size={15} />
              <span>+91 99998 88990</span>
            </a>
            <button 
              className="eldeco-btn-primary" 
              onClick={() => openEnquiryModal('Enquire Now - Exclusive Pricing')}
            >
              Enquire Now
            </button>
            <button 
              className="eldeco-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <div className={`eldeco-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#overview" onClick={(e) => { e.preventDefault(); scrollToSection('overview'); }} className="eldeco-nav-link">Overview</a>
          <a href="#highlights" onClick={(e) => { e.preventDefault(); scrollToSection('highlights'); }} className="eldeco-nav-link">Highlights</a>
          <a href="#amenities" onClick={(e) => { e.preventDefault(); scrollToSection('amenities'); }} className="eldeco-nav-link">Amenities</a>
          <a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }} className="eldeco-nav-link">Pricing & Floor Plans</a>
          <a href="#siteplan" onClick={(e) => { e.preventDefault(); scrollToSection('siteplan'); }} className="eldeco-nav-link">Site Plan</a>
          <a href="#location" onClick={(e) => { e.preventDefault(); scrollToSection('location'); }} className="eldeco-nav-link">Location Advantages</a>
          <a href="#gallery" onClick={(e) => { e.preventDefault(); scrollToSection('gallery'); }} className="eldeco-nav-link">Gallery</a>
          <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.8rem' }}>
            <a href="tel:+919999888990" className="eldeco-call-btn" style={{ width: '100%', justifyContent: 'center' }}>
              <Phone size={15} /> <span>Call Sales Desk</span>
            </a>
          </div>
        </div>
      </header>

      {/* ==========================================================================
          FULL-SCREEN CINEMATIC HERO BANNER
          ========================================================================== */}
      <section className="eldeco-fullscreen-hero" id="hero">
        <div className="eldeco-banner-frame">
          {/* Desktop & Tablet Hero Image (16:9 Landscape) */}
          <img 
            src="/Properties/Eldeco 7 Peaks/7PEAKS_16x9.webp" 
            alt="Eldeco 7 Peaks Residences - Full Screen Campaign Banner"
            className="eldeco-fullscreen-img eldeco-hero-desktop"
            fetchPriority="high"
          />

          {/* Mobile Hero Image (9:16 Portrait) */}
          <img 
            src="/Properties/Eldeco 7 Peaks/7PEAKS_9x16.webp" 
            alt="Eldeco 7 Peaks Residences - Mobile Portrait Campaign Banner"
            className="eldeco-fullscreen-img eldeco-hero-mobile"
            fetchPriority="high"
          />

          {/* Floating High-Converting Enquiry Card */}
          <div className="eldeco-hero-floating-card">
            <div className="eldeco-form-header">
              <h3 className="eldeco-form-title">Get Project Details</h3>
            </div>

            {isSuccess ? (
              <div className="eldeco-success-box">
                <div className="eldeco-success-icon"><CheckCircle size={36} /></div>
                <h4 className="eldeco-success-title">Thank You!</h4>
                <p className="eldeco-success-desc">
                  Your enquiry has been received. Our project specialist will connect with you right away.
                </p>
                <button 
                  className="eldeco-btn-outline" 
                  onClick={resetForm}
                >
                  Submit Another Query
                </button>
              </div>
            ) : (
              <form className="eldeco-form" onSubmit={handleFormSubmit}>
                <div className="eldeco-form-group">
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    name="name" 
                    className="eldeco-input" 
                    placeholder="Enter your name" 
                    value={formData.name}
                    onChange={handleInputChange} 
                    required 
                  />
                </div>

                <div className="eldeco-form-group">
                  <label>Email Address *</label>
                  <input 
                    type="email" 
                    name="email" 
                    className="eldeco-input" 
                    placeholder="name@example.com" 
                    value={formData.email}
                    onChange={handleInputChange} 
                    required 
                  />
                </div>

                <div className="eldeco-form-group">
                  <label>Phone Number *</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    className="eldeco-input" 
                    placeholder="+91 98765 43210" 
                    value={formData.phone}
                    onChange={handleInputChange} 
                    required 
                  />
                </div>

                <div className="eldeco-form-group">
                  <label>Message *</label>
                  <input 
                    type="text" 
                    name="message" 
                    className="eldeco-input" 
                    placeholder="Your message or query" 
                    value={formData.message}
                    onChange={handleInputChange} 
                    required 
                  />
                </div>

                <button 
                  type="submit" 
                  className="eldeco-form-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                  <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ==========================================================================
          KEY HIGHLIGHTS RIBBON (DIRECTLY BENEATH FULLSCREEN HERO)
          ========================================================================== */}
      <div className="eldeco-hero-ribbon">
        <div className="eldeco-ribbon-grid">
          <div className="eldeco-ribbon-item">
            <div className="eldeco-ribbon-icon"><IndianRupee size={20} strokeWidth={2.2} /></div>
            <div>
              <div className="eldeco-ribbon-title">₹ 2.37 Cr*</div>
              <div className="eldeco-ribbon-sub">Starting Price</div>
            </div>
          </div>

          <div className="eldeco-ribbon-item">
            <div className="eldeco-ribbon-icon"><Building2 size={20} /></div>
            <div>
              <div className="eldeco-ribbon-title">3 & 4 BR</div>
              <div className="eldeco-ribbon-sub">Oxy-Rich Residences</div>
            </div>
          </div>

          <div className="eldeco-ribbon-item">
            <div className="eldeco-ribbon-icon"><Waves size={20} /></div>
            <div>
              <div className="eldeco-ribbon-title">4 Pools</div>
              <div className="eldeco-ribbon-sub">Inc. Sand Beach Pool</div>
            </div>
          </div>

          <div className="eldeco-ribbon-item">
            <div className="eldeco-ribbon-icon"><MapPin size={20} /></div>
            <div>
              <div className="eldeco-ribbon-title">Omicron 1A</div>
              <div className="eldeco-ribbon-sub">Greater Noida</div>
            </div>
          </div>

          <div className="eldeco-ribbon-item">
            <div className="eldeco-ribbon-icon"><ShieldCheck size={20} /></div>
            <div>
              <div className="eldeco-ribbon-title">UP RERA Reg</div>
              <div className="eldeco-ribbon-sub">UPRERAPRJ106523/01/2026</div>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================================================
          PROJECT OVERVIEW SECTION
          ========================================================================== */}
      <section className="eldeco-section eldeco-section-white" id="overview">
        <div className="eldeco-container">
          <div className="eldeco-section-header">
            <span className="eldeco-section-badge">Project Overview</span>
            <h2 className="eldeco-section-title">7 Towers Inspired By Iconic Global Peaks</h2>
            <p className="eldeco-section-sub">
              Eldeco 7 Peak Residences is nestled amidst expansive, oxygen-rich green belts in Omicron 1A, Greater Noida, offering a rare lifestyle immersed in nature.
            </p>
          </div>

          <div className="eldeco-overview-grid">
            <div className="eldeco-overview-media">
              <img 
                src="/Properties/Eldeco 7 Peaks/overview-img.webp" 
                alt="Eldeco 7 Peaks Overview" 
                className="eldeco-overview-img"
              />
              <span className="eldeco-media-tag">Artistic Impression • Unobstructed Skyline</span>
            </div>

            <div className="eldeco-overview-copy">
              <h3>Indulgence In The Rare — Crafted Once, Remembered Always</h3>
              <p>
                With low-rise plotted developments on one side, the residences enjoy an unobstructed skyline and a refreshing sense of openness. Layers of mature trees and sunlit canopies form a living panorama that evolves with the seasons.
              </p>
              <p>
                Inspired by the world’s iconic Seven Peaks, the towers are envisioned as modern landmarks rising from lush landscapes. Each tower stands distinct—bathed in natural light, embraced by greenery, and thoughtfully elevated to offer a refined, tranquil living experience.
              </p>

              <div className="eldeco-stats-cards">
                <div className="eldeco-stat-card">
                  <span className="eldeco-stat-num">4 Units</span>
                  <p className="eldeco-stat-desc">Per floor with 3-side open expansive layout</p>
                </div>
                <div className="eldeco-stat-card">
                  <span className="eldeco-stat-num">4 Pools</span>
                  <p className="eldeco-stat-desc">Lap, tropical, heated & kids’ sand beach pool</p>
                </div>
                <div className="eldeco-stat-card">
                  <span className="eldeco-stat-num">28 Cutouts</span>
                  <p className="eldeco-stat-desc">Basement cutouts ensuring natural ventilation & light</p>
                </div>
                <div className="eldeco-stat-card">
                  <span className="eldeco-stat-num">3 + 1 Lifts</span>
                  <p className="eldeco-stat-desc">High-speed passenger lifts + 1 dedicated service lift</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button 
                  className="eldeco-btn-primary"
                  onClick={() => openEnquiryModal('Download Detailed Specifications Document')}
                >
                  <Download size={16} /> Request Detailed Project Specs
                </button>
                <button 
                  className="eldeco-btn-outline"
                  onClick={() => scrollToSection('pricing')}
                >
                  View Floor Plans
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          HIGHLIGHTS & SPECIFICATIONS SECTION (TABBED)
          ========================================================================== */}
      <section className="eldeco-section eldeco-section-offwhite" id="highlights">
        <div className="eldeco-container">
          <div className="eldeco-section-header">
            <span className="eldeco-section-badge">Exclusive Attributes</span>
            <h2 className="eldeco-section-title">Indulgence In The Rare</h2>
            <p className="eldeco-section-sub">
              Carefully engineered planning principles designed for complete privacy, maximum natural ventilation, and timeless luxury.
            </p>
          </div>

          <div className="eldeco-tabs-nav">
            <button 
              className={`eldeco-tab-btn ${activeHighlightTab === 'planning' ? 'active' : ''}`}
              onClick={() => setActiveHighlightTab('planning')}
            >
              Key Planning Features
            </button>
            <button 
              className={`eldeco-tab-btn ${activeHighlightTab === 'specs' ? 'active' : ''}`}
              onClick={() => setActiveHighlightTab('specs')}
            >
              Specifications & Finishes
            </button>
            <button 
              className={`eldeco-tab-btn ${activeHighlightTab === 'design' ? 'active' : ''}`}
              onClick={() => setActiveHighlightTab('design')}
            >
              Apartment Design Highlights
            </button>
          </div>

          {activeHighlightTab === 'planning' && (
            <div className="eldeco-tab-content-pane">
              <div className="eldeco-feature-list">
                <div className="eldeco-feature-item">
                  <div className="eldeco-feature-icon-box"><Compass size={22} /></div>
                  <div className="eldeco-feature-text">
                    <h4>3-Side Open Infinite Views</h4>
                    <p>Each floor features only 4 apartments, each oriented with 3 sides open for uninterrupted panoramic vistas and cross-ventilation.</p>
                  </div>
                </div>

                <div className="eldeco-feature-item">
                  <div className="eldeco-feature-icon-box"><Waves size={22} /></div>
                  <div className="eldeco-feature-text">
                    <h4>4 Themed Swimming Pools</h4>
                    <p>A full-length Lap Pool, Tropical Pool, All-Weather Heated Pool, and a specialized Kids' Pool with a real Sand Beach.</p>
                  </div>
                </div>

                <div className="eldeco-feature-item">
                  <div className="eldeco-feature-icon-box"><Building2 size={22} /></div>
                  <div className="eldeco-feature-text">
                    <h4>Wraparound Balconies</h4>
                    <p>Continuous wraparound sundecks capture dawn-to-dusk daylight and gentle cross-breezes across all primary rooms.</p>
                  </div>
                </div>

                <div className="eldeco-feature-item">
                  <div className="eldeco-feature-icon-box"><Trees size={22} /></div>
                  <div className="eldeco-feature-text">
                    <h4>Sunlit Basement with 28 Cutouts</h4>
                    <p>Specially engineered sunken ventilation shafts transform basement parking into a naturally illuminated, airy zone.</p>
                  </div>
                </div>
              </div>

              <div className="eldeco-tab-media">
                <img src="/Properties/Eldeco 7 Peaks/highlight.webp" alt="Key Planning Visual" />
                <span className="eldeco-media-tag">Planning Highlights • Eldeco 7 Peaks</span>
              </div>
            </div>
          )}

          {activeHighlightTab === 'specs' && (
            <div className="eldeco-tab-content-pane">
              <div className="eldeco-feature-list">
                <div className="eldeco-feature-item">
                  <div className="eldeco-feature-icon-box"><Wind size={22} /></div>
                  <div className="eldeco-feature-text">
                    <h4>VRV Air-Conditioning</h4>
                    <p>Energy-efficient VRV/VRF cooling installed across all bedrooms, living, and dining spaces for zoned climatic comfort.</p>
                  </div>
                </div>

                <div className="eldeco-feature-item">
                  <div className="eldeco-feature-icon-box"><Building2 size={22} /></div>
                  <div className="eldeco-feature-text">
                    <h4>Imported Stone & Laminated Wood</h4>
                    <p>Italian/imported stone flooring across grand living, dining, and kitchen areas, paired with warm laminated wooden flooring in bedrooms.</p>
                  </div>
                </div>

                <div className="eldeco-feature-item">
                  <div className="eldeco-feature-icon-box"><ShieldCheck size={22} /></div>
                  <div className="eldeco-feature-text">
                    <h4>Biometric Digital Lock & 8 Ft. Grand Doors</h4>
                    <p>8-foot high grand internal and main entrance doors equipped with cutting-edge keyless biometric digital smart lock access.</p>
                  </div>
                </div>

                <div className="eldeco-feature-item">
                  <div className="eldeco-feature-icon-box"><CheckCircle size={22} /></div>
                  <div className="eldeco-feature-text">
                    <h4>Designer Countertops & Premium Fixtures</h4>
                    <p>Stone-finished kitchen counter with double-hole sink and premium European sanitaryware and CP fittings.</p>
                  </div>
                </div>
              </div>

              <div className="eldeco-tab-media">
                <img src="/Properties/Eldeco 7 Peaks/images-01.webp" alt="Interior Specifications" />
                <span className="eldeco-media-tag">Ultra Luxury Specifications</span>
              </div>
            </div>
          )}

          {activeHighlightTab === 'design' && (
            <div className="eldeco-tab-content-pane">
              <div className="eldeco-feature-list">
                <div className="eldeco-feature-item">
                  <div className="eldeco-feature-icon-box"><ShieldCheck size={22} /></div>
                  <div className="eldeco-feature-text">
                    <h4>Absolute Visual Privacy</h4>
                    <p>No two apartments overlook each other, ensuring tranquil seclusion and uninterrupted peace for every family.</p>
                  </div>
                </div>

                <div className="eldeco-feature-item">
                  <div className="eldeco-feature-icon-box"><Compass size={22} /></div>
                  <div className="eldeco-feature-text">
                    <h4>Segregated Private & Public Zones</h4>
                    <p>Exclusive entrance foyer separates guest hosting spaces from quiet, private bedroom sanctums.</p>
                  </div>
                </div>

                <div className="eldeco-feature-item">
                  <div className="eldeco-feature-icon-box"><Building2 size={22} /></div>
                  <div className="eldeco-feature-text">
                    <h4>Pillar-Free Clean Living Spaces</h4>
                    <p>Maximum structural pillars positioned on outer perimeters, creating seamless room dimensions and clean interior geometry.</p>
                  </div>
                </div>

                <div className="eldeco-feature-item">
                  <div className="eldeco-feature-icon-box"><Crown size={22} /></div>
                  <div className="eldeco-feature-text">
                    <h4>Exclusive Top-Floor Penthouses</h4>
                    <p>Duplex penthouse residences featuring internal private stairs to dedicated rooftop sky terraces.</p>
                  </div>
                </div>
              </div>

              <div className="eldeco-tab-media">
                <img src="/Properties/Eldeco 7 Peaks/apartment-design.webp" alt="Apartment Design Visual" />
                <span className="eldeco-media-tag">Architectural Layout • Visual Privacy</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ==========================================================================
          AMENITIES SECTION
          ========================================================================== */}
      <section className="eldeco-section eldeco-section-white" id="amenities">
        <div className="eldeco-container">
          <div className="eldeco-section-header">
            <span className="eldeco-section-badge">Resort-Class Amenities</span>
            <h2 className="eldeco-section-title">Quiet Luxury Living Surrounded By Greens</h2>
            <p className="eldeco-section-sub">
              More than 14 curated health, leisure, and athletic sanctuaries crafted into the master landscape.
            </p>
          </div>

          <div className="eldeco-amenities-grid">
            <div className="eldeco-amenity-card">
              <div className="eldeco-amenity-icon"><Waves size={26} /></div>
              <h4 className="eldeco-amenity-title">4 Swimming Pools</h4>
              <p className="eldeco-amenity-desc">Lap Pool, Tropical Leisure Pool, Heated Pool & Sand Beach Kids' Pool</p>
            </div>

            <div className="eldeco-amenity-card">
              <div className="eldeco-amenity-icon"><Activity size={26} /></div>
              <h4 className="eldeco-amenity-title">Skating Circuit</h4>
              <p className="eldeco-amenity-desc">Dedicated smooth-glide outdoor roller skating circuit</p>
            </div>

            <div className="eldeco-amenity-card">
              <div className="eldeco-amenity-icon"><Trees size={26} /></div>
              <h4 className="eldeco-amenity-title">Scenic Cycling Track</h4>
              <p className="eldeco-amenity-desc">Greenery-flanked tree-lined jogging and cycling pathway</p>
            </div>

            <div className="eldeco-amenity-card">
              <div className="eldeco-amenity-icon"><CheckCircle size={26} /></div>
              <h4 className="eldeco-amenity-title">Senior Citizen Garden</h4>
              <p className="eldeco-amenity-desc">Quiet reflexology pathways and shaded relaxation pavilions</p>
            </div>

            <div className="eldeco-amenity-card">
              <div className="eldeco-amenity-icon"><Building2 size={26} /></div>
              <h4 className="eldeco-amenity-title">Kids Adventure Play Area</h4>
              <p className="eldeco-amenity-desc">Safe rubberized flooring, play installations, and sand pit</p>
            </div>

            <div className="eldeco-amenity-card">
              <div className="eldeco-amenity-icon"><Compass size={26} /></div>
              <h4 className="eldeco-amenity-title">Multipurpose Court</h4>
              <p className="eldeco-amenity-desc">All-weather court for tennis, volleyball, and community matches</p>
            </div>

            <div className="eldeco-amenity-card">
              <div className="eldeco-amenity-icon"><Trophy size={26} /></div>
              <h4 className="eldeco-amenity-title">Indoor Sports & Billiards</h4>
              <p className="eldeco-amenity-desc">Clubhouse pool table, table tennis, and board game lounge</p>
            </div>

            <div className="eldeco-amenity-card">
              <div className="eldeco-amenity-icon"><Building2 size={26} /></div>
              <h4 className="eldeco-amenity-title">Open Gym & Fitness Club</h4>
              <p className="eldeco-amenity-desc">State-of-the-art cardio and weight training equipment</p>
            </div>

            <div className="eldeco-amenity-card">
              <div className="eldeco-amenity-icon"><Compass size={26} /></div>
              <h4 className="eldeco-amenity-title">Badminton Court</h4>
              <p className="eldeco-amenity-desc">Dedicated regulation court with anti-skid surface</p>
            </div>

            <div className="eldeco-amenity-card">
              <div className="eldeco-amenity-icon"><Target size={26} /></div>
              <h4 className="eldeco-amenity-title">Basketball Half-Court</h4>
              <p className="eldeco-amenity-desc">Professional-grade hoops and perimeter fencing</p>
            </div>

            <div className="eldeco-amenity-card">
              <div className="eldeco-amenity-icon"><ShieldCheck size={26} /></div>
              <h4 className="eldeco-amenity-title">24/7 CCTV & 5-Tier Security</h4>
              <p className="eldeco-amenity-desc">Gated perimeter with smart biometric barriers and guard patrols</p>
            </div>

            <div className="eldeco-amenity-card">
              <div className="eldeco-amenity-icon"><Trees size={26} /></div>
              <h4 className="eldeco-amenity-title">Open Amphitheatre</h4>
              <p className="eldeco-amenity-desc">Tiered open-sky cultural venue for community gatherings</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          PRICING & CONFIGURATIONS SECTION
          ========================================================================== */}
      <section className="eldeco-section eldeco-section-offwhite" id="pricing">
        <div className="eldeco-container">
          <div className="eldeco-section-header">
            <span className="eldeco-section-badge">Transparent Pricing</span>
            <h2 className="eldeco-section-title">Our Price List & Configurations</h2>
            <p className="eldeco-section-sub">
              Limited-period pre-launch pricing directly from the promoter. Flexible payment schedules available.
            </p>
          </div>

          <div className="eldeco-pricing-grid">
            
            {/* 3 BR Card */}
            <div className="eldeco-pricing-card featured">
              <span className="eldeco-pricing-badge">Most Preferred Choice</span>
              <h3 className="eldeco-card-type">3 BR Oxy-Rich Residences</h3>
              <span className="eldeco-card-tag">3 Beds + Living + Dining + Wraparound Decks</span>

              <div className="eldeco-price-box">
                <span className="eldeco-price-lbl">Starting Price</span>
                <div className="eldeco-price-val">₹ 2.37 Cr*</div>
              </div>

              <ul className="eldeco-specs-list">
                <li className="eldeco-spec-item"><CheckCircle size={16} /> <span>3-Side Open Infinite Sky Views</span></li>
                <li className="eldeco-spec-item"><CheckCircle size={16} /> <span>VRV Air-Conditioning in all rooms</span></li>
                <li className="eldeco-spec-item"><CheckCircle size={16} /> <span>Imported Stone Living/Dining flooring</span></li>
                <li className="eldeco-spec-item"><CheckCircle size={16} /> <span>Sunlit Wraparound Private Balcony</span></li>
                <li className="eldeco-spec-item"><CheckCircle size={16} /> <span>Biometric Smart Digital Entrance</span></li>
              </ul>

              <button 
                className="eldeco-btn-primary"
                style={{ width: '100%' }}
                onClick={() => openEnquiryModal('Enquire for 3 BR Oxy-Rich Price Breakup')}
              >
                Enquire Now / Get Cost Sheet
              </button>
            </div>

            {/* 4 BR Card */}
            <div className="eldeco-pricing-card">
              <h3 className="eldeco-card-type">4 BR Oxy-Rich Residences</h3>
              <span className="eldeco-card-tag">4 Beds + Family Lounge + Servant Quarters</span>

              <div className="eldeco-price-box">
                <span className="eldeco-price-lbl">Starting Price</span>
                <div className="eldeco-price-val">₹ On Request</div>
              </div>

              <ul className="eldeco-specs-list">
                <li className="eldeco-spec-item"><CheckCircle size={16} /> <span>Expansive Living & Dining Salon</span></li>
                <li className="eldeco-spec-item"><CheckCircle size={16} /> <span>Master Suite with Walk-In Wardrobe</span></li>
                <li className="eldeco-spec-item"><CheckCircle size={16} /> <span>Large Separate Service Balcony</span></li>
                <li className="eldeco-spec-item"><CheckCircle size={16} /> <span>Sweeping Unobstructed Plotted Views</span></li>
                <li className="eldeco-spec-item"><CheckCircle size={16} /> <span>2 Dedicated Covered Stilt Parkings</span></li>
              </ul>

              <button 
                className="eldeco-btn-primary"
                style={{ width: '100%' }}
                onClick={() => openEnquiryModal('Enquire for 4 BR Oxy-Rich Pricing & Floor Plan')}
              >
                Request Exclusive Price
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================================================
          MASTER PLAN / SITE LAYOUT
          ========================================================================== */}
      <section className="eldeco-section eldeco-section-white" id="siteplan">
        <div className="eldeco-container">
          <div className="eldeco-section-header">
            <span className="eldeco-section-badge">Master Layout</span>
            <h2 className="eldeco-section-title">Master Site Plan</h2>
            <p className="eldeco-section-sub">
              An intelligently master-planned low-density enclave in Omicron 1A designed with central green spines and pedestrian safety.
            </p>
          </div>

          <div className="eldeco-siteplan-wrapper">
            <div 
              className="eldeco-siteplan-image-box"
              onClick={() => setLightboxImage('/Properties/Eldeco 7 Peaks/site-plan-img.webp')}
            >
              <img 
                src="/Properties/Eldeco 7 Peaks/site-plan-img.webp" 
                alt="Eldeco 7 Peaks Master Site Plan" 
              />
              <span className="eldeco-zoom-badge">
                <Maximize2 size={13} /> Click to Enlarge
              </span>
            </div>

            <div className="eldeco-siteplan-info">
              <h3 style={{ fontFamily: 'var(--e-font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--e-text-title)', marginBottom: '1rem' }}>
                Conscious Low-Density Architecture
              </h3>
              <p style={{ color: 'var(--e-text-muted)', lineHeight: '1.65', marginBottom: '1.5rem', fontSize: '0.94rem' }}>
                The 7 Towers are arranged in an aerodynamic configuration to prevent wind shear, maximize daylight hours, and guarantee private viewing corridors over surrounding plotted greens.
              </p>

              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
                <li className="eldeco-spec-item"><CheckCircle size={16} /> <span>Vehicular-free surface recreation zone</span></li>
                <li className="eldeco-spec-item"><CheckCircle size={16} /> <span>Dedicated ingress & egress points with RFID</span></li>
                <li className="eldeco-spec-item"><CheckCircle size={16} /> <span>Central water body & pool deck pavilion</span></li>
                <li className="eldeco-spec-item"><CheckCircle size={16} /> <span>Peripheral jogging track and lush tree borders</span></li>
              </ul>

              <button 
                className="eldeco-btn-primary"
                onClick={() => openEnquiryModal('Request High-Resolution Master Plan & PDF')}
              >
                <Download size={16} /> Request High-Res Site Plan PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          LOCATION ADVANTAGES
          ========================================================================== */}
      <section className="eldeco-section eldeco-section-offwhite" id="location">
        <div className="eldeco-container">
          <div className="eldeco-section-header">
            <span className="eldeco-section-badge">Strategic Connectivity</span>
            <h2 className="eldeco-section-title">An Address That Connects</h2>
            <p className="eldeco-section-sub">
              Strategically placed in Omicron 1A, Greater Noida with immediate arterial access to expressways, metro hubs, and international infrastructure.
            </p>
          </div>

          <div className="eldeco-location-grid">
            <div className="eldeco-location-card">
              <div className="eldeco-loc-left">
                <div className="eldeco-loc-icon"><Building2 size={20} /></div>
                <div>
                  <div className="eldeco-loc-name">Fortis Hospital</div>
                  <div className="eldeco-loc-category">Healthcare & Emergency</div>
                </div>
              </div>
              <div className="eldeco-loc-distance">4.0 Km</div>
            </div>

            <div className="eldeco-location-card">
              <div className="eldeco-loc-left">
                <div className="eldeco-loc-icon"><Building2 size={20} /></div>
                <div>
                  <div className="eldeco-loc-name">Radisson Blu Hotel</div>
                  <div className="eldeco-loc-category">5-Star Hospitality & Dining</div>
                </div>
              </div>
              <div className="eldeco-loc-distance">4.5 Km</div>
            </div>

            <div className="eldeco-location-card">
              <div className="eldeco-loc-left">
                <div className="eldeco-loc-icon"><MapPin size={20} /></div>
                <div>
                  <div className="eldeco-loc-name">Delta 1 Metro Station</div>
                  <div className="eldeco-loc-category">Aqua Line Rapid Transit</div>
                </div>
              </div>
              <div className="eldeco-loc-distance">6.0 Km</div>
            </div>

            <div className="eldeco-location-card">
              <div className="eldeco-loc-left">
                <div className="eldeco-loc-icon"><Compass size={20} /></div>
                <div>
                  <div className="eldeco-loc-name">Yamuna Expressway</div>
                  <div className="eldeco-loc-category">Agra & Jewar Corridor</div>
                </div>
              </div>
              <div className="eldeco-loc-distance">7.0 Km</div>
            </div>

            <div className="eldeco-location-card">
              <div className="eldeco-loc-left">
                <div className="eldeco-loc-icon"><Compass size={20} /></div>
                <div>
                  <div className="eldeco-loc-name">Noida - Greater Noida Expy</div>
                  <div className="eldeco-loc-category">High-Speed Transit Artery</div>
                </div>
              </div>
              <div className="eldeco-loc-distance">7.0 Km</div>
            </div>

            <div className="eldeco-location-card">
              <div className="eldeco-loc-left">
                <div className="eldeco-loc-icon"><MapPin size={20} /></div>
                <div>
                  <div className="eldeco-loc-name">Pari Chowk Metro Station</div>
                  <div className="eldeco-loc-category">Commercial & Retail Hub</div>
                </div>
              </div>
              <div className="eldeco-loc-distance">7.7 Km</div>
            </div>

            <div className="eldeco-location-card">
              <div className="eldeco-loc-left">
                <div className="eldeco-loc-icon"><Building2 size={20} /></div>
                <div>
                  <div className="eldeco-loc-name">Jaypee Cricket Stadium</div>
                  <div className="eldeco-loc-category">Sports & Entertainment</div>
                </div>
              </div>
              <div className="eldeco-loc-distance">17.3 Km</div>
            </div>

            <div className="eldeco-location-card">
              <div className="eldeco-loc-left">
                <div className="eldeco-loc-icon"><Building2 size={20} /></div>
                <div>
                  <div className="eldeco-loc-name">Buddh International Circuit</div>
                  <div className="eldeco-loc-category">F1 World Racing Track</div>
                </div>
              </div>
              <div className="eldeco-loc-distance">17.5 Km</div>
            </div>

            <div className="eldeco-location-card">
              <div className="eldeco-loc-left">
                <div className="eldeco-loc-icon"><Compass size={20} /></div>
                <div>
                  <div className="eldeco-loc-name">DND Flyway</div>
                  <div className="eldeco-loc-category">Direct Access to South Delhi</div>
                </div>
              </div>
              <div className="eldeco-loc-distance">36.0 Km</div>
            </div>

            <div className="eldeco-location-card">
              <div className="eldeco-loc-left">
                <div className="eldeco-loc-icon"><Compass size={20} /></div>
                <div>
                  <div className="eldeco-loc-name">Noida International Airport (Jewar)</div>
                  <div className="eldeco-loc-category">Upcoming Global Aviation Gate</div>
                </div>
              </div>
              <div className="eldeco-loc-distance">40.0 Km</div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button 
              className="eldeco-btn-primary"
              onClick={() => openEnquiryModal('Schedule Free Site Visit with Chauffeur Facility')}
            >
              <Calendar size={16} /> Schedule Site Visit with Cab Facility
            </button>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          GALLERY SECTION
          ========================================================================== */}
      <section className="eldeco-section eldeco-section-white" id="gallery">
        <div className="eldeco-container">
          <div className="eldeco-section-header">
            <span className="eldeco-section-badge">Visual Showcase</span>
            <h2 className="eldeco-section-title">Experience The Architecture</h2>
            <p className="eldeco-section-sub">
              Browse actual renders and architectural elevations showcasing life at Eldeco 7 Peak Residences.
            </p>
          </div>

          <div className="eldeco-gallery-tabs">
            <button 
              className={`eldeco-tab-btn ${galleryTab === 'all' ? 'active' : ''}`}
              onClick={() => setGalleryTab('all')}
            >
              All Visuals
            </button>
            <button 
              className={`eldeco-tab-btn ${galleryTab === 'exterior' ? 'active' : ''}`}
              onClick={() => setGalleryTab('exterior')}
            >
              Exteriors & Landscapes
            </button>
            <button 
              className={`eldeco-tab-btn ${galleryTab === 'interior' ? 'active' : ''}`}
              onClick={() => setGalleryTab('interior')}
            >
              Interior Living Spaces
            </button>
          </div>

          <div className="eldeco-gallery-grid">
            {filteredGallery.map((item) => (
              <div 
                key={item.id} 
                className="eldeco-gallery-item"
                onClick={() => setLightboxImage(item.src)}
              >
                <img src={item.src} alt={item.title} loading="lazy" />
                <div className="eldeco-gallery-overlay">
                  <span className="eldeco-gallery-caption">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
          DEVELOPER HERITAGE SECTION
          ========================================================================== */}
      <section className="eldeco-section eldeco-section-offwhite" id="developer">
        <div className="eldeco-container">
          <div className="eldeco-builder-box">
            <span className="eldeco-section-badge">Developer Legacy</span>
            <h2 style={{ fontFamily: 'var(--e-font-heading)', fontSize: '2.2rem', fontWeight: 800, color: 'var(--e-text-title)', marginBottom: '1rem' }}>
              The Eldeco Group Legacy
            </h2>
            <p style={{ maxWidth: '850px', margin: '0 auto', color: 'var(--e-text-muted)', lineHeight: '1.7', fontSize: '0.98rem' }}>
              The Eldeco Group has been at the forefront of Real Estate development since 1985. Synonymous with timely and quality delivery across 20 cities in North India, handing over 200+ landmark projects spanning large-format integrated townships, high-rise condominiums, and commercial centers.
            </p>

            <div className="eldeco-builder-stats">
              <div>
                <div className="eldeco-builder-stat-val">40+</div>
                <div className="eldeco-builder-stat-lbl">Years of Trust</div>
              </div>
              <div>
                <div className="eldeco-builder-stat-val">20+</div>
                <div className="eldeco-builder-stat-lbl">Major Cities</div>
              </div>
              <div>
                <div className="eldeco-builder-stat-val">200+</div>
                <div className="eldeco-builder-stat-lbl">Delivered Projects</div>
              </div>
              <div>
                <div className="eldeco-builder-stat-val">30,000+</div>
                <div className="eldeco-builder-stat-lbl">Happy Families</div>
              </div>
              <div>
                <div className="eldeco-builder-stat-val">30M+</div>
                <div className="eldeco-builder-stat-lbl">Sq.Ft Delivered</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================================================
          BOTTOM HIGH-CONVERTING CTA SECTION
          ========================================================================== */}
      <section className="eldeco-section eldeco-section-light">
        <div className="eldeco-container">
          <div className="eldeco-leadgen-card">
            <div>
              <span className="eldeco-section-badge">Exclusive Booking Window</span>
              <h2>
                Secure Your Home Amidst Unobstructed Greens
              </h2>
              <p>
                Receive immediate confirmation on pricing, unit availability, tower payment schedules, and bank home loan pre-approvals.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                <div className="eldeco-spec-item"><CheckCircle size={18} /> <span>Direct Builder Allocation Privileges</span></div>
                <div className="eldeco-spec-item"><CheckCircle size={18} /> <span>Complimentary Site Visit with AC Cab Facility</span></div>
                <div className="eldeco-spec-item"><CheckCircle size={18} /> <span>Tailored Flexible Construction-Linked Plans</span></div>
              </div>

              <div style={{ marginTop: '2.5rem' }}>
                <a href="tel:+919999888990" className="eldeco-call-btn" style={{ padding: '0.85rem 1.8rem' }}>
                  <Phone size={17} /> <span>Speak to Sales Specialist: +91 99998 88990</span>
                </a>
              </div>
            </div>

            <div className="eldeco-leadgen-form-box">
              <h3 className="eldeco-form-title" style={{ textAlign: 'left', marginBottom: '0.35rem' }}>
                Request Instant Callback
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--e-text-muted)', marginBottom: '1.4rem' }}>
                Enter your details to receive project documentation instantly
              </p>

              {isSuccess ? (
                <div className="eldeco-success-box">
                  <div className="eldeco-success-icon"><CheckCircle size={36} /></div>
                  <h4 className="eldeco-success-title">Thank You!</h4>
                  <p className="eldeco-success-desc">
                    Your enquiry has been received. Our project specialist will connect with you right away.
                  </p>
                  <button 
                    className="eldeco-btn-outline" 
                    onClick={resetForm}
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form className="eldeco-form" onSubmit={handleFormSubmit}>
                  <div className="eldeco-form-group">
                    <input 
                      type="text" 
                      name="name" 
                      className="eldeco-input" 
                      placeholder="Your Full Name *" 
                      value={formData.name}
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="eldeco-form-group">
                    <input 
                      type="email" 
                      name="email" 
                      className="eldeco-input" 
                      placeholder="Email Address *" 
                      value={formData.email}
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="eldeco-form-group">
                    <input 
                      type="tel" 
                      name="phone" 
                      className="eldeco-input" 
                      placeholder="Contact Number *" 
                      value={formData.phone}
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="eldeco-form-group">
                    <input 
                      type="text" 
                      name="message" 
                      className="eldeco-input" 
                      placeholder="Your Message *" 
                      value={formData.message}
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="eldeco-form-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                    <Send size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          STANDALONE CAMPAIGN DISCLAIMER & FOOTER
          (Strictly isolated: No links to main site navigation)
          ========================================================================== */}
      <footer className="eldeco-campaign-footer">
        <div className="eldeco-container">
          <p className="eldeco-disclaimer-text">
            <strong>Disclaimer:</strong> The content, images, architectural representations, and specifications depicted in this advertisement are solely artistic impressions for illustrative purposes and do not constitute a legal offer, guarantee, or legally binding agreement. The promoter clarifications indicate that details provided herein are indicative. Intending purchasers are advised to verify all project approvals, dimensions, floor layouts, terms of sale, and payment schedules independently with the respective sales team before concluding any purchase decision. Authorized Channel Partner: EUD Group.
          </p>

          <div className="eldeco-footer-bottom">
            <div>
              © 2026 Eldeco 7 Peak Residences | EUD Group
            </div>
            <div className="eldeco-footer-links">
              <a href="#hero" onClick={(e) => { e.preventDefault(); openEnquiryModal('Privacy Policy & Terms'); }}>
                Privacy Policy
              </a>
              <a href="#hero" onClick={(e) => { e.preventDefault(); openEnquiryModal('RERA Compliance Details'); }}>
                RERA Compliance
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ==========================================================================
          STICKY MOBILE BOTTOM BAR
          ========================================================================== */}
      <div className="eldeco-mobile-bar">
        <div className="eldeco-mobile-bar-inner">
          <a href="tel:+919999888990" className="eldeco-mobile-call-btn">
            <Phone size={16} />
            <span>Call Now</span>
          </a>
          <button 
            className="eldeco-mobile-enquire-btn"
            onClick={() => openEnquiryModal('Instant Callback - Eldeco 7 Peaks')}
          >
            <Send size={15} />
            <span>Enquire Now</span>
          </button>
        </div>
      </div>

      {/* ==========================================================================
          LEAD GENERATION POPUP MODAL
          ========================================================================== */}
      {isModalOpen && (
        <div className="eldeco-modal-backdrop" onClick={() => { setIsModalOpen(false); if (isSuccess) resetForm(); }}>
          <div className="eldeco-modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="eldeco-modal-close" onClick={() => { setIsModalOpen(false); if (isSuccess) resetForm(); }}>
              <X size={20} />
            </button>

            {isSuccess ? (
              <div className="eldeco-success-box">
                <div className="eldeco-success-icon"><CheckCircle size={38} /></div>
                <h4 className="eldeco-success-title">Enquiry Received!</h4>
                <p className="eldeco-success-desc">
                  Thank you for your interest in Eldeco 7 Peak Residences. Our project consultant will send the brochure, price breakup, and floor plans to your contact details immediately.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%' }}>
                  <button 
                    className="eldeco-btn-primary" 
                    style={{ width: '100%' }}
                    onClick={() => {
                      setIsModalOpen(false);
                      resetForm();
                    }}
                  >
                    Close Window
                  </button>
                  <button 
                    className="eldeco-btn-outline" 
                    style={{ width: '100%' }}
                    onClick={resetForm}
                  >
                    Submit Another Query
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="eldeco-form-header">
                  <span className="eldeco-form-badge">Exclusive Campaign Access</span>
                  <h3 className="eldeco-form-title">{modalTitle}</h3>
                  <p className="eldeco-form-sub">Direct Project Floor Plans, Price Sheet & Special Payment Plans</p>
                </div>

                <form className="eldeco-form" onSubmit={handleFormSubmit}>
                  <div className="eldeco-form-group">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      className="eldeco-input" 
                      placeholder="Enter your name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>

                  <div className="eldeco-form-group">
                    <label>Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      className="eldeco-input" 
                      placeholder="name@example.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>

                  <div className="eldeco-form-group">
                    <label>Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      className="eldeco-input" 
                      placeholder="+91 98765 43210" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>

                  <div className="eldeco-form-group">
                    <label>Message *</label>
                    <input 
                      type="text" 
                      name="message" 
                      className="eldeco-input" 
                      placeholder="Your message or query" 
                      value={formData.message}
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="eldeco-form-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                    <Send size={15} />
                  </button>

                  <div className="eldeco-form-guarantee">
                    <ShieldCheck size={14} color="var(--e-accent-gold)" />
                    <span>Your information is strictly confidential • Authorized Partner</span>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ==========================================================================
          IMAGE LIGHTBOX MODAL
          ========================================================================== */}
      {lightboxImage && (
        <div className="eldeco-modal-backdrop" onClick={() => setLightboxImage(null)}>
          <div className="eldeco-lightbox-box" onClick={(e) => e.stopPropagation()}>
            <button className="eldeco-modal-close" onClick={() => setLightboxImage(null)}>
              <X size={20} />
            </button>
            <img src={lightboxImage} alt="Project Visual Preview" className="eldeco-lightbox-img" />
          </div>
        </div>
      )}

    </div>
  );
}
