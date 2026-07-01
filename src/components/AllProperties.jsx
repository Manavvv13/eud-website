import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, SlidersHorizontal, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';

const ALL_PROPERTIES = [
  {
    id: 1,
    name: 'CRC Joyous',
    location: 'Techzone 4 Noida Extension',
    type: 'Apartment',
    price: '₹1.45 Cr – ₹3.15 Cr',
    status: 'Under Construction',
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
    id: 6,
    name: 'Nirala Trio',
    location: 'Sector 2 Greater Noida West',
    type: 'Apartment',
    price: '₹1.15 Cr – ₹1.60 Cr',
    status: 'Under Construction',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
    desc: 'Modern living at its best, featuring premium amenities, standard sports courts, and parks.',
    beds: '3 BHK',
    area: '1245 - 1590 sq.ft',
    amenities: ['Gym', 'Yoga Lawn', 'Clubhouse', 'Basketball Court', 'Kids Pool']
  },
  {
    id: 7,
    name: 'Arihant One',
    location: 'Sector 1 Greater Noida West',
    type: 'Apartment',
    price: '₹1.40 Cr – ₹2.40 Cr',
    status: 'Under Construction',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    desc: 'Luxury residency offering exclusive double-height lobbies, high-speed elevators, and elite clubbing.',
    beds: '3 & 4 BHK',
    area: '1340 - 1760 sq.ft',
    amenities: ['Luxury Lobby', 'Squash Court', 'Swimming Pool', 'Clubhouse', 'Power Backup']
  },
  {
    id: 8,
    name: 'Ashtech',
    location: 'Sector 12 Greater Noida West',
    type: 'Apartment',
    price: '₹2.50 Cr – ₹4.90 Cr',
    status: 'Under Construction',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    desc: 'A premium green living sanctuary focusing on active sports infrastructure and low-density layouts.',
    beds: '3 & 4 BHK',
    area: '1650 - 2450 sq.ft',
    amenities: ['Wrap-around Balcony', 'Central AC', 'Swimming Pool', 'Gym', 'Landscape Gardens']
  },
  {
    id: 9,
    name: 'Godrej Majesty',
    location: 'Sector 12 Greater Noida West',
    type: 'Apartment',
    price: '₹2.40 Cr – ₹4.90 Cr',
    status: 'Under Construction',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    desc: 'Imperial resort living units flanked by golf views, curated forest landscapes, and luxury concierge.',
    beds: '3 & 4 BHK',
    area: '1450 - 2350 sq.ft',
    amenities: ['Golf Views', 'Concierge Service', 'Forest Park', 'Clubhouse', 'Gym']
  },
  {
    id: 10,
    name: 'Spring Elmas',
    location: 'Sector 12 Noida Extension',
    type: 'Apartment',
    price: '₹1.35 Cr – ₹2.60 Cr',
    status: 'Under Construction',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    desc: 'Modernistic architecture equipped with high-end fixtures, wide open areas, and multi-tier security.',
    beds: '3 & 4 BHK',
    area: '1355 - 2450 sq.ft',
    amenities: ['High-speed Elevators', 'Gym', 'Kids Play Area', 'Sports Court', '24/7 Security']
  },
  {
    id: 11,
    name: 'Ace Hanei',
    location: 'Sector 150 Noida',
    type: 'Apartment',
    price: '₹2.25 Cr – ₹4.50 Cr',
    status: 'Under Construction',
    image: 'https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?auto=format&fit=crop&w=800&q=80',
    desc: 'Bespoke lifestyle apartments built with international structure standards and top sport amenities.',
    beds: '3 & 4 BHK',
    area: '2200 - 3200 sq.ft',
    amenities: ['Sports Infrastructure', 'Luxury Clubhouse', 'Pool', 'Jogging Track', 'Tennis Court']
  },
  {
    id: 12,
    name: 'Nirala Estate',
    location: 'Techzone 4 Noida Extension',
    type: 'Apartment',
    price: '₹1.05 Cr – ₹2.20 Cr',
    status: 'Ready to Move',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
    desc: 'An established, fully functional township with lush green pathways, standard club, and retail stores.',
    beds: '2, 3 & 4 BHK',
    area: '950 - 1897 sq.ft',
    amenities: ['Lush Green Parks', 'Swimming Pool', 'Gym', 'Retail Stores', 'Basketball Court']
  },
  {
    id: 13,
    name: 'Arihant Abode',
    location: 'Sector 10 Noida Extension',
    type: 'Apartment',
    price: '₹95 Lakhs – ₹1.80 Cr',
    status: 'Ready to Move',
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&q=80',
    desc: 'Smartly designed affordable luxury homes featuring excellent ventilation and structural stability.',
    beds: '2 & 3 BHK',
    area: '920 - 1270 sq.ft',
    amenities: ['Clubhouse', 'Gym', 'Swimming Pool', 'Jogging Track', 'Kids Play Area']
  },
  {
    id: 14,
    name: 'Sobha Rivana',
    location: 'Sector 1 Greater Noida West',
    type: 'Apartment',
    price: '₹1.70 Cr – ₹3.50 Cr',
    status: 'Under Construction',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    desc: 'Ultra-luxurious riverfront residences with private elevator access, double-height decks, and premium marble flooring.',
    beds: '2, 3 & 4 BHK',
    area: '1200 - 2100 sq.ft',
    amenities: ['Living Rivulet', 'Massive Clubhouse', 'Pool', 'High-Rise Decks', '80% Open Area']
  },
  {
    id: 15,
    name: 'Max',
    location: 'Sector 128 Noida',
    type: 'Apartment',
    price: '₹6.00 Cr – ₹12.00 Cr',
    status: 'Under Construction',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
    desc: 'Super-premium ultra-luxury boutique condominiums featuring panoramic golf vistas and smart services.',
    beds: '4 BHK',
    area: '2600 - 4500 sq.ft',
    amenities: ['Panoramic Golf View', 'Boutique Club', 'Smart Automation', 'Concierge', 'Eco Filtration']
  },
  {
    id: 16,
    name: 'Experion',
    location: 'Sector 45 Noida',
    type: 'Apartment',
    price: '₹4.20 Cr – ₹8.50 Cr',
    status: 'Under Construction',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    desc: 'A premium residential complex with 100% power backup, top structural engineering, and sprawling clubs.',
    beds: '3 & 4 BHK',
    area: '1950 - 3200 sq.ft',
    amenities: ['Modern Clubhouse', 'Swimming Pool', 'Gym', 'Spa', 'Active Sports Arena']
  },
  {
    id: 17,
    name: 'Elie Saab Residencies',
    location: 'Sector 150 Noida',
    type: 'Apartment',
    price: '₹3.50 Cr – ₹7.20 Cr',
    status: 'Under Construction',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    desc: 'Signature luxury interior designer flats styled by Elie Saab, boasting unparalleled quality and style.',
    beds: '3 & 4 BHK',
    area: '1850 - 2750 sq.ft',
    amenities: ['Elie Saab Interiors', 'Infinity Pool', 'Designer Lobby', 'Private Lounge', 'Clubhouse']
  },
  {
    id: 18,
    name: 'Nirala Gateway (Commercial)',
    location: 'Sector 16B Greater Noida West',
    type: 'Commercial',
    price: '₹50 Lakhs – ₹2.50 Cr',
    status: 'Under Construction',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    desc: 'A futuristic shopping complex and corporate office tower situated at a high footfall junction.',
    beds: 'Shops & Offices',
    area: '250 - 1200 sq.ft',
    amenities: ['Food Court', 'High-speed Elevators', 'Ample Parking', 'CCTV Security', 'Retail Zone']
  },
  {
    id: 19,
    name: 'Nirala Diadem(Commercial)',
    location: 'Sector 2 Greater Noida West',
    type: 'Commercial',
    price: '₹40 Lakhs – ₹1.90 Cr',
    status: 'Under Construction',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    desc: 'Commercial plaza boasting retail showrooms, restaurants with open seating, and premium spaces.',
    beds: 'Retail & Food Court',
    area: '180 - 950 sq.ft',
    amenities: ['Multiplex', 'Food Court', 'Open Terrace Dining', 'Escalators', 'CCTV Security']
  },
  {
    id: 20,
    name: 'KB West Walk (Commercial)',
    location: 'Sector 12 Greater Noida West',
    type: 'Commercial',
    price: '₹60 Lakhs – ₹3.00 Cr',
    status: 'Under Construction',
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=800&q=80',
    desc: 'Modern high-street retail stores and dynamic office suites offering premium infrastructure.',
    beds: 'Shops & Suites',
    area: '300 - 1500 sq.ft',
    amenities: ['Central Courtyard', 'Escalators', 'Hypermarket Anchor', 'Power Backup', 'Double Lifts']
  },
  {
    id: 21,
    name: 'IRIS Trehan (Commercial)',
    location: 'Sector 1 Noida',
    type: 'Commercial',
    price: '₹80 Lakhs – ₹4.20 Cr',
    status: 'Ready to Move',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    desc: 'Ready-to-occupy retail spaces and premium business desks in the core commercial hub of Sector 1.',
    beds: 'Office & Showroom',
    area: '400 - 2500 sq.ft',
    amenities: ['Multiplex', 'Double-Height Shops', 'Food Court Area', 'Modern Elevators', 'Wi-Fi Zone']
  },
  {
    id: 22,
    name: 'Gaur Chrysalis',
    location: 'Sector 22D Yamuna Expressway',
    type: 'Apartment',
    price: '₹1.60 Cr – ₹2.80 Cr',
    status: 'Under Construction',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    desc: 'Sprawling high-rise project positioned strategically along Yamuna Expressway, close to the airport site.',
    beds: '3 & 4 BHK',
    area: '1910 - 2495 sq.ft',
    amenities: ['Hafeez Contractor Design', '75k sqft Clubhouse', 'Sky Gardens', 'Sports Facility']
  },
  {
    id: 23,
    name: 'Eldeco Yamuna',
    location: 'Sector 22D Yamuna Expressway',
    type: 'Apartment',
    price: '₹1.10 Cr – ₹2.20 Cr',
    status: 'Under Construction',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
    desc: 'Impeccably designed apartments offering unmatched quality and open-green landscaping.',
    beds: '2 & 3 BHK',
    area: '950 - 1450 sq.ft',
    amenities: ['VRF Air Conditioning', 'Corner Unit Layout', 'Clubhouse', 'Pool', '78% Open Area']
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

export default function AllProperties({ initialSearch, onBack }) {
  const [search, setSearch] = useState(initialSearch || '');
  const [statusFilter, setStatusFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  // Sync initialSearch if it updates from parent
  useEffect(() => {
    setSearch(initialSearch || '');
  }, [initialSearch]);

  // Sync activeImage when selectedProperty changes
  useEffect(() => {
    if (selectedProperty) {
      setActiveImage(selectedProperty.image);
    } else {
      setActiveImage(null);
    }
  }, [selectedProperty]);
  
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

  const handlePrevImage = () => {
    if (!selectedProperty?.gallery || selectedProperty.gallery.length <= 1) return;
    const currentIdx = selectedProperty.gallery.indexOf(activeImage || selectedProperty.image);
    const prevIdx = (currentIdx - 1 + selectedProperty.gallery.length) % selectedProperty.gallery.length;
    setActiveImage(selectedProperty.gallery[prevIdx]);
  };

  const handleNextImage = () => {
    if (!selectedProperty?.gallery || selectedProperty.gallery.length <= 1) return;
    const currentIdx = selectedProperty.gallery.indexOf(activeImage || selectedProperty.image);
    const nextIdx = (currentIdx + 1) % selectedProperty.gallery.length;
    setActiveImage(selectedProperty.gallery[nextIdx]);
  };

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

                      <button className="btn-view-details-dir" onClick={() => setSelectedProperty(p)}>
                        <Eye size={14} /> <span>View Details</span>
                      </button>
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

      {/* Property Details Modal */}
      {selectedProperty && (
        <div className="property-modal-overlay">
          <div className="property-modal-card">
            <button className="btn-close-modal" onClick={() => setSelectedProperty(null)}>
              <X size={20} />
            </button>
            <div className="modal-content-grid">
              <div className="modal-image-col">
                <div className="modal-main-img-wrapper">
                  <img src={activeImage || selectedProperty.image} alt={selectedProperty.name} className="modal-main-img" />
                  
                  {selectedProperty.gallery && selectedProperty.gallery.length > 1 && (
                    <>
                      <button 
                        type="button" 
                        className="modal-gallery-nav-btn prev"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrevImage();
                        }}
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={22} />
                      </button>
                      <button 
                        type="button" 
                        className="modal-gallery-nav-btn next"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNextImage();
                        }}
                        aria-label="Next image"
                      >
                        <ChevronRight size={22} />
                      </button>
                    </>
                  )}
                </div>
                {/* Gallery Thumbnails */}
                {selectedProperty.gallery && selectedProperty.gallery.length > 0 && (
                  <div className="modal-gallery-thumbs-row">
                    {selectedProperty.gallery.map((imgUrl, idx) => (
                      <button 
                        key={idx}
                        type="button"
                        className={`modal-gallery-thumb-btn ${(activeImage || selectedProperty.image) === imgUrl ? 'active' : ''}`}
                        onClick={() => setActiveImage(imgUrl)}
                      >
                        <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="modal-gallery-thumb-img" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="modal-details-col">
                <span className="modal-badge">{selectedProperty.status}</span>
                <h2 className="modal-title">{selectedProperty.name}</h2>
                <p className="modal-location">{selectedProperty.type} &bull; {selectedProperty.location}</p>
                <div className="modal-price-tag">{selectedProperty.price}</div>
                
                <div className="modal-quick-specs">
                  <div className="spec-pill">
                    <strong>Beds:</strong> {selectedProperty.beds}
                  </div>
                  <div className="spec-pill">
                    <strong>Area:</strong> {selectedProperty.area}
                  </div>
                </div>

                <div className="modal-amenities-section" style={{ marginBottom: '20px', width: '100%' }}>
                  <h4 style={{ fontSize: '13.5px', fontWeight: '700', marginBottom: '8px', color: '#0F172A' }}>Amenities:</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {selectedProperty.amenities.map((am, i) => (
                      <span key={i} style={{ background: '#F1F5F9', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', color: '#475569' }}>
                        {am}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="modal-desc">{selectedProperty.desc}</p>

                <div className="modal-cta-actions">
                  <a href="#contact" onClick={() => { setSelectedProperty(null); onBack(); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 300); }} className="modal-btn-primary">
                    Enquire Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
