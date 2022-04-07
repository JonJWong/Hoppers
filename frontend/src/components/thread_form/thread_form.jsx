import React from 'react'


class ThreadForm extends React.Component{
  constructor(props){
    super(props)
    this.state = this.props.thread
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(type){
    return (e) => {this.setState({[type]: e.currentTarget.value})}
  }
  
  handleSubmit(e){
    e.preventDefault();
    this.props.action(this.state)
    // Clear input if create thread 
    if(this.props.formType === "Create Thread") {this.setState({["name"]: ""})}
  }

  render(){  
    let nameLabel = this.props.errors.length > 0 ? <span className="thread-name-error">Name: Can't be blank</span> : <span id="thread-name">Name:</span>
    return( 
    <div>
      <h5>{this.props.formType}</h5>
      <form onSubmit ={this.handleSubmit}>
        {nameLabel}
        <br />
        <input
        type = "text"
        value = {this.state.name}
        onChange = {this.handleChange("name")}
        />
        <button type="Submit"> {this.props.formType} </button>
      </form>
    </div>
    )
  }
}

export default ThreadForm