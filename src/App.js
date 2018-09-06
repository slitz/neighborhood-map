import React, { Component } from 'react';
import ListView from './ListView'
import Map from './Map'
import * as BeachesAPI from './BeachesAPI'
import './App.css';

class App extends Component {
  state = {
    beaches: []
  }
  componentDidMount() {
    BeachesAPI.getAllSpots().then((beaches) => {
      this.setState({ beaches })
    })
  }
  render() {
    return (
      <div>
        <div className="list-view">
          <ListView
            beaches={this.state.beaches}
          />
        </div>
        <div className="app">
          <Map
            beaches={this.state.beaches}
          />
        </div>
      </div>
    );
  }
}

export default App;
