import { Globe, Mail, Shield, Award, CheckCircle2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-950 via-slate-900 to-black pt-32 pb-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10 mb-20">
        {/* Brand section */}
        <div className="group">
          <div className="flex items-center gap-3 mb-8 hover:gap-4 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/50 transition-all duration-300 overflow-hidden">
              <img src="/logo-tct.png" alt="Coconut Tree Trails" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <span className="text-lg font-bold text-slate-100 block tracking-tight">Coconut Tree</span>
              <span className="text-lg font-bold text-primary">TRAILS</span>
            </div>
          </div>
          <p className="text-slate-400 mb-8 text-sm leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
            Discover nature's hidden gems. Unforgettable island adventures await.
          </p>
          <div className="flex gap-3">
            {[
              { icon: Globe, label: 'Website' },
              { icon: Mail, label: 'Email' }
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <a 
                  key={idx}
                  className="w-11 h-11 rounded-full glass bg-slate-800/40 hover:bg-primary/20 flex items-center justify-center text-slate-300 hover:text-primary transition-all duration-300 hover:scale-110 group/icon"
                  href="#"
                  title={item.label}
                >
                  <IconComponent className="w-4 h-4 group-hover/icon:rotate-12 transition-transform" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Quick Links */}
        <div className="group">
          <h4 className="text-white font-bold mb-8 tracking-widest uppercase text-xs bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
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
                  className="text-slate-400 hover:text-primary text-sm transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 group/link"
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
          <h4 className="text-white font-bold mb-8 tracking-widest uppercase text-xs bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
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
                  className="text-slate-400 hover:text-secondary text-sm transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 group/service"
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
          <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-xs bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Newsletter
          </h4>
          <p className="text-slate-400 mb-6 text-sm leading-relaxed group-hover:text-slate-200 transition-colors">
            Get curated travel inspiration and exclusive offers delivered weekly.
          </p>
          <div className="space-y-3">
            <div className="relative group/input">
              <input
                className="w-full bg-slate-800/50 border border-slate-700 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 text-slate-200 placeholder-slate-500 transition-all duration-300 group-hover/input:border-primary/50"
                placeholder="your@email.com"
                type="email"
              />
            </div>
            <button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary text-on-primary font-bold py-3 rounded-full hover:brightness-110 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 active:scale-95 duration-200">
              Subscribe Now
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left: Copyright */}
          <div className="flex flex-col gap-4">
            <p className="text-slate-500 text-sm group hover:text-slate-300 transition-colors">
              © 2024 The Coconut Tree Trails. All rights reserved.
            </p>
            <p className="text-slate-600 text-xs italic">
              Your paradise escape starts here at The Coconut Tree Trails.
            </p>
          </div>

          {/* Right: Footer links */}
          <div className="flex justify-end flex-wrap gap-6">
            {[
              'Privacy Policy',
              'Terms of Service',
              'Cookies',
              'Accessibility'
            ].map((link, idx) => (
              <a 
                key={idx}
                className="text-slate-500 hover:text-primary text-xs transition-all duration-300 hover:underline underline-offset-4"
                href="#"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex gap-6 pt-8 border-t border-slate-800">
          {[
            { icon: Shield, text: '100% Secure' },
            { icon: CheckCircle2, text: 'Verified Partner' },
            { icon: Award, text: '24/7 Support' }
          ].map((badge, idx) => {
            const IconComponent = badge.icon;
            return (
              <div key={idx} className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors group cursor-pointer">
                <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium">{badge.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
    </footer>
  );
};

export default Footer;