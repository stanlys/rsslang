import styles from './LevelIcon.module.scss';
import { ReactComponent as AngryBirdRed } from '../../../../../assets/icons/angry-birds-red.svg';
import { ReactComponent as AngryBirdChuck } from '../../../../../assets/icons/angry-birds-chuck.svg';
import { ReactComponent as AngryBirdBomb } from '../../../../../assets/icons/angry-birds-bomb.svg';
import { ReactComponent as AngryBirdBlues } from '../../../../../assets/icons/angry-birds-blues.svg';

interface LevelIconProps {
  level: number;
  show: boolean;
}

const icons = [<AngryBirdBlues />, <AngryBirdBomb />, <AngryBirdChuck />, <AngryBirdRed />];

const LevelIcon = ({ level, show }: LevelIconProps): JSX.Element => {
  return (
    <div
      className={`${styles.levelIcon} ${
        show ? '' : 'd-none'
      } d-flex justify-content-center align-items-center`}
    >
      {icons[level - 1]}
    </div>
  );
};

export default LevelIcon;
