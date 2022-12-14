import Word from './Word';

export default interface GameTurnResult {
  word: Word;
  wasGuessed: boolean;
}
