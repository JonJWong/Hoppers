import React from "react";

class AttendeeIndex extends React.Component{
  renderAttendees(){
    const {attendees} = this.props;
    if ((attendees.length === 0) || (typeof attendees[0] === "string")){
      return null
    } else {
      return (
        attendees.map(person => (
          <div key={person.username}>
            {person.username}
          </div>
        ))
      )
    }
  }

  render(){
    return(
      <div className="attendee-list">
        <h3>Attendee List</h3>
        {this.renderAttendees()}
      </div>
    )
  }
};

export default AttendeeIndex;