import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view'
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './main-view.scss';

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
    .catch(e => {
      console.log(e);
    });

    // get value of token from localStorage. If it is present, call getMovies with given username/token
    let accessToken = localStorage.getItem('token');
    if(accessToken !== null) {
      this.setState({
        user:localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
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

  // authData contains both token and username
  onLoggedIn(authData) {
    console.log(authData);

    // username is saved in the user state
    this.setState({
      user: authData.user.Username
    });

    // two arguments: key value pair
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);

    // gets the movie from API once the user is logged in
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  // GET request to 'movies' ebdpoint
  getMovies(token) {
    axios.get('https://myflix453.herokuapp.com/movies', {
      // passing bearer authorization, this allows authenticated request to API
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      this.setState({
        movies: res.data
      });
    }).catch(e => {
      console.log(e);
    });
  }

  /* render() returns the visual representation of the component
        can only have one root element (wrap elements around <> </>)
    */
  render() {
    const { movies, selectedMovie, user } = this.state;

    if(!user) {
      return <LoginView onLoggedIn={user=> this.onLoggedIn(user)} />; 
    }

    if (movies.length === 0)
      return <div className="main-view"></div>;

    return (
      <Router>
        <button onClick={() => { this.onLoggedOut() }}>Logout</button>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          <Route path="/movies/:movieId" render={({ match }) => {
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
            </Col>
          }} />
        </Row>
      </Router>
    );
  }
}