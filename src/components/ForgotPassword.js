import React, {useRef, useState} from 'react';
import {Form, Button, Card, Alert} from "react-bootstrap";
import {useAuth} from "../contexts/AuthContext";
import {Link} from "react-router-dom";

const ForgotPassword = () => {
  const emailRef = useRef(null);
  const { resetPassword } = useAuth(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit (e) {
    e.preventDefault();

    try {
      setMessage('')
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instructions')
    } catch (error) {
      setError('Failed to reset, incorrect email');
    }
    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className={'text-center mb-4'}>Password Reset</h2>

          {error && <Alert variant={'danger'}>{error}</Alert>} {/*If there is any error, show it*/}
          {message && <Alert variant={'success'}>{message}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group id={'email'}>
              <Form.Label>Enter your email</Form.Label>
              <Form.Control type={'email'} ref={emailRef} placeholder={'E-mail'} required />
            </Form.Group>

            <Button disabled={loading} className={'w-100 mt-3'} type={'submit'}>Reset password</Button>
          </Form>

          <div className={'w-100 text-center mt-3'}>
            <Link to={'/login'}>Back to Log In</Link>
          </div>

        </Card.Body>
      </Card>

      <div className={'w-100 text-center mt-2'}>
        Need an account? <Link to={'/signup'}>Sign In</Link>
      </div>
    </>
  );
};

export default ForgotPassword;