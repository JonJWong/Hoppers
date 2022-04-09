import React from "react";
import ThreadIndexItem from "./thread_index_item";
import CreateThreadContainer from "../thread_form/create_thread_container";

class ThreadIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addThread: false,
      confirmationMessage: ""
    }
    this.toggleCreateThread = this.toggleCreateThread.bind(this)
    this.updateConfirmationMessage = this.updateConfirmationMessage.bind(this)
  }

  componentWillUnmount() {
    clearTimeout(this.clearTimeout);
  }

  toggleCreateThread() {
    this.setState({ addThread: !this.state.addThread });
    this.setState({ confirmationMessage: "" });
    this.props.removeThreadErrors();
  }

  updateConfirmationMessage(message) {
    this.setState({ confirmationMessage: message });
    this.clearTimeout = setTimeout(() => {
      this.setState({ confirmationMessage: "" });
    }, 3000);
  }

  render() {
    const { threads } = this.props;
    if (!threads) return null
    return (
      <div className="thread-index">
        <div className="thread-title-container">
          <h3 className="thread-index-title">Conversation Threads</h3>
          <div className="add-thread-button" onClick={() => this.toggleCreateThread()}>
            <i className="fa-solid fa-square-plus"></i>
          </div>
          <p className="confirmation-message" onClick={() => this.updateConfirmationMessage("")}>
            {this.state.confirmationMessage}
          </p>
        </div>
          <CreateThreadContainer 
            event={this.props.event} 
            updateConfirmationMessage={this.updateConfirmationMessage}
            addThread={this.state.addThread}
          />
        <div className="thread-list-container">
          {threads.length === 0 ? ( <div>Start a conversation to get the party started! 🥳 Click the (+) above</div> ): null}
          {threads.map((thread,idx) => (
            <ThreadIndexItem key={`${thread._id}+${idx}`} thread={thread} 
              deleteThread = {this.props.deleteThread}
              editCapability = {this.props.editCapability}
              event = {this.props.event}
              updateConfirmationMessage={this.updateConfirmationMessage}
            />
          ))}
        </div>
      </div>
    );
  };
};

export default ThreadIndex;