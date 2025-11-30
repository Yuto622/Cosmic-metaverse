import React, { useEffect, useState } from 'react';
import { PlanetData, ActionType } from '../types';

interface InfoPanelProps {
  planet: PlanetData | null;
  onAction: (type: ActionType, planetName: string) => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ planet, onAction }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (planet) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [planet]);

  if (!planet) {
    return (
      <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center pointer-events-none transition-opacity duration-500 opacity-80">
        <div className="flex items-center space-x-2 animate-pulse mb-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            <div className="w-12 h-[1px] bg-cyan-400/50"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
        </div>
        <div className="bg-black/60 backdrop-blur-md px-6 py-2 rounded-full border border-cyan-500/30 text-cyan-100/80 text-xs tracking-[0.2em] font-mono shadow-[0_0_15px_rgba(34,211,238,0.2)]">
          SYSTEM ACTIVE // 惑星を選択してください
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`absolute bottom-0 left-0 right-0 h-[40vh] md:h-[35vh] flex flex-col justify-end transition-transform duration-500 ease-out z-20 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="w-full h-full bg-slate-950/80 backdrop-blur-xl rounded-t-[2.5rem] border-t border-cyan-500/30 shadow-[0_-10px_50px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col">
        
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
        <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-cyan-900/20 to-transparent pointer-events-none"></div>

        {/* Drag Handle / Decor */}
        <div className="w-full flex justify-center pt-4 pb-2 shrink-0 z-10">
          <div className="w-16 h-1 bg-cyan-500/40 rounded-full"></div>
        </div>

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto px-6 pb-8 pt-2 relative z-10">
          <div className="max-w-4xl mx-auto">
            
            {/* Header Area */}
            <div className="flex items-end justify-between mb-4 border-b border-white/10 pb-4">
              <div>
                <div className="text-cyan-400 text-[10px] font-mono tracking-widest mb-1">DESIGNATION</div>
                <h2 className="text-4xl font-bold text-white tracking-tighter drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] font-sans">
                  {planet.name.toUpperCase()}
                </h2>
              </div>
              <div className="text-right">
                <div className="text-cyan-400 text-[10px] font-mono tracking-widest mb-1">DISTANCE</div>
                <div className="text-xl text-white/90 font-mono">{planet.distance} <span className="text-sm text-white/50">AU</span></div>
              </div>
            </div>

            {/* Main Text */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-black/20 p-4 rounded-lg border-l-2 border-cyan-500/50">
                <p className="text-cyan-50 text-sm leading-7 font-medium">
                  {planet.descriptionJA}
                </p>
              </div>
              <div className="bg-black/20 p-4 rounded-lg border-l-2 border-purple-500/50">
                <p className="text-white/60 text-sm leading-relaxed italic font-light">
                  {planet.descriptionEN}
                </p>
              </div>
            </div>

            {/* Action Matrix */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <HoloButton
                label="NEWS"
                sub="最新ニュース"
                icon="📡"
                theme="cyan"
                onClick={() => onAction('news', planet.name)}
              />
              <HoloButton
                label="COLUMN"
                sub="宇宙コラム"
                icon="🚀"
                theme="blue"
                onClick={() => onAction('column', planet.name)}
              />
              <HoloButton
                label="QUIZ"
                sub="クイズ挑戦"
                icon="🧩"
                theme="purple"
                onClick={() => onAction('quiz', planet.name)}
              />
              <HoloButton
                label="ENGLISH"
                sub="英語解説"
                icon="A/a"
                theme="emerald"
                onClick={() => onAction('english', planet.name)}
              />
            </div>
            
            <div className="mt-8 text-center">
               <div className="inline-block text-[10px] text-white/20 font-mono border border-white/10 px-2 py-1 rounded">
                 DATA STREAM // SECURE CONNECTION
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

interface HoloButtonProps {
  label: string;
  sub: string;
  icon: string;
  theme: 'cyan' | 'blue' | 'purple' | 'emerald';
  onClick: () => void;
}

const HoloButton: React.FC<HoloButtonProps> = ({ label, sub, icon, theme, onClick }) => {
  const themeColors = {
    cyan: 'border-cyan-500/50 hover:bg-cyan-500/10 text-cyan-300',
    blue: 'border-blue-500/50 hover:bg-blue-500/10 text-blue-300',
    purple: 'border-purple-500/50 hover:bg-purple-500/10 text-purple-300',
    emerald: 'border-emerald-500/50 hover:bg-emerald-500/10 text-emerald-300',
  };

  return (
    <button
      onClick={onClick}
      className={`relative group overflow-hidden border ${themeColors[theme]} backdrop-blur-sm rounded-lg p-3 transition-all duration-200 active:scale-95`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="flex flex-col items-center relative z-10">
        <span className="text-xl mb-1 opacity-80 group-hover:scale-110 transition-transform duration-200">{icon}</span>
        <span className="font-bold text-sm tracking-wider">{label}</span>
        <span className="text-[10px] opacity-60 mt-1">{sub}</span>
      </div>
    </button>
  );
};

export default InfoPanel;