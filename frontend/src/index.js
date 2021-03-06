import React from "react";
import * as ReactDOMClient from 'react-dom/client';
import Root from "./components/root";
import configureStore from "./store/store";
import { logout } from "./actions/session_actions";

// We will use this to parse the user"s session token
import jwt_decode from "jwt-decode";

// The session utility we created to set the auth token header in all axios requests
import { setAuthToken } from "./util/session_api_util";

// BEGIN TESTING
// import { getEvent, makeEvent, editEvent, deleteEvent, addPoi, editPoi, removePoi, addAttendee, removeAttendee} from "./util/event_api_util";
// import { getThreads, getThread, makeThread, editThread, deleteThread, makeComment, editComment, deleteComment } from "./util/thread_api_util";
// import { createComment, updateComment} from "./actions/thread_actions";
// END TESTING

document.addEventListener("DOMContentLoaded", () => {
  let store;

  // If a returning user has a session token stored in localStorage
  if (localStorage.jwtToken) {

    // Set the token as a common header for all axios requests
    setAuthToken(localStorage.jwtToken);

    // Decode the token to obtain the user's information
    const decodedUser = jwt_decode(localStorage.jwtToken);

    // Create a preconfigured state we can immediately add to our store
    const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;

    // If the user's token has expired
    if (decodedUser.exp < currentTime) {
      // Logout the user and redirect to the login page
      store.dispatch(logout());
      window.location.href = "/login";
    }
  } else {
    // If this is a first time user, start with an empty store
    store = configureStore({});
  }

  // Render our root component and pass in the store as a prop
  const rootElement = document.getElementById("root");
  const root = ReactDOMClient.createRoot(rootElement)
  root.render(<Root store={store} /> )


  // BEGIN TESTING
  // window.getEvent = getEvent;
  // window.makeEvent = makeEvent;
  // window.editEvent = editEvent;
  // window.deleteEvent = deleteEvent;
  // window.addPoi = addPoi;
  // window.editPoi = editPoi;
  // window.removePoi = removePoi;
  // window.addAttendee = addAttendee;
  // window.removeAttendee = removeAttendee;

  // window.getThreads = getThreads
  // window.getThread = getThread
  // window.makeThread = makeThread
  // window.editThread = editThread
  // window.deleteThread = deleteThread
  // window.makeComment = makeComment
  // window.editComment = editComment
  // window.deleteComment = deleteComment

  // window.createComment = createComment
  // window.updateComment = updateComment
  // window.dispatch = store.dispatch
  // END TESTING
});