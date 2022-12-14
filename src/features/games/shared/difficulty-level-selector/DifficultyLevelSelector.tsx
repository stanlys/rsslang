import { Button, Modal, Stack } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';
import { generateRange } from '../../../../utils/array';
import styles from './DifficultyLevelSelector.module.scss';

interface ModalProps {
  show: boolean;
  onHide: () => void;
}

const DifficultyLevelSelector = ({ show, onHide }: ModalProps): JSX.Element => {
  const CHAPTERS_COUNT = 6;

  const location = useLocation();

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="difficulty-level-selector"
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header className="flex-column">
        <Modal.Title id="difficulty-level-selector">Select level of difficulty</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={2}>
          {generateRange<JSX.Element>(CHAPTERS_COUNT, (chapterIndex) => {
            return (
              <LinkContainer key={chapterIndex} to={`${location.pathname}?group=${chapterIndex}`}>
                <Button
                  className={styles[`chapter${chapterIndex + 1}`]}
                  variant="outline-primary"
                  onClick={onHide}
                >{`Chapter ${chapterIndex + 1}`}</Button>
              </LinkContainer>
            );
          })}
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default DifficultyLevelSelector;
