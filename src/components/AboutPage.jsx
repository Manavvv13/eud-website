import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Mail } from 'lucide-react';

const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const FacebookIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TwitterIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
  </svg>
);

const InstagramIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function AboutPage() {
  const navigate = useNavigate();
  const storyRef = useRef(null);
  const founderRef = useRef(null);
  const [storyVisible, setStoryVisible] = useState(false);
  const [founderVisible, setFounderVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const observerOptions = {
      root: null,
      threshold: 0.2
    };

    const storyObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStoryVisible(true);
      }
    }, observerOptions);

    const founderObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setFounderVisible(true);
      }
    }, observerOptions);

    if (storyRef.current) storyObserver.observe(storyRef.current);
    if (founderRef.current) founderObserver.observe(founderRef.current);

    return () => {
      storyObserver.disconnect();
      founderObserver.disconnect();
    };
  }, []);

  const founder = {
    name: 'Vimal Soni',
    role: 'FOUNDER & CEO',
    image: '/Owner Photo.jpeg',
    bio: 'Having waited four years for a home and facing hidden charges, Vimal Soni established EUD (End User Destination) to bring complete transparency, zero hidden costs, and honest companion-style guidance to every homebuyer in NCR.',
    linkedin: 'https://linkedin.com'
  };

  return (
    <div className="about-corporate-page page-enter">
      {/* ── HEADER / NAVBAR ── */}
      <header className="about-corp-header">
        <div className="about-corp-header-inner">
          <div className="about-corp-logo" onClick={() => navigate('/')}>
            <img src="/EUD Logo.png" alt="EUD Group" className="corp-logo-img" />
          </div>

          <nav className="about-corp-nav">
            <span className="corp-nav-link" onClick={() => navigate('/')}>Home</span>
            <span className="corp-nav-link" onClick={() => navigate('/properties')}>Properties</span>
            <span className="corp-nav-link" onClick={() => navigate('/properties')}>Campaign</span>
            <span className="corp-nav-link active-corp-link" onClick={() => navigate('/about')}>About Us</span>
            <button className="btn-corp-contact" onClick={() => navigate('/contact')}>
              Contact Us
            </button>
          </nav>
        </div>
      </header>

      {/* ── HERO BANNER SECTION ── */}
      <section className="about-corp-hero">
        <div className="about-corp-hero-content">
          <h1 className="about-corp-hero-title animate-title-pop">About Us</h1>
          <p className="about-corp-hero-subtitle animate-text-slide">
            Our mission is to provide homebuyers and investors with the transparent tools, verified developments, and honest guidance they need to thrive in today's market.
          </p>
        </div>
        <div className="about-corp-hero-bg">
          <img 
            src="/Hero Background 2.png" 
            alt="Modern Architecture Hero" 
            className="corp-hero-img"
          />
        </div>
      </section>

      {/* ── OUR STORY SECTION ── */}
      <section 
        ref={storyRef} 
        className={`about-corp-story-section reveal-story-section ${storyVisible ? 'is-visible' : ''}`}
      >
        <div className="about-corp-container">
          <h2 className="corp-section-title text-center reveal-item reveal-title">Our Story</h2>

          <div className="corp-story-3col">
            {/* Column 1: History */}
            <div className="corp-story-col reveal-item reveal-col-1">
              <h3 className="corp-story-col-title">History Of The Company</h3>
              <p className="corp-story-col-text">
                EUD was born from a <strong>personal experience of waiting four years for a home</strong>, only to be met with hidden charges and broken promises. Founded by <strong>Vimal Soni</strong>, EUD exists to ensure <strong>no family ever feels cheated or alone</strong> in their real estate journey.
              </p>
            </div>

            {/* Column 2: Mission */}
            <div className="corp-story-col reveal-item reveal-col-2">
              <h3 className="corp-story-col-title">Mission</h3>
              <p className="corp-story-col-text">
                Our mission is to create <strong>transparent, uncompromised real estate journeys</strong> for every client. We <strong>pursue genuine value</strong> and verified quality, ensuring you achieve <strong>clarity, comfort, and security</strong> at every single step.
              </p>
            </div>

            {/* Column 3: Company Values */}
            <div className="corp-story-col reveal-item reveal-col-3">
              <h3 className="corp-story-col-title">Company Values</h3>
              <p className="corp-story-col-text">
                We believe in <strong>uncompromising honesty and verified developments</strong>. Because in real estate, trust is everything. Our team stands by you <strong>from initial consultation to key handover</strong> with great satisfaction and peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MEET OUR FOUNDER SECTION ── */}
      <section 
        ref={founderRef} 
        className={`about-corp-team-section reveal-founder-section ${founderVisible ? 'is-visible' : ''}`}
      >
        <div className="about-corp-container">
          <h2 className="corp-team-title reveal-item reveal-title">Meet Our Founder</h2>

          <div className="corp-founder-card reveal-item reveal-card">
            <div className="corp-founder-avatar-wrap">
              <img src={founder.image} alt={founder.name} className="corp-founder-avatar" />
            </div>
            <div className="corp-founder-info">
              <h3 className="corp-founder-name">{founder.name}</h3>
              <p className="corp-founder-role">{founder.role}</p>
              <p className="corp-founder-bio">{founder.bio}</p>
              <div className="corp-founder-action-row">
                <button className="btn-corp-contact" onClick={() => navigate('/contact')}>
                  Connect with Vimal Soni
                </button>
                <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="corp-founder-social">
                  <LinkedinIcon size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
