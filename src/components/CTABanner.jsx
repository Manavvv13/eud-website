import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CTABanner({ onContact }) {
  return (
    <section className="cta-banner-section">
      {/* Background image with dark overlay */}
      <div className="cta-banner-bg">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80"
          alt="Modern property"
          className="cta-banner-img"
        />
        <div className="cta-banner-overlay" />
      </div>

      {/* Content */}
      <div className="cta-banner-content">
        <h2 className="cta-banner-title">
          Ready to Make Your Dream<br />Property a Reality?
        </h2>
        <p className="cta-banner-subtitle">
          Explore a curated selection of properties that align with your vision and goals.
        </p>
        <button className="cta-banner-btn" onClick={onContact}>
          Get Started <ArrowRight size={15} />
        </button>
      </div>
    </section>
  );
}
