import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Search, SlidersHorizontal, Eye, Download } from 'lucide-react';
import PropertyDetailsPage from './PropertyDetailsPage';
import BrochureModal from './BrochureModal';

const ALL_PROPERTIES = [
  {
    id: 1,
    name: 'CRC Joyous',
    location: 'Techzone 4 Noida Extension',
    type: 'Apartment',
    price: '₹1.45 Cr – ₹3.15 Cr',
    status: 'Under Construction',
    brochure: '/brochures/CRC Joyous Brochure.pdf',
    image: '/Properties/CRC Joyous/CRCJ 1.avif',
    gallery: [
      '/Properties/CRC Joyous/CRCJ 1.avif',
      '/Properties/CRC Joyous/CRCJ 2.avif',
      '/Properties/CRC Joyous/CRCJ 3.avif',
      '/Properties/CRC Joyous/CRCJ 4.avif',
      '/Properties/CRC Joyous/CRCJ 5.avif',
      '/Properties/CRC Joyous/CRCJ 6.avif',
      '/Properties/CRC Joyous/CRCJ 7.avif'
    ],
    desc: 'Premium 2, 3 & 4 BHK apartments with modern architecture and luxury clubhouse amenities.',
    beds: '2, 3 & 4 BHK',
    area: '1040 - 1780 sq.ft',
    amenities: ['Clubhouse', 'Swimming Pool', 'Gymnasium', 'Tennis Court', 'Kids Play Area']
  },
  {
    id: 2,
    name: 'CRC Maesta',
    location: 'Sector 1 Greater Noida West',
    type: 'Apartment',
    price: '₹2.25 Cr – ₹3.80 Cr',
    status: 'Under Construction',
    brochure: '/brochures/CRC Maesta Brochure.pdf',
    image: '/Properties/CRC Maesta/CRCM 1.avif',
    gallery: [
      '/Properties/CRC Maesta/CRCM 1.avif',
      '/Properties/CRC Maesta/CRCM 2.avif',
      '/Properties/CRC Maesta/CRCM 3.avif',
      '/Properties/CRC Maesta/CRCM 4.avif',
      '/Properties/CRC Maesta/CRCM 5.avif'
    ],
    desc: 'High-end apartments featuring premium finishes, private decks, and green landscape views.',
    beds: '3 & 4 BHK',
    area: '1475 - 2000 sq.ft',
    amenities: ['Sky Lounge', 'Clubhouse', 'Swimming Pool', 'Gymnasium', 'Spa', 'Jogging Track']
  },
  {
    id: 3,
    name: 'Irish Platinum',
    location: 'Sector 10 Greater Noida West',
    type: 'Apartment',
    price: '₹1.60 Cr – ₹3.20 Cr',
    status: 'Under Construction',
    brochure: '/brochures/Irish Platinum Brochure.pdf',
    image: '/Properties/Irish Platinum/IP 1.avif',
    gallery: [
      '/Properties/Irish Platinum/IP 1.avif',
      '/Properties/Irish Platinum/IP 2.avif',
      '/Properties/Irish Platinum/IP 3.avif',
      '/Properties/Irish Platinum/IP 4.avif',
      '/Properties/Irish Platinum/IP 5.avif',
      '/Properties/Irish Platinum/IP 6.avif',
      '/Properties/Irish Platinum/IP 7.avif'
    ],
    desc: 'Luxury living units featuring smart automation, premium fixtures, and a 5-star lifestyle club.',
    beds: '3 & 4 BHK',
    area: '1280 - 1860 sq.ft',
    amenities: ['Mini Theater', 'Swimming Pool', 'Gym', 'Sports Courts', 'Yoga Deck']
  },
  {
    id: 4,
    name: 'Elite X',
    location: 'Sector 10 Greater Noida West',
    type: 'Apartment',
    price: '₹1.95 Cr – ₹3.80 Cr',
    status: 'Under Construction',
    image: '/Properties/Elite X/EX 1.avif',
    gallery: [
      '/Properties/Elite X/EX 1.avif',
      '/Properties/Elite X/EX 2.avif',
      '/Properties/Elite X/EX 3.avif',
      '/Properties/Elite X/EX 4.avif',
      '/Properties/Elite X/EX 5.avif',
      '/Properties/Elite X/EX 6.avif'
    ],
    desc: 'Spacious residential designs tailored to premium modern living with expansive open greens.',
    beds: '3 & 4 BHK',
    area: '1450 - 2100 sq.ft',
    amenities: ['Sky Garden', 'Swimming Pool', 'Gym', 'Amphitheatre', 'Billiards Room']
  },
  {
    id: 5,
    name: 'VVIP Addresses',
    location: 'Sector 12 Greater Noida West',
    type: 'Apartment',
    price: '₹1.10 Cr – ₹2.50 Cr',
    status: 'Ready to Move',
    image: '/Properties/VVIP Addresses/VVIP 1.avif',
    gallery: [
      '/Properties/VVIP Addresses/VVIP 1.avif',
      '/Properties/VVIP Addresses/VVIP 2.avif',
      '/Properties/VVIP Addresses/vvip 3.avif',
      '/Properties/VVIP Addresses/VVIP 4.avif',
      '/Properties/VVIP Addresses/VVIP 5.avif'
    ],
    desc: 'An iconic skyline project with wide decks, modular kitchens, and a semi-Olympic sized pool.',
    beds: '2, 3 & 4 BHK',
    area: '935 - 2630 sq.ft',
    amenities: ['Cricket Stadium', 'Clubhouse', 'Swimming Pool', '24/7 Power', 'Shopping Plaza']
  },
  {
    id: 7,
    name: 'Arihant One',
    location: 'Sector 1 Greater Noida West',
    type: 'Apartment',
    price: '₹1.40 Cr – ₹2.40 Cr',
    status: 'Under Construction',
    image: '/Properties/Arihant One/AO1.avif',
    gallery: [
      '/Properties/Arihant One/AO1.avif',
      '/Properties/Arihant One/AO2.avif',
      '/Properties/Arihant One/AO3.avif',
      '/Properties/Arihant One/AO4.avif',
      '/Properties/Arihant One/AO5.avif',
      '/Properties/Arihant One/AO6.avif'
    ],
    desc: 'Luxury residency offering exclusive double-height lobbies, high-speed elevators, and elite clubbing.',
    beds: '3 & 4 BHK',
    area: '1340 - 1760 sq.ft',
    amenities: ['Luxury Lobby', 'Squash Court', 'Swimming Pool', 'Clubhouse', 'Power Backup']
  },
  {
    id: 9,
    name: 'Godrej Majesty',
    location: 'Sector 12 Greater Noida West',
    type: 'Apartment',
    price: '₹2.40 Cr – ₹4.90 Cr',
    status: 'Under Construction',
    image: '/Properties/Godrej Majesty/GM1.avif',
    gallery: [
      '/Properties/Godrej Majesty/GM1.avif',
      '/Properties/Godrej Majesty/GM2.avif',
      '/Properties/Godrej Majesty/GM3.avif',
      '/Properties/Godrej Majesty/GM4.avif',
      '/Properties/Godrej Majesty/GM 5.avif'
    ],
    desc: 'Imperial resort living units flanked by golf views, curated forest landscapes, and luxury concierge.',
    beds: '3 & 4 BHK',
    area: '1450 - 2350 sq.ft',
    amenities: ['Golf Views', 'Concierge Service', 'Forest Park', 'Clubhouse', 'Gym']
  },
  {
    id: 10,
    name: 'Sublime Spring Elmas',
    location: 'Sector 12 Noida Extension',
    type: 'Apartment',
    price: '₹1.35 Cr – ₹2.60 Cr',
    status: 'Under Construction',
    image: '/Properties/Sublime Spring Elmas/SSE1.avif',
    gallery: [
      '/Properties/Sublime Spring Elmas/SSE1.avif',
      '/Properties/Sublime Spring Elmas/SSE2.avif',
      '/Properties/Sublime Spring Elmas/SSE3.avif',
      '/Properties/Sublime Spring Elmas/SSE4.avif',
      '/Properties/Sublime Spring Elmas/SSE5.avif',
      '/Properties/Sublime Spring Elmas/SSE6.avif',
      '/Properties/Sublime Spring Elmas/SSE7.avif',
      '/Properties/Sublime Spring Elmas/SSE8.avif'
    ],
    desc: 'Modernistic architecture equipped with high-end fixtures, wide open areas, and multi-tier security.',
    beds: '3 & 4 BHK',
    area: '1355 - 2450 sq.ft',
    amenities: ['High-speed Elevators', 'Gym', 'Kids Play Area', 'Sports Court', '24/7 Security']
  },
  {
    id: 11,
    name: 'Ace Hanei',
    location: 'Sector 12 Greater Noida West',
    type: 'Apartment',
    price: '₹1.65 Cr – ₹3.20 Cr',
    status: 'Under Construction',
    image: '/Properties/Ace Hanei/AH1.avif',
    gallery: [
      '/Properties/Ace Hanei/AH1.avif',
      '/Properties/Ace Hanei/AH2.avif',
      '/Properties/Ace Hanei/AH3.avif',
      '/Properties/Ace Hanei/AH4.avif',
      '/Properties/Ace Hanei/AH5.avif',
      '/Properties/Ace Hanei/AH6.avif'
    ],
    desc: 'Ultra-luxurious modern residences featuring grand entrance lobbies, high-speed elevators, and a world-class clubhouse.',
    beds: '3 & 4 BHK',
    area: '1400 - 2200 sq.ft',
    amenities: ['Clubhouse', 'Swimming Pool', 'Gymnasium', '24/7 Security', 'Kids Play Area']
  },
  {
    id: 12,
    name: 'Arihant Abode',
    location: 'Sector 10 Greater Noida West',
    type: 'Apartment',
    price: '₹1.15 Cr – ₹2.10 Cr',
    status: 'Under Construction',
    image: '/Properties/Arihant Abode/AA1.avif',
    gallery: [
      '/Properties/Arihant Abode/AA1.avif',
      '/Properties/Arihant Abode/AA2.avif',
      '/Properties/Arihant Abode/AA3.avif',
      '/Properties/Arihant Abode/AA4.avif',
      '/Properties/Arihant Abode/AA5.avif',
      '/Properties/Arihant Abode/AA6.avif',
      '/Properties/Arihant Abode/AA7.avif',
      '/Properties/Arihant Abode/AA8.avif'
    ],
    desc: 'Premium affordable luxury apartments with smart floor layouts, open greens, and lifestyle amenities.',
    beds: '2 & 3 BHK',
    area: '1050 - 1650 sq.ft',
    amenities: ['Swimming Pool', 'Gymnasium', 'Clubhouse', 'Jogging Track', 'Tennis Court']
  },
  {
    id: 13,
    name: 'Gaur Chrysalis',
    location: 'Sector 1 Greater Noida West',
    type: 'Apartment',
    price: '₹1.85 Cr – ₹3.50 Cr',
    status: 'Under Construction',
    image: '/Properties/Gaur Chrysalis/GC1.avif',
    gallery: [
      '/Properties/Gaur Chrysalis/GC1.avif',
      '/Properties/Gaur Chrysalis/GC2.avif',
      '/Properties/Gaur Chrysalis/GC3.avif',
      '/Properties/Gaur Chrysalis/GC4.avif',
      '/Properties/Gaur Chrysalis/GC5.avif'
    ],
    desc: 'Iconic high-rise towers featuring contemporary architecture, landscaped gardens, and a luxury lifestyle club.',
    beds: '3 & 4 BHK',
    area: '1350 - 2100 sq.ft',
    amenities: ['Sky Lounge', 'Clubhouse', 'Swimming Pool', 'Gymnasium', 'Amphitheatre']
  },
  {
    id: 14,
    name: 'Nirala Estate',
    location: 'Techzone 4 Greater Noida West',
    type: 'Apartment',
    price: '₹1.25 Cr – ₹2.85 Cr',
    status: 'Under Construction',
    image: '/Properties/Nirala Estate/NE1.avif',
    gallery: [
      '/Properties/Nirala Estate/NE1.avif',
      '/Properties/Nirala Estate/NE2.avif',
      '/Properties/Nirala Estate/NE3.avif',
      '/Properties/Nirala Estate/NE4.avif',
      '/Properties/Nirala Estate/NE5.avif',
      '/Properties/Nirala Estate/NE6.avif',
      '/Properties/Nirala Estate/NE7.avif',
      '/Properties/Nirala Estate/NE8.avif',
      '/Properties/Nirala Estate/NE9.avif',
      '/Properties/Nirala Estate/NE10.avif',
      '/Properties/Nirala Estate/NE11.avif',
      '/Properties/Nirala Estate/NE12.avif',
      '/Properties/Nirala Estate/NE13.avif'
    ],
    desc: 'Spacious residential development offering modern urban living with expansive green surroundings.',
    beds: '2, 3 & 4 BHK',
    area: '995 - 2320 sq.ft',
    amenities: ['Clubhouse', 'Swimming Pool', 'Yoga Deck', 'Sports Courts', '24/7 Security']
  },
  {
    id: 15,
    name: 'Shobha Rivana',
    location: 'Sector 12 Greater Noida West',
    type: 'Apartment',
    price: '₹2.10 Cr – ₹4.20 Cr',
    status: 'Under Construction',
    image: '/Properties/Shobha Rivana/SR1.avif',
    gallery: [
      '/Properties/Shobha Rivana/SR1.avif',
      '/Properties/Shobha Rivana/SR2.avif',
      '/Properties/Shobha Rivana/SR3.avif',
      '/Properties/Shobha Rivana/SR4.webp',
      '/Properties/Shobha Rivana/SR5.avif',
      '/Properties/Shobha Rivana/SR6.avif',
      '/Properties/Shobha Rivana/SR7.avif',
      '/Properties/Shobha Rivana/SR8.avif'
    ],
    desc: 'Luxury waterfront & garden facing apartments built with world-class engineering and fine finishes.',
    beds: '3 & 4 BHK',
    area: '1500 - 2400 sq.ft',
    amenities: ['Waterfront Promenade', 'Clubhouse', 'Infinity Pool', 'Gymnasium', 'Spa']
  }
];

