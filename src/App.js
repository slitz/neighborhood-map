import React, { Component } from 'react';
import ListView from './ListView'
import Map from './Map'
import * as BeachesAPI from './BeachesAPI'
import './App.css';

class App extends Component {
  state = {
    county: 'Orange County',
    beaches: []
  }
  componentDidMount() {
    BeachesAPI.getAllSpots().then((beaches) => {
      this.setState({ beaches: beaches.filter((beach) => {
        return beach.county_name === this.state.county
      })}) 
    })
  }
  render() {
    return (
      <div>
        <div className="list-view">
          <ListView
            beaches={this.state.beaches}
            county={this.state.county}
          />
        </div>
        <div className="app">
          <Map
            county={this.state.county}
            beaches={this.state.beaches}
          />
        </div>
      </div>
    );
  }
}

export default App;
