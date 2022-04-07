import { connect } from "react-redux";
import EventIndex from "./event_index";
import { fetchEvents } from "../../actions/event_actions";
import { userEvents } from "../../actions/session_actions"

const mSTP = state => ({
  allEvents: Object.values(state.events.all),
  user: state.session.user.id
});

const mDTP = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents()),
  getUserEvents: (userId) => dispatch(userEvents(userId))

});

export default connect(mSTP, mDTP)(EventIndex);