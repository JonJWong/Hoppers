import React from 'react';
import ProfileEventItem from "./profile_event_container";
import { Link } from 'react-router-dom';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount(){
    this.props.fetchEvents();
    this.props.getUserEvents(this.props.currentUser.id);
    window.scroll({top: 0, left: 0, behavior: 'smooth' })
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
        <div className='spacer'>

        </div>
        <div id="event-public-title" className="sb">
          Events you are attending:       
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
    return (
      <ul id="profile-self-event-list">
        {this.props.allEvents?.map(event => {
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

  renderNonOwnEvents(){
    if (Object.values(this.props.userEvents).length === 0) {
      return null
    }
    return (
      <ul id="event-list">
        {this.props.allEvents?.map(event => {
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