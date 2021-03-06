import React from "react";
import { Link } from "react-router-dom";
import { getDate, getTime, getTimeZone } from "../../util/string_util";
import ShowMap from "../map/show_map";
import AttendeeIndex from "./attendee_index";
import ThreadIndex from "./thread_index";

class EventShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deletedSucess: false
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.fetchEvent(this.props.match.params.eventId)
  };

  componentDidUpdate(prevProps) {
    if (this.props.event?.attendees?.length !== prevProps.event?.attendees?.length) {
      this.props.fetchEvent(this.props.match.params.eventId)
    }
  }

  joinEventButton() {
    let joinButton;
    const { event, currentUser, addNewAttendee, deleteAttendee } = this.props

    if (currentUser) {
      let index = event.attendees.findIndex((attendee) => attendee.username === currentUser.username)
      if (index === -1) {
        joinButton = 
          <div className="event-show-back-link" onClick={() => addNewAttendee(event._id, currentUser.id)}>RSVP</div>
      } else {
        joinButton =
          <div className="event-show-back-link" onClick={() => deleteAttendee(event._id, currentUser.id)}>Leave Event</div>
      }
    }
    return joinButton
  }

  handleDelete() {
    this.props.history.replace("/profile")
  }

  render() {
    // check if current user is the owner. 
    const editCapability = this.props?.event?.owner?._id === this.props.currentUser.id
    const { event, threads } = this.props

    if ((!event) || (!event.attendees)) {
      return null
    }
    
    return (
      <div className="event-show-container">
        <div className="background">
          <img id="blur-background" alt="none"/>
        </div>
        <div className="event-show-body">
          <div className="event-show-content">
            <div className="event-show-details">
              <div className="margin-left">
                <h2 className="event-show-title">{event.name}</h2>
                <h4 className="event-show-description">About this event</h4>
                <p className="description">{event.description}</p>
                <div className="date-time-container">
                  <h4 className="details">Details</h4>
                  <div className="event-date">{getDate(event.startTime)}</div>
                  <div className="">{getTime(event.startTime)} - {getTime(event.endTime)} {getTimeZone(event.endTime)}</div>
                </div>
              </div>
              <div className="poi-list-container">
                {event.PointsOfInterest.map((poi, idx) => (
                  <div key={poi.name} className="poi-container">
                    <h4>{`${idx + 1}) `}{poi.name}</h4>
                    <div className="poi-contents">
                      <div className="event-time">{getTime(poi.startTime)} - {getTime(poi.endTime)}</div>
                      <p>{poi.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="show-links-wrapper">
                <div className="show-links">
                  {this.joinEventButton()}  &nbsp;|&nbsp;
                    
                  <Link
                    to="/events"
                    className="event-show-back-link">
                      More Events
                  </Link>

                  {this.props.currentUser.id === event.owner._id  && event.name !== "Graduation" ? (
                    <>
                      &nbsp;|&nbsp;
                      <Link 
                        to={`/events/${event._id}/edit`}
                        className="event-show-back-link"
                      >
                        Edit Event
                      </Link>
                      &nbsp;|&nbsp;
                      <span 
                        className="event-show-back-link"
                        onClick={
                          ()=> {
                            this.props.deleteCurrentEvent(event._id)
                              .then(this.handleDelete)
                          }
                        }
                      >
                        Delete Event
                      </span>
                    </>
                  ) : ( 
                    null
                  )}
                </div>
              </div>

            </div>
          </div>

          <div className="show-map-wrapper">
            <ShowMap PointsOfInterest={event.PointsOfInterest} />
          </div>
          
        </div>
        <div className="interaction-container">
          <ThreadIndex threads={threads} event={event}  deleteThread={this.props.deleteThread}
            editCapability = {editCapability} removeThreadErrors={this.props.removeThreadErrors}
          />
          <AttendeeIndex attendees={event.attendees}/>
        </div>
      </div>
    );
  };
};

export default EventShow;