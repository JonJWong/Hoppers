import React from "react";
import { Link } from "react-router-dom";

class NavProfile extends React.Component{
  render(){
    const {user, modalLogout, closeModal} = this.props
    return(
      <div className='modal-content-container'> 
        <div className='modal-profile-container'>
          <div className='circle select-none'>
            {user.username[0]}
          </div>
          <div>
            <h4>{user.username}</h4>
            <Link to={'/profile'} onClick={closeModal}>My Profile</Link>
          </div>
        </div>
        <button
          id="nav-modal-signout"
          onClick={modalLogout}>
            Sign Out
        </button>
      </div>
    )
  }
};

export default NavProfile;