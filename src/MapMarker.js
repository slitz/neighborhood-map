import React, { Component } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';

class MapMarker extends Component {
  render() {
    const { beach, markerClick } = this.props
    return (
      <Marker
        key={beach.spot_id}
        position={{ lat: beach.latitude, lng: beach.longitude }}
        title={beach.spot_name}
        name={beach.spot_id}
        onClick={markerClick}
      />
    )}
}

export default MapMarker;
