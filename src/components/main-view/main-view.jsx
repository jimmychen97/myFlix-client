import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { NavbarView } from '../navbar-view/navbar-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './main-view.scss';
import { Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';

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
      user: null,
    };
  }

  // query myFlix API /movies endpoint with a get request
  componentDidMount() {
    axios
      .get('https://myflix453.herokuapp.com/movies')
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });

    // get value of token from localStorage. If it is present, call getMovies with given username/token
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
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
    });
  }

  // authData contains both token and username
  onLoggedIn(authData) {
    console.log(authData);

    // username is saved in the user state
    this.setState({
      user: authData.user.Username,
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
      user: null,
    });
  }

  // GET request to 'movies' ebdpoint
  getMovies(token) {
    axios
      .get('https://myflix453.herokuapp.com/movies', {
        // passing bearer authorization, this allows authenticated request to API
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setState({
          movies: res.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  /* render() returns the visual representation of the component
        can only have one root element (wrap elements around <> </>)
    */
  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        {/* Navbar view, show on all pages when user is logged in */}
        <NavbarView user={user}></NavbarView>
        <Row className="main-view justify-content-md-center">
          {/* Default route '/' */}
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return movies.map((m) => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ));
            }}
          />

          {/* Register route '/register' */}
          <Route
            exact
            path="/register"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />

          {/* movie route '/movie/:movieId' */}
          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              console.log(match);
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          {/* director route '/director/:name'*/}
          <Route
            path="/director/:name"
            render={({ match, history }) => {
              console.log(match);
              return (
                <Col md={8}>
                  <NavbarView user={user}></NavbarView>
                  <DirectorView
                    director={
                      movies.find((m) => m.Director.Name === match.params.name)
                        .Director
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          {/* genre route '/genre/:name' */}
          <Route
            exact
            path="/genre/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <NavbarView user={user}></NavbarView>
                  <GenreView
                    genre={
                      movies.find((m) => m.Genre.Name === match.params.name)
                        .Genre
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          {/* profile route '/users/user' */}
          <Route
            path={`/users/${user}`}
            render={({ history, match }) => {
              if (!user) return <Redirect to="/" />;
              return (
                <Col>
                  <ProfileView
                    history={history}
                    movies={movies}
                    user={user === match.params.username}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}
