import React from "react";
import CommentIndexItem from "./comment_index_item";

class CommentIndex extends React.Component{
  render(){
    const {comments} = this.props;
    return(
      <div className="comment-index">
        Here is a list of comments:
        {Object.values(comments).map(comment => (
          <CommentIndexItem key={comment._id} comment={comment} />
        ))}
      </div>  
    )
  }
};

export default CommentIndex;