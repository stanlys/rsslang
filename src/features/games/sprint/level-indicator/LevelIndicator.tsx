import { generateRange } from '../../../../utils/array';
import LevelIcon from './level-icon/LevelIcon';

interface LevelIndicatorProps {
  level: number;
}

const MAX_LEVEL = 4;

const LevelIndicator = ({ level }: LevelIndicatorProps): JSX.Element => {
  return (
    <div className="align-self-center d-flex flex-column gap-1">
      <div className="d-flex justify-content-center gap-1">
        {generateRange(MAX_LEVEL, (index) => {
          return <LevelIcon key={index} level={index + 1} show={index + 1 <= level} />;
        })}
      </div>
      <h6 className="fs-6 text-center">Level {level}</h6>
    </div>
  );
};

export default LevelIndicator;
