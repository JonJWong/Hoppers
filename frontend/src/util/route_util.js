import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

// Passed in from parent component or from mapStateToProps
const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (
    loggedIn ? (
      // Redirect to the tweets page if the user is authenticated
      <Redirect to="/events" />
    ) : (
      <Component {...props} />
    )
  )} />
);

const Protected = ({ component: Component, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      loggedIn ? (
        <Component {...props} />
      ) : (
        // Redirect to the login page if the user is not authenticated
        <Redirect to="/login" />
      )
    }
  />
);

// Use the isAuthenitcated slice of state to determine whether a user is logged in
// TODO: confirm if it is good practice to also use isSignedIn. 
    // not really because we are using the bool in the session slice of state
    // to simply redirect the user to the login page after creating an account
const mapStateToProps = state => (
  // {loggedIn: state.session.isAuthenticated || state.session.isSignedIn}
  {loggedIn: state.session.isAuthenticated}
);

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));