import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Row, Col, Card, Container } from 'react-bootstrap';

export function RegistrationView(props) {
  // set initial state of username, password, email
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  const validate = () => {
    let isReq = true;

    if (!username) {
      setUsernameErr('Username required');
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr('Username must be 5 characters long');
      isReq = false;
    }

    if (!password) {
      setPasswordErr('Password required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be 6 characters long');
      isReq = false;
    }

    if (!email) {
      setEmailErr('Email is required');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmailErr('Email format is invalid');
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    console.log('username: ' + username);
    console.log('password: ' + password);

    if (isReq) {
      axios
        .post('https://myflix453.herokuapp.com/users', {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert('Registration successful, login now!');
          window.open('/', '_self');
        })
        .catch((e) => {
          console.error(e);
          alert('Error: unable to register');
        });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameErr && <p>{usernameErr}</p>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordErr && <p>{passwordErr}</p>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailErr && <p>{emailErr}</p>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setBirthday(e.target.value)}
                placeholder="XXXX-XX-XX"
              />
            </Form.Group>
            <Button variant="light" type="submit" onClick={handleSubmit}>
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
  }),
};
