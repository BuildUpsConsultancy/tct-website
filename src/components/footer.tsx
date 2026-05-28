import { Globe2, Images, AtSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#173036] pt-20 pb-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#a7d9d5]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0d5a53]/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#a7d9d5]/40 to-transparent"></div>

      {/* Main content */}
      <div className="max-w-9xl mx-auto px-30 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10 mb-20">
        {/* Brand section */}
        <div className="group">
          <div className="mb-6">
              <img src="/logococnut.png" alt="The Coconut Tree Trails" className="w-56 max-w-full object-contain" />
          </div>
          <p className="max-w-xs text-[clamp(1.03rem,1.6vw,1.18rem)] leading-[1.55] text-slate-300">
            Your trusted partner for discovering Sri Lanka the right way — with local expertise, genuine hospitality, and tailor-made experiences built around you.
          </p>
          <div className="mt-8 flex items-center gap-4">
            {[Globe2, Images, AtSign].map((Icon, idx) => (
              <button
                key={idx}
                type="button"
                aria-label="Footer social icon"
                className="grid h-12 w-12 place-items-center rounded-full bg-[#0d5a53]/25 text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0d5a53]/35 hover:text-[#a7d9d5]"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="group">
          <h4 className="text-[#a7d9d5] font-bold mb-6 ml-4">
            Quick Links
          </h4>
          <ul className="space-y-3">
            {[
              'Travel Packages',
              'Destinations',
              'About Us',
              'Contact Us'
            ].map((link, idx) => (
              <li key={idx}>
                <a 
                  className="text-slate-400 hover:text-[#a7d9d5] text-sm transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 group/link"
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
          <h4 className="text-[#a7d9d5] font-bold mb-6 ml-4">
            Our Services
          </h4>
          <ul className="space-y-3">
            {[
              'Visa Assistance',
              'Hotel Bookings',
              'Wildlife Safaris',
              'Custom Itineraries'
            ].map((service, idx) => (
              <li key={idx}>
                <a 
                  className="text-slate-400 hover:text-[#a7d9d5] text-sm transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 group/service"
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
          <h4 className="text-[#a7d9d5] font-bold mb-6">
            Newsletter
          </h4>
          <p className="text-slate-400 mb-6 text-sm leading-relaxed">
            Receive curated travel inspiration directly to your inbox.
          </p>
          <div className="space-y-3">
            <div className="relative group/input">
              <input
                className="w-full bg-slate-800/60 border border-[#a7d9d5]/30 px-6 py-3 text-sm focus:outline-none focus:border-[#a7d9d5] focus:ring-1 focus:ring-[#a7d9d5]/30 text-slate-300 placeholder-white transition-all duration-300"
                placeholder="Your Email Address"
                type="email"
              />
            </div>
            <button className="w-full bg-[#a7d9d5] text-[#173036] font-bold py-3 hover:bg-white transition-all shadow-lg shadow-black/20 hover:scale-102 active:scale-95 duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="h-px bg-gradient-to-r from-transparent via-[#a7d9d5]/20 to-transparent"></div>
      </div>

      {/* Payment and Footer Image Section */}
      <div className="max-w-7xl mx-auto px-8 pt-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-slate-800">

          {/* Footer Image */}
          <div className="flex justify-center md:justify-end">
            <img 
              src="/footer-payment.png" 
              alt="Payment partners" 
              className="h-7 object-contain opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="max-w-7xl mx-auto px-8 pt-8 relative z-10">
        <div className="flex flex-col items-center gap-4 mb-6">
          <p className="text-white text-sm text-center">© 2025 The Coconut Tree Trails. All rights reserved. Crafted for the real Sri Lanka traveller.</p>
          <div className="flex gap-6 text-white text-xs">
            <a className="hover:text-[#a7d9d5] transition-colors" href="#">Newsletter</a>
            <Link to="/faq-policy" className="hover:text-[#a7d9d5] transition-colors">Privacy Policy</Link>
            <Link to="/faq-policy" className="hover:text-[#a7d9d5] transition-colors">Terms of Service</Link>
            <Link to="/faq-policy" className="hover:text-[#a7d9d5] transition-colors">Travel Insurance</Link>
          </div>
        </div>

      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#a7d9d5]/20 to-transparent"></div>
    </footer>
  );
};

export default Footer;