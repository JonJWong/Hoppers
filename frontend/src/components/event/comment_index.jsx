import React from "react";
import CommentIndexItem from "./comment_index_item";
import CreateCommentFormContainer from "../comment_form/create_comment_form_container";

class CommentIndex extends React.Component{
  render(){
    const {comments} = this.props;
    if(!comments) {
      return null
    }
    return(
      <div className="comment-index">
        {Object.values(comments).map(comment => (
          <CommentIndexItem 
            key={comment._id} 
            comment={comment} 
            threadId={this.props.threadId}
            currentUserUsername={this.props.currentUserUsername}
            deleteComment={this.props.deleteComment}
          />
        ))}
        <CreateCommentFormContainer threadId={this.props.threadId}/>
      </div>  
    )
  }
};

export default CommentIndex;