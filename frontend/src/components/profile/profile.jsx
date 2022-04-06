import React from 'react';
import EventIndexItem from "../event_index/event_index_item";
import { Link } from 'react-router-dom';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount(){
    this.props.fetchEvents();
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
      <ul id="profile-self-event-list">
        {this.props.allEvents?.map(event => {
          if (event.owner === this.props.user) {
            return <EventIndexItem key={event._id} event={event} />
          }
        })}
      </ul>
    )
  }
  
  render() {
    return (
      <div className='profile-container'>
        <div className='profile-content'>
          <div>Hello {this.props.currentUser.username}</div>
          <Link to="/events">To events page</Link>
        </div>
        {this.renderEventBar()}
      </div>
    );
  }
}

export default Profile;