import { motion } from 'framer-motion';

interface LegalSection {
  title: string;
  text?: string[];
  list?: string[];
}

interface LegalLayoutProps {
  badge: string;
  title: string;
  title2: string;
  subtitle: string;
  sections: LegalSection[];
  updated?: string;
}

const LegalLayout = ({ badge, title, title2, subtitle, sections, updated }: LegalLayoutProps) => {
  return (
    <div className="min-h-screen pt-24 pb-20" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#F05A1A] via-[#D44D12] to-[#F05A1A] dark:from-zinc-900 dark:via-black dark:to-zinc-900 brand-banner">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/10 dark:bg-[#F05A1A]/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
            <span className="inline-block px-4 py-2 bg-white/15 border border-white/30 text-white dark:bg-[#F05A1A]/20 dark:border-[#F05A1A]/30 dark:text-[#F47A45] text-sm font-medium mb-6">
              {badge}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">{title} </span>
              <span className="gradient-text">{title2}</span>
            </h1>
            <p className="text-base sm:text-xl text-white/90 dark:text-gray-300 max-w-3xl mx-auto">
              {subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm dark:shadow-none"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="w-1.5 h-6 bg-gradient-to-b from-[#F05A1A] to-[#D44D12] rounded-full mr-3" />
                {section.title}
              </h2>
              {section.text?.map((paragraph, i) => (
                <p key={i} className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-3 last:mb-0">{paragraph}</p>
              ))}
              {section.list && (
                <ul className="space-y-2">
                  {section.list.map((item, i) => (
                    <li key={i} className="flex items-start text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                      <span className="w-1.5 h-1.5 bg-[#F26831] rounded-full mt-2 mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
          {updated && (
            <p className="text-center text-gray-400 dark:text-gray-500 text-xs mt-8">{updated}</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default LegalLayout;