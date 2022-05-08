import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './login-view.scss';

export function LoginView(props) {
  // call useState() with empty initial value
  // returns an array of paried values that you detructure
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const validate = () => {
    let isReq = true;

    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be 2 characters long');
      isReq = false;
    }

    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPassword('Password must be 6 characters long');
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    // {e} prevents default refresh/change of the page from handleSubmit()
    e.preventDefault();
    const isReq = validate();

    if (isReq) {
      // POST request by passing username and password
      axios
        .post('https://myflix453.herokuapp.com/login', {
          Username: username,
          Password: password,
        })
        .then((response) => {
          // data includes JWT token + username
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch((e) => {
          console.log(e);
          alert('Username or Password incorrect');
        });
    }
  };

  return (
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
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Sign In
      </Button>
      <Link to="/register">
        <Button variant="secondary" type="button">
          Sign Up
        </Button>
      </Link>
    </Form>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};
