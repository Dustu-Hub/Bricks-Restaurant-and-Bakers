import React, { useState, useMemo } from 'react';
import { Camera, X, ArrowLeft, ArrowRight, Instagram, ExternalLink, Smile } from 'lucide-react';
import { galleryItems } from '../data';
import { GalleryItem } from '../types';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'food' | 'bakery' | 'rooftop' | 'ambience' | 'events'>('all');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: '🌟 All Snaps' },
    { id: 'food', label: '🍝 Platings & Starters' },
    { id: 'bakery', label: '🍰 Eggless Bakes' },
    { id: 'rooftop', label: '🌇 Rooftop Vibe' },
    { id: 'ambience', label: '🌲 Indoor & Garden' },
    { id: 'events', label: '🎉 Family Gatherings' },
  ];

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'all') return galleryItems;
    return galleryItems.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activePhoto) return;
    const currentIdx = filteredPhotos.findIndex(p => p.id === activePhoto.id);
    const nextIdx = (currentIdx + 1) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[nextIdx]);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activePhoto) return;
    const currentIdx = filteredPhotos.findIndex(p => p.id === activePhoto.id);
    const prevIdx = (currentIdx - 1 + filteredPhotos.length) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[prevIdx]);
  };

  return (
    <div id="gallery-page" className="pt-28 pb-20">
      
      {/* Header */}
      <section className="bg-brand-secondary-bg/50 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-terracotta bg-white/60 px-4 py-1.5 rounded-full border border-brand-secondary-bg">
            Visual Highlights
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-brand-charcoal tracking-tight">
            Our Interactive Photo Gallery
          </h1>
          <p className="text-brand-gray text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Take a sensory tour of our mouthwatering platters, fresh bakery creations, cozy family dine-ins, and breathtaking evening rooftop views across Jodhpur.
          </p>
        </div>
      </section>

      {/* Categories Sub-nav & Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
        
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 justify-center pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide cursor-pointer transition-all ${
                selectedCategory === cat.id
                  ? 'bg-brand-terracotta text-white shadow-sm'
                  : 'bg-brand-secondary-bg/40 text-brand-charcoal hover:bg-brand-secondary-bg/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry-like dynamic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-xs border border-brand-secondary-bg/50 h-72 cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlapping Blur Content panel on hover */}
              <div className="absolute inset-0 bg-brand-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                <span className="text-brand-yellow text-[10px] font-bold uppercase tracking-widest mb-1">
                  {photo.category}
                </span>
                <h3 className="font-display font-bold text-white text-base leading-snug">
                  {photo.title}
                </h3>
                {photo.author && (
                  <span className="text-[10px] text-[#FDF9F3]/80 block mt-1 font-light">
                    Shared by: {photo.author}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Instagram Redirect banner */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="p-8 sm:p-12 bg-brand-secondary-bg/30 border border-brand-secondary-bg rounded-[2rem] text-center space-y-6">
          <div className="flex justify-center text-brand-terracotta">
            <Instagram size={36} />
          </div>
          <div className="space-y-2">
            <h3 className="font-display font-black text-2xl text-brand-charcoal">Are You On Instagram?</h3>
            <p className="text-brand-gray text-xs sm:text-sm font-light max-w-md mx-auto leading-relaxed">
              We post fresh daily cake arrivals, chef baking stories, weekend reservations alerts, and Jodhpur food giveaways!
            </p>
          </div>
          <a
            href="https://www.instagram.com/bricksjodhpur/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center space-x-2 bg-brand-yellow hover:bg-brand-yellow/95 hover:scale-105 transition-all text-brand-charcoal font-bold text-sm px-6 py-3.5 rounded-xl shadow-xs cursor-pointer"
          >
            <span>Follow @bricksjodhpur</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </section>

      {/* HIGH FIDELITY GLASS LIGHTBOX POPUP MODAL */}
      {activePhoto && (
        <div
          id="gallery-lightbox-modal"
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 bg-brand-charcoal/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-8 animate-fade-in"
        >
          {/* Close Action button */}
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-6 right-6 text-[#FDF9F3]/80 hover:text-white p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all cursor-pointer"
            title="Close Lightbox"
          >
            <X size={24} />
          </button>

          {/* Left Arrow */}
          <button
            onClick={handlePrevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all hidden sm:block cursor-pointer"
            title="Previous Image"
          >
            <ArrowLeft size={20} />
          </button>

          {/* Lightbox glass card */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-panel p-4 rounded-[2rem] border border-white/20 bg-white/10 max-w-4xl w-full flex flex-col md:flex-row gap-6 relative"
          >
            {/* Image Container */}
            <div className="md:w-[65%] h-[280px] sm:h-[420px] rounded-2xl overflow-hidden bg-brand-charcoal/20">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="w-full h-full object-cover animate-zoom-in"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* details text */}
            <div className="md:w-[35%] flex flex-col justify-between text-left p-2 text-white">
              <div className="space-y-4">
                <span className="text-brand-yellow text-xs font-bold uppercase tracking-wider bg-brand-yellow/10 px-3 py-1 rounded-full border border-brand-yellow/20">
                  📍 {activePhoto.category} Category
                </span>
                <h2 className="font-display font-black text-xl sm:text-2xl text-[#FDF9F3] leading-snug">
                  {activePhoto.title}
                </h2>
                <p className="text-[#E7E2DA]/85 text-xs font-light leading-relaxed">
                  Real client captures displaying our fresh ingredients and premium seating spaces in Jodhpur branches.
                </p>
              </div>

              {activePhoto.author && (
                <div className="pt-4 border-t border-white/10 flex items-center space-x-2 text-xs">
                  <span className="w-6 h-6 rounded-full bg-brand-terracotta flex items-center justify-center text-[10px] font-bold">✨</span>
                  <span>Captured beautifully by <strong className="text-brand-yellow">{activePhoto.author}</strong></span>
                </div>
              )}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all hidden sm:block cursor-pointer"
            title="Next Image"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      )}

    </div>
  );
}
