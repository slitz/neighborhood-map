import React, { Component } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import MapMarker from './MapMarker'
import PropTypes from 'prop-types'

/* Using google-maps-react package as described here:
https://www.npmjs.com/package/google-maps-react */
class MapContainer extends Component {
  static propTypes = {
    filteredBeaches: PropTypes.array.isRequired,
    //selectedBeach: PropTypes.object.isRequired,
    //beachClick: PropTypes.func.isRequired
  }

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedBeach: {}
  };

  beachMarkerClick = (props, marker) =>
    this.setState({
      selectedBeach: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  mapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }};

  render() {
    const { filteredBeaches } = this.props
    return (
      <Map
        google={this.props.google}
        onClick={this.mapClick}
        className={'map'}
        zoom={ 11 }
        initialCenter={ { lat: 33.56500, lng: -117.79550 } }
      >
        {this.state.filteredBeaches.map((beach) => (
          <Marker
            key={beach.spot_id}
            position={{ lat: beach.latitude, lng: beach.longitude }}
            title={beach.spot_name}
            name={beach.spot_id}
            onClick={this.beachMarkerClick}
          />
          ))}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div className="marker-info">
              <h1>{this.state.selectedBeach.title}</h1>
            </div>
          </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey:'AIzaSyCtruZW9bcy9NqewmArDxmOwvzA55iX7Q4'
})(MapContainer)
