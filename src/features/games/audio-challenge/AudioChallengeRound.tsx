/* eslint-disable consistent-return */
import { useEffect, useMemo, useState } from 'react';
import { Spinner, Stack } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { getUserWords } from '../../../api/userWords';
import { getWords } from '../../../api/words';
import { AuthState } from '../../../model/AuthState';
import GameTurnResult from '../../../model/GameTurnResult';
import { UserWord } from '../../../model/UserWord';
import Word from '../../../model/Word';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { RootState } from '../../../store/store';
import useDictionaryLocation from '../../../utils/hooks/useDictionaryLocation';
import { fetchUserPages } from '../../dictionary/dictionarySlice';
import DifficultyLevelSelector from '../shared/difficulty-level-selector/DifficultyLevelSelector';
import GameResult from '../shared/game-result/GameResult';
import saveGameResults from '../shared/saveGameResults';
import AudioChallengeTurn from './AudioChallengeTurn';

const TURNS_COUNT = 20;
const WORDS_PER_TURN = 5;

const AudioChallengeRound = (): JSX.Element => {
  const { id: userId, authorizeStatus } = useAppSelector(
    (state: RootState): AuthState => state.authorization
  );

  const { chapter, page } = useDictionaryLocation();

  const [searchParams] = useSearchParams();
  const excludeLearnedWords = useMemo(() => {
    return searchParams.get('exclude-learned') === 'true';
  }, [searchParams]);

  const dispatch = useAppDispatch();

  const [availableWords, setAvailableWords] = useState<Word[]>([]);
  const [correctWords, setCorrectWords] = useState<Word[]>([]);
  const [correctWord, setCorrectWord] = useState<Word | null>(null);
  const [incorrectWords, setIncorrectWords] = useState<Word[]>([]);

  const [configured, setConfigured] = useState(false);
  const [enoughWords, setEnoughWords] = useState(false);
  const [started, setStarted] = useState(false);
  const [turn, setTurn] = useState(0);
  const [finished, setFinished] = useState(false);

  const [gameResult, setGameResult] = useState<GameTurnResult[]>([]);
  const [score, setScore] = useState(0);

  // 1. Prompt user to select difficulty level,
  // unless chapter and page are specified
  const renderDifficultySelector = (): JSX.Element | undefined => {
    if (!configured) {
      if (chapter === undefined && page === undefined) {
        return <DifficultyLevelSelector show={!configured} onHide={() => setConfigured(true)} />;
      }

      setConfigured(true);
    }
  };

  // Until available words are loaded, render loading spinner
  const renderLoadingSpinner = (): JSX.Element | undefined => {
    if (configured && !started) {
      return (
        <div className="d-flex flex-column align-items-center gap-2">
          <Spinner animation="border" variant="primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <h5>Loading words...</h5>
        </div>
      );
    }
  };

  // 2. Set available words
  useEffect((): void => {
    if (!configured) {
      return;
    }

    const loadWords = async (): Promise<void> => {
      const allWords = await getWords(chapter, page);
      let freeWords: Word[];

      if (authorizeStatus && excludeLearnedWords) {
        const userWords = await getUserWords(userId);
        freeWords = allWords.filter(
          (word: Word): boolean =>
            !userWords.some(
              (userWord: UserWord): boolean => word.id === userWord.wordId && userWord.isLearned
            )
        );
      } else {
        freeWords = [...allWords];
      }

      if (freeWords.length < 1) {
        setEnoughWords(false);
        setFinished(true);
        return;
      }

      setAvailableWords(freeWords);
      setEnoughWords(true);
      setStarted(true);
      setTurn(1);
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loadWords();
  }, [configured, authorizeStatus, userId, chapter, page, excludeLearnedWords]);

  // 3. Prepare for the next turn
  useEffect((): void => {
    if (!enoughWords) {
      return;
    }

    // Remove just played word from correct words
    const newCorrectWords =
      turn === 1
        ? [...availableWords]
        : correctWords.filter(({ id }: Word): boolean => id !== correctWord?.id);

    if (newCorrectWords.length === 0) {
      setEnoughWords(false);
      setFinished(true);
      return;
    }

    // Set new correct word
    let randomIndex = Math.floor(Math.random() * newCorrectWords.length);
    const newCorrectWord = newCorrectWords[randomIndex];

    // Generate new set of incorrect words
    const availableIncorrectWords = availableWords.filter(
      ({ id }: Word): boolean => id !== newCorrectWord.id
    );
    const newIncorrectWords: Word[] = [];
    for (let i = 1; i < WORDS_PER_TURN && i <= availableIncorrectWords.length; i += 1) {
      randomIndex = Math.floor(Math.random() * (availableIncorrectWords.length - 1));
      newIncorrectWords.push(availableIncorrectWords[randomIndex]);
      availableIncorrectWords.splice(randomIndex, 1);
    }

    // Update state
    setCorrectWord(newCorrectWord);
    setCorrectWords(newCorrectWords);
    setIncorrectWords(newIncorrectWords);
  }, [availableWords, enoughWords, turn]);

  const isLastTurn = (): boolean => {
    return turn === TURNS_COUNT;
  };

  const updateGameResult = (isCorrect: boolean): void => {
    const turnResult: GameTurnResult = {
      word: correctWord as Word,
      wasGuessed: isCorrect,
    };

    setGameResult([...gameResult, turnResult]);

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextTurn = (isCorrect: boolean): void => {
    updateGameResult(isCorrect);

    if (turn < TURNS_COUNT) {
      setTurn(turn + 1);
    } else {
      setFinished(true);
    }
  };

  const handleQuit = (isCorrect: boolean): void => {
    updateGameResult(isCorrect);
    setFinished(true);
  };

  // 4. Render turn
  const renderGameTurn = (): JSX.Element | undefined => {
    if (started && enoughWords && correctWord && !finished) {
      return (
        <AudioChallengeTurn
          correctWord={correctWord}
          incorrectWords={incorrectWords}
          turn={turn}
          isLastTurn={isLastTurn()}
          onNextTurn={handleNextTurn}
          onQuit={handleQuit}
        />
      );
    }
  };

  // 5. Show game results
  useEffect((): void => {
    if (finished && userId && authorizeStatus === true) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      saveGameResults(userId, new Date(), 'audio-challenge', gameResult);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(fetchUserPages(userId));
    }
  }, [authorizeStatus, chapter, dispatch, finished, gameResult, page, userId]);

  const renderGameResult = (): JSX.Element | undefined => {
    if (finished) {
      return (
        <Stack className="col-sm-9 col-md-7 col-lg-5 my-3 mx-auto flex-grow-0">
          <GameResult score={score} gameResult={gameResult} canPlayAgain={enoughWords} />
          <h5 className={`${enoughWords ? 'd-none' : ''} p-2 text-success text-center`}>
            Looks like you&apos;ve learned all words on this page.
            <br />
            Don&apos;t stop and practise further!
          </h5>
        </Stack>
      );
    }
  };

  return (
    <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
      {renderDifficultySelector()}
      {renderLoadingSpinner()}
      {renderGameTurn()}
      {renderGameResult()}
    </div>
  );
};

export default AudioChallengeRound;
