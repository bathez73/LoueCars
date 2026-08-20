import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Car, Truck, Bike, Fuel, Settings } from 'lucide-react';
import { getMarques, getVehicules, type Marque } from '../utils/store';
import { useLanguage } from '../context/LanguageContext';
import { buildWhatsAppUrl } from '../utils/whatsapp';

const Brands = () => {
  const { t, lang } = useLanguage();
  const [selectedBrand, setSelectedBrand] = useState<Marque | null>(null);
  const brands = getMarques();
  const allVehicules = getVehicules();

  const getIcon = (type: string) => {
    if (type.includes('Camions') || type.includes('Poids')) return Truck;
    if (type.includes('Deux-roues')) return Bike;
    return Car;
  };
const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const getBrandVehicules = (marqueId: string) =>
    allVehicules.filter(v => v.marqueId === marqueId && v.statut !== 'vendu');

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Header */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#F05A1A] via-[#D44D12] to-[#F05A1A] dark:from-zinc-900 dark:via-black dark:to-zinc-900 brand-banner">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 dark:bg-[#F05A1A]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 dark:bg-gray-600/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
            <span className="inline-block px-4 py-2 bg-white/15 border border-white/30 text-white dark:bg-[#F05A1A]/20 dark:border-[#F05A1A]/30 dark:text-[#F47A45] text-sm font-medium mb-6">
              {t('brands_badge')}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">{t('brands_title')} </span>
              <span className="gradient-text">{t('brands_title_highlight')}</span>
            </h1>
            <p className="text-base sm:text-xl text-white/90 dark:text-gray-300 max-w-2xl mx-auto">
              {t('brands_subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-20 bg-white dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12 justify-items-center">
            {brands.map((brand, index) => {
              const Icon = getIcon(brand.type);
              const count = getBrandVehicules(brand.id).length;
              return (
                <motion.div
                  key={brand.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, type: 'spring', bounce: 0.4 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setSelectedBrand(brand)}
                  className="cursor-pointer group"
                >
                  <div className="brand-circle relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full bg-gray-100 dark:bg-zinc-900 border-2 border-gray-200 dark:border-zinc-700 hover:border-[#F26831] dark:hover:border-[#F05A1A]/50 flex flex-col items-center justify-center p-4 sm:p-6 transition-all duration-500 shadow-sm dark:shadow-none">
                    <div className="absolute inset-0 rounded-full bg-[#F05A1A]/0 group-hover:bg-[#F05A1A]/5 dark:group-hover:bg-[#F05A1A]/10 transition-all duration-500" />
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 mb-2 flex items-center justify-center">
                        {brand.logo ? (
                          <img src={brand.logo} alt={brand.nom}
                            className="max-w-full max-h-full object-contain filter brightness-0 dark:invert opacity-70 group-hover:opacity-100 transition-opacity"
                            onError={e => { e.currentTarget.style.display = 'none'; }} />
                        ) : (
                          <Icon className="w-12 h-12 text-gray-400" />
                        )}
                      </div>
                      <span className="text-gray-800 dark:text-white font-semibold text-sm md:text-base text-center">{brand.nom}</span>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest">{brand.type}</span>
                    {count > 0 && (
                      <p className="text-xs text-[#F26831] mt-1">{count} {count > 1 ? t('brands_vehicle_count_plural') : t('brands_vehicle_count_single')}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedBrand && (() => {
          const vehicules = getBrandVehicules(selectedBrand.id);
          const Icon = getIcon(selectedBrand.type);
          return (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
              onClick={() => setSelectedBrand(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                transition={{ type: 'spring', bounce: 0.3 }}
                className="relative w-full max-w-[95vw] max-h-[95vh] overflow-y-auto bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-3xl shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <button onClick={() => setSelectedBrand(null)}
                  className="absolute top-5 right-5 z-10 w-10 h-10 bg-gray-100 dark:bg-zinc-800 hover:bg-[#F05A1A] rounded-full flex items-center justify-center transition-colors duration-300 group">
                  <X className="w-5 h-5 text-gray-600 dark:text-white group-hover:text-white" />
                </button>

                <div className="p-5 sm:p-8">
                  {/* Header marque */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 p-4 sm:p-5 rounded-2xl bg-white/50 dark:bg-white/5 border border-gray-200/70 dark:border-zinc-700/60 backdrop-blur-md">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-800 rounded-2xl p-3 flex items-center justify-center flex-shrink-0">
                      {selectedBrand.logo
                        ? <img src={selectedBrand.logo} alt={selectedBrand.nom} className="w-full h-full object-contain filter brightness-0 dark:invert" />
                        : <Icon className="w-8 h-8 text-gray-400" />}
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{selectedBrand.nom}</h2>
                      <span className="inline-block mt-1 px-3 py-1 bg-[#F05A1A]/10 dark:bg-[#F05A1A]/20 border border-[#F05A1A]/30 rounded-full text-[#F05A1A] dark:text-[#F47A45] text-xs">
                        {selectedBrand.type}
                      </span>
                    </div>
                  </div>

                  {selectedBrand.description && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-8">{selectedBrand.description}</p>
                  )}

                  {/* Véhicules */}
                  {/* <div className="flex items-center gap-3 mb-5">
                    <span className="w-8 h-0.5 bg-[#F05A1A]" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Véhicules disponibles
                      {vehicules.length > 0 && <span className="ml-2 text-sm text-gray-400 font-normal">({vehicules.length})</span>}
                    </h3>
                  </div> */}

                  {vehicules.length === 0 ? (
  <div className="text-center py-12 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl">
    <Car className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
    <p className="text-gray-400 text-sm">{t('brands_none')}</p>
  </div>
) : (
  <div className="relative group mb-8">
    {/* Conteneur principal de l'image unique */}
    <div className="relative h-64 sm:h-[700px] w-full bg-gray-100 dark:bg-zinc-800 rounded-3xl overflow-hidden border border-gray-200 dark:border-zinc-700 aspect-video ">
      <AnimatePresence mode="wait">
        <motion.div
          key={vehicules[currentImageIndex].id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          {vehicules[currentImageIndex].image ? (
            <img 
              src={vehicules[currentImageIndex].image} 
              alt={vehicules[currentImageIndex].nom}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Car className="w-20 h-20 text-gray-300" />
            </div>
          )}
          
          {/* Overlay d'infos sur l'image */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <h4 className="text-white text-xl font-bold">{vehicules[currentImageIndex].nom}</h4>
            <p className="text-[#F47A45] font-semibold">{vehicules[currentImageIndex].prix} FCFA</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Boutons de Navigation */}
      {vehicules.length > 1 && (
        <>
          <button 
            onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? vehicules.length - 1 : prev - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
          </button>
          <button 
            onClick={() => setCurrentImageIndex((prev) => (prev === vehicules.length - 1 ? 0 : prev + 1))}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>

    {/* Indicateurs (Petits points) */}
    <div className="flex justify-center gap-2 mt-4">
      {vehicules.map((_, i) => (
        <button
          key={i}
          onClick={() => setCurrentImageIndex(i)}
          className={`h-1.5 transition-all rounded-full ${i === currentImageIndex ? 'w-8 bg-[#F05A1A]' : 'w-2 bg-gray-300 dark:bg-zinc-700'}`}
        />
      ))}
    </div>
  </div>
)}



                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-3 p-4 sm:p-5 mt-6 rounded-2xl bg-white/50 dark:bg-white/5 border border-gray-200/70 dark:border-zinc-700/60 backdrop-blur-md">
                    <a href={buildWhatsAppUrl({
                        type: 'brand_quote',
                        brandName: selectedBrand.nom,
                        brandType: selectedBrand.type,
                      }, lang)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex-1 px-6 py-3 bg-gradient-to-r from-[#F05A1A] to-[#D44D12] text-white font-semibold rounded-full flex items-center justify-center space-x-2 hover:shadow-xl hover:shadow-[#F05A1A]/30 transition-all">
                      <span>{t('brands_quote')}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a href="/contact"
                      className="flex-1 px-6 py-3 bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-800 dark:text-white font-semibold rounded-full text-center hover:border-[#F26831]/50 transition-all">
                      {t('brands_showroom')}
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
};

export default Brands;
