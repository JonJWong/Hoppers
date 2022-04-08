import React from "react";
import { Link } from "react-router-dom";

class NavProfile extends React.Component{
  render(){
    const {user, modalLogout, closeModal} = this.props
    return(
      <div className='modal-content-container'>
        <div className="modal-profile-wrapper">
          <div className='modal-profile-container'>
            <div className="profile-wrap">
              <div className='circle select-none'>
                {user.username[0].toUpperCase()}
              </div>
              <div>
                <h4>{user.username}</h4>
                <Link to={'/profile'} onClick={closeModal}>My Profile</Link>
              </div>
            </div>
            <Link to={'/events'} onClick={closeModal}><h2 className="select-none link" onClick={closeModal}>Hoppers</h2></Link>
            
          </div>
          <div className="modal-links">
            <div className="modal-link">
              <Link to={'/events'} onClick={closeModal}><i className="fa-solid fa-calendar-days"></i> All Events</Link>
            </div>
            <div className="modal-link">
              <Link to={'/profile'} onClick={closeModal}><i className="fa-solid fa-address-card"></i> Your Events</Link>  
            </div>
            <div className="modal-link">
              <Link to={'/inbox'} onClick={closeModal}><i className="fa-solid fa-envelope"></i> Your inbox</Link>  
            </div>
            <div className="modal-link">
              <Link to={'/'} onClick={closeModal}><i className="fa-solid fa-circle-info"></i>About Hoppers</Link>  
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