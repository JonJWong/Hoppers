import { connect } from "react-redux";
import ThreadForm from "./event_form";
import { createThread } from "../../actions/thread_actions";
import { withRouter } from "react-router-dom";

const mSTP = (state) => ({
  event: {
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    owner: state.session.user.id
  },
  formType: "Create The Ultimate Event!"
})

const mDTP = dispatch => ({
  action: (event) => dispatch(createEvent(event))
})


export default withRouter(connect(mSTP, mDTP)(EventForm))
