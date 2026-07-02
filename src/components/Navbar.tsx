import React, { useState, useEffect } from 'react';
import { Menu, X, CalendarCheck, LogIn, LogOut, User } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

export default function Navbar({ currentPath, onNavigate, user, onLogout }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: 'home' },
    { label: 'About Us', path: 'about' },
    { label: 'Menu', path: 'menu' },
    { label: 'Cake Designer', path: 'cake-designer' },
    { label: 'Locations', path: 'locations' },
    { label: 'Gallery', path: 'gallery' },
    { label: 'Featured Reels', path: 'featured-reels' },
    { label: 'Reviews', path: 'reviews' },
    { label: 'Contact', path: 'contact' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActive = (path: string) => {
    if (path === 'locations') {
      return currentPath.startsWith('locations');
    }
    return currentPath === path;
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-2 sm:py-3'
          : 'py-4 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between min-h-[4.5rem] sm:min-h-[5.5rem] py-2 px-6 sm:px-10 glass-card transition-all duration-300 ${
            isScrolled ? 'scale-98' : ''
          }`}
        >
          {/* Logo */}
          <div
            id="nav-logo"
            onClick={() => handleLinkClick('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white shadow-md transform group-hover:scale-105 transition-all duration-300 overflow-hidden border border-brand-secondary-bg/60 p-0.5 shrink-0">
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full select-none" 
                xmlns="http://www.w3.org/2000/svg"
                textRendering="geometricPrecision"
                shapeRendering="geometricPrecision"
              >
                {/* Outer White Circle background */}
                <circle cx="50" cy="50" r="48" fill="white" />
                
                {/* Outer wavy gold wreath pattern */}
                <g stroke="#CCA05A" fill="none" strokeWidth="1.2">
                  <circle cx="50" cy="38" r="18" strokeDasharray="1.5 1.5" className="opacity-50" />
                  {/* Decorative wreath leaf shapes around the circle */}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <path
                      key={i}
                      d="M 50,16 C 53,16 55,18 53,21 C 51,24 49,24 50,16 Z"
                      fill="#CCA05A"
                      stroke="none"
                      transform={`rotate(${i * 30}, 50, 38)`}
                    />
                  ))}
                </g>
                
                {/* Fork and Spoon forming plate */}
                <g stroke="#CCA05A" strokeWidth="0.8" fill="none">
                  <circle cx="50" cy="38" r="13.5" />
                  {/* Spoon icon lower-left */}
                  <path d="M 39,43 L 37,45" strokeWidth="1" strokeLinecap="round" />
                  <circle cx="36" cy="45.5" r="1" fill="#CCA05A" stroke="none" />
                  {/* Fork icon upper-right */}
                  <path d="M 61,33 L 63,31" strokeWidth="1" strokeLinecap="round" />
                </g>

                {/* Central gold solid circle */}
                <circle cx="50" cy="38" r="9.5" fill="#CCA05A" />
                
                {/* Central white 'B' */}
                <text x="50" y="41.5" fontFamily="Georgia, serif" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">B</text>
                
                {/* BRICKS text */}
                <text x="50" y="69" fontFamily="'Arial Black', 'Impact', sans-serif" fontSize="12" fontWeight="900" fill="#1C1917" textAnchor="middle" letterSpacing="0.2">BRICKS</text>
                
                {/* Line below BRICKS */}
                <line x1="15" y1="74" x2="85" y2="74" stroke="#1C1917" strokeWidth="0.5" />
                
                {/* RESTAURANT & BAKERS text */}
                <text x="50" y="81" fontFamily="'Inter', sans-serif" fontSize="4.2" fontWeight="800" fill="#1C1917" textAnchor="middle" letterSpacing="0.6">RESTAURANT & BAKERS</text>
              </svg>
            </div>
            <div className="flex flex-col select-none">
              <span className="font-display font-black text-xl text-brand-charcoal tracking-tight group-hover:text-brand-terracotta transition-colors leading-none antialiased subpixel-antialiased">
                BRICKS
              </span>
              <span className="text-[10px] uppercase tracking-widest text-brand-gray leading-none mt-1 antialiased subpixel-antialiased">
                Restaurant & Bakers
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div id="desktop-nav-links" className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`text-sm font-medium tracking-wide transition-all relative py-1 cursor-pointer antialiased subpixel-antialiased ${
                  isActive(link.path)
                    ? 'text-brand-terracotta font-bold'
                    : 'text-brand-charcoal hover:text-brand-terracotta hover:scale-105'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-terracotta rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div id="desktop-ctas" className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3 bg-brand-secondary-bg/40 py-1.5 px-3 rounded-full border border-brand-secondary-bg/70 text-sm">
                <User size={16} className="text-brand-terracotta" />
                <span className="font-medium text-brand-charcoal">{user.name.split(' ')[0]}</span>
                <button
                  onClick={onLogout}
                  title="Logout"
                  className="text-brand-gray hover:text-brand-terracotta transition-colors ml-1"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleLinkClick('signin')}
                className="text-sm font-medium text-brand-charcoal hover:text-brand-terracotta transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <LogIn size={16} />
                <span>Sign In</span>
              </button>
            )}

            <button
              id="navbar-cta"
              onClick={() => handleLinkClick('booking')}
              className="bg-brand-yellow hover:bg-brand-yellow/95 hover:scale-105 active:scale-95 text-brand-charcoal font-semibold text-sm px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center space-x-2 border border-brand-yellow/20 cursor-pointer"
            >
              <CalendarCheck size={16} />
              <span>Book a Table</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-4">
            <button
              onClick={() => handleLinkClick('booking')}
              className="bg-brand-yellow p-2.5 rounded-xl text-brand-charcoal hover:scale-105 transition-all shadow-sm"
              title="Book a Table"
            >
              <CalendarCheck size={18} />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-brand-charcoal hover:bg-brand-secondary-bg/50 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="lg:hidden absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-lg border border-brand-secondary-bg/80 shadow-2xl rounded-3xl p-6 z-40 transition-all duration-300">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`text-left text-base font-semibold py-2 px-3 rounded-xl transition-colors ${
                  isActive(link.path)
                    ? 'bg-brand-terracotta/10 text-brand-terracotta'
                    : 'text-brand-charcoal hover:bg-brand-secondary-bg/30'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="border-t border-brand-secondary-bg/50 my-2 pt-4 flex flex-col space-y-3">
              {user ? (
                <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-brand-secondary-bg/30">
                  <div className="flex items-center space-x-2">
                    <User size={18} className="text-brand-terracotta" />
                    <span className="font-semibold text-sm text-brand-charcoal">{user.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-brand-terracotta flex items-center space-x-1 text-xs font-semibold"
                  >
                    <LogOut size={14} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleLinkClick('signin')}
                  className="flex items-center justify-center space-x-2 w-full py-2 px-4 rounded-xl text-sm font-semibold text-brand-charcoal border border-brand-secondary-bg hover:bg-brand-secondary-bg/30"
                >
                  <LogIn size={16} />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
