import React from "react";

class CommentForm extends React.Component{
  constructor(props){
    super(props)
    this.state = this.props.comment;
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.action(this.props.threadId, this.state)
    this.setState({body: ""})
  }

  update(field){
    return e => this.setState({[field]: e.currentTarget.value})
  }

  render(){
    const {formType} = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <h4>{formType}</h4>
        <textarea value={this.state.body} onChange={this.update("body")}/>
        <input type="submit" value={"submit"} />
      </form>
    )
  }
};

export default CommentForm;