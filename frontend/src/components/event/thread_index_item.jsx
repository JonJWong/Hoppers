import React from "react";
import CommentIndex from "./comment_index.jsx";

class ThreadIndexItem extends React.Component{

  render(){
    let deleteButton = this.props.editCapability ? 
      <button id ="button-delete" onClick={() => this.props.deleteThread(thread._id)}>Delete</button> 
      : null 

    const {thread} = this.props
    return(
      <div className="thread-index-item">
        <div className="thread-header-container">
          <h3 className="thread-title">{thread.name}</h3>
          <div> collapse icon</div>
          {deleteButton}
        </div>
        <div className="comment-index">
          <CommentIndex comments={thread.comments} />
        </div>
      </div>
    )
  }
};

export default ThreadIndexItem;