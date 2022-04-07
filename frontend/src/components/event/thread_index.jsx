import React from "react";
import ThreadIndexItem from "./thread_index_item";
import CreateThreadContainer from "../thread_form/create_thread_container";

class ThreadIndex extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      addThread: false
    }
    this.toggleCreateThread = this.toggleCreateThread.bind(this)
  }

  toggleCreateThread(){
    this.setState({addThread: !this.state.addThread})
    this.props.removeThreadErrors()
  }

  render(){
    const {threads} = this.props;
    if(!threads) return null
    return(
      <div className="thread-index">
        <div className="thread-title-container">
          <h3 className="thread-index-title">Conversation Threads</h3>
          {this.props.editCapability ? (
            <div className="add-thread-button" onClick={() => this.toggleCreateThread()}>
              <i className="fa-solid fa-square-plus"></i>
            </div>
          ):(
            null
          )}
        </div>
        { this.state.addThread ? (
          <CreateThreadContainer event = {this.props.event}/>
        ) :(
          null
        )}
        <div className="thread-list-container">
          {threads.map((thread,idx) => (
            <ThreadIndexItem key={`${thread._id}+${idx}`} thread={thread} 
            deleteThread = {this.props.deleteThread}
            editCapability = {this.props.editCapability}
            event = {this.props.event}
            />
          ))}
        </div>
      </div>
    );
  };
};

export default ThreadIndex;