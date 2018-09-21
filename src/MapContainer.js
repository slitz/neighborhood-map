import React, { Component } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types'

/* Using google-maps-react package as described here:
https://www.npmjs.com/package/google-maps-react */
class MapContainer extends Component {
  static propTypes = {
    filteredBeaches: PropTypes.array.isRequired,
    selectedBeach: PropTypes.object.isRequired,
    clearActiveMarker: PropTypes.func.isRequired,
    beachMarkerClick: PropTypes.func.isRequired,
    showingInfoWindow: PropTypes.bool.isRequired,
    waveSize: PropTypes.string.isRequired,
    getMarkers: PropTypes.func.isRequired
  }

  render() {
    const { filteredBeaches, selectedBeach, clearActiveMarker, beachMarkerClick,
      activeMarker, showingInfoWindow, waveSize, getMarkers } = this.props
    return (
      <Map
        google={this.props.google}
        onClick={clearActiveMarker}
        className={'map'}
        zoom={ 10 }
        initialCenter={ { lat: 33.56500, lng: -117.79550 } }
      >
        {filteredBeaches.map((beach) => (
          <Marker
            key={beach.spot_id}
            position={{ lat: beach.latitude, lng: beach.longitude }}
            title={beach.spot_name}
            name={beach.spot_id}
            onClick={beachMarkerClick}
            ref={getMarkers}
            animation={activeMarker ? (beach.spot_name === activeMarker.title ? '1' : '0') : '0'}
          />
          ))}
          <InfoWindow
            marker={activeMarker}
            visible={showingInfoWindow}
            onClose={clearActiveMarker}
          >
            <div className="marker-info">
              <h1>{selectedBeach.title}</h1>
              <p>{"Wave forecast (height): " + waveSize}</p>
              <cite>Source: spitcast.com</cite>
            </div>
          </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey:'AIzaSyCtruZW9bcy9NqewmArDxmOwvzA55iX7Q4'
})(MapContainer)
