import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import { MovieCard } from '../movie-card/movie-card';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

const mapStateToProps = (state) => {
  const { movies, visibilityFilter } = state;
  return { movies, visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter((movie) => {
      return movie.Title.toLowerCase().includes(visibilityFilter.toLowerCase());
    });
  }
  if (!movies) return <div className="main-view" />;

  return (
    <>
      <Col md={{ span: 4, offset: 7 }} className="mb-4">
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      {filteredMovies.map((movie) => (
        <Col className="mb-4" lg={2} md={4} sm={6} xs={12} key={movie._id}>
          <MovieCard movie={movie} />
        </Col>
      ))}
    </>
  );
}

export default connect(mapStateToProps)(MoviesList);
