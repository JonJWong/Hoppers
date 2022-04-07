import React from 'react'
import FunctionalMap from '../map/functional_map';

class EditEventForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name: "",
      description: "",
      startTime: "",
      endTime: "",
      PointsOfInterest: [],
      owner: this.props.ownerId
    }

    this.accept = this.accept.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.update = this.update.bind(this)
  }

  componentDidMount() {
    this.props.fetchEvent(this.props.match.params.eventId)
  }

  update(field) {
    return (e) => {this.setState({[field]: e.currentTarget.value})}
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
    let that = this; 

    // Create new Event and then push to the Event's page.
    this.props.action(this.state).then(function(event){
      return that.props.history.push(`/events`)
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
            placeholder={`Point of Interest ${i + 1} name`}/>

          <div className="poi-start">Start Time</div>
          <input
            type="datetime-local"
            onChange={(e) => this.updatePoi(e, i, point, "startTime")}
            placeholder={`Point of Interest ${i + 1} start time`}/>

          <div className="poi-end">End Time</div>
          <input
            type="datetime-local"
            onChange={(e) => this.updatePoi(e, i, point, "endTime")}
            placeholder={`Point of Interest ${i + 1} end time`}/>

          <div className="poi-description">Description</div>
          <input
            type="text"
            onChange={(e) => this.updatePoi(e, i, point, "description")}
            placeholder={`Point of Interest ${i + 1} description`}/>
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
          
          <div id="create-form-end-time-wrapper">
            <div id ="create-form-end-time">End Time</div>
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
            {this.props.formType}
        </button>
      </form>
    </div>
    )
  }
}

export default EditEventForm