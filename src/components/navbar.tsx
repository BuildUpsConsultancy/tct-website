import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Destinations', href: '#destinations' },
    { label: 'Packages', href: '#packages' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <nav className="sticky top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer hover:gap-4 transition-all duration-300">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/50 transition-all overflow-hidden">
              <img src="/logo-tct.png" alt="Coconut Tree Trails" className="w-7 h-7 object-contain" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-bold text-slate-50 leading-none">Coconut Tree</span>
              <span className="text-xs font-semibold text-primary leading-none">TRAILS</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-300 hover:text-primary font-medium text-sm transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="px-6 py-2 text-sm font-medium text-secondary border border-secondary rounded-full hover:bg-secondary/10 transition-all duration-300">
              Login
            </button>
            <button className="px-6 py-2 text-sm font-bold text-on-primary bg-gradient-to-r from-primary to-primary/80 rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-300">
              Register
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-400" />
            ) : (
              <Menu className="w-6 h-6 text-slate-400" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-8 space-y-4 border-t border-slate-800 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-slate-300 hover:text-primary text-sm font-medium transition-colors py-2 px-4 rounded hover:bg-slate-800/50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-3 pt-4 border-t border-slate-800">
              <button className="flex-1 px-4 py-2 text-sm font-medium text-secondary border border-secondary rounded-full hover:bg-secondary/10 transition-all">
                Login
              </button>
              <button className="flex-1 px-4 py-2 text-sm font-bold text-on-primary bg-primary rounded-full hover:scale-105 transition-all">
                Register
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}