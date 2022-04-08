import React from "react";

class Inbox extends React.Component {
  render() {
    return (
      <div id="inbox-wrapper">
        <div id="inbox-container">
          <h3 id="inbox-title">Hello, {this.props.user.username}!</h3>

          <div id="inbox-message-wrapper">
            <div id="inbox-message-title">Your Messages:</div>
            <div id="inbox-message-container">
              Messages and Invites are coming soon!
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Inbox;