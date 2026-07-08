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
      {/* Background Image Container */}
      <div className="hero-bg-wrapper">
        <div className="hero-bg-overlay"></div>
        <img 
          src="/Hero Background 2.png" 
          alt="Modern Architecture Background" 
          className="hero-bg-image animate-fadeIn"
        />
      </div>

      <div className="hero-content-container">
        {/* Categories / Pill Tags */}
        <div className="hero-category-pills animate-fadeInUp delay-1">
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

        {/* Hero Title & Description Grid */}
        <div className="hero-main-grid">
          <div className="hero-left animate-fadeInUp delay-2">
            <h1 className="hero-title">
              Exceptional Properties<br />for Exceptional Lives,<br />No Reason to Regret
            </h1>
          </div>
          
          <div className="hero-right animate-fadeInUp delay-2">
            <p className="hero-description">
              EUD is a premier real estate company offering a curated portfolio of exceptional properties. We connect you with luxury residential and commercial spaces that inspire modern living.
            </p>
          </div>
        </div>

        {/* Overlay Search Bar */}
        <div className="hero-search-wrapper">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
    </section>
  );
}
