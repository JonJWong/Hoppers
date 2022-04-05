import React from "react";
import ThreadIndexItem from "./thread_index_item";

class ThreadIndex extends React.Component{

  renderThreads(){
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
    const {threads} = this.props;
    return(
      <div className="thread-index">
        <h3>Conversation Threads</h3>
        <div className="thread-list-container">
          {threads.map((thread,idx) => (
            <ThreadIndexItem key={thread._id} thread={thread} />
          ))}
        </div>
      </div>
    );
  };
};

export default ThreadIndex;