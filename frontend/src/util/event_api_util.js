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

export const addPoi = (eventId, data) => {
  return axios.post(`/api/events/${eventId}/pois`, data)
};

export const editPoi = (eventId, data) => {
  return axios.patch(`/api/events/${eventId}/pois/${data._id}`, data)
};

export const removePoi = (eventId, poiId) => {
  return axios.delete(`/api/events/${eventId}/pois/${poiId}`)
};

export const addAttendee = (eventId, userId) => {
  return axios.patch(`/api/events/${eventId}/${userId}`)
};

export const removeAttendee = (eventId, userId) => {
  return axios.delete(`/api/events/${eventId}/${userId}`)
};