import React from "react";
import CommentIndex from "./comment_index";

class ThreadIndexItem extends React.Component{

  render(){
    const {thread} = this.props
    return(
      <div className="thread-index-item">
        <h4>Thread name: {thread.name}</h4>
        <div className="comment-index">
          <CommentIndex comments={thread.comments} />
        </div>
      </div>
    )
  }
};

export default ThreadIndexItem;