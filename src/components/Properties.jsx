import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';

// Helper component for count-up animation when entering viewport
function AnimatedCounter({ value, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const numericValue = parseInt(value.replace(/,/g, ''), 10);
    if (isNaN(numericValue)) {
      setCount(value);
      return;
    }

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Decelerate at the end for an elegant transition
      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
      const current = Math.floor(easeOutCubic(progress) * numericValue);
      
      const formatted = value.includes(',') 
        ? current.toLocaleString() 
        : current;

      setCount(formatted);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };
    window.requestAnimationFrame(step);
  }, [isVisible, value, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
}

const MAIN_GALLERY_IMAGES = [
  '/gallery 1.jpeg',
  '/gallery 2.jpg',
  '/gallery 3.jpg',
];

export default function Properties({ onSeeAll, onGoContest }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const SLIDESHOW_PROPERTIES = [
    { name: 'CRC Joyous',      image: '/Properties/CRC Joyous/CRCJ 1.avif',        priceLabel: 'Pricing Start at ₹1.30 Cr' },
    { name: 'CRC Maesta',      image: '/Properties/CRC Maesta/CRCM 1.avif',         priceLabel: 'Pricing Start at ₹2.32 Cr' },
    { name: 'Irish Platinum',  image: '/Properties/Irish Platinum/IP 1.avif',        priceLabel: 'Pricing Start at ₹1.69 Cr' },
    { name: 'Elite X',         image: '/Properties/Elite X/EX 1.avif',              priceLabel: 'Pricing Start at ₹1.85 Cr' },
    { name: 'VVIP Addresses',  image: '/Properties/VVIP Addresses/VVIP 1.avif',     priceLabel: 'Pricing Start at ₹2.10 Cr' },
  ];

  const TOTAL = SLIDESHOW_PROPERTIES.length;

  // Clone last slide at beginning, clone first slide at end: [last, ...all, first]
  const extendedSlides = [
    SLIDESHOW_PROPERTIES[TOTAL - 1],
    ...SLIDESHOW_PROPERTIES,
    SLIDESHOW_PROPERTIES[0],
  ];
  const EXTENDED = extendedSlides.length; // TOTAL + 2

  // Start at 1 (first real slide, skipping the prepended clone)
  const [currentSlide, setCurrentSlide] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  // useRef always holds the LATEST currentSlide — fixes stale closure in onTransitionEnd
  const currentSlideRef = useRef(1);
  const setSlide = (val) => {
    currentSlideRef.current = val;
    setCurrentSlide(val);
  };

  // After CSS transition ends, silently snap to real position if at a clone
  const handleTransitionEnd = () => {
    const pos = currentSlideRef.current;
    if (pos >= EXTENDED - 1) {
      // Was at cloned first slide at the end → snap to real first (index 1)
      setTransitionEnabled(false);
      setSlide(1);
    } else if (pos <= 0) {
      // Was at cloned last slide at the start → snap to real last (index TOTAL)
      setTransitionEnabled(false);
      setSlide(TOTAL);
    }
  };

  // Re-enable transition after the silent snap (two rAF frames to avoid flash)
  useEffect(() => {
    if (!transitionEnabled) {
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setTransitionEnabled(true))
      );
      return () => cancelAnimationFrame(id);
    }
  }, [transitionEnabled]);

  const isHovering = useRef(false);
  const autoplayRef = useRef(null);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      if (!isHovering.current) {
        setSlide(currentSlideRef.current + 1);
      }
    }, 3500);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  // Start autoplay on mount, clean up on unmount
  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const handleNextSlide = () => {
    setSlide(currentSlideRef.current + 1);
    startAutoplay(); // reset timer on manual click
  };

  const handlePrevSlide = () => {
    setSlide(currentSlideRef.current - 1);
    startAutoplay(); // reset timer on manual click
  };

  return (
    <>
    <section id="properties" className="portfolio-custom-section">
      {/* Top Header Row */}
      <div className="portfolio-header">
        <h2 className="portfolio-main-title">
          Your primary home might<br />begin to feel left out.
        </h2>
        
        <div className="portfolio-header-right">
          {/* Rounded video pill */}
          <div className="video-pill-thumbnail">
            <img 
              src="/Hero Background.png" 
              alt="Video Thumbnail" 
              className="video-pill-img"
            />
            <div className="play-button-overlay">
              <Play size={16} fill="#000" color="#000" />
            </div>
          </div>
          <p className="portfolio-header-desc">
            Each listing offers unique features,<br />exceptional quality, and prime<br />locations
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="portfolio-grid-container">
        {/* Column 1: Large Main Image Card with gallery dots */}
        <div className="portfolio-col-main">
          <div className="main-card-image-wrapper">
            <img 
              src={MAIN_GALLERY_IMAGES[activeImageIndex]} 
              alt="Featured Architecture" 
              className="main-card-img" 
            />
            {/* Gallery picker bottom-right */}
            <div className="gallery-picker-capsule">
              {MAIN_GALLERY_IMAGES.map((imgUrl, index) => (
                <div 
                  key={index} 
                  className={`gallery-picker-dot ${activeImageIndex === index ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(index)}
                  style={{ backgroundImage: `url(${encodeURI(imgUrl)})` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Image Card Wrapper with inline bottom description */}
        <div className="portfolio-col-text-wrapper">
          <div 
            className="portfolio-col-text" 
            style={{ padding: 0, overflow: 'hidden', background: '#eae5de', cursor: 'pointer' }}
            onClick={onGoContest}
          >
            <img 
              src="/Campaign.avif" 
              alt="Campaign" 
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} 
            />
          </div>
          <p className="portfolio-footer-desc-bottom">
            Share your stories with us and win vouchers
          </p>
        </div>

        {/* Column 3: Split Image + Pricing Card Wrapper with inline nav arrows */}
        <div 
          className="portfolio-col-pricing-wrapper"
          onMouseEnter={() => { isHovering.current = true; }}
          onMouseLeave={() => { isHovering.current = false; }}
        >
          <div className="portfolio-col-pricing">
            <div className="pricing-card-image-wrapper">
              <div 
                className="pricing-slider-inner" 
                onTransitionEnd={handleTransitionEnd}
                style={{ 
                  width: `${EXTENDED * 100}%`,
                  transform: `translateX(-${(currentSlide / EXTENDED) * 100}%)`,
                  transition: transitionEnabled ? 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
                }}
              >
                {extendedSlides.map((slide, idx) => (
                  <img 
                    key={idx}
                    src={slide.image} 
                    alt={slide.name} 
                    className="pricing-card-img"
                    style={{ width: `${100 / EXTENDED}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="pricing-card-details">
              {/* Real slide index = currentSlide - 1 (offset by prepended clone), clamped to valid range */}
              <span className="pricing-start-text">
                {SLIDESHOW_PROPERTIES[Math.max(0, Math.min(currentSlide - 1, TOTAL - 1))].priceLabel}
              </span>
              <button className="btn-explore-custom" onClick={onSeeAll}>
                <span>Explore Properties</span>
                <ArrowRight size={14} className="arrow-icon" />
              </button>
            </div>
          </div>
          <div className="portfolio-nav-arrows">
            <button className="nav-arrow-btn" onClick={handlePrevSlide} aria-label="Previous property">
              <ArrowLeft size={18} />
            </button>
            <button className="nav-arrow-btn" onClick={handleNextSlide} aria-label="Next property">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="portfolio-stats-container">
        <div className="portfolio-stat-item">
          <span className="portfolio-stat-number">
            <AnimatedCounter value="100" suffix="%" />
          </span>
          <span className="portfolio-stat-label">Satisfactions Clients</span>
        </div>
        <div className="portfolio-stat-divider" />
        
        <div className="portfolio-stat-item">
          <span className="portfolio-stat-number">
            <AnimatedCounter value="500" suffix="+" />
          </span>
          <span className="portfolio-stat-label">Property sells</span>
        </div>
        <div className="portfolio-stat-divider" />
        
        <div className="portfolio-stat-item">
          <span className="portfolio-stat-number">
            <AnimatedCounter value="150" suffix="+" />
          </span>
          <span className="portfolio-stat-label">Countries & Cities</span>
        </div>
        <div className="portfolio-stat-divider" />
        
        <div className="portfolio-stat-item">
          <span className="portfolio-stat-number">
            <AnimatedCounter value="2,000" suffix="+" />
          </span>
          <span className="portfolio-stat-label">Positive reviews</span>
        </div>
      </div>
    </section>

    {/* Discover Map Section (Full Width Bleed) */}
    <section className="discover-map-full-section">
      <div className="discover-map-content-wrapper">
        <div className="discover-map-wrapper">
          <img 
            src="/properties_map_mockup.png" 
            alt="Properties Location Map" 
            className="discover-map-img"
          />
        </div>
        
        <div className="discover-map-content">
          <h3 className="discover-map-title">
            Discover Properties with<br />the Best Value
          </h3>
          <p className="discover-map-desc">
            From minimalist interiors to compact solutions, small spaces inspire big ideas, proving that you don't need much room.
          </p>
          <button className="btn-find-properties" onClick={onSeeAll}>
            <span>Find Nearest Properties</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>

    {/* Premier Houses Section */}
    <section id="premier-houses" className="premier-houses-section">
      <div className="premier-houses-inner">

        {/* Section Header */}
        <div className="premier-houses-header">
          <div className="premier-houses-header-left">
            <h2 className="premier-houses-title">Explore our premier houses</h2>
            <p className="premier-houses-desc">
              Each listing offers unique features, exceptional quality, and prime locations,<br />
              ensuring an exclusive living experience.*
            </p>
          </div>
          <button className="btn-see-all-properties" onClick={onSeeAll}>
            <span>See All Properties</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Properties Grid */}
        <div className="premier-houses-grid">

          {/* Card 1 - CRC Joyous */}
          <div className="premier-card">
            <div className="premier-card-img-wrapper">
              <img src="/Properties/CRC Joyous/CRCJ 1.avif" alt="CRC Joyous" className="premier-card-img" />
              <span className="premier-card-badge">Under Construction</span>
            </div>
            <div className="premier-card-body">
              <div className="premier-card-meta">
                <span className="premier-card-meta-item">Apartment</span>
                <span className="premier-card-dot">·</span>
                <span className="premier-card-meta-item">Techzone 4 Noida Extension</span>
              </div>
              <h3 className="premier-card-name">CRC Joyous</h3>
              <p className="premier-card-price-row">
                <span className="premier-card-price">₹1.30 Cr – ₹2.70 Cr</span>
              </p>
            </div>
          </div>

          {/* Card 2 - CRC Maesta */}
          <div className="premier-card">
            <div className="premier-card-img-wrapper">
              <img src="/Properties/CRC Maesta/CRCM 1.avif" alt="CRC Maesta" className="premier-card-img" />
              <span className="premier-card-badge">Under Construction</span>
            </div>
            <div className="premier-card-body">
              <div className="premier-card-meta">
                <span className="premier-card-meta-item">Apartment</span>
                <span className="premier-card-dot">·</span>
                <span className="premier-card-meta-item">Sector 1 Greater Noida West</span>
              </div>
              <h3 className="premier-card-name">CRC Maesta</h3>
              <p className="premier-card-price-row">
                <span className="premier-card-price">₹2.32 Cr – ₹4.20 Cr</span>
              </p>
            </div>
          </div>

          {/* Card 3 - Irish Platinum */}
          <div className="premier-card">
            <div className="premier-card-img-wrapper">
              <img src="/Properties/Irish Platinum/IP 1.avif" alt="Irish Platinum" className="premier-card-img" />
              <span className="premier-card-badge">Under Construction</span>
            </div>
            <div className="premier-card-body">
              <div className="premier-card-meta">
                <span className="premier-card-meta-item">Apartment</span>
                <span className="premier-card-dot">·</span>
                <span className="premier-card-meta-item">Sector 10 Greater Noida West</span>
              </div>
              <h3 className="premier-card-name">Irish Platinum</h3>
              <p className="premier-card-price-row">
                <span className="premier-card-price">₹1.69 Cr – ₹3.11 Cr</span>
              </p>
            </div>
          </div>

          {/* Card 4 - Elite X */}
          <div className="premier-card">
            <div className="premier-card-img-wrapper">
              <img src="/Properties/Elite X/EX 1.avif" alt="Elite X" className="premier-card-img" />
              <span className="premier-card-badge">Under Construction</span>
            </div>
            <div className="premier-card-body">
              <div className="premier-card-meta">
                <span className="premier-card-meta-item">Apartment</span>
                <span className="premier-card-dot">·</span>
                <span className="premier-card-meta-item">Sector 10 Greater Noida West</span>
              </div>
              <h3 className="premier-card-name">Elite X</h3>
              <p className="premier-card-price-row">
                <span className="premier-card-price">₹1.85 Cr – ₹3.50 Cr</span>
              </p>
            </div>
          </div>

          {/* Card 5 - VVIP Addresses */}
          <div className="premier-card">
            <div className="premier-card-img-wrapper">
              <img src="/Properties/VVIP Addresses/VVIP 1.avif" alt="VVIP Addresses" className="premier-card-img" />
              <span className="premier-card-badge">Under Construction</span>
            </div>
            <div className="premier-card-body">
              <div className="premier-card-meta">
                <span className="premier-card-meta-item">Apartment</span>
                <span className="premier-card-dot">·</span>
                <span className="premier-card-meta-item">Sec 12, Greater Noida West</span>
              </div>
              <h3 className="premier-card-name">VVIP Addresses</h3>
              <p className="premier-card-price-row">
                <span className="premier-card-price">₹2.10 Cr – ₹4.80 Cr</span>
              </p>
            </div>
          </div>

          {/* Card 6 - Nirala Trio */}
          <div className="premier-card" style={{ display: 'none' }}>
            <div className="premier-card-img-wrapper">
              <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80" alt="Nirala Trio" className="premier-card-img" />
              <span className="premier-card-badge">Under Construction</span>
            </div>
            <div className="premier-card-body">
              <div className="premier-card-meta">
                <span className="premier-card-meta-item">Apartment</span>
                <span className="premier-card-dot">·</span>
                <span className="premier-card-meta-item">Sec 2, Greater Noida West</span>
              </div>
              <h3 className="premier-card-name">Nirala Trio</h3>
              <p className="premier-card-price-row">
                <span className="premier-card-price">₹1.95 Cr – ₹3.75 Cr</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
    </>
  );
}

