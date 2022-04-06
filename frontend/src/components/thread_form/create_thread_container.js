import { connect } from "react-redux";
import ThreadForm from "./thread_form";
import { createThread } from "../../actions/thread_actions";
import {fetchEvent} from "../../actions/event_actions"

const mSTP = (state, ownProps) => {
  return {
  thread: {
    name: "Checking",
    eventId: ownProps.event._id
  },
  formType: "Create Thread"
  }
}

const mDTP = (dispatch, ownProps) => ({
  action: (thread) => dispatch(createThread(thread)),
})


export default (connect(mSTP, mDTP)(ThreadForm))
