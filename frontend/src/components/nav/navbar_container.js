import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout, login, removeSessionErrors } from "../../actions/session_actions";

import NavBar from './navbar';

const mSTP = state => ({
  loggedIn: state.session.isAuthenticated,
  user: state.session.user
});

const mDTP = (dispatch) => {
  return {
    login: user => dispatch(login(user)),
    logout: () => dispatch(logout()),
    removeSessionErrors: () => dispatch(removeSessionErrors())
  }
}

export default withRouter(connect(mSTP, mDTP)(NavBar));