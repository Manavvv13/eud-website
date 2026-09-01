import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function About() {
  const navigate = useNavigate();

  return (
    <section id="about" className="about-section-clean">
      <div className="about-clean-container">
        <div className="about-clean-badge">
          <span className="about-clean-tag">ABOUT EUD</span>
        </div>

        <h2 className="about-clean-heading">
          Built from personal experience to make homebuying transparent, honest, and uncompromised.
        </h2>

        <p className="about-clean-paragraph">
          <strong>EUD – End User Destination</strong> was born from waiting four years for a home, only to face hidden charges and broken trust. Founded by <strong>Vimal Soni</strong>, EUD exists for one clear purpose: to ensure no family ever feels cheated or alone. We are your dedicated real estate companion — from your first search to the day you receive your keys.
        </p>

        <div className="about-clean-cta">
          <button className="btn-about-clean" onClick={() => navigate('/about')}>
            <span>Read Our Story</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
