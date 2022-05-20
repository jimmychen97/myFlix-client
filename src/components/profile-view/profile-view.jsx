import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Card,
  Button,
  Form,
  Col,
  Row,
  ListGroup,
} from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import './profile-view.scss';

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
        alert('Unregistered user!');
        window.open('/', '_self');
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
        alert('Movie removed from favorites');
        window.location.reload(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Your Favorites</h3>
          {user.FavoriteMovies === undefined ||
          user.FavoriteMovies.length === 0 ? (
            <Card.Text>No Favorite Movies</Card.Text>
          ) : (
            <div>
              {movies.map((m) => {
                if (user.FavoriteMovies.includes(m._id)) {
                  return (
                    <Col md={8} key={m._id}>
                      <MovieCard movie={m} />
                      <Button
                        variant="danger"
                        type="submit"
                        onClick={() => removeFromFavorites(m._id)}
                        style={{ margin: '5px 0px 10px 5px' }}
                      >
                        Remove from Favorites
                      </Button>
                    </Col>
                  );
                }
              })}
            </div>
          )}
        </Col>

        <Col>
          <div>
            <h3>User Information</h3>
            <p>Username: {user.Username}</p>
            <p>Email: {user.Email}</p>
            <p>Birthday: {user.Birthday}</p>
            <Button
              variant="danger"
              onClick={unregisterUser}
              className="profile-button"
            >
              Unregister
            </Button>
          </div>

          <h3>Update User Information</h3>
          <Form>
            <Form.Group>
              <Form.Label>New username:</Form.Label>
              <Form.Control
                required
                type="text"
                value={newUsername}
                maxLength={20}
                minLength={5}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <Form.Label>New password:</Form.Label>
              <Form.Control
                required
                type="password"
                value={newPassword}
                maxLength={20}
                minLength={5}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Form.Label>New email:</Form.Label>
              <Form.Control
                required
                type="text"
                value={newEmail}
                maxLength={20}
                minLength={5}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </Form.Group>
            <Button
              type="button"
              onClick={handleSubmit}
              className="profile-button"
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
