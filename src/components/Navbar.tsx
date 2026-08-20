import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage, type Lang } from '../context/LanguageContext';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import logoDark from '../assets/logo_darkmode.png';
import logoLight from '../assets/logo_whitemode.png';

const LANGUAGES: { code: Lang; flag: string }[] = [
  { code: 'FR', flag: '🇫🇷' },
  { code: 'EN', flag: '🇬🇧' },
  { code: 'ES', flag: '🇪🇸' },
  { code: 'DE', flag: '🇩🇪' },
  { code: 'ZH', flag: '🇨🇳' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { lang: currentLang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 150) {
        setHideNav(true);
      } else {
        setHideNav(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ferme le dropdown si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: t('nav_home'), path: '/' },
    { name: t('nav_vehicles'), path: '/vehicules' },
    { name: t('nav_workshop'), path: '/atelier' },
    { name: t('nav_contact'), path: '/contact' },
  ];

  return (
    <>
      <motion.nav
      initial={{ y: -100 }}
      animate={{ y: hideNav && !isOpen ? '-100%' : 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || theme === 'light' ? 'glass-effect shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src={theme === 'dark' ? logoDark : logoLight}
              alt="LoueCars"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={link.path}
                  className={`relative px-5 py-2 text-sm font-medium transition-all duration-300 rounded-full group ${
                    location.pathname === link.path
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {location.pathname === link.path && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-[#F05A1A]/10 dark:bg-[#F05A1A]/20 border border-[#F05A1A]/30 rounded-full"
                      transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Theme Toggle + CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="hidden md:flex items-center gap-3"
          >
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700 flex items-center justify-center transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark'
                ? <Sun className="w-5 h-5 text-yellow-400" />
                : <Moon className="w-5 h-5 text-zinc-500" />
              }
            </button>
            <a
              href={buildWhatsAppUrl({ type: 'navbar_book' }, currentLang)}
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-6 py-3 bg-gradient-to-r from-[#F05A1A] to-[#D44D12] text-white text-sm font-semibold rounded-full overflow-hidden group shadow-lg shadow-[#F05A1A]/30 hover:shadow-[#F05A1A]/50 transition-shadow duration-300"
            >
              <span className="relative z-10">{t('nav_book')}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#D44D12] to-[#B33D0D] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>

            {/* Language Switcher */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 hover:border-[#F05A1A]/50 transition-all duration-300 text-sm font-semibold text-gray-700 dark:text-gray-200"
              >
                <span>{LANGUAGES.find(l => l.code === currentLang)?.flag}</span>
                <span>{currentLang}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 glass-soft rounded-2xl shadow-xl overflow-hidden z-50 min-w-[100px]"
                  >
                    {LANGUAGES.map(({ code, flag }) => (
                      <button
                        key={code}
                        onClick={() => { setLang(code); setLangOpen(false); }}
                        className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors duration-150
                          ${currentLang === code
                            ? 'bg-[#F05A1A]/10 text-[#F05A1A] font-semibold'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800'
                          }`}
                      >
                        <span className="text-base">{flag}</span>
                        <span>{code}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Mobile: Theme Toggle + Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 flex items-center justify-center"
            >
              {theme === 'dark'
                ? <Sun className="w-4 h-4 text-yellow-400" />
                : <Moon className="w-4 h-4 text-zinc-500" />
              }
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <motion.div className="glass-soft mx-4 mb-4 rounded-2xl overflow-hidden">
              <div className="px-4 py-6 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                      location.pathname === link.path
                        ? 'bg-[#F05A1A]/10 text-[#F05A1A] border-l-4 border-[#F05A1A]'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {/* CTA WhatsApp mobile */}
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: navLinks.length * 0.1 }}>
                <a
                  href={buildWhatsAppUrl({ type: 'navbar_book' }, currentLang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-xl text-center font-semibold bg-gradient-to-r from-[#F05A1A] to-[#D44D12] text-white transition-all duration-300"
                >
                  {t('nav_book')}
                </a>
              </motion.div>

              {/* Sélecteur de langue mobile */}
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (navLinks.length + 1) * 0.1 }} className="pt-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest px-4 pb-2">{t('lang_label')}</p>
                <div className="grid grid-cols-5 gap-1.5">
                  {LANGUAGES.map(({ code, flag }) => (
                    <button
                      key={code}
                      onClick={() => { setLang(code); setIsOpen(false); }}
                      className={`flex flex-col items-center justify-center gap-1 px-1 py-2 rounded-xl text-sm font-semibold transition-colors duration-150 ${
                        currentLang === code
                          ? 'bg-[#F05A1A]/10 text-[#F05A1A] border border-[#F05A1A]/30'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <span className="text-lg leading-none">{flag}</span>
                      <span className="text-[10px]">{code}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
    </>
  );
};

export default Navbar;
