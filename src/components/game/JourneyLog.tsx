import { Step, Location } from '@/types/game';
import { getLocationEmoji, getLocationName } from '@/utils/markov';
import { cn } from '@/lib/utils';

interface JourneyLogProps {
  steps: Step[];
  currentStep: number;
}

export function JourneyLog({ steps, currentStep }: JourneyLogProps) {
  const getStepDescription = (step: Step): string => {
    if (step.from === step.to) {
      return `Stayed in ${getLocationName(step.to)}`;
    }
    return `Moved to ${getLocationName(step.to)}`;
  };

  const getColorClass = (location: Location): string => {
    const colors: Record<Location, string> = {
      forest: 'text-forest',
      castle: 'text-castle',
      dungeon: 'text-dungeon',
    };
    return colors[location];
  };

  return (
    <div className="space-y-4">
      <h3 className="font-pixel text-sm text-primary text-center mb-6">Journey Log</h3>
      
      <div className="space-y-3">
        {/* Starting position */}
        <div className="step-log animate-slide-in flex items-center gap-3">
          <span className="text-2xl">🏰</span>
          <div>
            <span className="text-xs text-muted-foreground block">Start</span>
            <span className="text-castle font-semibold">Castle (Starting Point)</span>
          </div>
        </div>

        {/* Journey steps */}
        {steps.slice(0, currentStep).map((step, index) => (
          <div
            key={step.turn}
            className="step-log animate-slide-in flex items-center gap-3"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="text-2xl">{getLocationEmoji(step.to)}</span>
            <div className="flex-1">
              <span className="text-xs text-muted-foreground block">
                Turn {step.turn} • Rolled {step.roll}
              </span>
              <span className={cn('font-semibold', getColorClass(step.to))}>
                {getStepDescription(step)}
              </span>
            </div>
            {step.from === step.to && (
              <span className="text-xs bg-secondary px-2 py-1 rounded">Trapped!</span>
            )}
          </div>
        ))}

        {/* Loading indicator for next step */}
        {currentStep < 5 && currentStep > 0 && (
          <div className="step-log opacity-50 flex items-center gap-3">
            <span className="text-2xl animate-pulse">🎲</span>
            <span className="text-muted-foreground">Rolling dice...</span>
          </div>
        )}
      </div>
    </div>
  );
}
