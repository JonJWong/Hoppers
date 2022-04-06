import React from "react";

class AttendeeIndex extends React.Component{
  render(){
    const {attendees} = this.props;
    if(!attendees){
      return null
    }
    return(
      <div className="attendee-list">
        <h3>Attendee List</h3>
        <div className="attendee-list-container">
          {attendees.map(person => (
            <div key={person.username}>
              {person.username}
            </div>
          ))}
        </div>
      </div>
    )
  }
};

export default AttendeeIndex;