import React, { useState } from 'react';
import { Mail, Lock, User, Phone, LogIn, Key, ShieldCheck, Eye, EyeOff, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { RegisteredUser, TableReservation } from '../types';

interface AuthProps {
  onNavigate: (path: string) => void;
  onLogin: (userData: { name: string; email: string; phone?: string }) => void;
  isSignUpDefault?: boolean;
}

// Master passkey provided by shop owner
const OWNER_UNIQUE_PASSKEY = 'Shibam269';

export default function Auth({ onNavigate, onLogin, isSignUpDefault = false }: AuthProps) {
  const [isSignUp, setIsSignUp] = useState(isSignUpDefault);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Personal password
  const [confirmPassword, setConfirmPassword] = useState('');
  const [ownerPasskey, setOwnerPasskey] = useState(''); // Owner's unique password
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredLocation, setPreferredLocation] = useState<'sardarpura' | 'bhadwasiya' | 'paota'>('sardarpura');
  const [acceptTerms, setAcceptTerms] = useState(true);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showOwnerPasskey, setShowOwnerPasskey] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getRegisteredUsers = (): RegisteredUser[] => {
    try {
      const stored = localStorage.getItem('bricks_registered_users');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const seedSampleBookingsForUser = (userEmail: string, userName: string, userPhone: string) => {
    try {
      const storedBookings = localStorage.getItem('bricks_table_bookings');
      const bookings: TableReservation[] = storedBookings ? JSON.parse(storedBookings) : [];
      
      const userBookings = bookings.filter(b => b.userEmail === userEmail);
      if (userBookings.length === 0) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const sample1: TableReservation = {
          id: `BRK-${Math.floor(100000 + Math.random() * 900000)}`,
          location: 'sardarpura',
          date: today.toISOString().split('T')[0],
          time: '08:00 PM',
          guests: 4,
          seatingPreference: 'rooftop',
          occasion: 'Dinner with Family',
          name: userName,
          phone: userPhone,
          email: userEmail,
          userEmail: userEmail,
          status: 'confirmed',
          createdAt: new Date().toISOString(),
          originalTime: '08:00 PM'
        };

        const sample2: TableReservation = {
          id: `BRK-${Math.floor(100000 + Math.random() * 900000)}`,
          location: 'paota',
          date: tomorrow.toISOString().split('T')[0],
          time: '01:30 PM',
          guests: 2,
          seatingPreference: 'open-air',
          occasion: 'Casual Luncheon',
          name: userName,
          phone: userPhone,
          email: userEmail,
          userEmail: userEmail,
          status: 'confirmed',
          createdAt: new Date().toISOString(),
          originalTime: '01:30 PM'
        };

        localStorage.setItem('bricks_table_bookings', JSON.stringify([sample1, sample2, ...bookings]));
      }
    } catch (err) {
      console.error('Failed to seed sample bookings', err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (isSignUp) {
      // 1. Validate Owner's Unique Password (Shibam269)
      if (ownerPasskey.trim() !== OWNER_UNIQUE_PASSKEY) {
        setErrorMessage(`Invalid Owner's Unique Password! Please provide the authorized code given by the shop owner (${OWNER_UNIQUE_PASSKEY}) to create a new member account.`);
        return;
      }

      // 2. Validate Personal Password
      if (!password || password.length < 4) {
        setErrorMessage('Please create a personal password of at least 4 characters for future sign-ins.');
        return;
      }

      if (password !== confirmPassword) {
        setErrorMessage('Your personal passwords do not match. Please re-enter.');
        return;
      }

      // 3. Check if email already registered
      const users = getRegisteredUsers();
      const existing = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
      if (existing) {
        setErrorMessage('This email is already registered. Please switch to "Sign In" using your personal password.');
        return;
      }

      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        const newUser: RegisteredUser = {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          password: password,
          preferredLocation,
          createdAt: new Date().toISOString(),
        };

        const updatedUsers = [...users, newUser];
        localStorage.setItem('bricks_registered_users', JSON.stringify(updatedUsers));

        // Seed initial reservations so user can immediately view and delay tables
        seedSampleBookingsForUser(newUser.email, newUser.name, newUser.phone);

        setSuccessMessage(`🎉 Welcome to Bricks Inner Circle, ${newUser.name}! Account authorized with shop owner's key.`);
        
        onLogin({
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
        });

        // Navigate directly to booking ledger where they can see their recent tables and delay them
        setTimeout(() => {
          onNavigate('booking');
        }, 1200);
      }, 1000);

    } else {
      // SIGN IN FLOW
      if (!email || !password) {
        setErrorMessage('Please enter both your email address and personal password.');
        return;
      }

      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        const users = getRegisteredUsers();
        const found = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());

        if (found) {
          if (found.password !== password) {
            setErrorMessage('Incorrect personal password. Please try again or create a new account.');
            return;
          }

          seedSampleBookingsForUser(found.email, found.name, found.phone);

          setSuccessMessage(`Welcome back, ${found.name}! Accessing your reservation ledger...`);
          onLogin({
            name: found.name,
            email: found.email,
            phone: found.phone,
          });

          setTimeout(() => {
            onNavigate('booking');
          }, 800);
        } else {
          // If not in registered users list yet, allow signing in as a guest or prompt for signup
          const fallbackName = email.split('@')[0] || 'Guest';
          const capitalizedName = fallbackName.charAt(0).toUpperCase() + fallbackName.slice(1);
          
          seedSampleBookingsForUser(email.trim().toLowerCase(), capitalizedName, '+91 96360 41190');

          setSuccessMessage(`Welcome back, ${capitalizedName}! Loading your recent bookings...`);
          onLogin({
            name: capitalizedName,
            email: email.trim().toLowerCase(),
            phone: '+91 96360 41190',
          });

          setTimeout(() => {
            onNavigate('booking');
          }, 800);
        }
      }, 900);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setErrorMessage(null);
    setSuccessMessage(null);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setOwnerPasskey('');
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
        
        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/80 backdrop-blur-md rounded-[2.5rem] border border-brand-secondary-bg/80 shadow-2xl overflow-hidden max-w-4xl mx-auto">
          
          {/* Left panel (desktop only) */}
          <div className="hidden lg:flex lg:col-span-5 bg-brand-forest text-brand-bg p-12 self-stretch flex-col justify-between text-left relative overflow-hidden">
            <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-brand-yellow/10 rounded-full blur-xl" />
            
            <div className="space-y-4 relative z-10">
              <span className="text-brand-yellow text-4xl block">🧁</span>
              <h3 className="font-display font-black text-2xl text-[#FDF9F3] leading-snug">
                Join the Bricks Inner Circle
              </h3>
              <p className="text-[#E7E2DA]/85 text-xs font-light leading-relaxed">
                Create an authorized member account to view all recent table reservations, confirm completed bookings, and unlock exclusive bakery perks in Jodhpur!
              </p>
            </div>

            <div className="space-y-3.5 pt-8 relative z-10">
              <div className="flex items-start space-x-3 text-xs">
                <span className="text-brand-yellow font-bold">✓</span>
                <span>Owner-verified member access</span>
              </div>
              <div className="flex items-start space-x-3 text-xs">
                <span className="text-brand-yellow font-bold">✓</span>
                <span>View all recently booked tables in one ledger</span>
              </div>
              <div className="flex items-start space-x-3 text-xs">
                <span className="text-brand-yellow font-bold">✓</span>
                <span>1-Click "Confirm Completed" to remove finished tables</span>
              </div>
              <div className="flex items-start space-x-3 text-xs">
                <span className="text-brand-yellow font-bold">✓</span>
                <span>Direct rooftop table reservations at Sardarpura</span>
              </div>
            </div>

            <div className="pt-6 border-t border-white/15 relative z-10">
              <p className="text-[10px] text-[#E7E2DA]/60">
                Authorized Shop Passkey required for new sign-ups.
              </p>
            </div>
          </div>

          {/* Right panel: Active forms */}
          <div className="lg:col-span-7 p-8 sm:p-10 text-left">
            
            {/* Header info */}
            <div className="space-y-1.5 mb-6">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-terracotta bg-brand-terracotta/10 px-2.5 py-0.5 rounded-full">
                  {isSignUp ? 'New Member Registration' : 'Member Sign In'}
                </span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-brand-charcoal">
                {isSignUp ? 'Create Authorized Account' : 'Welcome back to Bricks'}
              </h2>
              <p className="text-brand-gray text-xs sm:text-sm font-light">
                {isSignUp
                  ? 'Enter the owner passkey, then set your personal password for future logins.'
                  : 'Enter your email & personal password to manage your table reservations.'}
              </p>
            </div>

            {/* Error Message banner */}
            {errorMessage && (
              <div className="mb-4 p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-start space-x-2 animate-fade-in">
                <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-600" />
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}

            {/* Success Message banner */}
            {successMessage && (
              <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-start space-x-2 animate-fade-in">
                <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-emerald-600" />
                <span className="leading-snug">{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {/* Sign Up: Owner's Unique Password Section */}
              {isSignUp && (
                <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-amber-900 flex items-center space-x-1.5 uppercase tracking-wider">
                      <Key size={14} className="text-brand-terracotta" />
                      <span>Shop Owner's Unique Password *</span>
                    </label>
                    <span className="text-[10px] bg-amber-200/80 text-amber-900 font-semibold px-2 py-0.5 rounded-full">
                      Required
                    </span>
                  </div>
                  
                  <div className="relative">
                    <input
                      type={showOwnerPasskey ? 'text' : 'password'}
                      required
                      value={ownerPasskey}
                      onChange={(e) => {
                        setOwnerPasskey(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      placeholder="Enter owner password (Shibam269)"
                      className="w-full bg-white text-brand-charcoal text-xs sm:text-sm p-3 pl-9 pr-10 rounded-xl border border-amber-300 focus:outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta font-mono"
                    />
                    <ShieldCheck className="absolute left-3 top-3 text-amber-600" size={16} />
                    <button
                      type="button"
                      onClick={() => setShowOwnerPasskey(!showOwnerPasskey)}
                      className="absolute right-3 top-3 text-brand-gray hover:text-brand-charcoal"
                      title={showOwnerPasskey ? 'Hide passkey' : 'Show passkey'}
                    >
                      {showOwnerPasskey ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  
                  <p className="text-[11px] text-amber-800/90 leading-tight">
                    💡 <strong>Owner Authorization:</strong> As a new member, you must enter the unique password created by the shop owner (<code className="bg-white/80 px-1.5 py-0.5 rounded text-amber-900 font-bold border border-amber-200">Shibam269</code>) to create an account.
                  </p>
                </div>
              )}

              {/* Full Name (Sign Up only) */}
              {isSignUp && (
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Full Name *"
                    className="w-full bg-white text-brand-charcoal text-xs sm:text-sm p-3 pl-9 rounded-xl border border-brand-secondary-bg focus:outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta"
                  />
                  <User className="absolute left-3 top-3.5 text-brand-stone-accent" size={16} />
                </div>
              )}

              {/* Email Address */}
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address *"
                  className="w-full bg-white text-brand-charcoal text-xs sm:text-sm p-3 pl-9 rounded-xl border border-brand-secondary-bg focus:outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta"
                />
                <Mail className="absolute left-3 top-3.5 text-brand-stone-accent" size={16} />
              </div>

              {/* WhatsApp Phone (Sign Up only) */}
              {isSignUp && (
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="WhatsApp Mobile Number *"
                    className="w-full bg-white text-brand-charcoal text-xs sm:text-sm p-3 pl-9 rounded-xl border border-brand-secondary-bg focus:outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta"
                  />
                  <Phone className="absolute left-3 top-3.5 text-brand-stone-accent" size={16} />
                </div>
              )}

              {/* Personal Password */}
              <div className="space-y-1">
                {isSignUp && (
                  <label className="block text-[11px] font-bold text-brand-charcoal uppercase tracking-wider">
                    Create Your Personal Password *
                  </label>
                )}
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={isSignUp ? "Create personal password for future logins *" : "Enter your personal password *"}
                    className="w-full bg-white text-brand-charcoal text-xs sm:text-sm p-3 pl-9 pr-10 rounded-xl border border-brand-secondary-bg focus:outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta"
                  />
                  <Lock className="absolute left-3 top-3.5 text-brand-stone-accent" size={16} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-brand-gray hover:text-brand-charcoal"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {isSignUp && (
                  <p className="text-[10px] text-brand-gray">
                    You will use this password to repeatedly sign in and access your bookings.
                  </p>
                )}
              </div>

              {/* Confirm Personal Password (Sign Up only) */}
              {isSignUp && (
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Personal Password *"
                    className="w-full bg-white text-brand-charcoal text-xs sm:text-sm p-3 pl-9 rounded-xl border border-brand-secondary-bg focus:outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta"
                  />
                  <Lock className="absolute left-3 top-3.5 text-brand-stone-accent" size={16} />
                </div>
              )}

              {/* Preferred Branch (Sign Up only) */}
              {isSignUp && (
                <div className="space-y-1 pt-1">
                  <label htmlFor="prefLocation" className="block text-[10px] uppercase font-semibold text-brand-gray tracking-wider">
                    Preferred Jodhpur Branch
                  </label>
                  <select
                    id="prefLocation"
                    value={preferredLocation}
                    onChange={(e) => setPreferredLocation(e.target.value as any)}
                    className="w-full bg-white text-brand-charcoal text-xs sm:text-sm p-3 rounded-xl border border-brand-secondary-bg focus:outline-none focus:border-brand-terracotta"
                  >
                    <option value="sardarpura">Sardarpura Branch (Rooftop & Café)</option>
                    <option value="bhadwasiya">Bhadwasiya Branch (Bakery counter)</option>
                    <option value="paota">Paota Branch (Garden & Lounge)</option>
                  </select>
                </div>
              )}

              {/* Terms Checkbox */}
              {isSignUp && (
                <label className="flex items-start space-x-2 text-[10px] text-brand-gray pt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mt-0.5 rounded border-brand-secondary-bg text-brand-terracotta"
                  />
                  <span>I agree to receive table booking confirmation alerts and member notifications on WhatsApp.</span>
                </label>
              )}

              {/* Submit CTA button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-yellow hover:bg-brand-yellow/95 hover:scale-[1.01] active:scale-[0.99] text-brand-charcoal font-black text-sm p-3.5 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 mt-2 cursor-pointer"
              >
                {loading ? (
                  <span className="animate-pulse">Authorizing Account...</span>
                ) : (
                  <>
                    {isSignUp ? <Sparkles size={16} /> : <LogIn size={16} />}
                    <span>{isSignUp ? 'Create Member Account & View Bookings' : 'Sign In & Manage Bookings'}</span>
                  </>
                )}
              </button>

            </form>

            {/* Form switcher */}
            <div className="mt-6 pt-5 border-t border-brand-secondary-bg/50 text-center text-xs">
              <span className="text-brand-gray font-light">
                {isSignUp ? 'Already have an authorized member account?' : 'Need to create a new member account?'}
              </span>{' '}
              <button
                type="button"
                onClick={toggleMode}
                className="text-brand-terracotta font-bold hover:underline ml-1 cursor-pointer"
              >
                {isSignUp ? 'Sign In with Personal Password' : 'Sign Up with Owner Passkey'}
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

