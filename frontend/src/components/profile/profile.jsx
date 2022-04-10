import React from "react";
import ProfileEventItem from "./profile_event_container";
import { Link } from "react-router-dom";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: []}
    
  }

  componentDidMount() {
    this.props.getUserEvents(this.props.currentUser.id);
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }

  orderEvents(events){
    if (events.length <= 1) return events;

    let pivot = events[0];
    let earlierEvents = events.slice(1).filter((event) => new Date(event.startTime) < new Date(pivot.startTime));
    let laterEvents = events.slice(1).filter((event) => new Date(event.startTime) > new Date(pivot.startTime));
    let earlier = this.orderEvents(earlierEvents);
    let later = this.orderEvents(laterEvents);
    return earlier.concat([pivot]).concat(later);
  }

  renderEventBar() {
    const { currentUser } = this.props;
    return (
      <>
        <div id="profile-header-bar">
          <div id="profile-header-greeting">Your Profile</div>
          <div id="profile-header-right">
            <div id="profile-name">Logged in as:
              <div id="profile-username">{currentUser.username}</div>
            </div>
            <Link to="/inbox">
              <button id="profile-self-inbox">Your Inbox <i className="fa-solid fa-envelope"></i></button>
            </Link>
          </div>
        </div>

        <div id="event-public-title" className="sb">
          Events you're hosting:         
          <div id="index-self-button-container">
            <Link to="events/create">
              <button id="index-self-create">Create New Event</button>
            </Link>
          </div>
        </div>

        <div id="profile-self-section">
          {this.renderOwnEvents()}
        </div>
        <div className='spacer'>

        </div>
        <div id="event-public-title" className="sb">
          Events you're attending:       
        </div>
        <div id="event-index-container">
          {this.renderNonOwnEvents()}
        </div>
      
      </>
    )
  }

  renderOwnEvents() {
    if(Object.values(this.props.userEvents).length === 0) {
      return null
    }

    let orderedEvents = this.orderEvents(this.props.userEvents)

    return (
      <ul id="profile-self-event-list">
        {orderedEvents?.map(event => {
          if (event.owner === this.props.currentUser.id) {
            return <ProfileEventItem key={event._id} event={event} />
          } else {
            return null
          }
        })}
        <div className="spacer">&nbsp;</div>
        <div className="spacer">&nbsp;</div>
        <div className="spacer">&nbsp;</div>
        <div className="spacer">&nbsp;</div>
      </ul>
    )
  }

  renderNonOwnEvents() {
    if (Object.values(this.props.userEvents).length === 0) {
      return null
    }

    let orderedEvents = this.orderEvents(this.props.userEvents)

    return (
      <ul id="event-list">
        {orderedEvents?.map(event => {
          return event.owner !== this.props.currentUser.id
            ? <ProfileEventItem key={event._id} event={event} />
            : null
        })}
      </ul>
    )
  }
  
  render() {
    return (
      <div className='profile-container'>
        {this.renderEventBar()}
      </div>
    );
  }
}

export default Profile;