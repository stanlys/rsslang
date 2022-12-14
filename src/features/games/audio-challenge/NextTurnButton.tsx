import { HTMLAttributes } from 'react';
import { Button } from 'react-bootstrap';
import useKeyUp from '../../../utils/hooks/useKeyUp';

interface NextTurnButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isWordSelected: boolean;
  isLastTurn: boolean;
  onClick: () => void;
}

const NextTurnButton = ({
  isWordSelected,
  isLastTurn,
  onClick,
}: NextTurnButtonProps): JSX.Element => {
  useKeyUp(['ArrowRight'], (event: KeyboardEvent) => onClick());

  return (
    <Button variant={isWordSelected ? 'primary' : 'danger'} className="p-2" onClick={onClick}>
      {isWordSelected ? (isLastTurn ? 'Show results' : 'Next word →') : 'I give up →'}
    </Button>
  );
};

export default NextTurnButton;
