import { Modal, Button } from 'react-bootstrap';

interface QuitGameModalProps {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const QuitGameModal = ({ show, onConfirm, onCancel }: QuitGameModalProps): JSX.Element => {
  return (
    <Modal size="sm" show={show} centered>
      <Modal.Header closeButton>
        <Modal.Title id="quit-game">Quit game</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to quit the current game round?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onConfirm}>Quit anyway</Button>
        <Button onClick={onCancel}>Back to game</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuitGameModal;
