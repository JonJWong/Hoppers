import React from "react";

class AttendeeIndex extends React.Component{
  render(){
    const{attendees} = this.props;
    return(
      <div className="attendee-list">
        <h3>Attendee List</h3>
        {attendees.map(person => (
          <div key={person.username}>
            {person.username}
          </div>
        ))}
      </div>
    )
  }
};

export default AttendeeIndex;