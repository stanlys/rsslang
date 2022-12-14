import { createStatistic } from '../../../api/statistics';
import { createUserWord, getUserWords, updateUserWord } from '../../../api/userWords';
import GameTurnResult from '../../../model/GameTurnResult';
import { GameType, NewStatistic } from '../../../model/Statistics';
import { UserWord } from '../../../model/UserWord';

const createMissingUserWord = async (
  userId: string,
  wordId: string,
  wasGuessed: boolean
): Promise<boolean> => {
  try {
    await createUserWord(userId, wordId, {
      wasPlayed: true,
      correctGuessCount: wasGuessed ? 1 : 0,
      wrongGuessCount: wasGuessed ? 0 : 1,
      isLearned: wasGuessed,
      isDifficult: false,
    });

    return true;
  } catch (error) {
    return false;
  }
};

const updateExistingUserWord = async (
  userId: string,
  existingUserWord: UserWord,
  wasGuessed: boolean
): Promise<boolean> => {
  try {
    const { wordId, isDifficult, optional } = existingUserWord;

    await updateUserWord(userId, wordId, {
      wasPlayed: true,
      correctGuessCount: wasGuessed ? 1 : 0,
      wrongGuessCount: wasGuessed ? 0 : 1,
      isLearned: wasGuessed,
      isDifficult: isDifficult && !wasGuessed,
      optional,
    });

    return true;
  } catch (error) {
    return false;
  }
};

const saveGameResults = async (
  userId: string,
  gameDate: Date,
  gameType: GameType,
  gameResult: GameTurnResult[]
): Promise<boolean> => {
  const totalWords = gameResult.length;

  const guessedWords = gameResult.filter(
    (result: GameTurnResult): boolean => result.wasGuessed
  ).length;

  const guessSeries = [0];
  let currentSeries = 0;

  let newWords = 0;
  let learnedWords = 0;

  const userWords = await getUserWords(userId);

  await Promise.all(
    gameResult.map(async (result: GameTurnResult): Promise<void> => {
      const matchingUserWord = userWords.find((userWord) => userWord.wordId === result.word.id);
      const wasPlayedBefore = matchingUserWord && matchingUserWord.wasPlayed;
      const isAlreadyLearned = matchingUserWord && matchingUserWord.isLearned;

      // Update new words counter as needed
      newWords += matchingUserWord && wasPlayedBefore ? 0 : 1;

      // Update learned words counter as needed
      if (result.wasGuessed) {
        learnedWords += matchingUserWord && isAlreadyLearned ? 0 : 1;
      }

      // Update max guess series counter as needed
      if (result.wasGuessed) {
        guessSeries[currentSeries] += 1;
      } else if (guessSeries[currentSeries] > 0) {
        currentSeries += 1;
        guessSeries.push(0);
      }

      // Create missing user word
      if (!matchingUserWord) {
        await createMissingUserWord(userId, result.word.id, result.wasGuessed);
      }

      // Update existing user word
      if (matchingUserWord) {
        await updateExistingUserWord(userId, matchingUserWord, result.wasGuessed);
      }
    })
  );

  // Save new statistics record
  const newStatistic: NewStatistic = {
    date: gameDate.toISOString(),
    source: gameType,
    totalWords,
    newWords,
    guessedWords,
    learnedWords,
    maxGuessedSeries: Math.max(...guessSeries),
  };

  try {
    await createStatistic(userId, newStatistic);
    return true;
  } catch (error) {
    return false;
  }
};

export default saveGameResults;
