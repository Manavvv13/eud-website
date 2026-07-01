import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', propertyType: '', message: '' });
    }, 1000);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        {/* Info Column */}
        <div className="contact-info-panel">
          <span className="subtitle-badge">GET IN TOUCH</span>
          <h2 className="section-title text-light">Let's Find Your Dream Home Together</h2>
          <p className="contact-intro-text">
            Have questions about our current luxury listings, custom projects, or investments? Speak directly with an EUD Group property specialist today.
          </p>

          <div className="contact-channels">
            <div className="channel-card">
              <div className="channel-icon">
                <Phone size={20} />
              </div>
              <div className="channel-details">
                <span className="channel-label">Call Our Office</span>
                <a href="tel:+18005550190" className="channel-link">+1 (800) 555-0190</a>
              </div>
            </div>

            <div className="channel-card">
              <div className="channel-icon">
                <Mail size={20} />
              </div>
              <div className="channel-details">
                <span className="channel-label">Send An Email</span>
                <a href="mailto:info@eudgroup.com" className="channel-link">info@eudgroup.com</a>
              </div>
            </div>

            <div className="channel-card">
              <div className="channel-icon">
                <MapPin size={20} />
              </div>
              <div className="channel-details">
                <span className="channel-label">Visit Headquarters</span>
                <span className="channel-text">5th Avenue, Plaza Suite 400, New York, NY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="contact-form-panel">
          {submitted ? (
            <div className="submission-success">
              <div className="success-icon-wrapper">
                <Send size={32} />
              </div>
              <h3>Thank you for reaching out!</h3>
              <p>Your request has been received. One of our senior property consultants will reach out to you within 24 hours.</p>
              <button onClick={() => setSubmitted(false)} className="btn-success-reset">
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <h3 className="form-title">Consultation Request</h3>
              <p className="form-subtitle">Fill out this quick form and we'll connect with you shortly.</p>

              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="input-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="propertyType">What type of property interests you?</label>
                <select
                  id="propertyType"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="form-select-custom"
                >
                  <option value="">Select Property Type</option>
                  <option value="Villa">Modern Villa</option>
                  <option value="Apartment">Luxury Apartment</option>
                  <option value="Penthouse">Skyline Penthouse</option>
                  <option value="House">Residential House</option>
                  <option value="Investments">Investment Properties</option>
                </select>
              </div>

              <div className="input-group">
                <label htmlFor="message">How can EUD Group assist you?</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about what you are looking for..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-form-submit">
                <span>Send Request</span>
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
