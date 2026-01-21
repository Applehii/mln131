import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { EthnicGroup } from '../data/ethnicGroups';

interface Props {
  position: [number, number, number];
  group: EthnicGroup;
  onClick: () => void;
}

export const EthnicMarker: React.FC<Props> = ({ position, group, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
        const t = state.clock.getElapsedTime();
        // Pulsing scale effect
        meshRef.current.scale.setScalar(1 + Math.sin(t * 3) * 0.15);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      >
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial 
            color={hovered ? '#fbbf24' : '#ef4444'} 
            emissive={hovered ? '#fbbf24' : '#b91c1c'}
            emissiveIntensity={hovered ? 2 : 0.8}
            roughness={0.2}
        />
      </mesh>
      
      {/* Label on hover */}
      {hovered && (
          <Html position={[0, 0.4, 0]} center style={{ pointerEvents: 'none' }}>
              <div className="bg-stone-900/90 text-stone-100 text-xs px-2 py-1 rounded shadow-xl whitespace-nowrap border border-stone-700 font-serif">
                  {group.name}
              </div>
          </Html>
      )}

      {/* Ripple effect ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.15, 0]}>
        <ringGeometry args={[0.25, 0.3, 32]} />
        <meshBasicMaterial color={hovered ? '#fbbf24' : '#ef4444'} transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};
