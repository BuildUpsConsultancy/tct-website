import { useNavigate } from 'react-router-dom';
import { CalendarDays, Eye, Globe2, Wallet, Play } from 'lucide-react';

const destination = {
  title: 'The Majestic Peaks of Patagonia',
  subtitle: 'Destination Spotlight',
  description: 'Venture into the raw, untamed wilderness at the edge of the world. Experience the dramatic convergence of jagged granite spires and crystalline blue glaciers under the infinite southern stars.',
  bestSeason: 'Nov — March',
  language: 'Spanish, English',
  currency: 'CLP / ARS',
  mustSee: 'Torres del Paine',
  images: ['/images/image_10.png', '/images/image_4.png', '/images/image_5.png'],
};

const Destinations = () => {
  const navigate = useNavigate();
  const metaInfo = [
    { icon: CalendarDays, label: 'Best Season', value: destination.bestSeason },
    { icon: Globe2, label: 'Language', value: destination.language },
    { icon: Wallet, label: 'Currency', value: destination.currency },
    { icon: Eye, label: 'Must-See', value: destination.mustSee },
  ];

  return (
    <div className="min-h-screen bg-tct-dark text-tct-text">
      {/* Hero */}
      <section className="relative min-h-[88vh] pt-24 md:pt-28 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b2224] via-[#12373a] to-[#0d2628]" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: `url(/images/image_2.png)` }}
        />
        <div
          className="absolute inset-x-0 top-0 h-[64%] bg-cover bg-top opacity-40"
          style={{ backgroundImage: `url(/images/image_1.png)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10292d]/80 via-[#1a4145]/50 to-[#133235]/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#133437]/20 to-[#0b1c21]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0b1c21] to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left Text */}
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d6c7aa]">{destination.subtitle}</p>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[0.98] mb-6 max-w-2xl">
              The Majestic
              <br />
              Peaks of Patagonia
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-xl">
              {destination.description}
            </p>

            {/* Meta info */}
            <div className="grid grid-cols-2 gap-4 mb-10 max-w-xl">
              {metaInfo.map(item => {
                const Icon = item.icon;
                return (
                <div key={item.label} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full border border-[#7fb5b0]/40 bg-[#7fb5b0]/10 text-[#a7d9d5]">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45 mb-0.5">{item.label}</p>
                    <p className="text-white text-sm font-semibold">{item.value}</p>
                  </div>
                </div>
              );})}
            </div>

            <button
              onClick={() => navigate('/packages')}
              className="rounded-full bg-white text-slate-900 px-8 py-3 font-semibold hover:brightness-95 transition mt-12 mb-12"
            >
              Explore Packages
            </button>
          </div>

          {/* Right: angled photo collage */}
          <div className="relative hidden md:block h-[430px]">
            <div className="group absolute right-4 top-2 w-[290px] h-[250px] rotate-[6deg] rounded-2xl overflow-hidden border-[3px] border-pink-200/80 shadow-2xl z-30 transition-all duration-500 hover:-translate-y-2 hover:rotate-[3deg] hover:scale-105">
              <img src={destination.images[0]} alt="Patagonia" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>

            <div className="group absolute right-[120px] top-[150px] w-[220px] h-[160px] -rotate-[8deg] rounded-2xl overflow-hidden border border-sky-200/20 shadow-2xl z-20 transition-all duration-500 hover:-translate-y-2 hover:rotate-[-5deg] hover:scale-105">
              <img src={destination.images[1]} alt="Glacier" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>

            <div className="group absolute right-8 top-[220px] w-[150px] h-[200px] rotate-[2deg] rounded-2xl overflow-hidden border border-slate-200/10 shadow-2xl z-10 transition-all duration-500 hover:-translate-y-2 hover:rotate-0 hover:scale-105">
              <img src={destination.images[2]} alt="Cabin" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
          </div>
        </div>
      </section>

      {/* Video / Cinematic Section */}
      <section className="relative overflow-hidden pb-24 pt-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d2628] via-[#12373a] to-[#0b2224]" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0b2224] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0b2224] to-transparent" />
        <div className="relative mx-auto max-w-6xl">
        <div
          className="relative rounded-3xl overflow-hidden bg-[#07192c] flex items-center justify-center border border-white/5 shadow-[0_0_60px_rgba(0,0,0,0.35)]"
          style={{ height: 430 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-85"
            style={{ backgroundImage: `url(/images/image_8.png)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06142a]/80 via-[#06142a]/20 to-transparent" />
          <button className="relative z-10 w-20 h-20 rounded-full bg-sky-300/95 hover:bg-sky-300 flex items-center justify-center text-[#0a2242] transition-all hover:scale-110 shadow-xl shadow-sky-400/20">
            <Play className="h-8 w-8 fill-current" />
          </button>
        </div>
        <div className="text-center mt-12 pb-8">
          <h2 className="text-5xl font-extrabold text-white mb-3">Experience the Journey</h2>
          <p className="text-slate-300/70 max-w-2xl mx-auto leading-relaxed">
            Immerse yourself in the sights and sounds of the world's most remote destinations. From the crunch of snow underfoot to the whisper of the southern wind.
          </p>
        </div>
        </div>
      </section>
    </div>
  );
};

export default Destinations;
