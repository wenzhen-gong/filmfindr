import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { closeSignInModal, signIn } from "../utils/filmfindrSlice";
import React, { useState} from "react";

export default function SignInModal() {
  const showSignInModal = useSelector((state) => state.myReducers.signInModalOpen);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  return (
    <Modal show={showSignInModal} onHide={() => dispatch(closeSignInModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Sign In Here</Modal.Title>
      </Modal.Header>
      <Form onSubmit={(event) => dispatch(signIn(event))}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => dispatch(closeSignInModal())}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled = {email && password? false: true}>
            Sign In
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
