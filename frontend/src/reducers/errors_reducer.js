import { combineReducers } from "redux";
import SessionErrorsReducer from "./session_errors_reducer";
import EventsErrorsReducer from "./events_errors_reducer";
import ThreadsErrorsReducer from "./threads_errors_reducer";

const errorsReducer = combineReducers({
  session: SessionErrorsReducer,
  events: EventsErrorsReducer,
  threads: ThreadsErrorsReducer,
});

export default errorsReducer;