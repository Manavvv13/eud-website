import React, { useState, useRef, useEffect } from 'react';

const PREVIEW_PROPERTIES = [
  { name: 'CRC Joyous', location: 'Techzone 4 Noida Extension', type: 'Apartment' },
  { name: 'CRC Maesta', location: 'Sector 1 Greater Noida West', type: 'Apartment' },
  { name: 'Irish Platinum', location: 'Sector 10 Greater Noida West', type: 'Apartment' },
  { name: 'Elite X', location: 'Sector 10 Greater Noida West', type: 'Apartment' },
  { name: 'VVIP Addresses', location: 'Sector 12 Greater Noida West', type: 'Apartment' },
  { name: 'Nirala Trio', location: 'Sector 2 Greater Noida West', type: 'Apartment' },
  { name: 'Arihant One', location: 'Sector 1 Greater Noida West', type: 'Apartment' },
  { name: 'Ashtech', location: 'Sector 12 Greater Noida West', type: 'Apartment' },
  { name: 'Godrej Majesty', location: 'Sector 12 Greater Noida West', type: 'Apartment' },
  { name: 'Spring Elmas', location: 'Sector 12 Noida Extension', type: 'Apartment' },
  { name: 'Ace Hanei', location: 'Sector 150 Noida', type: 'Apartment' },
  { name: 'Nirala Estate', location: 'Techzone 4 Noida Extension', type: 'Apartment' },
  { name: 'Arihant Abode', location: 'Sector 10 Noida Extension', type: 'Apartment' },
  { name: 'Sobha Rivana', location: 'Sector 1 Greater Noida West', type: 'Apartment' },
  { name: 'Max', location: 'Sector 128 Noida', type: 'Apartment' },
  { name: 'Experion', location: 'Sector 45 Noida', type: 'Apartment' },
  { name: 'Elie Saab Residencies', location: 'Sector 150 Noida', type: 'Apartment' },
  { name: 'Nirala Gateway (Commercial)', location: 'Sector 16B Greater Noida West', type: 'Commercial' },
  { name: 'Nirala Diadem(Commercial)', location: 'Sector 2 Greater Noida West', type: 'Commercial' },
  { name: 'KB West Walk (Commercial)', location: 'Sector 12 Greater Noida West', type: 'Commercial' },
  { name: 'IRIS Trehan (Commercial)', location: 'Sector 1 Noida', type: 'Commercial' },
  { name: 'Gaur Chrysalis', location: 'Sector 22D Yamuna Expressway', type: 'Apartment' },
  { name: 'Eldeco Yamuna', location: 'Sector 22D Yamuna Expressway', type: 'Apartment' }
];

export default function SearchBar({ onSearch }) {
  const [propertyType, setPropertyType] = useState('');
  const [location, setLocation] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null); // 'type' | null
  const [showResultsDropdown, setShowResultsDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
        setShowResultsDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name) => {
    if (openDropdown === name) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(name);
      setShowResultsDropdown(false);
    }
  };

  const selectOption = (type, value) => {
    if (type === 'type') {
      setPropertyType(value);
      // Do not trigger search results dropdown when type is selected
      setShowResultsDropdown(false);
    }
    setOpenDropdown(null);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      // Pass the typed location, or selected property type if no location is entered
      onSearch(location || propertyType || '');
    }
  };

  const handleResultClick = (propertyName) => {
    if (onSearch) {
      onSearch(propertyName);
    }
    setShowResultsDropdown(false);
  };

  const types = ["Apartment", "Commercial"];

  // Filter properties based on type and typed search
  const matchedProperties = PREVIEW_PROPERTIES.filter((p) => {
    const matchesType = !propertyType || p.type.toLowerCase() === propertyType.toLowerCase();
    const query = location.trim().toLowerCase();
    const matchesLoc = p.location.toLowerCase().includes(query) || 
                       p.name.toLowerCase().includes(query);
    // Only return matching properties if the user has typed something in the locations input
    return query !== '' && matchesType && matchesLoc;
  }).slice(0, 5); // Show top 5 matches

  return (
    <div className="search-bar-card animate-fadeInUp delay-3" ref={dropdownRef}>
      <form onSubmit={handleSearchSubmit}>
        <div className="search-inputs-grid">
          {/* Property Type Dropdown */}
          <div className="search-field-group">
            <label className="field-label">Looking for</label>
            <div 
              className={`custom-dropdown-trigger ${openDropdown === 'type' ? 'active' : ''}`}
              onClick={() => toggleDropdown('type')}
            >
              <div className="trigger-value-wrapper">
                <span className={propertyType ? 'value-selected' : 'value-placeholder'}>
                  {propertyType || 'Enter type'}
                </span>
              </div>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>

            {openDropdown === 'type' && (
              <div className="custom-dropdown-menu">
                {types.map((t) => (
                  <div 
                    key={t} 
                    className={`dropdown-option ${propertyType === t ? 'selected' : ''}`}
                    onClick={() => selectOption('type', t)}
                  >
                    {t}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Location Input (Type Box) */}
          <div className="search-field-group">
            <label className="field-label">Locations</label>
            <input 
              type="text"
              className="search-input-text"
              placeholder="Search property or location..."
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setShowResultsDropdown(true);
              }}
              onFocus={() => setShowResultsDropdown(true)}
            />
          </div>

          {/* Search Button in Grid */}
          <div className="search-field-group">
            <label className="field-label" style={{ opacity: 0 }}>Search</label>
            <button type="submit" className="btn-search-submit-grid">
              Search Properties
            </button>
          </div>
        </div>
      </form>

      {/* Live search results dropdown */}
      {showResultsDropdown && (location || propertyType) && matchedProperties.length > 0 && (
        <div className="search-results-preview-menu">
          <div className="results-preview-header">Matched Properties</div>
          {matchedProperties.map((p, idx) => (
            <div 
              key={idx} 
              className="results-preview-item"
              onClick={() => handleResultClick(p.name)}
            >
              <div className="preview-item-name">{p.name}</div>
              <div className="preview-item-meta">{p.type} &bull; {p.location}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
