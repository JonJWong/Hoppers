import { connect } from "react-redux";
import EventForm from "./event_form";
import { createEvent, removeEventErrors } from "../../actions/event_actions";
import { withRouter } from "react-router-dom";

const mSTP = (state) => ({
  ownerId: state.session.user.id,
  formType: "Create Event",
  errors: state.errors.events
})

const mDTP = dispatch => ({
  createEvent: (event) => dispatch(createEvent(event)),
  removeEventErrors: () => dispatch(removeEventErrors())
})


export default withRouter(connect(mSTP, mDTP)(EventForm))
