import React, { PureComponent } from 'react';
import './styles/global.scss';
import firebase from './config/firebase-config';
import DefaultLayout from './containers/DefaultLayout/DefaultLayout';
import UserContext from './context/UserContext';

class App extends PureComponent {
  state = {
    user: {}
  };

  componentDidMount() {}

  updateUser = data => {
    return this.setState({
      user: {
        ...this.state.user,
        ...data
      }
    });
  };

  render() {
    const { user } = this.state;
    return (
      <UserContext.Provider
        value={{
          user,
          updateUser: this.updateUser
        }}
      >
        <DefaultLayout />
      </UserContext.Provider>
    );
  }
}

export default App;
