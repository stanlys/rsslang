import { Card } from 'react-bootstrap';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { useEffect, useState } from 'react';
import styles from './Statistics.module.scss';
import audio from '../../assets/icons/audio-waves.png';
import agile from '../../assets/icons/agile.png';
import result from '../../assets/icons/mission.png';
import dailyresult from '../../assets/icons/dailyresults.png';
import { getStatistics } from '../../api/statistics';
import { useAppSelector } from '../../store/hooks';
import { GameStatistic } from '../../model/Statistics';
import parsingStatisticPerDay, { INITIAL_VALUES_GAME_STATISTICS } from '../../utils/statistic';

const DailyStatistics = (): JSX.Element => {
  const [audioChallengeStat, setAudioChallengeStat] = useState<GameStatistic>(
    INITIAL_VALUES_GAME_STATISTICS
  );
  const [dictionaryStat, setDictionaryStat] = useState<GameStatistic>(
    INITIAL_VALUES_GAME_STATISTICS
  );
  const [sprintStat, setSprintStat] = useState<GameStatistic>(INITIAL_VALUES_GAME_STATISTICS);
  const [totalStat, setTotalStat] = useState<GameStatistic>(INITIAL_VALUES_GAME_STATISTICS);

  const { id } = useAppSelector((state) => state.authorization);

  useEffect(() => {
    const loadStat = async () => {
      const date = new Date();
      const stat = await getStatistics(id, date);
      const { sprint, audioChallenge, dictionary } = parsingStatisticPerDay(stat);
      setSprintStat(sprint);
      setAudioChallengeStat(audioChallenge);
      setDictionaryStat(dictionary);
      setTotalStat({
        totalWords: sprint.totalWords + audioChallenge.totalWords + dictionaryStat.totalWords,
        guessedWords:
          sprint.guessedWords + audioChallenge.guessedWords + dictionaryStat.guessedWords,
        learnedWords:
          sprint.learnedWords + audioChallenge.learnedWords + dictionaryStat.learnedWords,
        maxGuessedSeries: Math.max(
          sprint.maxGuessedSeries,
          audioChallenge.maxGuessedSeries,
          dictionaryStat.maxGuessedSeries
        ),
        newWords: sprint.newWords + audioChallenge.newWords + dictionary.newWords,
        accuracy:
          Math.trunc(
            ((sprint.learnedWords + audioChallenge.learnedWords + dictionaryStat.learnedWords) /
              (sprint.totalWords + audioChallenge.totalWords + dictionaryStat.learnedWords)) *
              100
          ) || 0,
      });
    };
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    loadStat().catch(() => {});
  }, [
    dictionaryStat.guessedWords,
    dictionaryStat.learnedWords,
    dictionaryStat.maxGuessedSeries,
    dictionaryStat.totalWords,
    id,
  ]);

  return (
    <section className={styles.team}>
      <Card className={styles.card}>
        <Card.Body className={(styles.cardElements, styles.circle)}>
          <CircularProgressbarWithChildren
            value={totalStat.learnedWords}
            maxValue={totalStat.totalWords}
          >
            <img src={result} alt="You result" />
            <span className={styles.wordsCount}>
              {totalStat.learnedWords} <span>of {totalStat.totalWords}</span>
            </span>
            <Card.Title>WORDS</Card.Title>
            <Card.Subtitle>were learned today</Card.Subtitle>
          </CircularProgressbarWithChildren>
        </Card.Body>
      </Card>
      <Card className={styles.card}>
        <Card.Header className="bg-primary text-white d-flex justify-content-between">
          <img src={agile} alt="waves icon" />
          <h4>Sprint</h4>
        </Card.Header>
        <Card.Body className={styles.cardElements}>
          <Card.Title>
            <span className="text-primary">{sprintStat.newWords}</span> new words today
          </Card.Title>
          <Card.Title>
            <span className="text-primary">{sprintStat.accuracy}%</span> accuracy
          </Card.Title>
          <Card.Title>
            <span className="text-primary">{sprintStat.maxGuessedSeries}</span> guessed in a row
          </Card.Title>
        </Card.Body>
      </Card>
      <Card className={styles.card}>
        <Card.Header className="bg-primary text-white d-flex justify-content-between">
          <img src={audio} alt="waves icon" />
          <h4>Audio challenge</h4>
        </Card.Header>
        <Card.Body className={styles.cardElements}>
          <Card.Title>
            <span className="text-primary">{audioChallengeStat.newWords}</span> new words today
          </Card.Title>
          <Card.Title>
            <span className="text-primary">{audioChallengeStat.accuracy}%</span> accuracy
          </Card.Title>
          <Card.Title>
            <span className="text-primary">{audioChallengeStat.maxGuessedSeries}</span> guessed in a
            row
          </Card.Title>
        </Card.Body>
      </Card>
      <Card className={styles.card}>
        <Card.Header className="bg-primary text-white d-flex justify-content-between">
          <img src={dailyresult} alt="result icon" />
          <h4>Total for today</h4>
        </Card.Header>
        <Card.Body className={styles.cardElements}>
          <Card.Title>
            <span className="text-primary">{totalStat.newWords}</span> new words today
          </Card.Title>
          <Card.Title>
            <span className="text-primary">{totalStat.accuracy}%</span> accuracy
          </Card.Title>
          <Card.Title>
            <span className="text-primary">{totalStat.learnedWords}</span> words learned
          </Card.Title>
        </Card.Body>
      </Card>
    </section>
  );
};

export default DailyStatistics;
