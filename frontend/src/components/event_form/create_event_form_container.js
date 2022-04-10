import { connect } from "react-redux";
import EventForm from "./event_form";
import { createEvent, removePoiErrors } from "../../actions/event_actions";
import { withRouter } from "react-router-dom";

const mSTP = (state) => ({
  ownerId: state.session.user.id,
  formType: "Create Event",
  errors: state.errors.events
})

const mDTP = dispatch => ({
  createEvent: (event) => dispatch(createEvent(event)),
  removePoiErrors: () => dispatch(removePoiErrors())
})


export default withRouter(connect(mSTP, mDTP)(EventForm))
