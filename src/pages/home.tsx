import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Camera, ChevronDown, ChevronUp, Headphones, Hotel, Mail, Map, Plane, Shield, Star, Users } from 'lucide-react';

import { featuredDestinations } from '../data/destinations';
import { generalCuriosities } from '../data/generalCuriosities';

const stats = [
  { value: '1,240', label: 'TRIPS COMPLETED' },
  { value: '15+', label: 'YEARS EXPERIENCE' },
  { value: '98%', label: 'HAPPY TRAVELERS' },
  { value: '85%', label: 'RETENTION RATIO' },
];

const services = [
  { icon: Plane, title: 'Flight Booking', desc: 'Seamless first-class travel arrangements to any corner of the globe with priority boarding.' },
  { icon: Hotel, title: 'Hotel Stays', desc: 'Exclusive access to the world’s most prestigious boutique hotels and private villas.' },
  { icon: Map, title: 'Guided Tours', desc: 'Local experts reveal the secrets of your destination that aren’t in any guidebook.' },
  { icon: Camera, title: 'Photography Tours', desc: 'Create cinematic memories with professional photo guides in the golden hour.' },
  { icon: Shield, title: 'Travel Insurance', desc: 'Comprehensive coverage for peace of mind wherever your wanderlust leads you.' },
  { icon: Headphones, title: '24/7 Support', desc: 'Global concierge service available at any hour to handle your requests in real-time.' },
];

const testimonials = [
  { name: 'Elena Vance', quote: 'The attention to detail was beyond my expectations. Every evening felt like a scene from a movie I didn’t want to end.' },
  { name: 'Marcus Thorne', quote: 'Midnight Voyager transformed my conception of travel. It wasn’t just a trip; it was a curated adventure of the soul.' },
  { name: 'Sophia Rossi', quote: 'Effortless elegance from booking to return. I’ve never felt so taken care of in foreign lands. Simply elite service.' },
];

