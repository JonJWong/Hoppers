import React from "react";
import { Link } from "react-router-dom";
import EventIndexItem from "./event_index_item";

class EventIndex extends React.Component{
  componentDidMount(){
    this.props.fetchEvents();
    this.props.getUserEvents(this.props.user);
  }

  renderEventBar() {
    return (
      <div id="index-self-section">
        <div id="index-self-top">
          <div id="index-self-title">
            Your Events:
          </div>
          <div id="index-self-button-container">
            <Link to="events/create">
              <button id="index-self-create">Create New Event</button>
            </Link>
          </div>
        </div>

        {this.renderOwnEvents()}
      </div>
    )
  }

  renderOwnEvents() {
    if(Object.values(this.props.allEvents).length === 0) {
      return null
    }

    return (
      <div className="show-shadow">
        <ul id="self-event-list">
          {this.props.allEvents?.map(event => {
            return event.owner === this.props.user
              ? <EventIndexItem key={event._id} event={event} />
              : null
          })}
        </ul>
      </div>
    )
  }

  renderForeignEvents() {
    if (Object.values(this.props.allEvents).length === 0 ){
      return null
    }
    return (
      <ul id="event-list">
        {this.props.allEvents?.map(event => {
          return event.owner !== this.props.user
            ? <EventIndexItem key={event._id} event={event} />
            : null
        }
        )}
      </ul>
    )
  }

  render() {
    return(
      <div className="event-page-container">
        <div id="event-self-index-container">
          {this.renderEventBar()}
        </div>

        <div id="event-public-title">Public Events:</div>
        <div id="event-index-container">
          {this.renderForeignEvents()}
        </div>
      </div>
    )
  }
};

export default EventIndex;