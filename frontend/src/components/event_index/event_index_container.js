import { connect } from "react-redux";
import EventIndex from "./event_index";
import { fetchEvents } from "../../actions/event_actions";

const mSTP = state => ({
  allEvents: Object.values(state.events.all)
});

const mDTP = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents())
});

export default connect(mSTP, mDTP)(EventIndex);