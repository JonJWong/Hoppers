import React from "react";
import FunctionalMap from "../map/functional_map";

const formatTime = (dateString) => {
  const d = new Date(dateString);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();
  let hour = '' + d.getHours();
  let min = '' + d.getMinutes();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  if (hour.length < 2) hour = '0' + hour;
  if (min.length < 2) min = '0' + min;
  return [year, month, day].join('-')+'T'+[hour,min].join(':');
}

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      startTime: formatTime(new Date()),
      endTime: formatTime(new Date()),
      PointsOfInterest: [],
      owner: this.props.ownerId
    }

    this.getPois = this.getPois.bind(this);
    this.accept = this.accept.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  // helper to update slice of state when a form field changes
  update(field, e) {
    this.setState({[field]: e.currentTarget.value})
  }

  // helper to pass down to map to get current state for pois
  getPois() {
    return this.state.PointsOfInterest
  }

  // helper to key into a specific point of interest to change one field
  updatePoi(e, i, point, field) {
    e.preventDefault();

    const points = this.state.PointsOfInterest;
    const newPoint = point;
    newPoint[field] = e.currentTarget.value;
    points[i] = newPoint;

    this.setState({ PointsOfInterest: points });
  }
  
  // helper to send form contents to backend
  handleSubmit(e) {
    e.preventDefault();

    // deconstruct state
    let { _id, startTime, endTime, name, description, PointsOfInterest } = this.state;

    // adjust times passed to backend to be formatted in UTC for heroku
    startTime = new Date(startTime).toUTCString();
    endTime = new Date(endTime).toUTCString();
    PointsOfInterest = PointsOfInterest.map(point => {
      point.startTime = new Date(point.startTime).toUTCString();
      point.endTime = new Date(point.endTime).toUTCString();
      return point;
    });

    // reconstruct event to pass to backend
    const event = {
      _id: _id,
      startTime: startTime,
      endTime: endTime,
      name: name,
      description: description,
      PointsOfInterest: PointsOfInterest
    };

    // Create new event and redirect to event index if successful
      this.props.createEvent(event).then((response) => {
        if (response.type === "RECEIVE_EVENT_ERRORS") {
          return
        }
        return this.props.history.replace(`/events`)
      })
  }

  // helper to allow map to set this component's state
  accept(key, value) {
    this.setState({ [key]: value })
  }

  // helper to delete a point of interest
  // deprecated, used in X button before
  deletePoi(i, e) {
    e.preventDefault();
    let points = this.state.PointsOfInterest;
    points.splice(i, 1);
    this.setState({ PointsOfInterest: points });
  }

  // helper to render form inputs for each poi present in state
  renderPoiInputs(i) {
    let points = this.state.PointsOfInterest;
    return points.map((point, i) => {
      let descriptionLabel = this.props?.errors[i + 1]?.includes('Description is required') 
      ? <div className="poi-error">Description is required</div> 
      : <div id="poi-description">Description</div>

    let nameLabel = this.props?.errors[i + 1]?.includes('Name is required') 
      ? <div className="poi-error">Name is required</div> 
      : <div id="poi-name">Name</div>
    
    let startTimeLabel = this.props?.errors[i + 1]?.includes('Invalid start time') 
      ? <div className="poi-error">Invalid start time</div>
      : <div id="poi-start">Start Time</div>
    
    let endTimeLabel = this.props?.errors[i + 1]?.includes('Invalid end time') 
      ? <div className="poi-error">Invalid end time</div> 
      : this.props?.errors[i + 1]?.includes('End time before start')
      ? <div className="poi-error">End time before start</div>
      : <div id="poi-end">End Time</div>


      return (
        <div className="create-form-marker-input" key={i}>
          {nameLabel}
          <input
            type="text"
            onChange={(e) => this.updatePoi(e, i, point, "name")}
            placeholder={`Point ${i + 1} name`}/>

          {startTimeLabel}
          <input
            type="datetime-local"
            min={formatTime(new Date())}
            onChange={(e) => this.updatePoi(e, i, point, "startTime")}/>

          {endTimeLabel}
          <input
            type="datetime-local"
            min={formatTime(new Date())}
            onChange={(e) => this.updatePoi(e, i, point, "endTime")}/>

          {descriptionLabel}
          <input
            type="text"
            onChange={(e) => this.updatePoi(e, i, point, "description")}
            placeholder={`Point ${i + 1} description`}/>
        </div>
      )
    })
  }

  render() {
    // helpers to replace form labels with errors if errors are present
    let descriptionLabel = this.props?.errors[0].includes('Description is required') 
      ? <div className="form-error">Description is required</div> 
      : <div id="create-form-description">Description</div>

    let nameLabel = this.props?.errors[0].includes('Name is required') 
      ? <div className="form-error">Name is required</div> 
      : <div id="create-form-name">Name</div>
    
    let startTimeLabel = this.props?.errors[0].includes('Start time is required') 
      ? <div className="form-error">Start time is required</div>
      : this.props?.errors[0].includes('End time before start')
      ? <div className="form-error">End time before start</div>
      : <div id="create-form-start-time">Start Time</div>
    
    let endTimeLabel = this.props?.errors[0].includes('End time is required') 
      ? <div className="form-error">End time is required</div> 
      : this.props?.errors[0].includes('End time before start')
      ? <div className="form-error">End time before start</div>
      : <div id="create-form-start-time">End Time</div>

    let poiLabel = this.props?.errors[0].includes('Must have at least 1 point of interest') 
      ? <div className="form-error">Please select at least one Point of Interest</div> 
      : <div> </div>

    return ( 
      <div id="create-form-wrapper">
        <h5 id="create-form-header">{this.props.formType}</h5>
        <form
          id="create-form-container"
          onSubmit ={this.handleSubmit}>

          <div id="create-form-fields">
            <div id="create-form-name-wrapper">
              {nameLabel}
                <input
                  type="text"
                  value={this.state.name}
                  onChange={(e) => this.update("name", e)}
                  placeholder="Event Name"
                />
            </div>
            
            <div id="create-form-description-wrapper">
              {descriptionLabel}
                <textarea
                value={this.state.description}
                onChange={(e) => this.update("description", e)}
                placeholder="Write about your event! Describe the theme, the route, what the goal is..."
                /> 
            </div>
            
            <div id="create-form-start-wrapper">
              {startTimeLabel}
                <input 
                  type="datetime-local"
                  value={this.state.startTime}
                  min={formatTime(new Date())}
                  onChange={(e) => this.update("startTime", e)}
                />
            </div>
            
            <div id="create-form-end-time-wrapper">
              {endTimeLabel}
                <input 
                  type="datetime-local"
                  value={this.state.endTime}
                  min={formatTime(new Date())}
                  onChange = {(e) => this.update("endTime", e)}
                />
            </div>
              {poiLabel}
          </div>

        <FunctionalMap event={this.state} accept={this.accept} 
          removePoiErrors = {this.props.removePoiErrors}
          getPois={this.getPois}
        />

          <div id="poi-input-list">
            {this.renderPoiInputs()}
          </div>

          <button
            type="Submit"
            id="create-form-submit">
              {this.props.formType}
          </button>
        </form>
      </div>
    )
  }
}

export default EventForm