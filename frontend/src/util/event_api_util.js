import axios from 'axios';

export const getEvents = () => {
  return axios.get('/api/events')
};

export const getEvent = (eventId) => {
  return axios.get(`/api/events/${eventId}`)
};

export const makeEvent = (data) => {
  return axios.post('/api/events', data)
};

export const editEvent = (data) => {
  return axios.patch(`/api/events/${data._id}`, data)
}

export const deleteEvent = (eventId) => {
  return axios.delete(`/api/events/${eventId}`)
};
