import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronUp, Headphones, Hotel, Leaf, Map, PawPrint, Plane, Quote, Shield, Star, Users } from 'lucide-react';

import Reveal from '../components/Reveal';
import { featuredDestinations } from '../data/destinations';
import { generalCuriosities } from '../data/generalCuriosities';

const stats = [
  { value: '18+', label: 'TOURS COMPLETED' },
  { value: '8+', label: 'YEARS EXPERIENCE' },
  { value: '98%', label: 'HAPPY TRAVELLERS' },
  { value: '69%', label: 'RETENTION RATIO' },
];

const services = [
  { icon: Plane, title: 'Flight Booking', desc: 'We assist with international and domestic flight arrangements to ensure your Sri Lanka journey starts smoothly from the moment you leave home.' },
  { icon: Hotel, title: 'Hotel Bookings', desc: 'From boutique jungle lodges in Sigiriya to colonial tea estate bungalows and beachfront villas — we curate Sri Lanka\'s finest stays for every budget.' },
  { icon: Map, title: 'Tour Experiences', desc: 'Every Sri Lankan experience is guided by locals who know the island intimately — revealing the hidden temples, local markets, and off-trail landscapes no tourist map ever finds.' },
  { icon: PawPrint, title: 'Wildlife Safaris', desc: 'Track leopards in Yala, witness elephant herds at Udawalawe, and spot blue whales off Mirissa — with expert naturalist guides who read the wild like a language.' },
  { icon: Leaf, title: 'Visa Processing', desc: 'Our team provides complete visa assistance for Sri Lanka ETA applications, simplifying the process so you can focus entirely on planning your adventure.' },
  { icon: Headphones, title: '24/7 Support', desc: 'From the moment you enquire to the day you arrive home, our dedicated local team is available around the clock to handle every detail of your journey.' },
];

const testimonials = [
  { name: 'James & Sarah — UK', quote: 'The team at The Coconut Tree Trails made our honeymoon in Sri Lanka truly unforgettable. Every detail was taken care of — from the scenic train ride through Ella to our private sunset dinner in Galle. We could not have done it better ourselves.' },
  { name: 'Priya Nair — India', quote: 'I booked the Ramayana Tour and was deeply moved by the depth of knowledge our guide brought to every sacred site. This was not just a tour — it was a pilgrimage. Absolutely authentic and beautifully organised.' },
  { name: 'David Hartmann — Germany', quote: 'Superb local knowledge, seamless logistics, and genuinely warm hospitality at every step. Sri Lanka is spectacular — and The Coconut Tree Trails is the only way to truly experience it. Already planning our return trip.' },
];

