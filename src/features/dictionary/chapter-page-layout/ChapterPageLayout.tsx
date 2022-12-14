import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { getWord, getWords } from '../../../api/words';
import WordCard from '../word-card/WordCard';
import Word from '../../../model/Word';
import { UserWord } from '../../../model/UserWord';
import styles from './ChapterPageLayout.module.scss';
import { useAppSelector } from '../../../store/hooks';
import { getUserWords } from '../../../api/userWords';
import { RootState } from '../../../store/store';
import { AuthState } from '../../../model/AuthState';

type UserWordInDictionary = Word & UserWord;

const ChapterPageLayout = () => {
  const { authorizeStatus, id: userId } = useAppSelector(
    (state: RootState): AuthState => state.authorization
  );
  const { chapter, page } = useParams();
  const [displayedWords, updateDisplayedWords] = useState<
    Array<UserWordInDictionary> | Array<Word>
  >([]);

  useEffect(() => {
    const loadWords = async () => {
      if (chapter && page && +chapter < 7) {
        const dictionaryWords = await getWords(+chapter - 1, +page - 1);

        if (authorizeStatus) {
          const userWords = await getUserWords(userId);
          const userWordsInDictionary = dictionaryWords.map((word) => {
            const activeWord = userWords.find((userWord) => userWord.wordId === word.id);

            const defaultWordParameters = {
              wasPlayed: false,
              correctGuessCount: 0,
              wrongGuessCount: 0,
              isDifficult: false,
              isLearned: false,
            };
            if (activeWord) return { ...activeWord, ...word };
            return { ...defaultWordParameters, ...word };
          });

          updateDisplayedWords(userWordsInDictionary);
        } else {
          updateDisplayedWords(dictionaryWords);
        }
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loadWords();
  }, [authorizeStatus, chapter, userId, page]);

  const getDifficultWords = useCallback(async () => {
    if (authorizeStatus && chapter && +chapter === 7) {
      const userWords = await getUserWords(userId);
      const difficultUserWords = userWords.filter(({ isDifficult }) => isDifficult);
      const difficultWords = await Promise.all(
        difficultUserWords.map(async (userWord) => {
          const dictionaryWord = await getWord(userWord.wordId);
          return { ...userWord, ...dictionaryWord };
        })
      );
      updateDisplayedWords(difficultWords);
    }
  }, [authorizeStatus, chapter, userId]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getDifficultWords();
  }, [authorizeStatus, chapter, getDifficultWords, userId]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function instanceOfUserWordInDictionary(object: any): object is UserWordInDictionary {
    return 'isLearned' in object;
  }

  if (!displayedWords.length && chapter && +chapter === 7) {
    return (
      <h4 className={styles.notDifficultWordsMessage}>
        You haven&apos;t added any difficult words yet
      </h4>
    );
  }

  return (
    <div className={styles.cards}>
      {displayedWords.map((word) => {
        if (instanceOfUserWordInDictionary(word)) {
          return (
            <WordCard
              key={word.id}
              word={word}
              isAuthorized
              isLearned={word.isLearned}
              isDifficult={word.isDifficult}
              correctGuessCount={word.correctGuessCount}
              wrongGuessCount={word.wrongGuessCount}
              difficultChapterUpdateHandler={
                chapter && +chapter === 7 ? getDifficultWords : undefined
              }
            />
          );
        }
        return <WordCard key={word.id} word={word} isAuthorized={false} />;
      })}
    </div>
  );
};

export default ChapterPageLayout;
