import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Clock, ArrowLeft, Star, Compass, Navigation, CalendarCheck, Image as ImageIcon } from 'lucide-react';
import { branches } from '../data';

interface LocationsProps {
  onNavigate: (path: string) => void;
  selectedBranchId: 'sardarpura' | 'bhadwasiya' | 'paota' | null;
  onSelectBranch: (branchId: 'sardarpura' | 'bhadwasiya' | 'paota' | null) => void;
}

export default function Locations({ onNavigate, selectedBranchId, onSelectBranch }: LocationsProps) {
  // If selectedBranchId is null, we show the main list. Otherwise we show the detail page.

  const currentBranch = branches.find(b => b.id === selectedBranchId);

  const handleBookTable = (branchId: 'sardarpura' | 'bhadwasiya' | 'paota') => {
    onSelectBranch(branchId);
    onNavigate('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="locations-page" className="pt-28 pb-20">
      
      {!currentBranch ? (
        /* MAIN LOCATIONS LIST OVERVIEW */
        <div id="locations-overview" className="space-y-16">
          {/* Header */}
          <section className="bg-brand-secondary-bg/50 py-16 text-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-terracotta bg-white/60 px-4 py-1.5 rounded-full border border-brand-secondary-bg">
                3 Jodhpur Outlets
              </span>
              <h1 className="font-display font-black text-4xl sm:text-5xl text-brand-charcoal tracking-tight">
                Our Stunning Dining Venues
              </h1>
              <p className="text-brand-gray text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
                Whether you prefer looking over Jodhpur from our starlit rooftop in Sardarpura, hosting events in Bhadwasiya, or relaxing in our grand Paota open-air gardens, we have the perfect seating for you.
              </p>
            </div>
          </section>

          {/* Three branches Grid with Map Embeds */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {branches.map((branch) => (
                <div
                  key={branch.id}
                  className="glass-panel glass-card-hover rounded-3xl overflow-hidden shadow-xs flex flex-col justify-between group text-left border border-brand-secondary-bg/50"
                >
                  <div>
                    {/* Branch Image */}
                    <div className="h-52 overflow-hidden relative">
                      <img
                        src={branch.images[0]}
                        alt={branch.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 right-4 bg-brand-yellow text-brand-charcoal text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        🌿 100% Veg
                      </div>
                    </div>

                    {/* Quick Details */}
                    <div className="p-6 space-y-4">
                      <h3 className="font-display font-black text-2xl text-brand-charcoal group-hover:text-brand-terracotta transition-colors leading-none">
                        {branch.name}
                      </h3>

                      <p className="text-brand-gray text-xs sm:text-sm font-light leading-relaxed flex items-start space-x-2">
                        <MapPin size={18} className="text-brand-terracotta mt-0.5 shrink-0" />
                        <span>{branch.address}</span>
                      </p>

                      <div className="flex flex-col space-y-2 text-xs text-brand-charcoal pt-2">
                        <div className="flex items-center space-x-2">
                          <Phone size={14} className="text-brand-forest" />
                          <a href={`tel:${branch.phone.replace(/\s+/g, '')}`} className="hover:underline font-semibold">{branch.phone}</a>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock size={14} className="text-brand-gray" />
                          <span className="font-light">Open Daily: {branch.timings}</span>
                        </div>
                      </div>

                      {/* Map Embed preview (small iframe for visual completeness) */}
                      <div className="rounded-2xl overflow-hidden h-36 border border-brand-secondary-bg">
                        <iframe
                          title={`${branch.name} location map`}
                          src={branch.mapEmbedUrl}
                          className="w-full h-full border-none"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="p-6 bg-brand-secondary-bg/10 border-t border-brand-secondary-bg/50 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => onSelectBranch(branch.id)}
                      className="border border-brand-terracotta text-brand-terracotta hover:bg-brand-terracotta hover:text-white text-xs font-bold py-3 rounded-xl text-center transition-all cursor-pointer"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleBookTable(branch.id)}
                      className="bg-brand-yellow hover:bg-brand-yellow/95 text-brand-charcoal text-xs font-bold py-3 rounded-xl text-center transition-all cursor-pointer"
                    >
                      Book Table
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        /* INDIVIDUAL BRANCH DEDICATED DETAIL VIEW */
        <div id={`location-${currentBranch.id}`} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
          
          {/* Back Action button */}
          <button
            onClick={() => onSelectBranch(null)}
            className="inline-flex items-center space-x-2 text-sm text-brand-terracotta font-semibold hover:underline cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back to All Venues</span>
          </button>

          {/* Title & Subheading */}
          <div className="space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-terracotta bg-brand-yellow/20 px-3.5 py-1.5 rounded-full">
              📍 Custom Branch Showcase
            </span>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-brand-charcoal">
              {currentBranch.name}
            </h1>
            <p className="text-brand-gray text-sm sm:text-base max-w-3xl font-light">
              Explore the unique environment, timings, contact, directions, and curated dining features at our Jodhpur {selectedBranchId} outlet.
            </p>
          </div>

          {/* Main Layout grid: Left detail columns, Right Map Embed */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Content columns */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Branch photos gallery specific to branch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentBranch.images.map((img, idx) => (
                  <div key={idx} className="h-56 rounded-3xl overflow-hidden shadow-xs relative group">
                    <img
                      src={img}
                      alt={`${currentBranch.name} seating view ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-brand-charcoal/10" />
                    <span className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-md text-[10px] text-brand-charcoal px-3 py-1 rounded-full font-semibold flex items-center space-x-1">
                      <ImageIcon size={10} />
                      <span>{idx === 0 ? 'Primary Seating' : 'Ambience View'}</span>
                    </span>
                  </div>
                ))}
              </div>

              {/* Core Features / Highlights lists */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-brand-charcoal">Special Branch Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {currentBranch.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-2.5 p-3.5 bg-white rounded-2xl border border-brand-secondary-bg/50">
                      <span className="text-brand-terracotta font-bold">✓</span>
                      <span className="text-brand-charcoal font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary timing info and quick call */}
              <div className="p-6 bg-brand-yellow/10 border border-brand-yellow/25 rounded-3xl grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider text-brand-gray block">Opening Hours</span>
                  <div className="flex items-center space-x-2 text-brand-charcoal font-bold text-sm">
                    <Clock size={16} className="text-brand-terracotta" />
                    <span>{currentBranch.timings}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider text-brand-gray block">Quick Reservation Desk</span>
                  <div className="flex items-center space-x-2 text-brand-charcoal font-bold text-sm">
                    <Phone size={16} className="text-brand-forest" />
                    <a href={`tel:${currentBranch.phone.replace(/\s+/g, '')}`} className="hover:underline">{currentBranch.phone}</a>
                  </div>
                </div>
              </div>

              {/* Table Action button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={() => handleBookTable(currentBranch.id)}
                  className="bg-brand-yellow hover:bg-brand-yellow/90 hover:scale-[1.03] text-brand-charcoal font-bold text-sm px-8 py-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <CalendarCheck size={18} />
                  <span>Book a Table here</span>
                </button>
                <a
                  href={currentBranch.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white hover:bg-brand-secondary-bg/40 border border-brand-secondary-bg text-brand-charcoal font-bold text-sm px-8 py-4 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Navigation size={18} className="text-brand-terracotta" />
                  <span>Get Directions on Google Maps</span>
                </a>
              </div>

            </div>

            {/* Right Map embed Column */}
            <div className="lg:col-span-5 space-y-4 sticky top-28">
              <div className="glass-panel p-4 rounded-3xl shadow-md border border-white space-y-4">
                <div className="h-[380px] rounded-2xl overflow-hidden border border-brand-secondary-bg">
                  <iframe
                    title={`${currentBranch.name} full details map`}
                    src={currentBranch.mapEmbedUrl}
                    className="w-full h-full border-none"
                    loading="lazy"
                  />
                </div>
                <div className="text-xs text-brand-gray text-left space-y-1 px-1">
                  <span className="font-semibold block text-brand-charcoal">Location Address:</span>
                  <p className="font-light leading-relaxed">{currentBranch.address}</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
