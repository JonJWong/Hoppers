import React from 'react';
import { Link } from 'react-router-dom'
import LoginFormContainer from "../session/login_form_container";
import SignupFormContainer from "../session/signup_form_container";
import NavProfile from './nav_profile';

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
    const path = this.props.location.pathname;
    if (this.props.loggedIn) {
      return (
        <div id="nav-button-container">
          {path === "/profile" ? (
            <Link to='/events'>
              <button
                id="nav-bar-profile">
                  Events
              </button>
            </Link>
          ):(
            <Link to='/profile'>
              <button
                id="nav-bar-profile">
                  My Profile
              </button>
            </Link>
          )}
          <button
            id="nav-bar-logout"
            onClick={this.logoutUser}>
              Log Out
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
    this.props.removeSessionErrors()
    setTimeout(() => {
      const modal = document.querySelector(".nav-modal-left-container");
      modal.classList.add("modal-open")
    }, 10)
  }

  closeModal() {
    const modal = document.querySelector(".nav-modal-left-container");
    const modal_blur = document.querySelector(".nav-modal-left-block");
    modal_blur.classList.add("modal-fade")
    modal.classList.remove("modal-open")
    this.props.removeSessionErrors()
    modal.addEventListener("transitionend", () => {
      this.setState({
        modalOpen: false,
        currentForm: ""
      })
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
    this.props.removeSessionErrors();
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
        <NavProfile 
          user={this.props.user} 
          modalLogout={this.modalLogout}
          closeModal={this.closeModal}
        />
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
            className="nav-modal-left-block"
            onClick={() => this.closeModal()}>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <>
        <div id="nav-bar-wrapper">
          <div id="nav-bar-container">
            <div className='logo-container'>
              <button
                id="nav-bar-burger"
                onClick={() => this.openModal()}>
                <i className="fa-solid fa-bars"></i>
              </button>
              <Link to={this.props.loggedIn ? "/events" : "/"}>
                <div className='title select-none'>
                  <h2>Hoppers</h2>
                </div>
              </Link>
            </div>
            { this.getLinks() }
          </div>
          { this.renderModal() }
        </div>
        <div className='nav-filler'></div>
      </>
    );
  }
}

export default NavBar;