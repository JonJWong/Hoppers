import React from "react";
import { Link } from "react-router-dom";
import EventIndexItem from "./event_index_item";

class EventIndex extends React.Component {
  componentDidMount() {
    this.props.fetchEvents();
    this.props.getUserEvents(this.props.user);
    window.scroll({top: 0, left: 0, behavior: 'smooth' });
  }

  renderEventBar() {
    return (
      <div id="index-self-section">
        {this.renderOwnEvents()}
      </div>
    )
  }

  // Use quick sort to order events by start date.
  orderEvents(events){
    if (events.length <= 1) return events;

    let pivot = events[0];
    let earlierEvents = events.slice(1).filter((event) => new Date(event.startTime) < new Date(pivot.startTime));
    let laterEvents = events.slice(1).filter((event) => new Date(event.startTime) > new Date(pivot.startTime));
    let earlier = this.orderEvents(earlierEvents);
    let later = this.orderEvents(laterEvents);
    return earlier.concat([pivot]).concat(later);
  }

  

  renderOwnEvents() {
    if (Object.values(this.props.allEvents).length === 0) return null;
    
    const ownEvents = this.props.allEvents.filter(
      event => event.owner === this.props.user)

    let orderedOwnEvents = this.orderEvents(ownEvents)
  
    if (ownEvents.length === 0) return null;

    return (
      <ul id="self-event-list">
        {orderedOwnEvents.map((event, i) => {
          if (i < 3) {
            return <EventIndexItem key={event._id} event={event} />
          }
          return null
        })}
        <div className="spacer">&nbsp;</div>
        <div className="spacer">&nbsp;</div>
        <div className="spacer">&nbsp;</div>
      </ul>
    )
  }

  renderForeignEvents() {
    if (Object.values(this.props.allEvents).length === 0 ){
      return null
    }
    let orderedEvents = this.orderEvents(this.props.allEvents)
    return (
      <ul id="event-list">
        {orderedEvents?.map(event => {
          return event.owner !== this.props.user
            ? <EventIndexItem key={event._id} event={event} />
            : null
        }
        )}
      </ul>
    )
  }

  render() {
    return (
      <div className="event-page-container">
        <div id="event-public-title" className="sb">
          Events you're hosting:           
          <div id="index-self-button-container">
            <Link to="/profile">
              <button id="index-self-profile">All Hosted Events</button>
            </Link>
            <Link to="events/create">
              <button id="index-self-create">Create New Event</button>
            </Link>
          </div>
        </div>
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