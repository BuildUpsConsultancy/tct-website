import { useNavigate } from 'react-router-dom';
import { Eye, Rocket, Shield, Star, Sparkles, ArrowRight, CircleCheck } from 'lucide-react';

import Reveal from '../components/Reveal';

const aboutValues = [
  {
    icon: Shield,
    title: 'Safety First',
    desc: 'Your safety is our highest priority. Every itinerary we build is assessed for local conditions, road safety, and accommodation standards — giving you and your family complete peace of mind.',
  },
  {
    icon: Eye,
    title: 'Local Expertise',
    desc: 'Our guides and planners are Sri Lankan-born, with deep knowledge of every region, community, and hidden gem on this island. You get the island as insiders know it.',
  },
  {
    icon: Rocket,
    title: 'Dedicated Support',
    desc: 'From first enquiry to safe return, our team is available to handle your questions, adjust your plans, and support you through every stage of your journey.',
  },
  {
    icon: Star,
    title: 'Quality Promise',
    desc: 'We operate to UK travel industry standards across accommodation selection, transport quality, and guide training — so every experience consistently exceeds expectations.',
  },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#06142a] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b2224] via-[#12373a] to-[#0d2628]" />
        <div className="absolute inset-0 bg-cover bg-center opacity-18" style={{ backgroundImage: 'url(/images/image_1.png)' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(127,181,176,0.16),_transparent_45%),linear-gradient(to_bottom,rgba(11,34,36,0.45),rgba(6,20,42,0.88))]" />

        <div className="relative mx-auto max-w-7xl px-6 py-10 md:py-14 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal className="group max-w-xl" animation="fade-up">
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#d6c7aa] transition-all duration-300 group-hover:tracking-[0.3em]">About Us</p>
              <h1 className="max-w-xl text-5xl font-extrabold leading-[0.95] md:text-7xl transition-transform duration-300 group-hover:translate-x-1">
                <span className="block text-[#d8e7ff]">We Are</span>
                <span className="block text-[#f5f0e8]">Coconut Tree</span>
                <span className="block text-[#f5f0e8]">Trails</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-200/60 transition-colors duration-300 group-hover:text-slate-200/75 md:text-lg">
                We help people discover Sri Lanka properly — with local knowledge, thoughtful planning, and genuine Sri Lankan hospitality. We specialise in private, tailor-made tours that go beyond the obvious tourist trail.
              </p>
              <button
                onClick={() => navigate('/contact')}
                className="mt-8 rounded-full bg-[#f5f0e8] px-7 py-3 font-semibold text-[#0f2030] transition hover:-translate-y-0.5 hover:scale-105 hover:brightness-95"
              >
                Start Your Story
              </button>
            </Reveal>

            <Reveal className="relative h-[430px] md:h-[480px] lg:h-[520px]" animation="fade-left" delay={100}>
              <div className="group absolute right-0 top-2 h-[420px] w-[86%] rounded-[26px] bg-[#2f8fe6] shadow-2xl shadow-black/30 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-black/40">
                <img src="/images/image_3.png" alt="About hero" className="h-full w-full rounded-[26px] object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 rounded-[26px] bg-gradient-to-t from-[#06142a]/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

            </Reveal>
          </div>
        </div>
      </section>

      {/* Vision / Mission */}
      <section className="relative overflow-hidden py-14 md:py-20 min-h-[680px] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-22" style={{ backgroundImage: 'url(/images/image_2.png)' }} />
        <div className="absolute inset-0 bg-[#0b2224]/78" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal animation="fade-up">
              <div className="group rounded-[18px] bg-[#152438]/95 p-8 shadow-2xl shadow-black/20 transition-all duration-300 hover:-translate-y-2 hover:bg-[#173049]">
                <div className="mb-5 text-4xl text-[#8fc0ff] transition-transform duration-300 group-hover:scale-110"><CircleCheck className="h-10 w-10" /></div>
                <h2 className="mb-4 text-3xl font-semibold text-white transition-colors duration-300 group-hover:text-[#f5f0e8]">Our Vision</h2>
                <p className="leading-7 text-slate-200/60 transition-colors duration-300 group-hover:text-slate-200/75">
                  To be Sri Lanka’s most trusted travel partner — redefining what a Sri Lanka holiday can be by combining deep local roots with world-class service and unforgettable experiences that leave a lasting impact.
                </p>
              </div>
            </Reveal>

            <Reveal animation="fade-up" delay={120}>
              <div className="group rounded-[18px] bg-[#152438]/95 p-8 shadow-2xl shadow-black/20 transition-all duration-300 hover:-translate-y-2 hover:bg-[#173049]">
                <div className="mb-5 text-4xl text-[#8fc0ff] transition-transform duration-300 group-hover:scale-110"><Sparkles className="h-10 w-10" /></div>
                <h2 className="mb-4 text-3xl font-semibold text-white transition-colors duration-300 group-hover:text-[#f5f0e8]">Our Mission</h2>
                <p className="leading-7 text-slate-200/60 transition-colors duration-300 group-hover:text-slate-200/75">
                  To help people discover Sri Lanka properly — with local knowledge, thoughtful planning, and genuine Sri Lankan hospitality. We build tailor-made tours that go beyond the obvious and reveal the island’s true depth.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#071225] py-14 md:py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 text-center sm:grid-cols-3">
          {[
            { num: '8+ Years', label: 'EXPERIENCE IN SRI LANKA' },
            { num: '26+ Tours', label: 'CURATED PACKAGES' },
            { num: '98%', label: 'HAPPY TRAVELLERS' },
          ].map((stat, index) => (
            <Reveal key={stat.label} animation="fade-up" delay={index * 100}>
              <div>
                <p className="text-4xl font-extrabold text-white md:text-5xl">{stat.num}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-slate-200/55">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative overflow-hidden py-20 md:py-24 min-h-[680px] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-18" style={{ backgroundImage: 'url(/images/image_2.png)' }} />
        <div className="absolute inset-0 bg-[#12373a]/72" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal className="text-center" animation="fade-up">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d6c7aa]">Why Choose Us</p>
            <h2 className="text-4xl font-bold text-white md:text-5xl">The Coconut Tree Trails Difference</h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {aboutValues.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} animation="fade-up" delay={index * 90}>
                  <div className="group rounded-[16px] border-t-2 border-t-[#d6c7aa]/70 bg-[#152438]/88 p-6 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-2 hover:border-t-[#8fc0ff]/70 hover:bg-[#173049]">
                    <Icon className="mb-5 h-8 w-8 text-[#8fc0ff] transition-transform duration-300 group-hover:scale-110" />
                    <h3 className="mb-3 text-xl font-semibold text-white transition-colors duration-300 group-hover:text-[#f5f0e8]">{item.title}</h3>
                    <p className="text-sm leading-7 text-slate-200/60 transition-colors duration-300 group-hover:text-slate-200/75">{item.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 min-h-[680px] flex items-center">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-[2fr_1fr]">
          <Reveal animation="fade-right">
            <div className="group relative overflow-hidden rounded-[18px] bg-[#152438] shadow-2xl shadow-black/25 transition-all duration-300 hover:-translate-y-1">
              <img src="/images/image_10.png" alt="Ready for the night" className="h-[360px] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06142a]/78 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-3xl font-extrabold text-white transition-colors duration-300 group-hover:text-[#f5f0e8] md:text-4xl">Ready to Explore Sri Lanka?</h3>
                <p className="mt-2 max-w-xl text-sm text-slate-200/65 transition-colors duration-300 group-hover:text-slate-200/80">Join the travellers who chose to discover Sri Lanka the right way.</p>
              </div>
            </div>
          </Reveal>

          <Reveal animation="fade-left" delay={120}>
            <div className="group flex items-center justify-center rounded-[18px] border border-white/10 bg-[#2b3c40]/90 px-8 py-10 text-center shadow-2xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#31464b]">
              <div>
                <div className="mb-6 text-4xl text-[#f5f0e8] transition-transform duration-300 group-hover:scale-110"><ArrowRight className="mx-auto h-10 w-10 rotate-[-45deg]" /></div>
                <h3 className="mb-4 text-3xl font-semibold text-white transition-colors duration-300 group-hover:text-[#f5f0e8]">Craft Your Story</h3>
                <p className="mx-auto mb-8 max-w-sm leading-7 text-slate-200/60 transition-colors duration-300 group-hover:text-slate-200/75">
                  Personalized itineraries designed specifically for your travel style.
                </p>
                <button
                  onClick={() => navigate('/contact')}
                  className="rounded-full border border-[#f5f0e8]/70 px-10 py-3 text-sm font-semibold text-[#f5f0e8] transition hover:-translate-y-0.5 hover:bg-[#f5f0e8] hover:text-[#0f2030]"
                >
                  Inquire Now
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default About;
