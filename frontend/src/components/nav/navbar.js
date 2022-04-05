import React from 'react';
import { Link } from 'react-router-dom'
import LoginFormContainer from "../session/login_form_container";
import SignupFormContainer from "../session/signup_form_container";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      currentForm: ""
    }

    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openForm = this.openForm.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderModal = this.renderModal.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
      if (this.props.loggedIn) {
        return (
            <div id="nav-button-container">
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
            <div id="nav-button-container">
              <button
                id="nav-bar-signup"
                onClick={() => this.openForm("signup")}>
                Sign Up
              </button>
              <button
                id="nav-bar-login"
                onClick={() => this.openForm("login")}>
                Log In
              </button>
            </div>
        );
      }
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  closeModal() {
    this.setState({
      modalOpen: false,
      currentForm: ""
    });
  }

  openForm(type) {
    this.setState({
      currentForm: type,
      modalOpen: true
    })
  }

  renderForm() {
    const { currentForm } = this.state;
    if (currentForm === "signup") return <SignupFormContainer />;
    if (currentForm === "login") return <LoginFormContainer />;
  }

  renderModal() {
    if (this.state.modalOpen) {
      return (
        <div
          id="nav-modal-left-wrapper">
            <div
              id="nav-modal-left-container">
                {this.renderForm()}
            </div>
          <div 
            id="nav-modal-left-block"
            onClick={() => this.closeModal()}>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div id="nav-bar-wrapper">
        <div id="nav-bar-container">
          <button
            id="nav-bar-burger"
            onClick={() => this.openModal()}>
            <i className="fa-solid fa-bars"></i>
          </button>
          { this.getLinks() }
        </div>
        { this.renderModal() }
      </div>
    );
  }
}

export default NavBar;