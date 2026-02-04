// Dữ liệu Chủ quyền Biển Đảo Việt Nam
// Phục vụ mục đích giáo dục, học thuật

export interface IslandGroup {
    id: string;
    name: string;
    lat: number;
    lng: number;
    description: string;
    type: 'archipelago' | 'island';
}

export const islandGroups: IslandGroup[] = [
    {
        id: 'hoang-sa',
        name: 'QUẦN ĐẢO HOÀNG SA (VIỆT NAM)',
        lat: 16.5,
        lng: 112.5,
        description: 'Chủ quyền Việt Nam – Cơ sở lịch sử và pháp lý',
        type: 'archipelago'
    },
    {
        id: 'truong-sa',
        name: 'QUẦN ĐẢO TRƯỜNG SA (VIỆT NAM)',
        lat: 9.5,
        lng: 112.5,
        description: 'Chủ quyền Việt Nam – Cơ sở lịch sử và pháp lý',
        type: 'archipelago'
    },
    {
        id: 'phu-quoc',
        name: 'ĐẢO PHÚ QUỐC',
        lat: 10.22,
        lng: 103.96,
        description: 'Đảo lớn nhất Việt Nam – Tỉnh Kiên Giang',
        type: 'island'
    },
    {
        id: 'tho-chu',
        name: 'QUẦN ĐẢO THỔ CHU',
        lat: 9.3,
        lng: 103.49,
        description: 'Quần đảo phía Tây Nam – Tỉnh Kiên Giang',
        type: 'archipelago'
    },
    {
        id: 'con-dao',
        name: 'CÔN ĐẢO',
        lat: 8.69,
        lng: 106.61,
        description: 'Quần đảo Côn Đảo – Tỉnh Bà Rịa-Vũng Tàu',
        type: 'archipelago'
    },
    {
        id: 'bai-tu-chinh',
        name: 'BÃI TƯ CHÍNH',
        lat: 7.5,
        lng: 109.5,
        description: 'Thuộc thềm lục địa Việt Nam',
        type: 'island'
    }
];

// Polygon cho vùng lãnh hải/EEZ khu vực Vịnh Bắc Bộ và ven bờ đất liền
// Chạy ngoài khơi, song song với bờ biển, KHÔNG bám sát đất liền
// QUAN TRỌNG: KHÔNG chồng lên đảo Hải Nam (108.6°E - 111°E, 18.2°N - 20.2°N)
export const coastalEezPolygon: [number, number][] = [
    // Điểm Bắc - Vịnh Bắc Bộ (hoàn toàn phía Tây, không chạm Hải Nam)
    [21.5, 107.0],
    [21.0, 107.5],
    [20.5, 107.8],   // Phía Tây Hải Nam
    [19.5, 108.0],   // Vẫn trong Vịnh Bắc Bộ
    [18.5, 108.2],   // Gần điểm cực Nam Vịnh
    [17.8, 108.5],   // Ranh giới - đã dưới điểm cực Nam Hải Nam
    // Từ đây đi xuống ven bờ biển miền Trung
    [17.0, 109.0],
    [16.5, 109.5],
    [15.5, 109.5],
    [14.5, 109.5],
    [13.5, 109.8],
    [12.5, 109.8],
    [11.8, 109.3],
    [10.8, 108.5],
    [9.8, 107.5],
    // Điểm Nam - Vùng biển phía Nam VN
    [8.5, 107.5],
    [7.5, 107.5],
    [7.0, 106.5],
    [7.5, 105.0],
    [8.2, 104.0],
    // Phía Tây Nam - bao trọn Phú Quốc và Thổ Chu
    [8.8, 103.0],
    [9.5, 102.8],
    [10.5, 103.0],
    [10.8, 103.8],
    // Điểm nối về bờ biển (cách bờ 1 khoảng an toàn)
    [10.2, 104.3],
    [9.6, 104.8],
    [9.0, 105.2],
    [8.8, 105.8],
    [9.2, 106.2],
    [9.8, 106.0],
    [10.2, 106.5],
    [10.5, 106.8],
    [10.8, 107.0],
    [11.2, 108.5],
    [12.0, 109.0],
    [13.0, 109.0],
    [14.0, 108.8],
    [15.0, 108.5],
    [16.0, 108.0],
    [17.0, 107.2],
    [18.0, 106.8],
    [19.0, 106.5],
    [20.0, 106.5],
    [21.0, 106.8],
    [21.5, 107.0], // Đóng polygon
];

