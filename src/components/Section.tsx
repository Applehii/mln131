import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface Props {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Section: React.FC<Props> = ({ title, subtitle, children, className, id }) => {
  return (
    <section id={id} className={clsx("py-20 px-6 md:px-12 w-full relative", className)}>
      <div className="max-w-6xl mx-auto">
        {(title || subtitle) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            {title && <h2 className="text-3xl md:text-4xl font-serif text-primary mb-3">{title}</h2>}
            {subtitle && <p className="text-lg text-stone-600 font-sans italic max-w-2xl mx-auto">{subtitle}</p>}
            <div className="w-24 h-1 bg-secondary mx-auto mt-6"></div>
          </motion.div>
        )}
        
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: 0.2 }}
        >
            {children}
        </motion.div>
      </div>
    </section>
  );
};
