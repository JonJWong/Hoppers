import { getEvents, getEvent, makeEvent, editEvent, deleteEvent } from "../util/event_api_util";

export const RECEIVE_EVENTS = "RECEIVE_EVENTS";
export const RECEIVE_EVENT = "RECEIVE_EVENT";
export const REMOVE_EVENT = "REMOVE_EVENT";

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

export const fetchEvents = () => dispatch => (
  getEvents()
    .then(events => dispatch(receiveEvents(events)))
    .catch(err => console.log(err))
);

export const fetchEvent = (eventId) => dispatch => (
  getEvent(eventId)
    .then(event => dispatch(receiveEvent(event)))
    .catch(err => console.log(err))
);

export const createEvent = (eventId, data) => dispatch => (
  makeEvent(eventId, data)
    .then(event => dispatch(receiveEvent(event)))
    .catch(err => console.log(err))
);

export const updateEvent = (eventId, data) => dispatch => (
  editEvent(eventId, data)
    .then(event => dispatch(receiveEvent(event)))
    .catch(err => console.log(err))
);

export const deleteCurrentEvent = (eventId) => dispatch => (
  deleteEvent(eventId)
    .then(() => dispatch(removeEvent(eventId)))
    .catch(err => console.log(err))
);
