export interface EthnicCluster {
    id: string;
    region: string;
    lat: number;
    lng: number;
    ethnicGroups: string[];
    description: string;
    color: string;
}

export const ethnicClusters: EthnicCluster[] = [
    {
        id: 'tdmn_bac_bo',
        region: 'Trung du và miền núi Bắc Bộ',
        lat: 22.0,
        lng: 104.5,
        ethnicGroups: ['Kinh', 'Thái', 'Mường', 'Dao', 'H\'Mông', 'Tày', 'Nùng'],
        description: 'Dân tộc thiểu số chiếm trên 50% dân số toàn vùng, phân bố đan xen. Người Thái, Mường tập trung nhiều ở Tây Bắc; Tày, Nùng ở Đông Bắc.',
        color: '#ef4444' // Red
    },
    {
        id: 'db_song_hong',
        region: 'Đồng bằng sông Hồng',
        lat: 21.0,
        lng: 106.0,
        ethnicGroups: ['Kinh', 'Dao', 'Tày', 'Sán Dìu', 'Sán Chay', 'Mường'],
        description: 'Vùng châu thổ màu mỡ, cái nôi của văn minh lúa nước và người Việt cổ.',
        color: '#f97316' // Orange
    },
    {
        id: 'bac_trung_bo',
        region: 'Bắc Trung Bộ',
        lat: 19.0,
        lng: 105.5,
        ethnicGroups: ['Kinh', 'Thái', 'Mường', 'Tày', 'Bru – Vân Kiều'],
        description: 'Người Kinh tập trung chủ yếu ở đồng bằng ven biển. Dân tộc thiểu số phân bố chủ yếu ở vùng đồi núi phía tây.',
        color: '#eab308' // Yellow
    },
    {
        id: 'dh_nam_trung_bo',
        region: 'Duyên hải Nam Trung Bộ',
        lat: 13.0,
        lng: 109.2,
        ethnicGroups: ['Kinh', 'Chăm', 'Cơ-tu', 'Hrê', 'Cơ-ho'],
        description: 'Người Kinh chiếm trên 91% dân số, phân bố rộng khắp, tập trung chủ yếu ở đồng bằng ven biển. Người Chăm sinh sống tập trung ở đồng bằng ven biển Ninh Thuận và Bình Thuận. Các dân tộc thiểu số như Cơ-tu, Hrê, Cơ-ho cư trú chủ yếu ở vùng đồi núi phía tây. Dân cư có sự phân bố đan xen, cùng sinh sống lâu đời.',
        color: '#3b82f6' // Blue
    },
    {
        id: 'tay_nguyen',
        region: 'Tây Nguyên',
        lat: 13.5,
        lng: 108.0,
        ethnicGroups: ['Ê-đê', 'Ba Na', 'Gia-rai', 'Cơ-ho', 'Kinh', 'H\'Mông'],
        description: 'Là địa bàn có nhiều thành phần dân tộc nhất cả nước. Các dân tộc thiểu số bản địa cư trú lâu đời, có bản sắc văn hóa riêng. Người Kinh phân bố xen kẽ, chủ yếu tại các đô thị và vùng kinh tế mới.',
        color: '#8b5cf6' // Violet
    },
    {
        id: 'dong_nam_bo',
        region: 'Đông Nam Bộ',
        lat: 11.2,
        lng: 106.8,
        ethnicGroups: ['Kinh', 'Hoa', 'Khơ-me', 'Xtiêng', 'Cơ-ho', 'Chăm'],
        description: 'Người Kinh chiếm đa số tuyệt đối, tập trung tại các đô thị lớn và khu công nghiệp. Người Hoa sống nhiều ở các đô thị, trung tâm thương mại. Các dân tộc thiểu số như Xtiêng, Cơ-ho cư trú ở vùng trung du và miền núi.',
        color: '#ec4899' // Pink
    },
    {
        id: 'db_song_cuu_long',
        region: 'Đồng bằng sông Cửu Long',
        lat: 10.0,
        lng: 105.8,
        ethnicGroups: ['Kinh', 'Khơ-me', 'Hoa', 'Chăm'],
        description: 'Người Kinh chiếm đa số, phân bố rộng khắp. Người Khơ-me cư trú tập trung tại Trà Vinh, Sóc Trăng, Kiên Giang, An Giang. Người Hoa sống nhiều ở đô thị và trung tâm buôn bán. Người Chăm phân bố rải rác, gắn với tín ngưỡng Hồi giáo.',
        color: '#22c55e' // Green
    }
];
