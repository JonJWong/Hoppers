import { combineReducers } from "redux";
// import sessionReducer from "./session_reducer";
import errorsReducer from "./errors_reducer";
import sessionApiReducer from "./session_api_reducer";
import eventReducer from "./events_reducer";
import threadReducer from "./threads_reducer";

const RootReducer = combineReducers({
  // the session reducer was previously being used for its logout functionality only.
  // session: sessionReducer,
  session: sessionApiReducer,
  errors: errorsReducer,
  threads: threadReducer,
  events: eventReducer,
});

export default RootReducer;