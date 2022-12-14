import { ChangeEvent, useEffect, useState } from 'react';
import { ToggleButton } from 'react-bootstrap';
import { ReactComponent as CheckIcon } from '../../../../assets/icons/check-icon.svg';
import { ReactComponent as XIcon } from '../../../../assets/icons/x-icon.svg';
import dingSound from '../../../../assets/sounds/ding.mp3';
import buzzerSound from '../../../../assets/sounds/buzzer.mp3';
import styles from './GuessWordButton.module.scss';
import playAudioAsync from '../../../../utils/sound';

interface GuessWordButtonProps {
  word: string;
  isCorrect: boolean;
  turn: number;
  disabled: boolean;
  onSelect: (word: string) => void;
}

const GuessWordButton = ({
  word,
  isCorrect,
  turn,
  disabled,
  onSelect,
}: GuessWordButtonProps): JSX.Element => {
  const [checked, setChecked] = useState(false);

  const handleSelect = (event: ChangeEvent<HTMLInputElement>): void => {
    setChecked(event.currentTarget.checked);
    onSelect(word);
  };

  useEffect(() => {
    setChecked(false);
  }, [turn]);

  useEffect(() => {
    if (checked) {
      const sound = new Audio(isCorrect ? dingSound : buzzerSound);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      playAudioAsync(sound);
    }
  }, [checked, isCorrect]);

  return (
    <ToggleButton
      id={word}
      className="d-flex gap-1"
      variant={checked ? (isCorrect ? 'success' : 'danger') : 'outline-primary'}
      type="checkbox"
      checked={checked}
      value="1"
      onChange={handleSelect}
      disabled={disabled}
    >
      <span>
        {checked &&
          (isCorrect ? <CheckIcon className={styles.icon} /> : <XIcon className={styles.icon} />)}
      </span>
      {word}
    </ToggleButton>
  );
};

export default GuessWordButton;
