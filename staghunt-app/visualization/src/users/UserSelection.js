import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './UserSelection.css';

function UserSelection({ handleSubmit }) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [userType, setUserType] = useState("Undetermined");

  const handleChange = (e) => {
      setUserType(e.target.value);
  }

  const checkValid = () => {
      if(['AMT', 'OXY', 'GUEST'].includes(userType)){
          return true;
      }
      alert("Please pick one of the 3 options.");

      return false;
  }

  const handleSubmitForm = () => {
      let valid = checkValid();
      if(valid){
          handleClose();
          handleSubmit(userType);
      }
  }

  return (
    <div className="userSelectionContainer">
      <Form.Group>
        <Form.Label>For payment purposes, where are you coming from?</Form.Label>
        <Form.Control aria-label="Default select example" as="select" value={userType} onChange={handleChange}>
          <option>Select one of the following</option>
          <option value="AMT">Amazon Mechanical Turk</option>
          <option value="OXY">Occidental College</option>
          <option value="GUEST">Guest</option>
        </Form.Control>
      </Form.Group>
      <Button className="userSubmit" variant="primary" type="submit" onClick={handleSubmitForm}>Done</Button>
    </div>
  );
}

export default UserSelection
