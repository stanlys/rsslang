import { useMemo } from 'react';
import { ReactComponent as CheckIcon } from '../../../../../assets/icons/check-icon.svg';
import styles from './TickCircle.module.scss';

interface TickCircleProps {
  tickNumber: number;
  showCount: number;
}

const TickCircle = ({ tickNumber, showCount }: TickCircleProps): JSX.Element => {
  const showTick = useMemo((): boolean => {
    return tickNumber <= showCount;
  }, [showCount, tickNumber]);

  return (
    <div
      className={`${styles.circle} bg-${
        showTick ? 'success' : 'secondary'
      } rounded-circle text-light d-flex justify-content-center align-items-center`}
    >
      <CheckIcon className={`${styles.tick} ${showTick ? '' : 'd-none'}`} />
    </div>
  );
};

export default TickCircle;
