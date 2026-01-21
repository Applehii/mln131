import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-[#fdfbf7]">
      {/* Background decoration or texture could go here */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>

      <div className="text-center z-10 px-6 max-w-4xl">
        <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif text-primary mb-6 leading-tight"
        >
            Preserving Ethnic <br/> Cultural Identity
        </motion.h1>

        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl md:text-2xl text-stone-600 mb-10 font-light italic"
        >
            Vietnam – Unity in Diversity
        </motion.p>
        
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
        >
            <button 
                onClick={onStart}
                className="px-8 py-3 bg-primary text-secondary border border-secondary text-lg tracking-widest hover:bg-stone-900 transition-all duration-300 shadow-lg"
            >
                EXPLORE THE MAP
            </button>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-stone-400"
      >
        <span className="text-sm uppercase tracking-widest">Scroll Down</span>
        <div className="w-[1px] h-8 bg-stone-400 mx-auto mt-2"></div>
      </motion.div>
    </div>
  );
};
