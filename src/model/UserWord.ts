export interface UserWord {
  id: string;
  userId: string;
  wordId: string;
  wasPlayed: boolean;
  correctGuessCount: number;
  wrongGuessCount: number;
  isDifficult: boolean;
  isLearned: boolean;
  optional?: {
    [index: string]: unknown;
  };
}

export type NewUserWord = Omit<UserWord, 'id' | 'userId' | 'wordId'>;

export interface UpdatedUserWord {
  wasPlayed?: boolean;
  correctGuessCount?: number;
  wrongGuessCount?: number;
  isDifficult?: boolean;
  isLearned?: boolean;
  optional?: {
    [index: string]: unknown;
  };
}
