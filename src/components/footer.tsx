import { Linkedin, FacebookIcon, Instagram, Youtube } from 'lucide-react';
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
      <div className="hidden max-w-9xl mx-auto px-30 grid-cols-1 md:grid md:grid-cols-4 gap-12 relative z-10 mb-20">
        {/* Brand section */}
        <div className="group">
          <p className="max-w-xs text-[clamp(1.03rem,1.6vw,1.18rem)] leading-[1.55] text-slate-300">
            Your trusted partner for discovering Sri Lanka the right way — with local expertise, genuine hospitality, and tailor-made experiences built around you.
          </p>
          <div className="mt-8 flex items-center gap-4">
            {[Instagram, FacebookIcon, Linkedin, Youtube].map((Icon, idx) => (
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
              { name: 'Socials', path: '/socials' },
              { name: 'Destinations', path: '/destinations/wildlife' },
              { name: 'Our Team', path: '/about' },
              { name: 'Contact Us', path: '/contact' },
              { name: 'FAQ & Policy', path: '/faq-policy' },
            ].map((link) => (
              <li key={link.name}>
                <a
                  href={link.path}
                  className="text-slate-400 hover:text-[#a7d9d5] text-sm transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 group/link"
                >
                  <span className="opacity-0 group-hover/link:opacity-100 transition-opacity text-xs">
                    →
                  </span>

                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info - Replaced Services */}
        <div className="group">
          <h4 className="text-[#a7d9d5] font-bold mb-6">
            Address
          </h4>
              <p className="text-slate-400 leading-relaxed mb-6">
                The Coconut Tree Trails<br />
                Birmingham, UK<br />
              </p>         
              <h4 className="text-[#a7d9d5] font-medium mb-1">Email</h4>
              <a 
                href="mailto:cocountreetrails@gmail.com"
                className="text-slate-400 hover:text-[#a7d9d5] transition-colors inline-flex items-center gap-2 group/email"
              >
                cocountreetrails@gmail.com
                <span className="opacity-0 group-hover/email:opacity-100 transition-opacity text-xs">↗</span>
              </a>

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

      {/* Mobile content */}
      <div className="md:hidden relative z-10 px-4 pt-12 pb-8">
        {/* Mobile: more spacious, centered layout */}
        <div className="max-w-md mx-auto flex flex-col items-center text-center gap-6 px-2">
          <div className="mb-0">
            <img src="/logococnut.png" alt="The Coconut Tree Trails" className="h-14 w-auto object-contain mx-auto" />
          </div>

          <p className="text-sm leading-7 text-slate-300 max-w-[30rem]">
            Your trusted partner for discovering Sri Lanka the right way — with local expertise, genuine hospitality, and tailor-made experiences built around you.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            {[Instagram, FacebookIcon, Linkedin, Youtube].map((Icon, idx) => (
              <button
                key={idx}
                type="button"
                aria-label="Footer social icon"
                className="grid h-10 w-10 place-items-center rounded-full bg-[#0d5a53]/25 text-slate-300"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>

          <div className="w-full grid grid-cols-2 gap-6">
            <div>
              <h4 className="mb-2 text-sm font-bold text-[#a7d9d5]">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-400 text-center">
                {[
                  { name: 'Socials', path: '/socials' },
                  { name: 'Destinations', path: '/destinations/wildlife' },
                  { name: 'Our Team', path: '/about' },
                  { name: 'Contact Us', path: '/contact' },
                  { name: 'FAQ & Policy', path: '/faq-policy' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="hover:text-[#a7d9d5] transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Mobile Contact Info */}
            <div>
              <h4 className="mb-2 text-sm font-bold text-[#a7d9d5]">Contact</h4>
              <ul className="space-y-3 text-sm text-slate-400 text-center">
                <li>
                  <strong className="text-[#a7d9d5] block">Address</strong>
                  The Coconut Tree Trails<br />Birmingham, UK
                </li>
                <li>
                  <strong className="text-[#a7d9d5] block">Email</strong>
                  <a href="mailto:cocountreetrails@gmail.com" className="hover:text-[#a7d9d5] break-all">
                    cocountreetrails@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full">
            <h4 className="mb-2 text-sm font-bold text-[#a7d9d5]">Newsletter</h4>
            <p className="mb-3 text-sm leading-6 text-slate-400">Receive curated travel inspiration directly to your inbox.</p>
            <input
              className="w-full bg-slate-800/60 border border-[#a7d9d5]/30 px-4 py-3 text-sm focus:outline-none focus:border-[#a7d9d5] text-slate-300 placeholder-white"
              placeholder="Your Email Address"
              type="email"
            />
            <button className="mt-3 w-full bg-[#a7d9d5] py-3 text-sm font-bold text-[#173036]">
              Subscribe
            </button>
          </div>

          {/* Payment methods removed for mobile view as requested */}
        </div>
        
        <div className="mt-4 text-center text-xs text-white/80">
          <p>© 2026 The Coconut Tree Trails. All rights reserved. Crafted for the real Sri Lanka traveller.</p>
          <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[11px]">
            <Link to="/faq-policy" className="hover:text-[#a7d9d5] transition-colors">Privacy Policy</Link>
            <Link to="/faq-policy" className="hover:text-[#a7d9d5] transition-colors">Terms of Service</Link>
            <Link to="/faq-policy" className="hover:text-[#a7d9d5] transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="h-px bg-gradient-to-r from-transparent via-[#a7d9d5]/20 to-transparent"></div>
      </div>

      {/* Bottom section */}
      <div className="hidden md:block max-w-7xl mx-auto px-8 pt-8 relative z-10">
        <div className="flex flex-col items-center gap-4 mb-6">
          <p className="text-white text-sm text-center">© 2026 The Coconut Tree Trails. All rights reserved. Crafted for the real Sri Lanka traveller.</p>
          <div className="flex gap-6 text-white text-xs">
            <Link to="/faq-policy" className="hover:text-[#a7d9d5] transition-colors">Privacy Policy</Link>
            <Link to="/faq-policy" className="hover:text-[#a7d9d5] transition-colors">Terms of Service</Link>
            <Link to="/faq-policy" className="hover:text-[#a7d9d5] transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#a7d9d5]/20 to-transparent"></div>
    </footer>
  );
};

export default Footer;