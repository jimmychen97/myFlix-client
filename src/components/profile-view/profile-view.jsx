import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Form, Col } from 'react-bootstrap';

export const ProfileView = ({
  userData,
  onBackClick,
  onUnregisterClick,
  movies,
}) => {
  const [user, setUser] = useState({});
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');

  // let favoriteMovieList = userData.FavoriteMovies.map((movieId) => {
  //   return (
  //     <li key={movieId}>
  //       {
  //         movies.find((movie) => {
  //           return movie._id === movieId;
  //         }).Title
  //       }
  //       <button
  //         variant="alert"
  //         onClick={() => {
  //           removeFromFavorites(movieId);
  //         }}
  //       >
  //         remove movie
  //       </button>
  //     </li>
  //   );
  // });

  useEffect(() => {
    axios
      .get(
        'https://myflix453.herokuapp.com/users/' + localStorage.getItem('user'),
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )
      .then((response) => {
        setUser(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      Username: newUsername,
      Password: newPassword,
      Email: newEmail,
    };
    axios
      .put(`https://myflix453.herokuapp.com/users/${localStorage.user}`, data, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setNewUsername(newUsername);
        localStorage.setItem('user', newUsername);
        console.log('user updated');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const unregisterUser = (e) => {
    e.preventDefault();

    axios
      .delete(`https://myflix453.herokuapp.com/users/${localStorage.user}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        console.log('user deleted');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeFromFavorites = (movieId) => {
    axios
      .delete(
        `https://myflix453.herokuapp.com/users/${localStorage.user}/movies/${movieId}`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )
      .then((response) => {});
  };

  return (
    <div>
      <Card style={{ width: '20rem' }} className="justify-content-md-center">
        <Card.Body>
          <Card.Text>Username: {user.Username}</Card.Text>
          <Card.Text>Email: {user.Email}</Card.Text>
        </Card.Body>

        <Button variant="primary" onClick={() => onBackClick()}>
          Back
        </Button>

        <Button variant="secondary" onClick={unregisterUser}>
          Unregister
        </Button>
      </Card>

      <Form>
        <Form.Group>
          <Form.Label>New username:</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter username"
            value={newUsername}
            maxLength={20}
            minLength={5}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <Form.Label>New password:</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter password"
            value={newPassword}
            maxLength={20}
            minLength={5}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Form.Label>New email:</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter email"
            value={newEmail}
            maxLength={20}
            minLength={5}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </Form.Group>
        <Button type="button" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
