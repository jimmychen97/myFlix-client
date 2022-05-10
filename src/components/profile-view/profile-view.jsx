import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Button, Form, Col, Row } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const ProfileView = ({
  userData,
  onBackClick,
  onUnregisterClick,
  movies,
  favMovies,
}) => {
  const [user, setUser] = useState({});
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');

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
        window.open('/', '_self');
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
        window.open('/', '_self');
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
      .then((response) => {
        alert('Movie removed');
        window.location.reload(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container>
      <Card style={{ width: '20rem' }} className="justify-content-md-center">
        <Card.Body>
          <Card.Text>Username: {user.Username}</Card.Text>
          <Card.Text>Email: {user.Email}</Card.Text>
          <Card.Text>Favorite movie list: {user.FavoriteMovies}</Card.Text>
        </Card.Body>

        <Button variant="primary" onClick={() => onBackClick()}>
          Back
        </Button>

        <Button variant="secondary" onClick={unregisterUser}>
          Unregister
        </Button>
      </Card>

      <h4>Favorite movie list</h4>
      {user.FavoriteMovies === undefined || user.FavoriteMovies.length === 0 ? (
        <Card.Text>No Favorite Movies</Card.Text>
      ) : (
        <div>
          {movies.map((m) => {
            if (user.FavoriteMovies.includes(m._id)) {
              return (
                <Col md={4} key={m._id}>
                  <MovieCard movie={m} />
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={() => removeFromFavorites(m._id)}
                  >
                    Remove from favorites
                  </Button>
                </Col>
              );
            }
          })}
        </div>
      )}

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
    </Container>
  );
};
