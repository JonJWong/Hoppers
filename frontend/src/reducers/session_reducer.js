// DEPRECATED and replace by the sesssion api reducer

import { RECEIVE_USER_LOGOUT } from "../actions/session_actions";

const initialState = {
  isAuthenticated: false,
  user: {}
};

const session = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined
      };
    default:
      return state;
  }
}

export default session;