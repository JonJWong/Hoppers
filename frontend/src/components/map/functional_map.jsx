import React from "react";

const STYLES = {
  default: [
    {
      featureType: "administrative",
      stylers: [{visibility: "off"}]
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels",
      stylers: [{visibility: "off"}]
    },
    {
      featureType: "poi",
      elementType: "labels.text",
      stylers: [{visibility: "off"}]
    },
    {
      featureType: "poi.business",
      stylers: [{visibility: "off"}]
    },
    {
      featureType: "poi.business",
      elementType: "geometry",
      stylers: [{visibility: "off"}]
    },
    {
      featureType: "poi.government",
      stylers: [{visibility: "off"}]
    },
    {
      featureType: "poi.medical",
      stylers: [{visibility: "off"}]
    },
    {
      featureType: "poi.park",
      elementType: "labels.text",
      stylers: [{visibility: "off"}]
    },
    {
      featureType: "poi.place_of_worship",
      stylers: [{visibility: "off"}]
    },
    {
      featureType: "poi.school",
      stylers: [{visibility: "off"}]
    },
    {
      featureType: "poi.sports_complex",
      stylers: [{visibility: "off"}]
    },
    {
      featureType: "road.local",
      elementType: "labels",
      stylers: [{visibility: "off"}]
    },
    {
      featureType: "transit",
      stylers: [{visibility: "off"}]
    }
  ],
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
    {
      featureType: "administrative",
      stylers: [{visibility: "off"}]
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels",
      stylers: [{visibility: "off"}]
    },
    {
      featureType: "poi",
      elementType: "labels.text",
      stylers: [{visibility: "off"}]
    },
    {
      featureType: "poi.business",
      stylers: [{visibility: "off"}]
    },
    {
      featureType: "poi.business",
      elementType: "geometry",
      stylers: [{visibility: "off"}]
    },
    {
      featureType: "poi.government",
      stylers: [{visibility: "off"}]
    },
    {
      featureType: "poi.medical",
      stylers: [{visibility: "off"}]
    },
    {
      featureType: "poi.park",
      elementType: "labels.text",
      stylers: [{visibility: "off"}]
    },
    {
      featureType: "poi.place_of_worship",
      stylers: [{visibility: "off"}]
    },
    {
      featureType: "poi.school",
      stylers: [{visibility: "off"}]
    },
    {
      featureType: "poi.sports_complex",
      stylers: [{visibility: "off"}]
    },
    {
      featureType: "road.local",
      elementType: "labels",
      stylers: [{visibility: "off"}]
    },
    {
      featureType: "transit",
      stylers: [{visibility: "off"}]
    }
  ],
  hiding: [
    {
      featureType: "administrative",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
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


class FunctionalMap extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      style: "default"
    }

    // this.clearMarkers = this.clearMarkers.bind(this);
    this.sendPois = this.sendPois.bind(this);
    this.markers = {};
    this.current = 0;
  }

  setCenter() {
    const CENTER = { lat: "", lng: "" };
    
  }

  placeMarker(location) {
    // create marker at the location of the click event
    const marker = new window.google.maps.Marker({
      position: location,
      map: this.map
    })

    // center the map onto the location of click
    this.map.panTo(location);

    // set marker id, assign to object attribute
    let id = this.current;
    this.current += 1;

    this.markers[id] = marker;

    // add a listener for right-click to delete the marker that is right-clicked
    window.google.maps.event.addListener(marker, "rightclick", (point) => {
      this.deleteMarker(id);
    })
  }

  // helper to delete a marker at a set ID on the map
  deleteMarker(id) {
    const marker = this.markers[id];
    const { event } = this.props;
    marker.setMap(null);
    delete this.markers[id];
    delete event.PointsOfInterest[id];
    console.log(event.PointsOfInterest)
    this.props.accept("PointsOfInterest", event.PointsOfInterest)
  }

  sendPois(e) {
    e.preventDefault();
    const points = [];
    Object.values(this.markers).forEach(marker => {
      const pos = {};
      const newPoint = {};
      pos["lat"] = marker.position.lat();
      pos["lng"] = marker.position.lng();
      newPoint.location = pos;
      points.push(newPoint)
    })
    
    this.props.accept("PointsOfInterest", points)
  }

  componentDidMount() {
    const CENTER = { lat: 37.7758, lng: -122.435 }; // this is SF

    const MAP_OPTIONS = {
      center: CENTER,
      zoom: 13,
      streetViewControl: false,
      mapTypeControl: false,
      keyboardShortcuts: false,
      backgroundColor: 'none',
      fullscreenControl: false,
      maxZoom: 18,
      minZoom: 13,
      restriction: {
        latLngBounds: {
          north: CENTER.lat + .04,
          south: CENTER.lat - .1,
          east: CENTER.lng + .07,
          west: CENTER.lng - .09
        }
      }
    };

    // we want to configure the map options to be able to display all of the 
    // points of interest for an event. We can get the center (average)
    // and then configure the radius to display all of the point within the bounds
    this.map = new window.google.maps.Map(this.mapNode, MAP_OPTIONS);

    // get time of day and set a styles var accordingly
    const hour = new Date().getHours();
    let styles;
    if (hour < 7 || hour > 17) {
      styles = STYLES["dark"]
    } else {
      styles = STYLES["default"]
    }
    // apply styles by time of day
    this.map.setOptions({ styles: styles });

    // add listener to map that creates markers on click
    window.google.maps.event.addListener(this.map, "click", (e) => {
      this.placeMarker(e.latLng, this.map)
    })

    const submitButton = document.getElementById("map-add-pois");
    this.map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(submitButton);
  }

  render(){
    return(
      <>
        <button
          id="map-add-pois"
          onClick={e => this.sendPois(e)}>
            Confirm Points of Interest
        </button>
        <div id="functional-map-container" ref={ map => this.mapNode = map }></div> 
      </>
    )
  }
};

export default FunctionalMap;
