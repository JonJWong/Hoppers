import React from "react";
import ThreadIndexItem from "./thread_index_item";

class ThreadIndex extends React.Component{

  renderThreads(){
    
  }

  render(){
    const {threads} = this.props;
    return(
      <div className="thread-index">
        I am the thread index for a single event. I contain all threads for an event
        <br />
        {threads.map(thread => (
          <ThreadIndexItem key={thread._id} thread={thread} />
        ))}
      </div>
    );
  };
};

export default ThreadIndex;