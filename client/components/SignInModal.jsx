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
  const [password, setPassword] = useState('');
  const [reactError, setReactError] = useState(false);


  const handleSignIn  = (event) => {
    event.preventDefault();
    dispatch(signIn(event)).then((result) => {
      if (result.error) {
        setReactError(true);
      } else {
        dispatch(closeSignInModal());
        setReactError(false);
      }});
}

  
  return (
    <Modal show={showSignInModal} onHide={() => {
      dispatch(closeSignInModal())
      setReactError(false);
    }}>
      <Modal.Header className="bg-gray-800 text-white" closeButton>
        <Modal.Title>Sign In Here</Modal.Title>
      </Modal.Header>
      <Form className="bg-gray-800 text-white" onSubmit={handleSignIn}>
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
            style={{ backgroundColor: '#000000', borderColor: '#000000' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'gray'} 
            onMouseLeave={(e) => e.target.style.backgroundColor = '#000000'} 
            onClick={() => {
              dispatch(closeSignInModal())
              setReactError(false);
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            type="submit" disabled = {email && password? false: true}
            style={{ backgroundColor: 'red', borderColor: 'red' }} 
            onMouseEnter={(e) => e.target.style.backgroundColor = '#ff6666'} 
            >
            Sign In
          </Button>
          {reactError && <p className='text-red-500 text-2xl font-bold justify-center text-center items-center mt-2'>Email or password is incorrect. Please try again.</p>}
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
