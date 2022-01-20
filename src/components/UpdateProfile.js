import React, {useRef, useState} from 'react';
import {Form, Button, Card, Alert} from "react-bootstrap";
import {useAuth} from "../contexts/AuthContext";
import {Link, useNavigate} from "react-router-dom";

const UpdateProfile = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const { currentUser, updateEmail, updatePassword } = useAuth(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords are not the same, please try again')
    }

    const promises = [];
    setError('');
    setLoading(true);

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises).then(() => {
      navigate('/');
    })
      .catch(() => {
      setError('Failed to commit update');
    })
      .finally(() => {
        setLoading(false);
      })
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className={'text-center mb-4'}>Update Profile</h2>

          {error && <Alert variant={'danger'}>{error}</Alert>} {/*If there is any error, show it*/}

          <Form onSubmit={handleSubmit}>
            <Form.Group id={'email'}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type={'email'}
                ref={emailRef}
                defaultValue={currentUser.email}/>
            </Form.Group>

            <Form.Group id={'password'}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={'password'}
                ref={passwordRef}
                placeholder={'Leave blank to keep the same'}/>
            </Form.Group>

            <Form.Group id={'password-confirm'}>
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type={'password'}
                ref={passwordConfirmRef}
                placeholder={'Leave blank to keep the same'}/>
            </Form.Group>

            <Button disabled={loading} className={'w-100 mt-3'} type={'submit'}>Update</Button>
          </Form>
        </Card.Body>
      </Card>

      <div className={'w-100 text-center mt-2'}>
        <Link to={'/'}>Cancel</Link>
      </div>
    </>
  );
};

export default UpdateProfile;