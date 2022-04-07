import React from 'react'
import FunctionalMap from '../map/functional_map';

const getFormattedDatetime = (dateString) => {
  const d = new Date(dateString);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();
  let hour = '' + d.getHours();
  let min = '' + d.getMinutes();
  let sec = '' + d.getSeconds();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  if (hour.length < 2) hour = '0' + hour;
  if (min.length < 2) min = '0' + min;
  if (sec.length < 2) sec = '0' + sec;
  return [year, month, day].join('-')+'T'+[hour,min,sec].join(':');
} 

class EditEventForm extends React.Component{
  constructor(props){
    super(props)
    this.state = this.props.event;

    this.accept = this.accept.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.update = this.update.bind(this)
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
    const value = e.currentTarget.value;
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

    // Create new Event and then push to the Event's page.
    this.props.updateEvent(this.state).then(() => {
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

  renderPoiInputs() {
    let points = this.state.PointsOfInterest;
    return points.map((point, i) => {
      return (
        <div className="create-form-marker-input" key={i}>

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
            value={getFormattedDatetime(point.startTime)}/>

          <div className="poi-end">End Time</div>
          <input
            type="datetime-local"
            onChange={(e) => this.updatePoi(e, i, point, "endTime")}
            value={getFormattedDatetime(point.endTime)}/>

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
            <div id="create-form-name">Name</div>
              <input
                type="text"
                value={this.state.name}
                onChange={(e) => this.update("name", e)}
                placeholder="Event Name"
              />
          </div>
          
          <div id="create-form-description-wrapper">
            <div id="create-form-description">Description</div>
              <textarea
              value={this.state.description}
              onChange={(e) => this.update("description", e)}
              /> 
          </div>
          
          <div id="create-form-start-wrapper">
            <div id ="create-form-start-time">Start Time</div>
              <input 
                type="datetime-local"
                value={getFormattedDatetime(this.state.startTime)}
                onChange={(e) => this.update("startTime", e)}
              />
          </div>
          
          <div id="create-form-end-time-wrapper">
            <div id ="create-form-end-time">End Time</div>
              <input 
                type="datetime-local"
                value={getFormattedDatetime(this.state.endTime)}
                onChange={(e) => this.update("endTime", e)}
              />
          </div>
        </div>
      {this.state.name ? (
        <FunctionalMap event={this.state} accept={this.accept} />
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