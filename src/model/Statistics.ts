export type GameType = 'audio-challenge' | 'sprint';

export type StatisticsSource = GameType | 'destination';

export type ISODateString = string;

export interface Statistic {
  id: string;
  date: ISODateString;
  source: StatisticsSource;
  newWords: number;
  learnedWords: number;
  guessedWords: number;
  totalWords: number;
  maxGuessedSeries: number;
  optional?: {
    [index: string]: unknown;
  };
}

export type NewStatistic = Omit<Statistic, 'id'>;

export interface UserWord {
  userId: string;
  wordId: string;
  isWasMiniGame: boolean;
  wordProgress: number;
  isHard: boolean;
  isStudy: boolean;
}

export type GameStatisticCommon = Omit<Statistic, 'id' | 'date' | 'source'>;

export interface GameStatistic extends GameStatisticCommon {
  accuracy?: number;
}

export interface SummaryGameStatistic {
  sprint: GameStatistic;
  audioChallenge: GameStatistic;
  dictionary: GameStatistic;
}
export type StatisticForChart = Pick<Statistic, 'newWords' | 'learnedWords'>;
