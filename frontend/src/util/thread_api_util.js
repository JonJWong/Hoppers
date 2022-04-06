import axios from 'axios';

export const getThreads = (eventId) => {
  return axios.get(`/api/threads/events/${eventId}`)
};

export const getThread = (threadId) => {
  return axios.get(`/api/threads/${threadId}`)
};

export const makeThread = (data) => {
  return axios.post('/api/threads', data)
};

export const editThread = (data) => {
  return axios.patch(`/api/threads/${data._id}`, data)
};

export const deleteThread = (threadId) => {
  return axios.delete(`/api/threads/${threadId}`)
};

export const makeComment = (threadId, data) => {
  return axios.post(`/api/threads/${threadId}/comments`, data)
};

export const editComment = (threadId, commentId, data) => {
  return axios.patch(`/api/threads/${threadId}/comments/${commentId}`, data)
};

export const deleteComment = (threadId, commentId) => {
  return axios.delete(`/api/threads/${threadId}/comments/${commentId}`)
};