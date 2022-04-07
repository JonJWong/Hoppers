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
      <>
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
      </>
    )
  }

  renderOwnEvents() {
    if(Object.values(this.props.allEvents).length === 0) {
      return null
    }

    return (
      <div className="show-shadow" >
        <ul id="profile-self-event-list">
          {this.props.allEvents?.map(event => {
            if (event.owner === this.props.currentUser.id) {
              return <EventIndexItem key={event._id} event={event} />
            } else {
              return null
            }
          })}
          <div className="spacer">&nbsp;</div>
          <div className="spacer">&nbsp;</div>
          <div className="spacer">&nbsp;</div>
          <div className="spacer">&nbsp;</div>
        </ul>
      </div>
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