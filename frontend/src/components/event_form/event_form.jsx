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

  deletePoi(i, e) {
    e.preventDefault();
    let markers = this.state.markers;
    markers.splice(i, 1);
    this.setState({ markers: markers })
  }

  renderPoiInputs() {
    return this.state.markers.map((marker, i) => {
      const { lat, lng } = marker;
      return (
        <div className="create-form-marker-input" key={marker + i}>
          <div className="poi-name">Name</div>
          <input
            type="text"
            onChange={(e) => this.updatePoi(i, "name", marker, e)}
            placeholder={`Point of Interest ${i + 1} name`}/>
          <div className="poi-start">Start Time</div>
          <input
            type="text"
            onChange={(e) => this.updatePoi(i, "startTime", marker, e)}
            placeholder={`Point of Interest ${i + 1} start time`}/>
          <div className="poi-end">End Time</div>
          <input
            type="text"
            onChange={(e) => this.updatePoi(i, "endTime", marker, e)}
            placeholder={`Point of Interest ${i + 1} end time`}/>
          <div className="poi-description">Description</div>
          <input
            type="text"
            onChange={(e) => this.updatePoi(i, "description", marker, e)}
            placeholder={`Point of Interest ${i + 1} description`}/>
          <button
            onClick={e => {this.deletePoi(i, e)}}
            className="poi-delete"><i className="fa-solid fa-x"></i></button>
        </div>
      )
    })
  }

  render(){  
    return( 
    <div id="create-form-wrapper">
      <h5 id="create-form-header">{this.props.formType}</h5>
      <form
        id="create-form-container"
        onSubmit ={this.handleSubmit}>

        <div id="create-form-fields">
          <div id="create-form-name-wrapper">
            <div id="create-form-name">Name</div>
              <input
                type="text"
                value={this.state.name}
                onChange={this.update("name")}
                placeholder="Event Name"
              />
          </div>
          
          <div id="create-form-description-wrapper">
            <div id="create-form-description">Description</div>
              <textarea
              value={this.state.description}
              onChange={this.update("description")}
              /> 
          </div>
          
          <div id="create-form-start-wrapper">
            <div id ="create-form-start-time">Start Time</div>
              <input 
                type="datetime-local"
                value={this.state.startTime}
                onChange={this.update("startTime")}
              />
          </div>
          
          <div id="create-form-start-date-wrapper">
            <div id ="create-form-start-date">End Time</div>
              <input 
                type="datetime-local"
                value={this.state.endTime}
                onChange = {this.update("endTime")}
              />
          </div>
        </div>

      <FunctionalMap event={this.state} accept={this.accept} />

        <div id="poi-input-list">
          {this.renderPoiInputs()}
        </div>

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