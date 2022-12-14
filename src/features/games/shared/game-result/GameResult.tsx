import { Button, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import GameTurnResult from '../../../../model/GameTurnResult';
import styles from './GameResult.module.scss';
import GameResultSection from './GameResultSection';

interface GameResultProps {
  score: number;
  gameResult: GameTurnResult[];
  canPlayAgain?: boolean;
}

const GameResult = ({ score, gameResult, canPlayAgain = true }: GameResultProps) => {
  const navigate = useNavigate();
  const correctGuesses = gameResult.filter((result: GameTurnResult): boolean => result.wasGuessed);
  const wrongGuesses = gameResult.filter((result: GameTurnResult): boolean => !result.wasGuessed);

  return (
    <Stack gap={3} className="my-3 mx-auto flex-grow-0">
      <h2 className="text-center">Your score: {score}</h2>
      <GameResultSection answers={wrongGuesses} areCorrect={false} />
      <hr className={wrongGuesses.length > 0 && correctGuesses.length > 0 ? '' : 'd-none'} />
      <GameResultSection answers={correctGuesses} areCorrect />
      <Button
        className={`${styles.restartButton} ${canPlayAgain ? '' : 'd-none'}`}
        onClick={() => navigate(0)}
      >
        Train again
      </Button>
    </Stack>
  );
};

export default GameResult;
