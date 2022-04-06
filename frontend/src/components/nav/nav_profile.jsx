import React from "react";
import { Link } from "react-router-dom";

class NavProfile extends React.Component{
  render(){
    const {user, modalLogout, closeModal} = this.props
    return(
      <div className='modal-content-container'>
        <div className="modal-profile-wrapper">
          <div className='modal-profile-container'>
            <div className='circle select-none'>
              {user.username[0].toUpperCase()}
            </div>
            <div>
              <h4>{user.username}</h4>
              <Link to={'/profile'} onClick={closeModal}>My Profile</Link>
            </div>
          </div>
          <div className="modal-links">
            <div className="modal-link">
              <Link to={'/events'} onClick={closeModal}><i className="fa-solid fa-calendar-days"></i> Events</Link>
            </div>
            <button
              id="nav-modal-signout"
              onClick={modalLogout}>
                Sign Out
            </button>
          </div>
        </div> 
      </div>
    )
  }
};

export default NavProfile;