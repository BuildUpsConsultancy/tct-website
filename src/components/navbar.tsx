import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: 'Home', to: '/' },
    { label: 'Destinations', to: '/destinations' },
    { label: 'Packages', to: '/packages' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  const isActive = (to: string) => location.pathname === to;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="w-full bg-gradient-to-r from-slate-900/80 via-slate-900/70 to-slate-950/80 backdrop-blur-sm shadow-2xl border-b border-slate-800/40">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-3 transition-all duration-300 hover:gap-4">
          <img src="/logo-tct.png" alt="TCT Logo" className="h-12 w-auto opacity-100 brightness-125 contrast-125 transition-transform duration-300 group-hover:scale-110" />
        </Link>

        {/* Desktop Nav - centered */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`group relative px-2 py-1 text-sm font-medium transition-all duration-200 ${
                isActive(link.to)
                  ? 'text-sky-400'
                  : 'text-slate-300 hover:text-sky-400 hover:translate-y-[-2px] hover:scale-102'
              }`}
            >
              {link.label}
              <span className="absolute -bottom-3 left-0 h-0.5 w-0 rounded-full bg-sky-400 transition-all duration-200 group-hover:w-full" />
              {isActive(link.to) && (
                <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-sky-400 rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="text-sm px-4 py-2 rounded-full border border-white/30 text-white bg-transparent hover:bg-sky-400/10 hover:text-sky-400 transition-all duration-200"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="text-sm px-4 py-2 rounded-full bg-white text-slate-900 font-semibold shadow-lg hover:brightness-95 transition-all duration-200"
          >
            Register
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="group md:hidden text-tct-text transition-all duration-300 hover:scale-110 hover:text-tct-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-6 h-0.5 bg-current mb-1.5 transition-all duration-300 group-hover:w-7" />
          <div className="w-4 h-0.5 bg-current mb-1.5 transition-all duration-300 group-hover:w-6" />
          <div className="w-6 h-0.5 bg-current transition-all duration-300 group-hover:w-7" />
        </button>
      </div>

      {/* Mobile menu */}
        {menuOpen && (
        <div className="md:hidden bg-slate-900/90 border-t border-slate-800/30 px-6 py-4 backdrop-blur-sm">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`block py-2.5 text-sm font-medium border-b border-tct-mid/50 last:border-0 transition-all duration-300 hover:translate-x-1 hover:text-tct-white ${
                isActive(link.to) ? 'text-tct-white' : 'text-tct-muted'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-4">
            <button onClick={() => { navigate('/login'); setMenuOpen(false); }} className="btn-outline text-sm flex-1 py-2">Login</button>
            <button onClick={() => { navigate('/register'); setMenuOpen(false); }} className="btn-primary text-sm flex-1 py-2">Register</button>
          </div>
        </div>
      )}
      </div>
    </nav>
  );
};

export default Navbar;
