import React from "react";
import { Link } from "react-router-dom";
import {getDate, getTime, getTimeZone} from "../../util/string_util";
import { editComment } from "../../util/thread_api_util";
import ShowMap from "../map/show_map";
import AttendeeIndex from "./attendee_index";
import ThreadIndex from "./thread_index";

class EventShow extends React.Component{

  componentDidMount(){
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
          <div className="join-button" onClick={() => addNewAttendee(event._id, currentUser.id)}>Join Event!</div>
      } else {
        joinButton =
          <div className="join-button" onClick={() => deleteAttendee(event._id, currentUser.id)}>Leave Event!</div>
      }
    }
    return joinButton
  }

  render(){
    // check if current user is the owner. 
    const editCapability = this.props?.event?.owner?._id === this.props.currentUser.id
    const {event, threads} = this.props
    if((!event)||(!event.attendees)) {
      return null
    }
    return(
      <div className="event-show-container">
        <div className="event-show-body">
          <div className="event-show-content">
            <div className="event-show-details">
              
              <h2 className="event-show-title">{event.name}</h2>
              <h3 className="event-show-description">{event.description}</h3>
              <div className="date-time-container">
                <div className="event-date">{getDate(event.startTime)}</div>
                <div className="event-time">{getTime(event.startTime)} - {getTime(event.endTime)} {getTimeZone(event.endTime)}</div>
              </div>
              <div className="poi-list-container">
                {event.PointsOfInterest.map(poi => (
                  <div key={poi.name} className="poi-container">
                    <h4>{poi.name}</h4>
                    <div className="event-time">{getTime(poi.startTime)} - {getTime(poi.endTime)}</div>
                  </div>
                ))}
              </div>
              {this.joinEventButton()}  

              <Link
                to="/"
                className="event-show-back-link">
                  Back To Events Index
              </Link>

            </div>
          </div>

          <div className="show-map-wrapper">
            <ShowMap PointsOfInterest={event.PointsOfInterest} />
          </div>
          
        </div>
        <div className="interaction-container">
          <ThreadIndex threads={threads} event={event}  deleteThread={this.props.deleteThread}
          editCapability = {editCapability}
          />
          <AttendeeIndex attendees={event.attendees}/>
        </div>
      </div>
    );
  };
};

export default EventShow;