import React, { useState, useEffect } from 'react';
import { 
  Calendar, Users, Clock, Phone, CheckCircle, Ticket, 
  Printer, Sparkles, Check, ShieldCheck, 
  X, ChevronRight, CalendarCheck, UtensilsCrossed,
  CheckCircle2, History, Trash2, ArrowRight, RotateCcw
} from 'lucide-react';
import { branches } from '../data';
import { BookingData, TableReservation } from '../types';

interface BookingProps {
  selectedBranchId: 'sardarpura' | 'bhadwasiya' | 'paota' | null;
  onSelectBranch: (branchId: 'sardarpura' | 'bhadwasiya' | 'paota' | null) => void;
  user: { name: string; email: string; phone?: string } | null;
}

export default function Booking({ selectedBranchId, onSelectBranch, user }: BookingProps) {
  // Navigation tabs: 'reserve' | 'recent'
  const [activeTab, setActiveTab] = useState<'reserve' | 'recent'>('reserve');
  
  // Filter within recent bookings: 'active' | 'completed' | 'all'
  const [recentFilter, setRecentFilter] = useState<'active' | 'completed' | 'all'>('active');

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
  const [currentBooking, setCurrentBooking] = useState<TableReservation | null>(null);
  
  // Bookings list & notifications
  const [recentBookings, setRecentBookings] = useState<TableReservation[]>([]);
  const [actionAlert, setActionAlert] = useState<{ 
    message: string; 
    type: 'success' | 'info'; 
    undoBookingId?: string;
  } | null>(null);

  // Load bookings from localStorage
  const loadBookings = () => {
    try {
      const stored = localStorage.getItem('bricks_table_bookings');
      let parsed: TableReservation[] = stored ? JSON.parse(stored) : [];

      // If user is logged in and has zero bookings, seed sample active bookings
      if (user && parsed.length === 0) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const sampleBookings: TableReservation[] = [
          {
            id: `BRK-842910`,
            location: 'sardarpura',
            date: today.toISOString().split('T')[0],
            time: '08:00 PM',
            guests: 4,
            seatingPreference: 'rooftop',
            occasion: 'Dinner with Family',
            name: user.name,
            phone: user.phone || '+91 96360 41190',
            email: user.email,
            userEmail: user.email,
            status: 'confirmed',
            createdAt: new Date().toISOString(),
            originalTime: '08:00 PM',
          },
          {
            id: `BRK-519284`,
            location: 'paota',
            date: tomorrow.toISOString().split('T')[0],
            time: '01:30 PM',
            guests: 2,
            seatingPreference: 'open-air',
            occasion: 'Casual Luncheon',
            name: user.name,
            phone: user.phone || '+91 96360 41190',
            email: user.email,
            userEmail: user.email,
            status: 'confirmed',
            createdAt: new Date().toISOString(),
            originalTime: '01:30 PM',
          },
        ];
        parsed = sampleBookings;
        localStorage.setItem('bricks_table_bookings', JSON.stringify(parsed));
      }

      // Filter for this user if logged in, or show all saved
      const filtered = user
        ? parsed.filter(b => !b.userEmail || b.userEmail.toLowerCase() === user.email.toLowerCase())
        : parsed;

      setRecentBookings(filtered.length > 0 ? filtered : parsed);
    } catch (err) {
      console.error('Error loading bookings', err);
    }
  };

  useEffect(() => {
    loadBookings();
    if (user) {
      setActiveTab('recent');
    }
  }, [user]);

  // Sync state if selectedBranchId changes externally
  useEffect(() => {
    if (selectedBranchId) {
      setFormData((prev) => ({ ...prev, location: selectedBranchId }));
    }
  }, [selectedBranchId]);

  // Sync user info if user logs in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
      }));
    }
  }, [user]);

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
      const newBookingId = `BRK-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const newReservation: TableReservation = {
        id: newBookingId,
        location: (formData.location as any) || 'sardarpura',
        date: formData.date || '',
        time: formData.time || '',
        guests: formData.guests || 2,
        seatingPreference: (formData.seatingPreference as any) || 'rooftop',
        occasion: formData.occasion || '',
        name: formData.name || '',
        phone: formData.phone || '',
        email: formData.email || '',
        userEmail: user?.email,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        originalTime: formData.time || '',
      };

      setCurrentBooking(newReservation);
      setIsSubmitted(true);

      // Save to localStorage
      try {
        const stored = localStorage.getItem('bricks_table_bookings');
        const existing: TableReservation[] = stored ? JSON.parse(stored) : [];
        const updated = [newReservation, ...existing];
        localStorage.setItem('bricks_table_bookings', JSON.stringify(updated));
        
        const filtered = user
          ? updated.filter(b => !b.userEmail || b.userEmail.toLowerCase() === user.email.toLowerCase())
          : updated;
        setRecentBookings(filtered.length > 0 ? filtered : updated);
      } catch (err) {
        console.error('Error saving reservation', err);
      }

    }, 1200);
  };

  // Confirm Table Booking as Completed -> Table is removed from active list!
  const handleCompleteBooking = (bookingId: string) => {
    try {
      const stored = localStorage.getItem('bricks_table_bookings');
      const list: TableReservation[] = stored ? JSON.parse(stored) : recentBookings;

      const updated = list.map(b => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          status: 'completed' as const,
          completedAt: new Date().toISOString(),
        };
      });

      localStorage.setItem('bricks_table_bookings', JSON.stringify(updated));

      const filtered = user
        ? updated.filter(b => !b.userEmail || b.userEmail.toLowerCase() === user.email.toLowerCase())
        : updated;
      setRecentBookings(filtered.length > 0 ? filtered : updated);

      setActionAlert({
        message: `✅ Table booking #${bookingId} confirmed as Completed! The table has been marked finished and cleared from your active reservations list.`,
        type: 'success',
        undoBookingId: bookingId,
      });

      setTimeout(() => {
        setActionAlert(null);
      }, 7000);
    } catch (err) {
      console.error('Error completing booking', err);
    }
  };

  // Restore/Undo completed booking if user clicked accidentally
  const handleUndoComplete = (bookingId: string) => {
    try {
      const stored = localStorage.getItem('bricks_table_bookings');
      const list: TableReservation[] = stored ? JSON.parse(stored) : recentBookings;

      const updated = list.map(b => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          status: 'confirmed' as const,
          completedAt: undefined,
        };
      });

      localStorage.setItem('bricks_table_bookings', JSON.stringify(updated));

      const filtered = user
        ? updated.filter(b => !b.userEmail || b.userEmail.toLowerCase() === user.email.toLowerCase())
        : updated;
      setRecentBookings(filtered.length > 0 ? filtered : updated);

      setActionAlert({
        message: `Restored reservation #${bookingId} back to active tables.`,
        type: 'info',
      });

      setTimeout(() => setActionAlert(null), 4000);
    } catch (err) {
      console.error('Error restoring booking', err);
    }
  };

  // Complete All Active Tables in one click
  const handleCompleteAllActiveBookings = () => {
    if (!window.confirm('Are you sure you want to mark all active table bookings as Completed? They will be removed from your active reservations desk.')) {
      return;
    }

    try {
      const stored = localStorage.getItem('bricks_table_bookings');
      const list: TableReservation[] = stored ? JSON.parse(stored) : recentBookings;

      const updated = list.map(b => {
        if (b.status !== 'confirmed') return b;
        return {
          ...b,
          status: 'completed' as const,
          completedAt: new Date().toISOString(),
        };
      });

      localStorage.setItem('bricks_table_bookings', JSON.stringify(updated));

      const filtered = user
        ? updated.filter(b => !b.userEmail || b.userEmail.toLowerCase() === user.email.toLowerCase())
        : updated;
      setRecentBookings(filtered.length > 0 ? filtered : updated);

      setActionAlert({
        message: `🎉 All active tables have been confirmed as Completed and cleared from the active ledger!`,
        type: 'success',
      });

      setTimeout(() => setActionAlert(null), 5000);
    } catch (err) {
      console.error('Error completing all bookings', err);
    }
  };

  // Cancel reservation
  const handleCancelBooking = (bookingId: string) => {
    if (!window.confirm(`Are you sure you want to cancel reservation #${bookingId}?`)) return;

    try {
      const stored = localStorage.getItem('bricks_table_bookings');
      const list: TableReservation[] = stored ? JSON.parse(stored) : recentBookings;

      const updated = list.map(b => {
        if (b.id !== bookingId) return b;
        return { ...b, status: 'cancelled' as const };
      });

      localStorage.setItem('bricks_table_bookings', JSON.stringify(updated));

      const filtered = user
        ? updated.filter(b => !b.userEmail || b.userEmail.toLowerCase() === user.email.toLowerCase())
        : updated;
      setRecentBookings(filtered.length > 0 ? filtered : updated);

      setActionAlert({
        message: `Reservation #${bookingId} has been cancelled and the table released.`,
        type: 'info',
      });
      setTimeout(() => setActionAlert(null), 4000);
    } catch (err) {
      console.error('Error cancelling booking', err);
    }
  };

  // Permanently purge a completed/cancelled booking from records
  const handleRemoveBooking = (bookingId: string) => {
    if (!window.confirm(`Permanently remove reservation #${bookingId} from your records?`)) return;

    try {
      const stored = localStorage.getItem('bricks_table_bookings');
      const list: TableReservation[] = stored ? JSON.parse(stored) : recentBookings;

      const updated = list.filter(b => b.id !== bookingId);

      localStorage.setItem('bricks_table_bookings', JSON.stringify(updated));

      const filtered = user
        ? updated.filter(b => !b.userEmail || b.userEmail.toLowerCase() === user.email.toLowerCase())
        : updated;
      setRecentBookings(filtered);

      setActionAlert({
        message: `Reservation #${bookingId} permanently removed.`,
        type: 'info',
      });
      setTimeout(() => setActionAlert(null), 3000);
    } catch (err) {
      console.error('Error removing booking', err);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCurrentBooking(null);
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

  // Filtered lists
  const activeReservations = recentBookings.filter(b => b.status === 'confirmed');
  const completedReservations = recentBookings.filter(b => b.status === 'completed');
  const cancelledReservations = recentBookings.filter(b => b.status === 'cancelled');

  const displayedBookings = recentFilter === 'active' 
    ? activeReservations 
    : recentFilter === 'completed' 
    ? completedReservations 
    : recentBookings;

  return (
    <div id="booking-page" className="pt-28 pb-20 relative min-h-[95vh] bg-brand-bg">
      {/* Blurred Background Food Panel */}
      <div className="absolute inset-0 z-0 opacity-15 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200"
          alt="Warm Background lighting"
          className="w-full h-full object-cover blur-md"
        />
      </div>

      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Navigation Tabs Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-brand-secondary-bg/80 shadow-sm max-w-2xl mx-auto">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={() => {
                setActiveTab('reserve');
                setIsSubmitted(false);
              }}
              className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'reserve'
                  ? 'bg-brand-yellow text-brand-charcoal shadow-sm'
                  : 'text-brand-gray hover:text-brand-charcoal hover:bg-brand-secondary-bg/40'
              }`}
            >
              <CalendarCheck size={16} />
              <span>Book a Table</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('recent');
                setIsSubmitted(false);
              }}
              className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer relative ${
                activeTab === 'recent'
                  ? 'bg-brand-yellow text-brand-charcoal shadow-sm'
                  : 'text-brand-gray hover:text-brand-charcoal hover:bg-brand-secondary-bg/40'
              }`}
            >
              <Clock size={16} />
              <span>Recent Bookings</span>
              {activeReservations.length > 0 && (
                <span className="bg-emerald-600 text-white text-[10px] font-mono px-2 py-0.5 rounded-full ml-1 font-bold">
                  {activeReservations.length}
                </span>
              )}
            </button>
          </div>

          {/* User Status chip */}
          <div className="text-xs text-brand-gray flex items-center space-x-2 self-center sm:self-auto">
            {user ? (
              <div className="flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full font-medium">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>Member: <strong>{user.name}</strong></span>
              </div>
            ) : (
              <a
                href="#/signin"
                className="text-brand-terracotta font-semibold hover:underline flex items-center space-x-1"
              >
                <span>Sign in to manage bookings</span>
                <ChevronRight size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Global Action Banner if triggered */}
        {actionAlert && (
          <div className={`max-w-2xl mx-auto mb-6 p-4 rounded-2xl text-xs sm:text-sm font-medium flex items-center justify-between shadow-md border animate-fade-in ${
            actionAlert.type === 'success' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            <div className="flex items-center space-x-3">
              <CheckCircle size={18} className="shrink-0 text-emerald-600" />
              <span className="leading-relaxed">{actionAlert.message}</span>
            </div>
            
            <div className="flex items-center space-x-2 shrink-0 ml-3">
              {actionAlert.undoBookingId && (
                <button
                  onClick={() => {
                    handleUndoComplete(actionAlert.undoBookingId!);
                  }}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline flex items-center space-x-1 cursor-pointer bg-emerald-100/80 px-2.5 py-1 rounded-lg"
                >
                  <RotateCcw size={12} />
                  <span>Undo</span>
                </button>
              )}
              <button 
                onClick={() => setActionAlert(null)} 
                className="text-brand-gray hover:text-brand-charcoal p-1"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ==============================================
            TAB 1: RECENT BOOKINGS & COMPLETE CONFIRMATION VIEW
            ============================================== */}
        {activeTab === 'recent' && (
          <div className="space-y-6 max-w-3xl mx-auto animate-fade-in text-left">
            
            {/* Control Panel Header */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-brand-secondary-bg/80 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-brand-secondary-bg/50">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-terracotta bg-brand-terracotta/10 px-2.5 py-0.5 rounded-full">
                      Member Reservation Desk
                    </span>
                    <span className="text-xs text-brand-gray font-medium">
                      {activeReservations.length} active {activeReservations.length === 1 ? 'table' : 'tables'}
                    </span>
                  </div>
                  <h2 className="font-display font-black text-2xl text-brand-charcoal mt-1">
                    Your Table Bookings
                  </h2>
                  <p className="text-xs text-brand-gray font-light">
                    Done dining? Click <strong>Confirm Completed</strong> on any table to remove it from your active list.
                  </p>
                </div>

                <div className="flex items-center space-x-2 self-start sm:self-auto">
                  {activeReservations.length > 1 && recentFilter === 'active' && (
                    <button
                      onClick={handleCompleteAllActiveBookings}
                      className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-sm flex items-center space-x-1.5 transition-all cursor-pointer"
                      title="Mark all active bookings as completed"
                    >
                      <CheckCircle2 size={14} className="text-emerald-600" />
                      <span>Complete All Active</span>
                    </button>
                  )}
                  <button
                    onClick={() => setActiveTab('reserve')}
                    className="bg-brand-yellow hover:bg-brand-yellow/90 text-brand-charcoal text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm flex items-center space-x-1.5 shrink-0 cursor-pointer"
                  >
                    <CalendarCheck size={14} />
                    <span>+ Book New Table</span>
                  </button>
                </div>
              </div>

              {/* Filter Tabs: Active (Default) | Completed | All */}
              <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
                <div className="flex items-center space-x-1.5 bg-brand-secondary-bg/30 p-1 rounded-xl border border-brand-secondary-bg/50">
                  <button
                    onClick={() => setRecentFilter('active')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                      recentFilter === 'active'
                        ? 'bg-white text-brand-charcoal shadow-sm'
                        : 'text-brand-gray hover:text-brand-charcoal'
                    }`}
                  >
                    <span>Active Tables</span>
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      recentFilter === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-brand-secondary-bg text-brand-gray'
                    }`}>
                      {activeReservations.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setRecentFilter('completed')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                      recentFilter === 'completed'
                        ? 'bg-white text-brand-charcoal shadow-sm'
                        : 'text-brand-gray hover:text-brand-charcoal'
                    }`}
                  >
                    <CheckCircle2 size={13} className="text-emerald-600" />
                    <span>Completed History</span>
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      recentFilter === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-brand-secondary-bg text-brand-gray'
                    }`}>
                      {completedReservations.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setRecentFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      recentFilter === 'all'
                        ? 'bg-white text-brand-charcoal shadow-sm'
                        : 'text-brand-gray hover:text-brand-charcoal'
                    }`}
                  >
                    <span>All ({recentBookings.length})</span>
                  </button>
                </div>

                <div className="text-[11px] text-brand-gray">
                  {recentFilter === 'active' && (
                    <span>Showing active reservations only</span>
                  )}
                  {recentFilter === 'completed' && (
                    <span>Tables marked finished & cleared</span>
                  )}
                  {recentFilter === 'all' && (
                    <span>Full booking ledger history</span>
                  )}
                </div>
              </div>
            </div>

            {/* List of Bookings */}
            {displayedBookings.length === 0 ? (
              <div className="glass-panel p-10 rounded-3xl text-center space-y-4 border border-brand-secondary-bg/80 bg-white/80">
                <div className="w-14 h-14 rounded-full bg-brand-yellow/20 text-brand-charcoal flex items-center justify-center text-2xl mx-auto">
                  {recentFilter === 'active' ? '🍽️' : '📋'}
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg text-brand-charcoal">
                    {recentFilter === 'active' 
                      ? 'No Active Table Bookings' 
                      : recentFilter === 'completed' 
                      ? 'No Completed Bookings Yet' 
                      : 'No Bookings Found'}
                  </h3>
                  <p className="text-xs text-brand-gray max-w-md mx-auto">
                    {recentFilter === 'active' ? (
                      completedReservations.length > 0 ? (
                        <span>All previous reservations have been completed and cleared! Switch to <strong>Completed History</strong> above to review past visits, or book a new table.</span>
                      ) : (
                        <span>You don't have any upcoming table reservations scheduled across our Jodhpur branches.</span>
                      )
                    ) : (
                      <span>Completed table bookings will appear in this history list once you confirm completion from your active desk.</span>
                    )}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('reserve')}
                  className="bg-brand-yellow hover:bg-brand-yellow/90 text-brand-charcoal text-xs font-bold px-6 py-3 rounded-xl shadow-md inline-flex items-center space-x-2 transition-all cursor-pointer"
                >
                  <CalendarCheck size={16} />
                  <span>Reserve a Table Now</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {displayedBookings.map((booking) => {
                  const branch = branches.find(b => b.id === booking.location);
                  const isCompleted = booking.status === 'completed';
                  const isCancelled = booking.status === 'cancelled';
                  const isActive = booking.status === 'confirmed';

                  return (
                    <div
                      key={booking.id}
                      className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all shadow-md relative overflow-hidden ${
                        isCompleted
                          ? 'border-emerald-200/80 bg-emerald-50/20'
                          : isCancelled
                          ? 'border-brand-secondary-bg opacity-70 bg-gray-50/50'
                          : 'border-brand-secondary-bg hover:border-brand-yellow/80 hover:shadow-lg'
                      }`}
                    >
                      {/* Top Bar: ID and Status */}
                      <div className="flex items-center justify-between pb-3 border-b border-brand-secondary-bg/60">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-black text-xs text-brand-charcoal bg-brand-secondary-bg/60 px-2 py-0.5 rounded">
                            #{booking.id}
                          </span>
                          <span className="text-xs font-bold text-brand-forest uppercase tracking-wider">
                            {branch?.name || booking.location}
                          </span>
                        </div>

                        {/* Status Chip */}
                        <div className="flex items-center space-x-2">
                          {isCompleted ? (
                            <span className="inline-flex items-center space-x-1 text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-300/60">
                              <CheckCircle2 size={12} />
                              <span>Completed</span>
                            </span>
                          ) : isCancelled ? (
                            <span className="inline-flex items-center space-x-1 text-[11px] font-bold bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full border border-gray-300">
                              <span>Cancelled</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center space-x-1 text-[11px] font-bold bg-brand-yellow/40 text-brand-charcoal px-2.5 py-0.5 rounded-full border border-brand-yellow">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                              <span>Active Reservation</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Main Booking Details */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 text-xs">
                        <div className="space-y-1">
                          <span className="text-brand-gray text-[10px] uppercase font-bold tracking-wider">Date</span>
                          <div className="font-bold text-brand-charcoal flex items-center space-x-1">
                            <Calendar size={13} className="text-brand-terracotta shrink-0" />
                            <span>{booking.date}</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-brand-gray text-[10px] uppercase font-bold tracking-wider">Reserved Time</span>
                          <div className="font-bold text-brand-charcoal flex items-center space-x-1">
                            <Clock size={13} className="text-brand-forest shrink-0" />
                            <span>{booking.time}</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-brand-gray text-[10px] uppercase font-bold tracking-wider">Guests & Zone</span>
                          <div className="font-bold text-brand-charcoal capitalize flex items-center space-x-1">
                            <Users size={13} className="text-brand-terracotta shrink-0" />
                            <span>{booking.guests} Guests • {booking.seatingPreference}</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-brand-gray text-[10px] uppercase font-bold tracking-wider">Guest Name</span>
                          <div className="font-bold text-brand-charcoal truncate">
                            {booking.name}
                          </div>
                        </div>
                      </div>

                      {/* Special Occasion Tag if exists */}
                      {booking.occasion && (
                        <div className="pb-3 text-xs text-brand-charcoal flex items-center space-x-1 font-medium">
                          <span className="text-brand-terracotta">✨</span>
                          <span>Occasion: <strong>{booking.occasion}</strong></span>
                        </div>
                      )}

                      {/* Action Bar */}
                      <div className="pt-3 border-t border-brand-secondary-bg/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        
                        {/* Status detail information */}
                        <div className="text-xs text-brand-gray">
                          {isCompleted ? (
                            <span className="text-emerald-700 font-medium flex items-center space-x-1">
                              <CheckCircle2 size={13} />
                              <span>Table finished & cleared from active desk.</span>
                            </span>
                          ) : isCancelled ? (
                            <span className="text-gray-500 font-medium">Table released for walk-ins.</span>
                          ) : (
                            <span className="text-brand-charcoal font-medium flex items-center space-x-1">
                              <UtensilsCrossed size={13} className="text-brand-forest" />
                              <span>Table held for your party at {branch?.name || booking.location}.</span>
                            </span>
                          )}
                        </div>

                        {/* Interactive Buttons */}
                        <div className="flex items-center space-x-2 self-end sm:self-auto">
                          
                          {/* Active reservation: Confirm Completed Button */}
                          {isActive && (
                            <>
                              <button
                                onClick={() => handleCompleteBooking(booking.id)}
                                className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold py-2 px-3.5 rounded-xl transition-all shadow-sm flex items-center space-x-1.5 cursor-pointer"
                                title="Mark table booking as completed and remove from active list"
                              >
                                <CheckCircle2 size={14} />
                                <span>Confirm Completed</span>
                              </button>

                              <button
                                onClick={() => handleCancelBooking(booking.id)}
                                className="text-xs text-gray-500 hover:text-rose-600 px-2.5 py-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                              >
                                Cancel
                              </button>
                            </>
                          )}

                          {/* Completed: Re-book or Clear record */}
                          {isCompleted && (
                            <>
                              <button
                                onClick={() => {
                                  setFormData({
                                    location: booking.location,
                                    guests: booking.guests,
                                    seatingPreference: booking.seatingPreference,
                                    occasion: booking.occasion,
                                    name: booking.name,
                                    phone: booking.phone,
                                    email: booking.email,
                                    date: '',
                                    time: '',
                                  });
                                  setActiveTab('reserve');
                                }}
                                className="text-xs font-bold text-brand-forest hover:bg-brand-forest/10 px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1 cursor-pointer"
                              >
                                <span>Book Again</span>
                                <ArrowRight size={13} />
                              </button>

                              <button
                                onClick={() => handleRemoveBooking(booking.id)}
                                className="text-xs text-gray-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                                title="Remove from history"
                              >
                                <Trash2 size={14} />
                              </button>
                            </>
                          )}

                          {/* Cancelled: Clear record */}
                          {isCancelled && (
                            <button
                              onClick={() => handleRemoveBooking(booking.id)}
                              className="text-xs text-gray-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Remove from history"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}

                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* ==============================================
            TAB 2: BOOK A NEW TABLE FORM / VOUCHER VIEW
            ============================================== */}
        {activeTab === 'reserve' && (
          <div>
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
                      By clicking Confirm, you agree to receive a quick verification call/SMS on your mobile number. Please arrive on time; you can confirm table completion or cancel anytime using your "Recent Bookings" desk.
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

                {/* Printed Voucher ticket */}
                <div className="p-6 bg-[#FDF9F3] border-2 border-dashed border-brand-stone-accent/50 rounded-2xl text-left space-y-4 shadow-inner relative overflow-hidden">
                  {/* Overlay watermark */}
                  <div className="absolute -bottom-4 -right-4 text-brand-stone-accent/10 font-display font-black text-6xl rotate-12 select-none pointer-events-none">
                    BRICKS
                  </div>

                  {/* Receipt metadata */}
                  <div className="flex items-center justify-between border-b border-brand-secondary-bg pb-3">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gray">Reservation ID</span>
                    <span className="font-mono font-bold text-sm text-brand-terracotta bg-white px-2 py-1 rounded border border-brand-secondary-bg">
                      {currentBooking?.id}
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
                  We’ve sent a confirmation voucher to <span className="font-semibold text-brand-charcoal">{formData.phone}</span>. Once your dining is complete, you can mark it as <strong>Completed</strong> anytime from the <strong>Recent Bookings</strong> ledger.
                </p>

                {/* Voucher Actions buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('recent')}
                    className="bg-brand-forest hover:bg-brand-forest/90 text-white text-xs font-bold py-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Clock size={14} />
                    <span>View in Recent Bookings</span>
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
        )}

      </div>

    </div>
  );
}
