import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

function ActionPopup(props) {
  const { title, body, btn1Txt, btn2Txt, onCancel, onAgree } = props;
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton style={{ borderTop: '0px none', borderBottom: '0px none' }}>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{body}</p>
      </Modal.Body>
      <Modal.Footer style={{ borderTop: '0px none', borderBottom: '0px none' }}>
        <Button onClick={onCancel} variant="light">
          {btn1Txt}
        </Button>
        <Button onClick={onAgree} variant="primary">
          {btn2Txt}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ActionPopup;
