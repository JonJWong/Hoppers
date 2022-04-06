import { connect } from 'react-redux';
import Profile from './profile';
import { fetchEvents } from "../../actions/event_actions";

const mapStateToProps = (state) => {
  return {
    allEvents: Object.values(state.events.all),
    currentUser: state.session.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: () => dispatch(fetchEvents())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);