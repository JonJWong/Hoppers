import React from "react";

class EventIndex extends React.Component{
  // constructor(props){
  //   super(props);
  // }

  componentDidMount(){
    this.props.fetchEvents();
  }

  render(){
    return(
      <div className="event-index-container">
        I am the EventIndex Component
      </div>
    )
  }
};

export default EventIndex;