import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const navigate = useNavigate();
  const onBack = () => navigate('/');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const activeUrl = "https://script.google.com/macros/s/AKfycbzi-N0PGk_9ESd6n3EsbZgamy4cWhtWrSYOewbFfnlrCDpsOt1D1rYgzpLjyr9rVpMowg/exec";
    
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message
    };

    try {
      await fetch(activeUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: JSON.stringify(payload)
      });
      setLoading(false);
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="contact-page page-enter">

      {/* Header */}
      <div className="contact-page-header">
        <div className="contact-page-header-inner">
          <button className="btn-back-home-simple" onClick={onBack}>
            <ArrowLeft size={16} /> <span>Back to Home</span>
          </button>
          <h1 className="contact-page-title">Contact Us</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="contact-page-body">

        {/* Info Cards Row */}
        <div className="contact-info-cards">
          <div className="contact-info-card">
            <div className="contact-info-card-icon">
              <Phone size={22} />
            </div>
            <div>
              <div className="contact-info-card-label">Call Us</div>
              <div className="contact-info-card-value">+91 9999 888 990</div>
            </div>
          </div>
          <div className="contact-info-card">
            <div className="contact-info-card-icon">
              <Mail size={22} />
            </div>
            <div>
              <div className="contact-info-card-label">Email Us</div>
              <div className="contact-info-card-value">info@eudgroup.in</div>
            </div>
          </div>
          <div className="contact-info-card">
            <div className="contact-info-card-icon">
              <MapPin size={22} />
            </div>
            <div>
              <div className="contact-info-card-label">Visit Us</div>
              <div className="contact-info-card-value">GH-04A, Sector 10, Vaidpura, Greater Noida</div>
            </div>
          </div>
          <div className="contact-info-card">
            <div className="contact-info-card-icon">
              <Clock size={22} />
            </div>
            <div>
              <div className="contact-info-card-label">Working Hours</div>
              <div className="contact-info-card-value">Mon – Sat, 9 AM – 7 PM</div>
            </div>
          </div>
        </div>

        {/* Form + Map Row */}
        <div className="contact-page-grid">

          {/* Contact Form */}
          <div className="contact-form-card">
            <h2 className="contact-form-card-title">Send Us a Message</h2>
            <p className="contact-form-card-desc">Fill in the details below and we'll get back to you within 24 hours.</p>

            {submitted ? (
              <div className="contact-success-state">
                <div className="contact-success-icon"><CheckCircle size={48} /></div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. Our team will contact you shortly.</p>
                <button className="contact-success-btn" onClick={() => setSubmitted(false)}>
                  Send Another
                </button>
              </div>
            ) : (
              <form className="contact-form-fields" onSubmit={handleSubmit}>
                <div className="contact-form-row">
                  <div className="contact-field-group">
                    <label className="contact-field-label">Full Name *</label>
                    <input
                      className="contact-field-input"
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="contact-field-group">
                    <label className="contact-field-label">Email Address *</label>
                    <input
                      className="contact-field-input"
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="contact-form-row">
                  <div className="contact-field-group">
                    <label className="contact-field-label">Phone Number</label>
                    <input
                      className="contact-field-input"
                      type="tel"
                      name="phone"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="contact-field-group">
                    <label className="contact-field-label">Subject</label>
                    <select
                      className="contact-field-input contact-field-select"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    >
                      <option value="Select a topic">Select a topic</option>
                      <option value="Buy a Property">Buy a Property</option>
                      <option value="Schedule a Site Visit">Schedule a Site Visit</option>
                      <option value="Investment Enquiry">Investment Enquiry</option>
                      <option value="General Enquiry">General Enquiry</option>
                    </select>
                  </div>
                </div>

                <div className="contact-field-group">
                  <label className="contact-field-label">Message *</label>
                  <textarea
                    className="contact-field-input contact-field-textarea"
                    name="message"
                    placeholder="Tell us about your requirements, budget, preferred location..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  className={`contact-submit-btn ${loading ? 'loading' : ''}`}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="contact-submit-spinner" />
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Map */}
          <div className="contact-map-card">
            <h2 className="contact-form-card-title">Find Us</h2>
            <p className="contact-form-card-desc">GH-04A, Near Arihant Abode, Sector 10, Vaidpura, Greater Noida, UP 203207</p>
            <div className="contact-map-wrapper">
              <iframe
                title="EUD Office Location"
                src="https://maps.google.com/maps?q=GH-04A+Near+Arihant+Abode+Sector+10+Vaidpura+Greater+Noida+Uttar+Pradesh+203207&output=embed&z=16"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
