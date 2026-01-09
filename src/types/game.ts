export type Location = 'forest' | 'castle' | 'dungeon';

export interface Step {
  turn: number;
  roll: number;
  from: Location;
  to: Location;
}

export interface GameState {
  phase: 'betting' | 'playing' | 'finished';
  bet: Location | null;
  currentLocation: Location;
  steps: Step[];
  currentStep: number;
  hasWon: boolean | null;
}

export interface SimulationResult {
  forest: number;
  castle: number;
  dungeon: number;
}

export const LOCATIONS: { id: Location; name: string; emoji: string; color: string }[] = [
  { id: 'forest', name: 'Forest', emoji: '🌲', color: 'forest' },
  { id: 'castle', name: 'Castle', emoji: '🏰', color: 'castle' },
  { id: 'dungeon', name: 'Dungeon', emoji: '⛓️', color: 'dungeon' },
];

// Transition probabilities
export const TRANSITION_MATRIX: Record<Location, Record<Location, number>> = {
  forest: { forest: 0.66, castle: 0.34, dungeon: 0 },
  castle: { forest: 0.5, castle: 0, dungeon: 0.5 },
  dungeon: { forest: 0, castle: 0.17, dungeon: 0.83 },
};
