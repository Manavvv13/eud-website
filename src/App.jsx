import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Properties from './components/Properties';
import AllProperties from './components/AllProperties';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import CTABanner from './components/CTABanner';
import About from './components/About';
import Footer from './components/Footer';
import ContactPage from './components/ContactPage';
import CampaignPage from './components/CampaignPage';

function App() {
  const [searchCriteria, setSearchCriteria] = useState(null);
  const [currentView, setCurrentView] = useState(() => {
    const hash = window.location.hash;
    if (hash === '#/properties') return 'all-properties';
    if (hash === '#/contact') return 'contact';
    if (hash === '#/contest' || hash === '#/campaign') return 'campaign';
    return 'home';
  });

  const navigateTo = (view, hash) => {
    const htmlEl = document.documentElement;
    const originalScroll = htmlEl.style.scrollBehavior;
    htmlEl.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    htmlEl.scrollTop = 0;
    document.body.scrollTop = 0;
    setTimeout(() => { htmlEl.style.scrollBehavior = originalScroll; }, 50);
    window.location.hash = hash;
    setCurrentView(view);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const htmlEl = document.documentElement;
      const originalScroll = htmlEl.style.scrollBehavior;
      htmlEl.style.scrollBehavior = 'auto';
      window.scrollTo(0, 0);
      htmlEl.scrollTop = 0;
      document.body.scrollTop = 0;
      setTimeout(() => { htmlEl.style.scrollBehavior = originalScroll; }, 50);

      const hash = window.location.hash;
      if (hash === '#/properties') setCurrentView('all-properties');
      else if (hash === '#/contact') setCurrentView('contact');
      else if (hash === '#/contest' || hash === '#/campaign') setCurrentView('campaign');
      else setCurrentView('home');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);
    navigateTo('all-properties', '#/properties');
  };

  const handleGoContact = () => navigateTo('contact', '#/contact');
  const handleGoHome = () => navigateTo('home', '#/');

  return (
    <div className="app-container">
      {/* Navigation — shown on home, hidden on all-properties and contact */}
      {currentView === 'home' && (
        <Navbar currentView={currentView} setCurrentView={setCurrentView} onContact={handleGoContact} />
      )}

      {currentView === 'home' ? (
        <>
          <Hero onSearch={handleSearch} />
          <main>
            <Properties 
              searchCriteria={searchCriteria} 
              onSeeAll={() => navigateTo('all-properties', '#/properties')} 
              onGoContest={() => navigateTo('campaign', '#/contest')}
            />
            <FAQ />
            <Testimonials />
            <CTABanner onContact={handleGoContact} />
            <About />
          </main>
        </>
      ) : currentView === 'all-properties' ? (
        <AllProperties
          initialSearch={searchCriteria}
          onBack={() => {
            setSearchCriteria(null);
            navigateTo('home', '#/');
          }}
        />
      ) : currentView === 'campaign' ? (
        <CampaignPage onBack={handleGoHome} />
      ) : (
        <ContactPage onBack={handleGoHome} />
      )}

      {/* Footer */}
      <Footer setCurrentView={setCurrentView} onContact={handleGoContact} />
    </div>
  );
}

export default App;
