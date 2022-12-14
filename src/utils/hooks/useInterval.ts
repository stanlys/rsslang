// Taken from: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
import { useRef, useEffect } from 'react';
import { MilliSeconds } from '../types';

type Action = () => void;

const useInterval = (tickCallback: Action, delay: MilliSeconds) => {
  const tickCallbackRef = useRef<Action | undefined>();

  const tick = (): void => {
    if (tickCallbackRef && tickCallbackRef.current) {
      tickCallbackRef.current();
    }
  };

  // Remember the latest callbacks
  useEffect(() => {
    tickCallbackRef.current = tickCallback;
  }, [tickCallback]);

  // Set up the interval
  // eslint-disable-next-line consistent-return
  useEffect((): Action | undefined => {
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
};

export default useInterval;
