import React, { useState, useMemo } from 'react';
import { Search, FileDown, Eye, Check, ShoppingBag } from 'lucide-react';
import { menuItems } from '../data';

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'multi-cuisine' | 'bakery' | 'cafe' | 'fast-food'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloading, setDownloading] = useState(false);

  const categories = [
    { id: 'all', label: '📖 All Flavors' },
    { id: 'multi-cuisine', label: '🍽️ Multi-Cuisine' },
    { id: 'bakery', label: '🍰 Eggless Bakery' },
    { id: 'cafe', label: '☕ Café Beverages' },
    { id: 'fast-food', label: '🍕 Fast Food Hub' },
  ];

  // Filter items
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleDownloadPDF = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      // Simulate file download by creating a virtual element
      alert('📥 Bricks Restaurant & Bakers Full PDF Menu (Jodhpur Edition) has been generated & downloaded successfully to your device! (Simulated download)');
    }, 1500);
  };

  const handleOrderWhatsApp = (itemName: string) => {
    const text = encodeURIComponent(`Hello Bricks Jodhpur! I would like to order "${itemName}". Could you please confirm if this is available for home delivery?`);
    window.open(`https://wa.me/919636041190?text=${text}`, '_blank');
  };

  return (
    <div id="menu-page" className="pt-28 pb-20">
      {/* Menu Header with Action */}
      <section className="bg-brand-secondary-bg/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-terracotta bg-white/60 px-4 py-1.5 rounded-full border border-brand-secondary-bg">
              Freshly Prepared Jodhpur Wide
            </span>
            <h1 className="font-display font-black text-4xl sm:text-5xl text-brand-charcoal tracking-tight">
              Our Artisanal Culinary Menu
            </h1>
            <p className="text-brand-gray text-sm sm:text-base font-light leading-relaxed">
              Every dish is prepared using fresh ingredients, locally sourced spices, and handled with extreme sanitization. All bakery items are strictly eggless, made in a completely segregated baking zone.
            </p>
          </div>

          <button
            onClick={handleDownloadPDF}
            className="w-full md:w-auto bg-brand-forest hover:bg-brand-forest/95 text-[#FDF9F3] font-bold text-sm px-6 py-4 rounded-xl shadow-md hover:scale-105 transition-all flex items-center justify-center space-x-2 cursor-pointer shrink-0 border border-brand-forest/20"
          >
            <FileDown size={18} />
            <span>{downloading ? 'Generating PDF...' : 'Download PDF Menu'}</span>
          </button>
        </div>
      </section>

      {/* Main Filter & Search Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
        
        {/* Sticky category sub-navigation & Search Row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-xs border border-brand-secondary-bg/50">
          
          {/* Categories Tab pills */}
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide cursor-pointer transition-all shrink-0 whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-brand-terracotta text-white shadow-sm'
                    : 'bg-brand-secondary-bg/30 text-brand-charcoal hover:bg-brand-secondary-bg/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative max-w-sm w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g. paneer, cake)..."
              className="w-full bg-brand-secondary-bg/30 text-brand-charcoal text-xs sm:text-sm px-4 py-3 pl-10 rounded-xl focus:outline-none focus:bg-white focus:ring-1 focus:ring-brand-terracotta transition-all border border-transparent focus:border-brand-terracotta"
            />
            <Search className="absolute left-3 top-3 text-brand-gray" size={16} />
          </div>

        </div>

        {/* Banner inside Menu page for custom cake designer */}
        {(selectedCategory === 'all' || selectedCategory === 'bakery') && (
          <div className="bg-[#FAF6F0] rounded-[2rem] p-8 border border-brand-yellow/30 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 text-left">
            <div className="space-y-2">
              <span className="text-[10px] bg-brand-yellow/50 text-brand-charcoal font-extrabold uppercase px-3 py-1 rounded-full border border-brand-yellow/30">
                Interactive Cake Studio 🎂
              </span>
              <h3 className="font-display font-black text-xl sm:text-2xl text-brand-charcoal">
                Planning a Special Birthday or Anniversary?
              </h3>
              <p className="text-brand-gray text-xs sm:text-sm font-light max-w-2xl leading-relaxed">
                Try our custom <strong className="font-semibold text-brand-charcoal">Interactive Eggless Cake Builder</strong>! Choose tiers, shapes, frosting colors, organic toppings, write a personal cream message, and check estimates live.
              </p>
            </div>
            <button
              onClick={() => {
                window.location.hash = '#/cake-designer';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full md:w-auto bg-brand-terracotta hover:bg-brand-terracotta/95 text-white font-bold text-xs sm:text-sm px-6 py-4 rounded-xl shadow-md transition-all shrink-0 hover:scale-[1.03] cursor-pointer"
            >
              Open Interactive Cake Designer →
            </button>
          </div>
        )}

        {/* Menu Items Grid */}
        <div className="min-h-[400px]">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="glass-panel glass-card-hover rounded-3xl p-5 flex flex-col justify-between shadow-xs group text-left"
                >
                  <div className="space-y-4">
                    {/* Item Image with indicators */}
                    <div className="h-52 rounded-2xl overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Veg/Eggless Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                        {item.isVeg && (
                          <span className="bg-emerald-50 text-emerald-700 text-[9px] font-extrabold px-2 py-1 rounded-md shadow-xs border border-emerald-200">
                            🟢 100% VEG
                          </span>
                        )}
                        {item.isEggless && (
                          <span className="bg-amber-50 text-amber-700 text-[9px] font-extrabold px-2 py-1 rounded-md shadow-xs border border-amber-200">
                            🍰 EGGLESS
                          </span>
                        )}
                      </div>

                      {item.isBestSeller && (
                        <div className="absolute bottom-3 right-3 bg-brand-yellow text-brand-charcoal text-[9px] font-extrabold px-2 py-1 rounded-md shadow-md uppercase tracking-wide">
                          Chef Spl 🔥
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div>
                      <h3 className="font-display font-black text-lg sm:text-xl text-brand-charcoal group-hover:text-brand-terracotta transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-brand-gray text-xs sm:text-sm font-light leading-relaxed mt-2 line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Price Row & Action */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-brand-secondary-bg/50">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider text-brand-gray">Price</span>
                      <span className="font-handwritten text-2xl font-black text-brand-terracotta leading-none">
                        ₹{item.price}
                      </span>
                    </div>

                    <button
                      onClick={() => handleOrderWhatsApp(item.name)}
                      className="bg-brand-yellow hover:bg-brand-yellow/95 hover:scale-105 text-brand-charcoal font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center space-x-2 cursor-pointer"
                    >
                      <ShoppingBag size={14} />
                      <span>Order on WhatsApp</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl shadow-xs border border-brand-secondary-bg/50 text-center space-y-4 max-w-md mx-auto my-12">
              <span className="text-4xl">🧁</span>
              <h3 className="font-display font-bold text-lg text-brand-charcoal">No Dishes Found</h3>
              <p className="text-brand-gray text-xs font-light">
                We couldn’t find any matches for your query. Try searching for something else or reset your filter category.
              </p>
              <button
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="bg-brand-terracotta text-white font-semibold text-xs px-4 py-2 rounded-xl"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>

      </section>

      {/* Safety Notice Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="p-8 sm:p-12 bg-brand-forest text-brand-bg rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
            <div className="md:col-span-8 space-y-3">
              <h4 className="font-display font-bold text-2xl text-brand-yellow tracking-tight">Our Zero-Cross-Contamination Guarantee</h4>
              <p className="text-[#E7E2DA]/85 text-xs sm:text-sm font-light leading-relaxed">
                Our eggless baking tools, mixers, ovens, and preparation counters are strictly separated from other elements. The baking kitchen is certified egg-free, milk-safe, and maintained to the highest vegetarian specifications of Jodhpur.
              </p>
            </div>
            <div className="md:col-span-4 flex justify-start md:justify-end">
              <span className="bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/30 text-xs font-bold px-4 py-2.5 rounded-xl">
                🥛 ISO 22000 Quality Assured
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
