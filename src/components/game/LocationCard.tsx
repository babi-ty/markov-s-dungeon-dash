import { Location, LOCATIONS } from '@/types/game';
import { cn } from '@/lib/utils';

interface LocationCardProps {
  location: Location;
  isActive: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  showProbabilities?: boolean;
}

export function LocationCard({
  location,
  isActive,
  isSelected,
  onClick,
  showProbabilities,
}: LocationCardProps) {
  const locationData = LOCATIONS.find((l) => l.id === location)!;

  const probabilities: Record<Location, string> = {
    forest: '66% stay, 34% → Castle',
    castle: '50% → Forest, 50% → Dungeon',
    dungeon: '83% stay, 17% → Castle',
  };

  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={cn(
        'location-card w-full text-left transition-all duration-500',
        `location-${location}`,
        isActive ? 'location-active' : 'location-inactive',
        isSelected && 'ring-4 ring-white/50',
        onClick && 'cursor-pointer hover:scale-105'
      )}
    >
      <div className="relative z-10">
        <span className="text-5xl block mb-3 animate-float" style={{ animationDelay: `${Math.random() * 2}s` }}>
          {locationData.emoji}
        </span>
        <h3 className="font-pixel text-sm text-white mb-2">{locationData.name}</h3>
        {showProbabilities && (
          <p className="text-xs text-white/80 font-medium">{probabilities[location]}</p>
        )}
      </div>
      
      {/* Decorative particles */}
      <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.5}s`,
            }}
          />
        ))}
      </div>
    </button>
  );
}
