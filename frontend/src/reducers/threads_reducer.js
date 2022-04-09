import { RECEIVE_EVENT } from "../actions/event_actions";
import { RECEIVE_THREAD, RECEIVE_NEW_THREAD, REMOVE_THREAD} from "../actions/thread_actions";

const threadReducer = (state = [], action) => {
  Object.freeze(state)
  let newState = Object.assign([], state);
  switch(action.type) {
    case RECEIVE_EVENT:
      return action.event.data.threads
    case RECEIVE_THREAD:
      newState.forEach((thread,idx) => {
        if (thread._id === action.thread.data._id) {
          newState[idx] = action.thread.data
        }
      })
      return newState
    case RECEIVE_NEW_THREAD:
      newState.push(action.thread.data)
      return newState;
    case REMOVE_THREAD:
      newState.forEach((thread,idx) => {
        if (thread._id === action.threadId) {
          delete newState[idx]
        }
      })
      return newState;
    default:
      return state;
  };
}

export default threadReducer;