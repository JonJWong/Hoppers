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
    this.modalLogout = this.modalLogout.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
    this.changeForm = this.changeForm.bind(this);
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
                onClick={() => this.openModal("signup")}>
                  Sign Up
              </button>
              <button
                id="nav-bar-login"
                onClick={() => this.openModal("login")}>
                  Log In
              </button>
            </div>
        );
      }
  }

  openModal(form) {
    form ||= "login";
    this.setState({
      modalOpen: true,
      currentForm: form
    });
    setTimeout(() => {
      const modal = document.querySelector(".nav-modal-left-container");
      modal.classList.add("modal-open")
    }, 10)
  }

  closeModal() {
    const modal = document.querySelector(".nav-modal-left-container");
    modal.classList.remove("modal-open")
    modal.addEventListener("transitionend", () => {
      this.setState({
        modalOpen: false,
        currentForm: ""
      });
    })
  }

  modalLogout() {
    setTimeout(() => {
      this.props.logout();
    }, 700)
    this.closeModal();
  }

  demoLogin() {
    setTimeout(() => {
      const { login } = this.props;
      login({
        username: "coolguy123",
        password: "hoppers123"
      })
    }, 500)
    this.closeModal();
  }

  changeForm(type) {
    this.setState({ currentForm: type })
  }

  renderForm() {
    if (!this.props.loggedIn) {
      const { currentForm } = this.state;
      if (currentForm === "signup") {
        return <SignupFormContainer
          change={this.changeForm}
          demoLogin={this.demoLogin} />;
      }
      if (currentForm === "login") {
        return <LoginFormContainer
          change={this.changeForm}
          demoLogin={this.demoLogin} />;
      }
    } else {
      return (
        <button
          id="nav-modal-signout"
          onClick={this.modalLogout}>
            Sign Out
        </button>
      )
    }
  }

  renderModal() {
    if (this.state.modalOpen) {
      return (
        <div
          id="nav-modal-left-wrapper">
            <div
              className="nav-modal-left-container">
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