const Home = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="min-h-screen bg-tct-dark text-white">
      <section className="relative min-h-scene overflow-hidden bg-texture pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a4a52] via-[#0f3a42] to-[#0a2630]" />
        <div className="absolute inset-0 opacity-80" style={{ backgroundImage: 'url(/images/image_1.png)', backgroundSize: 'cover', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f3a42]/40 to-[#0a2630]" />

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <Reveal className="max-w-3xl" animation="fade-up">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d6c7aa]">Sri Lanka — The Right Way</p>
            <h1 className="font-display text-4xl font-black leading-[0.92] text-tct-white md:text-6xl">
              The Coconut Tree Trails
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/85 md:text-lg">
              Travel Sri Lanka with people who know it. Tailor-made tours rooted in local expertise, genuine hospitality, and a deep love for this island paradise.
            </p>
            <div className="mt-4 flex items-center gap-3 text-sm text-white/60">
              <Shield className="h-4 w-4 text-[#a7d9d5]" />
              <span>UK-standard service · Local Sri Lankan expertise · 8+ years experience</span>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <button onClick={() => navigate('/packages')} className="rounded-full bg-[#fbf6e8] px-10 py-4 text-base font-semibold text-[#06142a] shadow-xl shadow-black/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:bg-[#f5f0e8]">
                Explore Packages
              </button>
              <button onClick={() => navigate('/contact')} className="rounded-full border border-white/30 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white/10">
                Plan My Trip
              </button>
            </div>
          </Reveal>

          <Reveal className="relative hidden h-[540px] lg:block" animation="fade-left" delay={120}>
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
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-[#0f3a42]">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-8 flex items-end justify-between" animation="fade-up">
            <div>
              <p className="section-label mb-2 text-white/85">Curation</p>
              <h2 className="font-display text-4xl text-tct-white md:text-5xl">Featured Destinations</h2>
            </div>
            <button onClick={() => navigate('/destinations')} className="text-sm text-white/90 transition-all duration-300 hover:translate-x-1 hover:underline">
              Explore All
            </button>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredDestinations.map((destination, index) => (
              <Reveal key={destination.slug} animation="fade-up" delay={index * 100}>
                <button
                  type="button"
                  onClick={() => navigate(`/destinations/${destination.slug}`)}
                  className="group w-full overflow-hidden rounded-[28px] bg-[#133940] text-left shadow-lg shadow-black/25 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/40"
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: 'url(/images/image_2.png)' }} />
        <div className="absolute inset-0 bg-[#0f3540]/70" />
        <Reveal className="relative mx-auto max-w-7xl px-6" animation="scale">
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} animation="fade-up" delay={index * 120}>
                <div className="rounded-xl bg-black/20 px-2 py-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-black/30 hover:shadow-lg hover:shadow-black/20">
                  <p className="font-display text-4xl font-black text-white md:text-5xl">{stat.value}</p>
                  <p className="section-label mt-1 text-[10px] text-white/80">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(/images/image_5.png)' }} />
        <div className="absolute inset-0 bg-[#0f4450]/75" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-2">
          <Reveal animation="fade-right">
            <p className="section-label mb-3 text-white/85">Tailor-Made for You</p>
            <h2 className="font-display text-5xl font-bold leading-tight text-tct-white md:text-6xl">
              Sri Lanka
              <br />
              Your Way
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/85 md:text-base">
              From ancient temples and wildlife safaris to misty tea estates and sun-soaked beaches — our curated packages give you the real Sri Lanka, guided by people who live and breathe this island every day.
            </p>
            <button onClick={() => navigate('/packages')} className="btn-primary mt-8 px-7 py-4 text-sm transition-all duration-300 hover:scale-105 hover:-translate-y-1">
              Browse All Packages
            </button>
          </Reveal>

          <Reveal className="relative mx-auto w-full max-w-[420px]" animation="fade-left" delay={100}>
            <div className="overflow-hidden rounded-[26px] shadow-2xl shadow-black/40 transition-all duration-500 hover:shadow-black/60">
              <img src="/images/image_10.png" alt="Sigiriya Rock Fortress, Sri Lanka" className="h-[420px] w-full object-cover transition-transform duration-700 hover:scale-105 hover:rotate-1" />
            </div>
            <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-[#0f2030]/85 p-5 text-white shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#0f2030]/95">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">Magical Sri Lanka</h3>
                  <p className="text-xs text-white/80">Kandy · Ella · Galle · Mirissa • 9 Days</p>
                </div>
                <span className="rounded bg-white px-3 py-1 text-xs font-bold text-[#0f2030]">$2,199</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.18em] text-white/80">
                <span className="inline-flex items-center gap-1"><Hotel className="h-3.5 w-3.5" /> Boutique Stay</span>
                <span className="inline-flex items-center gap-1"><Plane className="h-3.5 w-3.5" /> Private Transfer</span>
                <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" /> Expert Guide</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/image_3.png)' }} />
        <div className="absolute inset-0 bg-[#0f3c42]/70" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal className="text-center" animation="fade-up">
            <p className="section-label mb-2 text-white/85">Your Trusted Partner</p>
            <h2 className="font-display text-4xl text-white md:text-5xl">Authentic Sri Lanka</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/75">Every service we offer is rooted in genuine local knowledge and a commitment to making your Sri Lanka experience as real, safe, and memorable as possible.</p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.title} animation="fade-up" delay={index * 100}>
                  <div className="group rounded-2xl border border-white/10 bg-[#14273a]/85 p-6 shadow-lg shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#7fb5b0]/40 hover:bg-[#183246] hover:shadow-2xl hover:shadow-black/40">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#7fb5b0]/10 text-[#a7d9d5] transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#7fb5b0]/20 group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-white transition-colors duration-300 group-hover:text-[#f5f0e8]">{service.title}</h3>
                    <p className="text-sm leading-7 text-white/80 transition-colors duration-300 group-hover:text-white">{service.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(/images/image_4.png)' }} />
        <div className="absolute inset-0 bg-[#0d3a41]/70" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal className="text-center" animation="fade-up">
            <p className="section-label mb-2 text-white/85">Hear it from Travellers</p>
            <h2 className="font-display text-4xl text-white md:text-5xl">Real Stories. Real Sri Lanka.</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} animation="fade-up" delay={index * 120}>
                <div className="group rounded-2xl border border-white/10 bg-black/20 p-8 shadow-lg shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-black/30 hover:shadow-2xl hover:shadow-black/30">
                  <Quote className="mb-5 h-10 w-10 text-white/15 transition-all duration-300 group-hover:scale-110 group-hover:text-[#7fb5b0]/40" />
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(/images/image_5.png)' }} />
        <div className="absolute inset-0 bg-[#0f4450]/75" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-2">
          <Reveal animation="fade-right">
            <p className="section-label mb-3 text-white/85">You Asked, We Answer</p>
            <h2 className="font-display text-4xl text-white md:text-5xl">Quick Answers for Smart Travellers</h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/85 md:text-base">
              Planning a trip to Sri Lanka? Here are the questions we get asked most often — answered honestly by our team.
            </p>
            <button onClick={() => navigate('/faq-policy')} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white hover:underline">
              View full FAQ &amp; Policy <ArrowRight className="h-4 w-4" />
            </button>
          </Reveal>

          <div className="space-y-3">
            {generalCuriosities.map((faq, index) => (
              <Reveal key={faq.q} animation="fade-up" delay={index * 90}>
                <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1b2a]/90 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-[#11263a] hover:shadow-xl hover:shadow-black/25">
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
