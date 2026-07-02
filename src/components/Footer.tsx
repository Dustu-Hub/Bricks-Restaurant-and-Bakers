import React, { useState } from 'react';
import { Instagram, Facebook, Phone, Mail, MapPin, Send, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-brand-forest text-[#FDF9F3] pt-16 pb-8 border-t border-brand-forest/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand Intro */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => handleLinkClick('home')}>
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-md transform group-hover:scale-105 transition-all duration-300 overflow-hidden p-0.5 shrink-0">
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
              <div className="flex flex-col">
                <span className="font-display font-black text-xl text-[#FDF9F3] tracking-tight leading-none antialiased subpixel-antialiased group-hover:text-brand-yellow transition-colors">
                  BRICKS
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#E7E2DA]/80 leading-none mt-1 antialiased subpixel-antialiased">
                  Restaurant & Bakers
                </span>
              </div>
            </div>
            <p className="text-sm text-[#E7E2DA]/80 leading-relaxed font-light">
              Multi-cuisine restaurant, breathtaking rooftop & open-air dining, 100% eggless artisanal bakery, cozy café, and fast-food hub in Jodhpur. Where every brick tells a delicious story.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://www.instagram.com/bricksjodhpur/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-brand-yellow hover:text-brand-forest flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/bricksrestaurantnbakers/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-brand-yellow hover:text-brand-forest flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-brand-yellow tracking-tight">Quick Links</h3>
            <ul className="space-y-3 text-sm text-[#E7E2DA]/85">
              {[
                { label: 'Home', path: 'home' },
                { label: 'About Us', path: 'about' },
                { label: 'Our Menu', path: 'menu' },
                { label: 'Book a Table', path: 'booking' },
                { label: 'Photo Gallery', path: 'gallery' },
                { label: 'Featured Reels', path: 'featured-reels' },
                { label: 'Guest Reviews', path: 'reviews' },
                { label: 'Contact Us', path: 'contact' },
              ].map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleLinkClick(link.path)}
                    className="hover:text-brand-yellow hover:translate-x-1 transition-all duration-200 cursor-pointer text-left font-light"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Locations */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-brand-yellow tracking-tight">Our Locations</h3>
            <ul className="space-y-4 text-sm text-[#E7E2DA]/85 font-light">
              <li>
                <button
                  onClick={() => handleLinkClick('locations')}
                  className="hover:text-brand-yellow transition-all flex items-start space-x-2 text-left group"
                >
                  <MapPin size={16} className="text-brand-yellow mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold block text-[#FDF9F3]">Sardarpura (Rooftop & Café)</span>
                    <span className="text-xs text-[#E7E2DA]/70 hover:underline">Sardarpura Main Road, near Nehru Park</span>
                    <span className="block text-xs font-semibold mt-1 group-hover:underline text-brand-yellow">+91 96360 41190</span>
                  </div>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('locations')}
                  className="hover:text-brand-yellow transition-all flex items-start space-x-2 text-left group"
                >
                  <MapPin size={16} className="text-brand-yellow mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold block text-[#FDF9F3]">Bhadwasiya (Bakery & Café)</span>
                    <span className="text-xs text-[#E7E2DA]/70 hover:underline font-light">Bhadwasiya Road, opposite Govt School</span>
                    <span className="block text-xs font-semibold mt-1 group-hover:underline text-brand-yellow">+91 91166 11190</span>
                  </div>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('locations')}
                  className="hover:text-brand-yellow transition-all flex items-start space-x-2 text-left group"
                >
                  <MapPin size={16} className="text-brand-yellow mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold block text-[#FDF9F3]">Paota (Garden & Party Hall)</span>
                    <span className="text-xs text-[#E7E2DA]/70 hover:underline">Paota B Road, near High Court Colony</span>
                    <span className="block text-xs font-semibold mt-1 group-hover:underline text-brand-yellow">+91 80036 81190</span>
                  </div>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-brand-yellow tracking-tight">Stay Updated</h3>
            <p className="text-sm text-[#E7E2DA]/80 leading-relaxed font-light mb-4">
              Subscribe to get exclusive discount codes, seasonal menu arrivals, and rooftop event alerts.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-white/10 text-white placeholder-white/50 text-sm px-4 py-3 rounded-xl border border-white/20 focus:outline-none focus:border-brand-yellow pr-12 transition-all font-light"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-brand-yellow text-brand-forest rounded-lg hover:bg-brand-yellow/95 hover:scale-105 transition-all flex items-center justify-center cursor-pointer"
              >
                {subscribed ? <Check size={16} /> : <Send size={16} />}
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-brand-yellow mt-2 animate-pulse font-medium">
                Thank you! You have subscribed successfully.
              </p>
            )}
            <div className="mt-6 p-3 bg-white/5 rounded-xl border border-white/10 text-center">
              <span className="text-xs text-[#E7E2DA]/90 block">🌱 100% Eggless Bakery Assured Jodhpur Wide</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-[#E7E2DA]/60">
          <p className="mb-4 md:mb-0">
            © {new Date().getFullYear()} Bricks Restaurant and Bakers. All Rights Reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#/privacy" onClick={(e) => { e.preventDefault(); alert("Privacy Policy is simulated. Your data is perfectly safe."); }} className="hover:text-brand-yellow transition-colors font-light">Privacy Policy</a>
            <a href="#/terms" onClick={(e) => { e.preventDefault(); alert("Terms & Conditions are simulated for local showcase."); }} className="hover:text-brand-yellow transition-colors font-light">Terms of Service</a>
            <span className="text-brand-yellow/80">Crafted with ❤️ in Jodhpur</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
