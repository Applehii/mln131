import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  useMapEvents,
  Polygon,
  Tooltip,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { ethnicClusters, type EthnicCluster } from "../data/ethnicClusters";
import vietnamGeoJson from "../data/vietnam.geo.json";
import { islandGroups, eezPolygon } from "../data/maritimeData";

// Fix for default Leaflet marker icons in React
import iconMarker2x from "leaflet/dist/images/marker-icon-2x.png";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconMarker2x,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
});

// Custom div icon for colored markers
const createCustomIcon = (color: string) => {
  return new L.DivIcon({
    className: "custom-marker",
    html: `<div style="background-color: ${color}; width: 1.5rem; height: 1.5rem; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

interface Props {
  onClusterSelect: (cluster: EthnicCluster) => void;
  onGroupSelect: (groupId: string) => void;
}

// Map configuration
const VIETNAM_CENTER: [number, number] = [16.0, 106.0];
const DEFAULT_ZOOM = 6;
const BOUNDARY_ZOOM_THRESHOLD = 7; // Show boundaries when zoomed in past this level

// Component to handle zoom events and toggle boundaries
const BoundariesLayer = () => {
  const [showBoundaries, setShowBoundaries] = useState(false);

  useMapEvents({
    zoomend: (e) => {
      setShowBoundaries(e.target.getZoom() >= BOUNDARY_ZOOM_THRESHOLD);
    },
  });

  // Initial check
  const map = useMapEvents({});
  useEffect(() => {
    setShowBoundaries(map.getZoom() >= BOUNDARY_ZOOM_THRESHOLD);
  }, [map]);

  if (!showBoundaries) return null;

  return (
    <GeoJSON
      data={vietnamGeoJson as any}
      style={{
        color: "white",
        weight: 1,
        opacity: 0.6,
        fillOpacity: 0,
        dashArray: "3",
      }}
    />
  );
};

// Helper to determine polygon centroid (naive average of vertices)
const getMultiPolygonCentroid = (coordinates: any[]): [number, number] => {
  let totals = [0, 0];
  let numPoints = 0;

  // Handle MultiPolygon: coordinates[proxy][ring][point]
  // We'll iterate through all rings of all polygons to find a visual center approximation
  const processPolygon = (rings: any[]) => {
    // Only use the first ring (exterior) for centroid to avoid hole skewing
    const exteriorRing = rings[0];
    for (const point of exteriorRing) {
      totals[0] += point[1]; // lat
      totals[1] += point[0]; // lng
      numPoints++;
    }
  };

  if (coordinates.length > 0 && Array.isArray(coordinates[0][0][0])) {
    // MultiPolygon
    coordinates.forEach((polygon) => processPolygon(polygon));
  } else {
    // Polygon (double nested for Ring array) - though GeoJSON here seems consistent with MultiPoly
    // Fallback interpretation if structure varies
    processPolygon(coordinates);
  }

  if (numPoints === 0) return [0, 0];
  return [totals[0] / numPoints, totals[1] / numPoints];
};

const LABEL_ZOOM_THRESHOLD = 8;

const ProvinceLabelsLayer = () => {
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);

  useMapEvents({
    zoomend: (e) => {
      setZoom(e.target.getZoom());
    },
  });

  // Determine centroids only once
  const [centroids, setCentroids] = useState<
    { name: string; lat: number; lng: number }[]
  >([]);

  useEffect(() => {
    const calculated = (vietnamGeoJson as any).features.map((feature: any) => {
      const center = getMultiPolygonCentroid(feature.geometry.coordinates);
      return {
        name: feature.properties.name,
        lat: center[0],
        lng: center[1],
      };
    });
    setCentroids(calculated);
  }, []);

  if (zoom < LABEL_ZOOM_THRESHOLD) return null;

  return (
    <>
      {centroids.map((c, i) => (
        <Marker
          key={i}
          position={[c.lat, c.lng]}
          icon={L.divIcon({
            className: "province-label",
            html: `<span class="text-white text-[10px] font-bold uppercase tracking-wider drop-shadow-md text-center opacity-80 whitespace-nowrap" style="text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${c.name}</span>`,
            iconSize: [100, 20],
            iconAnchor: [50, 10],
          })}
          interactive={false}
        />
      ))}
    </>
  );
};

const MARITIME_ZOOM_THRESHOLD = 5;