// Polygon vùng Hoàng Sa - NẰM HOÀN TOÀN TRONG BIỂN ĐÔNG
// KHÔNG chạm, không nối với đảo Hải Nam (Trung Quốc)
export const hoangSaPolygon: [number, number][] = [
    [17.2, 111.0],
    [17.2, 113.5],
    [15.8, 113.5],
    [15.8, 111.0],
    [17.2, 111.0], // Đóng polygon
];

// Polygon vùng Trường Sa - KHÔNG chạm Philippines, Malaysia, Indonesia
export const truongSaPolygon: [number, number][] = [
    [12.0, 111.0],
    [12.0, 114.5],
    [7.5, 114.5],
    [7.5, 111.0],
    [12.0, 111.0], // Đóng polygon
];

// Polygon kết hợp toàn bộ vùng EEZ Việt Nam (cho mục đích hiển thị tổng thể)
// QUAN TRỌNG: Đường ranh giới KHÔNG được cắt qua đảo Hải Nam (Trung Quốc)
// Đảo Hải Nam nằm khoảng: 18.2°N-20.2°N, 108.6°E-111°E
export const eezPolygon: [number, number][] = [
    // Vịnh Bắc Bộ - phía Tây đảo Hải Nam, KHÔNG cắt qua đảo
    [21.5, 107.0],   // Điểm Bắc - trong Vịnh Bắc Bộ
    [20.5, 107.8],   // Đi xuống trong vịnh
    [19.5, 108.0],   // Vẫn trong vịnh, phía Tây Hải Nam
    [18.5, 108.2],   // Gần điểm Nam Vịnh Bắc Bộ
    [17.8, 108.5],   // Điểm ranh giới giữa - dưới đảo Hải Nam
    // Bây giờ mới mở rộng ra Biển Đông (đã qua khỏi Hải Nam về phía Nam)
    [17.2, 109.5],   // Bắt đầu mở ra biển - ĐÃ QUA KHỎI HẢI NAM
    [17.0, 110.5],   // Tiến ra Biển Đông
    [17.5, 112.0],   // Hướng về Hoàng Sa
    [17.0, 113.5],   // Phía Bắc Hoàng Sa
    [15.5, 114.5],   // Phía Đông
    // Nối xuống Trường Sa
    [13.0, 115.0],
    [11.5, 115.5],
    [9.0, 115.0],
    [7.0, 113.0],
    // Điểm Nam
    [6.5, 109.0],
    [7.0, 106.0],
    [7.5, 105.0],
    // Tây Nam - bao Phú Quốc, Thổ Chu
    [8.5, 103.0],
    [10.0, 102.5],
    [10.8, 103.5],
    // Nối về phía Bắc theo bờ biển (cách bờ an toàn)
    [10.3, 104.2],
    [9.5, 105.0],
    [8.8, 106.0],
    [9.5, 106.3],
    [10.3, 106.8],
    [11.0, 107.5],
    [12.0, 108.8],
    [14.0, 109.0],
    [16.0, 108.0],
    [17.5, 107.0],
    [19.0, 106.5],
    [20.0, 106.5],
    [21.0, 106.8],
    [21.5, 107.0], // Đóng polygon
];

// Export tất cả các polygon dưới dạng object
export const maritimeZones = {
    coastal: coastalEezPolygon,
    hoangSa: hoangSaPolygon,
    truongSa: truongSaPolygon,
    fullEez: eezPolygon,
};

// Thông tin diện tích (tham khảo)
export const areaInfo = {
    totalSea: '1.010.274 km²',
    coastal: '67.203 km²',
    hoangSa: '30.680 km²',
    centralSea: '661.591 km²',
    truongSa: '250.800 km²',
};
