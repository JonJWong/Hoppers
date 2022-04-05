import React from "react";
import {getDate, getTime} from "../../util/string_util"
import { Link } from "react-router-dom";
import IndexMap from "../map/index_map";

const EventIndexItem = ({event}) => (
  <li className="event-index-item">
    {/* <IndexMap PointsOfInterest={event.PointsOfInterest} /> */}
    <div>Event Name: {event.name}</div>
    <div>Description: {event.description}</div>
    -----------------
    <div>Start Date: {getDate(event.startTime)}</div>
    <div>Start Time: {getTime(event.startTime)}</div>
    -----------------
    <div>End Date: {getDate(event.endTime)}</div>
    <div>End Time: {getTime(event.endTime)}</div>
    <Link to={`events/${event._id}`}>To show page</Link>
  </li>
);

export default EventIndexItem;