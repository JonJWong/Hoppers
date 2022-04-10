import { connect } from "react-redux";
import EditEventForm from "./edit_event_form";
import { updateEvent, fetchEvent, removePoiErrors } from "../../actions/event_actions";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
  return {
    formType: "Edit Event",
    ownerId: state.session.user.id,
    event: state.events.all[ownProps.match.params.eventId],
    errors: state.errors.events
  }
}

const mapDispatchToProps = dispatch => ({
  updateEvent: (event) => dispatch(updateEvent(event)),
  fetchEvent: (eventId) => dispatch(fetchEvent(eventId)),
  removePoiErrors: () => dispatch(removePoiErrors())
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditEventForm))
