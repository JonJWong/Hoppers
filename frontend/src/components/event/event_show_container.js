import { connect } from "react-redux";
import EventShow from "./event_show";
import { fetchEvent, addNewAttendee, deleteAttendee } from "../../actions/event_actions";
import {deleteThread, removeThreadErrors} from "../../actions/thread_actions"
import { deleteCurrentEvent } from "../../actions/event_actions";

const mSTP = (state, ownProps) => {
  return { 
    event: state.events.all[ownProps.match.params.eventId],
    threads: state.threads,
    currentUser: state.session.user
  }
};

const mDTP = dispatch => ({
  fetchEvent: (eventId) => dispatch(fetchEvent(eventId)),
  deleteThread: (threadId) => dispatch(deleteThread(threadId)),
  addNewAttendee: (eventId, userId) => dispatch(addNewAttendee(eventId, userId)),
  deleteAttendee: (eventId, userId) => dispatch(deleteAttendee(eventId, userId)),
  removeThreadErrors: () => dispatch(removeThreadErrors()),
  deleteCurrentEvent: (eventId) => dispatch(deleteCurrentEvent(eventId))
});

export default connect(mSTP, mDTP)(EventShow);