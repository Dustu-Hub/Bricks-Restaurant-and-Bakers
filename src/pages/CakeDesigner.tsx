import React, { useState, useMemo } from 'react';
import { Cake, Sparkles, Layers, Info, Calendar, Send, MessageSquare, Heart, RefreshCw, Star, CheckCircle, Flame } from 'lucide-react';

interface CakeOption {
  id: string;
  name: string;
  color: string; // Hex color or class name for visual preview
  priceMultiplier: number;
  description: string;
}

export default function CakeDesigner() {
  // Designer state
  const [shape, setShape] = useState<'circular' | 'heart' | 'square'>('circular');
  const [tiers, setTiers] = useState<1 | 2 | 3>(1);
  const [flavor, setFlavor] = useState<string>('chocolate');
  const [frosting, setFrosting] = useState<string>('pink');
  const [weight, setWeight] = useState<number>(1); // in kgs
  const [toppings, setToppings] = useState<string[]>(['sprinkles']);
  const [pipingStyle, setPipingStyle] = useState<'star' | 'ruffle' | 'none'>('star');
  const [customMessage, setCustomMessage] = useState<string>('Happy Birthday');
  const [messageColor, setMessageColor] = useState<string>('#ffffff');
  
  // Order submission states
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [instructions, setInstructions] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Flavor details
  const flavors: Record<string, CakeOption> = {
    chocolate: { id: 'chocolate', name: 'Dutch Ganache Chocolate', color: '#3D2314', priceMultiplier: 1.0, description: 'Rich dark Belgian chocolate sponge and syrup' },
    velvet: { id: 'velvet', name: 'Luxurious Red Velvet', color: '#8A1515', priceMultiplier: 1.2, description: 'Velvety cocoa sponge with high-grade cream cheese hint' },
    vanilla: { id: 'vanilla', name: 'Classic Vanilla Confetti', color: '#F9EAD1', priceMultiplier: 0.9, description: 'Golden butter vanilla sponge baked with sprinkles' },
    mango: { id: 'mango', name: 'Alphonso Mango Sunshine', color: '#F1A80A', priceMultiplier: 1.15, description: 'Tropical fresh Jodhpur local mango compote swirl' },
    butterscotch: { id: 'butterscotch', name: 'Crunchy Butterscotch Bliss', color: '#CCA05A', priceMultiplier: 1.0, description: 'Caramelized praline crunch layered in fresh cream' },
  };

  // Frosting colors
  const frostings: Record<string, CakeOption> = {
    pink: { id: 'pink', name: 'Pastel Rose Pink', color: '#FFB7B2', priceMultiplier: 1.0, description: 'Naturally strawberry infused fresh whipped cream' },
    white: { id: 'white', name: 'Snow Cream White', color: '#F8F9FA', priceMultiplier: 1.0, description: 'Velvety Madagascar vanilla bean cream frosting' },
    chocolate: { id: 'chocolate', name: 'Dark Truffle Glaze', color: '#2B1A11', priceMultiplier: 1.15, description: 'Glossy cooked chocolate ganache pour over' },
    lavender: { id: 'lavender', name: 'Enchanted Lavender Purple', color: '#E8Dff5', priceMultiplier: 1.1, description: 'Subtly sweet floral infused premium cream' },
    blue: { id: 'blue', name: 'Ocean Mist Blue', color: '#B3CDE3', priceMultiplier: 1.0, description: 'Blueberry-kissed soft blue whipped cream' },
  };

  // Topping options
  const availableToppings = [
    { id: 'sprinkles', name: 'Golden Sprinkles', emoji: '✨', price: 40 },
    { id: 'strawberries', name: 'Fresh Strawberries', emoji: '🍓', price: 120 },
    { id: 'macarons', name: 'Mini French Macarons', emoji: '🧁', price: 150 },
    { id: 'roses', name: 'Edible Sugar Roses', emoji: '🌹', price: 100 },
    { id: 'chocolate-shavings', name: 'Dark Chocolate Curls', emoji: '🍫', price: 60 },
    { id: 'goldfoil', name: '24K Edible Gold Foil', emoji: '👑', price: 200 },
  ];

  // Weight pricing table
  const basePricePerKg = 600; // INR

  const totalPrice = useMemo(() => {
    const selectedFlavorMultiplier = flavors[flavor]?.priceMultiplier || 1.0;
    const selectedFrostingMultiplier = frostings[frosting]?.priceMultiplier || 1.0;
    
    // Tiers multiplier
    const tierMultiplier = tiers === 1 ? 1.0 : tiers === 2 ? 1.4 : 1.8;

    // Toppings cost
    const toppingsCost = toppings.reduce((sum, topId) => {
      const topObj = availableToppings.find(t => t.id === topId);
      return sum + (topObj ? topObj.price : 0);
    }, 0);

    // Calculate final weight & custom additions
    const computedBase = basePricePerKg * weight * selectedFlavorMultiplier * selectedFrostingMultiplier * tierMultiplier;
    return Math.round(computedBase + toppingsCost);
  }, [shape, tiers, flavor, frosting, weight, toppings, pipingStyle]);

  const toggleTopping = (id: string) => {
    if (toppings.includes(id)) {
      setToppings(toppings.filter(t => t !== id));
    } else {
      setToppings([...toppings, id]);
    }
  };

  const handleReset = () => {
    setShape('circular');
    setTiers(1);
    setFlavor('chocolate');
    setFrosting('pink');
    setWeight(1);
    setToppings(['sprinkles']);
    setPipingStyle('star');
    setCustomMessage('Happy Birthday');
    setMessageColor('#ffffff');
    setInstructions('');
  };

  const handleCreateWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userPhone.trim() || !deliveryDate) {
      alert('Please fill out your Name, WhatsApp Number, and Target Delivery Date!');
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      const toppingListNames = toppings.map(t => availableToppings.find(o => o.id === t)?.name || t).join(', ');
      const textMessage = `🍰 *NEW CUSTOM EGGLESS CAKE ORDER REQUEST* 🍰
-----------------------------------------
👤 *Customer:* ${userName}
📞 *WhatsApp:* ${userPhone}
📅 *Required Date:* ${deliveryDate}

🎂 *CAKE SPECIFICATIONS:*
• *Shape:* ${shape.toUpperCase()}
• *Tiers:* ${tiers} Tier(s)
• *Flavor (Sponge):* ${flavors[flavor]?.name}
• *Outer Frosting:* ${frostings[frosting]?.name}
• *Target Weight:* ${weight} Kilogram(s)
• *Piped Border:* ${pipingStyle === 'none' ? 'None' : pipingStyle + ' piping'}
• *Custom Message:* "${customMessage}"
• *Premium Toppings:* [ ${toppingListNames || 'None'} ]

📝 *Special Instructions / Event Details:*
${instructions || 'None'}

💰 *Estimated Price Quote:* ₹${totalPrice} INR
-----------------------------------------
📲 Please confirm this order & share advance payment link for Jodhpur delivery!`;

      // Dispatch window.open
      const encodedText = encodeURIComponent(textMessage);
      window.open(`https://wa.me/919636041190?text=${encodedText}`, '_blank');
    }, 1500);
  };

  return (
    <div id="cake-designer-page" className="pt-28 pb-20">
      
      {/* Editorial Header */}
      <section className="bg-brand-secondary-bg/50 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-terracotta bg-white/70 px-5 py-2 rounded-full border border-brand-secondary-bg">
            🎂 100% Eggless Custom Cake Studio
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-brand-charcoal tracking-tight">
            Design Your Dream Celebration Cake
          </h1>
          <p className="text-brand-gray text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Unleash your creativity! Configure your customized celebratory cake below. Witness your creation update live in our 2D canvas, calculate instant quotes, and submit directly to our head bakers.
          </p>
        </div>
      </section>

      {/* Main Designer Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: Cake Visualization Stage & Pricing (Sticky on desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            
            <div className="bg-[#FAF6F0] rounded-[2.5rem] p-8 border border-brand-secondary-bg/80 shadow-lg flex flex-col justify-between relative overflow-hidden h-[480px]">
              {/* Background elegant grid lines */}
              <div className="absolute inset-0 z-0 bg-[radial-gradient(#E8DCC4_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
              
              {/* Reset button */}
              <button
                onClick={handleReset}
                title="Reset Configuration"
                className="absolute top-4 right-4 z-10 bg-white hover:bg-brand-secondary-bg hover:scale-105 p-3 rounded-full shadow-sm text-brand-charcoal transition-all cursor-pointer"
              >
                <RefreshCw size={14} />
              </button>

              {/* Eggless badge */}
              <div className="absolute top-4 left-4 z-10 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center space-x-1 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 flex items-center justify-center text-[6px] text-white">●</span>
                <span className="text-[10px] font-bold text-emerald-800 tracking-wider uppercase">100% Pure Veg</span>
              </div>

              {/* Visual 2D Tier Renderer */}
              <div className="flex-1 flex flex-col items-center justify-end pb-12 pt-16 relative z-10">
                
                {/* Toppings Layer - Floating above the topmost tier */}
                <div className="flex justify-center space-x-2 mb-[-8px] z-30">
                  {toppings.map((topId, idx) => {
                    const topInfo = availableToppings.find(t => t.id === topId);
                    return topInfo ? (
                      <span
                        key={topId}
                        className="text-2xl animate-bounce"
                        style={{ animationDelay: `${idx * 0.15}s`, animationDuration: '2.5s' }}
                      >
                        {topInfo.emoji}
                      </span>
                    ) : null;
                  })}
                </div>

                {/* Cake Tiers Container */}
                <div className="w-full flex flex-col items-center justify-end space-y-1">
                  
                  {/* Tier 3 (Top Tier - Only shown for 3 Tiers) */}
                  {tiers >= 3 && (
                    <div
                      style={{
                        backgroundColor: frostings[frosting]?.color,
                        borderColor: shape === 'heart' ? '#FFD1DC' : 'rgba(0,0,0,0.06)',
                      }}
                      className={`w-32 h-16 rounded-t-xl shadow-md border flex flex-col items-center justify-center transition-all duration-500 relative transform ${
                        shape === 'heart' ? 'rounded-b-xl' : shape === 'square' ? 'rounded-none' : 'rounded-full'
                      }`}
                    >
                      {/* Inner sponge color hint */}
                      <div
                        style={{ backgroundColor: flavors[flavor]?.color }}
                        className="absolute bottom-1 left-2 right-2 h-1 rounded-full opacity-60"
                      />
                      {/* Piping border decoration */}
                      {pipingStyle !== 'none' && (
                        <div className="absolute top-0 left-0 right-0 h-1.5 flex justify-between px-1 overflow-hidden opacity-80">
                          {Array.from({ length: 8 }).map((_, i) => (
                            <span key={i} className="text-[8px] text-white leading-none">✿</span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tier 2 (Middle Tier - Shown for 2 & 3 Tiers) */}
                  {tiers >= 2 && (
                    <div
                      style={{
                        backgroundColor: frostings[frosting]?.color,
                        borderColor: shape === 'heart' ? '#FFD1DC' : 'rgba(0,0,0,0.06)',
                      }}
                      className={`w-44 h-20 rounded-t-xl shadow-md border flex flex-col items-center justify-center transition-all duration-500 relative transform ${
                        shape === 'heart' ? 'rounded-b-xl' : shape === 'square' ? 'rounded-none' : 'rounded-full'
                      }`}
                    >
                      {/* Inner sponge color hint */}
                      <div
                        style={{ backgroundColor: flavors[flavor]?.color }}
                        className="absolute bottom-1 left-3 right-3 h-1.5 rounded-full opacity-60"
                      />
                      {/* Piping border decoration */}
                      {pipingStyle !== 'none' && (
                        <div className="absolute top-0 left-0 right-0 h-1.5 flex justify-between px-1 overflow-hidden opacity-80">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <span key={i} className="text-[8px] text-white leading-none">✿</span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tier 1 (Base Tier - Always shown) */}
                  <div
                    style={{
                      backgroundColor: frostings[frosting]?.color,
                      borderColor: shape === 'heart' ? '#FFD1DC' : 'rgba(0,0,0,0.06)',
                    }}
                    className={`w-56 h-24 rounded-t-2xl shadow-lg border flex flex-col items-center justify-center transition-all duration-500 relative transform ${
                      shape === 'heart' ? 'rounded-b-2xl' : shape === 'square' ? 'rounded-none' : 'rounded-full'
                    }`}
                  >
                    {/* Inner sponge color hint */}
                    <div
                      style={{ backgroundColor: flavors[flavor]?.color }}
                      className="absolute bottom-1 left-4 right-4 h-2 rounded-full opacity-60"
                    />

                    {/* Piping border decoration */}
                    {pipingStyle !== 'none' && (
                      <div className="absolute top-0 left-0 right-0 h-1.5 flex justify-between px-1 overflow-hidden opacity-80">
                        {Array.from({ length: 16 }).map((_, i) => (
                          <span key={i} className="text-[8px] text-white leading-none">✿</span>
                        ))}
                      </div>
                    )}

                    {/* Custom written text message on the base tier */}
                    {customMessage.trim() && (
                      <div className="absolute inset-x-2 text-center select-none py-1 px-2 rounded bg-black/5 backdrop-blur-[1px] transform -rotate-1">
                        <span
                          style={{ color: messageColor }}
                          className="font-display font-bold italic tracking-wide text-xs sm:text-sm drop-shadow-md whitespace-nowrap block truncate"
                        >
                          {customMessage}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Elegant Cake Stand */}
                  <div className="w-64 h-3 bg-brand-stone-accent rounded-full shadow-md relative">
                    <div className="w-20 h-8 bg-brand-stone-accent/80 mx-auto rounded-b-xl border-t border-black/10" />
                  </div>

                </div>

              </div>

              {/* Bottom bar with configuration recap text */}
              <div className="pt-4 border-t border-brand-secondary-bg/50 flex items-center justify-between z-10 text-left">
                <div>
                  <span className="text-[10px] text-brand-gray uppercase tracking-widest block font-bold">Active Design</span>
                  <span className="font-semibold text-xs text-brand-charcoal">
                    {tiers} Tier • {flavors[flavor]?.name} • {frostings[frosting]?.name}
                  </span>
                </div>
                {shape === 'heart' && <Heart className="text-brand-terracotta fill-brand-terracotta animate-pulse" size={16} />}
              </div>

            </div>

            {/* Instant Estimate Quote panel */}
            <div className="bg-brand-forest text-[#FDF9F3] p-6 rounded-3xl shadow-md text-left flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-brand-yellow tracking-widest flex items-center space-x-1">
                  <span>💎</span>
                  <span>Estimated Pricing Quote</span>
                </span>
                <p className="text-xs text-white/80 font-light">Includes eggless premium baking + custom packaging.</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-display font-black text-brand-yellow">₹{totalPrice}</span>
                <span className="text-[10px] text-white/60 block">INR</span>
              </div>
            </div>

          </div>

          {/* RIGHT: Customization Controls Panel */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-[2.5rem] border border-brand-secondary-bg/80 shadow-md text-left space-y-8">
            
            <div className="space-y-1 pb-4 border-b border-brand-secondary-bg/50">
              <h2 className="font-display font-black text-2xl text-brand-charcoal">Customize Specifications</h2>
              <p className="text-brand-gray text-xs font-light">Adjust sizes, shapes, organic toppings, and personal notes below.</p>
            </div>

            {/* Shape selection */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-extrabold tracking-widest text-brand-charcoal block">1. Select Cake Base Shape</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'circular', label: '⭕ Circular', desc: 'Standard choice' },
                  { id: 'heart', label: '❤️ Heart-shaped', desc: 'Anniversaries' },
                  { id: 'square', label: '⬜ Square geometric', desc: 'Modern/Corporate' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setShape(s.id as any)}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      shape === s.id
                        ? 'bg-brand-yellow/30 border-brand-yellow text-brand-charcoal font-bold scale-[1.02]'
                        : 'bg-white border-brand-secondary-bg hover:bg-brand-secondary-bg/30 text-brand-gray text-xs'
                    }`}
                  >
                    <span className="block text-sm sm:text-base">{s.label.split(' ')[0]}</span>
                    <span className="block text-xs font-semibold mt-1">{s.label.split(' ').slice(1).join(' ')}</span>
                    <span className="block text-[9px] text-brand-gray/80 mt-0.5 leading-none font-light">{s.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tiers slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs uppercase font-extrabold tracking-widest text-brand-charcoal block">2. Multi-Tier Structure</label>
                <span className="text-xs text-brand-terracotta bg-brand-terracotta/5 px-2 py-0.5 rounded font-bold">{tiers} Tier(s)</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {([1, 2, 3] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTiers(t)}
                    className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      tiers === t
                        ? 'bg-brand-terracotta text-white border-brand-terracotta font-bold scale-102 shadow-xs'
                        : 'bg-white border-brand-secondary-bg hover:bg-brand-secondary-bg/30 text-brand-charcoal'
                    }`}
                  >
                    <span className="block font-black text-sm">{t === 1 ? 'Single Layer' : t === 2 ? 'Double Tier' : 'Triple Tier'}</span>
                    <span className="block text-[9px] opacity-80 mt-0.5 font-light">{t === 1 ? 'Default' : t === 2 ? '+40% base cost' : '+80% base cost'}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Flavor selection */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-extrabold tracking-widest text-brand-charcoal block">3. Sponge Cake Flavor</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.values(flavors).map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFlavor(f.id)}
                    className={`p-3 rounded-2xl border flex items-center space-x-3 text-left transition-all cursor-pointer ${
                      flavor === f.id
                        ? 'bg-brand-yellow/20 border-brand-yellow scale-[1.01]'
                        : 'bg-white border-brand-secondary-bg hover:bg-brand-secondary-bg/30'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: f.color }} />
                    <div className="min-w-0">
                      <span className="block text-xs font-bold text-brand-charcoal truncate">{f.name}</span>
                      <span className="block text-[10px] text-brand-gray truncate font-light leading-none mt-0.5">{f.description}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Frosting cream colors */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-extrabold tracking-widest text-brand-charcoal block">4. Outer Whipped Cream Frosting</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {Object.values(frostings).map((fr) => (
                  <button
                    key={fr.id}
                    type="button"
                    onClick={() => setFrosting(fr.id)}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      frosting === fr.id
                        ? 'border-brand-charcoal bg-brand-secondary-bg/40 scale-102 font-bold'
                        : 'bg-white border-brand-secondary-bg hover:bg-brand-secondary-bg/20'
                    }`}
                  >
                    <div className="w-7 h-7 mx-auto rounded-full border border-black/10 shadow-xs mb-1" style={{ backgroundColor: fr.color }} />
                    <span className="block text-[10px] text-brand-charcoal truncate font-semibold leading-none">{fr.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Target Weight Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs uppercase font-extrabold tracking-widest text-brand-charcoal block">5. Target Weight</label>
                <span className="text-xs text-brand-forest bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-bold">
                  ⚖️ {weight} Kilogram (kg)
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.5"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value))}
                className="w-full accent-brand-forest bg-brand-secondary-bg h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-brand-gray font-light">
                <span>0.5 kg (Ideal for 4-6 guests)</span>
                <span>2.0 kg (15-20 guests)</span>
                <span>5.0 kg (Big Banquet Parties)</span>
              </div>
            </div>

            {/* Border piping Style */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-extrabold tracking-widest text-brand-charcoal block">6. Cream Border Piping Style</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'star', name: 'Star-piped Base', emoji: '🌟' },
                  { id: 'ruffle', name: 'Ruffle-piped Ribbon', emoji: '🎀' },
                  { id: 'none', name: 'No Extra Border', emoji: '🧹' },
                ].map((pip) => (
                  <button
                    key={pip.id}
                    type="button"
                    onClick={() => setPipingStyle(pip.id as any)}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      pipingStyle === pip.id
                        ? 'bg-brand-yellow/20 border-brand-yellow font-bold scale-[1.01]'
                        : 'bg-white border-brand-secondary-bg hover:bg-brand-secondary-bg/30'
                    }`}
                  >
                    <span className="block text-sm">{pip.emoji}</span>
                    <span className="block text-[10px] font-bold text-brand-charcoal mt-1 leading-none">{pip.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Add decorative toppings */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-extrabold tracking-widest text-brand-charcoal block">7. Select Premium Toppings (Multi-select)</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availableToppings.map((top) => {
                  const active = toppings.includes(top.id);
                  return (
                    <button
                      key={top.id}
                      type="button"
                      onClick={() => toggleTopping(top.id)}
                      className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        active
                          ? 'bg-brand-terracotta/10 border-brand-terracotta text-brand-charcoal scale-102 font-bold'
                          : 'bg-white border-brand-secondary-bg hover:bg-brand-secondary-bg/30 text-brand-gray'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{top.emoji}</span>
                        <div className="min-w-0">
                          <span className="block text-xs font-bold leading-none">{top.name}</span>
                          <span className="block text-[9px] text-brand-gray/80 mt-1 font-light leading-none">+₹{top.price}</span>
                        </div>
                      </div>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[8px] ${active ? 'bg-brand-terracotta border-brand-terracotta text-white' : 'border-brand-secondary-bg bg-white'}`}>
                        {active ? '✓' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Written custom message text box */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-extrabold tracking-widest text-brand-charcoal block">8. Text Written on Cake Cream Surface</label>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                <div className="sm:col-span-8 relative">
                  <input
                    type="text"
                    maxLength={24}
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="e.g. Happy Birthday Rohit!"
                    className="w-full bg-brand-secondary-bg/30 text-brand-charcoal text-xs sm:text-sm p-3.5 rounded-xl border border-transparent focus:border-brand-terracotta focus:bg-white focus:outline-none transition-all"
                  />
                  {customMessage && (
                    <span className="absolute right-3 top-4 text-[9px] text-brand-gray font-light">
                      {24 - customMessage.length} left
                    </span>
                  )}
                </div>
                {/* Message Color choices */}
                <div className="sm:col-span-4 flex items-center space-x-2">
                  <span className="text-[10px] text-brand-gray font-semibold shrink-0 uppercase">Ink Color:</span>
                  <div className="flex-1 flex justify-between">
                    {[
                      { id: '#ffffff', label: 'White', bg: 'bg-white border border-brand-stone-accent' },
                      { id: '#2B1A11', label: 'Choco', bg: 'bg-[#2B1A11]' },
                      { id: '#d97706', label: 'Gold', bg: 'bg-amber-600' },
                      { id: '#b91c1c', label: 'Red', bg: 'bg-red-700' },
                    ].map((col) => (
                      <button
                        key={col.id}
                        type="button"
                        onClick={() => setMessageColor(col.id)}
                        className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${col.bg} ${messageColor === col.id ? 'ring-2 ring-brand-terracotta scale-110' : 'hover:scale-105'}`}
                        title={col.label}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Booking submission form block */}
            <div className="pt-8 border-t border-brand-secondary-bg/50 space-y-6">
              <div className="space-y-1">
                <h3 className="font-display font-bold text-lg text-brand-charcoal flex items-center space-x-2">
                  <span>🚀</span>
                  <span>Submit Order request to Mahesh ji</span>
                </h3>
                <p className="text-brand-gray text-xs font-light">
                  Complete this form to dispatch specifications instantly to our central Jodhpur kitchen Desk. We will reach back to confirm physical delivery or store pickup.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-8 text-center bg-emerald-50 border border-emerald-100 rounded-3xl space-y-3">
                  <CheckCircle className="text-emerald-500 mx-auto" size={48} />
                  <h4 className="font-display font-bold text-lg text-brand-charcoal">Design Transferred to WhatsApp!</h4>
                  <p className="text-brand-gray text-xs font-light max-w-sm mx-auto">
                    Excellent! Your custom specifications have been compiled. A WhatsApp window was opened with your exact recipe details. Please press send to begin booking verification.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-bold text-brand-terracotta hover:underline mt-2 cursor-pointer"
                  >
                    Modify design / Submit another cake ticket
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCreateWhatsAppOrder} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] uppercase font-bold text-brand-gray">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="e.g. CA Pankaj Lohiya"
                        className="w-full bg-white text-brand-charcoal text-xs sm:text-sm p-3.5 rounded-xl border border-brand-secondary-bg focus:outline-none focus:border-brand-terracotta"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] uppercase font-bold text-brand-gray">WhatsApp Number *</label>
                      <input
                        type="tel"
                        required
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        placeholder="e.g. +91 96360 41190"
                        className="w-full bg-white text-brand-charcoal text-xs sm:text-sm p-3.5 rounded-xl border border-brand-secondary-bg focus:outline-none focus:border-brand-terracotta"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] uppercase font-bold text-brand-gray">Target Date of Delivery *</label>
                      <input
                        type="date"
                        required
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full bg-white text-brand-charcoal text-xs sm:text-sm p-3.5 rounded-xl border border-brand-secondary-bg focus:outline-none focus:border-brand-terracotta"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] uppercase font-bold text-brand-gray font-semibold text-brand-charcoal">Delivery Point (Store pickup or Home address)</label>
                      <input
                        type="text"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="e.g. Store pickup at Sardarpura or home delivery..."
                        className="w-full bg-white text-brand-charcoal text-xs sm:text-sm p-3.5 rounded-xl border border-brand-secondary-bg focus:outline-none focus:border-brand-terracotta"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-yellow hover:bg-brand-yellow/95 hover:scale-[1.01] text-brand-charcoal font-black text-sm p-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Send size={15} />
                    <span>{isSubmitting ? 'Compiling Specs...' : 'Dispatch Custom Specification Desk'}</span>
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* Trust reassurance banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-[#FAF6F0] rounded-[2.5rem] p-10 border border-brand-secondary-bg/80 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="space-y-2">
            <h4 className="font-display font-bold text-lg text-brand-charcoal flex items-center space-x-2">
              <span className="text-brand-terracotta">🧁</span>
              <span>100% Segregated Baking</span>
            </h4>
            <p className="text-brand-gray text-xs font-light leading-relaxed">
              We operate an absolute zero-egg policy. All flour, emulsifiers, creams, and toppings are certified vegetarian (green dot), keeping up with pure Jodhpur heritage standards.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-display font-bold text-lg text-brand-charcoal flex items-center space-x-2">
              <span className="text-brand-terracotta">🍓</span>
              <span>Fresh Fruit Compotes</span>
            </h4>
            <p className="text-brand-gray text-xs font-light leading-relaxed">
              No artificial syrup overlays. Our pineapple, Alphonso mango, and strawberry toppings use real fruits reduced gently in sugar in our central hygiene workspace.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-display font-bold text-lg text-brand-charcoal flex items-center space-x-2">
              <span className="text-brand-terracotta">🎂</span>
              <span>Secure Transportation</span>
            </h4>
            <p className="text-brand-gray text-xs font-light leading-relaxed">
              Custom multi-tier orders are delivered inside custom-designed reinforced wooden support boxes with dry ice pads to ensure zero structural tilt or melting in Jodhpur warmth.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
