import React from "react";
import ThreadIndexItem from "./thread_index_item";

class ThreadIndex extends React.Component{
  render(){
    const {threads} = this.props;
    if(!threads) return null
    return(
      <div className="thread-index">
        <h3 className="thread-index-title">Conversation Threads</h3>
        <div className="thread-list-container">
          {threads.map((thread,idx) => (
            <ThreadIndexItem key={`${thread._id}+${idx}`} thread={thread} />
          ))}
        </div>
      </div>
    );
  };
};

export default ThreadIndex;