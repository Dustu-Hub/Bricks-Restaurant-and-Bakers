import React, { useState, useMemo } from 'react';
import { Star, Filter, MessageSquare, ThumbsUp, Send, CheckCircle, PenTool } from 'lucide-react';
import { reviews as initialReviews } from '../data';
import { Review } from '../types';

export default function Reviews() {
  const [reviewsList, setReviewsList] = useState<Review[]>(initialReviews);
  const [activeFilterChip, setActiveFilterChip] = useState('All');
  const [sortBy, setSortBy] = useState<'relevant' | 'newest' | 'highest' | 'lowest'>('relevant');
  
  // Custom review writing states
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReviewer, setNewReviewer] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');
  const [newContext, setNewContext] = useState('Dine in | Dinner');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const filterChips = ['All', 'Paneer', 'Cake', 'Outdoor Seating', 'Mahesh ji', 'Hygiene', 'Wheelchair', 'Bakery'];

  // Total rating calculation
  const totalReviewsCount = 2248; // Standardized total review count
  const ratingsBreakdown = [
    { stars: 5, percentage: 82 },
    { stars: 4, percentage: 12 },
    { stars: 3, percentage: 4 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 1 },
  ];

  // Apply filtering and sorting
  const processedReviews = useMemo(() => {
    let result = [...reviewsList];

    // Filter chip implementation (simulated search match on content text)
    if (activeFilterChip !== 'All') {
      const query = activeFilterChip.toLowerCase();
      result = result.filter(r => 
        r.reviewText.toLowerCase().includes(query) || 
        (r.context && r.context.toLowerCase().includes(query))
      );
    }

    // Sort logic
    if (sortBy === 'newest') {
      // Put custom reviews first or sort in order of arrival
      result.reverse();
    } else if (sortBy === 'highest') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'lowest') {
      result.sort((a, b) => a.rating - b.rating);
    }

    return result;
  }, [reviewsList, activeFilterChip, sortBy]);

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewer.trim() || !newText.trim()) {
      alert('Please fill out your name and review text!');
      return;
    }

    const customReview: Review = {
      id: `custom-${Date.now()}`,
      reviewerName: newReviewer,
      rating: newRating,
      timeAgo: 'Just now',
      context: newContext,
      reviewText: newText,
      isLocalGuide: false,
    };

    setReviewsList((prev) => [customReview, ...prev]);
    setReviewSubmitted(true);
    
    setTimeout(() => {
      // Clear states after submission
      setNewReviewer('');
      setNewRating(5);
      setNewText('');
      setNewContext('Dine in | Dinner');
      setShowAddReview(false);
      setReviewSubmitted(false);
    }, 2000);
  };

  return (
    <div id="reviews-page" className="pt-28 pb-20">
      
      {/* Header section with ratings overview dashboard */}
      <section className="bg-brand-secondary-bg/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-10">
          <div className="space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-terracotta bg-white/60 px-4 py-1.5 rounded-full border border-brand-secondary-bg">
              Guest Feedback Dashboard
            </span>
            <h1 className="font-display font-black text-4xl sm:text-5xl text-brand-charcoal tracking-tight">
              What Our Guests Love About Us
            </h1>
          </div>

          {/* Rating overview grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-white/80 backdrop-blur-md p-8 rounded-[2rem] shadow-xs border border-brand-secondary-bg/50">
            
            {/* Main Score panel */}
            <div className="md:col-span-4 flex flex-col items-center justify-center text-center space-y-3 border-b md:border-b-0 md:border-r border-brand-secondary-bg pb-6 md:pb-0 md:pr-6">
              <span className="font-display font-black text-6xl text-brand-charcoal">4.5</span>
              <div className="flex items-center space-x-1 text-brand-yellow">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="fill-brand-yellow text-brand-yellow" size={24} />
                ))}
              </div>
              <span className="text-xs text-brand-gray font-light">
                Average of <strong>2,248 Verified Reviews</strong> on Google Business Listing.
              </span>
            </div>

            {/* Google Rating breakdown bar */}
            <div className="md:col-span-5 flex flex-col justify-center space-y-2">
              {ratingsBreakdown.map((row) => (
                <div key={row.stars} className="flex items-center space-x-3 text-xs text-brand-charcoal">
                  <span className="w-4 font-semibold text-right">{row.stars}★</span>
                  <div className="flex-1 bg-brand-secondary-bg/50 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-brand-yellow h-full rounded-full"
                      style={{ width: `${row.percentage}%` }}
                    />
                  </div>
                  <span className="w-8 text-brand-gray text-right">{row.percentage}%</span>
                </div>
              ))}
            </div>

            {/* CTA action side */}
            <div className="md:col-span-3 flex flex-col justify-center items-stretch gap-3">
              <button
                onClick={() => setShowAddReview(!showAddReview)}
                className="bg-brand-yellow hover:bg-brand-yellow/95 hover:scale-105 text-brand-charcoal font-bold text-sm py-4 px-6 rounded-xl shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <PenTool size={16} />
                <span>Write a Guest Review</span>
              </button>
              <a
                href="https://maps.app.goo.gl/2GBDRraGm3SaQQq49"
                target="_blank"
                rel="noreferrer"
                className="bg-white hover:bg-brand-secondary-bg/30 border border-brand-secondary-bg text-brand-charcoal text-xs font-semibold py-3.5 px-6 rounded-xl text-center transition-all flex items-center justify-center space-x-1"
              >
                <span>View on Google Business</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Write a review collapsible form */}
      {showAddReview && (
        <section className="max-w-2xl mx-auto px-4 sm:px-6 mt-8">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-lg border border-brand-yellow/30 text-left space-y-6">
            
            <div className="flex items-center justify-between border-b border-brand-secondary-bg/50 pb-3">
              <h3 className="font-display font-bold text-lg text-brand-charcoal flex items-center space-x-2">
                <span>📝</span>
                <span>Share Your Dining Experience</span>
              </h3>
              <button
                onClick={() => setShowAddReview(false)}
                className="text-xs text-brand-gray hover:text-brand-terracotta"
              >
                Cancel
              </button>
            </div>

            {reviewSubmitted ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle className="text-emerald-500 mx-auto" size={48} />
                <h4 className="font-display font-bold text-lg text-brand-charcoal">Review Published Locally!</h4>
                <p className="text-brand-gray text-xs font-light">
                  Thank you! Your feedback has been published and added dynamically to the ledger below.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddReviewSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-brand-charcoal">Your Name</label>
                    <input
                      type="text"
                      required
                      value={newReviewer}
                      onChange={(e) => setNewReviewer(e.target.value)}
                      placeholder="e.g. CA Pankaj Lohiya"
                      className="w-full bg-white text-brand-charcoal text-sm p-3 rounded-xl border border-brand-secondary-bg focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-brand-charcoal">Dine context</label>
                    <input
                      type="text"
                      value={newContext}
                      onChange={(e) => setNewContext(e.target.value)}
                      placeholder="e.g. Dine in | Dinner | Sardarpura"
                      className="w-full bg-white text-brand-charcoal text-sm p-3 rounded-xl border border-brand-secondary-bg focus:outline-none"
                    />
                  </div>
                </div>

                {/* Rating select stars */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-brand-charcoal">Your Star Rating</label>
                  <div className="flex items-center space-x-1 text-brand-yellow">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="cursor-pointer hover:scale-110 transition-transform"
                      >
                        <Star size={24} className={newRating >= star ? 'fill-brand-yellow' : 'text-brand-secondary-bg'} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text comment */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-brand-charcoal">Detailed Review</label>
                  <textarea
                    rows={4}
                    required
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    placeholder="Tell other Jodhpurites about the food quality, wheelchair entry, rooftop views, and staff behavior..."
                    className="w-full bg-white text-brand-charcoal text-xs sm:text-sm p-3.5 rounded-xl border border-brand-secondary-bg focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-forest text-white font-bold text-xs p-3.5 rounded-xl hover:bg-brand-forest/90 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Send size={14} />
                  <span>Submit Guest Review</span>
                </button>
              </form>
            )}

          </div>
        </section>
      )}

      {/* Filters and Sorters Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-xs border border-brand-secondary-bg/50">
          
          {/* Filter Chips list */}
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-left">
            {filterChips.map((chip) => (
              <button
                key={chip}
                onClick={() => setActiveFilterChip(chip)}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold cursor-pointer transition-all shrink-0 whitespace-nowrap ${
                  activeFilterChip === chip
                    ? 'bg-brand-terracotta text-white'
                    : 'bg-brand-secondary-bg/35 text-brand-charcoal hover:bg-brand-secondary-bg/60'
                }`}
              >
                {chip === 'All' ? '📌 All Reviews' : `# ${chip}`}
              </button>
            ))}
          </div>

          {/* Sorter Selector */}
          <div className="flex items-center space-x-2 text-xs sm:text-sm shrink-0">
            <span className="text-brand-gray font-light">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white text-brand-charcoal p-2 rounded-lg border border-brand-secondary-bg focus:outline-none font-semibold cursor-pointer"
            >
              <option value="relevant">Most Relevant</option>
              <option value="newest">Newest First</option>
              <option value="highest">Highest Rating (5★)</option>
              <option value="lowest">Lowest Rating (1★)</option>
            </select>
          </div>

        </div>

        {/* Dynamic Reviews cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {processedReviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xs border border-brand-secondary-bg/50 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Author row */}
                <div className="flex items-center justify-between border-b border-brand-secondary-bg/50 pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-brand-terracotta/10 text-brand-terracotta font-display font-black text-lg flex items-center justify-center">
                      {rev.reviewerName.charAt(0)}
                    </div>
                    <div>
                      <span className="font-display font-bold text-sm sm:text-base text-brand-charcoal block">
                        {rev.reviewerName}
                      </span>
                      {rev.isLocalGuide && (
                        <span className="text-[9px] bg-amber-50 text-amber-700 font-extrabold px-1.5 py-0.5 rounded border border-amber-200">
                          Local Guide ({rev.reviewsCount || 10} reviews)
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] text-brand-gray font-light shrink-0">
                    {rev.timeAgo}
                  </span>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center space-x-1 text-brand-yellow">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < rev.rating ? 'fill-brand-yellow text-brand-yellow' : 'text-brand-secondary-bg'}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-brand-gray text-xs sm:text-sm leading-relaxed font-light italic">
                  "{rev.reviewText}"
                </p>
              </div>

              {/* context footer line */}
              {rev.context && (
                <div className="mt-4 pt-3 border-t border-brand-secondary-bg/50 flex items-center justify-between text-[10px] text-brand-gray">
                  <span>Context: <strong className="text-brand-charcoal">{rev.context}</strong></span>
                  {rev.imagesCount && (
                    <span className="text-brand-terracotta font-semibold">📸 Shared {rev.imagesCount} photos</span>
                  )}
                </div>
              )}

            </div>
          ))}
        </div>

      </section>

    </div>
  );
}
