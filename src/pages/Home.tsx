import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, Shield, Clock, Plane, Globe, Star, ArrowRight, Car, Users, MapPin } from 'lucide-react';
import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONFIG } from '../utils/config';
import { getMarques } from '../utils/store';
import { useLanguage } from '../context/LanguageContext';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import MagneticButton from '../components/MagneticButton';
import Marquee from '../components/Marquee';

gsap.registerPlugin(ScrollTrigger);

if (typeof window !== 'undefined') {
  (window as unknown as { __gsap: typeof gsap }).__gsap = gsap;
  (window as unknown as { __ST: typeof ScrollTrigger }).__ST = ScrollTrigger;
}

// heroLines are now defined inside Home to access t()
const RotatingHeroText = ({ lines }: { lines: { top: string; bottom: string }[] }) => {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % lines.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [lines.length, prefersReducedMotion]);

  return (
    <div className="relative mb-4 sm:mb-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block text-gray-900 dark:text-white">{lines[index].top}</span>
          <span className="block gradient-text">{lines[index].bottom}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Home = () => {
  const { t, lang } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const flotteRef = useRef<HTMLElement>(null);
  const flotteTrackRef = useRef<HTMLDivElement>(null);

  // --- Animations GSAP ---
  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      // Héro : timeline d'entrée
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-bg', { scale: 1.2, duration: 2.2, ease: 'power2.out' })
        .from('.hero-badge', { y: 40, opacity: 0, duration: 0.7 }, '-=1.4')
        .from('.hero-title', { y: 60, opacity: 0, duration: 0.9 }, '-=0.4')
        .from('.hero-sub-word', { y: 40, opacity: 0, stagger: 0.04, duration: 0.6 }, '-=0.5')
        .from('.hero-cta', { y: 30, opacity: 0, stagger: 0.12, duration: 0.6 }, '-=0.3');

      // Héro : parallax multi-couches au scroll
      gsap.to('.hero-bg', {
        yPercent: 35,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.hero-content', {
        opacity: 0,
        yPercent: -25,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });

      // Fond multi-couches : parallax sur toutes les images de fond
      gsap.utils.toArray('[data-parallax]').forEach((img) => {
        const speed = parseFloat((img as HTMLElement).dataset.parallax || '1.5');
        gsap.fromTo(
          img,
          { yPercent: -speed * 10 },
          {
            yPercent: speed * 10,
            ease: 'none',
            scrollTrigger: { trigger: (img as HTMLElement).closest('section'), start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      });

      // Stats : révélation + compteurs GSAP
      gsap.utils.toArray('.stat-card').forEach((card) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        });
        const valueEl = (card as HTMLElement).querySelector('.stat-value');
        if (valueEl) {
          gsap.fromTo(
            valueEl,
            { innerText: 0 },
            {
              innerText: parseInt(valueEl.dataset.target || '0', 10),
              snap: { innerText: 1 },
              duration: 1.8,
              ease: 'power1.out',
              scrollTrigger: { trigger: card, start: 'top 88%', once: true },
            }
          );
        }
      });

      // Services : révélation clip-path + stagger des cartes
      gsap.from('.services-inner', {
        clipPath: 'inset(0 0 100% 0)',
        duration: 1,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: servicesRef.current, start: 'top 75%', once: true },
      });
      gsap.from('.services-card', {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: servicesRef.current, start: 'top 70%', once: true },
      });

      // Marquee infini : deux sens opposés, plus rapide
      gsap.to('.marquee-track.marquee-left', {
        xPercent: -50,
        ease: 'none',
        repeat: -1,
        duration: 16,
      });
      gsap.fromTo('.marquee-track.marquee-right', { xPercent: -50 }, {
        xPercent: 0,
        ease: 'none',
        repeat: -1,
        duration: 16,
      });

      // Flotte : section à scroll horizontal (pinned)
      const track = flotteTrackRef.current;
      const getDist = () => track ? track.scrollWidth - window.innerWidth : 0;
      gsap.to(track, {
        x: () => -getDist(),
        ease: 'none',
        scrollTrigger: {
          trigger: flotteRef.current,
          start: 'top top',
          end: () => `+=${getDist()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // CTA : révélation du panneau
      gsap.from('.cta-panel', {
        clipPath: 'inset(0 0 100% 0)',
        scale: 0.96,
        duration: 1,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: '.cta-section', start: 'top 75%', once: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const heroLines = [
    { top: t('hero_line1_top'), bottom: t('hero_line1_bottom') },
    { top: t('hero_line2_top'), bottom: t('hero_line2_bottom') },
    { top: t('hero_line3_top'), bottom: t('hero_line3_bottom') },
  ];

  const features = [
    {
      icon: Shield,
      title: t('service1_title'),
      description: t('service1_desc'),
    },
    {
      icon: Plane,
      title: t('service2_title'),
      description: t('service2_desc'),
    },
    {
      icon: Globe,
      title: t('service3_title'),
      description: t('service3_desc'),
    },
    {
      icon: Clock,
      title: t('service4_title'),
      description: t('service4_desc'),
    },
  ];

  const flotte = [
    { label: 'Toyota Corolla Cross', desc: 'SUV', img: `${CONFIG.louecarsBaseUrl}/wp-content/uploads/2026/08/louecars-toyota-showroom.jpeg` },
    { label: 'Nissan Hardbody', desc: 'Pick-up', img: `${CONFIG.louecarsBaseUrl}/wp-content/uploads/2023/01/WhatsApp-Image-2023-01-09-at-08.17.09.jpeg` },
    { label: 'Dacia Duster', desc: '4×4 / 4×2', img: `${CONFIG.louecarsBaseUrl}/wp-content/uploads/2023/01/WhatsApp-Image-2023-01-09-at-08.16.36.jpeg` },
    { label: 'Suzuki Grand Vitara', desc: 'SUV', img: `${CONFIG.louecarsBaseUrl}/wp-content/uploads/2023/09/IMG-20230831-WA0005.jpg` },
    { label: 'Toyota Fortuner', desc: 'SUV 4×4', img: `${CONFIG.louecarsBaseUrl}/wp-content/uploads/2023/01/WhatsApp-Image-2023-01-09-at-08.29.46.jpeg` },
    { label: 'Toyota Prado', desc: '7 places', img: `${CONFIG.louecarsBaseUrl}/wp-content/uploads/2023/01/WhatsApp-Image-2023-01-09-at-08.29.46-1.jpeg` },
    { label: 'Toyota Hiace', desc: '15 places', img: `${CONFIG.louecarsBaseUrl}/wp-content/uploads/2023/01/WhatsApp-Image-2023-01-09-at-08.29.49-1.jpeg` },
    { label: 'Suzuki Ertiga', desc: '7 places', img: `${CONFIG.louecarsBaseUrl}/wp-content/uploads/2023/09/IMG-20230831-WA0004.jpg` },
  ];

  const stats = [
    { icon: Car, value: 13, suffix: '+', label: t('stat_vehicles') },
    { icon: Users, value: 7, suffix: 'j/7', label: t('stat_availability') },
    { icon: MapPin, value: 3, suffix: '+', label: t('stat_countries') },
    { icon: Star, value: 20, suffix: 'k', label: t('stat_price') },
  ];

  const marques = getMarques();

  return (
    <div ref={rootRef} className="min-h-screen" style={{ fontFamily: 'Poppins, sans-serif' }}>

      {/* Hero */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <div className="hero-bg absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/70 to-white/80 dark:from-black dark:via-zinc-900 dark:to-black" />
          <div className="absolute inset-0 opacity-100">
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80"
              alt="LoueCars - Location de véhicules au Bénin"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/50 to-transparent dark:from-black dark:via-black/60 dark:to-transparent" />
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <motion.div animate={prefersReducedMotion ? undefined : { rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-1/2 -right-1/2 w-full h-full border border-[#F05A1A]/10 rounded-full" />
          <motion.div animate={prefersReducedMotion ? undefined : { rotate: -360 }} transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-1/2 -left-1/2 w-full h-full border border-gray-600/10 rounded-full" />
        </div>

        <div className="hero-content relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <div className="bg-white/90 dark:bg-white/5 backdrop-blur-2xl border border-white/70 dark:border-white/10 shadow-2xl dark:shadow-none rounded-3xl p-6 sm:p-10 md:p-12">
                <div className="hero-badge mb-6">
                  <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-[#F05A1A]/15 border border-[#F05A1A]/30 text-[#F05A1A] dark:bg-[#F05A1A]/20 dark:border-[#F05A1A]/30 dark:text-[#F47A45] rounded-full text-xs sm:text-sm font-medium">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    {t('hero_badge')}
                  </span>
                </div>

                <div className="hero-title">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                    <RotatingHeroText lines={heroLines} />
                  </h1>
                </div>

                <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-2xl">
                  {t('hero_subtitle').split(' ').map((word, i) => (
                    <span key={i} className="hero-sub-word inline-block mr-[0.25em]">
                      {word}
                    </span>
                  ))}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <MagneticButton className="hero-cta">
                    <a
                      href={buildWhatsAppUrl({ type: 'home_hero' }, lang)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#F05A1A] to-[#D44D12] text-white font-semibold rounded-full flex items-center justify-center space-x-2 hover:shadow-2xl hover:shadow-[#F05A1A]/30 transition-all duration-300">
                      <span>{t('hero_cta_whatsapp')}</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </a>
                  </MagneticButton>
                  <MagneticButton className="hero-cta">
                    <Link to="/vehicules"
                      className="px-6 py-3 sm:px-8 sm:py-4 bg-gray-900/5 border-2 border-gray-900/30 hover:border-gray-900 text-gray-900 dark:bg-white/10 dark:border-white/30 dark:hover:border-white dark:text-white font-semibold rounded-full text-center transition-all duration-300 hover:bg-gray-900/10">
                      {t('hero_cta_fleet')}
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <motion.div animate={prefersReducedMotion ? undefined : { y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center text-gray-500 dark:text-gray-400">
            <span className="text-xs sm:text-sm mb-2">{t('hero_scroll')}</span>
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="py-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=60"
            alt=""
            data-parallax="1.5"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F05A1A] via-[#C4440F] to-[#F05A1A] dark:from-black dark:via-zinc-950/95 dark:to-black" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card glass-card relative rounded-2xl p-6 flex flex-col items-center text-center overflow-hidden">
                <div className="w-12 h-12 glass-accent rounded-xl flex items-center justify-center mb-3">
                  <stat.icon className="w-6 h-6 text-[#F26831]" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  <span className="stat-value" data-target={stat.value}>0</span>
                  {stat.suffix}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee marques */}
      <Marquee marques={marques} />

      {/* Services */}
      <section ref={servicesRef} className="py-16 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=60"
            alt=""
            data-parallax="2"
            className="w-full h-full object-cover opacity-10 dark:opacity-10"
            style={{ filter: 'grayscale(30%)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-50/95 to-gray-50 dark:from-black dark:via-black/90 dark:to-black" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="services-inner text-center mb-10 sm:mb-16">
            <span className="inline-block px-4 py-2 glass-accent rounded-full text-[#F05A1A] dark:text-[#F47A45] text-sm font-medium mb-4 sm:mb-6">
              {t('services_badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              {t('services_title')} <span className="gradient-text">{t('services_title2')}</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              {t('services_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index}
                className="services-card bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm dark:shadow-none hover:shadow-xl dark:hover:shadow-[#F05A1A]/5 hover:border-[#F26831]/30 dark:hover:border-[#F05A1A]/30 transition-all duration-300 group">
                <div className="w-14 h-14 sm:w-16 sm:h-16 glass-accent rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300 group-hover:scale-110">
                  <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#F26831]" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flotte - scroll horizontal */}
      <section ref={flotteRef} className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1920&q=50"
            alt=""
            className="w-full h-full object-cover opacity-[0.06] dark:opacity-[0.08]"
          />
          <div className="absolute inset-0 bg-white dark:bg-black" style={{ opacity: 0.92 }} />
        </div>
        <div className="relative z-10 h-screen flex flex-col justify-center">
          <div className="text-center mb-8 sm:mb-12 px-4">
            <span className="inline-block px-4 py-2 glass-accent rounded-full text-[#F05A1A] dark:text-[#F47A45] text-sm font-medium mb-4 sm:mb-6">
              {t('fleet_badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('fleet_title')} <span className="gradient-text">{t('fleet_title2')}</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
              {t('fleet_subtitle')}
            </p>
          </div>

          {prefersReducedMotion ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
              {flotte.map((v, index) => (
                <FleetCard key={index} v={v} />
              ))}
            </div>
          ) : (
            <div ref={flotteTrackRef} className="flex gap-6 px-6 sm:px-10 w-max items-stretch">
              {flotte.map((v, index) => (
                <FleetCard key={index} v={v} horizontal />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section py-16 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={`${CONFIG.louecarsBaseUrl}/wp-content/uploads/2026/08/louecars-toyota-showroom.jpeg`} alt="LoueCars fleet"
            data-parallax="1.8"
            className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="cta-panel glass-panel rounded-3xl p-10 sm:p-16 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
              {t('cta_title')}
              <span className="gradient-text"> LoueCars</span> ?
            </h2>
            <p className="text-base sm:text-xl text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto">
              {t('cta_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <MagneticButton>
                <a
                  href={buildWhatsAppUrl({ type: 'home_cta' }, lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-[#F05A1A] to-[#D44D12] text-white text-base sm:text-lg font-semibold rounded-full flex items-center justify-center space-x-3 hover:shadow-2xl hover:shadow-[#F05A1A]/40 transition-all duration-300">
                  <span>{t('cta_whatsapp')}</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
                </a>
              </MagneticButton>
              <MagneticButton>
                <Link to="/contact"
                  className="px-8 py-4 sm:px-10 sm:py-5 glass-card text-white text-base sm:text-lg font-semibold rounded-full text-center transition-all duration-300">
                  {t('cta_contact')}
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const FleetCard = ({ v, horizontal }: { v: { label: string; desc: string; img: string }; horizontal?: boolean }) => {
  return (
    <div
      className={`glass-card relative rounded-2xl overflow-hidden group shrink-0 ${
        horizontal ? 'w-[260px] sm:w-[320px] h-[320px] sm:h-[380px]' : 'aspect-[4/3]'
      }`}>
      <img src={v.img} alt={v.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="glass-panel absolute bottom-0 left-0 right-0 px-4 py-3">
        <p className="font-semibold text-white text-sm">{v.label}</p>
        <p className="text-gray-300 text-xs mt-0.5">{v.desc}</p>
      </div>
    </div>
  );
};

export default Home;