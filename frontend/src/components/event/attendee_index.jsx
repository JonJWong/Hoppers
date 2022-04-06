import React from "react";

class AttendeeIndex extends React.Component{
  render(){
    const {attendees} = this.props;
    if(!attendees){
      return null
    }
    return(
      <div className="attendee-list">
        <div className="attendee-list-container">

        <h3 className="attendee-list-title">
          Attendee List
        </h3>
      
          {attendees.map(person => (
            <div
              key={person.username}
              className="attendee-list-name">
              {person.username}
            </div>
          ))}
        </div>
      </div>
    )
  }
};

export default AttendeeIndex;