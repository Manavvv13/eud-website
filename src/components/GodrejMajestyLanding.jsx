import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Target,
  Sparkles,
  ArrowRight,
  Clock,
  Layers,
  FileText
} from 'lucide-react';
import './GodrejMajestyLanding.css';

// Google Apps Script Web App URL for Godrej Majesty lead capture
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx1uCP8sB5T6Mc6SHtc1l6cWWgSyouYP5c7l0EJ_9_XoZZQ7qgYgmK4TAQJDu61TXiF/exec';

export default function GodrejMajestyLanding() {
  const navigate = useNavigate();

  // Navigation & Scroll states
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Tab states
  const [activeHighlightTab, setActiveHighlightTab] = useState('features'); // 'features' | 'interiors' | 'community'
  const [galleryTab, setGalleryTab] = useState('all'); // 'all' | 'exterior' | 'interior'

  // Modal & Lightbox states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Get Price & Availability');
  const [lightboxImage, setLightboxImage] = useState(null);

  // Form states (Hero & Modal shared logic)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    configuration: '3 BHK + S',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // SEO & Head tag management
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Godrej Majesty Sector 12 Greater Noida West | 3 & 4 BHK Luxury Residences';

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

  const openEnquiryModal = (title = 'Get Price & Availability') => {
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e, source = 'Hero Form') => {
    e.preventDefault();
    setIsSubmitting(true);

    const submissionPayload = {
      project: 'Godrej Majesty Sector 12',
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      configuration: formData.configuration,
      message: formData.message || `Enquiry submitted via ${source}`,
      source: source,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    try {
      if (GOOGLE_APPS_SCRIPT_URL) {
        await fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify(submissionPayload)
        });
      }
    } catch (err) {
      console.warn('Google Sheet dispatch error or offline:', err);
    } finally {
      setIsSubmitting(false);
      // Navigate to dedicated confirmation page
      navigate('/godrej-majesty-confirmation', {
        state: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          project: 'Godrej Majesty'
        }
      });
    }
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Gallery items linked to downloaded high-res visuals
  const galleryItems = [
    { id: 1, type: 'exterior', title: 'Grand Entrance & Arrival Gate', tag: 'Architecture', image: '/godrej/gallery-1.png' },
    { id: 2, type: 'interior', title: 'Designer Master Bedroom Suite', tag: 'Master Suite', image: '/godrej/gallery-2.png' },
    { id: 3, type: 'interior', title: 'Clubhouse & Resident Lounge', tag: 'Clubhouse', image: '/godrej/gallery-3.png' },
    { id: 4, type: 'exterior', title: 'Landscaped Central Greens & Waterway', tag: 'Landscape', image: '/godrej/gallery-4.png' },
    { id: 5, type: 'interior', title: 'State-of-the-Art Fitness Center', tag: 'Gymnasium', image: '/godrej/gallery-5.png' },
    { id: 6, type: 'exterior', title: 'Resort Style Lap Pool & Sunset Deck', tag: 'Swimming Pool', image: '/godrej/gallery-6.png' },
    { id: 7, type: 'interior', title: 'Expansive Living & Dining Lounge', tag: 'Living & Dining', image: '/godrej/gallery-7.png' },
    { id: 8, type: 'exterior', title: 'Outdoor Gazebo & Evening Seating', tag: 'Garden Gazebo', image: '/godrej/gallery-8.png' }
  ];

  const filteredGallery = galleryTab === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.type === galleryTab);

  return (
    <div className="godrej-landing-root">
      
      {/* ==========================================================================
          HEADER / NAVBAR (STANDALONE LUXURY DARK)
          ========================================================================== */}
      <header className={`godrej-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="godrej-header-inner">
          <div className="godrej-brand">
            <img 
              src="/EUD_Logo_clean.png" 
              alt="EUD Group" 
              className="godrej-brand-img"
            />
          </div>

          <nav className="godrej-desktop-nav">
            <ul className="godrej-nav-links">
              <li><a href="#overview" onClick={(e) => { e.preventDefault(); scrollToSection('overview'); }} className="godrej-nav-link">Overview</a></li>
              <li><a href="#highlights" onClick={(e) => { e.preventDefault(); scrollToSection('highlights'); }} className="godrej-nav-link">Highlights</a></li>
              <li><a href="#payment-plan" onClick={(e) => { e.preventDefault(); scrollToSection('payment-plan'); }} className="godrej-nav-link">Payment Plan</a></li>
              <li><a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }} className="godrej-nav-link">Pricing</a></li>
              <li><a href="#floor-plans" onClick={(e) => { e.preventDefault(); scrollToSection('floor-plans'); }} className="godrej-nav-link">Floor Plans</a></li>
              <li><a href="#amenities" onClick={(e) => { e.preventDefault(); scrollToSection('amenities'); }} className="godrej-nav-link">Amenities</a></li>
              <li><a href="#location" onClick={(e) => { e.preventDefault(); scrollToSection('location'); }} className="godrej-nav-link">Location</a></li>
            </ul>
          </nav>

          <div className="godrej-header-actions">
            <a href="tel:+919999888990" className="godrej-call-btn">
              <Phone size={15} />
              <span>+91 99998 88990</span>
            </a>
            <button 
              className="godrej-btn-primary" 
              onClick={() => openEnquiryModal('Get Price & Availability')}
            >
              Enquire Now
            </button>
            <button 
              className="godrej-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`godrej-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#overview" onClick={(e) => { e.preventDefault(); scrollToSection('overview'); }} className="godrej-nav-link">Overview</a>
          <a href="#highlights" onClick={(e) => { e.preventDefault(); scrollToSection('highlights'); }} className="godrej-nav-link">Highlights</a>
          <a href="#payment-plan" onClick={(e) => { e.preventDefault(); scrollToSection('payment-plan'); }} className="godrej-nav-link">30:70 Payment Plan</a>
          <a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }} className="godrej-nav-link">Pricing & Configurations</a>
          <a href="#floor-plans" onClick={(e) => { e.preventDefault(); scrollToSection('floor-plans'); }} className="godrej-nav-link">Master & Floor Plans</a>
          <a href="#amenities" onClick={(e) => { e.preventDefault(); scrollToSection('amenities'); }} className="godrej-nav-link">Amenities</a>
          <a href="#location" onClick={(e) => { e.preventDefault(); scrollToSection('location'); }} className="godrej-nav-link">Location Advantages</a>
          <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.8rem' }}>
            <a href="tel:+919999888990" className="godrej-call-btn" style={{ width: '100%', justifyContent: 'center' }}>
              <Phone size={15} /> <span>Call Now</span>
            </a>
          </div>
        </div>
      </header>

      {/* ==========================================================================
          FULL-SCREEN CINEMATIC HERO BANNER
          ========================================================================== */}
      <section className="godrej-fullscreen-hero" id="hero">
        <div className="godrej-banner-frame">
          {/* Desktop & Tablet Hero Image (16:9 Landscape) */}
          <img 
            src="/GODREJMAJESTY_16x9.webp" 
            alt="Godrej Majesty Sector 12 Greater Noida West - 16:9 Landscape"
            className="godrej-fullscreen-img godrej-hero-desktop"
          />

          {/* Mobile Hero Image (9:16 Portrait) */}
          <img 
            src="/GODREJMAJESTY_9x16.webp" 
            alt="Godrej Majesty Sector 12 Greater Noida West - 9:16 Mobile"
            className="godrej-fullscreen-img godrej-hero-mobile"
          />

          {/* Floating Form Overlay on Left Side (Desktop & Tablet) */}
          <div className="godrej-hero-floating-card-wrap">
            <div className="godrej-floating-form-card">
              <div className="godrej-form-header">
                <h3 className="godrej-form-heading">Get Price &amp; Availability</h3>
              </div>

              <form onSubmit={(e) => handleFormSubmit(e, 'Hero Floating Form')} className="godrej-lead-form">
                <div className="godrej-form-group">
                  <label>Name *</label>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Enter your name" 
                    required 
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="godrej-form-group">
                  <label>Email *</label>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Enter your email" 
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="godrej-form-group">
                  <label>Phone Number *</label>
                  <div className="godrej-input-prefix">
                    <span className="godrej-prefix-tag">+91</span>
                    <input 
                      type="tel" 
                      name="phone" 
                      placeholder="Enter 10-digit number" 
                      required 
                      pattern="[0-9]{10}"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="godrej-form-group">
                  <label>Configuration</label>
                  <select 
                    name="configuration" 
                    value={formData.configuration}
                    onChange={handleInputChange}
                  >
                    <option value="3 BHK + S">3 BHK + S (2503 Sq.Ft)</option>
                    <option value="3 BHK + Study">3 BHK + Study (Duke Tower)</option>
                    <option value="4 BHK Luxury">4 BHK Luxury Residences</option>
                  </select>
                </div>

                <div className="godrej-form-group">
                  <label>Message</label>
                  <textarea 
                    name="message" 
                    rows="2"
                    placeholder="Any specific requirement (optional)" 
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="godrej-form-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Securing Details...' : 'Get Price & Availability'}
                  <Send size={15} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          MOBILE DEDICATED FORM SECTION (RENDERED IMMEDIATELY AFTER HERO ON MOBILE)
          ========================================================================== */}
      <section className="godrej-mobile-form-section">
        <div className="godrej-container">
          <div className="godrej-mobile-form-wrapper">
            <div className="godrej-form-header">
              <h3 className="godrej-form-heading">Get Price &amp; Availability</h3>
            </div>

            <form onSubmit={(e) => handleFormSubmit(e, 'Mobile Dedicated Form')} className="godrej-lead-form">
              <div className="godrej-form-group">
                <label>Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Enter your name" 
                  required 
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="godrej-form-group">
                <label>Email *</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Enter your email" 
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="godrej-form-group">
                <label>Phone Number *</label>
                <div className="godrej-input-prefix">
                  <span className="godrej-prefix-tag">+91</span>
                  <input 
                    type="tel" 
                    name="phone" 
                    placeholder="Enter 10-digit number" 
                    required 
                    pattern="[0-9]{10}"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="godrej-form-group">
                <label>Configuration</label>
                <select 
                  name="configuration" 
                  value={formData.configuration}
                  onChange={handleInputChange}
                >
                  <option value="3 BHK + S">3 BHK + S (2503 Sq.Ft)</option>
                  <option value="3 BHK + Study">3 BHK + Study (Duke Tower)</option>
                  <option value="4 BHK Luxury">4 BHK Luxury Residences</option>
                </select>
              </div>

              <div className="godrej-form-group">
                <label>Message</label>
                <textarea 
                  name="message" 
                  rows="2"
                  placeholder="Any specific requirement (optional)" 
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="godrej-form-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Securing Details...' : 'Get Price & Availability'}
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          KEY STATS / METRICS BANNER
          ========================================================================== */}
      <section className="godrej-stats-strip">
        <div className="godrej-container">
          <div className="godrej-stats-grid">
            <div className="godrej-stat-item">
              <span className="godrej-stat-value">₹3.56 Cr*</span>
              <span className="godrej-stat-label">Starting Price</span>
            </div>
            <div className="godrej-stat-item">
              <span className="godrej-stat-value">30 : 70</span>
              <span className="godrej-stat-label">Exclusive Payment Plan</span>
            </div>
            <div className="godrej-stat-item">
              <span className="godrej-stat-value">3 &amp; 4 BHK</span>
              <span className="godrej-stat-label">Ultra Luxury Residences</span>
            </div>
            <div className="godrej-stat-item">
              <span className="godrej-stat-value">Sector 12</span>
              <span className="godrej-stat-label">Greater Noida West</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 1: OVERVIEW & ARCHITECTURAL PHILOSOPHY
          ========================================================================== */}
      <section className="godrej-section godrej-overview-section" id="overview">
        <div className="godrej-container">
          <div className="godrej-section-head">
            <span className="godrej-section-kicker">ABOUT THE PROJECT</span>
            <h2 className="godrej-section-title">A New Standard of Luxury Living</h2>
            <div className="godrej-head-underline"></div>
            <p className="godrej-section-lead">
              Godrej Majesty in Sector 12, Greater Noida West offers premium 3 &amp; 4 BHK residences designed around modern architecture, landscaped surroundings, luxury amenities and convenient connectivity. Every residence is planned to bring together elegant design and everyday comfort, set within a high-rise gated community in one of Greater Noida West's most developing micro-markets.
            </p>
          </div>

          <div className="godrej-overview-cards-grid">
            <div className="godrej-overview-card">
              <div className="godrej-card-icon-wrap">
                <Crown size={28} />
              </div>
              <h3 className="godrej-card-title">Brand Heritage &amp; Trust</h3>
              <p className="godrej-card-desc">
                Developed by one of India's most recognized and respected real estate brands, ensuring superior construction quality, timely delivery, and clear legal title.
              </p>
            </div>

            <div className="godrej-overview-card">
              <div className="godrej-card-icon-wrap">
                <Trees size={28} />
              </div>
              <h3 className="godrej-card-title">Acres of Greenery</h3>
              <p className="godrej-card-desc">
                Immerse yourself in lush botanical gardens, butterfly conservatories, fragrance walks, and expansive open spaces designed for holistic health and serenity.
              </p>
            </div>

            <div className="godrej-overview-card">
              <div className="godrej-card-icon-wrap">
                <Building2 size={28} />
              </div>
              <h3 className="godrej-card-title">Iconic High-Rise Enclave</h3>
              <p className="godrej-card-desc">
                Magnificent towers with sky decks, all-glass balconies, and uninterrupted skyline views, engineered for optimal natural sunlight and ventilation.
              </p>
            </div>

            <div className="godrej-overview-card">
              <div className="godrej-card-icon-wrap">
                <Compass size={28} />
              </div>
              <h3 className="godrej-card-title">Sustainable IGBC Design</h3>
              <p className="godrej-card-desc">
                IGBC-certified green development featuring rainwater harvesting, solar illumination, EV charging stations, and energy-efficient building orientation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 2: PROJECT HIGHLIGHTS (GRID 2-2-2-2)
          ========================================================================== */}
      <section className="godrej-section godrej-highlights-section" id="highlights">
        <div className="godrej-container">
          <div className="godrej-section-head">
            <span className="godrej-section-kicker">THE RESIDENCE</span>
            <h2 className="godrej-section-title">Project Highlights</h2>
            <div className="godrej-head-underline"></div>
            <p className="godrej-section-lead">
              Uncompromising craftsmanship and lavish specifications curated for an elevated lifestyle.
            </p>
          </div>

          <div className="godrej-highlights-grid">
            <div className="godrej-highlight-box">
              <div className="godrej-hl-icon">
                <Sparkles size={22} />
              </div>
              <div className="godrej-hl-info">
                <h4>Modular Kitchen</h4>
                <p>Fully modular kitchen with premium hob, chimney and imported storage cabinets.</p>
              </div>
            </div>

            <div className="godrej-highlight-box">
              <div className="godrej-hl-icon">
                <Crown size={22} />
              </div>
              <div className="godrej-hl-info">
                <h4>Italian Marble</h4>
                <p>Exquisite Italian marble flooring in common living and dining entertainment areas.</p>
              </div>
            </div>

            <div className="godrej-highlight-box">
              <div className="godrej-hl-icon">
                <Layers size={22} />
              </div>
              <div className="godrej-hl-info">
                <h4>Laminated Wooden Flooring</h4>
                <p>Warm laminated wooden flooring in all bedrooms for cozy, luxurious comfort.</p>
              </div>
            </div>

            <div className="godrej-highlight-box">
              <div className="godrej-hl-icon">
                <Maximize2 size={22} />
              </div>
              <div className="godrej-hl-info">
                <h4>All-Glass Balconies</h4>
                <p>Seamless glass railings for uninterrupted, breathtaking panoramic skyline views.</p>
              </div>
            </div>

            <div className="godrej-highlight-box">
              <div className="godrej-hl-icon">
                <Wind size={22} />
              </div>
              <div className="godrej-hl-info">
                <h4>Air Conditioned Living</h4>
                <p>Pre-installed air conditioners in all master and family rooms for optimal climate.</p>
              </div>
            </div>

            <div className="godrej-highlight-box">
              <div className="godrej-hl-icon">
                <CheckCircle size={22} />
              </div>
              <div className="godrej-hl-info">
                <h4>Designer Wardrobes</h4>
                <p>Built-in elegant wardrobe storage in master suites (available for select units).</p>
              </div>
            </div>

            <div className="godrej-highlight-box">
              <div className="godrej-hl-icon">
                <ShieldCheck size={22} />
              </div>
              <div className="godrej-hl-info">
                <h4>High-Rise Gated Enclave</h4>
                <p>Round-the-clock multi-tier security, boom barriers and CCTV campus surveillance.</p>
              </div>
            </div>

            <div className="godrej-highlight-box">
              <div className="godrej-hl-icon">
                <Trees size={22} />
              </div>
              <div className="godrej-hl-info">
                <h4>Acres of Greenery</h4>
                <p>Abundant landscape gardens, manicured lawns, and pollution-mitigating foliage.</p>
              </div>
            </div>

            <div className="godrej-highlight-box">
              <div className="godrej-hl-icon">
                <Activity size={22} />
              </div>
              <div className="godrej-hl-info">
                <h4>Sky Decks &amp; Views</h4>
                <p>Elevated sky lounges and vantage decks offering tranquil evening retreats.</p>
              </div>
            </div>

            <div className="godrej-highlight-box">
              <div className="godrej-hl-icon">
                <Building2 size={22} />
              </div>
              <div className="godrej-hl-info">
                <h4>IGBC Certified</h4>
                <p>Eco-conscious architecture ensuring reduced energy consumption and water conservation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 3: EXCLUSIVE 30:70 PAYMENT PLAN
          ========================================================================== */}
      <section className="godrej-section godrej-payment-section" id="payment-plan">
        <div className="godrej-container">
          <div className="godrej-payment-card-banner">
            <div className="godrej-payment-content">
              <span className="godrej-section-kicker">EXCLUSIVE PAYMENT ADVANTAGE</span>
              <h2 className="godrej-payment-title">30 : 70 Payment Plan</h2>
              <p className="godrej-payment-sub">
                Plan your purchase with the flexible 30:70 payment structure. Enquire for detailed payment schedule, applicable terms and exclusive pre-launch benefits.
              </p>

              <div className="godrej-payment-breakdown-row">
                <div className="godrej-pay-step">
                  <div className="godrej-pay-percent">30%</div>
                  <div className="godrej-pay-desc">
                    <strong>Initial Payment</strong>
                    <span>Linked to construction milestones</span>
                  </div>
                </div>

                <div className="godrej-pay-plus">:</div>

                <div className="godrej-pay-step">
                  <div className="godrej-pay-percent">70%</div>
                  <div className="godrej-pay-desc">
                    <strong>Balance Payment</strong>
                    <span>On offer of possession / structure</span>
                  </div>
                </div>
              </div>

              <div className="godrej-payment-cta-box">
                <button 
                  className="godrej-btn-gold"
                  onClick={() => openEnquiryModal('Get 30:70 Payment Schedule')}
                >
                  <FileText size={18} />
                  <span>Get 30:70 Payment Details</span>
                </button>
                <span className="godrej-payment-note">*Applicable Terms, Conditions &amp; Unit Availability</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 4: PRICING & CONFIGURATIONS
          ========================================================================== */}
      <section className="godrej-section godrej-pricing-section" id="pricing">
        <div className="godrej-container">
          <div className="godrej-section-head">
            <span className="godrej-section-kicker">INVESTMENT</span>
            <h2 className="godrej-section-title">Pricing &amp; Configuration</h2>
            <div className="godrej-head-underline"></div>
            <p className="godrej-section-lead">
              Spacious 3 &amp; 4 BHK layouts with bespoke specifications and transparent pricing. 30:70 payment plan available.
            </p>
          </div>

          <div className="godrej-pricing-cards-grid">
            {/* Card 1: 3 BHK + S */}
            <div className="godrej-pricing-card">
              <div className="godrej-pricing-badge">SIGNATURE RESIDENCE</div>
              <h3 className="godrej-unit-type">3 BHK + S</h3>
              <div className="godrej-unit-meta">
                <div className="godrej-unit-meta-item">
                  <Layers size={16} />
                  <span>Super Area: <strong>2,503 Sq.Ft</strong></span>
                </div>
                <div className="godrej-unit-meta-item">
                  <Crown size={16} />
                  <span>Typology: <strong>3 Beds + Servant</strong></span>
                </div>
              </div>

              <div className="godrej-price-display">
                <span className="godrej-price-cur">₹3.56 Cr*</span>
                <span className="godrej-price-onwards">Starting Onwards</span>
              </div>

              <ul className="godrej-unit-features">
                <li><CheckCircle size={14} /> Full Modular Kitchen with Chimney</li>
                <li><CheckCircle size={14} /> Italian Marble Living &amp; Dining</li>
                <li><CheckCircle size={14} /> 30:70 Payment Structure Available</li>
              </ul>

              <div className="godrej-card-cta-group">
                <button 
                  className="godrej-btn-gold-card"
                  onClick={() => openEnquiryModal('Get 3 BHK + S Costing')}
                >
                  Get Costing &amp; Floor Plan
                </button>
              </div>
            </div>

            {/* Card 2: Duke Tower 3 BHK + Study */}
            <div className="godrej-pricing-card featured">
              <div className="godrej-pricing-badge gold">POPULAR &bull; DUKE TOWER</div>
              <h3 className="godrej-unit-type">3 BHK + Study</h3>
              <div className="godrej-unit-meta">
                <div className="godrej-unit-meta-item">
                  <Layers size={16} />
                  <span>Super Area: <strong>2,576 Sq.Ft</strong></span>
                </div>
                <div className="godrej-unit-meta-item">
                  <Crown size={16} />
                  <span>Tower: <strong>Iconic Duke Tower</strong></span>
                </div>
              </div>

              <div className="godrej-price-display">
                <span className="godrej-price-cur">₹3.90 Cr*</span>
                <span className="godrej-price-onwards">Starting Onwards</span>
              </div>

              <ul className="godrej-unit-features">
                <li><CheckCircle size={14} /> Dedicated Private Study / Home Office</li>
                <li><CheckCircle size={14} /> All-Glass Panoramic Deck</li>
                <li><CheckCircle size={14} /> Exclusive Pre-Launch Price Benefit</li>
              </ul>

              <div className="godrej-card-cta-group">
                <button 
                  className="godrej-btn-gold-card primary"
                  onClick={() => openEnquiryModal('Get Duke Tower Costing')}
                >
                  Get Complete Costing
                </button>
              </div>
            </div>

            {/* Card 3: 4 BHK Luxury */}
            <div className="godrej-pricing-card">
              <div className="godrej-pricing-badge">ULTRA LUXURY</div>
              <h3 className="godrej-unit-type">4 BHK Luxury</h3>
              <div className="godrej-unit-meta">
                <div className="godrej-unit-meta-item">
                  <Layers size={16} />
                  <span>Super Area: <strong>Area on Request</strong></span>
                </div>
                <div className="godrej-unit-meta-item">
                  <Crown size={16} />
                  <span>Typology: <strong>4 Beds + Utility Lounge</strong></span>
                </div>
              </div>

              <div className="godrej-price-display">
                <span className="godrej-price-cur">₹3.85 Cr*</span>
                <span className="godrej-price-onwards">Starting Onwards</span>
              </div>

              <ul className="godrej-unit-features">
                <li><CheckCircle size={14} /> Dual Master Suites with En-Suite Baths</li>
                <li><CheckCircle size={14} /> Premium Italian Marble in Formal Areas</li>
                <li><CheckCircle size={14} /> Corner Tower Orientation &amp; High Privacy</li>
              </ul>

              <div className="godrej-card-cta-group">
                <button 
                  className="godrej-btn-gold-card"
                  onClick={() => openEnquiryModal('Get 4 BHK Luxury Costing')}
                >
                  Get Costing &amp; Floor Plan
                </button>
              </div>
            </div>
          </div>

          <div className="godrej-pricing-disclaimer">
            *Prices are indicative and subject to change without prior notice. Please confirm unit availability and official payment sheet with our sales desk.
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 5: MASTER PLAN & FLOOR PLANS (PLACEHOLDERS READY)
          ========================================================================== */}
      <section className="godrej-section godrej-floorplans-section" id="floor-plans">
        <div className="godrej-container">
          <div className="godrej-section-head">
            <span className="godrej-section-kicker">LAYOUTS &amp; BLUEPRINTS</span>
            <h2 className="godrej-section-title">Master Plan &amp; Floor Plans</h2>
            <div className="godrej-head-underline"></div>
            <p className="godrej-section-lead">
              Thoughtfully configured architectural plans maximizing carpet area, cross-ventilation, and panoramic views.
            </p>
          </div>

          <div className="godrej-floorplan-cards-grid">
            {/* Master Plan Card */}
            <div className="godrej-plan-card">
              <div 
                className="godrej-plan-on-request-box"
                onClick={() => openEnquiryModal('Request Master Site Plan')}
              >
                <div className="godrej-on-request-inner">
                  <span className="godrej-on-request-tag">Master Layout</span>
                  <h4 className="godrej-on-request-title">On Request</h4>
                  <p className="godrej-on-request-sub">Click to unlock detailed site blueprint</p>
                </div>
              </div>
              <div className="godrej-plan-footer">
                <div>
                  <strong>Master Site Plan</strong>
                  <span>Sector 12, Greater Noida West</span>
                </div>
                <button 
                  className="godrej-unlock-btn"
                  onClick={() => openEnquiryModal('Request Master Site Plan')}
                >
                  <Download size={15} /> Unlock Master Plan
                </button>
              </div>
            </div>

            {/* 3 BHK Floor Plan Card */}
            <div className="godrej-plan-card">
              <div 
                className="godrej-plan-on-request-box"
                onClick={() => openEnquiryModal('Request 3 BHK Floor Plan')}
              >
                <div className="godrej-on-request-inner">
                  <span className="godrej-on-request-tag">3 BHK + S Floor Plan</span>
                  <h4 className="godrej-on-request-title">On Request</h4>
                  <p className="godrej-on-request-sub">Click to unlock carpet area &amp; dimensions</p>
                </div>
              </div>
              <div className="godrej-plan-footer">
                <div>
                  <strong>3 BHK + S (2,503 Sq.Ft)</strong>
                  <span>Detailed Carpet &amp; Room Dimensions</span>
                </div>
                <button 
                  className="godrej-unlock-btn"
                  onClick={() => openEnquiryModal('Request 3 BHK Floor Plan')}
                >
                  <Download size={15} /> Get 3 BHK Plan
                </button>
              </div>
            </div>

            {/* 4 BHK Floor Plan Card */}
            <div className="godrej-plan-card">
              <div 
                className="godrej-plan-on-request-box"
                onClick={() => openEnquiryModal('Request 4 BHK Floor Plan')}
              >
                <div className="godrej-on-request-inner">
                  <span className="godrej-on-request-tag">4 BHK Luxury Layout</span>
                  <h4 className="godrej-on-request-title">On Request</h4>
                  <p className="godrej-on-request-sub">Click to unlock luxury residence blueprints</p>
                </div>
              </div>
              <div className="godrej-plan-footer">
                <div>
                  <strong>4 BHK Luxury Layout</strong>
                  <span>High-Privacy Corner Residences</span>
                </div>
                <button 
                  className="godrej-unlock-btn"
                  onClick={() => openEnquiryModal('Request 4 BHK Floor Plan')}
                >
                  <Download size={15} /> Get 4 BHK Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 6: LUXURIOUS AMENITIES
          ========================================================================== */}
      <section className="godrej-section godrej-amenities-section" id="amenities">
        <div className="godrej-container">
          <div className="godrej-section-head">
            <span className="godrej-section-kicker">LIFESTYLE</span>
            <h2 className="godrej-section-title">Luxurious Amenities</h2>
            <div className="godrej-head-underline"></div>
            <p className="godrej-section-lead">
              Curated recreation, sports, and rejuvenation spaces designed to cater to every generation.
            </p>
          </div>

          <div className="godrej-amenities-grid">
            <div className="godrej-amenity-tile">
              <div className="godrej-am-icon"><Building2 size={26} /></div>
              <h4>Grand Clubhouse</h4>
              <p>Palatial multi-level clubhouse with private lounges, banquet hall &amp; indoor cafe.</p>
            </div>

            <div className="godrej-amenity-tile">
              <div className="godrej-am-icon"><Activity size={26} /></div>
              <h4>Modern Gymnasium</h4>
              <p>Fully equipped fitness center with state-of-the-art cardio and weight-training equipment.</p>
            </div>

            <div className="godrej-amenity-tile">
              <div className="godrej-am-icon"><Waves size={26} /></div>
              <h4>Swimming Pool</h4>
              <p>Resort-style infinity lap pool with dedicated kids' splash pool and sun decks.</p>
            </div>

            <div className="godrej-amenity-tile">
              <div className="godrej-am-icon"><Target size={26} /></div>
              <h4>Children Play Area</h4>
              <p>Safe outdoor playground equipped with modern sensory play equipment and rubberized flooring.</p>
            </div>

            <div className="godrej-amenity-tile">
              <div className="godrej-am-icon"><Wind size={26} /></div>
              <h4>Jogging Track</h4>
              <p>Dedicated tree-lined jogging and cycling track traversing the perimeter of central greens.</p>
            </div>

            <div className="godrej-amenity-tile">
              <div className="godrej-am-icon"><Trophy size={26} /></div>
              <h4>Multi-Purpose Court</h4>
              <p>Floodlit outdoor sports court for basketball, tennis, badminton and community events.</p>
            </div>

            <div className="godrej-amenity-tile">
              <div className="godrej-am-icon"><Trees size={26} /></div>
              <h4>Butterfly Garden</h4>
              <p>Serene sensory garden featuring fragrance plants, botanical pathways and butterfly zones.</p>
            </div>

            <div className="godrej-amenity-tile">
              <div className="godrej-am-icon"><Crown size={26} /></div>
              <h4>Cricket Practice Net</h4>
              <p>Dedicated professional turf net with safety cages for weekend net sessions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 7: PRIME LOCATION ADVANTAGES & CONNECTIVITY
          ========================================================================== */}
      <section className="godrej-section godrej-location-section" id="location">
        <div className="godrej-container">
          <div className="godrej-section-head">
            <span className="godrej-section-kicker">LOCATION ADVANTAGE</span>
            <h2 className="godrej-section-title">Prime Location Advantage</h2>
            <div className="godrej-head-underline"></div>
            <p className="godrej-section-lead">
              Strategically nestled in Sector 12, Greater Noida West with rapid, signal-free access to Noida, Delhi, and Ghaziabad.
            </p>
          </div>

          <div className="godrej-location-layout">
            {/* Location Map Preview Card */}
            <div className="godrej-location-map-card">
              <div 
                className="godrej-map-img-wrap"
                onClick={() => setLightboxImage('/godrej/location.png')}
              >
                <img 
                  src="/godrej/location.png" 
                  alt="Godrej Majesty Sector 12 Connectivity Map" 
                  className="godrej-location-map-img"
                  loading="lazy"
                />
                <div className="godrej-map-overlay-badge">
                  <Maximize2 size={15} /> Click to Expand Map
                </div>
              </div>
              <div className="godrej-map-card-footer">
                <div>
                  <strong>Sector 12 Connectivity Map</strong>
                  <span>Greater Noida West &bull; Express Arterial Network</span>
                </div>
                <button 
                  className="godrej-unlock-btn"
                  onClick={() => openEnquiryModal('Get Location Map & Road Route')}
                >
                  <MapPin size={15} /> Get Route Map
                </button>
              </div>
            </div>

            <div className="godrej-location-list-card">
              <h3 className="godrej-loc-card-title">Key Distances &amp; Transit Corridors</h3>
              
              <div className="godrej-loc-items">
                <div className="godrej-loc-row">
                  <div className="godrej-loc-icon"><MapPin size={18} /></div>
                  <div className="godrej-loc-details">
                    <span className="godrej-loc-name">Gaur Chowk, Noida Extension</span>
                    <span className="godrej-loc-dist">approx. 5 km (7 mins)</span>
                  </div>
                </div>

                <div className="godrej-loc-row">
                  <div className="godrej-loc-icon"><Compass size={18} /></div>
                  <div className="godrej-loc-details">
                    <span className="godrej-loc-name">NH-24 / Delhi-Meerut Expressway</span>
                    <span className="godrej-loc-dist">approx. 9 km (12 mins)</span>
                  </div>
                </div>

                <div className="godrej-loc-row">
                  <div className="godrej-loc-icon"><Clock size={18} /></div>
                  <div className="godrej-loc-details">
                    <span className="godrej-loc-name">Sector 52 Noida Metro Station</span>
                    <span className="godrej-loc-dist">approx. 12 km (15 mins)</span>
                  </div>
                </div>

                <div className="godrej-loc-row">
                  <div className="godrej-loc-icon"><Building2 size={18} /></div>
                  <div className="godrej-loc-details">
                    <span className="godrej-loc-name">Noida-Greater Noida Expressway</span>
                    <span className="godrej-loc-dist">approx. 15 km (18 mins)</span>
                  </div>
                </div>

                <div className="godrej-loc-row">
                  <div className="godrej-loc-icon"><Layers size={18} /></div>
                  <div className="godrej-loc-details">
                    <span className="godrej-loc-name">Sector 18, Noida Commercial Hub</span>
                    <span className="godrej-loc-dist">approx. 18 km (22 mins)</span>
                  </div>
                </div>

                <div className="godrej-loc-row">
                  <div className="godrej-loc-icon"><MapPin size={18} /></div>
                  <div className="godrej-loc-details">
                    <span className="godrej-loc-name">Jewar International Airport (Upcoming)</span>
                    <span className="godrej-loc-dist">approx. 50 km (45 mins)</span>
                  </div>
                </div>
              </div>

              <div className="godrej-loc-cta">
                <button 
                  className="godrej-btn-gold"
                  onClick={() => openEnquiryModal('Get Location Map & Road Route')}
                >
                  <MapPin size={16} /> Get Location Details &amp; Map
                </button>
              </div>
            </div>

            {/* Why Choose Section Card */}
            <div className="godrej-why-choose-card">
              <h3 className="godrej-loc-card-title">Why Choose Godrej Majesty?</h3>
              <div className="godrej-why-points">
                <div className="godrej-why-point">
                  <div className="godrej-why-check"><CheckCircle size={16} /></div>
                  <div>
                    <strong>Trusted Developer</strong>
                    <p>Backed by Godrej Properties, known for exemplary architectural execution and brand pedigree.</p>
                  </div>
                </div>

                <div className="godrej-why-point">
                  <div className="godrej-why-check"><CheckCircle size={16} /></div>
                  <div>
                    <strong>Strategic Connectivity</strong>
                    <p>Sector 12 offers wide multi-lane arterial roads, proximity to leading schools, hospitals and IT hubs.</p>
                  </div>
                </div>

                <div className="godrej-why-point">
                  <div className="godrej-why-check"><CheckCircle size={16} /></div>
                  <div>
                    <strong>High Capital Appreciation</strong>
                    <p>Rapidly developing micro-market with upcoming metro links and commercial developments.</p>
                  </div>
                </div>

                <div className="godrej-why-point">
                  <div className="godrej-why-check"><CheckCircle size={16} /></div>
                  <div>
                    <strong>30:70 Payment Security</strong>
                    <p>Pay only 30% during construction milestones and balance 70% upon possession.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 8: PROJECT GALLERY (PLACEHOLDERS READY)
          ========================================================================== */}
      <section className="godrej-section godrej-gallery-section" id="gallery">
        <div className="godrej-container">
          <div className="godrej-section-head">
            <span className="godrej-section-kicker">VISUAL TOUR</span>
            <h2 className="godrej-section-title">Project Gallery</h2>
            <div className="godrej-head-underline"></div>
            <p className="godrej-section-lead">
              Glimpse into the architectural grandeur and lavish interiors of Godrej Majesty.
            </p>
          </div>

          <div className="godrej-gallery-tabs">
            <button 
              className={`godrej-gal-tab ${galleryTab === 'all' ? 'active' : ''}`}
              onClick={() => setGalleryTab('all')}
            >
              All Visuals
            </button>
            <button 
              className={`godrej-gal-tab ${galleryTab === 'exterior' ? 'active' : ''}`}
              onClick={() => setGalleryTab('exterior')}
            >
              Architecture &amp; Outdoors
            </button>
            <button 
              className={`godrej-gal-tab ${galleryTab === 'interior' ? 'active' : ''}`}
              onClick={() => setGalleryTab('interior')}
            >
              Interiors &amp; Living
            </button>
          </div>

          <div className="godrej-gallery-grid">
            {filteredGallery.map((item) => (
              <div 
                key={item.id} 
                className="godrej-gallery-card"
                onClick={() => setLightboxImage(item.image)}
              >
                <div className="godrej-gallery-img-wrap">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="godrej-gallery-img"
                    loading="lazy"
                  />
                  <div className="godrej-gallery-overlay">
                    <span className="godrej-gal-tag">{item.tag}</span>
                    <h4 className="godrej-gal-card-title">{item.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 9: BOTTOM FULL-WIDTH LEAD GENERATION BANNER
          ========================================================================== */}
      <section className="godrej-bottom-leadgen-section">
        <div className="godrej-container">
          <div className="godrej-leadgen-card">
            <div className="godrej-leadgen-grid">
              <div className="godrej-leadgen-info">
                <span className="godrej-section-kicker">ENQUIRE TODAY</span>
                <h2 className="godrej-leadgen-title">Ready to Explore Godrej Majesty?</h2>
                <p className="godrej-leadgen-sub">
                  Get the latest price, availability, floor plans, and 30:70 payment plan details. Speak directly with our dedicated project specialist.
                </p>

                <div className="godrej-leadgen-perks">
                  <div className="godrej-perk-item">
                    <CheckCircle size={18} />
                    <span>Instant Price Sheet &amp; Cost Breakup</span>
                  </div>
                  <div className="godrej-perk-item">
                    <CheckCircle size={18} />
                    <span>Complimentary Chauffeur Site Visit</span>
                  </div>
                  <div className="godrej-perk-item">
                    <CheckCircle size={18} />
                    <span>Direct Builder Allotment &amp; Zero Brokerage</span>
                  </div>
                </div>

                <div className="godrej-leadgen-contact-box">
                  <span className="godrej-contact-label">Prefer to talk right now?</span>
                  <a href="tel:+919999888990" className="godrej-leadgen-phone">
                    <Phone size={18} />
                    <span>Call Now: +91 99998 88990</span>
                  </a>
                </div>
              </div>

              <div className="godrej-leadgen-form-col">
                <form onSubmit={(e) => handleFormSubmit(e, 'Bottom Section Form')} className="godrej-lead-form dark">
                  <div className="godrej-form-group">
                    <label>Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="Enter your name" 
                      required 
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="godrej-form-group">
                    <label>Email *</label>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="Enter your email" 
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="godrej-form-group">
                    <label>Phone Number *</label>
                    <div className="godrej-input-prefix">
                      <span className="godrej-prefix-tag">+91</span>
                      <input 
                        type="tel" 
                        name="phone" 
                        placeholder="Enter 10-digit number" 
                        required 
                        pattern="[0-9]{10}"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="godrej-form-group">
                    <label>Configuration</label>
                    <select 
                      name="configuration" 
                      value={formData.configuration}
                      onChange={handleInputChange}
                    >
                      <option value="3 BHK + S">3 BHK + S (2503 Sq.Ft)</option>
                      <option value="3 BHK + Study">3 BHK + Study (Duke Tower)</option>
                      <option value="4 BHK Luxury">4 BHK Luxury Residences</option>
                    </select>
                  </div>

                  <div className="godrej-form-group">
                    <label>Message</label>
                    <textarea 
                      name="message" 
                      rows="2"
                      placeholder="Any specific requirement (optional)" 
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="godrej-form-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting Details...' : 'Schedule Site Visit & Get Details'}
                    <Send size={15} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          STANDALONE CAMPAIGN DISCLAIMER & FOOTER
          ========================================================================== */}
      <footer className="godrej-footer">
        <div className="godrej-container">
          <p className="godrej-disclaimer-text">
            <strong>Disclaimer:</strong> The content, images, architectural representations, and specifications depicted in this advertisement are solely artistic impressions for illustrative purposes and do not constitute a legal offer, guarantee, or legally binding agreement. The promoter clarifications indicate that details provided herein are indicative. Intending purchasers are advised to verify all project approvals, dimensions, floor layouts, terms of sale, and payment schedules independently with the respective sales team before concluding any purchase decision. Authorized Channel Partner: EUD Group.
          </p>

          <div className="godrej-footer-bottom">
            <div>
              &copy; {new Date().getFullYear()} Godrej Majesty | EUD Group
            </div>
            <div className="godrej-footer-links">
              <a href="#hero" onClick={(e) => { e.preventDefault(); openEnquiryModal('Privacy Policy'); }}>
                PRIVACY POLICY
              </a>
              <a href="#hero" onClick={(e) => { e.preventDefault(); openEnquiryModal('RERA Compliance Details'); }}>
                RERA COMPLIANCE
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ==========================================================================
          MOBILE STICKY BOTTOM ACTION BAR
          ========================================================================== */}
      <div className="godrej-mobile-bottom-bar">
        <a href="tel:+919999888990" className="godrej-mobile-bar-btn call">
          <Phone size={16} />
          <span>Call Now</span>
        </a>
        <a 
          href="https://wa.me/919999888990?text=Hi%2C%20I%20am%20interested%20in%20Godrej%20Majesty%20Sector%2012%20Greater%20Noida%20West.%20Please%20share%20the%20cost%20sheet%2C%20floor%20plans%20and%2030%3A70%20payment%20plan%20details." 
          target="_blank" 
          rel="noopener noreferrer" 
          className="godrej-mobile-bar-btn whatsapp"
        >
          <span style={{ fontWeight: 800 }}>WhatsApp</span>
        </a>
        <button 
          onClick={() => openEnquiryModal('Get Price & Availability')} 
          className="godrej-mobile-bar-btn enquire"
        >
          <span>Enquire</span>
        </button>
      </div>

      {/* ==========================================================================
          GLOBAL ENQUIRY MODAL POPUP
          ========================================================================== */}
      {isModalOpen && (
        <div className="godrej-modal-backdrop" onClick={closeEnquiryModal}>
          <div className="godrej-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="godrej-modal-close" onClick={closeEnquiryModal} aria-label="Close modal">
              <X size={20} />
            </button>

            <div className="godrej-modal-header">
              <h3 className="godrej-modal-title">{modalTitle}</h3>
            </div>

            <form onSubmit={(e) => handleFormSubmit(e, `Modal: ${modalTitle}`)} className="godrej-lead-form">
              <div className="godrej-form-group">
                <label>Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Enter your name" 
                  required 
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="godrej-form-group">
                <label>Email *</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Enter your email" 
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="godrej-form-group">
                <label>Phone Number *</label>
                <div className="godrej-input-prefix">
                  <span className="godrej-prefix-tag">+91</span>
                  <input 
                    type="tel" 
                    name="phone" 
                    placeholder="Enter 10-digit number" 
                    required 
                    pattern="[0-9]{10}"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="godrej-form-group">
                <label>Configuration</label>
                <select 
                  name="configuration" 
                  value={formData.configuration}
                  onChange={handleInputChange}
                >
                  <option value="3 BHK + S">3 BHK + S (2503 Sq.Ft)</option>
                  <option value="3 BHK + Study">3 BHK + Study (Duke Tower)</option>
                  <option value="4 BHK Luxury">4 BHK Luxury Residences</option>
                </select>
              </div>

              <div className="godrej-form-group">
                <label>Message</label>
                <textarea 
                  name="message" 
                  rows="2"
                  placeholder="Any specific requirement (optional)" 
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="godrej-form-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit & Get Instant Details'}
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================================================
          IMAGE LIGHTBOX PREVIEW MODAL
          ========================================================================== */}
      {lightboxImage && (
        <div className="godrej-modal-backdrop" onClick={() => setLightboxImage(null)}>
          <div className="godrej-lightbox-card" onClick={(e) => e.stopPropagation()}>
            <button 
              className="godrej-modal-close" 
              onClick={() => setLightboxImage(null)} 
              aria-label="Close image preview"
            >
              <X size={20} />
            </button>
            <img src={lightboxImage} alt="Project Visual Preview" className="godrej-lightbox-img" />
          </div>
        </div>
      )}

    </div>
  );
}
