import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  // TODO: the demo code wanted to redirect to the login page after registering?
  // Probably so that the user would then be prompted to login
  componentDidUpdate(){
    if(this.props.signedIn){
      this.props.history.replace('/login');
    }
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.signup(user, this.props.history); 
  }

  demoLogin() {
    const user = {
      username: "coolguy123",
      password: "hoppers123"
    }

    this.props.login(user)
  }

  renderErrors() {
    return(
      <ul className="error-messages">
        {Object.keys(this.props.errors).map((error, i) => (
          <li className="form-error" key={`error-${i}`}>
            {this.props.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div id="signup-page-wrapper">
        <h2 id="signup-page-header">Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <div id="signup-page-inputs">
              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
                placeholder="Email"
              />
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                placeholder="Username"
              />
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                placeholder="Password"
              />
              <input type="password"
                value={this.state.password2}
                onChange={this.update('password2')}
                placeholder="Confirm Password"
              />
            <input type="submit" value="Submit" />
          </div>
        </form>
        
        {this.renderErrors()}

        <div id="demo-signup-container">
          <h4 id="demo-signup-header">Don't want to Sign Up?</h4>
          <div id="signup-page-buttons">
            <button
              id="signup-page-demo-login-button"
              onClick={() => this.demoLogin()}>
              Demo Login
            </button>
            <Link
              to="/login">
              <button
                onClick={() => this.props.removeSessionErrors()}
                id="signup-page-bottom-login-button">
                  Log In
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupPage);