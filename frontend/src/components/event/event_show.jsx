import React from "react";
import { Link } from "react-router-dom";
import {getDate, getTime, getTimeZone} from "../../util/string_util";
import DisplayMap from "../map/display_map";
import AttendeeIndex from "./attendee_index";
import ThreadIndex from "./thread_index";

class EventShow extends React.Component{

  componentDidMount(){
    this.props.fetchEvent(this.props.match.params.eventId)
  };

  render(){
    const {event} = this.props
    if((!event)||(!event.attendees)) {
      return null
    }
    return(
      <div className="event-show-container">
        <div className="event-show-body">
          <div className="event-show-content">
            <div className="event-show-details">
              <h2>{event.name}</h2>
              <h3>{event.description}</h3>
              <div className="date-time-container">
                <div className="date">{getDate(event.startTime)}</div>
                <div className="time">{getTime(event.startTime)} - {getTime(event.endTime)} {getTimeZone(event.endTime)}</div>
              </div>
              <AttendeeIndex attendees={event.attendees}/>
              <Link to="/">Back To Events Index</Link>
            </div>
          </div>  
          <DisplayMap PointsOfInterest={event.PointsOfInterest} />
        </div>
        <ThreadIndex threads={event.threads} />
      </div>
    );
  };
};

export default EventShow;