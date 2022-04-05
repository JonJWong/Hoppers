import React from "react";

class CommentIndexItem extends React.Component{

  render(){
    const {comment} = this.props;
    return(
      <div className="comment-box">
        <div><span className="comment-username">{comment.username}:</span> {comment.body}</div>
      </div>
    )
  }
};

export default CommentIndexItem;