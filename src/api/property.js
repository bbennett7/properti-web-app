const axios = require('axios');

const getPropertiesByManagerId = async id => {
  try {
    return axios.get(`${process.env.REACT_APP_API_URL}/managers/${id}/properties`);
  } catch (err) {
    return err;
  }
};

module.exports = {
  getPropertiesByManagerId
};
