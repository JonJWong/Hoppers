import React from 'react'



class EventForm extends React.Component{
  constructor(props){
    super(props)
    this.state = this.props.event
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(type){
    return (e) => {this.setState({[type]: e.currentTarget.value})}
  }
  
  handleSubmit(e){
    e.preventDefault();
    let that = this; 
    // Create new Event and then push to the Event's page.
    this.props.action(this.state).then(function(event){
      return that.props.history.push(`/events/`)
    });
  }

  render(){  
    return( 
    <div>
      <h5>{this.props.formType}</h5>
      <form onSubmit ={this.handleSubmit}>
        <span id="event-name">Name:</span>
        <input
        type = "text"
        value = {this.state.name}
        onChange = {this.handleChange("name")}
        />
        <br/> 
        <span id="event-description">Description </span>
          <input 
          type = "text"
          value = {this.state.description}
          onChange = {this.handleChange("description")}
          /> 
        <br/>
        <span id ="event-start-time"> Start Time </span>
        <input 
          type="datetime-local"
          value = {this.state.startTime}
          onChange = {this.handleChange("startTime")}
        />
        <span id ="event-start-date"> End Time </span>
        <input 
          type="datetime-local"
          value = {this.state.endTime}
          onChange = {this.handleChange("endTime")}
        />
        <button type="Submit"> {this.props.formType} </button>
      </form>
    </div>
    )
  }
}

export default EventForm