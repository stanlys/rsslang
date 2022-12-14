import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import playAudioAsync from '../../../utils/sound';
import styles from './SoundButton.module.scss';
import { ReactComponent as PlaySoundIcon } from '../../../assets/icons/play-sound.svg';
import { ReactComponent as StopSoundIcon } from '../../../assets/icons/stop-sound.svg';

interface SoundButtonProps {
  soundSrc: string | string[];
  diameter?: string;
  variant?: 'primary' | 'secondary' | 'warning' | 'danger' | 'info';
  autoplay?: boolean;
}

const SoundButton = ({
  soundSrc,
  diameter = '2rem',
  variant = 'primary',
  autoplay = false,
}: SoundButtonProps): JSX.Element => {
  const [playing, setPlaying] = useState(false);
  const soundRef = useRef<HTMLAudioElement>();

  const play = useCallback(async () => {
    if (!playing) {
      setPlaying(true);

      if (Array.isArray(soundSrc)) {
        // eslint-disable-next-line no-restricted-syntax
        for (const i of soundSrc) {
          soundRef.current = new Audio(i);
          // eslint-disable-next-line no-await-in-loop
          await playAudioAsync(soundRef.current);
        }
      } else {
        soundRef.current = new Audio(soundSrc);
        await playAudioAsync(soundRef.current);
      }

      setPlaying(false);
    } else {
      setPlaying(false);

      if (soundRef.current) {
        soundRef.current.currentTime = 0;
        soundRef.current.pause();
      }
    }
  }, [soundSrc, playing]);

  useEffect(() => {
    if (autoplay) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      play();
    }
  }, [soundSrc, autoplay]);

  return (
    <Button
      style={{ '--diameter': diameter } as CSSProperties}
      onClick={play}
      className={`${styles.soundButton} btn btn-${variant} rounded-circle`}
    >
      {playing ? (
        <StopSoundIcon className={styles.soundIcon} />
      ) : (
        <PlaySoundIcon className={styles.soundIcon} />
      )}
    </Button>
  );
};

export default SoundButton;
