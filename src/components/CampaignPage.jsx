import React, { useState } from 'react';
import { ArrowLeft, Send, CheckCircle, Gift } from 'lucide-react';

export default function CampaignPage({ onBack }) {
  const [formData, setFormData] = useState({
    story: '',
    name: '',
    email: '',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.story.trim()) {
      alert('Please share your #BharosaRakhoEUDHaina story first.');
      return;
    }
    if (!formData.name.trim()) {
      alert('Please enter your full name.');
      return;
    }
    if (!formData.email.trim()) {
      alert('Please enter your email address.');
      return;
    }
    if (!formData.phone.trim()) {
      alert('Please enter your contact number.');
      return;
    }
    
    setLoading(true);
    const url = "https://script.google.com/macros/s/AKfycbzoJE-9XauuBD4vYnVjp9v96eUsQkrakyb8QMj1Bxopn7wWO-pTdlQZLNjY6mKdAl5v/exec";

    try {
      // Build exactly the JSON payload structure that the Apps Script parses:
      // data.story, data.name, data.email, data.phone
      const payload = {
        story: formData.story,
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      };

      await fetch(url, {
        method: 'POST',
        mode: 'no-cors', // Bypasses browser CORS policy block on redirects
        headers: {
          'Content-Type': 'text/plain' // Safelisted content-type to prevent CORS preflight check
        },
        body: JSON.stringify(payload)
      });

      setLoading(false);
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting form data:', err);
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="campaign-page page-enter">
      {/* Directory Header style */}
      <div className="directory-header-simple">
        <div className="directory-header-simple-inner">
          <div className="directory-header-top">
            <button className="btn-back-home-simple" onClick={onBack}>
              <ArrowLeft size={16} /> <span>Back to Home</span>
            </button>
            <div className="directory-logo" onClick={onBack} style={{ cursor: 'pointer' }}>
              <img src="/EUD Logo.png" alt="EUD Logo" className="logo-img" />
            </div>
          </div>
          <h1 className="directory-title-simple" style={{ textAlign: 'center', width: '100%', margin: '15px auto 0' }}>
            <span style={{ color: '#b48a4f' }}>#Bharosa</span>
            <span style={{ color: '#08325a' }}>Rakho</span>
            <span style={{ color: '#b48a4f' }}>EUDHaina</span>
          </h1>
        </div>
      </div>

      {/* Main Campaign Container */}
      <div className="campaign-page-body">
        <div className="campaign-container-grid">
          
          {/* Left Column: Banner Visual & Promo Card */}
          <div className="campaign-info-column">
            <div className="campaign-hero-card">
              <div className="campaign-hero-badge">
                <Gift size={16} />
                <span>Special Contest</span>
              </div>
              <h2 className="campaign-hero-title">
                Share your <em>Trust</em> Story<br />
                &amp; Win Vouchers worth ₹2000
              </h2>
              <p className="campaign-hero-desc">
                A home is built on trust, dreams, and memories. Share your personal journey, your relocation experiences, or how EUD helped you discover your perfect address.
              </p>
              
              {/* Campaign Image Visual Box */}
              <div className="campaign-visual-box">
                <img src="/Campaign.avif" alt="Contest Banner" className="campaign-visual-img" />
              </div>

              {/* Instructions steps */}
              <div className="campaign-steps-list">
                <h3 className="campaign-steps-heading">How to Participate:</h3>
                <div className="campaign-step-item">
                  <div className="step-number">1</div>
                  <p className="step-text">Write your true trust story in the story box on the right.</p>
                </div>
                <div className="campaign-step-item">
                  <div className="step-number">2</div>
                  <p className="step-text">Fill out your contact details so we can get in touch with you.</p>
                </div>
                <div className="campaign-step-item">
                  <div className="step-number">3</div>
                  <p className="step-text">Submit your entry &amp; stand a chance to win gift vouchers worth ₹2,000!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Submission Form Panel */}
          <div className="campaign-form-column">
            {!submitted ? (
              <div className="campaign-form-panel">
                <h2 className="form-panel-title">Contest Entry Form</h2>
                <p className="form-panel-subtitle">Please enter your story and contact information below to participate.</p>
                
                <form onSubmit={handleSubmit} className="campaign-contest-form">
                  {/* Story Textarea (mandatory) */}
                  <div className="form-group-custom">
                    <label htmlFor="story" className="form-label-custom">
                      Share your #BharosaRakhoEUDHaina Story <span className="required-star">*</span>
                    </label>
                    <textarea
                      id="story"
                      name="story"
                      value={formData.story}
                      onChange={handleChange}
                      placeholder="Share your personal story of trust, address change, or finding a home..."
                      className="form-textarea-custom"
                      rows={5}
                      required
                    />
                  </div>

                  {/* Full Name */}
                  <div className="form-group-custom">
                    <label htmlFor="name" className="form-label-custom">
                      Full Name <span className="required-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="form-input-custom"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="form-group-custom">
                    <label htmlFor="email" className="form-label-custom">
                      Email Address <span className="required-star">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="form-input-custom"
                      required
                    />
                  </div>

                  {/* Contact Number */}
                  <div className="form-group-custom">
                    <label htmlFor="phone" className="form-label-custom">
                      Contact Number <span className="required-star">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your contact number"
                      className="form-input-custom"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn-submit-campaign"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="submit-loading-text">
                        <span className="spinner"></span> Submitting entry...
                      </span>
                    ) : (
                      <>
                        <span>Submit Contest Entry</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* Success View */
              <div className="campaign-success-card">
                <div className="success-icon-wrapper">
                  <CheckCircle size={48} className="success-icon" />
                </div>
                <h2 className="success-title">Thank You for Participating!</h2>
                <p className="success-desc">
                  Your #BharosaRakhoEUDHaina story has been successfully submitted. We will review your entry and contact you if your story is selected as a winner!
                </p>
                
                <div className="success-summary-box">
                  <h4>Your Submitted Details:</h4>
                  <p><strong>Name:</strong> {formData.name || 'Anonymous'}</p>
                  <p><strong>Email:</strong> {formData.email || 'N/A'}</p>
                  <p><strong>Phone:</strong> {formData.phone || 'N/A'}</p>
                </div>

                <button className="btn-success-back" onClick={onBack}>
                  Back to Homepage
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
