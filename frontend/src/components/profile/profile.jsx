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
      <div id="profile-self-section">
        <div id="profile-self-top">
          <div id="profile-self-title">
            Events you're hosting:
          </div>
          <div id="profile-self-button-container">
            <Link to="events/create">
              <button id="profile-self-create">Create New Event</button>
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
          if (event.owner === this.props.currentUser.id) {
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