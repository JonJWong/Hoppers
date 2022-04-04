import {RECEIVE_EVENTS} from "../actions/event_actions"

const eventReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
  Object.freeze(state)
  let newState = Object.assign({}, state);
  switch(action.type) {
    case RECEIVE_EVENTS:
      newState.all = action.events.data;
      return newState;
    default:
      return state;
  };
}

export default eventReducer;