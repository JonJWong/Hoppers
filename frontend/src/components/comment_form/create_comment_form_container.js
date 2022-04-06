import { connect } from "react-redux";
import CommentForm from "./comment_form";

const mSTP = state => ({
  post: {
    title: "",
    body: ""
  },
  formType: "Leave Comment"
});

const mDTP = dispatch => ({

});

export default connect(mSTP,mDTP)(CommentForm);