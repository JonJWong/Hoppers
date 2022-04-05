import axios from 'axios';

export const getEvents = () => {
  return axios.get('/api/events')
};

export const getEvent = (eventId) => {
  return axios.get(`/api/events/${eventId}`)
};