import { useState, useRef, useEffect } from 'react';
import { Plus, LogOut, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { destinationMenu } from '../data/destinationMenu';

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
    { label: 'Our Team', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'Travel Blog', to: '/travel-blog' },
    { label: 'Follow Us', to: '/socials' },

  ];

  const isActive = (to: string) => {
    if (to.startsWith('/#')) {
      return location.pathname === '/';
    }
    return location.pathname === to;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="w-full bg-[#173036]/95 backdrop-blur-md" style={{ overflow: 'visible' }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between sm:px-6 sm:py-3" style={{ overflow: 'visible' }}>
          <Link to="/" className="group flex items-center gap-2 sm:gap-3 transition-all duration-300 hover:gap-4">
            <img src="/logococnut.png" alt="TCT Logo" className="h-10 w-auto opacity-100 brightness-125 contrast-125 transition-transform duration-300 group-hover:scale-110 sm:h-12" />
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
                <Plus className={`h-4 w-4 transition-transform duration-200 ${destinationsOpen ? 'rotate-45' : ''}`} />
                <span className="absolute -bottom-3 left-0 h-0.5 w-0 rounded-full bg-[#a7d9d5] transition-all duration-200 group-hover:w-full" />
                {location.pathname.startsWith('/destinations') && (
                  <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-[#a7d9d5] rounded-full" />
                )}
              </button>

              {destinationsOpen && (
                <motion.div
                  onMouseEnter={openDropdown}
                  onMouseLeave={() => closeDropdownWithDelay(120)}
                  className="absolute left-0 top-full mt-2 border border-[#a7d9d5]/20 bg-[#173036] shadow-2xl z-50 pointer-events-auto w-max"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-6">
                    <div className="min-w-max">
                      {destinationMenu.map((group) => (
                        <motion.div
                          key={group.title}
                          className="group"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Category Header - Direct Link */}
                          <Link
                            to={`/destinations/${group.categorySlug}`}
                            onClick={() => setDestinationsOpen(false)}
                            className="flex items-center justify-between w-full px-4 py-3 hover:bg-[#a7d9d5]/10 transition-all duration-200 gap-3 group/link"
                          >
                            <span className="font-display text-base font-bold text-white group-hover/link:text-[#a7d9d5] transition-colors duration-200">
                              {group.title}
                            </span>
                            <motion.div
                              className="text-[#a7d9d5]/50 group-hover/link:text-[#a7d9d5] transition-colors duration-200"
                              whileHover={{ x: 4 }}
                            >
                            </motion.div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
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
              </>
            )}
          </div>

          <button
            className="group md:hidden rounded-none border border-white/15 bg-white/5 p-2 text-white shadow-lg shadow-black/20 transition-all duration-300 hover:scale-105 hover:bg-white/10"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <div className="w-6 h-0.5 bg-current mb-1.5 transition-all duration-300 group-hover:w-7" />
            <div className="w-4 h-0.5 bg-current mb-1.5 transition-all duration-300 group-hover:w-6" />
            <div className="w-6 h-0.5 bg-current transition-all duration-300 group-hover:w-7" />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#173036]/98 px-4 py-4 shadow-2xl shadow-black/30 backdrop-blur-md sm:px-6">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className={`block py-3 text-sm font-medium border-b border-white/10 transition-all duration-300 hover:translate-x-1 hover:text-[#a7d9d5] ${isActive('/') ? 'text-white' : 'text-white/75'
                }`}
            >
              Home
            </Link>
            
            {/* Mobile Destinations */}
            <div className="border-b border-white/10">
              <button
                onClick={() => setDestinationsOpen(!destinationsOpen)}
                className={`flex w-full items-center justify-between py-3 text-sm font-medium transition-all duration-300 hover:translate-x-1 hover:text-[#a7d9d5] ${location.pathname.startsWith('/destinations') ? 'text-white' : 'text-white/75'}`}
              >
                Destinations
                <Plus className={`h-4 w-4 transition-transform duration-200 ${destinationsOpen ? 'rotate-45' : ''}`} />
              </button>
              {destinationsOpen && (
                <div className="ml-4 flex flex-col pb-2">
                  {destinationMenu.map((group) => (
                    <Link
                      key={group.title}
                      to={`/destinations/${group.categorySlug}`}
                      onClick={() => { setMenuOpen(false); setDestinationsOpen(false); }}
                      className="py-2 text-sm text-white/60 transition-all duration-200 hover:translate-x-1 hover:text-[#a7d9d5]"
                    >
                      {group.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {links.slice(1).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`block py-3 text-sm font-medium border-b border-white/10 last:border-0 transition-all duration-300 hover:translate-x-1 hover:text-[#a7d9d5] ${isActive(link.to) ? 'text-white' : 'text-white/75'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <p className="mt-3 text-center text-xs leading-5 text-white/70">
              The Coconut Tree Trails curates memorable Sri Lanka journeys with local insight, smooth planning, and warm support.
            </p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
