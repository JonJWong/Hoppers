import { connect } from "react-redux";
import ThreadForm from "./thread_form";
import { createThread } from "../../actions/thread_actions";

const mSTP = (state, ownProps) => {
  return {
  thread: ownProps.thread,
  formType: "Update Thread"
  }
}

const mDTP = (dispatch, ownProps) => ({
  action: (thread) => dispatch(createThread(thread)),
})


export default (connect(mSTP, mDTP)(ThreadForm))