const Home = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="min-h-screen bg-tct-dark text-white">
      <section className="relative min-h-screen overflow-hidden bg-texture pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a4a52] via-[#0f3a42] to-[#0a2630]" />
        <div className="absolute inset-0 opacity-80" style={{ backgroundImage: 'url(/images/image_1.png)', backgroundSize: 'cover', backgroundPosition: 'center top' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f3a42]/40 to-[#0a2630]" />

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div className="max-w-3xl animate-fade-up">
            <p className="section-label mb-4 text-white/85">Destination Spotlight</p>
            <h1 className="font-display text-6xl font-black leading-[0.92] text-tct-white md:text-8xl">
              Your Journey
              <br />
              Begins Here
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/85 md:text-lg">
              Experience travel curated for the cinematic soul. Discover hidden horizons where the stars meet the sea in an orchestration of premium comfort.
            </p>

            <div className="mt-8 grid max-w-xl grid-cols-2 gap-4 text-white/85 sm:grid-cols-4">
              <div>
                <p className="section-label mb-1 text-white/70">Best Season</p>
                <p className="text-sm font-semibold text-white">Nov / March</p>
              </div>
              <div>
                <p className="section-label mb-1 text-white/70">Language</p>
                <p className="text-sm font-semibold text-white">Spanish, English</p>
              </div>
              <div>
                <p className="section-label mb-1 text-white/70">Currency</p>
                <p className="text-sm font-semibold text-white">CLP / ARS</p>
              </div>
              <div>
                <p className="section-label mb-1 text-white/70">Must-See</p>
                <p className="text-sm font-semibold text-white">Torres del Paine</p>
              </div>
            </div>

            <button onClick={() => navigate('/packages')} className="btn-primary mt-10 px-8 py-4 text-base shadow-xl shadow-black/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
              Explore Packages
            </button>
          </div>

          <div className="relative hidden h-[540px] lg:block">
            <div className="absolute right-16 top-10 w-[255px] rotate-6 rounded-2xl border-4 border-[#ffb2c2] bg-[#13212d] shadow-2xl shadow-black/50 transition-transform duration-300 hover:-translate-y-2 hover:rotate-3 hover:scale-105">
              <div className="overflow-hidden rounded-[14px]">
                <img src="/images/image_10.png" alt="Mountain view" className="h-[250px] w-full object-cover transition-transform duration-700 hover:scale-110" />
              </div>
              <div className="px-4 py-3 text-center text-[34px] font-light text-white transition-colors duration-300 hover:text-[#ffb2c2]" style={{ fontFamily: 'cursive' }}>
                Safe Work
              </div>
            </div>

            <div className="absolute right-36 top-34 w-[210px] -rotate-12 rounded-2xl bg-[#0f1f2e] shadow-2xl shadow-black/50 transition-transform duration-300 hover:-translate-y-2 hover:rotate-[-9deg] hover:scale-105">
              <div className="overflow-hidden rounded-2xl border-4 border-[#1f3b52]">
                <img src="/images/image_8.png" alt="Glacier" className="h-[245px] w-full object-cover transition-transform duration-700 hover:scale-110" />
              </div>
            </div>

            <div className="absolute right-10 top-48 w-[190px] -rotate-2 overflow-hidden rounded-2xl bg-[#121d28] shadow-2xl shadow-black/50 transition-transform duration-300 hover:-translate-y-2 hover:rotate-0 hover:scale-105">
              <img src="/images/image_7.png" alt="Cabin" className="h-[245px] w-full object-cover transition-transform duration-700 hover:scale-110" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0f3a42]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="section-label mb-2 text-white/85">Curation</p>
              <h2 className="font-display text-4xl text-tct-white md:text-5xl">Featured Destinations</h2>
            </div>
            <button onClick={() => navigate('/destinations')} className="text-sm text-white/90 transition-all duration-300 hover:translate-x-1 hover:underline">
              Explore All
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredDestinations.map((destination) => (
              <button
                key={destination.slug}
                type="button"
                onClick={() => navigate(`/destinations/${destination.slug}`)}
                className="group overflow-hidden rounded-[28px] bg-[#133940] text-left shadow-lg shadow-black/25 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/40"
              >
                <div className="overflow-hidden rounded-[28px] border border-white/8 bg-[#102b31] p-2">
                  <div className="overflow-hidden rounded-[22px]">
                    <img src={destination.image} alt={destination.alt} className="h-[290px] w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                </div>
                <div className="px-5 pb-6 pt-4 text-center transition-colors duration-300 group-hover:bg-[#183f46]">
                  <h3 className="text-2xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-[#f7f2e9]">
                    {destination.title}
                  </h3>
                  <p className="mt-2 text-base font-medium text-white/85">{destination.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: 'url(/images/image_2.png)' }} />
        <div className="absolute inset-0 bg-[#0f3540]/70" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl bg-black/20 px-2 py-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-black/30 hover:shadow-lg hover:shadow-black/20">
                <p className="font-display text-4xl font-black text-white md:text-5xl">{stat.value}</p>
                <p className="section-label mt-1 text-[10px] text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(/images/image_5.png)' }} />
        <div className="absolute inset-0 bg-[#0f4450]/75" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-2">
          <div>
            <p className="section-label mb-3 text-white/85">Exclusive Offers</p>
            <h2 className="font-display text-5xl font-bold leading-tight text-tct-white md:text-6xl">
              Curated Packages
              <br />
              for the Bold
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/85 md:text-base">
              Our signature packages combine luxury transit with off-the-grid experiences. From mountain sanctuaries to bustling neon cityscapes, we tailor every moment.
            </p>
            <button onClick={() => navigate('/packages')} className="btn-primary mt-8 px-7 py-4 text-sm transition-all duration-300 hover:scale-105 hover:-translate-y-1">
              Browse All Packages
            </button>
          </div>

          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="overflow-hidden rounded-[26px] shadow-2xl shadow-black/40 transition-all duration-500 hover:shadow-black/60">
              <img src="/images/image_10.png" alt="Featured package" className="h-[420px] w-full object-cover transition-transform duration-700 hover:scale-105 hover:rotate-1" />
            </div>
            <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-[#0f2030]/85 p-5 text-white shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#0f2030]/95">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">The Aurora Expedition</h3>
                  <p className="text-xs text-white/80">Norway & Iceland • 12 Days</p>
                </div>
                <span className="rounded bg-white px-3 py-1 text-xs font-bold text-[#0f2030]">$4,200</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.18em] text-white/80">
                <span className="inline-flex items-center gap-1"><Hotel className="h-3.5 w-3.5" /> 5 Star Stay</span>
                <span className="inline-flex items-center gap-1"><Plane className="h-3.5 w-3.5" /> Private Jet</span>
                <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" /> Guided</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/image_3.png)' }} />
        <div className="absolute inset-0 bg-[#0f3c42]/70" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="section-label mb-2 text-white/85">Our Expertise</p>
            <h2 className="font-display text-4xl text-white md:text-5xl">Full-Service Luxury</h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="group rounded-2xl border border-white/10 bg-[#14273a]/85 p-6 shadow-lg shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#7fb5b0]/40 hover:bg-[#183246] hover:shadow-2xl hover:shadow-black/40">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#7fb5b0]/10 text-[#a7d9d5] transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#7fb5b0]/20 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white transition-colors duration-300 group-hover:text-[#f5f0e8]">{service.title}</h3>
                  <p className="text-sm leading-7 text-white/80 transition-colors duration-300 group-hover:text-white">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(/images/image_4.png)' }} />
        <div className="absolute inset-0 bg-[#0d3a41]/70" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="font-display text-4xl text-white md:text-5xl">Voices of the Voyager</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="group rounded-2xl border border-white/10 bg-black/20 p-8 shadow-lg shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-black/30 hover:shadow-2xl hover:shadow-black/30">
                <Mail className="mb-5 h-10 w-10 text-white/15 transition-all duration-300 group-hover:scale-110 group-hover:text-[#7fb5b0]/40" />
                <p className="text-sm leading-7 text-white/85">“{testimonial.quote}”</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-[#112738] text-sm font-bold text-[#a7d9d5]">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                    <div className="flex gap-0.5 text-yellow-400">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star key={starIndex} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(/images/image_5.png)' }} />
        <div className="absolute inset-0 bg-[#0f4450]/75" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl text-white md:text-5xl">General Curiosities</h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/85 md:text-base">
              We are committed to offering more than just products. We provide exceptional experiences.
            </p>
            <button onClick={() => navigate('/contact')} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white hover:underline">
              Contact our experts <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3">
            {generalCuriosities.map((faq, index) => (
              <div key={faq.q} className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1b2a]/90 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-[#11263a] hover:shadow-xl hover:shadow-black/25">
                <button className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors duration-300 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                  <span className="text-sm font-semibold text-white">{faq.q}</span>
                  {openFaq === index ? <ChevronUp className="h-4 w-4 text-white/80" /> : <ChevronDown className="h-4 w-4 text-white/80" />}
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-sm leading-7 text-white/85">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
