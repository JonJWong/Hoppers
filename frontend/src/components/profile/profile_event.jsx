import React from "react";
import {getDate, getTime, getTimeZone} from "../../util/string_util"
import { Link } from "react-router-dom";

const ProfileEventItem = ({event}) => (
  <li className="event-index-item">
    <Link
      to={`events/${event._id}`}
      className="index-show-link">
      <div className="profile-item">
        <h2 className="index-item-name select-none">{event.name}</h2>
        <h3 className="index-item-description select-none profile-item-description">{event.description}</h3>
        <div className="date-time-container">
          <div className="index-item-date select-none">{getDate(event.startTime)}</div>
          <div className="index-item-time select-none">{getTime(event.startTime)} - {getTime(event.endTime)} {getTimeZone(event.endTime)}</div>
        </div>
      </div>
    </Link>
  </li>
);

export default ProfileEventItem;