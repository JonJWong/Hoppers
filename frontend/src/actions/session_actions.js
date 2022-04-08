import * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECIEVE_CURRENT_USER_EVENTS = "RECIEVE_CURRENT_USER_EVENTS"
export const REMOVE_SESSION_ERRORS = "REMOVE_SESSION_ERRORS"
// export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";

// We'll dispatch this when our user signs in
export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

// This will be used to redirect the user to the login page upon signup
// export const receiveUserSignIn = () => ({
//   type: RECEIVE_USER_SIGN_IN
// });
  
// We dispatch this one to show authentication errors on the frontend
export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const removeSessionErrors = () => ({
  type: REMOVE_SESSION_ERRORS
})

// When our user is logged out, we will dispatch this action to set isAuthenticated to false
export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});

// Receive a Current User's events
const currentUserEvents = (user) => ({
  type: RECIEVE_CURRENT_USER_EVENTS,
  user
})

// Upon signup, dispatch the approporiate action depending on which type of response we receieve from the backend
// if we sign up successfuly and insert a new user into the DB,
// We want to assign the signIn attribute to the session slice of state
  // this will be used by the signup form to redirect to the login form
export const signup = user => dispatch => (
  APIUtil.signup(user).then(res => {
    const { token } = res.data;
    localStorage.setItem('jwtToken', token);
    APIUtil.setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(receiveCurrentUser(decoded))
  })
  .catch(err => {
    dispatch(receiveErrors(err.response.data));
  })
);

// Upon login, set the session token and dispatch the current user. Dispatch errors on failure.
    // the login form will be listening for the authenticated attr in the session slice of state
    // Once it is there, the login form will redirect to the tweets page
export const login = user => dispatch => (
  APIUtil.login(user).then(res => {
    const { token } = res.data;
    localStorage.setItem('jwtToken', token);
    APIUtil.setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(receiveCurrentUser(decoded))
  })
  .catch(err => {
    dispatch(receiveErrors(err.response.data));
  })
)

// All the logout function does is remove the webtoken from local storage
// and set the default header web token to be blank again
export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken')
  APIUtil.setAuthToken(false)
  dispatch(logoutUser())
};


export const userEvents = (userId) => dispatch => {
  APIUtil.userEvents(userId)
    .then((user) => dispatch(currentUserEvents(user)))
}