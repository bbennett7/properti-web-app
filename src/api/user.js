const axios = require('axios');

const createUser = async body => {
  try {
    return axios.post(`${process.env.REACT_APP_API_URL}/users`, body);
  } catch (err) {
    return err;
  }
};

module.exports = {
  createUser
};
