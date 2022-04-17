import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
    // call useState() with empty initial value
    // returns an array of paried values that you detructure
    const[ username, setUsername ] = useState('');
    const[ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        // {e} prevents default refresh/change of the page from handleSubmit()
        e.preventDefault();
        console.log(username, password);
        props.onLoggedIn(username);
    }

  return (
    <Form>
        <Form.Group controlId='formUsername'>
            <Form.Label>Username:</Form.Label>
            <Form.Control type='text' onChange={e => setUsername(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId='formPassword'>
            <Form.Label>Password:</Form.Label>
            <Form.Control type='password' onChange={e => setPassword(e.target.value)}/>
        </Form.Group>
          <Button variant='primary' type="submit" onClick={handleSubmit}>Sign In</Button>
          <Button variant='secondary' type="button">Sign Up</Button>
      </Form>
  )
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
};