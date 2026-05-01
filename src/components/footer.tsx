import { Shield, Award, CheckCircle2, Globe2, Images, AtSign } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-950 via-slate-900 to-black pt-32 pb-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-300/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-400/40 to-transparent"></div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10 mb-20">
        {/* Brand section */}
        <div className="group">
          <div className="mb-6">
              <img src="/logococnut.png" alt="The Coconut Tree Trails" className="w-56 max-w-full object-contain" />
          </div>
          <p className="max-w-xs text-[clamp(1.03rem,1.6vw,1.18rem)] leading-[1.55] text-slate-300">
            Crafted for the cinematic traveler. Every journey is a masterpiece of curation and elite service.
          </p>
          <div className="mt-8 flex items-center gap-4">
            {[Globe2, Images, AtSign].map((Icon, idx) => (
              <button
                key={idx}
                type="button"
                aria-label="Footer social icon"
                className="grid h-12 w-12 place-items-center rounded-full bg-sky-900/25 text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-800/35 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="group">
          <h4 className="font-bold mb-8 tracking-widest uppercase text-xs bg-gradient-to-r from-sky-500 to-sky-400 bg-clip-text text-transparent">
            Quick Links
          </h4>
          <ul className="space-y-3">
            {[
              'About Our Agency',
              'Featured Destinations',
              'Latest Travel News',
              'Partner With Us'
            ].map((link, idx) => (
              <li key={idx}>
                <a 
                  className="text-slate-400 hover:text-sky-400 text-sm transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 group/link"
                  href="#"
                >
                  <span className="opacity-0 group-hover/link:opacity-100 transition-opacity text-xs">→</span>
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="group">
          <h4 className="font-bold mb-8 tracking-widest uppercase text-xs bg-gradient-to-r from-sky-400 to-sky-500 bg-clip-text text-transparent">
            Our Services
          </h4>
          <ul className="space-y-3">
            {[
              'Private Charters',
              'Concierge Support',
              'Luxury Accommodation',
              'Custom Itineraries'
            ].map((service, idx) => (
              <li key={idx}>
                <a 
                  className="text-slate-400 hover:text-sky-400 text-sm transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 group/service"
                  href="#"
                >
                  <span className="opacity-0 group-hover/service:opacity-100 transition-opacity text-xs">→</span>
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="group">
          <h4 className="font-bold mb-6 tracking-widest uppercase text-xs bg-gradient-to-r from-sky-500 to-sky-400 bg-clip-text text-transparent">
            Newsletter
          </h4>
          <p className="text-slate-400 mb-6 text-sm leading-relaxed">
            Receive curated travel inspiration directly to your inbox.
          </p>
          <div className="space-y-3">
            <div className="relative group/input">
              <input
                className="w-full bg-slate-800/60 border border-slate-700 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/30 text-slate-300 placeholder-slate-500 transition-all duration-300"
                placeholder="Your Email Address"
                type="email"
              />
            </div>
            <button className="w-full bg-white text-slate-900 font-bold py-3 rounded-full hover:brightness-95 transition-all shadow-lg shadow-black/20 hover:scale-102 active:scale-95 duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
      </div>

      {/* Bottom section */}
      <div className="max-w-7xl mx-auto px-8 pt-12 relative z-10">
        <div className="flex flex-col items-center gap-4 mb-6">
          <p className="text-slate-500 text-sm text-center">© 2024 The Coconut Tree Trails. Crafted for the cinematic traveler.</p>
          <div className="flex gap-6 text-slate-500 text-xs">
            {['Newsletter', 'Privacy Policy', 'Terms of Service', 'Travel Insurance'].map((link, idx) => (
              <a key={idx} className="hover:text-sky-400 transition-colors" href="#">{link}</a>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex justify-center gap-6 pt-6 border-t border-slate-800">
          {[
            { icon: Shield, text: '100% Secure' },
            { icon: CheckCircle2, text: 'Verified Partner' },
            { icon: Award, text: '24/7 Support' }
          ].map((badge, idx) => {
            const IconComponent = badge.icon;
            return (
              <div key={idx} className="flex items-center gap-2 text-slate-400 hover:text-sky-400 transition-colors group cursor-pointer">
                <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium">{badge.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-400/20 to-transparent"></div>
    </footer>
  );
};

export default Footer;