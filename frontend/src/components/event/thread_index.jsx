import React from "react";
import ThreadIndexItem from "./thread_index_item";
import CreateThreadContainer from "../thread_form/create_thread_container";

class ThreadIndex extends React.Component{
  render(){
    // Only render create button if owner.
    const createThread = this.props.editCapability ? <CreateThreadContainer event = {this.props.event}/>
    : null

    const {threads} = this.props;
    if(!threads) return null
    return(
      <div className="thread-index">
        <div>
          <h3 className="thread-index-title">Conversation Threads</h3>
          <div className="add-thread-button" >
            <i className="fa-solid fa-plus"></i>
          </div>
        </div>
        
          {createThread}
        <div className="thread-list-container">
          {threads.map((thread,idx) => (
            <ThreadIndexItem key={`${thread._id}+${idx}`} thread={thread} 
            deleteThread = {this.props.deleteThread}
            editCapability = {this.props.editCapability}
            event = {this.props.event}
            />
          ))}
        </div>
      </div>
    );
  };
};

export default ThreadIndex;