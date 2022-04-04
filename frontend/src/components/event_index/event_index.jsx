import React from "react";

class EventIndex extends React.Component{
  // constructor(props){
  //   super(props);
  // }

  componentDidMount(){
    this.props.fetchEvents();
  }

  renderEvents(){
    if (Object.values(this.props.allEvents).length === 0 ){
      return <span>No Events in the DB Yet :(</span>
    }
    return(
      <ul className="event-list">
        {Object.values(this.props.allEvents)?.map(event => (
          <div key={event.id} className="event-index-item">
            <div>I am an event index item</div>
            <div>Name: {event.name}</div>
            <div>Description: {event.description}</div>
            <div>Start Time: {event.startTime}</div>
          </div>
        ))}
      </ul>
    )
  }

  render(){
    return(
      <div className="event-index-container">
        {this.renderEvents()}
      </div>
    )
  }
};

export default EventIndex;