import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, MapPin, Send, HelpCircle, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close the popup if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const branches = [
    {
      name: 'Bricks Sardarpura',
      phone: '919636041190',
      tagline: 'Rooftop & Café Desk',
      timings: '11 AM - 11 PM',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      name: 'Bricks Bhadwasiya',
      phone: '919116611190',
      tagline: 'Premium Bakery & Cafe',
      timings: '10 AM - 11 PM',
      color: 'from-amber-500 to-emerald-600',
    },
    {
      name: 'Bricks Paota',
      phone: '918003681190',
      tagline: 'Garden & Party Hall Desk',
      timings: '11 AM - 11:30 PM',
      color: 'from-emerald-500 to-cyan-600',
    },
  ];

  const getWhatsAppLink = (phone: string, branchName: string) => {
    const encodedText = encodeURIComponent(
      `Hello Bricks! I am visiting your website and would like to inquire about reservation, orders, or party bookings at your ${branchName} branch.`
    );
    return `https://wa.me/${phone}?text=${encodedText}`;
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
      id="whatsapp-fab-container"
    >
      {/* Expanded Bubble list with beautiful Glassmorphism */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 220 }}
            className="mb-4 w-80 sm:w-96 rounded-2xl overflow-hidden glass-card shadow-2xl border border-white/20 text-brand-charcoal"
            id="whatsapp-chat-box"
          >
            {/* Header portion */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-5 relative">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/15 hover:bg-black/30 p-1.5 rounded-full transition-all cursor-pointer"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-3">
                <div className="relative">
                  {/* WhatsApp Brand Icon */}
                  <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-md">
                    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.967C16.528 2.012 14.056.99 11.433.99c-5.436 0-9.86 4.37-9.864 9.8 0 1.739.467 3.44 1.352 4.935l-.994 3.633 3.73-.974zm11.171-7.56c-.302-.15-1.786-.882-2.063-.982-.276-.1-.478-.15-.678.15-.2.3-.775.982-.95 1.183-.175.2-.35.226-.652.076-.302-.15-1.276-.47-2.43-1.499-.899-.8-1.505-1.79-1.682-2.09-.177-.3-.019-.462.132-.612.135-.135.302-.35.453-.526.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.526-.075-.15-.678-1.632-.93-2.238-.244-.588-.492-.51-.678-.519-.175-.008-.376-.01-.577-.01-.2 0-.527.075-.803.375-.276.3-1.054 1.03-1.054 2.515 0 1.485 1.079 2.918 1.229 3.12.15.2 2.123 3.241 5.143 4.545.718.311 1.277.496 1.714.635.722.23 1.38.197 1.9.12.58-.087 1.787-.73 2.038-1.436.25-.705.25-1.31.175-1.436-.075-.125-.276-.2-.579-.35z" />
                    </svg>
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white animate-ping"></span>
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white"></span>
                  </div>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg leading-tight antialiased">
                    Bricks Desk Online
                  </h3>
                  <p className="text-emerald-100 text-xs font-medium antialiased">
                    Usually replies within a few minutes
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Helper Text inside glassmorphic layout */}
            <div className="bg-white/90 px-5 py-3 border-b border-white/10 text-xs text-brand-gray flex items-center space-x-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Select your nearest branch for direct support:</span>
            </div>

            {/* Branch options with high contrast layout */}
            <div className="p-4 bg-white/95 max-h-96 overflow-y-auto space-y-3">
              {branches.map((branch) => (
                <a
                  key={branch.name}
                  href={getWhatsAppLink(branch.phone, branch.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-brand-bg/60 hover:bg-emerald-50 border border-brand-secondary-bg/50 hover:border-emerald-300/60 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-md"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-emerald-100/70 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-brand-charcoal group-hover:text-emerald-800 transition-colors leading-tight">
                        {branch.name}
                      </h4>
                      <p className="text-xs text-brand-gray mt-0.5 leading-none">
                        {branch.tagline}
                      </p>
                      <span className="inline-block text-[10px] bg-brand-yellow/30 text-brand-terracotta font-medium px-1.5 py-0.5 rounded mt-1.5">
                        {branch.timings}
                      </span>
                    </div>
                  </div>
                  <div className="p-1 rounded-full bg-brand-bg text-brand-gray group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>

            {/* Sub-footer message */}
            <div className="bg-white/95 px-5 py-3.5 border-t border-brand-secondary-bg/60 flex items-center justify-between text-[11px] text-brand-gray">
              <div className="flex items-center space-x-1">
                <HelpCircle className="w-3.5 h-3.5 text-brand-gray/80" />
                <span>Save numbers for easier future ordering!</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl transition-all cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-400/50 text-white overflow-hidden bg-gradient-to-tr from-emerald-500 to-green-400 group"
        aria-label="Contact Bricks on WhatsApp"
        id="whatsapp-trigger-btn"
      >
        {/* Soft pulsing halo ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/30 scale-110 animate-ping group-hover:animate-none opacity-75"></span>

        {/* Dynamic icon switcher */}
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 sm:w-7 sm:h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="wa-icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.967C16.528 2.012 14.056.99 11.433.99c-5.436 0-9.86 4.37-9.864 9.8 0 1.739.467 3.44 1.352 4.935l-.994 3.633 3.73-.974zm11.171-7.56c-.302-.15-1.786-.882-2.063-.982-.276-.1-.478-.15-.678.15-.2.3-.775.982-.95 1.183-.175.2-.35.226-.652.076-.302-.15-1.276-.47-2.43-1.499-.899-.8-1.505-1.79-1.682-2.09-.177-.3-.019-.462.132-.612.135-.135.302-.35.453-.526.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.526-.075-.15-.678-1.632-.93-2.238-.244-.588-.492-.51-.678-.519-.175-.008-.376-.01-.577-.01-.2 0-.527.075-.803.375-.276.3-1.054 1.03-1.054 2.515 0 1.485 1.079 2.918 1.229 3.12.15.2 2.123 3.241 5.143 4.545.718.311 1.277.496 1.714.635.722.23 1.38.197 1.9.12.58-.087 1.787-.73 2.038-1.436.25-.705.25-1.31.175-1.436-.075-.125-.276-.2-.579-.35z" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
