import React from "react";

class ParticipantIndex extends React.Component{
  render(){
    const{attendees} = this.props;
    return(
      <div className="attendee-list">
        I am the list of attendees
        {attendees.map(person => (
          <div key={person}>
            {person}
          </div>
        ))}
      </div>
    )
  }
};

export default ParticipantIndex;