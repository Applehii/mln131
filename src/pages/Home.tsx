import React, { useState, useEffect } from 'react';
import { VietnamEthnicMap } from '../components/VietnamEthnicMap';
import { EthnicDetailModal } from '../components/EthnicDetailModal';
import { type EthnicCluster } from '../data/ethnicClusters';
import { getEthnicGroupById, type EthnicGroup } from '../data/ethnicGroups';

export const Home: React.FC = () => {
    const [selectedCluster, setSelectedCluster] = useState<EthnicCluster | null>(null);
    const [selectedGroup, setSelectedGroup] = useState<EthnicGroup | null>(null);

    useEffect(() => {
        if (selectedCluster) {
            console.log('Region explored:', selectedCluster.region);
        }
    }, [selectedCluster]);

    const handleGroupSelect = (groupId: string) => {
        const group = getEthnicGroupById(groupId);
        if (group) {
            setSelectedGroup(group);
        } else {
            console.warn(`Group ID not found: ${groupId}`);
            // Optional: Show a toast or fallback
        }
    };

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-stone-900 m-0 p-0">
            {/* Full Screen Map Container */}
            <div className="absolute inset-0 w-full h-full z-0">
                <VietnamEthnicMap 
                    onClusterSelect={setSelectedCluster} 
                    onGroupSelect={handleGroupSelect}
                />
            </div>

            {/* Level 2: Detailed Ethnic Explorer Modal */}
            <EthnicDetailModal 
                group={selectedGroup} 
                onClose={() => setSelectedGroup(null)} 
            />

            {/* Attribution */}
            <div className="absolute bottom-1 right-2 z-[1000] text-[10px] text-white/50 pointer-events-none mix-blend-difference font-mono">
                VN Digital Atlas v2.0
            </div>
        </div>
    );
};
