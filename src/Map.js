import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

/* Using react-google-maps package as described here:
https://tomchentw.github.io/react-google-maps/ */
class Map extends Component {
  render() {
    const Map  = withScriptjs(withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: 33.717500, lng: -117.831100 } }
        defaultZoom = { 10 }
      >
      </GoogleMap>
   )));
    return (
      <div>
        <Map
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCtruZW9bcy9NqewmArDxmOwvzA55iX7Q4&v=3"
          loadingElement={ <div style={{ height: `100%` }} />}
          containerElement={ <div style={{ height: `750px` }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
      </div>
    );
  }
}

export default Map;
