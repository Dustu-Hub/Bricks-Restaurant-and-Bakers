import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import Locations from './pages/Locations';
import Booking from './pages/Booking';
import Gallery from './pages/Gallery';
import Reviews from './pages/Reviews';
import Auth from './pages/Auth';
import Contact from './pages/Contact';
import CakeDesigner from './pages/CakeDesigner';
import FeaturedReels from './pages/FeaturedReels';

export default function App() {
  const [currentPath, setCurrentPath] = useState('home');
  const [selectedBranchId, setSelectedBranchId] = useState<'sardarpura' | 'bhadwasiya' | 'paota' | null>(null);
  
  // Local member auth simulation
  const [user, setUser] = useState<{ name: string; email: string; phone?: string } | null>(null);

  // Parse hash on load & hashchange
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash || '#/home';
      const parts = hash.replace(/^#\//, '').split('/');
      const mainPath = parts[0] || 'home';
      const subPath = parts[1] || null;

      setCurrentPath(mainPath);

      if (mainPath === 'locations') {
        if (subPath === 'sardarpura' || subPath === 'bhadwasiya' || subPath === 'paota') {
          setSelectedBranchId(subPath as any);
        } else {
          setSelectedBranchId(null);
        }
      }
    };

    // Load mock user from localStorage if exists
    const savedUser = localStorage.getItem('bricks_user_profile');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error('Failed to parse saved user', err);
      }
    }

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const handleNavigate = (path: string) => {
    if (path === 'locations' && selectedBranchId) {
      window.location.hash = `#/locations/${selectedBranchId}`;
    } else {
      window.location.hash = `#/${path}`;
    }
  };

  const handleSelectBranch = (branchId: 'sardarpura' | 'bhadwasiya' | 'paota' | null) => {
    setSelectedBranchId(branchId);
    if (branchId) {
      window.location.hash = `#/locations/${branchId}`;
    } else {
      window.location.hash = `#/locations`;
    }
  };

  const handleLogin = (userData: { name: string; email: string; phone?: string }) => {
    setUser(userData);
    localStorage.setItem('bricks_user_profile', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('bricks_user_profile');
    alert('Logged out successfully from Bricks Member Desk.');
  };

  // Render correct page view
  const renderPage = () => {
    switch (currentPath) {
      case 'home':
        return <Home onNavigate={handleNavigate} onSelectBranch={handleSelectBranch} />;
      case 'about':
        return <About />;
      case 'menu':
        return <Menu />;
      case 'locations':
        return (
          <Locations
            onNavigate={handleNavigate}
            selectedBranchId={selectedBranchId}
            onSelectBranch={handleSelectBranch}
          />
        );
      case 'booking':
        return (
          <Booking
            selectedBranchId={selectedBranchId}
            onSelectBranch={handleSelectBranch}
            user={user}
          />
        );
      case 'gallery':
        return <Gallery />;
      case 'reviews':
        return <Reviews />;
      case 'cake-designer':
        return <CakeDesigner />;
      case 'featured-reels':
        return <FeaturedReels />;
      case 'signin':
        return <Auth onNavigate={handleNavigate} onLogin={handleLogin} />;
      case 'signup':
        return <Auth onNavigate={handleNavigate} onLogin={handleLogin} isSignUpDefault={true} />;
      case 'contact':
        return <Contact />;
      default:
        return <Home onNavigate={handleNavigate} onSelectBranch={handleSelectBranch} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-brand-bg text-brand-charcoal font-sans selection:bg-brand-yellow/30 selection:text-brand-terracotta">
      {/* Dynamic Header Navbar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Multi-page container */}
      <main className="flex-grow animate-fade-in">
        {renderPage()}
      </main>

      {/* Footer Strip */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />
    </div>
  );
}
