import { useGame } from './context/GameContext';
import StartScreen from './pages/StartScreen';
import GameScreen from './pages/GameScreen';
import ResultScreen from './pages/ResultScreen';

function App() {
  const { state } = useGame();

  return (
    <>
      <div className="scanlines"></div>
      <div className="app-container" style={{ padding: '40px 20px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {state.gameState === 'START' && <StartScreen />}
        {state.gameState === 'PLAYING' && <GameScreen />}
        {state.gameState === 'RESULT' && <ResultScreen />}
      </div>
    </>
  );
}

export default App;
