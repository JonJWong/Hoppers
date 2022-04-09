import React from "react";
import moment from "moment";
import UpdateCommentForm from "../comment_form/update_comment_form_container";

moment.updateLocale('en', {
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s:  'seconds',
      ss: '%ss',
      m:  '1 m',
      mm: '%dm',
      h:  '1 hr',
      hh: '%dh',
      d:  '1 d',
      dd: '%dd',
      M:  '1 m',
      MM: '%dM',
      y:  '1 yr',
      yy: '%d yrs'
    }
  });

class CommentIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editForm: false
    }
  }

  render() {
    const {comment} = this.props;
    return (
      <div className="comment-box">
        <div className="comment-container">
          <div className="comment-title-container">
            <div className="comment-profile">
              <div className='circle select-none'>
                {comment.username[0].toUpperCase()}
              </div>
              <div className="comment-header">
                <span className="comment-username">{comment.username}&nbsp;·&nbsp;</span>
                <span className="time-ago"> {moment(comment.time).fromNow()}</span>
              </div>
            </div>
            <div>
              <div>
                
                {(comment.username === this.props.currentUserUsername) ? (
                  <div className="comment-tools">
                    <div className="edit-comment">
                      <div className="del-comment-button" onClick={() => this.setState({editForm: !this.state.editForm})}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </div>
                    </div>
                    <div className="delete-comment">
                      <div className="del-comment-button" onClick={() => this.props.deleteComment(this.props.threadId, comment._id)}>
                        <i className="fa-solid fa-circle-minus"></i>
                      </div>
                    </div>
                  </div>
                ):(
                  <div className="delete-comment">
                    &nbsp;  
                  </div>
                )}
              </div> 
            </div>
          </div>
          <div className="comment-body">
            {this.state.editForm ? (
              <UpdateCommentForm 
                body={comment.body} 
                commentId={comment._id}
                threadId={this.props.threadId}
              />
            ):(
              <p className="comment-body-p">
                {comment.body}
              </p>
            )}
          </div> 
        </div>
      </div>
    )
  }
};

export default CommentIndexItem;