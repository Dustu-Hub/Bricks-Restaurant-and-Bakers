import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Star, ArrowRight, MapPin, Phone, Award, Compass, Heart, Eye, Users, ChevronRight, MessageSquare, Instagram } from 'lucide-react';
import { menuItems, branches, reviews, galleryItems } from '../data';

// Import newly generated high-quality assets
import heroRooftopImg from '../assets/images/regenerated_image_1782984997980.png';
import heroFoodImg from '../assets/images/regenerated_image_1782984994811.png';
import aboutBakeryImg from '../assets/images/regenerated_image_1782985250282.png';
import aboutInteriorsImg from '../assets/images/regenerated_image_1782985248092.png';
import aboutGardenImg from '../assets/images/regenerated_image_1782985466195.png';

interface HomeProps {
  onNavigate: (path: string) => void;
  onSelectBranch?: (branchId: 'sardarpura' | 'bhadwasiya' | 'paota') => void;
}

export default function Home({ onNavigate, onSelectBranch }: HomeProps) {
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  // Auto slide reviews every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReviewIdx((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const signatureDishes = menuItems.filter(item => item.isBestSeller);

  const handleLocationClick = (branchId: 'sardarpura' | 'bhadwasiya' | 'paota') => {
    if (onSelectBranch) {
      onSelectBranch(branchId);
    }
    onNavigate(`locations`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="home-page" className="pt-20 overflow-hidden">
      {/* 1. Hero Section */}
      <section
        id="hero-section"
        className="relative bg-brand-secondary-bg/80 py-20 lg:py-32 flex items-center min-h-[90vh] overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-brand-terracotta blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-brand-yellow blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/80 w-fit shadow-xs">
              <span className="text-brand-terracotta">✨</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-charcoal">Jodhpur’s Highly Loved Food Spot</span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-brand-charcoal tracking-tight leading-none">
              Multi-Cuisine.<br />
              <span className="text-brand-terracotta">Rooftop</span> Vibes.<br />
              Eggless <span className="text-brand-terracotta">Bakes</span>.
            </h1>

            <p className="text-brand-gray text-base sm:text-lg max-w-xl font-light leading-relaxed">
              Where Every Brick Tells a Flavor Story. Savor authentic multi-cuisine delicacies, magical open-air rooftops, and Jodhpur’s finest 100% eggless bakery across 3 premium branches.
            </p>

            {/* Quick Location Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['Sardarpura', 'Bhadwasiya', 'Paota'].map((branch) => (
                <span
                  key={branch}
                  className="bg-brand-forest/5 text-brand-forest text-xs font-medium px-3 py-1 rounded-full border border-brand-forest/10"
                >
                  📍 {branch}
                </span>
              ))}
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={() => onNavigate('booking')}
                className="bg-brand-yellow hover:bg-brand-yellow/90 hover:scale-105 active:scale-95 text-brand-charcoal font-bold px-8 py-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 text-center cursor-pointer"
              >
                Book a Table
              </button>
              <button
                onClick={() => onNavigate('menu')}
                className="bg-white/40 hover:bg-white/80 border border-brand-terracotta/20 text-brand-terracotta font-bold px-8 py-4 rounded-2xl hover:scale-105 transition-all text-center cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>View Menu</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Floating Glass Badge */}
            <div className="pt-6 flex items-center space-x-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-brand-terracotta border-2 border-brand-bg flex items-center justify-center text-white text-[10px] font-bold">V</div>
                <div className="w-8 h-8 rounded-full bg-brand-yellow border-2 border-brand-bg flex items-center justify-center text-brand-charcoal text-[10px] font-bold">G</div>
                <div className="w-8 h-8 rounded-full bg-brand-forest border-2 border-brand-bg flex items-center justify-center text-white text-[10px] font-bold">P</div>
              </div>
              <div className="text-sm">
                <div className="flex items-center text-brand-terracotta font-bold">
                  <Star size={16} className="fill-brand-yellow text-brand-yellow mr-1" />
                  <span>4.5 Rating</span>
                </div>
                <span className="text-xs text-brand-gray">from 2,248+ Verified Jodhpurites</span>
              </div>
            </div>
          </div>

          {/* Hero Right Media (High quality overlapping photos) */}
          <div className="lg:col-span-5 relative flex justify-center items-center py-8">
            <div className="relative w-full max-w-md h-[400px] sm:h-[450px]">
              {/* Back Layer Photo - Rooftop */}
              <div className="absolute top-0 right-4 w-[75%] h-[75%] rounded-3xl overflow-hidden shadow-xl border-4 border-white rotate-3 hover:rotate-0 transition-transform duration-500 z-10">
                <img
                  src={heroRooftopImg}
                  alt="Bricks Rooftop Ambience"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Front Layer Photo - Delicious Food */}
              <div className="absolute bottom-0 left-0 w-[75%] h-[75%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white -rotate-6 hover:rotate-0 transition-transform duration-500 z-20">
                <img
                  src={heroFoodImg}
                  alt="Delicious Italian Pizza and Pasta"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Float Mini badge */}
              <div className="absolute bottom-1/4 right-0 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-brand-secondary-bg/50 z-30 transform hover:scale-105 transition-transform flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-2xl">🌱</div>
                <div className="text-left">
                  <span className="font-bold text-xs text-brand-forest block">100% EGGLESS</span>
                  <span className="text-[10px] text-brand-gray">Bakery items made with pure milk proteins</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. About Snapshot Section */}
      <section id="about-snapshot" className="py-20 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src={aboutBakeryImg}
                  alt="Artisanal bakery fresh cake"
                  className="rounded-3xl shadow-md w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <img
                  src={aboutInteriorsImg}
                  alt="Warm restaurant interiors"
                  className="rounded-3xl shadow-md w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src={aboutGardenImg}
                  alt="Garden dining view"
                  className="rounded-3xl shadow-md w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="p-6 bg-brand-yellow rounded-3xl text-brand-charcoal text-center shadow-lg transform rotate-2 hover:rotate-0 transition-transform">
                  <span className="font-display font-black text-3xl block">10+</span>
                  <span className="text-xs uppercase font-semibold tracking-wider">Years of Flavor Excellence</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-left order-1 lg:order-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-terracotta font-sans">Our Culinary Legacy</h2>
            <h3 className="font-display font-black text-3xl sm:text-4xl text-brand-charcoal tracking-tight">
              A Symphony of Exposed Bricks, Starry Rooftops & Baked Aromas
            </h3>
            <p className="text-brand-gray text-sm sm:text-base font-light leading-relaxed">
              Founded over a decade ago in the heart of Jodhpur, **Bricks Restaurant and Bakers** was born from a desire to combine warm rustic brick aesthetics with culinary wizardry. We believe hospitality is about crafting spaces where memories rise like freshly baked breads.
            </p>
            <p className="text-brand-gray text-sm sm:text-base font-light leading-relaxed">
              Every dish that leaves our kitchen is curated with pristine ingredients, and every bakery product is kept strictly **eggless** to assure absolute peace of mind for you and your family. Join us at any of our three branches to experience Jodhpur’s finest!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-brand-terracotta/10 text-brand-terracotta flex items-center justify-center">
                  <Award size={20} />
                </div>
                <span className="font-semibold text-sm text-brand-charcoal">Hygiene & Quality Certified</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-brand-forest/10 text-brand-forest flex items-center justify-center">
                  <Compass size={20} />
                </div>
                <span className="font-semibold text-sm text-brand-charcoal">3 Easy-to-reach Jodhpur Branches</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('about')}
                className="text-brand-terracotta font-bold text-sm hover:text-brand-terracotta/80 transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <span>Read Our Full Story</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What We Offer Section */}
      <section id="what-we-offer" className="py-20 bg-brand-secondary-bg/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-terracotta font-sans">Four Delicious Dimensions</h2>
            <h3 className="font-display font-black text-3xl sm:text-4xl text-brand-charcoal tracking-tight">
              One Name. Endless Experiences.
            </h3>
            <p className="text-brand-gray text-sm font-light">
              We cater to all your moods, whether it's a cozy morning coffee, a lavish family dinner, or celebrating under Jodhpur's starlit skies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Multi-Cuisine Restaurant',
                desc: 'From sizzling north Indian subzis to sizzling starters and hand-crafted delicacies.',
                icon: '🍽️',
                image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=400',
              },
              {
                title: 'Rooftop & Open-Air',
                desc: 'A mesmerizing breeze, glowing string lights, and stellar views of the blue city Jodhpur.',
                icon: '🌇',
                image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=400',
              },
              {
                title: '100% Eggless Bakery',
                desc: 'Specialty designer cakes, soft gourmet pastries, cupcakes, and fresh loaves daily.',
                icon: '🍰',
                image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400',
              },
              {
                title: 'Cozy Café & Fast Food',
                desc: 'Premium Italian woodfired pizzas, bubbling cheese garlic breads, and thick hazelnut milkshakes.',
                icon: '☕',
                image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400',
              },
            ].map((offer, idx) => (
              <div
                key={idx}
                className="glass-panel glass-card-hover rounded-3xl overflow-hidden shadow-xs flex flex-col text-left group"
              >
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-xl">
                    {offer.icon}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-display font-bold text-lg text-brand-charcoal mb-2 group-hover:text-brand-terracotta transition-colors">
                      {offer.title}
                    </h4>
                    <p className="text-brand-gray text-xs font-light leading-relaxed mb-4">
                      {offer.desc}
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate('menu')}
                    className="text-brand-terracotta text-xs font-bold flex items-center space-x-1 group/btn cursor-pointer"
                  >
                    <span>Explore This Menu</span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Signature Menu Preview (Carousel list) */}
      <section id="signature-preview" className="py-20 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-12">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-widest text-brand-terracotta font-sans">Chef’s Recommendation</h2>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-brand-charcoal tracking-tight">
                Our Signature Masterpieces
              </h3>
            </div>
            <button
              onClick={() => onNavigate('menu')}
              className="bg-brand-yellow hover:bg-brand-yellow/95 font-bold text-sm text-brand-charcoal px-6 py-3.5 rounded-xl shadow-xs hover:scale-105 transition-all flex items-center space-x-2 cursor-pointer"
            >
              <span>Explore Full Tabbed Menu</span>
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {signatureDishes.map((dish) => (
              <div
                key={dish.id}
                className="glass-panel glass-card-hover rounded-3xl p-4 flex flex-col justify-between shadow-xs group"
              >
                <div className="space-y-4">
                  {/* Image container */}
                  <div className="h-44 rounded-2xl overflow-hidden relative">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 flex gap-1">
                      {dish.isVeg && (
                        <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center shadow-xs">
                          🟢 VEG
                        </span>
                      )}
                      {dish.isEggless && (
                        <span className="bg-yellow-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center shadow-xs">
                          🥚 EGGLESS
                        </span>
                      )}
                    </div>
                    <span className="absolute bottom-2 right-2 bg-brand-terracotta text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shadow-sm">
                      Best Seller 🔥
                    </span>
                  </div>

                  {/* Text details */}
                  <div className="text-left">
                    <h4 className="font-display font-bold text-base text-brand-charcoal group-hover:text-brand-terracotta transition-colors">
                      {dish.name}
                    </h4>
                    <p className="text-brand-gray text-[11px] font-light leading-relaxed mt-1 line-clamp-2">
                      {dish.description}
                    </p>
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-brand-secondary-bg/50">
                  <div>
                    <span className="text-[10px] text-brand-gray block">Price</span>
                    <span className="font-handwritten text-xl font-bold text-brand-terracotta">
                      ₹{dish.price}
                    </span>
                  </div>
                  <button
                    onClick={() => onNavigate('booking')}
                    className="bg-brand-yellow/15 hover:bg-brand-yellow text-brand-charcoal text-xs font-bold px-3 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    Order / Dine here
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Our Locations Strip */}
      <section id="locations-strip" className="py-20 bg-brand-secondary-bg/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-terracotta font-sans">Dine Near You</h2>
            <h3 className="font-display font-black text-3xl sm:text-4xl text-brand-charcoal tracking-tight">
              3 Iconic Branches Across Jodhpur
            </h3>
            <p className="text-brand-gray text-sm font-light">
              Each branch is crafted with distinct seating arrangements, gorgeous lightning, and warm interiors. Tap a location to inspect its details!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {branches.map((branch) => (
              <div
                key={branch.id}
                className="glass-panel glass-card-hover rounded-3xl p-6 flex flex-col justify-between shadow-xs text-left group"
              >
                <div>
                  {/* Branch Main Photo */}
                  <div className="h-48 rounded-2xl overflow-hidden mb-4 relative">
                    <img
                      src={branch.images[0]}
                      alt={branch.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-brand-forest text-white text-[10px] font-semibold tracking-wider px-3 py-1 rounded-full uppercase">
                      ⭐ 4.5 Rated
                    </div>
                  </div>

                  <h4 className="font-display font-black text-xl text-brand-charcoal mb-2">
                    {branch.name}
                  </h4>
                  <p className="text-brand-gray text-xs font-light leading-relaxed mb-4 flex items-start space-x-1.5">
                    <MapPin size={16} className="text-brand-terracotta shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </p>
                  <p className="text-brand-charcoal text-xs font-semibold mb-4 flex items-center space-x-1.5">
                    <Phone size={14} className="text-brand-forest" />
                    <a href={`tel:${branch.phone.replace(/\s+/g, '')}`} className="hover:underline">{branch.phone}</a>
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {branch.features.slice(0, 3).map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className="bg-brand-secondary-bg/50 text-brand-charcoal text-[10px] px-2.5 py-1 rounded-md"
                      >
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-brand-secondary-bg/50">
                  <button
                    onClick={() => handleLocationClick(branch.id)}
                    className="border border-brand-terracotta/35 hover:bg-brand-terracotta hover:text-white text-brand-terracotta text-xs font-bold py-2.5 rounded-xl text-center transition-all cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      if (onSelectBranch) onSelectBranch(branch.id);
                      onNavigate('booking');
                    }}
                    className="bg-brand-yellow hover:bg-brand-yellow/90 text-brand-charcoal text-xs font-bold py-2.5 rounded-xl text-center transition-all cursor-pointer"
                  >
                    Book Table Here
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Gallery Preview Section */}
      <section id="gallery-preview" className="py-20 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div className="text-left space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-widest text-brand-terracotta font-sans">A Visual Feast</h2>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-brand-charcoal tracking-tight">
                Glimpses of Bricks Happiness
              </h3>
            </div>
            <button
              onClick={() => onNavigate('gallery')}
              className="border border-brand-terracotta text-brand-terracotta hover:bg-brand-terracotta hover:text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all cursor-pointer"
            >
              Open Full Interactive Gallery
            </button>
          </div>

          {/* Masonry-like grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryItems.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="group relative rounded-3xl overflow-hidden h-64 shadow-xs cursor-pointer"
                onClick={() => onNavigate('gallery')}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-brand-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                  <span className="text-brand-yellow text-xs font-semibold uppercase tracking-widest mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-display font-bold text-white text-base leading-snug">
                    {item.title}
                  </h4>
                  {item.author && (
                    <span className="text-[10px] text-white/70 block mt-1">Shared by: {item.author}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Testimonials/Reviews Carousel */}
      <section id="reviews-carousel" className="py-20 bg-brand-secondary-bg/35">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-terracotta font-sans">What Jodhpurites Say</h2>
            <h3 className="font-display font-black text-3xl sm:text-4xl text-brand-charcoal tracking-tight">
              Loved by Families and Friends
            </h3>
          </div>

          {/* Glass Card Review Carousel */}
          <div className="min-h-[220px] flex items-center justify-center">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl shadow-lg border border-white max-w-2xl w-full text-center relative group">
              <span className="absolute -top-6 left-10 font-handwritten text-7xl text-brand-terracotta/20 select-none">“</span>
              
              <div className="flex items-center justify-center space-x-1 mb-4 text-brand-yellow">
                {Array.from({ length: reviews[activeReviewIdx].rating }).map((_, i) => (
                  <Star key={i} size={18} className="fill-brand-yellow text-brand-yellow" />
                ))}
              </div>

              <p className="text-brand-charcoal text-sm sm:text-base leading-relaxed italic font-light mb-6">
                "{reviews[activeReviewIdx].reviewText}"
              </p>

              <div>
                <span className="font-display font-bold text-base text-brand-charcoal block">
                  {reviews[activeReviewIdx].reviewerName}
                </span>
                <span className="text-xs text-brand-gray block mt-0.5">
                  {reviews[activeReviewIdx].context} • {reviews[activeReviewIdx].timeAgo}
                </span>
              </div>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center space-x-2">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveReviewIdx(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeReviewIdx === idx ? 'bg-brand-terracotta w-6' : 'bg-brand-stone-accent/40'
                }`}
                title={`Review slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('reviews')}
              className="text-brand-charcoal font-bold text-xs hover:text-brand-terracotta transition-colors flex items-center space-x-1 mx-auto cursor-pointer"
            >
              <span>Read All 2,248+ Google Reviews</span>
              <MessageSquare size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* 8. Stats Bar */}
      <section id="stats-bar" className="bg-brand-forest text-[#FDF9F3] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Branches in Jodhpur', val: '3' },
              { label: 'Google Rating Score', val: '4.5★' },
              { label: 'Verified Reviews', val: '2,248+' },
              { label: 'Years of Culinary Pride', val: '10+' },
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <span className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-brand-yellow block">
                  {stat.val}
                </span>
                <span className="text-xs text-[#E7E2DA]/80 uppercase tracking-wider font-light">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Instagram/Social Feed Grid */}
      <section id="instagram-feed" className="py-20 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2 text-brand-terracotta">
              <Instagram size={20} />
              <span className="font-bold text-sm tracking-widest uppercase">@bricksjodhpur</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-brand-charcoal">
              Join the Aroma on Instagram
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400',
              'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400',
              'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400',
              'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400',
            ].map((img, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden aspect-square shadow-xs border border-brand-secondary-bg/50">
                <img src={img} alt="Instagram Post mockup" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-brand-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram size={24} className="text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Newsletter / CTA Banner */}
      <section id="cta-banner" className="py-20 bg-brand-bg relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-brand-yellow/20 border border-brand-yellow/30 p-8 sm:p-16 rounded-[2.5rem] relative overflow-hidden shadow-xs">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-yellow/10 rounded-full blur-xl" />
            <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
              <span className="font-handwritten text-3xl text-brand-terracotta block">Craving Something Delicious?</span>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-brand-charcoal leading-tight">
                Secure Jodhpur’s Best Rooftop Table or Get Fresh Cakes Delivered!
              </h3>
              <p className="text-brand-gray text-sm font-light max-w-lg mx-auto">
                No booking fees. Get instant SMS confirmation. Highly recommended to book 24 hours in advance for weekend dinners.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('booking')}
                  className="w-full sm:w-auto bg-brand-yellow hover:bg-brand-yellow/90 hover:scale-105 active:scale-95 text-brand-charcoal font-bold px-8 py-4 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Book a Table Now
                </button>
                <button
                  onClick={() => onNavigate('menu')}
                  className="w-full sm:w-auto bg-white hover:bg-white/90 text-brand-charcoal font-bold px-8 py-4 rounded-xl shadow-xs transition-all border border-brand-secondary-bg cursor-pointer"
                >
                  Explore the Menu
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
