import React from "react";

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

class IndexMap extends React.Component {
  constructor(props) {
    super(props);

    // since pois will not be manipulated on this map, we only need the
    // coordinates of each marker
    this.markers = this.props.PointsOfInterest?.map(point => {
      return point.location
    })
    this.placeMarkers = this.placeMarkers.bind(this);
    this.placeMarker = this.placeMarker.bind(this);
  }

  placeMarker(location, i) {
    // get time of day and set the styles, color, and icon accordingly
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
      position: location,
      map: this.map,
      label: {
        text: `${i + 1}`,
        color: color
      },
      icon: icon
    })

    // add event listener for mouse over that changes icon color
    marker.addListener("mouseover", () => {
      const label = marker.getLabel();
      label.color = hoverColor;
      marker.setLabel(label);

      marker.setIcon(HOVER_CIRCLE);
    })

    // add event listener to change the color of the icon back if the mouse is
    // no longer hovering over the marker
    marker.addListener("mouseout", () => {
      const label = marker.getLabel();
      label.color = color;
      marker.setLabel(label);

      marker.setIcon(icon);
    })
  }

  // helper method to draw polyline when map finishes loading
  drawLines() {
    // set line color based on time of day
    const hour = new Date().getHours();
    let color;
    if (hour < 7 || hour > 17) {
      color = "#eeeeee"
    } else {
      color = "black"
    }

    // setting path variable to marker location references attribute
    const path = this.markers;

    // instantiating a new polyLine with path above
    const line = new window.google.maps.Polyline({
      path: path,
      geodesic: true,
      strokeColor: color,
      strokeOpacity: 1.0,
      strokeWeight: 2
    })

    // setting reference to this map for the line above
    line.setMap(this.map)
  }

  // create markers for all markers passed down;
  placeMarkers() {
    this.markers.forEach((location, i) => {
      this.placeMarker(location, i);
    })
    this.drawLines();
  }

  componentDidMount() {
    // set initial average lat, lng to 0, instantiate variable for new center
    let avgLat = 0;
    let avgLng = 0;
    let newCenter;

    // if pois are being passed in, add the position to the lat and lng variables
    if (this.props.PointsOfInterest[0]?.location !== undefined) {
      this.props.PointsOfInterest.forEach(point => {
        avgLat += point.location.lat;
        avgLng += point.location.lng;
      })

      // divide by length to get the average after adding them all
      avgLat /= this.props.PointsOfInterest.length;
      avgLng /= this.props.PointsOfInterest.length;

      // set the center of the map to be the average of all the locations
      newCenter = { lat: avgLat, lng: avgLng };
    }
    
    // if there are no points, the center of the map will be SF
    const CENTER = newCenter || { lat: 37.7758, lng: -122.435 }; // this is SF

    const MAP_OPTIONS = {
      center: CENTER,
      zoom: 14,
      streetViewControl: false,
      mapTypeControl: false,
      keyboardShortcuts: false,
      backgroundColor: 'none',
      fullscreenControl: false,
      zoomControl: false,
      gestureHandling: "none",
      maxZoom: 18,
      minZoom: 13
    };

    // save reference to this map
    this.map = new window.google.maps.Map(this.mapNode, MAP_OPTIONS);


    // add event listeners to container to zoom in and out
    // this is so jank but it works
    // need to go up two parentElements since the map is wrapped with a wrapper
    // element
    this.mapNode.parentElement.parentElement.addEventListener("mouseover", () => {
      this.map.setZoom(this.map.getZoom() - 1)
    })

    this.mapNode.parentElement.parentElement.addEventListener("mouseout", () => {
      this.map.setZoom(this.map.getZoom() + 1)
    })

    // get time of day and set map styling accordingly
    const hour = new Date().getHours();
    let styles;
    if (hour < 7 || hour > 17) {
      styles = STYLES["dark"]
    } else {
      styles = STYLES["default"]
    }

    // apply styles to map and place markers, this.placeMarkers() draws polyLine
    this.map.setOptions({ styles: styles });
    this.placeMarkers();
  }

  render() {
    return (
      <div className="index-map-container" ref={ map => this.mapNode = map }></div>
    )
  }
};

export default IndexMap;
