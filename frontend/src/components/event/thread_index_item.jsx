import React from "react";
// import CommentIndex from "./comment_index.jsx";
import CommentIndexContainer from "./comment_index_container.js";
import EditThreadContainer from "../thread_form/edit_thread_container.js";

class ThreadIndexItem extends React.Component{

  render(){
    const deleteButton = this.props.editCapability ? 
      <button 
        id ="button-delete" 
        onClick={() => {
          this.props.deleteThread(thread._id)
          this.props.updateConfirmationMessage("Thread Deleted Successfully")
        }}
      >
        Delete
      </button> 
      : null 

    const editForm = this.props.editCapability ? <EditThreadContainer 
    thread = {this.props.thread}/> : null
    
    const {thread} = this.props
    return(
      <div className="thread-index-item">
        <div className="thread-header-container">
          <div className="collapse-thread "> 
            <h3 className="thread-title">{thread.name}&nbsp;</h3>
          </div>
          {/* {deleteButton}
          {editForm} */}
        </div>
        <div className="comment-index">
          <CommentIndexContainer threadId={thread._id} comments={thread.comments} 
          event = {this.props.event} />
        </div>
      </div>
    )
  }
};

export default ThreadIndexItem;