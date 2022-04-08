import React from "react";
// import CommentIndex from "./comment_index.jsx";
import CommentIndexContainer from "./comment_index_container.js";

class ThreadIndexItem extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      collapsed: false
    }
  }

  render(){
    const deleteButton = this.props.editCapability ? 
      <button 
        id ="button-delete"
        className="ht" 
        onClick={() => {
          this.props.deleteThread(thread._id)
          this.props.updateConfirmationMessage("Thread Deleted Successfully")
        }}
      >
        Delete thread
      </button> 
      : null 

    // const editForm = this.props.editCapability ? <EditThreadContainer 
    // thread = {this.props.thread}/> : null
    
    const {thread} = this.props
    return(
      <div className="thread-index-item">
        <div className="thread-header-container">
          <div className="collapse-thread"> 
            <h3 
              className={this.state.collapsed ? "thread-title collapsed" : "thread-title"}
              onClick={() => this.setState({collapsed: !this.state.collapsed}) }
            >
              {thread.name}&nbsp;
            </h3>
          </div>
          {deleteButton}
        </div>
        <div className="comment-index">
          <CommentIndexContainer 
            threadId={thread._id} 
            comments={thread.comments} 
            event={this.props.event} 
            collapsed={this.state.collapsed}
          />
        </div>
      </div>
    )
  }
};

export default ThreadIndexItem;