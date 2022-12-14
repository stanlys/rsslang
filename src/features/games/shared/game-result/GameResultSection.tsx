import { Stack, Row, Col } from 'react-bootstrap';
import API_BASE_URL from '../../../../api/constants';
import GameTurnResult from '../../../../model/GameTurnResult';
import SoundButton from '../../../shared/sound-button/SoundButton';

interface GameResultProps {
  answers: GameTurnResult[];
  areCorrect: boolean;
}

const GameResult = ({ answers, areCorrect }: GameResultProps) => {
  return (
    <Stack gap={2} className={answers.length > 0 ? '' : 'd-none'}>
      <h3>
        {areCorrect ? 'Correct' : 'Wrong'}{' '}
        <span className={`bg-${areCorrect ? 'success' : 'danger'} text-white rounded-pill px-3`}>
          {answers.length}
        </span>
      </h3>
      <Stack gap={2}>
        {answers.map((result: GameTurnResult) => (
          <Row key={result.word.id} className="row-cols-auto">
            <Col>
              <SoundButton
                soundSrc={`${API_BASE_URL}/${result.word.audio}`}
                diameter="2rem"
                variant="secondary"
              />
            </Col>
            <Col>
              <span className="fw-semibold">{result.word.word}</span>
              <span className="text-secondary"> &mdash; {result.word.wordTranslate}</span>
            </Col>
          </Row>
        ))}
      </Stack>
    </Stack>
  );
};

export default GameResult;
