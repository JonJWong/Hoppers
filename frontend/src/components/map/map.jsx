import React from "react";

class Map extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      style: "default"
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.setState({style: e.currentTarget.value});
    this.map.setOptions({ styles: styles[e.currentTarget.value] });
  }

  componentDidMount() {
    // we want to configure the map options to be able to display all of the 
    // points of interest for an event. We can get the center (average)
    // and then configure the radius to display all of the point within the bounds
    this.map = new window.google.maps.Map(this.mapNode, mapOptions);
    const styleControl = document.getElementById("style-selector-control");

    this.map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(styleControl);
  }

  render(){
    return(
      <>
        <div id="style-selector-control" className="map-control">
          <select id="style-selector" className="selector-control" onChange={this.handleChange} value={this.state.style}>
            <option value="default">Default</option>
            <option value="dark">Night mode</option>
            {/* <option value="hiding">Hide features</option> */}
          </select>
        </div>
        <div id="map-container" ref={ map => this.mapNode = map }></div> 
      </>
    )
  }
};

export default Map;

const mapOptions = {
  center: { lat: 37.7758, lng: -122.435 }, // this is SF
  zoom: 13,
  streetViewControl: false,
  mapTypeControl: false,
  keyboardShortcuts: false,
  backgroundColor: 'none',
  fullscreenControl: false,
};

const styles = {
  default: [],
  dark: [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ],
  hiding: [
    {
      featureType: "administrative",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    },
    {
      featureType: "poi.business",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
  ],
};
