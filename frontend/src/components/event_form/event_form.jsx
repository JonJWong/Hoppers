import React from 'react'
import FunctionalMap from '../map/functional_map';

class EventForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      PointsOfInterest: [],
      markers: [],
      owner: this.props.ownerId
    }

    this.accept = this.accept.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.update = this.update.bind(this)
  }

  update(field) {
    return (e) => {this.setState({[field]: e.currentTarget.value})}
  }

  updatePoi(index, type, marker, e) {
    e.preventDefault();
    const points = this.state.PointsOfInterest;
    const { lat, lng } = marker;
    const newPoint = {
      startTime: points[index]?.startTime,
      endTime: points[index]?.endTime,
      location: { lat: lat, lng: lng },
      name: points[index]?.name,
      description: points[index]?.description
    }

    newPoint[type] = e.currentTarget.value;

    points[index] = newPoint;

    this.setState({ PointsOfInterest: points });
    console.log(this.state.PointsOfInterest)
  }
  
  handleSubmit(e) {
    e.preventDefault();
    let that = this; 
    // Create new Event and then push to the Event's page.
    this.props.action(this.state).then(function(event){
      return that.props.history.push(`/events/`)
    });
  }

  // helper to take in markers from map
  accept(key, value) {
    this.setState({ [key]: value })
  }

  renderPoiInputs() {
    return this.state.markers.map((marker, i) => {
      const { lat, lng } = marker;
      return (
        <div className="create-form-marker-input" key={marker + i}>
          <input
            type="text"
            onChange={(e) => this.updatePoi(i, "name", marker, e)}
            placeholder={`Point of Interest ${i + 1} name`}/>
          <input
            type="text"
            onChange={(e) => this.updatePoi(i, "startTime", marker, e)}
            placeholder={`Point of Interest ${i + 1} start time`}/>
          <input
            type="text"
            onChange={(e) => this.updatePoi(i, "endTime", marker, e)}
            placeholder={`Point of Interest ${i + 1} end time`}/>
          <input
            type="text"
            onChange={(e) => this.updatePoi(i, "description", marker, e)}
            placeholder={`Point of Interest ${i + 1} description`}/>
        </div>
      )
    })
  }

  render(){  
    return( 
    <div>
      <h5>{this.props.formType}</h5>
      <form onSubmit ={this.handleSubmit}>

        <span id="create-form-name">Name:</span>
        <input
          type = "text"
          value = {this.state.name}
          onChange = {this.update("name")}
        />

        <span id="create-form-description">Description </span>
          <input 
          type = "text"
          value = {this.state.description}
          onChange = {this.update("description")}
          /> 

        <span id ="create-form-start-time"> Start Time </span>
        <input 
          type="datetime-local"
          value = {this.state.startTime}
          onChange = {this.update("startTime")}
        />

        <span id ="create-form-start-date"> End Time </span>
        <input 
          type="datetime-local"
          value = {this.state.endTime}
          onChange = {this.update("endTime")}
        />

        <FunctionalMap event={this.state} accept={this.accept} />

        {this.renderPoiInputs()}

        <button
          type="Submit"
          id="create-form-submit">
            Create Event
        </button>
      </form>
    </div>
    )
  }
}

export default EventForm