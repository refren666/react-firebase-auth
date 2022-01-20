import React, {useRef, useState} from 'react';
import {Form, Button, Card, Alert} from "react-bootstrap";
import {useAuth} from "../contexts/AuthContext";
import {Link, useNavigate} from "react-router-dom";

const Signup = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const { signUp } = useAuth(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit (e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords are not the same, please try again')
    }

    try {
      setError('');
      setLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (error) {
      setError('Failed to create an account');
    }
    setLoading(false)
  }

  return (
    <>
     <Card>
      <Card.Body>
        <h2 className={'text-center mb-4'}>Sign Up</h2>

        {error && <Alert variant={'danger'}>{error}</Alert>} {/*If there is any error, show it*/}

        <Form onSubmit={handleSubmit}>
          <Form.Group id={'email'}>
            <Form.Label>Email</Form.Label>
            <Form.Control type={'email'} ref={emailRef} placeholder={'E-mail'} required />
          </Form.Group>

          <Form.Group id={'password'}>
            <Form.Label>Password</Form.Label>
            <Form.Control type={'password'} ref={passwordRef} placeholder={'Password'} required />
          </Form.Group>

          <Form.Group id={'password-confirm'}>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type={'password'} ref={passwordConfirmRef} placeholder={'Confirm password'} required />
          </Form.Group>

          <Button disabled={loading} className={'w-100 mt-3'} type={'submit'}>Sign Up</Button>
        </Form>
      </Card.Body>
     </Card>

     <div className={'w-100 text-center mt-2'}>
      Already have an account? <Link to={'/login'}>Log In</Link>
     </div>
    </>
  );
};

export default Signup;