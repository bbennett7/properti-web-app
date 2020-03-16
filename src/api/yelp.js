const axios = require('axios');

const fetchYelpServices = async queryString => {
  try {
    return axios.get(`${process.env.REACT_APP_API_URL}/api/search-businesses?${queryString}`);
  } catch (err) {
    return err;
  }
};

module.exports = {
  fetchYelpServices
};
