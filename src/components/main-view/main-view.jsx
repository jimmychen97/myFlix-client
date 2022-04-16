import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view'
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  // create the component, first thing to execute for a component
  // constructor is the place to initialize a state's values
  constructor() {
    // initializes component' state, to be able to use this.state
    // default user state is logged out
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  // query myFlix API /movies endpoint with a get request
  componentDidMount(){
    axios.get('https://myflix453.herokuapp.com/movies')
    .then(response=> {
      this.setState({
        movies: response.data
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  // when a movie is clicked, it updates the state of selectedMovie to that movie
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  onRegistration() {
    this.setState({
      registration,
    })
  }

  // passed as a prop, update user state of the MainView component
  // called when the user has successfully logged in
  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  /* render() returns the visual representation of the component
        can only have one root element (wrap elements around <> </>)
    */
  render() {
    const { movies, selectedMovie, user } = this.state;

    if(!user)
      return <LoginView onLoggedIn={user=> this.onLoggedIn(user)} />; 

    if (movies.length === 0)
      return <div className="main-view"></div>;

    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onBackClick={newSelectedMovie => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(movie) => {
                this.setSelectedMovie(movie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}