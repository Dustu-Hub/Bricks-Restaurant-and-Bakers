import React, { useState } from 'react';
import { Play, Instagram, ExternalLink, RefreshCw, Star, Heart, MessageCircle } from 'lucide-react';

// Import local images as high-quality preview covers
import heroFoodImg from '../assets/images/regenerated_image_1782984994811.png';
import heroRooftopImg from '../assets/images/regenerated_image_1782984997980.png';
import aboutBakeryImg from '../assets/images/regenerated_image_1782985250282.png';
import aboutGardenImg from '../assets/images/regenerated_image_1782985466195.png';

interface ReelItem {
  id: string;
  code: string;
  title: string;
  description: string;
  coverImage: string;
  likes: string;
  comments: string;
  url: string;
  category: string;
}

export default function FeaturedReels() {
  const [activeReelId, setActiveReelId] = useState<string | null>(null);

  const reels: ReelItem[] = [
    {
      id: 'reel-1',
      code: 'DZzE8GbvpIb',
      title: 'Signature Bricks Culinary Art & Feast',
      description: 'An immersive showcase of our highly celebrated multi-cuisine food, sizzling platters, and iconic north Indian recipes crafted by our head chefs.',
      coverImage: heroFoodImg,
      likes: '1.2k+',
      comments: '180+',
      url: 'https://www.instagram.com/bricksjodhpur/reel/DZzE8GbvpIb/',
      category: 'Chef’s Special'
    },
    {
      id: 'reel-2',
      code: 'DXgdd5Qj7NR',
      title: 'The Dreamy Rooftop Evening Sunset',
      description: 'Step into the breathtaking evening aesthetics at our Bricks Rooftop branch. Live music, cozy lights, and a panoramic view of Jodhpur’s skyline.',
      coverImage: heroRooftopImg,
      likes: '2.4k+',
      comments: '340+',
      url: 'https://www.instagram.com/reel/DXgdd5Qj7NR/',
      category: 'Ambience & Vibe'
    },
    {
      id: 'reel-3',
      code: 'DYO0I1gvQXy',
      title: 'Behind the Scenes: Sizzlers & Baking Secrets',
      description: 'A sneak peek into our burning clay tandoors and hygiene-focused kitchens preparing delicious appetizers and fresh garlic breads from scratch.',
      coverImage: aboutGardenImg,
      likes: '980+',
      comments: '115+',
      url: 'https://www.instagram.com/reel/DYO0I1gvQXy/',
      category: 'Kitchen Stories'
    },
    {
      id: 'reel-4',
      code: 'DXrF_Wsj44t',
      title: 'Artisanal Eggless Cakes & Live Custom Design',
      description: 'Witness the absolute precision behind our custom layered celebration cakes, fresh fruit gateaux, and signature pastries loved by Jodhpur families.',
      coverImage: aboutBakeryImg,
      likes: '1.8k+',
      comments: '220+',
      url: 'https://www.instagram.com/reel/DXrF_Wsj44t/',
      category: 'Eggless Bakes'
    }
  ];

  return (
    <div id="featured-reels-page" className="pt-28 pb-20 bg-brand-bg">
      {/* Header Banner */}
      <section className="bg-brand-secondary-bg/50 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-brand-terracotta bg-white/80 px-4 py-1.5 rounded-full border border-brand-secondary-bg">
            <Instagram size={14} className="animate-pulse" />
            <span>Trending on Instagram</span>
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-brand-charcoal tracking-tight">
            Featured Reels & Stories
          </h1>
          <p className="text-brand-gray text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Experience the culinary magic, aesthetic rooftop vibes, and behind-the-scenes bakery craft directly from our official Instagram handles in Jodhpur.
          </p>
        </div>
      </section>

      {/* Grid of Reels */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {reels.map((reel) => {
            const isPlaying = activeReelId === reel.id;

            return (
              <div
                key={reel.id}
                id={`reel-card-${reel.id}`}
                className="bg-white rounded-[2rem] border border-brand-secondary-bg/60 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col lg:flex-row h-auto lg:h-[480px]"
              >
                {/* Visual / Player Section */}
                <div className="relative w-full lg:w-[45%] h-[320px] lg:h-full bg-black shrink-0 flex items-center justify-center">
                  {isPlaying ? (
                    <iframe
                      src={`https://www.instagram.com/reel/${reel.code}/embed/`}
                      className="w-full h-full border-0"
                      allowTransparency={true}
                      allow="encrypted-media"
                      scrolling="no"
                      title={reel.title}
                    />
                  ) : (
                    <>
                      {/* High-quality Preview Image */}
                      <img
                        src={reel.coverImage}
                        alt={reel.title}
                        className="w-full h-full object-cover opacity-80"
                        referrerPolicy="no-referrer"
                      />
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-between p-6" />

                      {/* Top Badges */}
                      <span className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                        {reel.category}
                      </span>

                      {/* Play Button Overlay */}
                      <button
                        onClick={() => setActiveReelId(reel.id)}
                        className="absolute w-16 h-16 rounded-full bg-brand-yellow text-brand-charcoal hover:bg-brand-yellow/95 hover:scale-110 active:scale-95 flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer group"
                        title="Play Interactive Reel"
                      >
                        <Play size={26} className="fill-brand-charcoal translate-x-0.5 group-hover:rotate-12 transition-transform" />
                      </button>

                      {/* Stats overlay */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center space-x-1">
                            <Heart size={14} className="fill-brand-yellow text-brand-yellow" />
                            <span>{reel.likes}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MessageCircle size={14} className="fill-white text-white" />
                            <span>{reel.comments}</span>
                          </span>
                        </div>
                        <span className="text-[10px] uppercase tracking-widest text-brand-yellow font-bold">
                          Click to Play
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Details Section */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow text-left">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-brand-terracotta">
                      <Instagram size={18} />
                      <span className="text-xs font-bold uppercase tracking-wider">@bricksjodhpur</span>
                    </div>

                    <h3 className="font-display font-black text-xl sm:text-2xl text-brand-charcoal tracking-tight leading-snug">
                      {reel.title}
                    </h3>

                    <p className="text-brand-gray text-xs sm:text-sm font-light leading-relaxed">
                      {reel.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-brand-secondary-bg/60 flex flex-col sm:flex-row gap-3">
                    {isPlaying && (
                      <button
                        onClick={() => setActiveReelId(null)}
                        className="flex-1 inline-flex items-center justify-center space-x-2 bg-brand-secondary-bg hover:bg-brand-secondary-bg/80 text-brand-charcoal font-semibold text-xs px-4 py-3 rounded-xl transition-all cursor-pointer"
                      >
                        <RefreshCw size={14} />
                        <span>Reset Preview</span>
                      </button>
                    )}
                    <a
                      href={reel.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 inline-flex items-center justify-center space-x-2 bg-brand-yellow hover:bg-brand-yellow/95 hover:scale-102 transition-all text-brand-charcoal font-bold text-xs px-4 py-3 rounded-xl shadow-xs cursor-pointer"
                    >
                      <span>Watch on Instagram</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Community Banner */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="p-8 sm:p-12 bg-brand-secondary-bg/30 border border-brand-secondary-bg rounded-[2rem] text-center space-y-6">
          <div className="flex justify-center text-brand-terracotta">
            <Instagram size={36} />
          </div>
          <div className="space-y-2">
            <h3 className="font-display font-black text-2xl text-brand-charcoal">Are You a Content Creator?</h3>
            <p className="text-brand-gray text-xs sm:text-sm font-light max-w-md mx-auto leading-relaxed">
              Tag <strong className="text-brand-terracotta font-semibold">@bricksjodhpur</strong> or use the hashtag <strong className="text-brand-terracotta font-semibold">#BricksJodhpur</strong> in your stories or reels to get featured on our official digital boards!
            </p>
          </div>
          <div className="flex justify-center space-x-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} className="fill-brand-yellow text-brand-yellow" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
