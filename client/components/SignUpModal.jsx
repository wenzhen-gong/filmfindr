import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { closeSignUpModal, signUp } from "../utils/filmfindrSlice";
import React from "react";
import { useState } from "react";

export default function SignUpModal() {
  const showSignUpModal = useSelector((state) => state.myReducers.signUpModalOpen);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  return (
    <Modal show={showSignUpModal} onHide={() => dispatch(closeSignUpModal())}>
      <Modal.Header className="bg-gray-800 text-white" closeButton>
        <Modal.Title>Sign Up for FilmFindr NOW!</Modal.Title>
      </Modal.Header >
      <Form className="bg-gray-800 text-white" onSubmit={(event) => dispatch(signUp(event))}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" value={password2} onChange={(e) => setPassword2(e.target.value)}/>
          </Form.Group>
          {
            password !== password2 &&
            (<Form.Text className="text-danger">
              Paswword do not match
            </Form.Text>)
          }
          
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            style={{ backgroundColor: '#000000', borderColor: '#000000' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'gray'} 
            onMouseLeave={(e) => e.target.style.backgroundColor = '#000000'} 
            onClick={() => dispatch(closeSignUpModal())}
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            type="submit" disabled={(password === password2 && password && email) ? false: true}
            style={{ backgroundColor: 'red', borderColor: 'red' }} 
            onMouseEnter={(e) => e.target.style.backgroundColor = '#ff6666'} 
            onMouseLeave={(e) => e.target.style.backgroundColor = 'red'}
            >
            Sign Up
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
