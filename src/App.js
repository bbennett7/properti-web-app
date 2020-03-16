import React, { PureComponent } from 'react';
import './styles/global.scss';
import firebase from './config/firebase-config';
import DefaultLayout from './containers/DefaultLayout/DefaultLayout';
import UserContext from './context/UserContext';
import User from './api/user';
import Task from './api/task';

class App extends PureComponent {
  state = {
    user: null,
    tasks: [],
    loading: true
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(async user => {
      console.log('Auth change');

      if (!user) {
        return this.setState({
          user: null,
          tasks: [],
          loading: false
        });
      }

      try {
        const userData = await User.getUserById(user.uid);
        const tasksData = await Task.getTasksByUserId(user.uid);

        return this.setState({
          user: userData.data,
          tasks: tasksData.data,
          loading: false
        });
      } catch (err) {
        return this.setState({
          user: null,
          tasks: [],
          loading: false
        });
      }
    });
  };

  updateUser = data => {
    return this.setState({
      user: {
        ...this.state.user,
        ...data
      }
    });
  };

  removeUser = () => {
    return this.setState({
      user: null,
      tasks: []
    });
  };

  updateTasks = data => {
    return this.setState({
      tasks: data
    });
  };

  render() {
    const { user, tasks, loading } = this.state;
    return (
      <UserContext.Provider
        value={{
          user,
          tasks,
          loading,
          updateUser: this.updateUser,
          updateTasks: this.updateTasks,
          removeUser: this.removeUser
        }}
      >
        <DefaultLayout />
      </UserContext.Provider>
    );
  }
}

export default App;
