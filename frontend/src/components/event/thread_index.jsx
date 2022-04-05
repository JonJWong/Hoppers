import React from "react";
import ThreadIndexItem from "./thread_index_item";

class ThreadIndex extends React.Component{

  renderThreads(){
    const {threads} = this.props;
    if ((threads.length === 0) || (typeof threads[0] === "string")){
      return null
    } else {
      return (
        threads.map((thread,idx) => (
          <ThreadIndexItem key={`${thread._id}+${idx}`} thread={thread} />
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
          {this.renderThreads()}
        </div>
      </div>
    );
  };
};

export default ThreadIndex;