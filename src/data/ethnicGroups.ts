export interface EthnicGroup {
    id: string;
    name: string;
    region: string;
    language: string;
    population?: string;
    clothingImage: string;
    description: string;
    quote: string;
    coordinates: [number, number]; // [lat, long]
}

export const ethnicGroups: EthnicGroup[] = [
    {
        id: 'hmong',
        name: 'Hmong',
        region: 'Northern Mountains',
        language: 'Hmong-Mien',
        population: '1.3 Million',
        clothingImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Hmong_women_in_Vietnam.jpg/800px-Hmong_women_in_Vietnam.jpg', // Placeholder
        description: 'The Hmong are known for their colorful traditional clothing and rich oral traditions. They primarily inhabit the mountainous regions of Northern Vietnam.',
        quote: 'Our patterns tell the story of our ancestors.',
        coordinates: [22.33, 103.84] // Lao Cai area
    },
    {
        id: 'ede',
        name: 'Ede',
        region: 'Central Highlands',
        language: 'Austronesian',
        population: '398,000',
        clothingImage: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Ede_people.jpg',
        description: 'The Ede people are matriarchal and live in longhouses. They are famous for their Gong culture.',
        quote: 'The fire of the longhouse warms the soul of the clan.',
        coordinates: [12.66, 108.03] // Dak Lak area
    },
    {
        id: 'cham',
        name: 'Cham',
        region: 'South Central Coast',
        language: 'Austronesian',
        population: '179,000',
        clothingImage: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Cham_people.jpg',
        description: 'Descendants of the Champa Kingdom, the Cham people have a unique blend of Hindu and Islamic influences.',
        quote: 'The towers stand as witnesses to time.',
        coordinates: [11.58, 109.04] // Ninh Thuan area
    },
    {
        id: 'khmer',
        name: 'Khmer Krom',
        region: 'Mekong Delta',
        language: 'Mon-Khmer',
        population: '1.3 Million',
        clothingImage: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Khmer_Krom_monks.jpg',
        description: 'The Khmer Krom practice Theravada Buddhism and are integral to the culture of the Mekong Delta.',
        quote: 'Water flows, and life follows.',
        coordinates: [9.66, 105.97] // Soc Trang area
    },
    {
        id: 'dao',
        name: 'Dao',
        region: 'Northern Vietnam',
        language: 'Hmong-Mien',
        population: '890,000',
        clothingImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Red_Dao_woman.jpg/800px-Red_Dao_woman.jpg',
        description: 'The Dao people are known for their Red Dao sub-group who wear distinctive red headdresses. They are skilled in traditional medicine and agriculture.',
        quote: 'The forest provides, if we respect it.',
        coordinates: [21.8, 104.9] // Yen Bai area (approx)
    }
];
