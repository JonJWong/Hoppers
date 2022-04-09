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

// Hover circle marker params
const HOVER_CIRCLE = {
  path: window.google.maps.SymbolPath.CIRCLE,
  scale: 15,
  fillColor: "#df7116",
  strokeColor: "#df7116",
  fillOpacity: 1.0,
  strokeWeight: 0.4
}

// Map styles to remove default POIs, and darken map
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


class FunctionalMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      style: "default"
    }
    
    this.infoWindows = [];
    this.placeMarkers = this.placeMarkers.bind(this);    
    this.sendPois = this.sendPois.bind(this);
    this.markers = {};
    this.path = [];
  }

  // helper to place initial markers from pois passed in.
  placeMarkers() {
    // If there are no pois or locations, return
    if (!this.props.event.PointsOfInterest[0]?.location) {
      return
    }

    // create variable from the pois passed in from form.
    const markers = this.props.event.PointsOfInterest;

    // iterate through pois, create a marker and add to path attribute for
    // polyline to draw lines on
    markers.forEach((point, i) => {
      this.placeMarker(point, i)
    })
  }

  // this method is what is called on-click of the map to create markers
  newMarker(point) {
    const map = this.map;
    // get time of day and set styles, line color accordingly
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

    // get the current length of markers so that markers can be set later
    const current = this.path.length;

    // create marker at the location of the click event
    const marker = new window.google.maps.Marker({
      position: {lat: point.lat(), lng: point.lng()},
      map: map,
      label: {
        text: `${current + 1}`,
        color: color
      },
      icon: icon
    })

    // add a hover effect on mouseover to the marker
    marker.addListener("mouseover", () => {
      const label = marker.getLabel();
      label.color = hoverColor;
      marker.setLabel(label);

      marker.setIcon(HOVER_CIRCLE);
    })

    // mouseout to remove hover effect when cursor is no longer over the marker
    marker.addListener("mouseout", () => {
      const label = marker.getLabel();
      label.color = color;
      marker.setLabel(label);

      marker.setIcon(icon);
    })

    // center the map onto the location of click
    this.map.panTo(point);

    // set marker id, assign to object attribute
    let id = current;
    
    // add marker to this.markers object
    this.markers[id] = marker;

    // add marker location to path attribute for polyline
    this.path.push({ lat: point.lat(), lng: point.lng() });

    // set this.path to polyline path (update polyline)
    this.poly.setPath(this.path);

    // add a listener for right-click to delete the marker that is right-clicked
    window.google.maps.event.addListener(marker, "rightclick", () => {
      this.deleteMarker(id);
    })
  }

  // helper to place markers initially passed in as props from form.
  // only called within this.placeMarkers
  placeMarker(point) {
    const position = point.location;
    const map = this.map;
    const that = this;
    // get time of day and set styles and line color accordingly
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

    // get text for marker icon based on length of current # of markers
    const current = Object.values(this.markers).length || 0;

    // create marker at the location of the click event
    const marker = new window.google.maps.Marker({
      position: position,
      map: map,
      label: {
        text: `${current + 1}`,
        color: color
      },
      icon: icon
    })

    // Define what content shows up on the infowindow (appears on-click)
    const infoWindowContent = 
    `<div class="marker-content">` +
      `<h3 class="infowindow-name">${point.name}</h3>` +
      `<div class="infowindow-start">Start: ${StringUtil.getTime(point.startTime)}</div>` +
      `<div class="infowindow-end">End: ${StringUtil.getTime(point.endTime)}</div>` +
      `<div class="infowindow-description">Description: ${point.description}</div>` +
    `</div>`

    // Instantiate that content into an infoWindow object
    const infoWindow = new window.google.maps.InfoWindow({
      content: infoWindowContent,
      maxWidth: 200
    })

    // add a reference to that infoWindow to the component in an attribute
    this.infoWindows.push(infoWindow);

    // add hover effect to marker
    marker.addListener("mouseover", () => {
      const label = marker.getLabel();
      label.color = hoverColor;
      marker.setLabel(label);

      marker.setIcon(HOVER_CIRCLE);
    })

    // remove hover effect when cursor is not over marker
    marker.addListener("mouseout", () => {
      const label = marker.getLabel();
      label.color = color;
      marker.setLabel(label);

      marker.setIcon(icon);
    })

    // add on-click event listener that closes all other infoWindows, and
    // opens the one assigned to the marker
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
    let id = current;

    // add marker to polyLine path attribute
    this.path.push(position);

    // store reference to marker
    this.markers[id] = marker;

    // add a listener for right-click to delete the marker that is right-clicked
    window.google.maps.event.addListener(marker, "rightclick", () => {
      this.deleteMarker(id);
    })
  }

  // helper to close all other infoWindows
  closeInfoWindows() {
    for (let window of this.infoWindows) {
      window.close();
    }
  }

  // helper to delete a marker at a set ID on the map
  deleteMarker(id) {
    // find the marker in the references stored in attribute
    const marker = this.markers[id];
    const { event } = this.props;

    // remove the marker from the map by changing its map assignment
    marker.setMap(null);

    // find the index of this marker within the markers attribute
    // the index here should be same as the marker's index on POI list since
    // they are stored in order
    const index = Object.values(this.markers).indexOf(marker);

    // remove marker reference from markers object
    delete this.markers[id];
    
    // fetch pois from form, assign to event
    const PointsOfInterest = this.props.getPois();

    // remove the poi attached to this marker from the event fetched from form
    // only remove if the pois are longer than path
    // this checks for un-finalized markers as pois
    if (PointsOfInterest.length <= this.path.length) {
      PointsOfInterest.splice(index, 1);
    }
    
    // remove the marker from the polyLine path
    this.path.splice(index, 1);
    // update polyLine path to exclude the removed marker
    this.poly.setPath(this.path);

    // re-assign all markers in numeric order to fill in the gap from the
    // marker that has been removed
    this.reassignLabels();

    // set the state of parent component with the new event's points of interest
    // (marker has been removed, update parent)
    this.props.accept("PointsOfInterest", event.PointsOfInterest)
  }

  // helper to set the markers in numerical order again after deleting
  reassignLabels() {
    Object.values(this.markers).forEach((marker, i) => {
      const label = marker.getLabel();
      label.text = `${i + 1}`;
      marker.setLabel(label);
    })
  }

  // helper to pass the markers into parent form as pois
  sendPois(e) {
    e.preventDefault();
    const points = this.props.event.PointsOfInterest;

    // assign appropriate marker locations to each poi that has been passed in
    Object.values(this.markers).forEach((marker, i) => {
      const pos = {};
      // if a POI exists at this index, fetch the other info like name, etc.
      // otherwise, create new poi object
      const newPoint = points[i] || {};

      // populate position object
      pos["lat"] = marker.position.lat();
      pos["lng"] = marker.position.lng();

      // assign position to newly edited poi at this index
      newPoint["location"] = pos;

      // assign new location to poi
      points[i] = newPoint
    })

    // set state of parent component with newly updated pois
    this.props.accept("PointsOfInterest", points)

    // clear poiError  that are on the page
    this.props.removePoiErrors();
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

    // assigning reference of the map created to this.map
    this.map = new window.google.maps.Map(this.mapNode, MAP_OPTIONS);

    // get time of day and set a styles var accordingly
    const hour = new Date().getHours();
    let styles;
    let color;
    if (hour < 7 || hour > 17) {
      styles = STYLES["dark"]
      color = "#eeeeee";
    } else {
      styles = STYLES["default"]
      color = "black";
    }

    // apply styles to map based on time of day
    this.map.setOptions({ styles: styles });

    // add listener to map that creates markers on click
    window.google.maps.event.addListener(this.map, "click", (e) => {
      this.newMarker(e.latLng)
    })

    // create submit button to attach to map, place it in top center position
    const submitButton = document.getElementById("map-add-pois");
    this.map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(submitButton);

    // place any markers that have been passed in from props in case an event
    // is being edited
    this.placeMarkers();

    // instantiate a new polyLine to connect the POIs in order
    this.poly ||= new window.google.maps.Polyline({
      path: this.path,
      geodesic: true,
      strokeColor: color,
      strokeOpacity: 1.0,
      strokeWeight: 2
    })

    // set the polyLine reference to this map
    this.poly.setMap(this.map);
  }

  render() {
    return (
      <div id="functional-map-container-wrapper">
        <div id="form-map-header">
          Please note: Please press "Confirm Points Of Interest" before making any changes to your Points of Interest, or there might be unexpected behavior.
        </div>
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