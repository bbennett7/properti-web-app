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

const getTasks = async () => {
  try {
    return axios.get(`${process.env.REACT_APP_API_URL}/tasks`);
  } catch (err) {
    return err;
  }
};

const updateTask = async (userId, taskId, body) => {
  try {
    return axios.patch(`${process.env.REACT_APP_API_URL}/users/${userId}/tasks/${taskId}`, body);
  } catch (err) {
    return err;
  }
};

module.exports = {
  getTasksByUserId,
  getOpenTasksByManagerId,
  getTasks,
  updateTask
};
