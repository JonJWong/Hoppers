import React from "react";
import autosize from 'autosize';

class CommentForm extends React.Component{
  constructor(props){
    super(props)
    this.state = this.props.comment;
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    autosize(this.textarea);
 }

  handleSubmit(e){
    e.preventDefault()
    if (this.state.body === '') {
      return
    }
    if (this.props.formType === "Add a Comment") {
      this.props.action(this.props.threadId, this.state)
    } else {
      this.props.action(this.props.threadId, this.props.commentId ,this.state)
    }
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
    return (
      <form onSubmit={this.handleSubmit} className="comment-form">
        <p className="comment-body-p">
          <textarea
          className="comment-input"
          onChange={this.update("body")}
          value={this.state.body}    
          ref={c=>this.textarea=c}
          placeholder={`What's on your mind, ${this.props.comment.username}?`}
          onKeyPress={ this.commentEnterSubmit}  
          rows={1}/>
        </p>
        <input className="comment-submit" type="button" name="go" value="Submit" />
      </form>
    )
  }
};

export default CommentForm;