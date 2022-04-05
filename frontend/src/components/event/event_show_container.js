import { connect } from "react-redux";
import EventShow from "./event_show";
import { fetchEvent } from "../../actions/event_actions";

const mSTP = (state, ownProps) => {
  return { 
    event: state.events.all[ownProps.match.params.eventId]
  }
};

const mDTP = dispatch => ({
  fetchEvent: (eventId) => dispatch(fetchEvent(eventId))
});

export default connect(mSTP, mDTP)(EventShow);