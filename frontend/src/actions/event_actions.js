import { getEvents, getEvent, makeEvent, editEvent, deleteEvent, addAttendee, removeAttendee, addPoi, editPoi, removePoi } from "../util/event_api_util";

export const RECEIVE_EVENTS = "RECEIVE_EVENTS";
export const RECEIVE_EVENT = "RECEIVE_EVENT";
export const REMOVE_EVENT = "REMOVE_EVENT";
export const RECEIVE_EVENT_ERRORS = "RECEIVE_EVENT_ERRORS";
export const REMOVE_EVENT_ERRORS = "REMOVE_EVENT_ERRORS";

export const receiveEvents = (events) => ({
  type: RECEIVE_EVENTS,
  events
});

export const receiveEvent = (event) => ({
  type: RECEIVE_EVENT,
  event
});

export const removeEvent = (eventId) => ({
  type: REMOVE_EVENT,
  eventId
});

export const receiveEventErrors = (errors) => ({
  type: RECEIVE_EVENT_ERRORS,
  errors
});

export const removeEventErrors = () => ({
  type: REMOVE_EVENT_ERRORS
});

export const fetchEvents = () => dispatch => (
  getEvents()
    .then(events => dispatch(receiveEvents(events)))
);

export const fetchEvent = (eventId) => dispatch => (
  getEvent(eventId)
    .then(event => dispatch(receiveEvent(event)))
);

export const createEvent = (data) => dispatch => (
  makeEvent(data)
    .then(event => dispatch(receiveEvent(event)))
    .catch(err => dispatch(receiveEventErrors(err.response.data)))
);

export const updateEvent = (data) => dispatch => (
  editEvent(data)
    .then(event => dispatch(receiveEvent(event)))
    .catch(err => dispatch(receiveEventErrors(err.response.data)))
);

export const deleteCurrentEvent = (eventId) => dispatch => (
  deleteEvent(eventId)
    .then(() => dispatch(removeEvent(eventId)))
    .catch(err => dispatch(receiveEventErrors(err.response.data)))
);

export const addNewPoi = (eventId, data) => dispatch => (
  addPoi(eventId, data)
    .then(event => dispatch(receiveEvent(event)))
    .catch(err => dispatch(receiveEventErrors(err.response.data)))
);

export const updatePoi = (eventId, data) => dispatch => (
  editPoi(eventId, data)
    .then(event => dispatch(receiveEvent(event)))
    .catch(err => dispatch(receiveEventErrors(err.response.data)))
);

export const deletePoi = (eventId, poiId) => dispatch => (
  removePoi(eventId, poiId)
    .then(event => dispatch(receiveEvent(event)))
);

export const addNewAttendee = (eventId, userId) => dispatch => (
  addAttendee(eventId, userId)
    .then(event => dispatch(receiveEvent(event)))
);

export const deleteAttendee = (eventId, userId) => dispatch => (
  removeAttendee(eventId, userId)
    .then(event => dispatch(receiveEvent(event)))
);