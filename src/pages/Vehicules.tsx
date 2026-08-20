import { useState, useRef, useLayoutEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Car, Fuel, Settings, Search, Filter } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getVehicules, getMarques } from '../utils/store';
import { useLanguage } from '../context/LanguageContext';
import { buildWhatsAppUrl } from '../utils/whatsapp';

gsap.registerPlugin(ScrollTrigger);

const Vehicules = () => {
  const { t, lang } = useLanguage();
  const vehicules = getVehicules().filter(v => v.statut !== 'vendu');
  const marques = getMarques();
  const [search, setSearch] = useState('');
  const [filterMarque, setFilterMarque] = useState('');
  const [filterCarburant, setFilterCarburant] = useState('');
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.vehicule-card');
      cards.forEach(card => {
        const enter = () => {
          gsap.to(card, { scale: 1.04, zIndex: 10, duration: 0.35, ease: 'power2.out' });
          const prev = card.previousElementSibling;
          const next = card.nextElementSibling;
          if (prev) gsap.to(prev, { x: -16, rotate: -2.5, scale: 0.97, duration: 0.35, ease: 'power2.out' });
          if (next) gsap.to(next, { x: 16, rotate: 2.5, scale: 0.97, duration: 0.35, ease: 'power2.out' });
        };
        const leave = () => {
          gsap.to(card, { scale: 1, zIndex: 1, duration: 0.35, ease: 'power2.out' });
          const prev = card.previousElementSibling;
          const next = card.nextElementSibling;
          if (prev) gsap.to(prev, { x: 0, rotate: 0, scale: 1, duration: 0.35, ease: 'power2.out' });
          if (next) gsap.to(next, { x: 0, rotate: 0, scale: 1, duration: 0.35, ease: 'power2.out' });
        };
        card.addEventListener('mouseenter', enter);
        card.addEventListener('mouseleave', leave);
      });
    }, gridRef);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const filtered = vehicules.filter(v => {
    const marque = marques.find(m => m.id === v.marqueId);
    const matchSearch = v.nom.toLowerCase().includes(search.toLowerCase()) || marque?.nom.toLowerCase().includes(search.toLowerCase());
    const matchMarque = filterMarque ? v.marqueId === filterMarque : true;
    const matchCarburant = filterCarburant ? v.carburant === filterCarburant : true;
    return matchSearch && matchMarque && matchCarburant;
  });

  const carburants = [...new Set(vehicules.map(v => v.carburant))];

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Header */}
      <section className="relative py-16 sm:py-20 overflow-hidden bg-gradient-to-br from-[#F05A1A] via-[#D44D12] to-[#F05A1A] dark:from-zinc-900 dark:via-black dark:to-zinc-900 brand-banner">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 dark:bg-[#F05A1A]/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
            <span className="inline-block px-4 py-2 bg-white/15 border border-white/30 text-white dark:bg-[#F05A1A]/20 dark:border-[#F05A1A]/30 dark:text-[#F47A45] text-sm font-medium mb-6">
              {t('veh_badge')}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">{t('veh_title')} </span>
              <span className="gradient-text">{t('veh_title_highlight')}</span>
            </h1>
            <p className="text-base sm:text-xl text-white/90 dark:text-gray-300 max-w-2xl mx-auto">
              {t('veh_subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filtres */}
      <section className="py-8 glass-effect sticky top-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={t('veh_search')}
                className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl py-2.5 pl-10 pr-4 text-gray-900 dark:text-white placeholder-gray-400 focus:border-[#F26831] outline-none text-sm" />
            </div>
            <div className="flex gap-3">
              <select value={filterMarque} onChange={e => setFilterMarque(e.target.value)}
                className="bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl py-2.5 px-4 text-gray-900 dark:text-white focus:border-[#F26831] outline-none text-sm appearance-none cursor-pointer">
                <option value="">{t('veh_all_brands')}</option>
                {marques.map(m => <option key={m.id} value={m.id}>{m.nom}</option>)}
              </select>
              <select value={filterCarburant} onChange={e => setFilterCarburant(e.target.value)}
                className="bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl py-2.5 px-4 text-gray-900 dark:text-white focus:border-[#F26831] outline-none text-sm appearance-none cursor-pointer">
                <option value="">{t('veh_fuel')}</option>
                {carburants.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <p className="text-gray-400 text-xs mt-2 flex items-center gap-1">
            <Filter className="w-3 h-3" /> {filtered.length} {filtered.length > 1 ? t('veh_found_plural') : t('veh_found_single')}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 bg-white dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Car className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg">{t('veh_none')}</p>
            </div>
          ) : (
            <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((v, i) => {
                const marque = marques.find(m => m.id === v.marqueId);
                return (
                  <motion.div key={v.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }} whileHover={{ y: -6 }}
                    className="vehicule-card bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:border-[#F26831]/40 dark:hover:border-[#F05A1A]/30 transition-all duration-300 group h-full relative">
                    {/* Image */}
                    <div className="relative h-48 bg-gray-100 dark:bg-zinc-800 overflow-hidden">
                      {v.image
                        ? <img src={v.image} alt={v.nom} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        : <div className="w-full h-full flex items-center justify-center"><Car className="w-12 h-12 text-gray-300 dark:text-gray-600" /></div>
                      }
                      <div className="absolute top-3 left-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium backdrop-blur-md ${
                          v.statut === 'disponible' ? 'bg-green-500/75 text-white' : 'bg-yellow-500/75 text-white'
                        }`}>{v.statut}</span>
                      </div>
                      {marque?.logo && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-white dark:bg-zinc-800 rounded-lg p-1 flex items-center justify-center">
                          <img src={marque.logo} alt={marque.nom} className="w-full h-full object-contain filter brightness-0 dark:invert" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <p className="text-gray-400 dark:text-gray-500 text-xs mb-1">{marque?.nom} • {v.annee}</p>
                      <h3 className="text-gray-900 dark:text-white font-semibold text-base mb-3">{v.nom}</h3>

                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-xs">
                          <Fuel className="w-3.5 h-3.5 text-[#F26831]" /> {v.carburant}
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-xs">
                          <Settings className="w-3.5 h-3.5 text-[#F26831]" /> {v.transmission}
                        </div>
                        {v.couleur && (
                          <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-xs col-span-2">
                            <span className="w-3.5 h-3.5 rounded-full border border-gray-300 dark:border-zinc-600 flex-shrink-0" style={{ backgroundColor: v.couleur.toLowerCase() === 'blanc' ? '#fff' : v.couleur.toLowerCase() === 'noir' ? '#000' : v.couleur.toLowerCase() === 'rouge' ? '#dc2626' : v.couleur.toLowerCase() === 'bleu' ? '#2563eb' : '#9ca3af' }} />
                            {v.couleur}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-zinc-800">
                        <p className="text-gray-900 dark:text-white font-bold text-sm">{v.prix} <span className="text-xs font-normal text-gray-400">FCFA</span></p>
                        <a
                          href={buildWhatsAppUrl({
                            type: 'vehicle_book',
                            vehicleName: v.nom,
                            vehiclePrice: v.prix,
                            vehicleMarque: marque?.nom,
                          }, lang)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-gradient-to-r from-[#F05A1A] to-[#D44D12] text-white text-xs font-semibold rounded-lg hover:shadow-md hover:shadow-[#F05A1A]/30 transition-all">
                          {t('veh_book')}
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Vehicules;
