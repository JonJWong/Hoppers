import React from 'react';
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
      e.preventDefault();
      this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
      if (this.props.loggedIn) {
        return (
            <div>
                <Link
                  to={'/profile'}>
                    My Profile
                </Link>
                <button
                  id="nav-bar-logout"
                  onClick={this.logoutUser}>
                    Log Out
                </button>
            </div>
        );
      } else {
        return (
            <div>
                <Link
                  to={'/signup'}>
                    <button
                      id="nav-bar-signup">
                      Sign Up
                    </button>
                </Link>
                <Link
                  to={'/login'}>
                    <button
                      id="nav-bar-login">
                      Log In
                    </button>
                </Link>
            </div>
        );
      }
  }

  render() {
      return (
        <div id="nav-bar-wrapper">
          <div id="nav-bar-container">
            <button>
              Font Awesome Hamburger here
            </button>
            { this.getLinks() }
          </div>
        </div>
      );
  }
}

export default NavBar;