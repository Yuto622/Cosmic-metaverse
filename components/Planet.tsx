import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Color, AdditiveBlending, DoubleSide } from 'three';
import { Html, Text, Ring } from '@react-three/drei';
import { PlanetData } from '../types';

interface PlanetProps {
  data: PlanetData;
  isSelected: boolean;
  isPaused: boolean;
  onSelect: (planet: PlanetData) => void;
}

const Planet: React.FC<PlanetProps> = ({ data, isSelected, isPaused, onSelect }) => {
  const meshRef = useRef<Mesh>(null);
  const orbitRef = useRef<Mesh>(null);
  const atmosphereRef = useRef<Mesh>(null);
  
  // Random starting angle
  const [initialAngle] = useState(() => Math.random() * Math.PI * 2);
  // Current orbital progress
  const progress = useRef(initialAngle);

  useFrame(({ clock }, delta) => {
    // Determine effective time delta based on paused state
    // When paused, we slow down significantly or stop (here: stop for inspection)
    const dt = isPaused ? 0 : delta;

    if (orbitRef.current) {
      // Orbit rotation
      progress.current += dt * 0.1 * data.speed;
      orbitRef.current.position.x = Math.cos(progress.current) * data.distance;
      orbitRef.current.position.z = Math.sin(progress.current) * data.distance;
    }
    
    if (meshRef.current) {
      // Self rotation (always rotating slowly even when paused, looks better)
      meshRef.current.rotation.y += 0.005;
    }

    if (atmosphereRef.current) {
       // Pulse atmosphere slightly
       const scale = 1.2 + Math.sin(clock.elapsedTime * 2) * 0.02;
       atmosphereRef.current.scale.set(scale, scale, scale);
    }
  });

  // Unique visual traits based on planet ID
  const isGasGiant = ['jupiter', 'saturn', 'uranus', 'neptune'].includes(data.id);
  const hasAtmosphere = ['earth', 'venus', 'mars'].includes(data.id);

  return (
    <>
      {/* Orbit Path Visualizer - Fades out when selected to reduce clutter */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[data.distance - 0.02, data.distance + 0.02, 128]} />
        <meshBasicMaterial 
          color="#ffffff" 
          opacity={isSelected ? 0.05 : 0.15} 
          transparent 
          side={DoubleSide} 
        />
      </mesh>

      {/* The Planet Group */}
      <group ref={orbitRef}>
        <group>
            {/* Selection/Hover Area (Invisible but larger) */}
            <mesh 
              visible={false} 
              scale={[1.5, 1.5, 1.5]}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(data);
              }}
              onPointerOver={() => (document.body.style.cursor = 'pointer')}
              onPointerOut={() => (document.body.style.cursor = 'auto')}
            >
               <sphereGeometry args={[data.size, 16, 16]} />
            </mesh>

            {/* Main Planet Sphere */}
            <mesh ref={meshRef}>
              <sphereGeometry args={[data.size, 64, 64]} />
              <meshStandardMaterial
                color={data.color}
                roughness={isGasGiant ? 0.4 : 0.7}
                metalness={isGasGiant ? 0.1 : 0.2}
                emissive={data.color}
                emissiveIntensity={0.1}
              />
              
              {/* Target/Selection Reticle */}
              {isSelected && (
                <Html center distanceFactor={12} zIndexRange={[100, 0]}>
                   <div className="relative flex flex-col items-center justify-center w-40 h-40 pointer-events-none animate-[spin_10s_linear_infinite]">
                      <div className="absolute inset-0 border border-dashed border-cyan-400/50 rounded-full opacity-50"></div>
                      <div className="absolute inset-2 border-t-2 border-b-2 border-cyan-300 rounded-full"></div>
                   </div>
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                      <div className="text-cyan-300 text-[10px] font-mono tracking-[0.2em] animate-pulse whitespace-nowrap bg-black/60 px-2 rounded">
                        TARGET LOCKED
                      </div>
                   </div>
                </Html>
              )}

              {/* Planet Name Label (Always visible but fades when far) */}
              {!isSelected && (
                <Html position={[0, data.size + 0.5, 0]} center distanceFactor={10} occlude>
                  <div className="text-white/60 text-xs font-sans tracking-widest uppercase transition-opacity hover:text-white hover:scale-110 cursor-pointer pointer-events-none drop-shadow-md">
                    {data.name}
                  </div>
                </Html>
              )}
            </mesh>

            {/* Atmosphere Glow for Rocky Planets */}
            {hasAtmosphere && (
              <mesh ref={atmosphereRef}>
                <sphereGeometry args={[data.size, 32, 32]} />
                <meshBasicMaterial
                  color={data.color}
                  transparent
                  opacity={0.15}
                  blending={AdditiveBlending}
                  side={DoubleSide}
                />
              </mesh>
            )}

            {/* Saturn's Rings (Improved) */}
            {data.hasRing && (
              <group rotation={[-Math.PI / 2 + 0.4, 0, 0]}>
                {/* Main Ring */}
                <mesh>
                  <ringGeometry args={[data.size * 1.4, data.size * 2.2, 64]} />
                  <meshStandardMaterial color="#C5AB6E" opacity={0.8} transparent side={DoubleSide} />
                </mesh>
                {/* Inner Ring Detail */}
                <mesh>
                  <ringGeometry args={[data.size * 1.5, data.size * 1.6, 64]} />
                  <meshBasicMaterial color="#444" opacity={0.5} transparent side={DoubleSide} />
                </mesh>
              </group>
            )}
        </group>
      </group>
    </>
  );
};

export default Planet;