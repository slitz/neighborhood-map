import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import PropTypes from 'prop-types'

/* Using react-google-maps package as described here:
https://tomchentw.github.io/react-google-maps/ */
class Map extends Component {
  static propTypes = {
    county: PropTypes.string.isRequired,
    beaches: PropTypes.array.isRequired
  }

  render() {
    const { county, beaches } = this.props
    const Map  = withScriptjs(withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: 33.609562, lng: -117.777999 } }
        defaultZoom = { 11 }
      >
        {beaches.map((beach) => (
            <Marker
              key={beach.spot_id}
              position={{ lat: beach.latitude, lng: beach.longitude }}
              title={beach.spot_name}
            />
        ))}
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
