import React from 'react';

const UserContext = React.createContext({
  user: null,
  tasks: [],
  updateUser: () => {},
  updateTasks: () => {}
});

export default UserContext;
