import React from 'react';
import ReactDOM from 'react-dom';
import LoginView from './components/login-view/login-view';
import { MainView } from './components/main-view/main-view';
import './index.scss';

class myFlixApplication extends React.Component {
    render() {
        return (
           <LoginView />
        );
    }
}

// finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// tells react to render your app in the root DOM element
ReactDOM.render(React.createElement(myFlixApplication), container);