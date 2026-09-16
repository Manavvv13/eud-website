import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import AboutPage from './components/AboutPage';
import Preloader from './components/Preloader';

import Eldeco7PeaksLanding from './components/Eldeco7PeaksLanding';
import Eldeco7PeaksConfirmation from './components/Eldeco7PeaksConfirmation';

function ScrollToTopAndRestore() {
  const location = useLocation();

  useEffect(() => {
    const htmlEl = document.documentElement;
    const originalScroll = htmlEl.style.scrollBehavior;
    
    // Reset scroll positions immediately
    htmlEl.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    htmlEl.scrollTop = 0;
    document.body.scrollTop = 0;
    
    setTimeout(() => {
      htmlEl.style.scrollBehavior = originalScroll;
      
      // If location state contains scrollTo target, trigger scroll into view
      if (location.state?.scrollTo) {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 50);
  }, [location.pathname, location.state]);

  return null;
}

function HomeRoute() {
  return (
    <>
      <Hero />
      <main>
        <Properties />
        <FAQ />
        <Testimonials />
        <CTABanner />
        <About />
      </main>
    </>
  );
}

function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isStandalone = location.pathname === '/eldeco-7-peaks' || location.pathname === '/godrej-majesty' || location.pathname === '/eldeco-7-peaks-confirmation';
  const [loading, setLoading] = useState(true);

  return (
    <div className="app-container">
      {/* Landing Page Preloader with Logo Zoom Out */}
      {isHome && loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Helper component to reset/restore scroll positions on navigation */}
      <ScrollToTopAndRestore />

      {/* Navigation — shown only on the homepage */}
      {isHome && <Navbar />}

      {/* Routing Configuration */}
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/properties" element={<AllProperties />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/campaign" element={<CampaignPage />} />
        {/* Performance Marketing Standalone Landing Pages */}
        <Route path="/eldeco-7-peaks" element={<Eldeco7PeaksLanding />} />
        <Route path="/godrej-majesty" element={<Eldeco7PeaksLanding />} />
        <Route path="/eldeco-7-peaks-confirmation" element={<Eldeco7PeaksConfirmation />} />
        {/* Support backward compatibility redirect from /contest to /campaign */}
        <Route path="/contest" element={<Navigate to="/campaign" replace />} />
        {/* Fallback route to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Footer — excluded on standalone performance marketing landing pages */}
      {!isStandalone && <Footer />}
    </div>
  );
}

export default App;
