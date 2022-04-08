import React from 'react'
import FunctionalMap from '../map/functional_map';

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

class EditEventForm extends React.Component{
  constructor(props){
    super(props)
    this.state = this.props.event;

    this.accept = this.accept.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.update = this.update.bind(this)
    this.renderPoiError = this.renderPoiError.bind(this)

  }

  componentDidMount() {
    this.props.fetchEvent(this.props.match.params.eventId)
      .then(action => {
        const event = action.event.data;
        this.props.ownerId === event.owner._id
          ? this.setState(event)
          : this.props.history.replace("/events")
      })
  }

  update(field, e) {
    this.setState({[field]: e.currentTarget.value})
  }

  updatePoi(e, i, point, field) {
    e.preventDefault();

    const points = this.state.PointsOfInterest;
    const newPoint = point;
    newPoint[field] = e.currentTarget.value;
    points[i] = newPoint;

    this.setState({ PointsOfInterest: points });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    // Create new Event and then push to the Event's page if successfull
    this.props.updateEvent(this.state).then((response) => {
      if(response.type === "RECEIVE_EVENT_ERRORS"){return}
      return this.props.history.replace(`/events`)
    });
  }

  // helper to take in markers from map
  accept(key, value) {
    this.setState({ [key]: value })
  }

  deletePoi(i, e) {
    e.preventDefault();
    let points = this.state.PointsOfInterest;
    points.splice(i, 1);
    this.setState({ PointsOfInterest: points });
  }

  renderPoiError(i){
    let poiError = this.props.errors.includes(i + 1) 
      ? <div className= "form-error"> {`This poi is improperly formated.`} </div>
      : <div className = "form-error"> </div>
    return poiError
  }

  renderPoiInputs() {
    let points = this.state.PointsOfInterest;
    return points.map((point, i) => {
      return (
        <div className="create-form-marker-input" key={i}>
          {this.renderPoiError(i)}
          <div className="poi-name">Name</div>
          <input
            type="text"
            onChange={(e) => this.updatePoi(e, i, point, "name")}
            value={point.name}
            placeholder={`Point of Interest ${i + 1} name`}/>

          <div className="poi-start">Start Time</div>
          <input
            type="datetime-local"
            onChange={(e) => this.updatePoi(e, i, point, "startTime")}
            min={formatTime(new Date())}
            value={formatTime(point.startTime)}/>

          <div className="poi-end">End Time</div>
          <input
            type="datetime-local"
            onChange={(e) => this.updatePoi(e, i, point, "endTime")}
            min={formatTime(point.startTime)}
            value={formatTime(point.endTime)}/>

          <div className="poi-description">Description</div>
          <input
            type="text"
            onChange={(e) => this.updatePoi(e, i, point, "description")}
            value={point.description}
            placeholder={`Point of Interest ${i + 1} description`}/>
        </div>
      )
    })
  }

  render(){
      let descriptionLabel = this.props.errors.includes('Description is required') 
      ? <div className="form-error">Description is required!</div> 
      : <div id="create-form-description">Description</div>

    let nameLabel = this.props.errors.includes('Name is required') 
      ? <div className="form-error">Name: Too short!</div> 
      : <div id="create-form-name">Name</div>
    
    let startTimeLabel = this.props.errors.includes('Start time is required') 
      ? <div className="form-error">Start time is required!</div> 
      : <div id="create-form-start-time">Start Time</div>
    
    let endTimeLabel = this.props.errors.includes('End time is required') 
      ? <div className="form-error">End time is required!</div> 
      : <div id="create-form-end-time">End Time</div>

    let poiLabel = this.props.errors.includes('Must have at least 1 point of interest') 
      ? <div className="form-error">Please select at least one Point of Interest!</div> 
      : <div> </div>

    if (!this.state) {
      return (
        <>
        </>
      )
    }
    return( 
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
          removeEventErrors = {this.props.removeEventErrors}
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