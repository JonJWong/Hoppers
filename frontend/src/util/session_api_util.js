import axios from 'axios';

// either set or delete the common header dependent on whether the token is passed into our method
// We can pass in a falsey value to our function to ensure that the token will be removed from memory once our user is logged out or when the token has expired.
export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const signup = (userData) => {
  return axios.post('/api/users/register', userData);
};

export const login = (userData) => {
  return axios.post('/api/users/login', userData);
};

export const userEvents = (userId) => {
  return axios.get(`/api/users/${userId}`)
}