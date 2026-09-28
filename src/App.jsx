import { Layout } from './components/Layout/Layout';
import { SCREENS } from './features/game/constants';
import { useGame } from './features/game/hooks/useGame';
import { GameScreen } from './pages/GameScreen/GameScreen';
import { ResultScreen } from './pages/ResultScreen/ResultScreen';
import { StartScreen } from './pages/StartScreen/StartScreen';

export default function App() {
  const game = useGame();

  return (
    <Layout>
      {game.screen === SCREENS.START && <StartScreen onStart={game.start} />}
      {game.screen === SCREENS.PLAYING && <GameScreen game={game} />}
      {game.screen === SCREENS.RESULTS && <ResultScreen game={game} />}
    </Layout>
  );
}
