import React, { PureComponent } from 'react';
import './styles/global.scss';
import firebase from './config/firebase-config';
import DefaultLayout from './containers/DefaultLayout/DefaultLayout';
import UserContext from './context/UserContext';
import { getUserById } from './api/user';
import { getTasksByUserId } from './api/task';

class App extends PureComponent {
  state = {
    user: null,
    tasks: [],
    loading: true
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(async user => {
      console.log('Auth change', user);

      if (!user) {
        return this.setState({
          user: null,
          tasks: [],
          loading: false
        });
      }

      try {
        const userData = await getUserById(user.uid);
        const tasksData = await getTasksByUserId(user.uid);

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
    this.setState({
      user: null,
      tasks: []
    });
    console.log(this.state);
    console.log(this.context);
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
