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
    activeMarker: {},
    showingInfoWindow: false,
    selectedBeach: {},
    waveSize: '',
    error: ''
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

  // Fetches wave height at specified beach and displays the info window
  // Note: using strategy described here
  // https://mcculloughwebservices.com/2016/09/23/handling-a-null-response-from-an-api/
  // to handle null responses from the API
  beachMarkerClick = (props, marker) => {
    BeachesAPI.get(props.name)
      .then(data => {
        this.setState({
          waveSize: data != null ? data[0].size + ' ft.' : 'Unavailable',
          selectedBeach: props,
          activeMarker: marker,
          showingInfoWindow: true,
          // animation: this.props.google.maps.Animation.BOUNCE
        })
      })
    }

  // Triggers a list item click to invoke the same functionality as a map markder click
  beachNameClick = (beachName) => {
    const clickedBeachName = this.state.beachMarkers.filter(marker => marker.props.title.includes(beachName));
    this.beachMarkerClick(clickedBeachName[0].props, clickedBeachName[0].marker);
  }

  // Closes the info window when the map is clicked
  clearActiveMarker = (props) => {
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
      <div className="main">
        <header className="header">
          <h2>The Beaches of Orange County</h2>
        </header>
        <section className="list-view">
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
        </section>
        <section className="map">
          <Map
            google={this.props.google}
            onClick={this.clearActiveMarker}
            className={'map'}
            zoom={ 10 }
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
                animation={this.state.activeMarker ? (beach.spot_name === this.state.activeMarker.title ? '1' : '0') : '0'}
              />
              ))}
              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.clearActiveMarker}
              >
                <div className="marker-info">
                  <h1>{this.state.selectedBeach.title}</h1>
                  <p>{"Wave forecast (height): " + this.state.waveSize}</p>
                  <cite>Source: spitcast.com</cite>
                </div>
              </InfoWindow>
          </Map>
        </section>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey:'AIzaSyCtruZW9bcy9NqewmArDxmOwvzA55iX7Q4'
})(App)
