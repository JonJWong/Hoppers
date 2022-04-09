import { connect } from "react-redux";
import CommentForm from "./comment_form";
import { createComment } from "../../actions/thread_actions";

const mSTP = (state) => ({
  comment: {
    body: "",
    username: state.session.user.username,
  },
  formType: "Add a Comment"
});

const mDTP = dispatch => ({
  action: (threadId, comment) => dispatch(createComment(threadId,comment)),
});

export default connect(mSTP,mDTP)(CommentForm);