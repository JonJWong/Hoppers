import React from "react";
import {getDate, getTime, getTimeZone} from "../../util/string_util"
import { Link } from "react-router-dom";
import IndexMap from "../map/index_map";

const EventIndexItem = ({event}) => (
  <li className="event-index-item">
    <div className="index-map-wrapper">
      <IndexMap PointsOfInterest={event.PointsOfInterest} />
    </div>
    <h2 className="index-item-name">{event.name}</h2>
    <h3 className="index-item-description">{event.description}</h3>
    <div className="date-time-container">
      <div className="index-item-date">{getDate(event.startTime)}</div>
      <div className="index-item-time">{getTime(event.startTime)} - {getTime(event.endTime)} {getTimeZone(event.endTime)}</div>
    </div>
    <Link
      to={`events/${event._id}`}
      className="index-show-link">
        To show page
    </Link>
  </li>
);

export default EventIndexItem;