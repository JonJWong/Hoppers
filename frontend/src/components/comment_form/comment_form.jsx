import React from "react";

class CommentForm extends React.Component{
  constructor(props){
    super(props)
    this.state = this.props.comment;
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
    if (this.state.body === '') {
      return
    }
    this.props.action(this.props.threadId, this.state)
    this.setState({body: ""})
  }

  commentEnterSubmit = (e) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      this.handleSubmit(e)
    }
  }

  update(field){
    return e => this.setState({[field]: e.currentTarget.value})
  }

  render(){
    const {formType} = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <h4>{formType}</h4>
        <textarea 
          placeholder={`What's on your mind, ${this.props.comment.username}?`} 
          onKeyPress={ this.commentEnterSubmit} 
          className="comment-input" 
          value={this.state.body} 
          onChange={this.update("body")}  
        />
        <input className="comment-submit" type="button" name="go" value="Submit" />
      </form>
    )
  }
};

export default CommentForm;