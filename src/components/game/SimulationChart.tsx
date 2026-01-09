import { useState } from 'react';
import { SimulationResult, LOCATIONS } from '@/types/game';
import { runSimulations } from '@/utils/markov';
import { cn } from '@/lib/utils';

export function SimulationChart() {
  const [results, setResults] = useState<SimulationResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunSimulation = () => {
    setIsRunning(true);
    // Small delay to show loading state
    setTimeout(() => {
      const simResults = runSimulations(1000);
      setResults(simResults);
      setIsRunning(false);
    }, 500);
  };

  const maxValue = results ? Math.max(results.forest, results.castle, results.dungeon) : 0;

  const getBarHeight = (value: number): number => {
    if (maxValue === 0) return 0;
    return (value / maxValue) * 100;
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="font-pixel text-sm text-primary">Statistical Analysis</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Run 1,000 simulations to see where the character most likely ends up. 
          This reveals the <span className="text-foreground font-semibold">Stationary Distribution</span>!
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleRunSimulation}
          disabled={isRunning}
          className="btn-primary-game"
        >
          {isRunning ? '⏳ Simulating...' : '🔬 Run 1,000 Simulations'}
        </button>
      </div>

      {results && (
        <div className="space-y-6 animate-slide-in">
          {/* Bar Chart */}
          <div className="bg-secondary/30 rounded-xl p-6">
            <div className="flex items-end justify-center gap-8 h-48">
              {LOCATIONS.map((loc) => {
                const value = results[loc.id];
                const percentage = ((value / 1000) * 100).toFixed(1);
                
                return (
                  <div key={loc.id} className="flex flex-col items-center gap-2">
                    <span className="text-sm font-bold">{value}</span>
                    <span className="text-xs text-muted-foreground">({percentage}%)</span>
                    <div
                      className={cn(
                        'chart-bar w-16',
                        `location-${loc.id}`
                      )}
                      style={{
                        height: `${getBarHeight(value)}%`,
                        minHeight: '8px',
                      }}
                    />
                    <span className="text-2xl">{loc.emoji}</span>
                    <span className="text-xs text-muted-foreground">{loc.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Insight Box */}
          <div className="bg-dungeon/20 border border-dungeon/30 rounded-xl p-6 text-center">
            <span className="text-3xl mb-2 block">💡</span>
            <h4 className="font-pixel text-xs text-dungeon mb-2">Statistical Insight</h4>
            <p className="text-sm text-muted-foreground">
              The <span className="text-dungeon font-semibold">⛓️ Dungeon</span> has an 83% chance 
              to keep you trapped! Over time, most paths lead there and stay there. 
              This is why betting on the Dungeon is statistically the safest bet.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
