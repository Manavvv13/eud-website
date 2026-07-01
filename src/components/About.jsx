import React from 'react';

export default function About() {
  return (
    <section id="about" className="about-section-minimal">
      <div className="about-minimal-inner">
        <p className="about-minimal-paragraph">
          <span className="text-highlight-dark font-title">EUD – End User Destination</span>
          <span className="about-inline-badge badge-1" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=150&q=80')` }} aria-hidden="true"></span>
          <span className="text-highlight-gray">
            was born from a personal experience of waiting four years for a home, only to be met with hidden charges and broken trust.
          </span>
          {' '}
          <span className="text-highlight-dark">Founded by Vimal Soni, EUD exists for one reason,</span>
          <span className="text-highlight-gray">
            {' '}to make sure no family ever feels cheated, confused or alone on their property journey.
          </span>
          {' '}
          <span className="text-highlight-dark">We are not just a real estate portal. We are your companion</span>
          <span className="about-inline-badge badge-2" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=150&q=80')` }} aria-hidden="true"></span>
          <span className="text-highlight-gray">
            — honest, informed and always by your side — from your first search to the day you get your keys.
          </span>
        </p>
      </div>
    </section>
  );
}
