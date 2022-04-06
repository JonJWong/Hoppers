import React from "react";
import ThreadFormContainer from "../thread_form/create_thread_container";
import CommentIndex from "./comment_index.jsx";

class ThreadIndexItem extends React.Component{

  render(){
    const {thread} = this.props
    return(
      <div className="thread-index-item">
        {ThreadFormContainer}
        <div className="thread-header-container">
          <h3 className="thread-title">{thread.name}</h3>
          <div> collapse icon</div>
        </div>
        <div className="comment-index">
          <CommentIndex comments={thread.comments} />
        </div>
      </div>
    )
  }
};

export default ThreadIndexItem;