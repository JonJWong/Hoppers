import { RECEIVE_EVENT, RECEIVE_EVENT_ERRORS, REMOVE_EVENT_ERRORS } from "../actions/event_actions";

const _nullErrors = [];

const EventsErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_EVENT_ERRORS:
      return action.errors;
    case RECEIVE_EVENT:
      return _nullErrors;
    case REMOVE_EVENT_ERRORS:
      return [];
    default:
      return state;
  }
};

export default EventsErrorsReducer;