import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Share2, MapPin, X, ChevronLeft, ChevronRight,
  Building, Waves, Dumbbell, Activity, Smile, Cloud, Sparkles, Footprints, 
  Film, Trophy, Zap, ShoppingBag, Wind, Trees, UserCheck, ArrowUpDown, 
  ShieldCheck, HelpCircle 
} from 'lucide-react';

const getAmenityIcon = (name) => {
  const norm = name.toLowerCase();
  if (norm.includes('clubhouse')) return <Building size={18} />;
  if (norm.includes('pool') || norm.includes('swimming')) return <Waves size={18} />;
  if (norm.includes('gym') || norm.includes('gymnasium')) return <Dumbbell size={18} />;
  if (norm.includes('tennis') || norm.includes('squash') || norm.includes('court') || norm.includes('sports')) return <Activity size={18} />;
  if (norm.includes('kids') || norm.includes('play')) return <Smile size={18} />;
  if (norm.includes('sky') || norm.includes('lounge') || norm.includes('garden')) return <Cloud size={18} />;
  if (norm.includes('spa')) return <Sparkles size={18} />;
  if (norm.includes('jogging') || norm.includes('track') || norm.includes('yoga') || norm.includes('lawn') || norm.includes('deck')) return <Footprints size={18} />;
  if (norm.includes('theater') || norm.includes('multiplex') || norm.includes('cinema')) return <Film size={18} />;
  if (norm.includes('cricket') || norm.includes('stadium') || norm.includes('infrastructure')) return <Trophy size={18} />;
  if (norm.includes('power') || norm.includes('backup') || norm.includes('electricity')) return <Zap size={18} />;
  if (norm.includes('shopping') || norm.includes('plaza') || norm.includes('retail') || norm.includes('store') || norm.includes('shop')) return <ShoppingBag size={18} />;
  if (norm.includes('ac') || norm.includes('air conditioning')) return <Wind size={18} />;
  if (norm.includes('golf') || norm.includes('green') || norm.includes('park') || norm.includes('landscape') || norm.includes('view') || norm.includes('forest')) return <Trees size={18} />;
  if (norm.includes('concierge') || norm.includes('service')) return <UserCheck size={18} />;
  if (norm.includes('elevator') || norm.includes('lift')) return <ArrowUpDown size={18} />;
  if (norm.includes('security') || norm.includes('cctv') || norm.includes('lock')) return <ShieldCheck size={18} />;
  return <HelpCircle size={18} />;
};

