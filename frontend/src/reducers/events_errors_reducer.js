import { RECEIVE_EVENT, RECEIVE_EVENT_ERRORS, REMOVE_EVENT_ERRORS, REMOVE_POI_ERRORS } from "../actions/event_actions";

const _nullErrors = {0: []};

const EventsErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_EVENT_ERRORS:
      if(!action.errors[0]){
        action.errors[0] = []
      }
      return action.errors;
    case RECEIVE_EVENT:
      return _nullErrors;
    case REMOVE_EVENT_ERRORS:
      return _nullErrors;
    case REMOVE_POI_ERRORS:
      // Only remove Poi Errors and "point of interest" error
      let newState = state[0]
      if (newState[0] === "Must have at least 1 point of interest") {
        newState = newState.slice(1)
      }
      return {0: (newState)}
    default:
      return state;
  }
};

export default EventsErrorsReducer;