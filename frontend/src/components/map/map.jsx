import React from "react";

class Map extends React.Component{
  componentDidMount() {
    // set the map to show SF
    const mapOptions = {
      center: { lat: 37.7758, lng: -122.435 }, // this is SF
      zoom: 13
    };

    // wrap this.mapNode in a Google Map
    // this.map = new google.maps.Map(this.mapNode, mapOptions);
  }

  render(){
    return(
      // this ref gives us access to the map dom node
      <div id="map-container" ref={ map => this.mapNode = map }> I am the map component </div> 
    )
  }
};

export default Map;
