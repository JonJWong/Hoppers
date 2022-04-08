import { connect } from 'react-redux';
import { signup, login, removeSessionErrors } from '../../actions/session_actions';
import SignupPage from './signup_page.jsx';

const mapStateToProps = (state) => {
  return {
    signedIn: state.session.isSignedIn,
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: user => dispatch(signup(user)),
    login: user => dispatch(login(user)),
    removeSessionErrors:  () => dispatch(removeSessionErrors())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupPage);