const axios = require('axios');

const getTasksByUserId = async id => {
  try {
    return axios.get(`${process.env.REACT_APP_API_URL}/users/${id}/tasks`);
  } catch (err) {
    return err;
  }
};

const getOpenTasksByManagerId = async id => {
  try {
    return axios.get(`${process.env.REACT_APP_API_URL}/managers/${id}/open-tasks`);
  } catch (err) {
    return err;
  }
};

module.exports = {
  getTasksByUserId,
  getOpenTasksByManagerId
};
