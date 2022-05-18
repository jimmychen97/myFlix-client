import React from 'react';
import axios from 'axios';
import './movie-view.scss';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class MovieView extends React.Component {
  addToFavorite(movieId) {
    const token = localStorage.getItem('token');
    console.log(token);

    axios
      .post(
        `https://myflix453.herokuapp.com/users/${localStorage.user}/movies/${movieId}`,
        {},
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        }
      )
      .then((response) => {
        alert('Movie added to favorites');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Card className="movie-view" bg="dark">
        <Card.Body>
          <Card.Img
            className="movie-poster"
            variant="top"
            src={movie.ImagePath}
          />
          <Card.Title className="movie-title">{movie.Title}</Card.Title>
          <Card.Text className="movie-description">
            {movie.Description}
          </Card.Text>
          <Link to={`/director/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>
          <Link to={`/genre/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
        </Card.Body>
        <Button variant="primary" onClick={() => this.addToFavorite(movie._id)}>
          Add to Favorites
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </Button>
      </Card>
    );
  }
  asd;
}
