import React from "react";
import { withRouter } from "react-router-dom";

class LoginForm extends React.Component {
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

  // Render the session errors if there are any
  renderErrors() {
    return(
      <ul className="error-messages">
        {Object.keys(this.props.errors).map((error, i) => (
          <li className = "form-error "key={`error-${i}`}>
            {this.props.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div id="login-form-wrapper">
        <h2 id="login-form-header">Log In</h2>
        <form onSubmit={this.handleSubmit}>
          <div id="login-form-inputs">
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
          <h4 id="demo-login-header">Don"t want to Log In?</h4>
          <div id="demo-login-buttons">
            <button
              id="login-demo-login-button"
              onClick={() => this.props.demoLogin()}>
              Demo Login
            </button>
            <button
              id="login-bottom-signup-button"
              onClick={() =>this.props.change("signup")}>
                Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);