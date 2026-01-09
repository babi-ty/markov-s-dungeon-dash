import { Location, Step, TRANSITION_MATRIX, SimulationResult } from '@/types/game';

export function getNextLocation(current: Location): { next: Location; roll: number } {
  const roll = Math.random();
  const probabilities = TRANSITION_MATRIX[current];
  
  let cumulative = 0;
  for (const [location, prob] of Object.entries(probabilities)) {
    cumulative += prob;
    if (roll <= cumulative) {
      return { next: location as Location, roll: Math.floor(roll * 100) + 1 };
    }
  }
  
  // Fallback (shouldn't happen)
  return { next: current, roll: Math.floor(roll * 100) + 1 };
}

export function simulateJourney(startLocation: Location = 'castle', steps: number = 5): Step[] {
  const journey: Step[] = [];
  let current = startLocation;
  
  for (let i = 1; i <= steps; i++) {
    const { next, roll } = getNextLocation(current);
    journey.push({
      turn: i,
      roll,
      from: current,
      to: next,
    });
    current = next;
  }
  
  return journey;
}

export function runSimulations(count: number = 1000): SimulationResult {
  const results: SimulationResult = { forest: 0, castle: 0, dungeon: 0 };
  
  for (let i = 0; i < count; i++) {
    const journey = simulateJourney('castle', 5);
    const finalLocation = journey[journey.length - 1].to;
    results[finalLocation]++;
  }
  
  return results;
}

export function getLocationEmoji(location: Location): string {
  const emojis: Record<Location, string> = {
    forest: '🌲',
    castle: '🏰',
    dungeon: '⛓️',
  };
  return emojis[location];
}

export function getLocationName(location: Location): string {
  const names: Record<Location, string> = {
    forest: 'Forest',
    castle: 'Castle',
    dungeon: 'Dungeon',
  };
  return names[location];
}
