import { useMemo } from 'react';
import { generateRange } from '../../../../utils/array';
import { LevelRules } from '../SprintRound';
import TickCircle from './tick-circle/TickCircle';

interface WordsProgressProps {
  levelRules: LevelRules;
  winsSinceLevelStart: number;
}

const WordsProgress = ({ levelRules, winsSinceLevelStart }: WordsProgressProps): JSX.Element => {
  const totalCount = useMemo(() => {
    const { winsToLevelUp } = levelRules;
    return winsToLevelUp ? winsToLevelUp - 1 : 1;
  }, [levelRules]);

  const showCount = useMemo(() => {
    const { winsToLevelUp } = levelRules;
    return winsToLevelUp ? Math.min(totalCount, winsSinceLevelStart) : totalCount;
  }, [levelRules, totalCount, winsSinceLevelStart]);

  return (
    <div className="align-self-center d-flex flex-column gap-1">
      <div className="d-flex justify-content-center gap-1">
        {generateRange<JSX.Element>(totalCount, (index) => {
          return <TickCircle key={index} tickNumber={index + 1} showCount={showCount} />;
        })}
      </div>
      <p className="fs-6">+{levelRules.scorePerWin} points per word</p>
    </div>
  );
};

export default WordsProgress;
