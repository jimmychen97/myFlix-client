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
      <Container>
        <Row>
          <Col>
            <img src={movie.ImagePath} style={{ height: '400px' }} />
          </Col>
          <Col>
            <h1 style={{ color: 'white' }}>{movie.Title}</h1>
            <h6>{movie.Description}</h6>
            <Link to={`/director/${movie.Director.Name}`}>
              <Button variant="light" className="movie-view-button">
                Director
              </Button>
            </Link>
            <Link to={`/genre/${movie.Genre.Name}`}>
              <Button variant="light" className="movie-view-button">
                Genre
              </Button>
            </Link>
          </Col>
        </Row>
        <Button
          variant="light"
          onClick={() => this.addToFavorite(movie._id)}
          className="movie-view-button"
        >
          Add to Favorites
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            onBackClick(null);
          }}
          className="movie-view-button"
        >
          Back
        </Button>
      </Container>
    );
  }
  asd;
}
