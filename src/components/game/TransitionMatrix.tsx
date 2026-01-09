import { LOCATIONS, TRANSITION_MATRIX, Location } from '@/types/game';
import { cn } from '@/lib/utils';

export function TransitionMatrix() {
  const getCellColor = (value: number): string => {
    if (value === 0) return 'bg-secondary/30 text-muted-foreground';
    if (value < 0.3) return 'bg-destructive/30 text-destructive';
    if (value < 0.6) return 'bg-castle/30 text-castle';
    return 'bg-accent/30 text-accent';
  };

  return (
    <div className="space-y-4">
      <h3 className="font-pixel text-sm text-primary text-center">Transition Matrix</h3>
      <p className="text-sm text-muted-foreground text-center max-w-md mx-auto">
        This matrix shows the probability of moving from one location (row) to another (column).
      </p>

      <div className="overflow-x-auto">
        <table className="w-full max-w-lg mx-auto">
          <thead>
            <tr>
              <th className="p-2 text-xs text-muted-foreground">From / To</th>
              {LOCATIONS.map((loc) => (
                <th key={loc.id} className="p-2 text-center">
                  <span className="text-2xl block">{loc.emoji}</span>
                  <span className="text-xs text-muted-foreground">{loc.name}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LOCATIONS.map((fromLoc) => (
              <tr key={fromLoc.id}>
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{fromLoc.emoji}</span>
                    <span className="text-xs text-muted-foreground">{fromLoc.name}</span>
                  </div>
                </td>
                {LOCATIONS.map((toLoc) => {
                  const value = TRANSITION_MATRIX[fromLoc.id][toLoc.id];
                  return (
                    <td key={toLoc.id} className="p-1">
                      <div
                        className={cn(
                          'matrix-cell font-bold',
                          getCellColor(value)
                        )}
                      >
                        {(value * 100).toFixed(0)}%
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
