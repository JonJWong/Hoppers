import React from "react";
import * as StringUtil from "../../util/string_util";

// Circle marker params
const LIGHT_CIRCLE = {
  path: window.google.maps.SymbolPath.CIRCLE,
  scale: 15,
  fillColor: "#eeeeee",
  strokeColor: "#eeeeee",
  fillOpacity: 1.0,
  strokeWeight: 0.4
}

// Dark circle marker params
const DARK_CIRCLE = {
  path: window.google.maps.SymbolPath.CIRCLE,
  scale: 15,
  fillColor: "#000000",
  strokeColor: "#000000",
  fillOpacity: 1.0,
  strokeWeight: 0.4
}

const HOVER_CIRCLE = {
  path: window.google.maps.SymbolPath.CIRCLE,
  scale: 15,
  fillColor: "#df7116",
  strokeColor: "#df7116",
  fillOpacity: 1.0,
  strokeWeight: 0.4
}

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
    
    this.infoWindows = [];
    this.placeMarkers = this.placeMarkers.bind(this);    
    this.sendPois = this.sendPois.bind(this);
    this.markers = {};
    this.path = [];
    this.current = 0;
  }

  placeMarkers() {
    if (!this.props.event.PointsOfInterest[0]?.location) {
      return
    }
    const markers = this.props.event.PointsOfInterest.map(point => {
      return point
    })

    markers.forEach((point, i) => {
      this.placeMarker(point, i)
      this.path.push(point.location)
    })

    const hour = new Date().getHours();
    let color;
    if (hour < 7 || hour > 17) {
      color = "#eeeeee"
    } else {
      color = "black"
    }

    this.poly = new window.google.maps.Polyline({
      path: this.path,
      geodesic: true,
      strokeColor: color,
      strokeOpacity: 1.0,
      strokeWeight: 2
    })

    this.poly.setMap(this.map)
  }

  newMarker(point) {
    const map = this.map;
    // get time of day and set a styles var accordingly
    const hour = new Date().getHours();
    let hoverColor = "#eeeeee";
    let color;
    let icon;
    if (hour < 7 || hour > 17) {
      icon = LIGHT_CIRCLE
      color = "black"
    } else {
      icon = DARK_CIRCLE
      color = "#eeeeee"
    }

    // create marker at the location of the click event
    const marker = new window.google.maps.Marker({
      position: point,
      map: map,
      label: {
        text: `${this.current + 1}`,
        color: color
      },
      icon: icon
    })

    marker.addListener("mouseover", () => {
      const label = marker.getLabel();
      label.color = hoverColor;
      marker.setLabel(label);

      marker.setIcon(HOVER_CIRCLE);
    })

    marker.addListener("mouseout", () => {
      const label = marker.getLabel();
      label.color = color;
      marker.setLabel(label);

      marker.setIcon(icon);
    })

    // center the map onto the location of click
    this.map.panTo(point);

    // set marker id, assign to object attribute
    let id = this.current;
    this.current += 1;
    
    this.markers[id] = marker;

    this.path.push({ lat: point.lat(), lng: point.lng() });

    this.poly.setPath(this.path);

    // add a listener for right-click to delete the marker that is right-clicked
    window.google.maps.event.addListener(marker, "rightclick", () => {
      this.deleteMarker(id);
    })
  }

  placeMarker(point, i) {
    const position = point.location;
    const map = this.map;
    const that = this;
    // get time of day and set a styles var accordingly
    const hour = new Date().getHours();
    let hoverColor = "#eeeeee";
    let color;
    let icon;
    if (hour < 7 || hour > 17) {
      icon = LIGHT_CIRCLE
      color = "black"
    } else {
      icon = DARK_CIRCLE
      color = "#eeeeee"
    }

    // create marker at the location of the click event
    const marker = new window.google.maps.Marker({
      position: position,
      map: map,
      label: {
        text: `${this.current + 1}`,
        color: color
      },
      icon: icon
    })

    const infoWindowContent = 
    `<div class="marker-content">` +
      `<h3 class="infowindow-name">${point.name}</h3>` +
      `<div class="infowindow-start">Start: ${StringUtil.getTime(point.startTime)}</div>` +
      `<div class="infowindow-end">End: ${StringUtil.getTime(point.endTime)}</div>` +
      `<div class="infowindow-description">Description: ${point.description}</div>` +
    `</div>`

    const infoWindow = new window.google.maps.InfoWindow({
      content: infoWindowContent,
      maxWidth: 200
    })

    this.infoWindows.push(infoWindow);

    marker.addListener("mouseover", () => {
      const label = marker.getLabel();
      label.color = hoverColor;
      marker.setLabel(label);

      marker.setIcon(HOVER_CIRCLE);
    })

    marker.addListener("mouseout", () => {
      const label = marker.getLabel();
      label.color = color;
      marker.setLabel(label);

      marker.setIcon(icon);
    })

    marker.addListener("click", () => {
      that.closeInfoWindows();
      infoWindow.open({
        anchor: marker,
        map,
        shouldFocus: false
      })
    })

    // center the map onto the location of click
    this.map.panTo(position);

    // set marker id, assign to object attribute
    let id = this.current;
    this.current += 1;

    this.markers[id] = marker;

    // add a listener for right-click to delete the marker that is right-clicked
    window.google.maps.event.addListener(marker, "rightclick", () => {
      this.deleteMarker(id);
    })
  }

  closeInfoWindows() {
    for (let window of this.infoWindows) {
      window.close();
    }
  }

  // helper to delete a marker at a set ID on the map
  deleteMarker(id) {
    const marker = this.markers[id];
    const { event } = this.props;
    marker.setMap(null);

    const index = Object.values(this.markers).indexOf(marker)

    this.path.splice(index, 1);
    this.poly.setPath(this.path);
    
    console.log(this.path);
    
    delete this.markers[id];
    delete event.PointsOfInterest[id];

    this.props.accept("PointsOfInterest", event.PointsOfInterest)
  }

  sendPois(e) {
    e.preventDefault();
    const points = this.props.event.PointsOfInterest;

    Object.values(this.markers).forEach((marker, i) => {
      const pos = {};
      const newPoint = points[i] || {};
      pos["lat"] = marker.position.lat();
      pos["lng"] = marker.position.lng();
      newPoint["location"] = pos;
      points[i] = newPoint
    })

    this.props.accept("PointsOfInterest", points)
    this.props.removeEventErrors();
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
          north: CENTER.lat + .06,
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
      this.newMarker(e.latLng)
    })

    const submitButton = document.getElementById("map-add-pois");
    this.map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(submitButton);

    this.placeMarkers();
  }

  render(){
    return(
      <div id="functional-map-container-wrapper">
        <button
          id="map-add-pois"
          onClick={e => this.sendPois(e)}>
            Confirm Points of Interest
        </button>
        <div id="functional-map-container" ref={ map => this.mapNode = map }></div> 
        <div id="form-map-footer">
          To add a point of interest, left-click a location on the map.
          To remove a point of interest, right-click the undesired marker to remove it.
          To add the selected points to the form, please press "Confirm Points Of Interest"
        </div>
      </div>
    )
  }
};

export default FunctionalMap;
