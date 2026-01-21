// Approximate educational data for Vietnam's Maritime Sovereignty visualization

export interface IslandGroup {
    id: string;
    name: string;
    lat: number;
    lng: number;
    description: string;
}

export const islandGroups: IslandGroup[] = [
    {
        id: 'hoang-sa',
        name: 'Quần đảo Hoàng Sa (Việt Nam)',
        lat: 16.5,
        lng: 112.0,
        description: 'Vietnamese sovereignty – historical and legal basis'
    },
    {
        id: 'truong-sa',
        name: 'Quần đảo Trường Sa (Việt Nam)',
        lat: 10.0,
        lng: 114.5,
        description: 'Vietnamese sovereignty – historical and legal basis'
    }
];

// Simplified polygon approximating the EEZ for educational purposes
// This is NOT official navigation data.
export const eezCoordinates: [number, number][] = [
    [21.5, 108.0], // Northern point near Gulf of Tonkin
    [20.0, 108.5],
    [17.0, 110.0],
    [17.0, 114.0], // Extending to encompass Hoang Sa
    [15.0, 115.0],
    [12.0, 116.0],
    [10.0, 117.0], // Extending to encompass Truong Sa
    [7.0, 115.0],
    [6.0, 110.0],  // Southern point
    [8.5, 104.5],  // Southwest near Cambodia
    [10.5, 104.0],
    // Follows coastline roughly back up (omitted for overlay simplicity, usually we just need the outer boundary or a loop)
    // For a line string, we can just trace the outer limit.
];

export const eezPolygon: [number, number][] = [
    // Outer boundary
    [21.55, 108.02],
    [20.0, 109.5],
    [17.5, 111.0],
    [17.5, 113.0],
    [16.0, 114.5],
    [12.0, 115.0],
    [10.0, 116.0],
    [7.5, 113.0],
    [6.5, 108.0],
    [8.0, 104.0],
    [10.2, 103.8],
    // Coastline approximation to close the loop (simplified)
    [10.5, 104.5],
    [9.5, 106.5],
    [10.5, 107.0],
    [12.5, 109.5],
    [15.5, 109.0],
    [18.0, 106.5],
    [20.0, 106.5],
    [21.55, 108.02]
];
