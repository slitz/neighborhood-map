import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types'

/* Using google-maps-react package as described here:
https://www.npmjs.com/package/google-maps-react */
class MapContainer extends Component {
  static propTypes = {
    filteredBeaches: PropTypes.array.isRequired
  }

  render() {
    const { filteredBeaches } = this.props
    return (
      <Map
        google={ this.props.google }
        className={'map'}
        // style={{width: '80%', height: '100%', position: 'absolute'}}
        zoom={ 11 }
        initialCenter={ { lat: 33.56500, lng: -117.79550 } }
      >
        {filteredBeaches.map((beach) => (
          <Marker
            key={beach.spot_id}
            position={{ lat: beach.latitude, lng: beach.longitude }}
            title={beach.spot_name}
          />
        ))}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey:'AIzaSyCtruZW9bcy9NqewmArDxmOwvzA55iX7Q4'
})(MapContainer)
