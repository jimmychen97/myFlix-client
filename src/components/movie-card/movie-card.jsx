import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;
        return <div className="movie-card" onClick={()=> {onMovieClick(movie);}}>{movie.Title}</div>;
    }
}

// props object must include a movie object (shape({}))
// movie prop may contain a Title, must be type string
// props object must contain onMoiveClick() function
MovieCard.PropTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};