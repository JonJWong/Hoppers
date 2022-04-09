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

// Styles constant for night mode and hiding default POIs
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

class ShowMap extends React.Component{
  constructor(props){
    super(props)

    this.infoWindows = [];
    this.markers = this.props.PointsOfInterest;
    this.placeMarkers = this.placeMarkers.bind(this);
    this.placeMarker = this.placeMarker.bind(this);
  }

  placeMarker(location, i) {
    const that = this;
    const map = this.map;
    const position = location.location;
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
        text: `${i + 1}`,
        color: color
      },
      icon: icon
    })

    // Create infoWindow content string
    const infoWindowContent = 
    `<div class="marker-content">` +
      `<h3 class="infowindow-name">${location.name}</h3>` +
      `<div class="infowindow-start">Start: ${StringUtil.getTime(location.startTime)}</div>` +
      `<div class="infowindow-end">End: ${StringUtil.getTime(location.endTime)}</div>` +
      `<div class="infowindow-description">Description: ${location.description}</div>` +
    `</div>`

    // instantiate new infoWindow with above content
    const infoWindow = new window.google.maps.InfoWindow({
      content: infoWindowContent,
      maxWidth: 200
    })

    // save reference to infoWindow
    this.infoWindows.push(infoWindow);

    // add listener for hover to change color of marker
    marker.addListener("mouseover", () => {
      const label = marker.getLabel();
      label.color = hoverColor;
      marker.setLabel(label);

      marker.setIcon(HOVER_CIRCLE);
    })

    // add listener to remove color change when not hovering
    marker.addListener("mouseout", () => {
      const label = marker.getLabel();
      label.color = color;
      marker.setLabel(label);

      marker.setIcon(icon);
    })

    // add listener to listen for click to close all other infoWindows,
    // and to open this marker's infoWindow
    marker.addListener("click", () => {
      that.closeInfoWindows();
      infoWindow.open({
        anchor: marker,
        map,
        shouldFocus: false
      })
    })
  }

  // helper to draw polyLine after markers draw
  drawLines() {
    // set line color according to time of day
    const hour = new Date().getHours();
    let color;
    if (hour < 7 || hour > 17) {
      color = "#eeeeee"
    } else {
      color = "black"
    }

    // instantiate new math by getting location from markers passed in
    const path = this.markers.map(poi => poi.location)

    // create a new polyLine with markers
    const line = new window.google.maps.Polyline({
      path: path,
      geodesic: true,
      strokeColor: color,
      strokeOpacity: 1.0,
      strokeWeight: 2
    })

    // set reference to this map for polyLine
    line.setMap(this.map)
  }

  // helper to close all other infoWindows
  closeInfoWindows() {
    for (let window of this.infoWindows) {
      window.close();
    }
  }

  // create markers for all markers passed down;
  placeMarkers() {
    this.markers.forEach((location, i) => {
      this.placeMarker(location, i);
    })
    // draw polyLine after placing markers
    this.drawLines()
  }

  componentDidMount() {
    // set variables to calculate center of pois
    let avgLat = 0;
    let avgLng = 0;
    let newCenter;

    // iterate through pois passed in (if any), and get the average position
    if (this.props.PointsOfInterest[0]?.location !== undefined) {
      this.props.PointsOfInterest.forEach(point => {
        avgLat += point.location.lat;
        avgLng += point.location.lng;
      })

      // divide by length of markers after adding to get average
      avgLat /= this.props.PointsOfInterest.length;
      avgLng /= this.props.PointsOfInterest.length;

      // create variable for new center
      newCenter = { lat: avgLat, lng: avgLng };
    }
    
    // if there are no markers passed in, center will be SF
    const CENTER = newCenter || { lat: 37.7758, lng: -122.435 }; // this is SF

    const MAP_OPTIONS = {
      center: CENTER,
      zoom: 14,
      streetViewControl: false,
      mapTypeControl: false,
      keyboardShortcuts: false,
      backgroundColor: 'none',
      fullscreenControl: false,
      maxZoom: 18,
      minZoom: 13,
      restriction: {
        latLngBounds: {
          north: CENTER.lat + .03,
          south: CENTER.lat - .03,
          east: CENTER.lng + .07,
          west: CENTER.lng - .07
        }
      }
    };

    // save reference to this map
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
    // place markers and draw polyLine
    this.placeMarkers();

    // add listener to map that closes infoWindows when empty space is clicked
    window.google.maps.event.addListener(this.map, "click", (e) => {
      this.closeInfoWindows();
    })
  }

  render(){
    return(
      <div className="show-map-container" ref={ map => this.mapNode = map }></div>
    )
  }
};

export default ShowMap;
