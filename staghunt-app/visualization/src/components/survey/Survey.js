import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Survey({ handleSubmit }) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  const [participatingCharacter, setParticipatingCharacter] = useState("Undetermined");

  const handleChange = (e) => {
      setParticipatingCharacter(e.target.value);
  }

  const checkValid = () => {
      if(['h1', 'h2', 'h3'].includes(participatingCharacter)){
          return true;
      }
      alert("Please pick one of the 3 options.")

      return false;
  }

  const handleSubmitForm = () => {
      let valid = checkValid();
      if(valid){
          handleClose();
          handleSubmit(participatingCharacter);
      }
  }

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Game Survey</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Which hunter did you try and collaborate with?</Form.Label>
            <Form.Control aria-label="Default select example" as="select" value={participatingCharacter} onChange={handleChange}>
              <option>Select a Character</option>
              <option value="h2">Hunter 2</option>
              <option value="h3">Hunter 3</option>
              <option value="h1">None</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleSubmitForm}>Done</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Survey
