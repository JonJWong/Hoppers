import React from "react";
// import CommentIndex from "./comment_index.jsx";
import CommentIndexContainer from "./comment_index_container.js";
import EditThreadContainer from "../thread_form/edit_thread_container.js";

class ThreadIndexItem extends React.Component{

  render(){
    const deleteButton = this.props.editCapability ? 
      <button id ="button-delete" onClick={() => this.props.deleteThread(thread._id)}>Delete</button> 
      : null 

    const editForm = this.props.editCapability ? <EditThreadContainer 
    thread = {this.props.thread}/> : null
    
    const {thread} = this.props
    return(
      <div className="thread-index-item">
        <div className="thread-header-container">
          <h3 className="thread-title">{thread.name}</h3>
          <div> collapse icon</div>
          {deleteButton}
          {editForm}
        </div>
        <div className="comment-index">
          <CommentIndexContainer threadId={thread._id} comments={thread.comments} />
        </div>
      </div>
    )
  }
};

export default ThreadIndexItem;