export default function PropertyDetailsPage({ property, onBack }) {
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  
  // Lightbox slideshow state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Scroll to top when this page is loaded
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [property]);

  if (!property) return null;

  // Prepare images for grid (needs exactly 4 images)
  const gallery = property.gallery && property.gallery.length > 0 
    ? property.gallery 
    : [property.image];
  
  const gridImages = [];
  for (let i = 0; i < 4; i++) {
    gridImages.push(gallery[i % gallery.length]);
  }

  // Format Helper for Area Spec
  const getAreaParts = (areaStr) => {
    if (!areaStr) return { val: 'N/A', unit: 'Sq.Ft' };
    const norm = areaStr.toLowerCase();
    const unitIndex = norm.indexOf('sq.ft');
    if (unitIndex !== -1) {
      const val = areaStr.substring(0, unitIndex).trim();
      const unit = areaStr.substring(unitIndex).trim();
      return { val, unit };
    }
    return { val: areaStr, unit: 'Area' };
  };

  // Format Helper for Beds Spec
  const getBedsParts = (bedsStr) => {
    if (!bedsStr) return { val: 'N/A', unit: 'BHK' };
    const parts = bedsStr.trim().split(/\s+/);
    if (parts.length > 1 && parts[parts.length - 1].toUpperCase().includes('BHK')) {
      return {
        val: parts.slice(0, -1).join(' '),
        unit: parts[parts.length - 1]
      };
    }
    return { val: bedsStr, unit: 'Config' };
  };

  const areaParts = getAreaParts(property.area);
  const bedsParts = getBedsParts(property.beds);



  const handleShare = () => {
    const pageUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: property.name,
        text: `Check out ${property.name} on EUD Group`,
        url: pageUrl
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(pageUrl);
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    }
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handlePrevLightboxImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const handleNextLightboxImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % gallery.length);
  };

  const handleEnquire = () => {
    const messageText = `Hi, I'm interested in inquiring about the "${property.name}" property located in ${property.location}.\nPrice: ${property.price}`;
    const waUrl = `https://wa.me/919999888990?text=${encodeURIComponent(messageText)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="property-detail-page page-enter">
      {/* Detail Page Header Navigation */}
      <div className="detail-navigation-header">
        <div className="detail-navigation-inner">
          <div className="detail-logo" onClick={onBack} style={{ cursor: 'pointer' }}>
            <img src="/EUD Logo.png" alt="EUD Logo" className="logo-img" />
          </div>
        </div>
      </div>

      <div className="detail-container">
        <button className="btn-detail-back" onClick={onBack}>
          <ArrowLeft size={14} /> <span>Back to All Properties</span>
        </button>

        {/* Title and Location Block */}
        <div className="detail-title-block">
          <div className="detail-title-main-group">
            <h1 className="detail-title-heading">{property.name}</h1>
            <div className="detail-location-row">
              <MapPin size={16} className="location-pin-icon" />
              <span>{property.location}</span>
            </div>
          </div>
          <div className="detail-action-buttons">
            <div className="share-btn-wrapper">
              <button 
                className="detail-action-btn btn-share" 
                onClick={handleShare}
                aria-label="Share property"
              >
                <Share2 size={16} />
                <span>Share</span>
              </button>
              {showShareTooltip && <div className="share-tooltip">Link copied!</div>}
            </div>
          </div>
        </div>

        {/* Premium Airbnb Photo Grid */}
        {gallery.length > 1 ? (
          <div className="detail-photo-grid">
            <div className="photo-grid-main" onClick={() => openLightbox(0)}>
              <img src={gridImages[0]} alt={`${property.name} Main View`} className="grid-image main-img" />
            </div>
            <div className="photo-grid-sub">
              <div className="grid-sub-top" onClick={() => openLightbox(1 % gallery.length)}>
                <img src={gridImages[1]} alt={`${property.name} View 2`} className="grid-image" />
              </div>
              <div className="grid-sub-bottom">
                <div className="grid-sub-bottom-left" onClick={() => openLightbox(2 % gallery.length)}>
                  <img src={gridImages[2]} alt={`${property.name} View 3`} className="grid-image" />
                </div>
                <div className="grid-sub-bottom-right" onClick={() => openLightbox(3 % gallery.length)}>
                  <img src={gridImages[3]} alt={`${property.name} View 4`} className="grid-image" />
                  <button 
                    className="btn-grid-view-all" 
                    onClick={(e) => {
                      e.stopPropagation();
                      openLightbox(0);
                    }}
                  >
                    View all
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="detail-photo-grid single-image">
            <div className="photo-grid-main full-width" onClick={() => openLightbox(0)}>
              <img src={gallery[0]} alt={`${property.name} View`} className="grid-image main-img" />
            </div>
          </div>
        )}

        {/* Info Layout Split: Left details & specs, Right sticky booking card */}
        <div className="detail-content-layout">
          {/* Left Column */}
          <div className="detail-info-column">


            {/* Spec Metrics Row */}
            <div className="detail-specs-metrics">
              <div className="spec-metric-card">
                <span className="metric-value">{areaParts.val}</span>
                <span className="metric-label">{areaParts.unit}</span>
              </div>
              <div className="spec-metric-card">
                <span className="metric-value">{bedsParts.val}</span>
                <span className="metric-label">{bedsParts.unit}</span>
              </div>
              <div className="spec-metric-card">
                <span className="metric-value">{property.type}</span>
                <span className="metric-label">Property Type</span>
              </div>
              <div className="spec-metric-card">
                <span className="metric-value status-value">{property.status}</span>
                <span className="metric-label">Status</span>
              </div>
            </div>

            {/* About Section */}
            <div className="detail-about-section">
              <h2 className="about-heading">About</h2>
              <p className="about-description-text">{property.desc}</p>
            </div>

            {/* Amenities Section */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="detail-amenities-section">
                <h2 className="amenities-heading">Amenities</h2>
                <div className="amenities-grid">
                  {property.amenities.map((am, index) => (
                    <div key={index} className="amenity-item-box">
                      <span className="amenity-icon">{getAmenityIcon(am)}</span>
                      <span className="amenity-name">{am}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (Sidebar Booking Card) */}
          <div className="detail-sidebar-column">
            <div className="booking-sidebar-card">
              <div className="booking-price-header">
                <span className="booking-price-label">Price Range</span>
                <div className="booking-price-value">{property.price}</div>
              </div>

              <button className="btn-booking-submit" onClick={handleEnquire}>
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Enquiry Bar */}
      <div className="mobile-enquiry-bar">
        <div className="mobile-price-info">
          <span className="mobile-price-label">Price Range</span>
          <div className="mobile-price-value">{property.price}</div>
        </div>
        <button className="btn-mobile-enquire" onClick={handleEnquire}>
          Enquire Now
        </button>
      </div>

      {/* Premium Fullscreen Gallery Lightbox Modal */}
      {isLightboxOpen && (
        <div className="lightbox-overlay" onClick={() => setIsLightboxOpen(false)}>
          <button className="btn-close-lightbox" onClick={() => setIsLightboxOpen(false)} aria-label="Close gallery">
            <X size={24} />
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-main-img-container">
              <img src={gallery[lightboxIndex]} alt={`${property.name} Slide ${lightboxIndex + 1}`} className="lightbox-main-img" />
              
              {gallery.length > 1 && (
                <>
                  <button className="lightbox-nav-btn prev" onClick={handlePrevLightboxImage} aria-label="Previous slide">
                    <ChevronLeft size={28} />
                  </button>
                  <button className="lightbox-nav-btn next" onClick={handleNextLightboxImage} aria-label="Next slide">
                    <ChevronRight size={28} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Navigation Row */}
            {gallery.length > 1 && (
              <div className="lightbox-thumbs-container">
                {gallery.map((imgUrl, idx) => (
                  <button 
                    key={idx}
                    type="button"
                    className={`lightbox-thumb-btn ${lightboxIndex === idx ? 'active' : ''}`}
                    onClick={() => setLightboxIndex(idx)}
                  >
                    <img src={imgUrl} alt={`Thumb ${idx + 1}`} className="lightbox-thumb-img" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
