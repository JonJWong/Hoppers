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

class EditEventForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.props.event;

    this.accept = this.accept.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.getPois = this.getPois.bind(this);
  }

  // fetch event and then set the state, if you are not the owner and somehow
  // stumble on the edit URL, redirect back to events page
  componentDidMount() {
    this.props.fetchEvent(this.props.match.params.eventId)
      .then(action => {
        const event = action.event.data;
        this.props.ownerId === event.owner._id
          ? this.setState(event)
          : this.props.history.replace("/events")
      })
  }

  // helper to change slices of state
  update(field, e) {
    this.setState({[field]: e.currentTarget.value})
  }

  // helper to key into a specific point of interest, and change 1 field
  updatePoi(e, i, point, field) {
    e.preventDefault();

    const points = this.state.PointsOfInterest;
    const newPoint = point;
    newPoint[field] = e.currentTarget.value;
    points[i] = newPoint;

    this.setState({ PointsOfInterest: points });
  }

  // helper to be passed into map to adjust poi edits being displayed
  getPois() {
    return this.state.PointsOfInterest
  }
  
  // function to submit form contents to backend
  handleSubmit(e) {
    e.preventDefault();

    // deconstruct state
    let { _id, startTime, endTime, name, description, PointsOfInterest } = this.state;

    // adjust times to be UTC so it's standardized with heroku server
    startTime = new Date(startTime).toUTCString();
    endTime = new Date(endTime).toUTCString();
    PointsOfInterest = PointsOfInterest.map(point => {
      point.startTime = new Date(point.startTime).toUTCString();
      point.endTime = new Date(point.endTime).toUTCString();
      return point;
    });

    // reconstruct an event from modified state vars above
    const event = {
      _id: _id,
      startTime: startTime,
      endTime: endTime,
      name: name,
      description: description,
      PointsOfInterest: PointsOfInterest
    };

    // Create new event and redirect to events page if successful
    this.props.updateEvent(event).then((response) => {
      if (response.type === "RECEIVE_EVENT_ERRORS") {
        return
      }
      return this.props.history.replace(`/events`)
    });
  }

  // helper to take in markers from map
  accept(key, value) {
    this.setState({ [key]: value })
  }

  // helper to delete a point of interest
  // deprecated, was used for X button before
  deletePoi(i, e) {
    e.preventDefault();
    let points = this.state.PointsOfInterest;
    points.splice(i, 1);
    this.setState({ PointsOfInterest: points });
  }

  // helper to render input fields for each poi present in state
  renderPoiInputs() {
    let points = this.state.PointsOfInterest;
    return points.map((point, i) => {
      // Determine if errors should show on pois
      let descriptionLabel = this.props?.errors[i + 1]?.includes('Description is required') 
      ? <div className="poi-error">Description is required</div> 
      : <div id="poi-description">Description</div>

    let nameLabel = this.props?.errors[i + 1]?.includes('Name is required') 
      ? <div className="poi-error">Name is required</div> 
      : <div id="poi-name">Name</div>
    
    let startTimeLabel = this.props?.errors[i + 1]?.includes('Invalid start time') 
      ? <div className="poi-error">Invalid start time</div>
      : this.props?.errors[i + 1]?.includes('Before previous start time')
      ? <div className="poi-error">Premature start time</div>
      : <div id="poi-start">Start Time</div>
    
    let endTimeLabel = this.props?.errors[i + 1]?.includes('Invalid end time') 
      ? <div className="poi-error">Invalid end time</div> 
      : this.props?.errors[i + 1]?.includes('End time before start')
      ? <div className="poi-error">End time before start</div>
      : <div id="poi-end">End Time</div>

      return (
        <div className="create-form-marker-input" key={`${i} + ${point.location.lat}`}>
          {nameLabel}
          <input
            type="text"
            onChange={(e) => this.updatePoi(e, i, point, "name")}
            value={point.name}
            placeholder={`Point ${i + 1} name`}/>

          {startTimeLabel}
          <input
            type="datetime-local"
            onChange={(e) => this.updatePoi(e, i, point, "startTime")}
            min={formatTime(new Date())}
            value={formatTime(point.startTime)}/>

          {endTimeLabel}
          <input
            type="datetime-local"
            onChange={(e) => this.updatePoi(e, i, point, "endTime")}
            min={formatTime(point.startTime)}
            value={formatTime(point.endTime)}/>

          {descriptionLabel}
          <input
            type="text"
            onChange={(e) => this.updatePoi(e, i, point, "description")}
            value={point.description}
            placeholder={`Point ${i + 1} description`}/>
        </div>
      )
    })
  }

  render() {
    // setting vars for the error text to replace the form labels
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

    // return nothing to avoid errors on initial load
    if (!this.state) {
      return (
        <>
        </>
      )
    }
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
                value={formatTime(this.state.startTime)}
                min={formatTime(new Date())}
                onChange={(e) => this.update("startTime", e)}
              />
          </div>
          
          <div id="create-form-end-time-wrapper">
            {endTimeLabel}
              <input 
                type="datetime-local"
                value={formatTime(this.state.endTime)}
                min={formatTime(this.state.startTime)}
                onChange={(e) => this.update("endTime", e)}
              />
          </div>
          {poiLabel}
        </div>
      {this.state ? (
        <FunctionalMap event={this.state} accept={this.accept}
          removePoiErrors = {this.props.removePoiErrors}
          getPois={this.getPois}
        />
      ) : (
        null
      )}

        <div id="poi-input-list">
          {this.renderPoiInputs()}
        </div>

        <button
          type="Submit"
          id="create-form-submit">
            Submit Changes
        </button>
      </form>
    </div>
    )
  }
}

export default EditEventForm