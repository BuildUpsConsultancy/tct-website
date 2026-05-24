import { useState, useRef, useEffect } from 'react';
import { ChevronDown, MapPin, LogOut, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { destinationMenu, getDestinationLabel } from '../data/destinationMenu';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const leaveTimerRef = useRef<number | null>(null);
  const userMenuRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if user is authenticated on component mount
    // if (authAPI.isAuthenticated()) {
    //   const userData = authAPI.getUser();
    //   setUser(userData);
    // }
  }, [location.pathname]);

  const openDropdown = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setDestinationsOpen(true);
  };

  const closeDropdownWithDelay = (delay = 150) => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    leaveTimerRef.current = window.setTimeout(() => {
      setDestinationsOpen(false);
      leaveTimerRef.current = null;
    }, delay);
  };

  const handleLogout = () => {
    // authAPI.logout();
    setUser(null);
    setShowUserMenu(false);
    navigate('/login');
  };

  const closeUserMenu = (delay = 150) => {
    if (userMenuRef.current) clearTimeout(userMenuRef.current);
    userMenuRef.current = window.setTimeout(() => {
      setShowUserMenu(false);
      userMenuRef.current = null;
    }, delay);
  };

  const openUserMenu = () => {
    if (userMenuRef.current) {
      clearTimeout(userMenuRef.current);
      userMenuRef.current = null;
    }
    setShowUserMenu(true);
  };

  const links = [
    { label: 'Home', to: '/' },
    { label: 'Travel Packages', to: '/packages' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'FAQ & Policy', to: '/faq-policy' },
  ];

  const isActive = (to: string) => {
    if (to.startsWith('/#')) {
      return location.pathname === '/';
    }
    return location.pathname === to;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="w-full bg-white/10 backdrop-blur-sm shadow-2xl" style={{ overflow: 'visible' }}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between" style={{ overflow: 'visible' }}>
          <Link to="/" className="group flex items-center gap-3 transition-all duration-300 hover:gap-4">
            <img src="/logococnut.png" alt="TCT Logo" className="h-12 w-auto opacity-100 brightness-125 contrast-125 transition-transform duration-300 group-hover:scale-110" />
          </Link>

          <div className="hidden md:flex items-center gap-5 absolute left-1/2 transform -translate-x-1/2">
            <Link
              to="/"
              className={`group relative px-2 py-1 text-sm font-medium transition-all duration-200 ${isActive('/') ? 'text-[#a7d9d5]' : 'text-slate-300 hover:text-[#a7d9d5] hover:translate-y-[-2px] hover:scale-102'
                }`}
            >
              Home
              <span className="absolute -bottom-3 left-0 h-0.5 w-0 rounded-full bg-[#a7d9d5] transition-all duration-200 group-hover:w-full" />
              {isActive('/') && <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-[#a7d9d5] rounded-full" />}
            </Link>

            <div className="relative" onMouseEnter={openDropdown} onMouseLeave={() => closeDropdownWithDelay(150)}>
              <button
                type="button"
                className={`group relative inline-flex items-center gap-1 px-2 py-1 text-sm font-medium transition-all duration-200 ${location.pathname.startsWith('/destinations') ? 'text-[#a7d9d5]' : 'text-slate-300 hover:text-[#a7d9d5] hover:translate-y-[-2px] hover:scale-102'
                  }`}
              >
                Destinations
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${destinationsOpen ? 'rotate-180' : ''}`} />
                <span className="absolute -bottom-3 left-0 h-0.5 w-0 rounded-full bg-[#a7d9d5] transition-all duration-200 group-hover:w-full" />
                {location.pathname.startsWith('/destinations') && (
                  <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-[#a7d9d5] rounded-full" />
                )}
              </button>

              {/* Invisible hover bridge to prevent dropdown from closing (kept for safety) */}
              {destinationsOpen && <div className="fixed left-4 right-4 top-[64px] h-6 z-40 pointer-events-none" />}

              {destinationsOpen && (
                <div
                  onMouseEnter={openDropdown}
                  onMouseLeave={() => closeDropdownWithDelay(120)}
                  className="fixed left-4 right-4 top-[72px] rounded-3xl border border-slate-700/60 bg-slate-800 p-12 shadow-2xl backdrop-blur-md z-50 pointer-events-auto md:left-1/2 md:right-auto md:w-[1280px] md:top-[72px] md:-translate-x-1/2"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {destinationMenu.map((group) => (
                      <div key={group.title}>
                        <h3 className="mb-6 font-display text-xl font-bold text-white">{group.title}</h3>
                        <ul className="space-y-3.5">
                          {group.items.map((item) => (
                            <li key={item.slug}>
                              <Link
                                to={`/destinations/${item.slug}`}
                                onClick={() => setDestinationsOpen(false)}
                                className="flex items-start gap-2.5 text-sm font-semibold leading-snug text-slate-200 transition-colors hover:text-[#a7d9d5]"
                              >
                                <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                                <span>{getDestinationLabel(item)}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {links.slice(1).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`group relative px-2 py-1 text-sm font-medium transition-all duration-200 ${isActive(link.to) ? 'text-[#a7d9d5]' : 'text-slate-300 hover:text-[#a7d9d5] hover:translate-y-[-2px] hover:scale-102'
                  }`}
              >
                {link.label}
                <span className="absolute -bottom-3 left-0 h-0.5 w-0 rounded-full bg-[#a7d9d5] transition-all duration-200 group-hover:w-full" />
                {isActive(link.to) && <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-[#a7d9d5] rounded-full" />}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div
                className="relative"
                onMouseEnter={openUserMenu}
                onMouseLeave={() => closeUserMenu(150)}
              >
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/20 border border-[#a7d9d5]/30 text-sky-300 hover:bg-sky-500/30 transition-all duration-200">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">{user.name}</span>
                </button>

                {showUserMenu && (
                  <div
                    onMouseEnter={openUserMenu}
                    onMouseLeave={() => closeUserMenu(120)}
                    className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700/60 rounded-lg shadow-xl backdrop-blur-md z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-slate-700/40">
                      <p className="text-xs text-slate-400">Logged in as</p>
                      <p className="text-sm font-semibold text-white">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="text-sm px-4 py-2 rounded-full border border-white/30 text-white bg-transparent hover:bg-[#a7d9d5]/10 hover:text-[#a7d9d5] transition-all duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="text-sm px-4 py-2 rounded-full bg-white text-slate-900 font-semibold shadow-lg hover:brightness-95 transition-all duration-200"
                >
                  Register
                </button>
              </>
            )}
          </div>

          <button
            className="group md:hidden text-tct-text transition-all duration-300 hover:scale-110 hover:text-tct-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="w-6 h-0.5 bg-current mb-1.5 transition-all duration-300 group-hover:w-7" />
            <div className="w-4 h-0.5 bg-current mb-1.5 transition-all duration-300 group-hover:w-6" />
            <div className="w-6 h-0.5 bg-current transition-all duration-300 group-hover:w-7" />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-slate-900/90 border-t border-slate-800/30 px-6 py-4 backdrop-blur-sm">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className={`block py-2.5 text-sm font-medium border-b border-tct-mid/50 transition-all duration-300 hover:translate-x-1 hover:text-tct-white ${isActive('/') ? 'text-tct-white' : 'text-tct-muted'
                }`}
            >
              Home
            </Link>
            {links.slice(1).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`block py-2.5 text-sm font-medium border-b border-tct-mid/50 last:border-0 transition-all duration-300 hover:translate-x-1 hover:text-tct-white ${isActive(link.to) ? 'text-tct-white' : 'text-tct-muted'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 mt-4">
              {user ? (
                <>
                  <div className="flex-1 px-3 py-2 bg-sky-500/20 border border-[#a7d9d5]/30 rounded-lg text-center">
                    <p className="text-xs text-slate-400">Logged in as</p>
                    <p className="text-sm font-semibold text-sky-300">{user.name}</p>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-500/20 border border-red-400/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => { navigate('/login'); setMenuOpen(false); }} className="btn-outline text-sm flex-1 py-2">Login</button>
                  <button onClick={() => { navigate('/register'); setMenuOpen(false); }} className="btn-primary text-sm flex-1 py-2">Register</button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
