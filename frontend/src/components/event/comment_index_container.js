import { connect } from "react-redux";
import CommentIndex from "./comment_index";
import { removeComment } from "../../actions/thread_actions";

const mSTP = state => ({
  currentUserUsername: state.session.user.username
});

const mDTP = dispatch => ({
  deleteComment: (threadId, commentId) => dispatch(removeComment(threadId,commentId)),
});

export default connect(mSTP, mDTP)(CommentIndex);