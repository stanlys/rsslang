import { HTMLAttributes, useEffect, useState } from 'react';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import useInterval from '../../../../utils/hooks/useInterval';
import { Seconds } from '../../../../utils/types';
import styles from './CountDown.module.scss';

interface CountDownProps extends HTMLAttributes<HTMLDivElement> {
  totalTime: Seconds;
  tickFrequency: Seconds;
  onFinished: () => void;
}

const WARNING_THRESHOLD: Seconds = 10;

// eslint-disable-next-line no-shadow
enum Colors {
  GREEN = '#198754',
  RED = '#dc3545',
  GRAY = '#ced4da',
}

const CountDown = ({
  totalTime,
  tickFrequency,
  onFinished,
  ...divAttributes
}: CountDownProps): JSX.Element => {
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [finishing, setFinishing] = useState(false);

  useInterval(() => {
    setTimeLeft(timeLeft - tickFrequency);
  }, tickFrequency * 1000);

  useEffect(() => {
    if (timeLeft <= WARNING_THRESHOLD) {
      setFinishing(true);
    }
  }, [timeLeft, setFinishing]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onFinished();
    }
  }, [onFinished, timeLeft]);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={`${divAttributes.className || ''} ${styles.circularProgress}`}>
      <CircularProgressbarWithChildren
        value={timeLeft}
        maxValue={totalTime}
        counterClockwise
        styles={buildStyles({
          pathColor: `${finishing ? Colors.RED : Colors.GREEN}`,
          trailColor: Colors.GRAY,
        })}
      >
        <span
          className={`${styles.timeLeft} ${finishing ? styles.finishing : ''} fs-3 fw-semibold`}
        >
          {timeLeft}
        </span>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default CountDown;
