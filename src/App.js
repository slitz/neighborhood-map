import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import * as BeachesAPI from './BeachesAPI'
import ListView from './ListView'
import MapContainer from './MapContainer'
import './App.css';
import menu from './icons/menu.svg';

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
    error: '',
    listViewVisible: true
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
          showingInfoWindow: true
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

  // List view toggle inspired by https://codepen.io/_danko/pen/EypdyW
  toggleListView = () => {
    this.setState({
      listViewVisible: !this.state.listViewVisible
    })
  }

  render() {
    return (
      <div className="main">
        <header className="header">
          <div
            className="toggle-icon"
            onClick={this.toggleListView}
          >
              <img src={menu} alt='Toggle beach list'/>
          </div>
          <h2>The Beaches of Orange County</h2>
        </header>
        <section
          className={ this.state.listViewVisible ? "list-view" : "list-view visible" }
        >
          <ListView
            query={this.state.query}
            updateQuery={this.updateQuery}
            filteredBeaches={this.state.filteredBeaches}
            beachNameClick={this.beachNameClick}
          />
        </section>
        <section className="map">
          <MapContainer
            filteredBeaches={this.state.filteredBeaches}
            clearActiveMarker={this.clearActiveMarker}
            selectedBeach={this.state.selectedBeach}
            beachMarkerClick={this.beachMarkerClick}
            activeMarker={this.state.activeMarker}
            showingInfoWindow={this.state.showingInfoWindow}
            waveSize={this.state.waveSize}
            getMarkers={this.getMarkers}
          />
        </section>
      </div>
    );
  }
}

export default App;
