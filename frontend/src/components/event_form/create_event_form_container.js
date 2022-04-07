import { connect } from "react-redux";
import EventForm from "./event_form";
import { createEvent } from "../../actions/event_actions";
import { withRouter } from "react-router-dom";

const mSTP = (state) => ({
  ownerId: state.session.user.id,
  formType: "Create Event"
})

const mDTP = dispatch => ({
  createEvent: (event) => dispatch(createEvent(event))
})


export default withRouter(connect(mSTP, mDTP)(EventForm))
