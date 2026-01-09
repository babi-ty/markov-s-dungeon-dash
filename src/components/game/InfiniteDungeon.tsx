import { useState, useEffect, useCallback } from 'react';
import { GameState, Location, Step } from '@/types/game';
import { simulateJourney } from '@/utils/markov';
import { BettingPanel } from './BettingPanel';
import { LocationCard } from './LocationCard';
import { JourneyLog } from './JourneyLog';
import { GameResult } from './GameResult';
import { TransitionMatrix } from './TransitionMatrix';
import { SimulationChart } from './SimulationChart';

const initialState: GameState = {
  phase: 'betting',
  bet: null,
  currentLocation: 'castle',
  steps: [],
  currentStep: 0,
  hasWon: null,
};

export function InfiniteDungeon() {
  const [gameState, setGameState] = useState<GameState>(initialState);

  const handleSelectBet = (location: Location) => {
    setGameState((prev) => ({ ...prev, bet: location }));
  };

  const handleStartJourney = useCallback(() => {
    if (!gameState.bet) return;

    const journey = simulateJourney('castle', 5);
    setGameState((prev) => ({
      ...prev,
      phase: 'playing',
      steps: journey,
      currentStep: 0,
      currentLocation: 'castle',
    }));
  }, [gameState.bet]);

  // Animate through steps
  useEffect(() => {
    if (gameState.phase !== 'playing') return;
    if (gameState.currentStep >= 5) {
      // Game finished
      const finalLocation = gameState.steps[4].to;
      setGameState((prev) => ({
        ...prev,
        phase: 'finished',
        currentLocation: finalLocation,
        hasWon: finalLocation === prev.bet,
      }));
      return;
    }

    const timer = setTimeout(() => {
      setGameState((prev) => {
        const nextStep = prev.currentStep + 1;
        const newLocation = prev.steps[nextStep - 1]?.to || prev.currentLocation;
        return {
          ...prev,
          currentStep: nextStep,
          currentLocation: newLocation,
        };
      });
    }, 1200);

    return () => clearTimeout(timer);
  }, [gameState.phase, gameState.currentStep, gameState.steps]);

  const handlePlayAgain = () => {
    setGameState(initialState);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="font-pixel text-2xl md:text-4xl text-primary">
            The Infinite Dungeon
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A random walk through Markov Chains. Can you predict where the hero will end up?
          </p>
        </header>

        {/* Game Area */}
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-6 md:p-8">
          {gameState.phase === 'betting' && (
            <BettingPanel
              selectedBet={gameState.bet}
              onSelectBet={handleSelectBet}
              onStartJourney={handleStartJourney}
            />
          )}

          {gameState.phase === 'playing' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Current Location Display */}
              <div className="space-y-6">
                <h3 className="font-pixel text-sm text-center text-muted-foreground">
                  Current Location
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <LocationCard
                    location="forest"
                    isActive={gameState.currentLocation === 'forest'}
                  />
                  <LocationCard
                    location="castle"
                    isActive={gameState.currentLocation === 'castle'}
                  />
                  <LocationCard
                    location="dungeon"
                    isActive={gameState.currentLocation === 'dungeon'}
                  />
                </div>
                <div className="text-center">
                  <span className="text-sm text-muted-foreground">
                    Turn {gameState.currentStep} of 5
                  </span>
                  <div className="flex gap-1 justify-center mt-2">
                    {[1, 2, 3, 4, 5].map((turn) => (
                      <div
                        key={turn}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          turn <= gameState.currentStep
                            ? 'bg-primary'
                            : 'bg-secondary'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Journey Log */}
              <JourneyLog
                steps={gameState.steps}
                currentStep={gameState.currentStep}
              />
            </div>
          )}

          {gameState.phase === 'finished' && gameState.bet && (
            <GameResult
              finalLocation={gameState.currentLocation}
              bet={gameState.bet}
              hasWon={gameState.hasWon!}
              onPlayAgain={handlePlayAgain}
            />
          )}
        </div>

        {/* Educational Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="font-pixel text-lg text-primary mb-2">
              🎓 Behind the Scenes
            </h2>
            <p className="text-muted-foreground">
              Discover the math that makes this game work!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-6">
              <TransitionMatrix />
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-6">
              <SimulationChart />
            </div>
          </div>

          {/* Educational Note */}
          <div className="bg-secondary/30 rounded-xl p-6 border border-border">
            <h3 className="font-pixel text-xs text-primary mb-4">📚 What are Markov Chains?</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                A <span className="text-foreground font-semibold">Markov Chain</span> is a 
                mathematical system that hops between states based on probability rules. 
                The key property: <em>where you go next only depends on where you are now</em>, 
                not where you've been before!
              </p>
              <p>
                In our game, the <span className="text-dungeon font-semibold">⛓️ Dungeon</span> is 
                an "absorbing state" - once you're there, it's very hard to escape. Over many 
                simulations, this is why most journeys end in the Dungeon!
              </p>
              <p>
                Markov Chains are used in Google's PageRank algorithm, weather prediction, 
                speech recognition, and even predicting stock market trends!
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-xs text-muted-foreground py-4">
          Built with 💜 to teach probability and Markov Chains
        </footer>
      </div>
    </div>
  );
}
