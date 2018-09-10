import React, { Component } from 'react';
import ListView from './ListView'
import escapeRegExp from 'escape-string-regexp'
import MapContainer from './MapContainer'
import * as BeachesAPI from './BeachesAPI'
import './App.css';

class App extends Component {
  state = {
    county: 'Orange County',
    query: '',
    beaches: [],
    filteredBeaches: []
  }

  componentDidMount() {
    BeachesAPI.getAllSpots().then((beaches) => {
      this.setState({ beaches: beaches.filter((beach) => {
        return beach.county_name === this.state.county
      })})
    })
  }

  filterBeaches = (query) => {
    const match = new RegExp(escapeRegExp(query), 'i')
    this.setState({
      filteredBeaches: this.state.beaches.filter((beach) => match.test(beach.spot_name))
    })
  }

  render() {
    return (
      <div>
        <div className="list-view">
          <ListView
            beaches={this.state.beaches}
            filteredBeaches={this.state.filteredBeaches.length > 0 ?
              this.state.filteredBeaches : this.state.beaches}
            filterBeaches={this.filterBeaches}
          />
        </div>
        <div className="app">
          <MapContainer
            filteredBeaches={this.state.filteredBeaches.length > 0 ?
              this.state.filteredBeaches : this.state.beaches}
          />
        </div>
      </div>
    );
  }
}

export default App;
