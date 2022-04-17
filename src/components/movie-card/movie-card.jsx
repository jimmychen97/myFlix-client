import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;
        return (
            <Card id='movie-card'>
                <Card.Img variant='top' src={movie.ImagePath} id='card-img'/>
                <Card.Body id='card-flex'>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Button onClick={() => onMovieClick(movie)} variant='link'>Details</Button>
                </Card.Body>
            </Card>
        );
    }
}

// props object must include a movie object (shape({}))
// movie prop may contain a Title, must be type string
// props object must contain onMoiveClick() function
MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};