import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function Hero() {
  const [activeCategory, setActiveCategory] = useState('House');
  const navigate = useNavigate();

  const categories = ['House', 'Apartment', 'Residential'];

  const handleSearch = (criteria) => {
    navigate('/properties', { state: { searchCriteria: criteria } });
  };

  return (
    <section id="home" className="hero-section">
      {/* Background Banner Container */}
      <div className="hero-bg-wrapper">
        <div className="hero-bg-overlay"></div>
        <picture className="hero-bg-picture">
          <source media="(max-width: 768px)" srcSet="/Hero%20Diwali%20Banner%20Phone.png" />
          <img 
            src="/Hero%20Diwali%20Banner.png" 
            alt="Hero Diwali Banner" 
            className="hero-bg-image animate-fadeIn" 
          />
        </picture>
      </div>

      <div className="hero-content-container">
        {/* Categories / Pill Tags (Commented out)
        <div className="hero-category-pills animate-hero-pills">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-pill ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        */}

        {/* Hero Title & Description Grid (Commented out)
        <div className="hero-main-grid">
          <div className="hero-left animate-hero-title">
            <h1 className="hero-title">
              Exceptional Properties<br />for Exceptional Lives,<br />No Reason to Regret
            </h1>
          </div>
          
          <div className="hero-right animate-hero-desc">
            <p className="hero-description">
              EUD is a premier real estate company offering a curated portfolio of exceptional properties. We connect you with luxury residential and commercial spaces that inspire modern living.
            </p>
          </div>
        </div>
        */}

        {/* Overlay Search Bar */}
        <div className="hero-search-wrapper animate-hero-search">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
    </section>
  );
}
