import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import * as BeachesAPI from './BeachesAPI'
import './App.css';

class App extends Component {
  state = {
    county: 'Orange County',
    query: '',
    beaches: [],
    filteredBeaches: [],
    beachMarkers: [],
    showingInfoWindow: false,
    activeMarker: {},
    selectedBeach: {}
  }

  componentDidMount() {
    // Set the locations based on response from 3rd party API call
    BeachesAPI.getAllSpots().then((beaches) => {
      this.setState({
        // Set the master list of beaches
        beaches: beaches.filter((beach) => {
          return beach.county_name === this.state.county
        }),
        // Initially sets filteredBeaches to the same value as beaches; value
        // changes when input is entered in the text box
        filteredBeaches: beaches.filter((beach) => {
          return beach.county_name === this.state.county
        })
      })
    })
  }

  filterBeaches = (query) => {
    const match = new RegExp(escapeRegExp(query), 'i')
    this.setState({
      filteredBeaches: this.state.beaches.filter((beach) => match.test(beach.spot_name))
    })
  }

  updateQuery = (query) => {
    this.setState({ query: query })
    this.filterBeaches(query)
  }

  // Displays the info window
  beachMarkerClick = (props, marker) =>
    this.setState({
      selectedBeach: props,
      activeMarker: marker,
      showingInfoWindow: true
  });

  // Triggers a list item click to invoke the same functionality as a map markder click
  beachNameClick = (beachName) => {
    const clickedBeachName = this.state.beachMarkers.filter(marker => marker.props.title.includes(beachName));
    this.beachMarkerClick(clickedBeachName[0].props, clickedBeachName[0].marker);
  }

  // Closes the info window when the map is clicked
  mapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
    })
  }};

  // Used to connect list items to their corresponding map marker
  getMarkers = (ref) => {
    if (ref !== null) {
      this.setState(prevState => ({
        beachMarkers: [...prevState.beachMarkers, ref]
      }));
    }
  }

  render() {
    return (
      <div>
        <div className="list-view">
          <div className="search">
            <div className="search-bar">
              <div className="search-input-wrapper">
                  <input
                    type="text"
                    placeholder="Filter beaches"
                    value={this.state.query}
                    onChange={(event) => this.updateQuery(event.target.value)}
                  />
              </div>
            </div>
            <div className="search-beaches-results">
              <ul className="beaches-list">
                {this.state.filteredBeaches.map((beach) => (
                  <li
                    key={beach.spot_name}>
                    <div
                      className="beach"
                      onClick={(event) => this.beachNameClick(beach.spot_name)}
                    >
                      <a>
                        {beach.spot_name}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="map">
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
                ref={this.getMarkers}
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
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey:'AIzaSyCtruZW9bcy9NqewmArDxmOwvzA55iX7Q4'
})(App)
