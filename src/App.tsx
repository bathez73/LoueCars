import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import Brands from './pages/Brands';
import Workshop from './pages/Workshop';
import Contact from './pages/Contact';
import Vehicules from './pages/Vehicules';
import Privacy from './pages/Privacy';
import Legal from './pages/Legal';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { buildWhatsAppUrl } from './utils/whatsapp';
import AdminLogin from './admin/pages/AdminLogin';
import AdminLayout from './admin/components/AdminLayout';
import AdminMessages from './admin/pages/AdminMessages';
import Dashboard from './admin/pages/Dashboard';
import AdminMarques from './admin/pages/AdminMarques';
import AdminVehicules from './admin/pages/AdminVehicules';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin" replace />;
};

const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { lang, t } = useLanguage();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-zinc-800 text-gray-800 dark:text-white text-sm font-medium px-4 py-2 rounded-xl shadow-lg border border-gray-200 dark:border-zinc-700 whitespace-nowrap"
          >
            {t('hero_cta_whatsapp')} 👋
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={buildWhatsAppUrl({ type: 'floating_button' }, lang)}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Contacter sur WhatsApp"
        className="relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ background: '#25D366' }} />
        {/* WhatsApp icon */}
        <svg viewBox="0 0 48 48" className="w-8 h-8 relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M24 4C13 4 4 13 4 24c0 3.6 1 7 2.7 9.9L4 44l10.4-2.7C17.2 43 20.5 44 24 44c11 0 20-9 20-20S35 4 24 4zm0 36c-3.1 0-6-.8-8.5-2.3l-.6-.4-6.2 1.6 1.7-6-.4-.6C8.8 30.2 8 27.2 8 24c0-8.8 7.2-16 16-16s16 7.2 16 16-7.2 16-16 16zm8.8-11.8c-.5-.2-2.8-1.4-3.3-1.6-.4-.1-.8-.2-1.1.2-.4.5-1.3 1.6-1.6 2-.3.3-.6.4-1.1.1-.5-.2-2.1-.8-4-2.5-1.5-1.3-2.5-3-2.8-3.5-.3-.5 0-.7.2-1 .2-.2.5-.6.7-.9.2-.3.3-.5.4-.9.1-.3 0-.7-.1-.9-.1-.2-1.1-2.7-1.5-3.7-.4-1-.8-.8-1.1-.8h-.9c-.3 0-.8.1-1.3.6-.4.5-1.7 1.6-1.7 4s1.7 4.6 2 4.9c.2.3 3.4 5.2 8.2 7.3 1.1.5 2 .8 2.7 1 1.1.3 2.2.3 3 .2.9-.1 2.8-1.1 3.2-2.3.4-1.1.4-2 .3-2.2-.1-.2-.5-.4-1-.6z" fill="white"/>
        </svg>
      </motion.a>
    </div>
  );
};

function AppContent() {
  const { theme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <Routes>
      {/* Admin routes */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/*" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="marques" element={<AdminMarques />} />
        <Route path="vehicules" element={<AdminVehicules />} />
        <Route path="messages" element={<AdminMessages />} />
      </Route>

      {/* Client routes LoueCars */}
      <Route path="/*" element={
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
          <ScrollProgress />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/marques" element={<Brands />} />
              <Route path="/vehicules" element={<Vehicules />} />
              <Route path="/atelier" element={<Workshop />} />
              <Route path="/atelier-sav" element={<Workshop />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/confidentialite" element={<Privacy />} />
              <Route path="/mentions-legales" element={<Legal />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
          <BackToTop />
        </div>
      } />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ThemeProvider>
          <Router>
            <AppContent />
          </Router>
        </ThemeProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
