import { Location, LOCATIONS } from '@/types/game';
import { cn } from '@/lib/utils';

interface GameResultProps {
  finalLocation: Location;
  bet: Location;
  hasWon: boolean;
  onPlayAgain: () => void;
}

export function GameResult({ finalLocation, bet, hasWon, onPlayAgain }: GameResultProps) {
  const finalLocationData = LOCATIONS.find((l) => l.id === finalLocation)!;
  const betLocationData = LOCATIONS.find((l) => l.id === bet)!;

  return (
    <div className="text-center space-y-8 animate-slide-in">
      <div className={cn(
        'inline-block p-8 rounded-2xl',
        hasWon ? 'bg-accent/20' : 'bg-destructive/20'
      )}>
        <span className={cn('text-7xl block mb-4', hasWon && 'animate-celebrate')}>
          {hasWon ? '🎉' : '💀'}
        </span>
        <h2 className={cn(
          'font-pixel text-2xl mb-2',
          hasWon ? 'text-accent' : 'text-destructive'
        )}>
          {hasWon ? 'You Win!' : 'You Lose!'}
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-center gap-4 text-lg">
          <span className="text-muted-foreground">Final Location:</span>
          <span className={cn(
            'font-semibold flex items-center gap-2',
            `text-${finalLocation}`
          )}>
            {finalLocationData.emoji} {finalLocationData.name}
          </span>
        </div>

        <div className="flex items-center justify-center gap-4 text-lg">
          <span className="text-muted-foreground">Your Bet:</span>
          <span className="font-semibold flex items-center gap-2">
            {betLocationData.emoji} {betLocationData.name}
          </span>
        </div>
      </div>

      <button onClick={onPlayAgain} className="btn-primary-game">
        🔄 Play Again
      </button>
    </div>
  );
}
