import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Check, HelpCircle } from 'lucide-react';
import { branches } from '../data';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Table Booking Support');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert('Please fill out all contact fields!');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setTimeout(() => {
        setName('');
        setEmail('');
        setMessage('');
        setSent(false);
      }, 3500);
    }, 1200);
  };

  return (
    <div id="contact-page" className="pt-28 pb-20">
      
      {/* Header */}
      <section className="bg-brand-secondary-bg/50 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-terracotta bg-white/60 px-4 py-1.5 rounded-full border border-brand-secondary-bg">
            Get In Touch
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-brand-charcoal tracking-tight">
            Connect With Our Desk
          </h1>
          <p className="text-brand-gray text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Have questions about catering a custom eggless celebration cake, hosting a banquet party of 100+ guests in Paota, or checking parking facilities? Drop us a line!
          </p>
        </div>
      </section>

      {/* Main Content Layout Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Glassmorphic Contact form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-[2rem] shadow-lg border border-brand-secondary-bg/80 text-left space-y-6">
              
              <div className="space-y-1.5 pb-2 border-b border-brand-secondary-bg/50">
                <h2 className="font-display font-bold text-2xl text-brand-charcoal">
                  Send a Direct Message
                </h2>
                <p className="text-brand-gray text-xs font-light">
                  Our customer care team (overseen by Mahesh ji) responds within 12 business hours.
                </p>
              </div>

              {sent ? (
                <div className="p-8 text-center space-y-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl mx-auto animate-bounce">
                    ✓
                  </div>
                  <h4 className="font-display font-bold text-lg text-brand-charcoal">Message Dispatched Successfully!</h4>
                  <p className="text-brand-gray text-xs font-light max-w-xs mx-auto">
                    Thank you, <strong className="text-brand-charcoal">{name}</strong>. A support ticket has been created. We will call or email you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="formName" className="block text-xs font-semibold text-brand-charcoal">Your Name</label>
                      <input
                        id="formName"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. CA Pankaj Lohiya"
                        className="w-full bg-white text-brand-charcoal text-xs sm:text-sm p-3.5 rounded-xl border border-brand-secondary-bg focus:outline-none focus:border-brand-terracotta"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="formEmail" className="block text-xs font-semibold text-brand-charcoal">Your Email Address</label>
                      <input
                        id="formEmail"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. guest@gmail.com"
                        className="w-full bg-white text-brand-charcoal text-xs sm:text-sm p-3.5 rounded-xl border border-brand-secondary-bg focus:outline-none focus:border-brand-terracotta"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="formSubject" className="block text-xs font-semibold text-brand-charcoal">Regarding Interest</label>
                    <select
                      id="formSubject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-white text-brand-charcoal text-xs sm:text-sm p-3.5 rounded-xl border border-brand-secondary-bg focus:outline-none"
                    >
                      <option value="Table Booking Support">Table Booking Support (Rooftop Seating)</option>
                      <option value="Designer Cake Customization">Eggless Designer Cake Catering (Bulk Orders)</option>
                      <option value="Paota Banquet Booking">Banquet Seating Reservation (100+ Guests)</option>
                      <option value="Career & Joining">Career / Franchising Opportunities Jodhpur Wide</option>
                      <option value="General Feedback">Hygiene / Quality Feedback Desk</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="formMessage" className="block text-xs font-semibold text-brand-charcoal">Message Description</label>
                    <textarea
                      id="formMessage"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your query details here. Be sure to specify dates, guests, or branch choices if applicable..."
                      className="w-full bg-white text-brand-charcoal text-xs sm:text-sm p-3.5 rounded-xl border border-brand-secondary-bg focus:outline-none focus:border-brand-terracotta"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-yellow hover:bg-brand-yellow/95 hover:scale-[1.01] text-brand-charcoal font-black text-sm p-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    {loading ? (
                      <span className="animate-pulse">Dispatching query ticket...</span>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Submit Support Ticket</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

          {/* Right Column: Contact info & Quick Help channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick coordinates cards */}
            <div className="bg-brand-forest text-brand-bg p-8 rounded-[2rem] text-left space-y-6 shadow-md">
              <h3 className="font-display font-bold text-xl text-brand-yellow tracking-tight">Support Contacts</h3>
              
              <div className="space-y-4 text-xs font-light">
                <div className="flex items-start space-x-3">
                  <Mail size={16} className="text-brand-yellow mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-white text-sm">General Support Email</strong>
                    <a href="mailto:support@bricksjodhpur.com" className="hover:underline">support@bricksjodhpur.com</a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone size={16} className="text-brand-yellow mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-white text-sm font-semibold">Central Hotlines Jodhpur Wide</strong>
                    <p className="space-y-1 mt-1 font-semibold text-brand-yellow">
                      <a href="tel:+919636041190" className="block hover:underline">Sardarpura Desk: +91 96360 41190</a>
                      <a href="tel:+919116611190" className="block hover:underline">Bhadwasiya Desk: +91 91166 11190</a>
                      <a href="tel:+918003681190" className="block hover:underline">Paota Desk: +91 80036 81190</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* General Timing Info Panel */}
            <div className="bg-white p-8 rounded-[2rem] border border-brand-secondary-bg/50 shadow-xs text-left space-y-4">
              <h4 className="font-display font-bold text-lg text-brand-charcoal">Business Operating Hours</h4>
              <p className="text-brand-gray text-xs font-light leading-relaxed">
                All Jodhpur branches operate daily, including National Holidays. Ideal rooftop sunset hours are between <strong>5:30 PM and 7:00 PM</strong>.
              </p>
              
              <div className="border-t border-brand-secondary-bg/50 pt-3 text-xs space-y-2">
                <div className="flex items-center justify-between text-brand-gray">
                  <span>Monday - Sunday (Restaurant)</span>
                  <strong className="text-brand-charcoal">11:00 AM - 11:30 PM</strong>
                </div>
                <div className="flex items-center justify-between text-brand-gray">
                  <span>Bakery counters (Bhadwasiya)</span>
                  <strong className="text-brand-charcoal">10:00 AM - 11:00 PM</strong>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* 3 Jodhpur Branch Table */}
        <div id="contact-branches-table" className="pt-8 space-y-6 text-left">
          <div className="space-y-2">
            <h3 className="font-display font-black text-2xl text-brand-charcoal">Branch Operational Information Table</h3>
            <p className="text-brand-gray text-xs sm:text-sm font-light">
              We highly recommend saving branch-specific reservation numbers to your phone for faster access.
            </p>
          </div>

          <div className="overflow-x-auto bg-white rounded-3xl border border-brand-secondary-bg shadow-xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-brand-forest text-white">
                  <th className="p-4 font-display font-bold">Branch ID</th>
                  <th className="p-4 font-display font-bold">Physical Jodhpur Address</th>
                  <th className="p-4 font-display font-bold">Operating Hours</th>
                  <th className="p-4 font-display font-bold">Direct Desk Phone (Click to call)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-secondary-bg/50 text-brand-charcoal">
                {branches.map((b) => (
                  <tr key={b.id} className="hover:bg-brand-secondary-bg/15 transition-colors">
                    <td className="p-4 font-bold capitalize">{b.id}</td>
                    <td className="p-4 font-light max-w-xs">{b.address}</td>
                    <td className="p-4 font-light">{b.timings}</td>
                    <td className="p-4 font-semibold text-brand-terracotta">
                      <a href={`tel:${b.phone.replace(/\s+/g, '')}`} className="hover:underline flex items-center space-x-1">
                        <Phone size={12} />
                        <span>{b.phone}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </section>

    </div>
  );
}
