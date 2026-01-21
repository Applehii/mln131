import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { EthnicGroup } from '../data/ethnicGroups';

interface Props {
  group: EthnicGroup | null;
  onClose: () => void;
}

export const CulturalPanel: React.FC<Props> = ({ group, onClose }) => {
  return (
    <AnimatePresence>
      {group && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 h-full w-full md:w-[480px] bg-paper shadow-2xl z-50 overflow-y-auto border-l-4 border-primary"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-stone-500 hover:text-primary transition-colors text-2xl font-serif z-10"
          >
            &times;
          </button>

          {/* Header Image */}
          <div className="relative h-64 w-full overflow-hidden bg-stone-200">
             {/* Using placeholder if real image fails, but ideally typical img tag */}
            <img 
                src={group.clothingImage} 
                alt={group.name} 
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=No+Image'; }}
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
              <h2 className="text-4xl font-serif text-white">{group.name}</h2>
              <p className="text-stone-300 font-sans text-sm mt-1">{group.language} Language Group</p>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Quote */}
            <blockquote className="border-l-4 border-secondary pl-4 italic text-stone-600 font-serif text-lg">
              "{group.quote}"
            </blockquote>

            {/* Main Info */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-300 pb-2">
                <span className="font-bold text-stone-800">Region</span>
                <span className="text-stone-600">{group.region}</span>
              </div>
              <div className="flex items-center justify-between border-b border-stone-300 pb-2">
                <span className="font-bold text-stone-800">Population</span>
                <span className="text-stone-600">{group.population || 'Unknown'}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-serif text-primary mb-3">Cultural Values</h3>
              <p className="text-stone-700 leading-relaxed font-sans text-justify">
                {group.description}
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-stone-200 text-center">
                <button 
                  onClick={onClose}
                  className="px-6 py-2 border border-stone-400 rounded hover:bg-stone-100 hover:text-primary transition-all text-sm uppercase tracking-wider"
                >
                    Close Panel
                </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
