import { connect } from "react-redux";
import CommentIndex from "./comment_index";
import { removeComment } from "../../actions/thread_actions";
import { withRouter } from "react-router-dom";
import { addNewAttendee } from "../../actions/event_actions";

const mSTP = (state, ownProps) => {
  console.log(ownProps.event)
  return{
    currentUserUsername: state.session.user.username,
    userId: state.session.user.id,
    eventId: ownProps.event._id
  } 
};

const mDTP = dispatch => ({
  deleteComment: (threadId, commentId) => dispatch(removeComment(threadId,commentId)),
  addAttendee: (eventId, userId) => dispatch(addNewAttendee(eventId, userId))
});

export default  withRouter(connect(mSTP, mDTP)(CommentIndex));