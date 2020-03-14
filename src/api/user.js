const axios = require('axios');

const createUser = async body => {
  try {
    return axios.post(`${process.env.REACT_APP_API_URL}/users`, body);
  } catch (err) {
    return err;
  }
};

const getUserById = async id => {
  try {
    return axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`);
  } catch (err) {
    return err;
  }
};

module.exports = {
  createUser,
  getUserById
};
