import { connect } from 'react-redux';
import Profile from './profile';
import { fetchEvents } from "../../actions/event_actions";
import { userEvents } from "../../actions/session_actions"

const mapStateToProps = (state) => {
  return {
    allEvents: Object.values(state.events.all),
    userEvents: Object.values(state.events.user),
    currentUser: state.session.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: () => dispatch(fetchEvents()),
    getUserEvents: (userId) => dispatch(userEvents(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);