import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Working with this team was a pleasure. They understood our vision and helped us find a property that exceeded our expectations. We couldn't have done it without them!",
    name: 'Sajibur Rahman',
    role: 'UI UX Designer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    quote: "An absolutely seamless experience from start to finish. The team guided us through every step and made what could have been a stressful process feel effortless and exciting.",
    name: 'Priya Sharma',
    role: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    quote: "They found us our dream home in under two weeks. Their market knowledge and responsiveness were outstanding. I would recommend EUD to anyone looking for premium real estate.",
    name: 'Marcus Johnson',
    role: 'Entrepreneur',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    quote: "Exceptional service and deep expertise in the market. They helped us navigate complex negotiations and secured our investment property at a great value. Truly professional.",
    name: 'Aisha Patel',
    role: 'Financial Analyst',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
  },
];

const AVATAR_URLS = [
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=80&q=80',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=80&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80',
];


export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[current];

  return (
    <section className="testimonials-section">
      <div className="testimonials-inner">

        {/* Header row */}
        <div className="testimonials-header">
          <h2 className="testimonials-title">What our clients say<br />about us</h2>
          <div className="testimonials-review-badge">
            <div className="testimonials-avatars">
              {AVATAR_URLS.map((url, i) => (
                <img key={i} src={url} alt={`Client ${i + 1}`} className="testimonials-avatar" style={{ zIndex: AVATAR_URLS.length - i }} />
              ))}
            </div>
            <div className="testimonials-review-text">
              More than <strong>500+</strong><br />Client Reviews
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="testimonials-carousel">

          {/* Left arrow */}
          <button className="testimonials-nav-btn" onClick={prev} aria-label="Previous">
            <ArrowLeft size={18} />
          </button>

          {/* Slide */}
          <div className="testimonials-slide" key={t.id}>
            {/* Person photo */}
            <div className="testimonials-photo-wrapper">
              <img src={t.image} alt={t.name} className="testimonials-photo" />
            </div>

            {/* Quote card */}
            <div className="testimonials-quote-card">
              <span className="testimonials-quote-mark">"</span>
              <p className="testimonials-quote-text">{t.quote}</p>
              <div className="testimonials-author">
                <span className="testimonials-author-name">{t.name}</span>
                <span className="testimonials-author-role">{t.role}</span>
              </div>
            </div>
          </div>

          {/* Right arrow */}
          <button className="testimonials-nav-btn" onClick={next} aria-label="Next">
            <ArrowRight size={18} />
          </button>

        </div>

        {/* Dot indicators */}
        <div className="testimonials-dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`testimonials-dot${i === current ? ' testimonials-dot--active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
