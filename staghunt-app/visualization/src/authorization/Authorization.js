import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './Authorization.css';

function Authorize({ handleSubmit }) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [authCode, setAuthCode] = useState("");

  const handleChange = (e) => {
      setAuthCode(e.target.value);
  }

  const checkValid = () => {
      if(['OXYCODE', 'AMTCODE', 'GUESTCODE', 'test'].includes(authCode)){
          return true;
      }
      alert("Incorrect code. Please try again.");

      return false;
  }

  const handleSubmitForm = () => {
      let valid = checkValid();
      if(valid){
          handleClose();
          handleSubmit();
      }
  }

  return (
    <div className="userSelectionContainer">
      <Form.Group>
          <Form.Label htmlFor="inputAuthorizationCode">Authorization Code</Form.Label>
          <Form.Control
            type="authorizationCode"
            id="inputAuthorizationCode"
            aria-describedby="authorizationHelpBlock"
            value={authCode} onChange={handleChange}
          />
          <Form.Text id="authorizationHelpBlock" muted>
            Please input the authorization code given.
          </Form.Text>
      </Form.Group>
      <Button className="userSubmit" variant="primary" type="submit" onClick={handleSubmitForm}>Done</Button>
    </div>
  );
}

export default Authorize;
