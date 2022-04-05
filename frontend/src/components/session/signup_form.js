import React from 'react';
import { withRouter } from 'react-router-dom';

class SignupForm extends React.Component {
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
      this.props.history.push('/login');
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

  renderErrors() {
    return(
      <ul>
        {Object.keys(this.props.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.props.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div id="signup-form-wrapper">
        <h2 id="signup-form-header">Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <div id="signup-form-inputs">
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
          <div id="demo-signup-buttons">
            <button
              id="signup-demo-signup-button"
              onClick={() => {
              this.props.login({
                username: "coolguy123",
                password: "hoppers123"
              })
            }}>
              Demo Login
            </button>
            <button
              id="signup-bottom-login-button"
              onClick={() => this.props.change("login")}>
                Log In
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);