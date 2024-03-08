import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { closeSignUpModal, signUp } from "../utils/filmfindrSlice";
import React from "react";

export default function SignUpModal() {
  const showSignUpModal = useSelector((state) => state.myReducers.signUpModalOpen);
  const dispatch = useDispatch();

  return (
    <Modal show={showSignUpModal} onHide={() => dispatch(closeSignUpModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up for FilmFindr NOW!</Modal.Title>
      </Modal.Header>
      <Form onSubmit={(event) => dispatch(signUp(event))}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
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
            onClick={() => dispatch(closeSignUpModal())}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
