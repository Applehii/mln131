import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { VietnamEthnicMap } from '../components/VietnamEthnicMap';
import { CulturalPanel } from '../components/CulturalPanel';
import { Section } from '../components/Section';
import { type EthnicCluster } from '../data/ethnicClusters';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
    // We'll use a simplified selected object or map cluster to group for the panel
    // For this demo, let's just use the cluster description or picking the first group details from a lookup if we had full data.
    // To keep it fast, I will just pass the cluster info to the panel (requires Panel update) or stub it.
    // Actually, looking at the request, "Open side panel ... Show Ethnic group name(s)".
    // So distinct data. I'll update state to hold the cluster.
    const [selectedCluster, setSelectedCluster] = useState<EthnicCluster | null>(null);

    const scrollToMap = () => {
        document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-[#fdfbf7] min-h-screen font-sans text-stone-800 overflow-x-hidden">
            <Hero onStart={scrollToMap} />
            
            <section id="map-section" className="relative w-screen h-screen overflow-hidden bg-stone-200">
                <div className="absolute top-8 left-0 w-full text-center z-10 pointer-events-none">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="inline-block"
                    >
                        <p className="text-stone-500 uppercase tracking-widest text-xs md:text-sm bg-white/80 backdrop-blur px-6 py-2 rounded-full shadow-sm border border-stone-200">
                            Interactive Satellite Map
                        </p>
                        <p className="text-xs text-stone-400 mt-2 font-serif italic">Click markers to explore regions</p>
                    </motion.div>
                </div>
                {/* 2D Map Container */}
                <div className="relative w-full h-full">
                    <VietnamEthnicMap onClusterSelect={setSelectedCluster} />
                </div>
            </section>

            {/* We need to adapt the CulturalPanel or create a new one for clusters. 
                Reusing CulturalPanel with a mapped object for now to save time/complexity 
                or creating a specialized ClusterPanel. Let's reuse CulturalPanel by mapping.
            */}
            <CulturalPanel 
                group={selectedCluster ? {
                    id: selectedCluster.id,
                    name: selectedCluster.region,
                    region: selectedCluster.region,
                    language: selectedCluster.ethnicGroups.join(', '),
                    population: 'Various',
                    clothingImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Hmong_women_in_Vietnam.jpg/800px-Hmong_women_in_Vietnam.jpg', // Generic fallback
                    description: selectedCluster.description,
                    quote: "Unity in Diversity",
                    coordinates: [selectedCluster.lat, selectedCluster.lng]
                } : null} 
                onClose={() => setSelectedCluster(null)} 
            />

            {/* Current Situation */}
            <Section title="Current Situation" subtitle="A snapshot of Vietnam's diverse cultural landscape">
                <div className="grid md:grid-cols-3 gap-8">
                    {[ 
                        { val: "54", label: "Ethnic Groups", desc: "From the Kinh majority to the O Du with only a few hundred members." },
                        { val: "12%", label: "Risk of Loss", desc: "Many indigenous languages are at risk of disappearing in the next generation." },
                        { val: "4G", label: "Digital Divide", desc: "While connectivity improves, access to digital preservation tools remains uneven." }
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-8 shadow-sm border-t-4 border-primary hover:shadow-md transition-shadow">
                            <h3 className="text-5xl font-serif text-primary mb-3">{item.val}</h3>
                            <p className="font-bold mb-3 uppercase tracking-wide text-sm">{item.label}</p>
                            <p className="text-sm text-stone-600 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Challenges */}
            <Section title="Challenges" subtitle="Navigating the preservation of identity in a modern world" className="bg-stone-100">
                 <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { title: "Cultural Homogenization", desc: "Globalization risks blurring unique traditions into a single mass culture." },
                        { title: "Digital Inequality", desc: "Remote mountainous regions often lack the infrastructure for digital archives." },
                        { title: "Commercial Exploitation", desc: "Tourism can sometimes trivialize sacred cultural practices." }
                    ].map((item, i) => (
                        <div key={i} className="bg-[#fdfbf7] p-8 border border-stone-200">
                             <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4 text-secondary font-serif font-bold text-xl">
                                {i + 1}
                             </div>
                            <h3 className="text-xl font-serif text-stone-800 mb-3">{item.title}</h3>
                            <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                 </div>
            </Section>

             {/* Solutions */}
             <Section title="Policies & Solutions" subtitle="Empowering communities through technology and policy">
                <div className="space-y-8 max-w-4xl mx-auto">
                    {[
                        { title: "Language Preservation", desc: "Digitizing dictionaries and oral histories for all 53 minority languages." },
                        { title: "Digital Libraries", desc: "Creating open-access 3D artifact repositories accessible on mobile devices." },
                        { title: "Education Integration", desc: "Incorporating bilingual education in provincial schools." }
                    ].map((item, i) => (
                         <div key={i} className="flex flex-col md:flex-row gap-6 items-start md:items-center group">
                            <div className="hidden md:block w-24 text-right font-serif text-primary font-bold">{2024 + i}</div>
                            <div className="w-full md:w-auto flex-1 bg-white p-6 shadow-sm border-l-4 border-accent hover:border-r-4 transition-all">
                                <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                                <p className="text-stone-600 text-sm">{item.desc}</p>
                            </div>
                         </div>
                    ))}
                </div>
            </Section>

            {/* Conclusion */}
            <Section className="bg-primary text-[#fdfbf7] py-32">
                <blockquote className="text-3xl md:text-5xl font-serif italic max-w-5xl mx-auto leading-tight text-center opacity-90">
                    “Culture is not preserved by isolation, <br className="hidden md:block" /> but by understanding.”
                </blockquote>
            </Section>
            
            <footer className="bg-stone-900 text-stone-500 py-12 px-6 text-center text-sm">
                <p className="mb-2 uppercase tracking-widest text-xs font-bold text-stone-400">Vietnam Cultural Heritage Project</p>
                <p>&copy; 2026 Academic Visualization Demo. Built with React Three Fiber.</p>
            </footer>
        </div>
    );
};
