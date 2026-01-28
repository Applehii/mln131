import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import type { EthnicGroup } from '../data/ethnicGroups';

interface Props {
    group: EthnicGroup | null;
    onClose: () => void;
}

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const sectionOrder = [
    'origin', 'history', 'distribution', 'characteristics', 'customs',
    'belief', 'housing', 'clothing', 'cuisine', 'production', 'arts'
];

const formatSectionTitle = (key: string) => {
    const titles: Record<string, string> = {
        origin: 'Nguồn gốc',
        history: 'Lịch sử',
        distribution: 'Phân bố địa lý',
        population: 'Dân số',
        language: 'Ngôn ngữ',
        characteristics: 'Đặc điểm xã hội',
        customs: 'Phong tục tập quán',
        belief: 'Tín ngưỡng & Tôn giáo',
        housing: 'Nhà ở truyền thống',
        clothing: 'Trang phục',
        cuisine: 'Ẩm thực',
        production: 'Kinh tế & Sinh kế',
        arts: 'Văn hóa & Nghệ thuật'
    };
    return titles[key] || key;
};

export const EthnicDetailModal: React.FC<Props> = ({ group, onClose }) => {
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });
    
    // Parallax effect for hero
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

    if (!group) return null;

    return (
        <AnimatePresence>
            {group && (
                <motion.div 
                    className="fixed inset-0 z-[2000] overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Backdrop */}
                    <motion.div 
                        className="absolute inset-0 bg-stone-950/95 backdrop-blur-md"
                        onClick={onClose}
                    />

                    {/* Close Button */}
                    <button 
                        onClick={onClose}
                        className="fixed top-6 right-6 z-[2010] w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:text-red-400 transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-110"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Main Scrollable Content */}
                    <motion.div 
                        ref={containerRef}
                        className="relative h-full overflow-y-auto overflow-x-hidden custom-scrollbar"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {/* ══════════════════════════════════════════════════════════
                            SECTION 1: HERO (Full-width image + Ethnic name)
                        ══════════════════════════════════════════════════════════ */}
                        <motion.section 
                            className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden"
                            style={{ y: heroY, opacity: heroOpacity }}
                        >
                            <img 
                                src={group.images[0] || 'https://via.placeholder.com/1920x1080?text=No+Image'} 
                                alt={group.vietnameseName}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
                            
                            <motion.div 
                                className="absolute bottom-0 left-0 right-0 p-8 md:p-16"
                                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                            >
                                <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-xs font-bold tracking-[0.25em] uppercase mb-4 border border-white/20">
                                    Dân tộc Việt Nam
                                </span>
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black text-white leading-none mb-4">
                                    {group.vietnameseName}
                                </h1>
                                {group.otherNames && (
                                    <p className="text-xl md:text-2xl text-white/70 font-light italic">
                                        Tên gọi khác: {group.otherNames}
                                    </p>
                                )}
                            </motion.div>
                        </motion.section>

                        {/* Content Container */}
                        <div className="relative bg-[#faf9f7]">
                            {/* ══════════════════════════════════════════════════════════
                                SECTION 2: FLOATING QUOTE
                            ══════════════════════════════════════════════════════════ */}
                            <motion.section 
                                className="relative -mt-20 mx-4 md:mx-auto md:max-w-4xl"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={fadeInUp}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-stone-900/10 p-8 md:p-12 border border-white/50">
                                    <div className="flex items-start gap-4">
                                        <span className="text-6xl text-primary/30 font-serif leading-none">"</span>
                                        <blockquote className="text-xl md:text-2xl text-stone-700 font-serif leading-relaxed italic flex-1">
                                            {group.introduction}
                                        </blockquote>
                                    </div>
                                </div>
                            </motion.section>

                            {/* ══════════════════════════════════════════════════════════
                                SECTION 3: INFO GRID (Population, Region, Language)
                            ══════════════════════════════════════════════════════════ */}
                            <motion.section 
                                className="max-w-5xl mx-auto px-4 md:px-8 py-16"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={staggerContainer}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <InfoCard 
                                        icon="users" 
                                        label="Dân số (2019)" 
                                        value={group.population} 
                                    />
                                    <InfoCard 
                                        icon="map" 
                                        label="Vùng cư trú" 
                                        value={group.region} 
                                    />
                                    <InfoCard 
                                        icon="translate" 
                                        label="Nhóm ngôn ngữ" 
                                        value={group.languageGroup} 
                                    />
                                </div>
                            </motion.section>

                            {/* ══════════════════════════════════════════════════════════
                                SECTION 4: INTRODUCTION
                            ══════════════════════════════════════════════════════════ */}
                            <motion.section 
                                className="max-w-3xl mx-auto px-4 md:px-8 pb-16"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={fadeInUp}
                                transition={{ duration: 0.6 }}
                            >
                                <p className="text-xl md:text-2xl text-stone-700 font-serif leading-relaxed text-center">
                                    {group.introduction}
                                </p>
                            </motion.section>

                            {/* ══════════════════════════════════════════════════════════
                                SECTION 5: DETAILED CONTENT (Scrolling Sections)
                            ══════════════════════════════════════════════════════════ */}
                            <section className="max-w-3xl mx-auto px-4 md:px-8 pb-20">
                                <div className="space-y-16">
                                    {sectionOrder.map((key) => {
                                        const content = group.details[key as keyof typeof group.details];
                                        if (!content) return null;
                                        return (
                                            <ContentSection 
                                                key={key} 
                                                title={formatSectionTitle(key)} 
                                                content={content as string} 
                                            />
                                        );
                                    })}
                                </div>
                            </section>

                            {/* ══════════════════════════════════════════════════════════
                                SECTION 6: GALLERY
                            ══════════════════════════════════════════════════════════ */}
                            {group.images.length > 1 && (
                                <motion.section 
                                    className="bg-stone-100 py-20"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-100px" }}
                                    variants={staggerContainer}
                                >
                                    <div className="max-w-6xl mx-auto px-4 md:px-8">
                                        <motion.h3 
                                            className="text-center text-sm font-bold text-stone-400 uppercase tracking-[0.3em] mb-12"
                                            variants={fadeInUp}
                                        >
                                            Hình ảnh minh họa
                                        </motion.h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {group.images.map((img, idx) => (
                                                <motion.div 
                                                    key={idx}
                                                    className="aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group shadow-lg"
                                                    variants={fadeInUp}
                                                    whileHover={{ scale: 1.03 }}
                                                    onClick={() => setLightboxImage(img)}
                                                >
                                                    <img 
                                                        src={img} 
                                                        alt={`${group.vietnameseName} - Hình ${idx + 1}`}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.section>
                            )}

                            {/* Footer */}
                            <footer className="py-16 text-center bg-stone-50 border-t border-stone-200">
                                <img 
                                    src="https://upload.wikimedia.org/wikipedia/commons/2/20/Emblem_of_Vietnam.svg" 
                                    className="h-12 w-12 mx-auto mb-4 opacity-30 grayscale" 
                                    alt="Emblem" 
                                />
                                <p className="text-stone-400 text-xs uppercase tracking-[0.2em] mb-1">
                                    Nguồn tham khảo
                                </p>
                                <p className="text-stone-600 text-sm font-medium">
                                    Báo Nhân Dân • Ủy ban Dân tộc
                                </p>
                            </footer>
                        </div>
                    </motion.div>

                    {/* ══════════════════════════════════════════════════════════
                        LIGHTBOX (Click image to open)
                    ══════════════════════════════════════════════════════════ */}
                    <AnimatePresence>
                        {lightboxImage && (
                            <motion.div 
                                className="fixed inset-0 z-[2020] flex items-center justify-center p-4 md:p-16"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setLightboxImage(null)}
                            >
                                <div className="absolute inset-0 bg-stone-950/95 backdrop-blur-xl" />
                                <motion.img 
                                    src={lightboxImage}
                                    alt="Lightbox"
                                    className="relative max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    transition={{ type: "spring", damping: 25 }}
                                />
                                <button 
                                    className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white rounded-full flex items-center justify-center text-white hover:text-stone-900 transition-all"
                                    onClick={() => setLightboxImage(null)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

/* ══════════════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════════════════════════════════════ */

const getIconPath = (name: string) => {
    switch(name) {
        case 'users': return "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z";
        case 'map': return "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7";
        case 'translate': return "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129";
        default: return "";
    }
};

const InfoCard: React.FC<{ icon: string; label: string; value: string }> = ({ icon, label, value }) => (
    <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 group"
        variants={fadeInUp}
        whileHover={{ y: -4 }}
    >
        <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={getIconPath(icon)} />
                </svg>
            </div>
            <div className="flex-1 min-w-0">
                <span className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">{label}</span>
                <span className="block text-stone-800 font-bold text-base leading-snug">{value}</span>
            </div>
        </div>
    </motion.div>
);

const ContentSection: React.FC<{ title: string; content: string }> = ({ title, content }) => (
    <motion.div 
        className="group"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
    >
        <motion.h4 
            className="text-xl md:text-2xl font-serif font-bold text-stone-800 mb-6 pb-3 border-b-2 border-primary/20 group-hover:border-primary transition-colors duration-300"
            variants={fadeInLeft}
            transition={{ duration: 0.5 }}
        >
            {title}
        </motion.h4>
        <motion.div 
            className="text-stone-600 text-lg leading-8 text-justify"
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.1 }}
        >
            {content.split('\n').map((paragraph, i) => (
                <p key={i} className="mb-4 last:mb-0">{paragraph}</p>
            ))}
        </motion.div>
    </motion.div>
);
