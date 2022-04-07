import { connect } from "react-redux";
import EditEventForm from "./edit_event_form";
import { updateEvent, fetchEvent } from "../../actions/event_actions";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => ({
  event: state.events.all[ownProps.match.params.eventId],
  formType: "Edit Event"
})

const mapDispatchToProps = dispatch => ({
  updateEvent: (event) => dispatch(updateEvent(event)),
  fetchEvent: (eventId) => dispatch(fetchEvent(eventId))
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditEventForm))
