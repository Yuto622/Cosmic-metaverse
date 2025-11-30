import React, { useState } from 'react';
import Scene from './components/Scene';
import InfoPanel from './components/InfoPanel';
import DetailScreen from './components/DetailScreen';
import { PlanetData, ActionType } from './types';

const App: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [activeAction, setActiveAction] = useState<{ type: ActionType; planetName: string } | null>(null);

  const handlePlanetSelect = (planet: PlanetData | null) => {
    setSelectedPlanet(planet);
    // If we select a new planet, close any open modal
    setActiveAction(null);
  };

  const handleAction = (type: ActionType, planetName: string) => {
    setActiveAction({ type, planetName });
  };

  const handleCloseModal = () => {
    setActiveAction(null);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black font-sans text-white select-none">
      
      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-0">
        <Scene 
          selectedPlanet={selectedPlanet} 
          onSelectPlanet={handlePlanetSelect} 
        />
      </div>

      {/* UI Overlay Layer - Info Panel */}
      {/* We hide the info panel when the modal is active to reduce clutter */}
      <div className={`transition-all duration-500 ${activeAction ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100'}`}>
        <InfoPanel 
          planet={selectedPlanet} 
          onAction={handleAction} 
        />
      </div>

      {/* Detail Screen Overlay */}
      {activeAction && selectedPlanet && (
        <DetailScreen 
          type={activeAction.type} 
          planet={selectedPlanet} 
          onClose={handleCloseModal} 
        />
      )}
      
      {/* Persistent HUD Elements */}
      <div className={`absolute top-0 left-0 p-6 z-10 transition-all duration-500 ${selectedPlanet || activeAction ? 'opacity-40' : 'opacity-100'}`}>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          COSMIC <span className="text-cyan-400">EXPLORER</span>
        </h1>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <p className="text-[10px] text-cyan-200 tracking-[0.2em] uppercase font-mono">
            Live System Simulation
          </p>
        </div>
      </div>

    </div>
  );
};

export default App;
