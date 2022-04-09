import React from "react";
import { withRouter, Link } from "react-router-dom";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  // Once the user has been authenticated, redirect to the Tweets page.
  // N.B. Hitting the login endpoint is the only way to get authenticated in this app.
  
  
  // Handle field updates (called in the render method)
  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    let user = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.login(user); 
  }

  demoLogin() {
    const demo = {
      username: "coolguy123",
      password: "hoppers123"
    }

    this.props.login(demo)
  }

  // Render the session errors if there are any
  renderErrors() {
    return(
      <ul className="error-messages">
        {Object.keys(this.props.errors).map((error, i) => (
          <li className = "form-error" key={`error-${i}`}>
            {this.props.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div id="login-page-wrapper">
        <h2 id="login-page-header">Log In</h2>
        <form onSubmit={this.handleSubmit}>
          <div id="login-page-inputs">
              <input type="text"
                value={this.state.username}
                onChange={this.update("username")}
                placeholder="Username"
              />
              <input type="password"
                value={this.state.password}
                onChange={this.update("password")}
                placeholder="Password"
              />
            <input type="submit" value="Submit" />
          </div>
        </form>
        
        {this.renderErrors()}

        <div id="demo-login-container">
          <h4 id="demo-login-header">Don't want to Log In?</h4>
          <div id="login-page-buttons">
            <button
              id="login-page-demo-login-button"
              onClick={() => this.demoLogin()}>
              Demo Login
            </button>
            <Link
              to="/signup">
              <button
                onClick={() => this.props.removeSessionErrors()}
                id="login-page-bottom-signup-button">
                  Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginPage);