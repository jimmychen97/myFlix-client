import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';
import { CardGroup } from 'react-bootstrap';

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;
        return (
            <CardGroup>
                <Card className='card' bg='dark'>
                    <Card.Img variant='top' src={movie.ImagePath} className='card-img'/>
                    <Card.Body className='card-body'>
                        <Card.Title>{movie.Title}</Card.Title>
                        <Card.Text>{movie.Description}</Card.Text>
                        <Button onClick={() => onMovieClick(movie)} variant='outline-light'>Details</Button>
                    </Card.Body>
                </Card>
            </CardGroup>
            
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