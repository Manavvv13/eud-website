import React, { useEffect } from 'react';
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

  return (
    <div className="app-container">
      {/* Helper component to reset/restore scroll positions on navigation */}
      <ScrollToTopAndRestore />

      {/* Navigation — shown only on the homepage */}
      {isHome && <Navbar />}

      {/* Routing Configuration */}
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/properties" element={<AllProperties />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/campaign" element={<CampaignPage />} />
        {/* Support backward compatibility redirect from /contest to /campaign */}
        <Route path="/contest" element={<Navigate to="/campaign" replace />} />
        {/* Fallback route to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
