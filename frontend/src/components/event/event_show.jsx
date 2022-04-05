import React from "react";
import { Link } from "react-router-dom";
import {getDate, getTime} from "../../util/string_util"
import MapContainer from "../map/map_container"
import AttendeeIndex from "./attendee_index";
import ThreadIndex from "./thread_index";

class EventShow extends React.Component{

  componentDidMount(){
    if(!this.props.event){
      this.props.fetchEvent(this.props.match.params.eventId)
    };
  };

  render(){
    if(!this.props.event){
      return null
    }
    const {event} = this.props
    return(
      <div className="event-show-container">
        <div className="event-show-body">
          <div className="event-show-content">
            <div>
              I am the event show content div
              <div>My event ID is: {event._id}</div>
              <div>Event Name: {event.name}</div>
              <div>Description: {event.description}</div>
              -----------------
              <div>Start Date: {getDate(event.startTime)}</div>
              <div>Start Time: {getTime(event.startTime)}</div>
              -----------------
              <div>End Date: {getDate(event.endTime)}</div>
              <div>End Time: {getTime(event.endTime)}</div>
              <Link to="/">To Events Index</Link>
            </div>
            <AttendeeIndex attendees={event.attendees}/>
          </div>  
          <MapContainer />
        </div>
        <ThreadIndex threads={event.threads} />
        {/* insert threads/comments component here */}
      </div>
    );
  };
};

export default EventShow;