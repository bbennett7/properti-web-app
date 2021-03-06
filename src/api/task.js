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

const createNewTask = async body => {
  try {
    return axios.post(`${process.env.REACT_APP_API_URL}/tasks`, body);
  } catch (err) {
    return err;
  }
};

const createUserTask = async (id, body) => {
  try {
    return axios.post(`${process.env.REACT_APP_API_URL}/users/${id}/tasks`, body);
  } catch (err) {
    return err;
  }
};

const deleteTask = async (userId, taskId) => {
  try {
    return axios.delete(`${process.env.REACT_APP_API_URL}/users/${userId}/tasks/${taskId}`);
  } catch (err) {
    return err;
  }
};

export default {
  getTasksByUserId,
  getOpenTasksByManagerId,
  getTasks,
  updateTask,
  createNewTask,
  createUserTask,
  deleteTask
};
