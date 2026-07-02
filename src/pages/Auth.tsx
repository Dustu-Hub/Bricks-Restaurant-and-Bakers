import React, { useState } from 'react';
import { Mail, Lock, User, Phone, MapPin, Check, Compass, LogIn, ChevronRight } from 'lucide-react';

interface AuthProps {
  onNavigate: (path: string) => void;
  onLogin: (userData: { name: string; email: string; phone?: string }) => void;
  isSignUpDefault?: boolean;
}

export default function Auth({ onNavigate, onLogin, isSignUpDefault = false }: AuthProps) {
  const [isSignUp, setIsSignUp] = useState(isSignUpDefault);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredLocation, setPreferredLocation] = useState('sardarpura');
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // Simulate successful login/signup and update context
      const finalName = isSignUp ? name : (email.split('@')[0] || 'Dear Guest');
      onLogin({
        name: finalName.charAt(0).toUpperCase() + finalName.slice(1),
        email: email || 'guest@bricksjodhpur.com',
        phone: phone || '+91 96360 41190',
      });
      alert(`🎉 Successfully logged in as ${finalName}! Enjoy customized table booking & rewards.`);
      onNavigate('home');
    }, 1200);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    // Clear inputs
    setEmail('');
    setPassword('');
    setName('');
    setPhone('');
  };

  return (
    <div id="auth-page" className="pt-28 pb-20 relative min-h-[95vh] flex items-center justify-center bg-brand-bg">
      {/* Decorative gradients */}
      <div className="absolute inset-0 z-0 opacity-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-brand-yellow blur-3xl rounded-full" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-terracotta blur-3xl rounded-full" />
      </div>

      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Core Layout Grid: Left illustration panel (desktop only), Right Form card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/70 backdrop-blur-md rounded-[2.5rem] border border-brand-secondary-bg/80 shadow-2xl overflow-hidden max-w-4xl mx-auto">
          
          {/* Left panel (desktop only) - Warm bakery/rooftop illustration details */}
          <div className="hidden lg:flex lg:col-span-5 bg-brand-forest text-brand-bg p-12 self-stretch flex-col justify-between text-left relative overflow-hidden">
            {/* Overlay glow */}
            <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-brand-yellow/10 rounded-full blur-xl" />
            
            <div className="space-y-4 relative z-10">
              <span className="text-brand-yellow text-4xl block">🧁</span>
              <h3 className="font-display font-black text-2xl text-[#FDF9F3] leading-snug">
                Join the Bricks Inner Circle Rewards
              </h3>
              <p className="text-[#E7E2DA]/85 text-xs font-light leading-relaxed">
                Create an account to track your table reservations, claim 10% cashbacks on custom birthday cakes, and gain early access to live music rooftop dinners in Sardarpura!
              </p>
            </div>

            <div className="space-y-4 pt-12 relative z-10">
              <div className="flex items-start space-x-3 text-xs">
                <span className="text-brand-yellow font-bold">✓</span>
                <span>Fast 1-click table bookings</span>
              </div>
              <div className="flex items-start space-x-3 text-xs">
                <span className="text-brand-yellow font-bold">✓</span>
                <span>Exclusive eggless cake order history</span>
              </div>
              <div className="flex items-start space-x-3 text-xs">
                <span className="text-brand-yellow font-bold">✓</span>
                <span>Complimentary dessert voucher on sign-up</span>
              </div>
            </div>

            <p className="text-[10px] text-[#E7E2DA]/50 relative z-10">
              © Bricks Restaurant & Bakers Jodhpur Wide
            </p>
          </div>

          {/* Right panel: Active forms */}
          <div className="lg:col-span-7 p-8 sm:p-12 text-left">
            
            {/* Header info */}
            <div className="space-y-2 mb-8">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-brand-charcoal">
                {isSignUp ? 'Freshly Baked Happiness starts here' : 'Welcome back to Bricks'}
              </h2>
              <p className="text-brand-gray text-xs sm:text-sm font-light">
                {isSignUp ? 'Create your profile to start reserving tables.' : 'Enter details to fetch your reservation ledger.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {isSignUp && (
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Full Name *"
                    className="w-full bg-white text-brand-charcoal text-xs sm:text-sm p-3.5 pl-10 rounded-xl border border-brand-secondary-bg focus:outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta"
                  />
                  <User className="absolute left-3 top-4 text-brand-stone-accent" size={16} />
                </div>
              )}

              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address *"
                  className="w-full bg-white text-brand-charcoal text-xs sm:text-sm p-3.5 pl-10 rounded-xl border border-brand-secondary-bg focus:outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta"
                />
                <Mail className="absolute left-3 top-4 text-brand-stone-accent" size={16} />
              </div>

              {isSignUp && (
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="WhatsApp Mobile Number *"
                    className="w-full bg-white text-brand-charcoal text-xs sm:text-sm p-3.5 pl-10 rounded-xl border border-brand-secondary-bg focus:outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta"
                  />
                  <Phone className="absolute left-3 top-4 text-brand-stone-accent" size={16} />
                </div>
              )}

              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Secret Password *"
                  className="w-full bg-white text-brand-charcoal text-xs sm:text-sm p-3.5 pl-10 rounded-xl border border-brand-secondary-bg focus:outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta"
                />
                <Lock className="absolute left-3 top-4 text-brand-stone-accent" size={16} />
              </div>

              {isSignUp && (
                <div className="space-y-1.5 pt-1">
                  <label htmlFor="prefLocation" className="block text-[10px] uppercase font-semibold text-brand-gray tracking-wider">
                    Preferred Local Branch
                  </label>
                  <select
                    id="prefLocation"
                    value={preferredLocation}
                    onChange={(e) => setPreferredLocation(e.target.value)}
                    className="w-full bg-white text-brand-charcoal text-xs sm:text-sm p-3.5 rounded-xl border border-brand-secondary-bg focus:outline-none focus:border-brand-terracotta"
                  >
                    <option value="sardarpura">Sardarpura Branch (Rooftop & Café)</option>
                    <option value="bhadwasiya">Bhadwasiya Branch (Bakery counter)</option>
                    <option value="paota">Paota Branch (Garden & Lounge)</option>
                  </select>
                </div>
              )}

              {!isSignUp && (
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => alert('Forgot Password simulator triggered. A password reset link was dispatched to your email address!')}
                    className="text-xs text-brand-terracotta hover:underline font-semibold cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {isSignUp && (
                <label className="flex items-start space-x-2 text-[10px] text-brand-gray pt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mt-0.5 rounded border-brand-secondary-bg text-brand-terracotta"
                  />
                  <span>I agree to receive SMS/WhatsApp reservation confirmation alerts and monthly member newsletters.</span>
                </label>
              )}

              {/* Submit CTA button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-yellow hover:bg-brand-yellow/95 hover:scale-[1.02] text-brand-charcoal font-black text-sm p-3.5 rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5 pt-4 cursor-pointer"
              >
                {loading ? (
                  <span className="animate-pulse">Loading Member Desk...</span>
                ) : (
                  <>
                    <LogIn size={16} />
                    <span>{isSignUp ? 'Register & Claim Voucher' : 'Access Reservation Desk'}</span>
                  </>
                )}
              </button>

            </form>

            {/* Form switcher */}
            <div className="mt-8 pt-6 border-t border-brand-secondary-bg/50 text-center text-xs">
              <span className="text-brand-gray font-light">
                {isSignUp ? 'Already a Bricks member?' : 'New to Bricks Restaurant?'}
              </span>{' '}
              <button
                type="button"
                onClick={toggleMode}
                className="text-brand-terracotta font-bold hover:underline ml-1 cursor-pointer"
              >
                {isSignUp ? 'Sign In' : 'Sign Up as a Member'}
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
