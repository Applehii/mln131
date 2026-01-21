// VietnamMap3D.tsx
import React, { useMemo, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import * as THREE from 'three';
import vietnamGeoJson from '../data/vietnam.geo.json';
import { EthnicMarker } from './EthnicMarker';
import { ethnicGroups, type EthnicGroup } from '../data/ethnicGroups';

// Using JSON directly requires "resolveJsonModule" in tsconfig, typically enabled.

type Feature = {
  type: 'Feature';
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: any[];
  };
  properties: {
    name: string;
    [key: string]: any;
  };
};

const PROJECTION_CENTER = [105.8, 16.0]; 
const MAP_SCALE = 5;

// Simple equirectangular projection centered on Vietnam
const project = (lon: number, lat: number): [number, number] => {
  const x = (lon - PROJECTION_CENTER[0]) * MAP_SCALE;
  const y = (lat - PROJECTION_CENTER[1]) * MAP_SCALE;
  return [x, y];
};

const ProvinceMesh: React.FC<{ feature: Feature; onSelect: (name: string) => void }> = ({ feature, onSelect }) => {
  const shapes = useMemo(() => {
    const shapes: THREE.Shape[] = [];
    const geometry = feature.geometry;

    if (!geometry) return [];

    const createShape = (ring: number[][]) => {
      const shape = new THREE.Shape();
      if (!ring || ring.length === 0) return shape;

      const [startLon, startLat] = ring[0];
      const [startX, startY] = project(startLon, startLat);
      shape.moveTo(startX, startY);

      for (let i = 1; i < ring.length; i++) {
        const [lon, lat] = ring[i];
        const [x, y] = project(lon, lat);
        shape.lineTo(x, y);
      }
      return shape;
    };

    if (geometry.type === 'Polygon') {
      if (geometry.coordinates && geometry.coordinates.length > 0) {
        shapes.push(createShape(geometry.coordinates[0]));
      }
    } else if (geometry.type === 'MultiPolygon') {
        if (geometry.coordinates) {
            geometry.coordinates.forEach((polygon) => {
                if (polygon && polygon.length > 0) {
                    shapes.push(createShape(polygon[0]));
                }
            });
        }
    }
    return shapes;
  }, [feature]);

  const [hovered, setHovered] = useState(false);

  return (
    <group>
      {shapes.map((shape, i) => (
        <mesh
          key={i}
          position={[0, 0, 0]}
          onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
          onPointerOut={() => setHovered(false)}
          onClick={(e) => { e.stopPropagation(); onSelect(feature.properties.name); }}
        >
          <extrudeGeometry args={[shape, { depth: 0.1, bevelEnabled: true, bevelSize: 0.01, bevelThickness: 0.01 }]} />
          <meshStandardMaterial
            color={hovered ? '#A0522D' : '#8B0000'} // Sienna hover, DarkRed default
            opacity={0.9}
            transparent
            roughness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};

// Helper to handle window resize explicitly if needed, though R3F handles it. 
// Adding it to ensure projection matrix updates if container changes.
const ResizeHandler = () => {
  const { camera, gl } = useThree();
  useEffect(() => {
    const handleResize = () => {
      // R3F handles gl.setSize automatically based on parent container
      // Just need to ensure camera aspect is correct
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [camera, gl]);
  return null;
};

export const VietnamMap3D: React.FC<{ onGroupSelect: (group: EthnicGroup) => void }> = ({ onGroupSelect }) => {
    const features = (vietnamGeoJson as any).features as Feature[];

    return (
        <div className="relative w-full h-full overflow-hidden"> 
            {/* Canvas needs to bridge the full container */}
            <Canvas 
                className="absolute inset-0"
                camera={{ position: [0, -12, 18], fov: 40 }}
                dpr={[1, 2]} // Handle pixel ratio
            >
                <ResizeHandler />
                <color attach="background" args={['#fdfbf7']} /> 
                <fog attach="fog" args={['#fdfbf7', 10, 40]} />

                <ambientLight intensity={0.6} />
                <spotLight position={[10, 10, 20]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, 10]} intensity={0.5} />
                
                <OrbitControls 
                    enableZoom={true} 
                    enablePan={true}
                    minDistance={5}
                    maxDistance={30}
                    maxPolarAngle={Math.PI / 2.2}
                />

                <Center>
                    <group rotation={[-Math.PI / 2, 0, 0]}> {/* Flat on XZ */}
                        {features.map((feature, index) => (
                            <ProvinceMesh key={index} feature={feature} onSelect={(name) => console.log('Region:', name)} />
                        ))}
                        
                        {ethnicGroups.map(group => {
                            const [lat, lon] = group.coordinates;
                            const [x, y] = project(lon, lat);
                            return (
                                <EthnicMarker 
                                    key={group.id} 
                                    position={[x, y, 0.15]} // Above extruded map
                                    group={group}
                                    onClick={() => onGroupSelect(group)}
                                />
                            );
                        })}
                    </group>
                </Center>
            </Canvas>
        </div>
    );
};