const MaritimeLayers = () => {
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);

  useMapEvents({
    zoomend: (e) => {
      setZoom(e.target.getZoom());
    },
  });

  const isMaritimeVisible = zoom >= MARITIME_ZOOM_THRESHOLD;

  return (
    <>
      {/* EEZ Boundary - Only visible at medium zoom+ */}
      {isMaritimeVisible && (
        <Polygon
          positions={eezPolygon}
          pathOptions={{
            color: "#00bfff", // Deep Sky Blue
            weight: 2,
            dashArray: "10, 10",
            opacity: 0.6,
            fillOpacity: 0.05, // Very subtle fill
            fillColor: "#00bfff",
            className: "maritime-boundary", // For adding glow via CSS if needed
          }}
        />
      )}

      {/* Island Sovereignty Markers - Always visible or from low zoom */}
      {islandGroups.map((island) => (
        <Marker
          key={island.id}
          position={[island.lat, island.lng]}
          icon={L.divIcon({
            className: "island-marker-container",
            html: `
                            <div class="relative flex flex-col items-center justify-center">
                                <div class="w-4 h-4 bg-red-600 rounded-full border-2 border-yellow-400 shadow-md z-10 hover:scale-125 transition-transform"></div>
                                <div class="mt-1 text-white font-bold text-[10px] sm:text-xs uppercase tracking-wider text-center whitespace-nowrap drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                                    ${island.name}
                                </div>
                            </div>
                        `,
            iconSize: [200, 40],
            iconAnchor: [100, 8], // Anchor at the dot center roughly
          })}
        >
          <Tooltip direction="top" offset={[0, -10]} opacity={0.9}>
            <span className="font-serif italic">{island.description}</span>
          </Tooltip>
        </Marker>
      ))}
    </>
  );
};

export const VietnamEthnicMap: React.FC<Props> = ({
  onClusterSelect,
  onGroupSelect,
}) => {
  return (
    <div className="w-full h-full relative z-0">
      <MapContainer
        center={VIETNAM_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        touchZoom={true}
        className="w-full h-full"
        style={{ background: "#aad3df" }}
      >
        {/* Layer 1: Satellite Base Map */}
        <TileLayer
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />

        {/* Layer 1.5: Maritime Sovereignty Layers */}
        <MaritimeLayers />

        {/* Layer 2: Administrative Boundaries (Zoom Dependent) */}
        <BoundariesLayer />

        {/* Layer 3: Province Labels (Zoom Dependent) */}
        <ProvinceLabelsLayer />

        {/* Layer 5: Ethnic Marker Clusters */}
        <MarkerClusterGroup chunkedLoading>
          {ethnicClusters.map((cluster) => (
            <Marker
              key={cluster.id}
              position={[cluster.lat, cluster.lng]}
              icon={createCustomIcon(cluster.color)}
              eventHandlers={{
                click: () => onClusterSelect(cluster),
              }}
            >
              <Popup className="font-sans" minWidth={240}>
                <div className="p-2 min-w-[200px]">
                  <h3 className="font-bold text-lg font-serif text-stone-800 mb-1">
                    {cluster.region}
                  </h3>
                  <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                    Ấn vào dân tộc bạn muốn xem
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {cluster.ethnicGroups.map((g) => (
                      <button
                        key={g}
                        onClick={() => onGroupSelect(g)}
                        className="bg-stone-50 hover:bg-stone-200 hover:text-primary transition-colors text-stone-700 px-2 py-1 rounded text-xs border border-stone-300 font-medium cursor-pointer"
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-stone-600 leading-snug">
                    {cluster.description}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-8 left-8 z-[400] bg-white/90 backdrop-blur p-4 rounded shadow-lg max-w-xs border-l-4 border-primary pointer-events-none md:pointer-events-auto">
        <h4 className="font-serif font-bold text-stone-800 mb-1">
          Ethnic Distribution
        </h4>
        <p className="text-xs text-stone-600 mb-2">
          Markers indicate major population clusters. Data is generalized for
          educational purposes.
        </p>
        <div className="border-t border-stone-200 pt-2 mt-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-red-600 rounded-full border border-yellow-400"></div>
            <span className="text-[10px] font-bold text-stone-700 uppercase">
              National Sovereignty
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0 border-t-2 border-dashed border-sky-500"></div>
            <span className="text-[10px] font-medium text-stone-600">
              Exclusive Economic Zone (EEZ)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
