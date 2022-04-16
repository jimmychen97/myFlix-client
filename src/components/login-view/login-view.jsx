import React, {useState} from 'react';
import PropTypes from 'prop-types';

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
    <form>
          <label>
              Username:
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </label>
          <label>
              Password:
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
  )
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
};