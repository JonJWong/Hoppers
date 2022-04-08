import React from "react";
import CommentIndexItem from "./comment_index_item";
import CreateCommentFormContainer from "../comment_form/create_comment_form_container";

class CommentIndex extends React.Component{

  render(){
    const members = this.props.event.attendees.map(person => person.username)
    const commentForm = members.includes(this.props.currentUserUsername)
      ? <CreateCommentFormContainer threadId={this.props.threadId}/> 
      : <div className="no-comment-message">RSVP to join the conversation</div>

    const {comments} = this.props;
    if(!comments) {
      return null
    }
    return(
      <div className={this.props.collapsed ? "comment-index hidden" : "comment-index"} >
        {Object.values(comments).map(comment => (
          <CommentIndexItem 
            key={comment._id} 
            comment={comment} 
            threadId={this.props.threadId}
            currentUserUsername={this.props.currentUserUsername}
            deleteComment={this.props.deleteComment}
          />
        ))}
        {commentForm}
      </div>  
    )
  }
};

export default CommentIndex;