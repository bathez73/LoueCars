import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import logoDark from '../assets/logo_darkmode.png';

const Footer = () => {
  const { t, lang } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-zinc-900 dark:bg-gradient-to-b dark:from-zinc-900 dark:to-black pt-20 pb-8 overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#F05A1A]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-600/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-16">
          {/* Brand */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <img
                src={logoDark}
                alt="LoueCars"
                className="h-12 w-auto object-contain mix-blend-screen"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t('footer_desc')}
            </p>
            <div className="flex space-x-4">
              <motion.a href="https://www.facebook.com/LoueCars-215666815835395/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, y: -3 }}
                className="w-10 h-10 bg-zinc-800 hover:bg-gradient-to-r hover:from-[#F05A1A] hover:to-[#D44D12] rounded-full flex items-center justify-center transition-all duration-300 group">
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </motion.a>
              <motion.a href="https://instagram.com/229louecars" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, y: -3 }}
                className="w-10 h-10 bg-zinc-800 hover:bg-gradient-to-r hover:from-[#F05A1A] hover:to-[#D44D12] rounded-full flex items-center justify-center transition-all duration-300 group">
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </motion.a>
              <motion.a href={buildWhatsAppUrl({ type: 'footer_social' }, lang)} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, y: -3 }}
                className="w-10 h-10 bg-zinc-800 hover:bg-gradient-to-r hover:from-[#F05A1A] hover:to-[#D44D12] rounded-full flex items-center justify-center transition-all duration-300 group">
                <Phone className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </motion.a>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <h4 className="text-white font-semibold text-lg mb-6 flex items-center">
              <span className="w-8 h-0.5 bg-[#F05A1A] mr-3" />{t('footer_nav')}
            </h4>
            <ul className="space-y-3">
              {[
                { label: t('nav_home'), path: '/' },
                { label: t('nav_vehicles'), path: '/vehicules' },
                { label: t('nav_workshop'), path: '/atelier' },
                { label: t('nav_contact'), path: '/contact' },
              ].map((link, index) => (
                <li key={index}>
                  <Link to={link.path}
                    className="text-gray-400 hover:text-[#F47A45] transition-colors duration-300 flex items-center group">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-[#F05A1A] mr-0 group-hover:mr-2 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h4 className="text-white font-semibold text-lg mb-6 flex items-center">
              <span className="w-8 h-0.5 bg-[#F05A1A] mr-3" />{t('footer_services')}
            </h4>
            <ul className="space-y-3">
              {[
                t('footer_svc1'),
                t('footer_svc2'),
                t('footer_svc3'),
                t('footer_svc4'),
                t('footer_svc5'),
                t('footer_svc6'),
              ].map((service, index) => (
                <li key={index}>
                  <Link to="/vehicules" className="text-gray-400 hover:text-[#F47A45] transition-colors duration-300 flex items-center group">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-[#F05A1A] mr-0 group-hover:mr-2 transition-all duration-300" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
            <h4 className="text-white font-semibold text-lg mb-6 flex items-center">
              <span className="w-8 h-0.5 bg-[#F05A1A] mr-3" />{t('footer_contact')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#F26831] mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Houéyiho, Cotonou, Bénin</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#F26831] flex-shrink-0" />
                <a href={buildWhatsAppUrl({ type: 'footer_contact' }, lang)} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#F47A45] text-sm transition-colors">+229 97 23 84 83</a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#F26831] flex-shrink-0" />
                <span className="text-gray-400 text-sm">+229 66 21 89 56</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#F26831] flex-shrink-0" />
                <a href="mailto:eddiecelle@gmail.com" className="text-gray-400 hover:text-[#F47A45] text-sm transition-colors">eddiecelle@gmail.com</a>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-zinc-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">© {currentYear} LoueCars. {t('footer_rights')}</p>
            <div className="flex space-x-6">
              <Link to="/confidentialite" className="text-gray-500 hover:text-[#F47A45] text-sm transition-colors">{t('footer_privacy')}</Link>
              <Link to="/mentions-legales" className="text-gray-500 hover:text-[#F47A45] text-sm transition-colors">{t('footer_legal')}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
