import React from "react";
// import CommentIndex from "./comment_index.jsx";
import CommentIndexContainer from "./comment_index_container.js";

class ThreadIndexItem extends React.Component{

  render(){
    const {thread} = this.props
    return(
      <div className="thread-index-item">
        <div className="thread-header-container">
          <h3 className="thread-title">{thread.name}</h3>
          <div> collapse icon</div>
        </div>
        <div className="comment-index">
          <CommentIndexContainer threadId={thread._id} comments={thread.comments} />
        </div>
      </div>
    )
  }
};

export default ThreadIndexItem;