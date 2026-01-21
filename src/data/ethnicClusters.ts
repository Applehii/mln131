export interface EthnicCluster {
    id: string;
    region: string;
    lat: number;
    lng: number;
    ethnicGroups: string[];
    description: string;
    color: string; // Hex color for marker
}

export const ethnicClusters: EthnicCluster[] = [
    {
        id: 'northwest',
        region: 'Northwest (Tây Bắc)',
        lat: 22.33,
        lng: 103.84, // Lao Cai area
        ethnicGroups: ['Hmong', 'Dao', 'Tay', 'Giay'],
        description: 'High mountainous region known for terraced rice fields and diverse fabric arts. Home to major Hmong and Dao communities.',
        color: '#ef4444' // Red
    },
    {
        id: 'northeast',
        region: 'Northeast (Đông Bắc)',
        lat: 22.0,
        lng: 106.0, // Lang Son area
        ethnicGroups: ['Tay', 'Nung', 'San Chay'],
        description: 'Limestone karst landscapes inhabited by Tay and Nung peoples, famous for "Then" singing and stilt houses.',
        color: '#3b82f6' // Blue
    },
    {
        id: 'central_highlands_north',
        region: 'Central Highlands (North)',
        lat: 14.5,
        lng: 108.0, // Kon Tum / Gia Lai
        ethnicGroups: ['Ba Na', 'Xe Dang', 'Gie Trieng'],
        description: 'Known for communal Rong houses and epic oral histories.',
        color: '#eab308' // Yellow
    },
    {
        id: 'central_highlands_south',
        region: 'Central Highlands (South)',
        lat: 12.66,
        lng: 108.03, // Dak Lak
        ethnicGroups: ['Ede', 'M\'nong'],
        description: 'Matriarchal societies famous for longhouses, gong culture (UNESCO heritage), and elephant taming traditions.',
        color: '#eab308' // Yellow
    },
    {
        id: 'south_central_coast',
        region: 'South Central Coast',
        lat: 11.58,
        lng: 109.04, // Ninh Thuan
        ethnicGroups: ['Cham', 'Raglai'],
        description: 'Descendants of the Champa civilization, preserving Hindu and Islamic cultural heritage and distinctive tower architecture.',
        color: '#f97316' // Orange
    },
    {
        id: 'mekong_delta',
        region: 'Mekong Delta',
        lat: 9.66,
        lng: 105.97, // Soc Trang / Tra Vinh
        ethnicGroups: ['Khmer Krom', 'Hoa'],
        description: 'River-based culture with strong Theravada Buddhist influences, famous for floating markets and pagoda festivals.',
        color: '#22c55e' // Green
    }
];
