import React, { PureComponent } from 'react';
import './styles/global.scss';
import firebase from './config/firebase-config';
import DefaultLayout from './containers/DefaultLayout/DefaultLayout';

class App extends PureComponent {
  render() {
    return <DefaultLayout />;
  }
}

export default App;
