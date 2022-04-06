import React from "react";
import EventIndexItem from "./event_index_item";

class EventIndex extends React.Component{
  componentDidMount(){
    this.props.fetchEvents();
  }

  renderEvents(){
    if (Object.values(this.props.allEvents).length === 0 ){
      return null
    }
    return(
      <ul className="event-list">
        {this.props.allEvents?.map(event => (
          <EventIndexItem key={event._id} event={event} />
        ))}
      </ul>
    )
  }

  render(){
    return(
      <div className="event-page-container"> 
        <div className="event-index-container">
          {this.renderEvents()}
        </div>
      </div>
    )
  }
};

export default EventIndex;