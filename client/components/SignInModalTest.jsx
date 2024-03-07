import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { closeSignInModal, signIn, testreducer } from "../utils/filmfindrSlice";
import React from "react";

export default function SignInModalTest() {
  const showSignInModal = useSelector((state) => state.myReducers.signInModalOpen);
  const dispatch = useDispatch();

  return (
    <Modal show={showSignInModal} onHide={() => dispatch(closeSignInModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Sign In Test Here</Modal.Title>
      </Modal.Header>
      <Form onSubmit={(event) => dispatch(testreducer(event))}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => dispatch(closeSignInModal())}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Sign In
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
