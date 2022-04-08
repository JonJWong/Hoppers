import { connect } from "react-redux";
import CommentForm from "./comment_form";
import { updateComment } from "../../actions/thread_actions";

const mSTP = (state, {body, commentId}) => ({
  comment: {
    body: body,
    username: state.session.user.username,
  },
  commentId: commentId,
  formType: "Update Comment"
});

const mDTP = dispatch => ({
  action: (threadId,commentId, comment) => dispatch(updateComment(threadId,commentId ,comment)),
});

export default connect(mSTP,mDTP)(CommentForm);