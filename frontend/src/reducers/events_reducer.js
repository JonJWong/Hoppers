import { RECEIVE_EVENTS, RECEIVE_EVENT, REMOVE_EVENT } from "../actions/event_actions"

const eventReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
  Object.freeze(state)
  let newState = Object.assign({}, state);
  switch(action.type) {
    case RECEIVE_EVENTS:
      Object.values(action.events.data).forEach(event => {
        newState.all[event._id] = event;
      })
      // newState.all = action.events.data;
      return newState;
    case RECEIVE_EVENT:
      newState.all[action.event.data._id] = Object.assign({},action.event.data);
      delete newState.all[action.event.data._id].threads
      return newState;
    case REMOVE_EVENT:
      delete newState[action.eventId]
      return newState
    default:
      return state;
  };
}

export default eventReducer;