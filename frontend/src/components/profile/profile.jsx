import React from 'react';
import { Link } from 'react-router-dom';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }
  
  render() {
    return (
      <div className='profile-container'>
        <div className='profile-content'>
          <div>Hello {this.props.currentUser.username}</div>
          <Link to="/events">To events page</Link>
        </div>
      </div>
    );
  }
}

export default Profile;