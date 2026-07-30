import React, { useState } from 'react';
import { X, Download, CheckCircle, FileText, User, Phone, Mail } from 'lucide-react';

const GOOGLE_SHEET_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbztDnQ9fR8R5bHFMoOlQfD4xkPfclCUhrTLWi4hgwmrIOXXZRlzV-9bFJfJ1WyEGfXmXQ/exec';

export default function BrochureModal({ property, isOpen, onClose }) {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !property) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      errs.phone = 'Valid 10-digit contact number is required';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid email address is required';
    }
    return errs;
  };

  const downloadBrochure = (prop, user) => {
    const brochureMap = {
      'CRC Joyous': '/brochures/CRC Joyous Brochure.pdf',
      'CRC Maesta': '/brochures/CRC Maesta Brochure.pdf',
      'Irish Platinum': '/brochures/Irish Platinum Brochure.pdf',
      'Elite X': '/brochures/Elite X Brochure.pdf',
      'VVIP Addresses': '/brochures/VVIP Addresses Brochure.pdf',
      'Arihant One': '/brochures/Arihant One Brochure.pdf',
      'Godrej Majesty': '/brochures/Godrej Majesty Brochure.pdf',
      'Sublime Spring Elmas': '/brochures/Sublime Spring Elmas Brochure.pdf',
    };

    const pdfUrl = prop.brochure || brochureMap[prop.name];

    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `${prop.name} Brochure.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      generateBrochureFile(prop, user);
    }
  };

  const generateBrochureFile = (prop, user) => {
    const content = `================================================================================
                            EUD GROUP - OFFICIAL BROCHURE
================================================================================

PROPERTY INFORMATION
--------------------------------------------------------------------------------
Property Name  : ${prop.name}
Location       : ${prop.location}
Property Type  : ${prop.type}
Price Range    : ${prop.price}
Project Status : ${prop.status}
Beds / Config  : ${prop.beds || '3 & 4 BHK'}
Carpet Area    : ${prop.area || '1200 - 2400 sq.ft'}

--------------------------------------------------------------------------------
PROJECT OVERVIEW & HIGHLIGHTS
--------------------------------------------------------------------------------
${prop.desc || 'Ultra-luxurious residential development offering premium architecture, high-speed elevators, and green landscapes.'}

--------------------------------------------------------------------------------
WORLD-CLASS AMENITIES
--------------------------------------------------------------------------------
${prop.amenities ? prop.amenities.map(a => '  • ' + a).join('\n') : '  • Luxury Clubhouse\n  • Swimming Pool\n  • Gymnasium\n  • 24/7 Security'}

--------------------------------------------------------------------------------
CUSTOMER DETAILS & INQUIRY STAMP
--------------------------------------------------------------------------------
Requested By   : ${user.name}
Email Address  : ${user.email}
Phone Number   : ${user.phone}
Generated On   : ${new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}

--------------------------------------------------------------------------------
EUD GROUP (End User Destination)
Address: GH-04A, Sector 10, Greater Noida West, UP 203207
Contact: +91 99998 88990 | Web: www.eudgroup.com
================================================================================
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${prop.name.replace(/\s+/g, '_')}_Brochure.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    const payload = {
      timestamp: new Date().toLocaleString('en-IN'),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      propertyName: property.name,
      propertyLocation: property.location,
    };

    // Send lead data to Google Sheet via Apps Script Web App URL if configured
    if (GOOGLE_SHEET_SCRIPT_URL) {
      fetch(GOOGLE_SHEET_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch((err) => console.error('Error sending lead data to Google Sheet:', err));
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      downloadBrochure(property, formData);

      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', phone: '', email: '' });
        onClose();
      }, 2500);
    }, 600);
  };

  return (
    <div className="brochure-modal-overlay" onClick={onClose}>
      <div className="brochure-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="brochure-modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="brochure-success-state">
            <CheckCircle size={52} className="success-icon" />
            <h3 className="success-title">Brochure Downloaded!</h3>
            <p className="success-desc">
              Thank you, <strong>{formData.name}</strong>. The brochure for <strong>{property.name}</strong> has been downloaded. Our sales team will get in touch with you shortly at <strong>{formData.phone}</strong>.
            </p>
          </div>
        ) : (
          <>
            <div className="brochure-modal-header">
              <div className="brochure-icon-badge">
                <FileText size={22} />
              </div>
              <h3 className="brochure-modal-title">Download Official Brochure</h3>
              <p className="brochure-modal-subtitle">
                Please enter your details to download floor plans & specs for <strong>{property.name}</strong>
              </p>
            </div>

            <form className="brochure-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label className="form-label">
                  <User size={14} /> <span>Full Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`form-input ${errors.name ? 'input-error' : ''}`}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Phone size={14} /> <span>Contact Number</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter 10-digit mobile number"
                  className={`form-input ${errors.phone ? 'input-error' : ''}`}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Mail size={14} /> <span>Email Address</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <button type="submit" className="btn-submit-brochure" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span>Generating Brochure...</span>
                ) : (
                  <>
                    <Download size={16} /> <span>Submit & Download Brochure</span>
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
