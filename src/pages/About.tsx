import React from 'react';
import { Award, Compass, Heart, ShieldAlert, Smile, Coffee } from 'lucide-react';

export default function About() {
  return (
    <div id="about-page" className="pt-28 pb-20 overflow-hidden">
      {/* Page Header */}
      <section className="bg-brand-secondary-bg/50 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-terracotta bg-white/60 px-4 py-1.5 rounded-full border border-brand-secondary-bg">
            Our Story & Values
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-brand-charcoal tracking-tight">
            The Soul of Bricks Restaurant & Bakers
          </h1>
          <p className="text-brand-gray text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            A celebration of taste, comfort, and memories across Jodhpur. Established to provide families a warm place to celebrate life’s sweet milestones.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Description */}
          <div className="space-y-6 text-left">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-charcoal tracking-tight">
              Where Every Brick Tells a Flavor Story
            </h2>
            <p className="text-brand-gray text-sm sm:text-base font-light leading-relaxed">
              It started with a simple vision: to design a culinary venue in Jodhpur that felt both structurally premium and completely familial. We chose the rustic charm of exposed clay bricks, paired them with warm starlit rooftop environments, and built an extensive, clean kitchen capable of spinning fresh culinary gold.
            </p>
            <p className="text-brand-gray text-sm sm:text-base font-light leading-relaxed">
              Over the last 10 years, we have grown into Jodhpur's most cherished dining hub, expanding into 3 locations: **Sardarpura, Bhadwasiya, and Paota**. Each branch caters to specific desires — from romantic rooftop dates and corporate party celebrations to high-energy bakery counters.
            </p>
            
            {/* Why Eggless Section */}
            <div className="p-6 bg-brand-yellow/15 border border-brand-yellow/30 rounded-3xl space-y-3">
              <h3 className="font-display font-bold text-lg text-brand-charcoal flex items-center space-x-2">
                <span>🌱</span>
                <span>Our Pride: Jodhpur's Safest 100% Eggless Bakery</span>
              </h3>
              <p className="text-brand-gray text-xs sm:text-sm font-light leading-relaxed">
                We understand that many Jodhpur families strictly avoid eggs due to religious, cultural, or lifestyle choices. That is why **all bakery items, cakes, and pastries across all branches are strictly 100% eggless**. We utilize high-quality milk whey and natural proteins to bake items that are fluffier, softer, and cleaner than traditional bakes.
              </p>
            </div>
          </div>

          {/* Collage & Timeline */}
          <div className="relative">
            <div className="absolute inset-0 bg-brand-yellow/5 rounded-3xl blur-3xl -z-10" />
            <img
              src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&q=80&w=800"
              alt="Bricks bakers fresh dough"
              className="rounded-3xl shadow-lg w-full h-[380px] object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-brand-secondary-bg max-w-[220px] text-left hidden sm:block">
              <span className="font-handwritten text-3xl font-bold text-brand-terracotta block">Fresh Daily</span>
              <p className="text-xs text-brand-gray leading-relaxed mt-1">
                Baked items are delivered fresh twice a day to ensure stellar quality and soft textures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Columns */}
      <section className="bg-brand-secondary-bg/30 py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-terracotta font-sans">Core Values</h2>
            <h3 className="font-display font-black text-3xl text-brand-charcoal">How We Maintain Perfection</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: 'Uncompromised Hygiene',
                desc: 'Our kitchens adhere to strict daily deep-sanitizing logs. From reverse-osmosis filtration systems to professional chef gear, safety is built into our bricks.',
                icon: <Award className="text-brand-terracotta" size={24} />,
              },
              {
                title: 'Open Feedback & Growth',
                desc: 'We treat guest feedback like family counsel. Every Jodhpur review is parsed by our senior management team, including Mahesh ji, to continuously elevate our service standard.',
                icon: <Smile className="text-brand-terracotta" size={24} />,
              },
              {
                title: 'Universal Inclusivity',
                desc: 'All branches are equipped with wheelchair-friendly ramps, spacious aisle arrangements, and priority seating for senior citizens and young kids.',
                icon: <Heart className="text-brand-terracotta" size={24} />,
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-xs border border-brand-secondary-bg/50 space-y-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-brand-secondary-bg/40 flex items-center justify-center">
                  {item.icon}
                </div>
                <h4 className="font-display font-bold text-lg text-brand-charcoal">
                  {item.title}
                </h4>
                <p className="text-brand-gray text-xs sm:text-sm font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Growth Timeline */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="space-y-4 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-terracotta font-sans">Our Journey</h2>
          <h3 className="font-display font-black text-3xl text-brand-charcoal">A Decade of Sweet Milestones</h3>
        </div>

        <div className="relative border-l-2 border-brand-secondary-bg/80 ml-4 sm:ml-32 text-left space-y-12">
          {[
            {
              year: '2016',
              title: 'The First Brick in Sardarpura',
              desc: 'Launched our flagship branch in Sardarpura as a cozy café and eggless dessert shop. Instantly won Jodhpur’s heart with our Dutch Chocolate Truffle Cake.',
            },
            {
              year: '2019',
              title: 'Rooftop Lounge Expansion',
              desc: 'Transformed Sardarpura with a gorgeous wooden rooftop deck and introduced our signature multi-cuisine dining experience under warm string lights.',
            },
            {
              year: '2021',
              title: 'Expanding to Bhadwasiya',
              desc: 'Opened our highly spacious second branch in Bhadwasiya to cater to expanding demands for high-capacity party events and high-tea counters.',
            },
            {
              year: '2024',
              title: 'Paota Grand Garden Launch',
              desc: 'Our latest masterpiece. A grand garden dining concept paired with an indoor premium banquet hall to host up to 100+ celebration guests.',
            },
          ].map((step, idx) => (
            <div key={idx} className="relative pl-8 sm:pl-12 group">
              {/* Year badge left side for desktop */}
              <div className="absolute -left-4 sm:-left-28 top-0.5 w-8 sm:w-20 text-right hidden sm:block">
                <span className="font-display font-black text-xl text-brand-terracotta block">
                  {step.year}
                </span>
              </div>
              {/* Dot indicator */}
              <div className="absolute -left-2 top-2 w-3.5 h-3.5 rounded-full bg-brand-yellow border-2 border-brand-terracotta group-hover:scale-125 transition-transform" />
              
              <div className="space-y-1">
                <span className="font-display font-black text-lg text-brand-charcoal block">
                  {step.title} <span className="sm:hidden text-brand-terracotta font-sans text-sm">({step.year})</span>
                </span>
                <p className="text-brand-gray text-xs sm:text-sm font-light leading-relaxed max-w-2xl">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
