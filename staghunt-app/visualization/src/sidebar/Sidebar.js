/* Sidebar.js */
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

import './Sidebar.css';

function Sidebar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="sidebar">
      <Button variant="secondary" onClick={handleShow}>
        Instructions
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement='start'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Instructions</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a sollicitudin urna. Suspendisse vulputate scelerisque pulvinar. Vivamus id nisi tempus, cursus metus quis, ultricies ante. Fusce tellus ante, convallis ac molestie eu, vehicula id ante. Integer sit amet lectus sodales, ultrices enim sed, dictum velit. Mauris luctus lectus et lacus molestie fermentum. Nulla egestas mauris ac nibh vestibulum, vitae dapibus tortor interdum. Praesent dignissim nisl ac neque aliquam auctor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras ornare, nisi in pharetra aliquam, velit dolor pulvinar arcu, non tincidunt magna ligula eget erat. Curabitur pharetra pretium eros ac accumsan. Morbi tempor dictum est ut pharetra. Suspendisse pulvinar convallis lacus et imperdiet. Nunc fringilla id nunc sit amet molestie.
        <p/>
        Suspendisse potenti. Nunc arcu tellus, accumsan non luctus eget, laoreet vitae erat. Donec volutpat mi ligula, in ornare arcu viverra in. Sed consequat feugiat bibendum. Vivamus venenatis velit vel quam condimentum, vitae finibus massa lobortis. Suspendisse in elit vel risus volutpat lacinia id in mi. Ut vitae faucibus justo.
        <p/>
        Pellentesque at pulvinar sem, sed sollicitudin erat. Morbi tempor diam libero, sit amet ultrices ante venenatis et. Aenean gravida malesuada molestie. Aliquam gravida euismod ante a porta. In hac habitasse platea dictumst. Aenean ultricies mauris ipsum, ut vestibulum enim molestie nec. Curabitur dictum nisl non lacus mollis semper. Morbi ligula lacus, pharetra ut faucibus id, vehicula vel nisl. Nunc a lacinia urna. Nunc lorem sapien, consequat non metus in, venenatis ullamcorper magna. Integer dignissim porttitor libero sit amet vehicula. Fusce venenatis massa magna, a dictum augue porta pretium. Aliquam in nulla non mauris pulvinar auctor vel et dolor. Cras diam diam, dictum sit amet nisl vitae, venenatis dignissim nisi.
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Sidebar
