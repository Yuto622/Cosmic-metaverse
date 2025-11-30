export interface PlanetData {
  id: string;
  name: string;
  color: string;
  size: number;
  distance: number; // Simplified distance unit
  speed: number; // Orbit speed multiplier
  descriptionJA: string;
  descriptionEN: string;
  hasRing?: boolean;
}

export type ActionType = 'news' | 'column' | 'quiz' | 'english';

export interface ActionButtonProps {
  label: string;
  type: ActionType;
  onClick: (type: ActionType, planetName: string) => void;
}
