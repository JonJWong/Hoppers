import { connect } from "react-redux";
import ThreadForm from "./thread_form";
import {updateThread } from "../../actions/thread_actions";

const mSTP = (state, ownProps) => {
  return {
  thread: ownProps.thread,
  formType: "Update Thread",
  errors: state.errors.threads
  }
}

const mDTP = (dispatch) => ({
  action: (thread) => dispatch(updateThread(thread)),
})


export default (connect(mSTP, mDTP)(ThreadForm))
