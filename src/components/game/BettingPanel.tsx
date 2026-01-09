import { Location, LOCATIONS } from '@/types/game';
import { LocationCard } from './LocationCard';

interface BettingPanelProps {
  selectedBet: Location | null;
  onSelectBet: (location: Location) => void;
  onStartJourney: () => void;
}

export function BettingPanel({ selectedBet, onSelectBet, onStartJourney }: BettingPanelProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="font-pixel text-xl text-primary">Place Your Bet!</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          The hero starts at the <span className="text-castle font-semibold">🏰 Castle</span>. 
          After 5 turns, where will they end up?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {LOCATIONS.map((loc) => (
          <LocationCard
            key={loc.id}
            location={loc.id}
            isActive={true}
            isSelected={selectedBet === loc.id}
            onClick={() => onSelectBet(loc.id)}
            showProbabilities
          />
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onStartJourney}
          disabled={!selectedBet}
          className={`btn-primary-game ${
            !selectedBet ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          🎲 Start Journey
        </button>
      </div>

      {selectedBet && (
        <p className="text-center text-sm text-muted-foreground animate-slide-in">
          You're betting on: <span className="text-foreground font-semibold">
            {LOCATIONS.find(l => l.id === selectedBet)?.emoji} {LOCATIONS.find(l => l.id === selectedBet)?.name}
          </span>
        </p>
      )}
    </div>
  );
}
