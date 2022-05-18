import React from 'react';
import { Container } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import './index.scss';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

const myFlixStore = createStore(moviesApp, devToolsEnhancer());

class myFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={myFlixStore}>
        <Container>
          <MainView />
        </Container>
      </Provider>
    );
  }
}

// finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// tells react to render your app in the root DOM element
ReactDOM.render(React.createElement(myFlixApplication), container);