// Reusable Custom Dropdown Component with smooth transitions
function CustomDropdown({ value, options, onChange, icon }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(o => o.value === value) || options[0];

  return (
    <div className="custom-select-wrapper" ref={dropdownRef}>
      <button 
        type="button" 
        className={`custom-select-trigger ${isOpen ? 'active' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon}
        <span className="custom-select-value">{selectedOption.label}</span>
        <svg className={`custom-select-arrow ${isOpen ? 'open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      
      <div className={`custom-select-options ${isOpen ? 'open' : ''}`}>
        {options.map((opt) => (
          <div 
            key={opt.value} 
            className={`custom-select-option ${value === opt.value ? 'selected' : ''}`}
            onClick={() => {
              onChange(opt.value);
              setIsOpen(false);
            }}
          >
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AllProperties() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialSearch = location.state?.searchCriteria || '';
  const onBack = () => navigate('/');

  const [search, setSearch] = useState(initialSearch);
  const [statusFilter, setStatusFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [searchParams, setSearchParams] = useSearchParams();
  const propertyId = searchParams.get('id');

  const [brochureProperty, setBrochureProperty] = useState(null);

  const selectedProperty = propertyId
    ? ALL_PROPERTIES.find(p => p.id === parseInt(propertyId, 10))
    : null;

  // Sync initialSearch if it updates from parent
  useEffect(() => {
    setSearch(initialSearch || '');
  }, [initialSearch]);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;

  // Scroll to top on mount immediately without smooth scroll transition
  useEffect(() => {
    const htmlEl = document.documentElement;
    const originalScroll = htmlEl.style.scrollBehavior;
    htmlEl.style.scrollBehavior = 'auto';

    window.scrollTo(0, 0);
    htmlEl.scrollTop = 0;
    document.body.scrollTop = 0;

    setTimeout(() => {
      htmlEl.style.scrollBehavior = originalScroll;
    }, 50);
  }, []);



  // Reset to first page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, locationFilter]);

  // Filter properties logic
  const filteredProperties = ALL_PROPERTIES.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.location.toLowerCase().includes(search.toLowerCase()) ||
                          p.type.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchesLocation = locationFilter === 'All' || 
                            (locationFilter === 'Noida' && p.location.includes('Noida') && !p.location.includes('Greater') && !p.location.includes('Yamuna')) ||
                            (locationFilter === 'Greater Noida' && p.location.includes('Greater Noida')) ||
                            (locationFilter === 'Yamuna Expressway' && p.location.includes('Yamuna Expressway'));

    return matchesSearch && matchesStatus && matchesLocation;
  });

  // Pagination calculations
  const totalProperties = filteredProperties.length;
  const totalPages = Math.ceil(totalProperties / propertiesPerPage);
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Smooth scroll back to filter section view
    const filterSection = document.querySelector('.filter-section-wrapper');
    if (filterSection) {
      filterSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const statusOptions = [
    { value: 'All', label: 'All Statuses' },
    { value: 'Under Construction', label: 'Under Construction' },
    { value: 'Ready to Move', label: 'Ready to Move' }
  ];

  const locationOptions = [
    { value: 'All', label: 'All Locations' },
    { value: 'Noida', label: 'Noida' },
    { value: 'Greater Noida', label: 'Greater Noida' },
    { value: 'Yamuna Expressway', label: 'Yamuna Expressway' }
  ];

  if (selectedProperty) {
    return (
      <PropertyDetailsPage
        property={selectedProperty}
        onBack={() => setSearchParams({})}
      />
    );
  }

  return (
    <div className="all-properties-page page-enter">
      {/* Simple Directory Header */}
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
          <h1 className="directory-title-simple">All Properties</h1>
        </div>
      </div>

      {/* Filter and Search Bar Section */}
      <div className="filter-section-wrapper">
        <div className="filter-inner-container">
          {/* Search Box */}
          <div className="search-box-wrapper">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by property name or location..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input-field"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="filters-dropdowns-group">
            <CustomDropdown 
              value={statusFilter}
              onChange={setStatusFilter}
              options={statusOptions}
              icon={<SlidersHorizontal size={14} className="filter-select-icon-custom" />}
            />

            <CustomDropdown 
              value={locationFilter}
              onChange={setLocationFilter}
              options={locationOptions}
              icon={<SlidersHorizontal size={14} className="filter-select-icon-custom" />}
            />
          </div>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="directory-grid-section">
        <div className="directory-grid-inner">
          <div className="directory-results-meta">
            Found <strong>{totalProperties}</strong> premium properties
          </div>

          {currentProperties.length > 0 ? (
            <>
              <div className="premier-houses-grid">
                {currentProperties.map((p) => (
                  <div key={p.id} className="premier-card">
                    <div className="premier-card-img-wrapper">
                      <img src={p.image} alt={p.name} className="premier-card-img" />
                      <span className="premier-card-badge">{p.status}</span>
                    </div>
                    <div className="premier-card-body">
                      <div className="premier-card-meta">
                        <span className="premier-card-meta-item">{p.type}</span>
                        <span className="premier-card-dot">·</span>
                        <span className="premier-card-meta-item">{p.location}</span>
                      </div>
                      <h3 className="premier-card-name">{p.name}</h3>
                      <p className="premier-card-price-row">
                        <span className="premier-card-price">{p.price}</span>
                      </p>
                      
                      {/* Specs Row */}
                      <div className="premier-card-specs">
                        <div className="card-spec-item">
                          <strong>Beds:</strong> {p.beds}
                        </div>
                        <div className="card-spec-item">
                          <strong>Area:</strong> {p.area}
                        </div>
                      </div>

                      {/* Amenities Row */}
                      <div className="premier-card-amenities" title={p.amenities.join(', ')}>
                        <strong>Amenities:</strong> {p.amenities.slice(0, 3).join(', ')}{p.amenities.length > 3 ? '...' : ''}
                      </div>

                      <div className="card-actions-row">
                        <button className="btn-view-details-dir" onClick={() => setSearchParams({ id: p.id })}>
                          <Eye size={14} /> <span>View Details</span>
                        </button>
                        <button 
                          className="btn-brochure-dir" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setBrochureProperty(p);
                          }}
                        >
                          <Download size={14} /> <span>Brochure</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="directory-pagination">
                  <button 
                    className="btn-pagination-nav" 
                    onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  
                  <div className="pagination-numbers">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                      <button
                        key={pageNumber}
                        className={`pagination-number-btn ${currentPage === pageNumber ? 'active' : ''}`}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    ))}
                  </div>

                  <button 
                    className="btn-pagination-nav" 
                    onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="no-results-found">
              <h3>No properties found matching your criteria</h3>
              <p>Try adjusting your search filters or clear your keywords.</p>
              <button 
                className="btn-clear-filters"
                onClick={() => {
                  setSearch('');
                  setStatusFilter('All');
                  setLocationFilter('All');
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Brochure Modal */}
      <BrochureModal 
        property={brochureProperty} 
        isOpen={!!brochureProperty} 
        onClose={() => setBrochureProperty(null)} 
      />

    </div>
  );
}
