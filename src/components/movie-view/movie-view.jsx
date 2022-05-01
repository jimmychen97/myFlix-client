import React from 'react';
import './movie-view.scss';
import { Card, Col, Container, Row, Button } from "react-bootstrap";

export class MovieView extends React.Component {
    render() {
        const {movie, onBackClick} = this.props;

        return (
            <Card className="movie-view" bg='dark'>
                <Card.Body>
                    <Card.Img className="movie-poster" variant="top" src={movie.ImagePath} />
                    <Card.Title className="movie-title">{movie.Title}</Card.Title>
                    <Card.Text className="movie-description">{movie.Description}</Card.Text>
                    <Link to={`/directors/${movie.Director.Name}`}>
                        <Button variant="link">Director</Button>
                    </Link>
                    <Link to={`/genres/${movie.Genre.Name}`}>
                        <Button variant="link">Genre</Button>
                    </Link>
                </Card.Body>
                <Button variant='secondary' onClick={() => { onBackClick(null); }}>Back</Button>
            </Card>
        );
    }asd
}