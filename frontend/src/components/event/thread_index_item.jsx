import React from "react";

class ThreadIndexItem extends React.Component{

  render(){
    const {thread} = this.props
    return(
      <div className="thread-index-item">
        I am a thread.
        <br />
        the name of this thread is: {thread.name}
        <br />
        This thread will be able to display all of the comments within.
      </div>
    )
  }
};

export default ThreadIndexItem;