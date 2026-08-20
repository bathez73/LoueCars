import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Wrench, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

interface Workshop {
  city: string;
  country: string;
  bigCountry: string;
  address: string;
  phone: string;
  hours: string;
  imageg: string;
  image: string;
  mapCoords: string;
  services: string[];
}

const Workshop = () => {
  const { t } = useLanguage();
  const workshops: Workshop[] = [
    { city: 'Cotonou', country: 'Bénin', bigCountry: 'BENIN', address: 'Boulevard de la Marina, Quartier Cadjèhoun, Cotonou', phone: '+229 21 00 00 00', hours: 'Lun-Sam: 8h00 - 18h00', imageg: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&q=80',image: 'https://www.goafricaonline.com/media/cache/resolve/w1200/uploads/media/company_media/0001/91/5e4e485a37c6b-nouveau-showroom-mig-benin.JPG', mapCoords: '6.3654,2.4183', services: ['Entretien général', 'Diagnostic électronique', 'Carrosserie', 'Climatisation'] },
    { city: 'Parakou', country: 'Bénin', bigCountry: 'BENIN', address: 'Route de Malanville, Quartier Banikanni, Parakou', phone: '+229 23 00 00 00', hours: 'Lun-Sam: 8h00 - 17h30', imageg: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80', image: 'https://www.goafricaonline.com/media/cache/resolve/w1200/uploads/media/company_media/0001/91/5e4e485a37c6b-nouveau-showroom-mig-benin.JPG', mapCoords: '9.3372,2.6303', services: ['Entretien véhicules', 'Vidange', 'Freinage', 'Pneus'] },
    { city: 'Lomé', country: 'Togo', bigCountry: 'TOGO', address: 'Avenue de la Libération, Quartier Bè, Lomé', phone: '+228 22 00 00 00', hours: 'Lun-Sam: 8h00 - 18h00', imageg: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80', image: 'https://www.goafricaonline.com/uploads/media/default/0004/30/65cceda32edf9-image-1.jpg', mapCoords: '6.1375,1.2123', services: ['Mécanique générale', 'Électricité auto', 'Diagnostic', 'SAV complet'] },
    { city: 'Ouagadougou', country: 'Burkina Faso', bigCountry: 'BURKINA-FASO', address: 'Avenue Kwame Nkrumah, Zone Industrielle, Ouagadougou', phone: '+226 25 00 00 00', hours: 'Lun-Sam: 7h30 - 17h30', imageg: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80', image: 'https://www.goafricaonline.com/uploads/media/company_media/0001/55/5c62a844df4da-facade-mig-motors-cfao-technology-benin.jpg', mapCoords: '12.3714,1.5197', services: ['Service rapide', 'Pièces détachées', 'Carrosserie', 'Peinture'] },
  ];


  // *******
 

  const services = [
    { icon: Wrench, title: 'Entretien Préventif', description: 'Vidange, filtres, courroies, freins - tout pour maintenir votre véhicule en parfait état.' },
    { icon: Shield, title: 'Garantie Constructeur', description: 'Interventions effectuées selon les normes constructeur pour préserver votre garantie.' },
    { icon: CheckCircle, title: 'Pièces Authentiques', description: 'Utilisation exclusive de pièces d\'origine pour une qualité optimale.' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Header */}
      {/* <section className="relative py-20 overflow-hidden bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1920&q=80" alt="Workshop" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
            <span className="inline-block px-4 py-2 bg-[#F05A1A]/20 border border-[#F05A1A]/30 rounded-full text-[#F47A45] text-sm font-medium mb-6">
              Service Après-Vente
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">Atelier & </span>
              <span className="gradient-text">SAV</span>
            </h1>
            <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Nos ateliers modernes et nos équipes d'experts sont à votre service pour l'entretien et la réparation de tous vos véhicules.
            </p>
          </motion.div>
        </div>
      </section> */}

      {/* Services Overview */}
      {/* <section className="py-20 bg-white dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Des Services <span className="gradient-text">Professionnels</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Équipements de pointe et techniciens certifiés pour un service irréprochable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
            {services.map((service, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -10 }}
                className="p-8 bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 rounded-3xl hover:border-[#F26831]/40 dark:hover:border-[#F05A1A]/30 transition-all duration-500 shadow-sm dark:shadow-none">
                <div className="w-16 h-16 bg-orange-50 dark:bg-gradient-to-br dark:from-[#F05A1A]/20 dark:to-[#C4440F]/20 rounded-2xl flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-[#F26831]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{service.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}




{/* ajoouttttttttttttttttttt*------------------------ */}


 {/* Workshops Grid */}
      <section className="py-10 bg-gray-50 dark:bg-transparent">
      
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#F05A1A]/10 dark:bg-[#F05A1A]/20 border border-[#F05A1A]/30 rounded-full text-[#F05A1A] dark:text-[#F47A45] text-sm font-medium mb-6">
              {t('ws_badge')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('ws_title')} <span className="gradient-text">{t('ws_title_highlight')}</span> {t('ws_title_rest')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              {t('ws_subtitle')}
            </p> <br/>  <br/>
            {/* <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
               <span className="gradient-text">BENIN</span> 
            </h2> */}
          </motion.div>
              
          <div className="space-y-12">
            {workshops.map((workshop, index) => (
              <div key={workshop.city}>
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  <span className="gradient-text">{workshop.bigCountry}</span>
                </motion.h2>
                <motion.div initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                  className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-6 sm:gap-8 items-stretch`}>

                {/* Image */}
                <motion.div whileHover={{ scale: 1.02 }} className="lg:w-1/2 relative group">
                  <div className="relative h-80 lg:h-full min-h-[320px] rounded-3xl overflow-hidden">
                    <img src={workshop.image} alt={`Atelier ${workshop.city}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="w-5 h-5 text-[#F26831]" />
                        <span className="text-white font-semibold text-lg">{workshop.city}, {workshop.country}</span>
                      </div>
                      <p className="text-gray-300 text-sm">{workshop.address}</p>
                    </div>
                    <motion.div initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
                      className="absolute top-6 right-6 px-4 py-2 bg-gradient-to-r from-[#F05A1A] to-[#D44D12] rounded-full text-white text-sm font-medium shadow-lg">
                      {t('ws_showroom')} {workshop.city}
                    </motion.div>
                  </div>
                </motion.div>

                {/* Info */}
                <div className="lg:w-1/2 flex flex-col justify-center">
                  <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 h-full shadow-sm dark:shadow-none">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                      <span className="w-8 h-0.5 bg-[#F05A1A] mr-3" />{t('ws_approved')} {workshop.city}
                    </h3>
                    <div className="space-y-4 mb-8">
                      {[
                        { icon: MapPin, label: t('ws_address'), value: workshop.address },
                        { icon: Phone, label: t('ws_phone'), value: workshop.phone },
                        { icon: Clock, label: t('ws_hours'), value: workshop.hours },
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-center space-x-5">
                          <div className="w-7 h-7 bg-gray-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-[#F26831]" />
                          </div>
                          <div>
                            <p className="text-gray-400 dark:text-gray-500 text-sm">{label}</p>
                            <p className="text-gray-800 dark:text-gray-200">{value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
 {/* arriere plan atelier*/}                   <div className="mb-8  h-80"> 
                       <div className="relative h-80 lg:h-full min-h-[320px] rounded-3xl overflow-hidden">
                    <img src={workshop.imageg} alt={`Atelier ${workshop.city}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="w-5 h-5 text-[#F26831]" />
                        <span className="text-white font-semibold text-lg">{workshop.city}, {workshop.country}</span>
                      </div>
                      <div className="text-white text-sm">
                        <p className="text-white/80 text-sm mb-3">{t('ws_services_label')}</p>
                        <div className="flex flex-wrap gap-2">
                          {workshop.services.map((service, idx) => (
                            <span key={idx} className="px-3 py-1 backdrop-blur-md bg-white/15 border border-white/25 rounded-full text-white text-sm">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* <motion.div initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
                      className="absolute top-6 right-6 px-4 py-2 bg-gradient-to-r from-[#F05A1A] to-[#D44D12] rounded-full text-white text-sm font-medium shadow-lg">
                      Showroom {workshop.city}
                    </motion.div> */}
                  </div>
                      
                    </div>

                    {/* map-----------------------map */}
                    <a href={`https://www.google.com/maps?q=${workshop.mapCoords}`} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-[#F26831] hover:text-[#F05A1A] transition-colors">
                      <MapPin className="w-4 h-4" />
                      <span>{t('ws_maps')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                  
                </div>
                

              </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>














      {/* CTA */}
      <section className="py-20 bg-white dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 p-6 sm:p-12 text-center">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('ws_cta_title')} <span className="gradient-text">{t('ws_cta_title_highlight')}</span> ?
              </h3>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                {t('ws_cta_subtitle')}
              </p>
              <Link to="/contact"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-[#F05A1A] to-[#D44D12] text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-[#F05A1A]/30 transition-all duration-300">
                <span>{t('ws_cta_btn')}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Workshop;
