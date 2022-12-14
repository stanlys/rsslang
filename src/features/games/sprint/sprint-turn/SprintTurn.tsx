import { Card, CloseButton, Container, Stack } from 'react-bootstrap';
import { useState } from 'react';
import API_BASE_URL from '../../../../api/constants';
import Word from '../../../../model/Word';
import SoundButton from '../../../shared/sound-button/SoundButton';
import GuessTranslationButton from './guess-translation-button/GuessTranslationButton';
import LevelIndicator from '../level-indicator/LevelIndicator';
import { LevelRules } from '../SprintRound';
import WordsProgress from '../words-progress/WordsProgress';
import styles from './SprintTurn.module.scss';
import QuitGameModal from '../../shared/QuitGameModal';

interface SprintTurnProps {
  correctWord: Word;
  translation: string;
  onAnswer: (isCorrect: boolean) => void;
  onQuit: () => void;
  level: number;
  levelRules: LevelRules;
  winsSinceLevelStart: number;
  score: number;
}

const SprintTurn = ({
  correctWord,
  translation,
  onAnswer,
  onQuit,
  level,
  levelRules,
  winsSinceLevelStart,
  score,
}: SprintTurnProps): JSX.Element => {
  const [showQuitModal, setShowQuitModal] = useState(false);

  const correctWordSoundSrc = `${API_BASE_URL}/${correctWord.audio}`;

  const handleSelect = (isCorrect: boolean): void => {
    onAnswer(isCorrect);
  };

  const handleQuit = (): void => {
    onQuit();
  };

  return (
    <Container className="flex-grow-1 d-flex flex-column justify-content-center align-items-center gap-5 position-relative">
      <CloseButton
        className="position-absolute top-0 end-0 m-3"
        onClick={() => setShowQuitModal(true)}
      />
      <Card>
        <Card.Header className="text-center fw-semibold text-bg-primary">
          Current score: {score}
        </Card.Header>
        <Card.Body className={styles.sprintCard}>
          <Stack gap={4}>
            <LevelIndicator level={level} />
            <WordsProgress levelRules={levelRules} winsSinceLevelStart={winsSinceLevelStart} />
            <div className="d-flex flex-column align-items-center gap-2">
              <div className="d-flex align-items-center gap-2">
                <SoundButton soundSrc={correctWordSoundSrc} diameter="2rem" variant="warning" />
                <span className="fs-5">{correctWord.word}</span>
              </div>
              <div className="fs-5 fw-semibold text-wrap text-center">{translation}?</div>
            </div>
            <div className="d-flex gap-2 justify-content-center">
              <GuessTranslationButton
                variant="incorrect"
                isCorrect={correctWord.wordTranslate !== translation}
                onSelect={handleSelect}
              />
              <GuessTranslationButton
                variant="correct"
                isCorrect={correctWord.wordTranslate === translation}
                onSelect={handleSelect}
              />
            </div>
          </Stack>
        </Card.Body>
      </Card>
      <QuitGameModal
        show={showQuitModal}
        onConfirm={handleQuit}
        onCancel={() => setShowQuitModal(false)}
      />
    </Container>
  );
};

export default SprintTurn;
