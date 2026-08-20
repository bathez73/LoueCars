import { useState } from 'react';

interface MarqueeBrand {
  nom: string;
  logo?: string;
}

const MarqueeItem = ({ m }: { m: MarqueeBrand }) => {
  const [failed, setFailed] = useState(false);

  if (failed || !m.logo) {
    return (
      <span className="text-2xl sm:text-3xl font-bold text-gray-400 dark:text-gray-500 hover:text-[#F05A1A] transition-colors">
        {m.nom}
      </span>
    );
  }

  return (
    <img
      src={m.logo}
      alt={m.nom}
      onError={() => setFailed(true)}
      className="max-h-9 sm:max-h-11 max-w-[200px] sm:max-w-[240px] w-auto h-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
    />
  );
};

const Marquee = ({ marques }: { marques: MarqueeBrand[] }) => {
  const half = Math.ceil(marques.length / 2);
  const rowA = marques.slice(0, half);
  const rowB = marques.slice(half);

  const renderRow = (items: MarqueeBrand[], direction: 'left' | 'right') => (
    <div className={`flex w-max marquee-track marquee-${direction}`}>
      {[...items, ...items].map((m, index) => (
        <div key={index} className="flex items-center justify-center mx-8 sm:mx-10 flex-shrink-0">
          <MarqueeItem m={m} />
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-8 overflow-hidden bg-white dark:bg-zinc-900/30 border-y border-gray-200 dark:border-zinc-800">
      {/* Desktop : une seule rangée */}
      <div className="hidden md:block">
        {renderRow(marques, 'left')}
      </div>

      {/* Mobile : deux rangées en sens opposés */}
      <div className="md:hidden space-y-6">
        {renderRow(rowA, 'left')}
        {renderRow(rowB, 'right')}
      </div>
    </section>
  );
};

export default Marquee;