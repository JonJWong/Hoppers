import React from "react";

class AttendeeIndex extends React.Component {
  render() {
    const {attendees} = this.props;
    if(!attendees) {
      return null
    }
    return (
      <div className="attendee-list">
        <h3 className="attendee-list-title">
          Attendee List
        </h3>
        
        <div className="attendee-list-container">
          {attendees.map((person,idx) => (
            <div
              key={idx}
              className="attendee-list-name">
              {person?.username}
            </div>
          ))}
        </div>
      </div>
    )
  }
};

export default AttendeeIndex;