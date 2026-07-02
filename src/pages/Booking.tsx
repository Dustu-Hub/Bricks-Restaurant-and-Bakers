import React, { useState, useEffect } from 'react';
import { Calendar, Users, Clock, Compass, HelpCircle, Phone, CheckCircle, Ticket, Printer, Share2, Sparkles } from 'lucide-react';
import { branches } from '../data';
import { BookingData } from '../types';

interface BookingProps {
  selectedBranchId: 'sardarpura' | 'bhadwasiya' | 'paota' | null;
  onSelectBranch: (branchId: 'sardarpura' | 'bhadwasiya' | 'paota' | null) => void;
  user: { name: string; email: string; phone?: string } | null;
}

export default function Booking({ selectedBranchId, onSelectBranch, user }: BookingProps) {
  const [formData, setFormData] = useState<Partial<BookingData>>({
    location: selectedBranchId || 'sardarpura',
    date: '',
    time: '',
    guests: 2,
    seatingPreference: 'rooftop',
    occasion: '',
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  // Sync state if selectedBranchId changes externally
  useEffect(() => {
    if (selectedBranchId) {
      setFormData((prev) => ({ ...prev, location: selectedBranchId }));
    }
  }, [selectedBranchId]);

  const selectedBranchInfo = branches.find(b => b.id === formData.location);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuestsChange = (increment: boolean) => {
    setFormData((prev) => {
      const current = prev.guests || 2;
      const next = increment ? current + 1 : current - 1;
      return { ...prev, guests: Math.max(1, Math.min(20, next)) };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      alert('Please fill out all required booking fields!');
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      setShowConfetti(true);
      // Generate a nice random simulated booking ID
      setBookingId(`BRK-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1500);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setShowConfetti(false);
    setFormData({
      location: selectedBranchId || 'sardarpura',
      date: '',
      time: '',
      guests: 2,
      seatingPreference: 'rooftop',
      occasion: '',
      name: user?.name || '',
      phone: user?.phone || '',
      email: user?.email || '',
    });
  };

  const printVoucher = () => {
    window.print();
  };

  return (
    <div id="booking-page" className="pt-28 pb-20 relative min-h-[95vh] flex items-center justify-center bg-brand-bg">
      {/* Absolute Blurred Background Food Panel */}
      <div className="absolute inset-0 z-0 opacity-15 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200"
          alt="Warm Background lighting"
          className="w-full h-full object-cover blur-md"
        />
      </div>

      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 relative z-10">
        {!isSubmitted ? (
          /* BOOKING FORM VIEW */
          <div className="glass-panel p-8 sm:p-12 rounded-[2.5rem] shadow-2xl border border-white/60 space-y-8 text-left max-w-2xl mx-auto">
            
            {/* Header */}
            <div className="space-y-2 text-center pb-4 border-b border-brand-secondary-bg/50">
              <span className="text-brand-terrawall text-2xl">🌇</span>
              <h1 className="font-display font-black text-3xl text-brand-charcoal tracking-tight">
                Secure Your Premium Table
              </h1>
              <p className="text-brand-gray text-xs sm:text-sm font-light">
                Reserve an eggless baking delight & spectacular seating at Sardarpura, Bhadwasiya, or Paota. No prepayment required!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Branch Selector & Timing Notice */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="location" className="block text-xs font-semibold text-brand-charcoal uppercase tracking-wider">
                    Select Branch *
                  </label>
                  <select
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={(e) => {
                      handleInputChange(e);
                      onSelectBranch(e.target.value as any);
                    }}
                    className="w-full bg-white text-brand-charcoal text-sm p-3.5 rounded-xl border border-brand-secondary-bg focus:outline-none focus:border-brand-terracotta"
                  >
                    <option value="sardarpura">Sardarpura (Rooftop & Café)</option>
                    <option value="bhadwasiya">Bhadwasiya (Bakery & Café)</option>
                    <option value="paota">Paota (Garden & Party Hall)</option>
                  </select>
                </div>

                {/* Display branch number for double-checking */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-brand-gray uppercase tracking-wider">
                    Branch Contact
                  </label>
                  <div className="w-full bg-white/60 border border-brand-secondary-bg/80 p-3.5 rounded-xl text-xs flex items-center space-x-2 text-brand-charcoal font-semibold">
                    <Phone size={14} className="text-brand-forest shrink-0" />
                    <span>{selectedBranchInfo?.phone}</span>
                  </div>
                </div>
              </div>

              {/* Date & Time Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="date" className="block text-xs font-semibold text-brand-charcoal uppercase tracking-wider">
                    Select Date *
                  </label>
                  <div className="relative">
                    <input
                      id="date"
                      type="date"
                      name="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full bg-white text-brand-charcoal text-sm p-3.5 rounded-xl border border-brand-secondary-bg focus:outline-none focus:border-brand-terracotta cursor-pointer"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="time" className="block text-xs font-semibold text-brand-charcoal uppercase tracking-wider">
                    Select Time Slot *
                  </label>
                  <select
                    id="time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full bg-white text-brand-charcoal text-sm p-3.5 rounded-xl border border-brand-secondary-bg focus:outline-none focus:border-brand-terracotta cursor-pointer"
                  >
                    <option value="">-- Choose Time --</option>
                    <option value="11:30 AM">11:30 AM (Lunch slot)</option>
                    <option value="12:30 PM">12:30 PM (Lunch slot)</option>
                    <option value="01:30 PM">01:30 PM (Lunch slot)</option>
                    <option value="03:00 PM">03:00 PM (High-Tea slot)</option>
                    <option value="05:00 PM">05:00 PM (Sunset slot)</option>
                    <option value="07:00 PM">07:00 PM (Dinner slot)</option>
                    <option value="08:00 PM">08:00 PM (Dinner slot)</option>
                    <option value="09:00 PM">09:00 PM (Late Dinner slot)</option>
                    <option value="10:00 PM">10:00 PM (Late Dinner slot)</option>
                  </select>
                </div>
              </div>

              {/* Guests Count & Seating Preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-brand-charcoal uppercase tracking-wider">
                    Number of Guests *
                  </label>
                  <div className="flex items-center space-x-2 w-full bg-white border border-brand-secondary-bg p-1.5 rounded-xl">
                    <button
                      type="button"
                      onClick={() => handleGuestsChange(false)}
                      className="w-10 h-10 bg-brand-secondary-bg/40 text-brand-charcoal hover:bg-brand-secondary-bg font-bold rounded-lg cursor-pointer"
                    >
                      -
                    </button>
                    <div className="flex-1 text-center font-bold text-sm text-brand-charcoal">
                      {formData.guests} {formData.guests === 1 ? 'Guest' : 'Guests'}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleGuestsChange(true)}
                      className="w-10 h-10 bg-brand-secondary-bg/40 text-brand-charcoal hover:bg-brand-secondary-bg font-bold rounded-lg cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="seatingPreference" className="block text-xs font-semibold text-brand-charcoal uppercase tracking-wider">
                    Seating Preference *
                  </label>
                  <select
                    id="seatingPreference"
                    name="seatingPreference"
                    required
                    value={formData.seatingPreference}
                    onChange={handleInputChange}
                    className="w-full bg-white text-brand-charcoal text-sm p-3.5 rounded-xl border border-brand-secondary-bg focus:outline-none focus:border-brand-terracotta"
                  >
                    <option value="rooftop">🌌 Rooftop (Sardarpura only)</option>
                    <option value="open-air">🌲 Open-Air Garden (Paota only)</option>
                    <option value="indoor">❄️ Cozy Indoor AC</option>
                    <option value="party-hall">🎉 Party Hall / Event Zone</option>
                  </select>
                </div>
              </div>

              {/* Occasion Dropdown */}
              <div className="space-y-1.5">
                <label htmlFor="occasion" className="block text-xs font-semibold text-brand-charcoal uppercase tracking-wider">
                  Special Occasion (Optional)
                </label>
                <select
                  id="occasion"
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleInputChange}
                  className="w-full bg-white text-brand-charcoal text-sm p-3.5 rounded-xl border border-brand-secondary-bg focus:outline-none focus:border-brand-terracotta"
                >
                  <option value="">No Special Occasion</option>
                  <option value="Birthday">🎂 Birthday Celebration</option>
                  <option value="Anniversary">💍 Wedding Anniversary</option>
                  <option value="Business Meet">💼 Business Luncheon</option>
                  <option value="Family Reunion">🏡 Family Gathering / Reunion</option>
                </select>
              </div>

              {/* Guest personal Details */}
              <div className="space-y-4 pt-4 border-t border-brand-secondary-bg/50">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-terracotta font-sans">Your Contact Details</h3>
                
                <div className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-white text-brand-charcoal text-sm p-3.5 rounded-xl border border-brand-secondary-bg focus:outline-none focus:border-brand-terracotta"
                  />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="WhatsApp Mobile Number *"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-white text-brand-charcoal text-sm p-3.5 rounded-xl border border-brand-secondary-bg focus:outline-none focus:border-brand-terracotta"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address (Optional)"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white text-brand-charcoal text-sm p-3.5 rounded-xl border border-brand-secondary-bg focus:outline-none focus:border-brand-terracotta"
                    />
                  </div>
                </div>
              </div>

              {/* Confirmation terms and CTA */}
              <div className="pt-4">
                <p className="text-[10px] text-brand-gray leading-relaxed mb-4">
                  By clicking Confirm, you agree to receive a quick verification call/SMS on your mobile number. Please arrive 10 minutes prior to your reserved slot. Tables will be held for a maximum of 15 minutes.
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-yellow hover:bg-brand-yellow/95 hover:scale-[1.02] active:scale-[0.98] text-brand-charcoal font-black text-sm p-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  {loading ? (
                    <span className="animate-pulse">Reserving your table...</span>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      <span>Confirm Table Reservation</span>
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>
        ) : (
          /* CONFIRMATION TICKET VOUCHER VIEW */
          <div id="booking-confirmation-voucher" className="glass-panel p-8 sm:p-12 rounded-[2.5rem] shadow-2xl border border-emerald-300/40 bg-white/95 max-w-xl mx-auto space-y-8 animate-fade-in text-center">
            
            {/* Visual Confetti Blast & Check icon */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl animate-bounce">
                🎉
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-brand-forest">
                Reservation Confirmed!
              </h2>
              <span className="text-xs text-brand-gray font-light">
                Your table has been blocked successfully in our Jodhpur ledger.
              </span>
            </div>

            {/* Simulated Printed Voucher ticket */}
            <div className="p-6 bg-[#FDF9F3] border-2 border-dashed border-brand-stone-accent/50 rounded-2xl text-left space-y-4 shadow-inner relative overflow-hidden">
              {/* Overlay watermarks */}
              <div className="absolute -bottom-4 -right-4 text-brand-stone-accent/10 font-display font-black text-6xl rotate-12 select-none pointer-events-none">
                BRICKS
              </div>

              {/* Receipt metadata */}
              <div className="flex items-center justify-between border-b border-brand-secondary-bg pb-3">
                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gray">Reservation ID</span>
                <span className="font-mono font-bold text-sm text-brand-terracotta bg-white px-2 py-1 rounded border border-brand-secondary-bg">
                  {bookingId}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-brand-gray block text-[10px] uppercase font-medium">Guest Name</span>
                  <span className="font-bold text-brand-charcoal">{formData.name}</span>
                </div>
                <div>
                  <span className="text-brand-gray block text-[10px] uppercase font-medium">WhatsApp Mobile</span>
                  <span className="font-bold text-brand-charcoal">{formData.phone}</span>
                </div>
                <div>
                  <span className="text-brand-gray block text-[10px] uppercase font-medium">Reserved Branch</span>
                  <span className="font-bold text-brand-forest uppercase">{formData.location}</span>
                </div>
                <div>
                  <span className="text-brand-gray block text-[10px] uppercase font-medium">Table Arrangement</span>
                  <span className="font-bold text-brand-charcoal uppercase">{formData.seatingPreference}</span>
                </div>
                <div>
                  <span className="text-brand-gray block text-[10px] uppercase font-medium">Date & Time</span>
                  <span className="font-bold text-brand-charcoal">{formData.date} at {formData.time}</span>
                </div>
                <div>
                  <span className="text-brand-gray block text-[10px] uppercase font-medium">Group Size</span>
                  <span className="font-bold text-brand-charcoal">{formData.guests} {formData.guests === 1 ? 'Person' : 'People'}</span>
                </div>
              </div>

              {formData.occasion && (
                <div className="pt-3 border-t border-brand-secondary-bg text-xs">
                  <span className="text-brand-gray text-[10px] uppercase block">Special Arrangement for</span>
                  <span className="font-semibold text-brand-charcoal">✨ {formData.occasion}</span>
                </div>
              )}
            </div>

            {/* Quick Helper info */}
            <p className="text-xs text-brand-gray font-light max-w-sm mx-auto leading-relaxed">
              We’ve sent a confirmation voucher to <span className="font-semibold text-brand-charcoal">{formData.phone}</span>. Mahesh ji or our restaurant desk will call you 30 minutes before to guide you with the table directions.
            </p>

            {/* Voucher Actions buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={printVoucher}
                className="bg-brand-secondary-bg/50 hover:bg-brand-secondary-bg text-brand-charcoal text-xs font-bold py-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Printer size={14} />
                <span>Print Voucher</span>
              </button>
              <button
                onClick={handleReset}
                className="bg-brand-yellow hover:bg-brand-yellow/95 text-brand-charcoal text-xs font-bold py-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Ticket size={14} />
                <span>Book Another</span>
              </button>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
